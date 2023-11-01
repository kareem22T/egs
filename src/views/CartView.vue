<template>
    <main class="card_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Cart' : 'عربة المنتجات' }}
            </div>
        </div>
        <div class="container">
            <div class="table_wrapper"  v-if="cart && cart.length > 0">
                <table>
                    <tbody>
                        <tr v-for="product in cart" :key="product.id">
                            <td>
                                <div class="head"
                                    @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)">
                                    <img :src="product.product_type == 1 ? product.img : product.img">
                                    <p class="prod-name">
                                        {{ product.name.length >= 20 ? product.name.slice(0, 20) + '...' : product.name }}
                                        <span class="hint-pop-up" v-if="product && product.name.length > 39">{{ product.name }}</span>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>{{ cart_data.price }}</span>
                                    <p>{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : product.price.toLocaleString() }} {{ cart_data.egp }}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="qty">
                                    <span>{{cart_data.qty}}</span>
                                    <div>
                                        <span @click="
                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) > 1 ?
                                            (product.product_type == 1 ?
                                                addProductToCart(product.id,
                                                    (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) - 1
                                                )
                                            : 
                                            addCardToCart(product.id, 
                                                (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) - 1
                                            ))
                                        :
                                        ''
                                        ">
                                            <i class="fa fa-minus"></i>
                                        </span> 
                                        {{ product.product_type == 1 ? quantities[`product_${product.id}`] :  quantities[`card_${product.id}`] }} 
                                        <span @click="
                                            (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) > 0 ?
                                                (product.product_type == 1 ?
                                                    addProductToCart(product.id,
                                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) + 1
                                                    )
                                                    :
                                                    addCardToCart(product.id,
                                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) + 1
                                                    ))
                                                :
                                                ''
                                            ">
                                                <i class="fa-solid fa-plus"></i>
                                            </span>
                                        </div>
                                </div>
                            </td>
                            <td>
                                <div class="total">
                                    <span>{{ cart_data.total }}</span>
                                    <p >{{ product.total_price.toLocaleString() }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="remove">
                                    <button @click="
                                        (product.product_type == 1 ?
                                            deleteProductToCart(product.id)
                                            :
                                            deleteCardToCart(product.id)
                                        )
                                    "><i class="fa fa-close"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="total" v-if="cart && cart.length > 0">
                <div class="head">
                    {{ cart_data.cart_total }}
                </div>
                <div class="bottom">
                    <h4>{{ cart_data.total }} <span>{{total.toLocaleString() }} {{ cart_data.egp }}</span></h4>
                    <button @click="this.$router.push('/checkout')">{{ cart_data.checkout }}</button>
                </div>
            </div>
            <h1 v-if="!cart || cart.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">Your Cart is Empty</h1>
        </div>
        <div class="hide-content" v-if="showMsgPopUp"></div>
        <div class="pop-up" v-if="showMsgPopUp">
            There are some changes happend in your cart!
            <span>Could consider some elements are finished</span>
            <button @click="showMsgPopUp = false">OK</button>
        </div>
        <div class="hide-content" v-if="isOrderFaild"></div>
        <div class="pop-up" v-if="isOrderFaild">
            <p>Payment failed, please try again!</p>
            <button @click="isOrderFaild = false">OK</button>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CartView',
    data() {
        return {
            cart: null,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
            showMsgPopUp: false,
            isOrderFaild: false,
            cart_data: null
        }
    },
    methods: {
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
        async getCart(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.showMsgPopUp = response.data.data.is_cart_updated
                    this.total = response.data.data.total
                    this.products = response.data.data.products
                    
                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                        this.quantities[`product_${this.products[i].id}`] = this.products[i].qty
                    }
                    this.cards = response.data.data.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                        this.quantities[`card_${this.cards[i].id}`] = this.cards[i].qty
                    }
                    this.cart = this.products.concat(this.cards)
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
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/add-cart`, {
                    qty: qty,
                    type: 'update',
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        async addProductToCart(product_id, qty) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/add-cart`, {
                    qty: qty,
                    type: 'update',
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        async deleteCardToCart(product_id) {
            $('.loader').fadeIn()
            try {
                const response = await axios.delete(`https://api.egyptgamestore.com/api/cards/${product_id}/delete-cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        if (this.cart.length == 1)
                            window.location.reload()
                        else
                        this.getCart()
                    }, 2000);
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
        async deleteProductToCart(product_id) {
            $('.loader').fadeIn()
            try {
                const response = await axios.delete(`https://api.egyptgamestore.com/api/products/${product_id}/delete-cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        if (this.cart.length == 1)
                            window.location.reload()
                        else
                            this.getCart()
                    }, 2000);
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
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/cart.json');
            this.cart_data = this.lang == 'ar' ? data.ar : data.en
            this.getCart(this.lang)
        },
    },
    created() {
        this.getHomeData()
        if (this.$route.query.success && this.$route.query.success === 'false')
            this.isOrderFaild = true;
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

<style scoped>@import './../assets/css/home.css';
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