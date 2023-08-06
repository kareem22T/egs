<template>
    <h1></h1>
    <!-- <main class="home_wrapper">
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
                        <img src="./../assets/imgs/slider_bg.jpg">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <a href="">Shop Now</a>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../assets/imgs/slider_bg.jpg">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <a href="">Shop Now</a>
                    </swiper-slide>
                    <swiper-slide>
                        <img src="./../assets/imgs/slider_bg.jpg">
                        <h1>Explore This Week's Offers Now !</h1>
                        <p>get a discount of up to 50%</p>
                        <a href="">Shop Now</a>
                    </swiper-slide>
                </swiper>
                    <div class="cards">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>

        </section>
    </main> -->
</template>

<script>
// // Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from 'swiper/vue';

// // Import Swiper styles
// import 'swiper/css';

// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import required modules
// import { Autoplay, Pagination } from 'swiper/modules';

export default {
    name: 'HomeView',
    // components: {
    //     Swiper,
    //     SwiperSlide,
    // },
    // setup() {
    //     return {
    //         modules: [Autoplay, Pagination],
    //     };
    // },
}
</script>

<style scoped>
@import './../assets/css/home.css';
</style>