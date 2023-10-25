<template>
    <div class="category_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Search
            </div>
        </div>

        <div class="container products" v-if="results && results.length > 0">
            <div class="head">
                <h2>Results for: {{ search }}</h2>
            </div>
            <hr>
            <div class="body">
                <div class="product" v-for="item in results" :key="item.id">
                    <img src="./../assets/imgs/shipping_abroad.png" alt="shipping abroad" class="shipping_icon" v-if="item.shipping_abroad">
                    <a :href="`/product/${item.id}`">
                        <div class="img">
                            <img :src="item.product_type == 1 ? item.main_image : item.img">
                            <!-- <p>{{ item.sub_category.name }}</p> -->
                            <h4>
                                {{ item.name.length >= 39 ? item.name.slice(0, 39) + '...' :  item.name }}
                            </h4>
                        </div>
                        <div>
                            <div class="rate">
                                <div class="stars">
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star"></i></div>
                                ( 3 Reviews ) 
                            </div>
                            <div class="price">
                                <h1 v-if="item.price_after_discount">{{ item.price_after_discount ? item.price_after_discount.toLocaleString() : '' }}</h1>
                                <h1>{{ item.price.toLocaleString() }}</h1>
                            </div>
                        </div>
                    </a>
                    <button class="add-to-cart" @click="
                    (item.product_type == 1 ?
                        addProductToCart(item.id, 1
                        )
                        :
                        addCardToCart(item.id, 1
                        ))
                        ">
                        Add To Cart
                    </button>
                    <button :class="item.isFav ? 'active' : ''" class="add-to-wishlist" @click="
                    (item.product_type == 1 ?
                        likeProduct(item.id
                        )
                        :
                        likeCard(item.id
                        ))
                        ">
                        <i class="fa-regular fa-heart"></i> Add To Wishlist
                    </button>
                </div>
            </div>
            <div class="pagination" v-if="last_page > 1">
                <div v-for="page_num in last_page" :key="page_num" >
                    <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                    <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="fetchProducts(categoryId)">
                </div>
            </div>
        </div>


        <div class="container not_products" v-if="(!results || !results[0])">
            <h1 style="margin: 5rem 0; text-align:center;color: #717171;">No reluts found</h1>
        </div>
    </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
// import { router } from 'vue';
import axios from 'axios';

export default {
    name: 'SearchView',
    data() {
        return {
            search: this.$route.params.search.replace(/-/g, " "),
            results: null,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
            cart: null,
            products_cart: null,
            cards_cart: null,
        }
    },
    methods: {
        async fetchProducts() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products-cards/search?search=${this.search}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
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
                    this.results = this.products.concat(this.cards)

                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                    }, 4000);
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
        async likeProduct(product_id) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/liked`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    $('.loader').fadeOut()
                    this.fetchProducts()
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
        async likeCard(card_id) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${card_id}/liked`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    $('.loader').fadeOut()
                    this.fetchProducts()
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
                        type: 'add'
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
        async addCardToCart(product_id, qty) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/add-cart`, {
                    qty: qty,
                    type: 'add'
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
        },
        async getCart() {
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.products_cart = response.data.data.products

                    for (let i = 0; i < this.products_cart.length; i++) {
                        this.products_cart[i].product_type = 1;
                    }
                    this.cards_cart = response.data.data.cards
                    for (let i = 0; i < this.cards_cart.length; i++) {
                        this.cards_cart[i].product_type = 2;
                    }
                    this.cart = this.products_cart.concat(this.cards_cart)
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.fetchProducts()
    },
    mounted() {
        $(`.${this.$route.meta.category_path}`).addClass('active')
        $(`.${this.$route.meta.category_path}`).siblings().removeClass('active')
    },
}
</script>