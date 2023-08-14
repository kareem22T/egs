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
                    <swiper-slide>
                        <img src="./../assets/imgs/slider-bg.png">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <router-link to="">Shop Now</router-link>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../assets/imgs/slider-bg.png">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <router-link to="">Shop Now</router-link>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../assets/imgs/slider-bg.png">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <router-link to="">Shop Now</router-link>
                    </swiper-slide>
                </swiper>
                    <div class="cards">
                        <div>
                            <div class="content">
                                <div>
                                    <h1>Build Your PC!</h1>
                                    <p>
                                        We help you make your dream PC come true with Free installation CHeap Prices & Shipping Everywhere.
                                    </p>
                                </div>
                                <router-link to="">Shop Now</router-link>
                            </div>
                            <img src="./../assets/imgs/hero-card-1.jpg" alt="">
                        </div>
                        <div>
                            <router-link to="">ROBLOX GIFT CARDS >> Shop Now</router-link>
                            <img src="./../assets/imgs/hero-card-2.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row-2">
                    <div>
                        <img src="./../assets/imgs/hero-icon-1.png" alt="">
                        <div class="text">
                            <h1>World2Egypt</h1>
                            <p>in few clicks, shop all you need from any online store in the world and we get it to your doorstep in few days. easy, cheap and fast</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../assets/imgs/hero-icon-2.png" alt="">
                        <div class="text">
                            <h1>Physical Store</h1>
                            <p>in few clicks, shop all you need from any online store in the world and we get it to your doorstep in few days. easy, cheap and fast</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../assets/imgs/hero-icon-3.png" alt="">
                        <div class="text">
                            <h1>Digital Store</h1>
                            <p>in few clicks, shop all you need from any online store in the world and we get it to your doorstep in few days. easy, cheap and fast</p>
                        </div>
                    </div>
                    <div>
                        <img src="./../assets/imgs/hero-icon-4.png" alt="">
                        <div class="text">
                            <h1>Used Market</h1>
                            <p>in few clicks, shop all you need from any online store in the world and we get it to your doorstep in few days. easy, cheap and fast</p>
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
            <h1 class="section_head_r"><span>Deals</span> of the week!</h1>
            <swiper
                :spaceBetween="25"
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
                    1300: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                }"
                :modules="modules"
                class="deals-slider"
            >
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Laptop</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-1.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Hardware</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-2.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Games</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-3.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Accessories</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-4.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Laptop</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-1.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Hardware</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-2.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Games</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-3.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="head">
                        <div class="cat">Accessories</div>
                        <div class="discount">Save: 5600 EGP</div>
                    </div>
                    <div class="thumbanail">
                        <img src="./../assets/imgs/deals-4.png" alt="">
                    </div>
                    <div class="details">
                        <h3>
                            Lenovo Legion 5 Laptop AMD 
                            Ryzen 7 6800H RTX 3060 16GB
                            DDR5 Ram 512GB SSD
                            82RD006EUS
                        </h3>
                        <p class="exp">
                            EXP : 15/7/2023
                        </p>
                        <h1 class="price">
                            85000 EGP
                        </h1>
                        <h1 class="old_price">
                            95000 EGP
                        </h1>
                    </div>
                </swiper-slide>
            </swiper>
            </div>
        </section>
        <section class="ad-1">
            <div class="container">
                <div>
                    <div class="text">
                        <h1><span>New</span> Accessories In The World Of Games</h1>
                        <router-link to="">Shop Now</router-link>
                    </div>
                    <img src="./../assets/imgs/ad-1.png">
                </div>
            </div>
        </section>
        <section class="latest">
            <div class="bg">
                <div class="circle"></div>
                <div class="square"></div>
            </div>
            <h1 class="section_head_b"><span>Latest</span> Products</h1>
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
            >
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                <swiper-slide>
                    <div class="head">
                        <h1>Games</h1>
                        <router-link to=""><i class="fa fa-heart"></i></router-link>
                    </div>
                    <div class="body">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/latest-1.png">
                        </div>
                        <div class="details">
                            <h1 class="title">WWE 2K23 - PS5</h1>
                            <p>
                                lay through the key moments and toughest opponents of John Cena’s ......
                            </p>
                            <div class="price">
                                <h1 class="new_price">2400 EGP</h1>
                                <h3 class="old_price">3500 EGP</h3>
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
                            <h1>Free Delivery</h1>
                            <p>From all orders over $10</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div class="text">
                            <h1>Support 24/7</h1>
                            <p>Shop with an expert</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-gift"></i>
                        </div>
                        <div class="text">
                            <h1>Gift Voucher</h1>
                            <p>Refer a friend</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-solid fa-sack-dollar"></i>
                        </div>
                        <div class="text">
                            <h1>Return & Refund</h1>
                            <p>Free return over $200</p>
                        </div>
                    </div>
                    <div>
                        <div class="thumbanail">
                            <i class="fa-regular fa-credit-card"></i>
                        </div>
                        <div class="text">
                            <h1>Secure Payment</h1>
                            <p>100% protected</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <h1 class="section_head_bl"><span>Latest</span> News</h1>
                <div class="news">
                    <div class="news-card">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/news-thumbanail.png" alt="">
                        </div>
                        <div class="text">
                            <h1 class="title">Avatar: Frontiers of Pandora</h1>
                            <p class="bref">
                                Lorem Ipsum is simply dummy text of theprinting and typesetting industry. LoremIpsum has been the industry's standard dummy text ever since the 1500s, whenan unknown printer took a galley of ...
                            </p>
                            <span class="date"><i class="fa-regular fa-calendar-days"></i> 30/6/2023</span>
                            <router-link to="" class="read-more">Read More <i class="fa-solid fa-angle-right"></i></router-link>
                        </div>
                    </div>
                    <div class="news-card">
                        <div class="thumbanail">
                            <img src="./../assets/imgs/news-thumbanail.png" alt="">
                        </div>
                        <div class="text">
                            <h1 class="title">Avatar: Frontiers of Pandora</h1>
                            <p class="bref">
                                Lorem Ipsum is simply dummy text of theprinting and typesetting industry. LoremIpsum has been the industry's standard dummy text ever since the 1500s, whenan unknown printer took a galley of ...
                            </p>
                            <span class="date"><i class="fa-regular fa-calendar-days"></i> 30/6/2023</span>
                            <router-link to="" class="read-more">Read More <i class="fa-solid fa-angle-right"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
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
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },
}
</script>

<style scoped>
@import './../assets/css/home.css';
</style>