<template>
    <div class="product_wrapper category_wrapper">
        <div class="page-head">
            <div class="container" v-if="product">
                Home <i class="fa-solid fa-chevron-right"></i>{{ product.sub_category.name }} <i class="fa-solid fa-chevron-right"></i> {{ product.name.split(' ').length > 4 ? product.name.split(' ').slice(0, 4).join(' ') + ' ...' :  product.name }}
            </div>
        </div>
        <div class="container" v-if="product">
            <div class="head">
                <div class="cat">
                    <img src="./../assets/imgs/tag.svg" alt="">
                    <h4>{{product.sub_category.name}}</h4>
                </div>
                <div class="right">
                    <div>
                        <a href="" :class="product.isFav ? 'active' : ''" class="add-to-wish" @click.prevent="likeCard(product.id)"><i class="fa-regular fa-heart"></i> <p>Add To Wishlist</p></a>
                    </div>
                    <div>
                        <p>Share</p>
                        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${this.url}`" target="_blank">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="/" @click.prevent="shareInstagram(caption, url)">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a :href="`https://twitter.com/intent/tweet?url=${this.url}&text=${this.caption}`" target="_blank">
                            <i class="fa-brands fa-twitter"></i>
                        </a>

                    </div>
                </div>
            </div>

            <div class="body">
                <div>
                    <div class="imgs">
                        <div class="side">
                            <div class="img" v-for="item in product.images" :key="item.id">
                                <img :src="item.img" alt="">
                            </div>
                        </div>
                        <div class="main_img">
                            <img :src="product.img" alt="">
                        </div>
                    </div>
                    <div class="content">
                        <div class="top">
                            <h1>{{ product.name }}</h1>
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
                                <h1 v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : '' }} <span>EGP</span></h1>
                                <h1><span>{{ product.price.toLocaleString() }}</span> <span>EGP</span></h1>
                            </div>

                        <div class="saved" v-if="product.price_after_discount"><i class="fa-regular fa-bookmark"></i> Saved: {{ (product.price - product.price_after_discount).toLocaleString() }} EGP</div>
                        </div>

                        <div class="bottom">
                            <div class="quantity">
                                Quantity
                                <span>
                                    <span @click="this.quantity > 1 ? this.quantity -= 1 : ''">-</span>
                                    <span>{{ quantity }}</span>
                                    <span @click="this.quantity += 1">+</span>
                                </span>
                            </div>
                            <button @click="addCardToCart(product.id, quantity)"><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
                        </div>
                    </div>
                </div>
                <div class="side">
                    <div class="ad">
                        <img src="./../assets/imgs/hero-card-1.jpg" alt="">
                        <a href="">Shop Now</a>
                        <h1>Build Your PC !</h1>
                    </div>
                    <div class="features">
                        <div>
                            <i class="fa-solid fa-rotate-left"></i>
                            <div>
                                <h4>FREE RETUNS</h4>
                                <p>Get free retuns on eligible items</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-truck-fast"></i>
                            <div>
                                <h4>TRUSTED SHIPPING</h4>
                                <p>Get free retuns on eligible items</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-shield-halved"></i>
                            <div>
                                <h4>SECURE SHOPPING</h4>
                                <p>Get free retuns on eligible items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="details">
                <div class="header">
                    <a href="" :class="show_speci ? 'active' : ''" @click.prevent="this.show_speci = true; this.show_desc = false; this.show_rev = false">Specification</a>
                    <a href="" :class="show_desc ? 'active' : ''"  @click.prevent="this.show_speci = false; this.show_desc = true; this.show_rev = false">Description</a>
                    <a href="" :class="show_rev ? 'active' : ''"   @click.prevent="this.show_speci = false; this.show_desc = false; this.show_rev = true">Reviews</a>
                </div>
                <div class="body">
                    <div class="table" v-if="show_speci">
                        <div class="row">
                            <div class="title">Brand</div>
                            <div class="value">{{ product.sub_sub_category.name }}</div>
                        </div>
                    </div>
                    <div class="desc" v-if="show_desc" v-html="product.desc">
                    </div>
                </div>
            </div>
        </div>
        <div class="container products" v-if="related_cards && related_cards.length > 0">
            <h1>Related Cards</h1>
            <div class="body">
                <div class="product" v-for="item in related_cards" :key="item.id">
                    <a :href="`/card/${item.id}`">
                        <div class="img">
                            <img :src="item.img" :alt="item.name">
                            <p>{{ item.sub_category.name }}</p>
                            <h4>
                                {{ item.name.length >= 39 ? item.name.slice(0, 39) + '...' : item.name }}
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
                                <p class="stock" :class="product.type == 0 ? 'in' : (product.type == 1 ? 'managed' : 'out')">{{ product.type == 0 ? 'In Stock' : (product.type == 1 ? 'Managed Stock' : 'Out Of Stock') }}</p>
                            </div>
                    </a>
                    <button class="add-to-cart" @click="addCardToCart(item.id, 1)">
                        Add To Cart
                    </button>
                    <button :class="item.isFav ? 'active' : ''"  class="add-to-wishlist" @click="likeCard(item.id)">
                        <i class="fa-regular fa-heart"></i> Add To Wishlist
                    </button>
                </div>
            </div>
            <div class="pagination" v-if="last_page > 1">
                <div v-for="page_num in last_page" :key="page_num" >
                    <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                    <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="fetchProduct(productId)">
                </div>
            </div>
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
    name: 'CardView',
    data() {
        return {
            url: window.location.href,
            caption: this.product ? this.product.name : '',
            show_speci: false,
            show_desc: true,
            show_rev: false,
            productId: this.$route.params.id,
            product: null,
            quantity: 1,
            related_cards: [],
            per_page: 8,
            page: 1,
            total: 0,
            last_page: 0,
            cart: null,
            products: null,
            cards: null,
        }
    },
    methods: {
        shareInstagram(caption, url_link) {
            let text = encodeURIComponent(caption);
            let url = encodeURIComponent(url_link);
            window.location.href = 'https://www.instagram.com/create/?caption=' + text + '&url=' + url;
        },
        async fetchProduct(productId) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/cards/getCardDetails?card_id=${productId}&per_page=${this.per_page}&page=${this.page}`);
                if (response.data.status === true) {
                    this.product= response.data.data.card
                    this.related_cards = response.data.data.related_cards.cards
                    this.total = response.data.data.related_cards.total
                    this.last_page = response.data.data.related_cards.last_page
                    if (!this.products || !this.products[0])
                        this.showNotProducts = true
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
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
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
                    this.products = response.data.data.products

                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                    }
                    this.cards = response.data.data.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                    }
                    this.cart = this.products.concat(this.cards)
                }

            } catch (error) {
                console.error(error);
            }
        },
        async likeCard(card_id) {
            $('.loader').fadeIn().css('display', 'flex')
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
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('.add-to-wish').toggleClass('active')
                    $('.loader').fadeOut()
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
    },
    mounted() {
    },
    created() {
        $(function () {
            $(document).on('click', '.side .img', function () {
                let src = $(this).find('img').attr('src')
                $(this).find('img').attr('src', $('.main_img img').attr('src'))
                $('.main_img img').attr('src', src)
            })
            $(`.digital-store`).addClass('active')
            $(`.digital-store`).siblings().removeClass('active')
        })
        this.fetchProduct(this.productId)
        this.getCart()
    },
}
</script>