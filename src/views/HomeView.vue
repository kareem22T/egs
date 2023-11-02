<template>
    <main class="home_wrapper">
        <section class="hero">
            <div class="container">
                <div class="row-1">
                <swiper
                    :spaceBetween="30"
                    :centeredSlides="true"
                    :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }"
                    :pagination="{
                        clickable: true,
                    }"
                    :modules="modules"
                    class="hero-slider"
                >
                    <swiper-slide v-for="item in hero_slider" :key="item.id" :class="`slide_${item.id}`">
                        <img :src="item.img">
                        <h1>{{ item.title }}</h1>
                        <p>{{ item.desc }}</p>
                        <a :href="item.link" target="_blanck">Shop Now</a>
                    </swiper-slide>
                </swiper>
                    <div class="cards" v-if="hero_slider">
                        <div>
                            <div class="content">
                                <div>
                                    <h1>{{ lang == 'en' ? "Build your PC!" : "جمع حاسوبك الان!" }}</h1>
                                    <p>
                                        {{ lang == 'en' ? "We help you make your dream PC come true with free installation." : "نحن نساعدك على تجميع جهاز الكمبيوتر الذي تحلم به بدون رسوم للخدمة" }}
                                        <br>
                                        {{ lang == 'en' ? "Cheap price and shipping everywhere" : "سعر رخيص والشحن الي كل مكان" }}
                                    </p>
                                </div>
                                <router-link to="/build-pc">Shop Now</router-link>
                            </div>
                            <img src="./../assets/imgs/hero-card-1.jpg" alt="">
                        </div>
                        <div v-if="topAd">
                            <a :href="topAd.link" v-if="topAd.link" targe="_blanck">Shop Now</a>
                            <img :src="topAd.img" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row-2">
                    <div>
                        <img src="./../assets/imgs/hero-icon-1.png" alt="">
                        <div class="text">
                            <h1 @click="testEmit()">World2Egypt</h1>
                            <p>{{ home_data.hero_p }}</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../assets/imgs/hero-icon-2.png" alt="">
                        <div class="text">
                            <h1>{{ home_data.phy_store }}</h1>
                            <p>{{ home_data.hero_p }}</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../assets/imgs/hero-icon-3.png" alt="">
                        <div class="text">
                            <h1>{{ home_data.cards_store }}</h1>
                            <p>{{ home_data.hero_p }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg">
                <div class="container">
                    <span class="circle"></span>
                </div>
                <span class="square"></span>
            </div>
        </section>
        <section class="deals_of_week">
            <div class="container">
            <h1 class="section_head_r"><span>{{ home_data.deals_head_span }}</span> {{ home_data.deals_head_complement }}</h1>
            <swiper
                :spaceBetween="20"
                :slidesPerView="1"
                :slidesPerGroup="1"
                :pagination="{
                    clickable: true,
                }"
                :breakpoints="{
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
                }"
                :modules="modules"
                class="deals-slider"
                v-if="deals && deals.length"
            >
                <swiper-slide v-for="product in deals" :key="product.id" @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)" style="height: auto;justify-content: space-between; cursor: pointer">
                    <div style="width: 100%;display: flex;flex-direction: column;gap: 1rem;">
                        <div class="head">
                            <div class="cat">{{ product.sub_category.name }}</div>
                            <div class="discount" v-if="product.price_after_discount">Save: {{ (product.price - product.price_after_discount).toLocaleString() }} EGP</div>
                        </div>
                        <div class="thumbanail">
                            <img :src="product.product_type == 1 ? product.main_image : product.img">
                        </div>
                    </div>
                    <div class="details" style="height: 100%; display: flex; flex-dirction: column; justify-content: space-between; align-items: center">
                        <h3 class="prod-name">
                            {{ product.name.length > 39 ? product.name.slice(0, 39) + '...' : product.name }}
                            <!-- <div class="hint-pop-up" v-if="product.name.length > 39">{{ product.name }}</div> -->
                        </h3>
                            <p class="exp" v-html="product.desc.length >= 150 ? product.desc.slice(0, 150) + ' more...' : product.desc">
                            </p>
                            <h1 class="price" v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : '' }}</h1>
                            <h1 :class="product.price_after_discount ? 'old_price' : 'price'">{{ product.price.toLocaleString() }}</h1>
                    </div>
                </swiper-slide>
            </swiper>
            </div>
        </section>
        <section class="ad-1">
            <div class="container">
                <div v-if="bottomAd">
                    <a :href="bottomAd.link" v-if="bottomAd.link" targe="_blanck">Shop Now</a>
                    <img :src="bottomAd.img" alt="">
                </div>
            </div>
        </section>
        <section class="latest">
            <div class="bg">
                <div class="circle"></div>
                <div class="square"></div>
            </div>
            <h1 class="section_head_b"><span>{{ home_data.latest_head_span }}</span> {{ home_data.latest_head_complement }}</h1>
            <swiper
                :spaceBetween="25"
                :slidesPerView="1"
                :slidesPerGroup="1"
                :pagination="{
                    clickable: true,
                }"
                :breakpoints="{
                    600: {
                        slidesPerView: 2
                    },
                    1100: {
                        slidesPerView: 3
                    },
                    1480: {
                        slidesPerView: 4
                    }
                }"
                :modules="modules"
                class="latest-slider"
                v-if="latest && latest.length"
            >
                <swiper-slide v-for="product in latest" :key="product.id" >
                    <div class="head">
                        <h1>{{ product.sub_category.name }}</h1>
                        <a :class="product.isFav ? 'active' : ''" @click.prevent="product.product_type == 1 ? likeProduct(product.id) : likeCard(product.id)"><i class="fa fa-heart"></i></a>
                    </div>
                    <div class="body" @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)">
                        <div class="thumbanail">
                            <img :src="product.product_type == 1 ? product.main_image : product.img">
                        </div>
                        <div class="details">
                            <h1 class="title prod-name">
                                {{ product.name.length > 39 ? product.name.slice(0, 39) + '...' : product.name }}
                                <div class="hint-pop-up" v-if="product.name.length > 39">{{ product.name }}</div>
                            </h1>
                            <p v-html="product.desc.length >= 70 ? product.desc.slice(0, 70) + '...' : product.desc">
                            </p>
                            <div class="price">
                                <h1 v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : '' }}</h1>
                                <h1>{{ product.price.toLocaleString() }}</h1>
                            </div>
                            <div class="rate">
                                <div class="stars">
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star active"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                ( 3 Reviews )
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </section>
        <section class="news">
            <div class="container">
                <div class="head">
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-plane"></i>
                        </div>
                        <div class="text">
                            <h1>{{home_data.news_card_1_head }}</h1>
                            <p>{{home_data.news_card_1_text }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div class="text">
                            <h1>{{home_data.news_card_2_head }}</h1>
                            <p>{{home_data.news_card_2_text }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-gift"></i>
                        </div>
                        <div class="text">
                            <h1>{{home_data.news_card_3_head }}</h1>
                            <p>{{home_data.news_card_3_text }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-sack-dollar"></i>
                        </div>
                        <div class="text">
                            <h1>{{home_data.news_card_4_head }}</h1>
                            <p>{{home_data.news_card_4text }}</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-regular fa-credit-card"></i>
                        </div>
                        <div class="text">
                                <h1>{{ home_data.news_card_5_head }}</h1>
                                <p>{{ home_data.news_card_5_text }}</p>
                            </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <h1 class="section_head_bl"><span>{{home_data.news_head_span }}</span> {{ home_data.news_head_complement }}</h1>
                <div class="news" v-if="news">
                    <div class="news-card" v-for="article in news" :key="article.id">
                        <div class="thumbanail">
                            <img :src="article.img" alt="">
                        </div>
                        <div class="text">
                            <h1 class="title">{{ article.title}}</h1>
                            <p class="bref" v-html="article.desc.length >= 750 ? article.desc.slice(0, 750) + '...' : article.desc">
                            </p>
                            <span class="date"><i class="fa-regular fa-calendar-days"></i> 30/6/2023</span>
                            <router-link :to="`/news/${article.id}`" class="read-more">{{  home_data.read_more  }} <i :class="this.lang == 'en' ? 'fa-solid fa-angle-right' : 'fa-solid fa-angle-left'"></i></router-link>
                        </div>
                    </div>
                </div>
                <router-link to="/news">{{ home_data.view_all }}</router-link>
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
    name: 'HomeView',
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
            bottomAd: null,
            topAd: null,
            lang: 'en',
            home_data: null,
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
        setLangCookies() {
            let langCheck = document.cookie.indexOf('lang')

            this.is_cookies = langCheck  >= 0 ? true : false

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
            }else {
                document.body.classList.add(this.lang) // add lang class ##############################
            }

        },
        async getHomeSLider(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/sliders`,
                {
                    headers: {
                        "lang": lang
                    }
                }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.hero_slider = response.data.data
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
        async getHomeNews(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/news?per_page=2&page=1`,
                    {
                        headers: {
                            "lang": lang
                        }
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.news = response.data.data.news
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
        async getLatest(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products/latest?limit=7`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": lang
                        }
                    },
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
                    this.latest = this.products.concat(this.cards)
                    this.latest.sort(function (a, b) {
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
        async getDeals(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products/deals`,
                {
                    headers: {
                        "lang": lang
                    }
                }
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
        async getTopAd(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/ads?type=top`,
                {
                    headers: {
                        "lang": lang
                    }
                }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.topAd = response.data.data
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
        async getBottomAd(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/ads?type=bottom`,
                {
                    headers: {
                        "lang": lang
                    }
                }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.bottomAd = response.data.data
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
                    this.getLatest()
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
                    this.getLatest()
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
            let data = require('../assets/api/home.json');
            this.home_data = this.lang == 'ar' ? data.ar : data.en
            this.getHomeSLider(this.lang)
            this.getHomeNews(this.lang)
            this.getLatest(this.lang)
            this.getDeals(this.lang)
            this.getTopAd(this.lang)
            this.getBottomAd(this.lang)
        }, 

    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(`.home_link`).addClass('active')
        $(`.home_link`).siblings().removeClass('active')

        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });

        $('.prod-name').hover(function () {
            $('.hint-pop-up').show();
        }, function () {
            $('.hint-pop-up').hide();
        });
    },
}
</script>

<style scoped>
@import './../assets/css/home.css';

.hint-pop-up {
    position: fixed;
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    z-index: 9999999999999;
    font-size: 12px;
    border-radius: 10px;
}

.prod-name:hover .hint-pop-up {
    display: block;
}

.prod-name {
    position: relative;
}
</style>