<template>
    <main class="home_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">Home</router-link> <i class="fa-solid fa-chevron-right"></i> Deals
            </div>
        </div>

        <section class="deals_of_week">
            <div class="container">
                <swiper :spaceBetween="20" :slidesPerView="1" :slidesPerGroup="1" :pagination="{
                    clickable: true,
                }" :breakpoints="{
    600: {
        slidesPerView: 2,
        slidesPerGroup: 2
    },
    850: {
        slidesPerView: 3,
        slidesPerGroup: 3
    },
    1190: {
        slidesPerView: 4,
        slidesPerGroup: 4,
    },
    1300: {
        slidesPerView: 5,
        slidesPerGroup: 5
    },
}" :modules="modules" class="deals-slider" v-if="deals && deals.length">
                    <swiper-slide v-for="product in deals" :key="product.id"
                        @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)"
                        style="height: auto;justify-content: space-between; cursor: pointer">
                        <div style="width: 100%;display: flex;flex-direction: column;gap: 1rem;">
                            <div class="head">
                                <div class="cat">{{ product.sub_category.name }}</div>
                                <div class="discount" v-if="product.price_after_discount">Save: {{ (product.price -
                                    product.price_after_discount).toLocaleString() }} EGP</div>
                            </div>
                            <div class="thumbanail">
                                <img :src="product.product_type == 1 ? product.main_image : product.img">
                            </div>
                        </div>
                        <div class="details"
                            style="height: 100%; display: flex; flex-dirction: column; justify-content: space-between; align-items: center">
                            <h3>
                                {{ product.name.length >= 39 ? product.name.slice(0, 39) + '...' : product.name }}
                            </h3>
                            <p class="exp"
                                v-html="product.desc.length >= 150 ? product.desc.slice(0, 150) + ' more...' : product.desc">
                            </p>
                            <h1 class="price" v-if="product.price_after_discount">{{ product.price_after_discount ?
                                product.price_after_discount.toLocaleString() : '' }}</h1>
                            <h1 :class="product.price_after_discount ? 'old_price' : 'price'">{{
                                product.price.toLocaleString() }}</h1>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </section>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import axios from 'axios';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default {
    name: 'DealsView',
    data() {
        return {
            hero_slider: null,
            news: null,
            products: null,
            cards: null,
            latest: null,
            deal_products: null,
            deal_cards: null,
            deals: null,
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },
    methods: {
        async getDeals() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products/deals`,
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.deal_products = response.data.data.products
                    for (let i = 0; i < this.deal_products.length; i++) {
                        this.deal_products[i].product_type = 1;
                    }
                    this.deal_cards = response.data.data.cards
                    for (let i = 0; i < this.deal_cards.length; i++) {
                        this.deal_cards[i].product_type = 2;
                    }
                    this.deals = this.deal_products.concat(this.deal_cards)
                    this.deals.sort(function (a, b) {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });
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
    created() {
        this.getDeals()
    },
    mounted() {
        $(`.deals_link`).addClass('active')
        $(`.deals_link`).siblings().removeClass('active')
    },
}
</script>

<style scoped>
@import './../assets/css/home.css';
</style>