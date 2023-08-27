<template>
    <div class="product_wrapper">
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
                        <a href=""><i class="fa-regular fa-heart"></i> <p>Add To Wishlist</p></a>
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
                                <h1 v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount : '' }} <span>EGP</span></h1>
                                <h1><span>{{ product.price }}</span> <span>EGP</span></h1>
                            </div>

                        <div class="saved" v-if="product.price_after_discount"><i class="fa-regular fa-bookmark"></i> Saved: {{ product.price - product.price_after_discount }} EGP</div>
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
                            <button><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
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
                const response = await axios.get(`https://api.egyptgamestore.com/api/cards/getCardDetails?card_id=${productId}`);
                if (response.data.status === true) {
                    this.product= response.data.data
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
    },
    mounted() {
        $(function () {
            $(document).on('click', '.side .img', function () {
                let src = $(this).find('img').attr('src')
                $(this).find('img').attr('src', $('.main_img img').attr('src'))
                $('.main_img img').attr('src', src)
            })
            $(`.digital-store`).addClass('active')
            $(`.digital-store`).siblings().removeClass('active')
        })
    },
    created() {
        this.fetchProduct(this.productId)
    },
}
</script>