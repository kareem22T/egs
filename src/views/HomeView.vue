<template>
    <main>
        <!-- START SECTION BANNER -->
        <div class="banner_section slide_medium shop_banner_slider staggered-animation-wrap">
            <div id="carouselExampleControls" class="carousel slide carousel-fade light_arrow" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item background_bg active" data-img-src="assets/images/menu_banner1.jpeg"
                        style="background-image: url(&quot;assets/images/menu_banner1.jpeg&quot;);">
                        <div class="banner_slide_content">
                            <div class="container"><!-- STRART CONTAINER -->
                                <div class="row">
                                    <div class="col-lg-7 col-9">
                                        <div class="banner_content overflow-hidden">
                                            <h5 class="mb-3 staggered-animation font-weight-light animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="0.5s"
                                                style="animation-delay: 0.5s; opacity: 1;color: #fff">Get up to 50% off Today Only!
                                            </h5>
                                            <h2 class="staggered-animation animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="1s"
                                                style="animation-delay: 1s; opacity: 1;color: #fff">Luxery Perfume</h2>
                                            <a class="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                                                href="shop-left-sidebar.html" data-animation="slideInLeft"
                                                data-animation-delay="1.5s" style="animation-delay: 1.5s; opacity: 1;">Shop
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- END CONTAINER-->
                        </div>
                    </div>
                    <div class="carousel-item background_bg" data-img-src="assets/images/menu_banner2.jpeg"
                        style="background-image: url(&quot;assets/images/menu_banner2.jpeg&quot;);">
                        <div class="banner_slide_content">
                            <div class="container"><!-- STRART CONTAINER -->
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="banner_content overflow-hidden">
                                            <h5 class="mb-3 staggered-animation font-weight-light animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="0.5s"
                                                style="animation-delay: 0.5s; opacity: 1;">50% off in all products</h5>
                                            <h2 class="staggered-animation animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="1s"
                                                style="animation-delay: 1s; opacity: 1;">Self Care</h2>
                                            <a class="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                                                href="shop-left-sidebar.html" data-animation="slideInLeft"
                                                data-animation-delay="1.5s" style="animation-delay: 1.5s; opacity: 1;">Shop
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- END CONTAINER-->
                        </div>
                    </div>
                    <div class="carousel-item background_bg" data-img-src="assets/images/menu_banner3.jpeg"
                        style="background-image: url(&quot;assets/images/menu_banner3.jpeg&quot;);">
                        <div class="banner_slide_content">
                            <div class="container"><!-- STRART CONTAINER -->
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="banner_content overflow-hidden">
                                            <h5 class="mb-3 staggered-animation font-weight-light animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="0.5s"
                                                style="animation-delay: 0.5s; opacity: 1;">Taking your Viewing Experience to
                                                Next Level</h5>
                                            <h2 class="staggered-animation animated slideInLeft"
                                                data-animation="slideInLeft" data-animation-delay="1s"
                                                style="animation-delay: 1s; opacity: 1;">Summer Sale</h2>
                                            <a class="btn btn-fill-out rounded-0 staggered-animation text-uppercase animated slideInLeft"
                                                href="shop-left-sidebar.html" data-animation="slideInLeft"
                                                data-animation-delay="1.5s" style="animation-delay: 1.5s; opacity: 1;">Shop
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- END CONTAINER-->
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev"><i
                        class="fa fa-chevron-left"></i></a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next"><i
                        class="fa fa-chevron-right"></i></a>
            </div>
        </div>
        <!-- END SECTION BANNER -->

        <div class="section pb_20" v-if="home_content && home_content.products_ads && home_content.products_ads.length > 0">
            <div class="container">
                <div class="row">
                    <div class="col-md-6" v-for="item in home_content.products_ads" :key="item.id">
                        <div class="single_banner">
                            <img src="assets/images/shop_banner_img2.jpg" alt="shop_banner_img1">
                            <div class="single_banner_info">
                                <h5 class="single_bn_title1">Title</h5>
                                <h3 class="single_bn_title">Sale</h3>
                                <a href="shop-left-sidebar.html" class="single_bn_link">Shop Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" v-for="item in home_content.products_ads" :key="item.id">
                        <div class="single_banner">
                            <img src="assets/images/shop_banner_img1.jpg" alt="shop_banner_img1">
                            <div class="single_banner_info">
                                <h5 class="single_bn_title1">Title</h5>
                                <h3 class="single_bn_title">Sale</h3>
                                <a href="shop-left-sidebar.html" class="single_bn_link">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section small_pt pb_70">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="heading_s1 text-center">
                                <h2>Exclusive Products</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="tab-style1">
                                <ul class="nav nav-tabs justify-content-center" role="tablist">
                                    <li class="nav-item" role="presentation" v-if="home_content && home_content.new_products && home_content.new_products.length > 0">
                                        <a class="nav-link active" id="arrival-tab" data-bs-toggle="tab" href="#arrival" role="tab" aria-controls="arrival" aria-selected="true">Latest Products</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" id="sellers-tab" data-bs-toggle="tab" href="#sellers" role="tab" aria-controls="sellers" aria-selected="false" tabindex="-1">Best Sellers</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link" id="featured-tab" data-bs-toggle="tab" href="#featured" role="tab" aria-controls="featured" aria-selected="false" tabindex="-1">Recommended Products</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="arrival" role="tabpanel" aria-labelledby="arrival-tab"  v-if="home_content && home_content.new_products && home_content.new_products.length > 0">
                                    <div class="row shop_container">
                                        <div class="col-lg-3 col-md-4 col-6" v-for="product in home_content.new_products" :key="product.id">
                                            <div class="product">
                                                <span class="pr_flash bg-success" v-if="product.on_sale">Sale</span>
                                                <div class="product_img">
                                                    <a href="shop-product-detail.html">
                                                        <img :src="product.first_image" alt="product_img6">
                                                    </a>
                                                    <div class="product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product_info">
                                                    <h6 class="product_title"><a href="shop-product-detail.html">{{ product.name }}</a></h6>
                                                    <div class="product_price">
                                                        <span class="price">{{ product.regular_price + "EGP"}}</span>
                                                        <del v-if="product.on_sale">{{ product.sale_price + "EGP"}}</del>
                                                        <div class="on_sale" v-if="product.on_sale">
                                                            <span>{{ product.discount + "EGP"}} Off</span>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width:68%"></div>
                                                        </div>
                                                        <span class="rating_num">(15)</span>
                                                    </div> -->
                                                    <div class="pr_desc">
                                                        <p>{{ product.desc }}</p>
                                                    </div>
                                                    <!-- <div class="pr_switch_wrap">
                                                        <div class="product_color_switch">
                                                            <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                            <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                        </div>
                                                    </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="sellers" role="tabpanel" aria-labelledby="sellers-tab" v-if="home_content && home_content.best_selling_products && home_content.best_selling_products.length > 0">
                                    <div class="row shop_container">
                                        <div class="col-lg-3 col-md-4 col-6" v-for="product in home_content.best_selling_products" :key="product.id">
                                            <div class="product">
                                                <span class="pr_flash bg-success" v-if="product.on_sale">Sale</span>
                                                <div class="product_img">
                                                    <a href="shop-product-detail.html">
                                                        <img :src="product.first_image" alt="product_img6">
                                                    </a>
                                                    <div class="product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="" @click.prevent="likeProduct(product.id)"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product_info">
                                                    <h6 class="product_title"><a href="shop-product-detail.html">{{ product.name }}</a></h6>
                                                    <div class="product_price">
                                                        <span class="price">{{ product.regular_price + "EGP" }}</span>
                                                        <del v-if="product.on_sale">{{ product.sale_price + "EGP" }}</del>
                                                        <div class="on_sale" v-if="product.on_sale">
                                                            <span>{{ product.discount + "EGP" }} Off</span>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="rating_wrap">
                                                    <div class="rating">
                                                        <div class="product_rate" style="width:68%"></div>
                                                    </div>
                                                    <span class="rating_num">(15)</span>
                                                </div> -->
                                                    <div class="pr_desc">
                                                        <p>{{ product.desc }}</p>
                                                    </div>
                                                    <!-- <div class="pr_switch_wrap">
                                                    <div class="product_color_switch">
                                                        <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                        <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                    </div>
                                                </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="featured" role="tabpanel" aria-labelledby="featured-tab" v-if="home_content && home_content.recommended_products && home_content.recommended_products.length > 0">
                                    <div class="row shop_container">
                                        <div class="col-lg-3 col-md-4 col-6" v-for="product in home_content.recommended_products" :key="product.id">
                                            <div class="product">
                                                <span class="pr_flash bg-success" v-if="product.on_sale">Sale</span>
                                                <div class="product_img">
                                                    <a href="shop-product-detail.html">
                                                        <img :src="product.first_image" alt="product_img6">
                                                    </a>
                                                    <div class="product_action_box">
                                                        <ul class="list_none pr_action_btn">
                                                            <li class="add-to-cart"><a href="#"><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                                                            <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                                                            <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
                                                            <li><a href="#"><i class="icon-heart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="product_info">
                                                    <h6 class="product_title"><a href="shop-product-detail.html">{{ product.name }}</a></h6>
                                                    <div class="product_price">
                                                        <span class="price">{{ product.regular_price + "EGP" }}</span>
                                                        <del v-if="product.on_sale">{{ product.sale_price + "EGP" }}</del>
                                                        <div class="on_sale" v-if="product.on_sale">
                                                            <span>{{ product.discount + "EGP" }} Off</span>
                                                        </div>
                                                    </div>
                                                    <!-- <div class="rating_wrap">
                                                    <div class="rating">
                                                        <div class="product_rate" style="width:68%"></div>
                                                    </div>
                                                    <span class="rating_num">(15)</span>
                                                </div> -->
                                                    <div class="pr_desc">
                                                        <p>{{ product.desc }}</p>
                                                    </div>
                                                    <!-- <div class="pr_switch_wrap">
                                                    <div class="product_color_switch">
                                                        <span class="active" data-color="#87554B" style="background-color: rgb(135, 85, 75);"></span>
                                                        <span data-color="#333333" style="background-color: rgb(51, 51, 51);"></span>
                                                    </div>
                                                </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import axios from 'axios';

export default {
    name: 'HomeView',
    data() {
        return {
            home_content: null,
            news: null,
            products: null,
            cards: null,
            lang: 'en',
            home_data: null,
        }
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
        async getHomeContent(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://becleopatra.com/api/home`,
                {
                    headers: {
                        "lang": lang
                    }
                }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.home_content = response.data.data
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
                const response = await axios.post(`https://becleopatra.com/api/users/favourites/addOrRemoveProduct`, {
                    product_id: product_id
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
                    this.getHomeContent()
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
            this.getHomeContent(this.lang)
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

.prod-name, .name {
    position: relative;
}
.name:hover .hint-pop-up-x {
    display: block
}
.hint-pop-up-x {
    position: absolute;
    display: none;
    padding: 10px;
    background-color: #f1f1f1f2;
    border: 1px solid #ccc;
    z-index: 99999;
    font-size: 12px;
    border-radius: 10px;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    backdrop-filter: blur(2px);
}
</style>