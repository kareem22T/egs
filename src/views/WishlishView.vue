<template>
    <main class="wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Wishlist' : 'المفضلة' }}
            </div>
        </div>
        <div class="container">
            <h1  v-if="wishlist && wishlist.length > 0">{{ lang == 'en' ? 'My Wishlist' : 'المفضلة لدي' }}</h1>
            <div class="table_wrapper" v-if="wishlist && wishlist.length > 0">
                <table>
                    <tbody>
                        <tr v-for="product in wishlist" :key="product.id" >
                            <td><div class="head" @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)"><img :src="product.product_type == 1 ? product.main_image : product.img"> 
                                <p class="prod-name">
                                    {{ product.name.length >= 39 ? product.name.slice(0, 39) + '...' : product.name }}
                                    <span class="hint-pop-up" v-if="product && product.name.length > 39">{{ product.name }}</span>
                                </p>
                            </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>{{ lang == 'en' ? 'Price' : 'السعر' }}</span>
                                    <p>{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : product.price.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</p>
                            </div>
                            </td>
                            <td>
                                <div class="stock">
                                    <span>{{ lang == 'en' ? 'Stock Status' : 'الكمية المتوفرة' }}</span>
                                    <p class="stock" :class="product.type == 0 ? 'in' : (product.type == 1 ? 'managed' : 'out')">{{ product.type == 0 ? (lang == 'en' ? "In Stock" : "متاح")  : (product.type == 1 ? (lang == 'en' ? "Managed Stock" : "كمية محدودة") : (lang == 'en' ? "Out Of Stock" : "نفذت الكمية")) }}</p>
                                    </div>
                            </td>
                            <td>
                                <div class="add_to_cart">
                                    <button style="cursor: pointer" @click="
                                        (product.product_type == 1 ?
                                            addProductToCart(product.id, 1, product.stock, product.type)
                                            :
                                            addCardToCart(product.id, 1
                                            ))
                                        "><i class="fa-solid fa-cart-shopping"></i> <span>{{ lang == 'en' ? 'Add To Cart' : 'اضافة الى العربة' }}</span></button>
                                </div>
                            </td>
                            <td>
                                <div class="remove">
                                    <button @click="product.product_type == 1 ? removeProductFromWishlist(product.id) : removeCardFromWishlist(product.id)"><i class="fa fa-close"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 v-if="!wishlist || wishlist.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == 'en' ? 'Your Wishlist is Empty' : 'المفضلة فارغة' }}</h1>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'WishlistView',
    data() {
        return {
            wishlist: null,
            lang: 'en'
        }
    },
    methods: {
        async getWishlist() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/liked`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.products = response.data.data.products.products
                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                    }
                    this.cards = response.data.data.cards.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                    }
                    this.wishlist = this.products.concat(this.cards)
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async addCardToCart(product_id, qty) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/add-cart`, {
                    qty: qty,
                    type: 'add',
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                    }, 500);
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async addProductToCart(product_id, qty, product_valid_qty, product_stock) {
            if (product_stock == 2) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This product is not available now'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);

            } else if (product_valid_qty < qty && product_stock == 1) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This quantity is not available'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            } else {
                $('.loader').fadeIn().css('display', 'flex')
                try {
                    const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/add-cart`, {
                        qty: qty,
                        type: 'add',
                    },
                        {
                            headers: {
                                "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                                "lang": this.lang
                            }
                        },
                    );
                    if (response.data.status === true) {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = response.data.message
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                            if (!this.cart || !this.cart.length) {
                                window.location.reload()
                            }
                        }, 1000);
                    } else {
                        $('.loader').fadeOut()
                        document.getElementById('errors').innerHTML = ''
                        $.each(response.data.errors, function (key, value) {
                            let error = document.createElement('div')
                            error.classList = 'error'
                            error.innerHTML = value
                            document.getElementById('errors').append(error)
                        });
                        $('#errors').fadeIn('slow')

                        setTimeout(() => {
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                        }, 3500);
                    }

                } catch (error) {
                    document.getElementById('errors').innerHTML = ''
                    let err = document.createElement('div')
                    err.classList = 'error'
                    err.innerHTML = 'server error try again later'
                    document.getElementById('errors').append(err)
                    $('#errors').fadeIn('slow')
                    $('.loader').fadeOut()

                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                    }, 3500);

                    console.error(error);
                }
            }
        },
        async removeProductFromWishlist(product_id) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/liked`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    this.getWishlist()
                    setTimeout(() => {
                        $('.loader').fadeOut()
                    }, 200);
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        async removeCardFromWishlist(product_id) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/liked`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    this.getWishlist()
                    setTimeout(() => {
                        $('.loader').fadeOut()
                    }, 200);
                } else {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    $.each(response.data.errors, function (key, value) {
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = value
                        document.getElementById('errors').append(error)
                    });
                    $('#errors').fadeIn('slow')
                    
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                    }, 3500);
                }

            } catch (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        },
        setLangCookies() {
            let langCheck = document.cookie.indexOf('lang')

            this.is_cookies = langCheck >= 0 ? true : false

            function getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            } // to get an cookie by name ##############################

            if (langCheck !== -1) {
                this.lang = getCookie('lang') // check lang cookie exist ##############################
            }

            if (sessionStorage.getItem("lang"))
                this.lang = sessionStorage.getItem("lang") // check lang session exist ##############################

            sessionStorage.setItem("lang", this.lang); // set lang session ##############################

            let searchParams = new URLSearchParams(window.location.search)
            if (searchParams.has('lang')) {
                this.lang = searchParams.get('lang')
                document.body.classList.add(searchParams.get('lang')) // add lang class ##############################
            } else {
                document.body.classList.add(this.lang) // add lang class ##############################
            }

        },
        getHomeData() {
            this.setLangCookies()
            this.getWishlist()
        },
    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>
<style>
.hint-pop-up {
    position: fixed;
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    z-index: 99999;
    font-size: 12px;
    border-radius: 10px;
}

.prod-name:hover .hint-pop-up {
    display: block;
}

.prod-name {
    position: relative;
    cursor: pointer;
}
</style>