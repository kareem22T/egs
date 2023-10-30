<template>
    <header class="main">
        <div class="head">
            <div class="container">
                <div class="left">
                    <p>Welcome To <span>EGYPT GAME STORE!</span></p>
                    <ul>
                        <router-link to="/about-us">
                            <li>About Us</li>
                        </router-link>
                        <router-link to="/careers">
                            <li>Careers</li>
                        </router-link>
                        <router-link to="/contact-us">
                            <li>Contact US</li>
                        </router-link>
                        <a href="/faq">
                            <li>FAQ</li>
                        </a>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <router-link to="tel:01145636999">
                            <img src="./../assets/imgs/phone-solid-white.svg" alt="phone icon">
                            <li>Need Help? Call Us: 01145636999</li>
                        </router-link>
                        <router-link to="mailto:support@egyptgamestore.com">
                            <img src="./../assets/imgs/envelope-regular-white.svg" alt="email icon">
                            <li>support@egyptgamestore.com</li>
                        </router-link>
                        <router-link to="">
                            <img src="./../assets/imgs/globe-solid-white.svg" alt="email icon">
                            <li>EN</li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="container">
                <div class="left">
                    <router-link to="/">
                        <img src="./../assets/imgs/logo.png" alt="logo">
                    </router-link>
                    <div class="input-search">
                        <input type="text" name="search" id="search" placeholder="Search for items" v-model="search" @keyup="getSugesstions()" @keyup.enter="goToSearch" @focus="showSuggesstion = true" @blur="showSuggesstion = false">
                        <i class="fa fa-search" style="cursor: pointer" @click="goToSearch"></i>
                        <div class="suggestions" v-if="results && results.length">
                            <a :href="item.product_type == 1 ? `/product/${item.id}` : `/card/${item.id}`" v-for="item in results.slice(0, 5)" :key="item.id">{{ item.name }}</a>
                        </div>
                    </div>
                    <nav>
                        <a href="" class="close"><i class="fa fa-close"></i></a>
                        <router-link to="/" class="active home_link">Home<span></span></router-link>
                        <a href="https://w2eg.com/">World2Egypt<span></span></a>
                        <a href="/category/physical-store" class="physical-store">Physical Store<span></span></a>
                        <a href="/category/digital-store" class="digital-store">Digital Store<span></span></a>
                        <router-link class="deals_link" to="/deals">Deals<span></span></router-link>

                        <div class="mobile-more">
                            <ul>
                                <a href="tel:01145636999">
                                    <i class="fa fa-phone"></i>
                                </a>
                                <a href="mailto:support@egyptgamestore.com">
                                    <i class="fa fa-envelope"></i>
                                </a>
                                <a href="">
                                    <i class="fa fa-globe"></i>
                                </a>
                            </ul>
                            <ul>
                                <router-link to="/about-us">
                                    <li>About Us</li>
                                </router-link>
                                <router-link to="/careers">
                                    <li>Careers</li>
                                </router-link>
                                <router-link to="/contact-us">
                                    <li>Contact US</li>
                                </router-link>
                                <a href="/faq">
                                    <li>FAQ</li>
                                </a>
                            </ul>
                        </div>
                    </nav>
                    <div class="hide"></div>
                </div>
                <div class="right">
                    <div class="controls">
                        <router-link to="" class="account_btn">
                            <i class="fa-regular fa-user"></i><span>Account</span>
                        </router-link>
                        <ul v-if="user == null">
                            <router-link to="/login"><i class="fa-solid fa-chevron-right"></i> Login</router-link>
                            <router-link to="/register"><i class="fa-solid fa-chevron-right"></i> Register</router-link>
                        </ul>
                        <ul v-if="user != null">
                            <router-link to="/edit-profile"><i class="fa-solid fa-chevron-right"></i> My Profile</router-link>
                            <router-link to="/my-orders"><i class="fa-solid fa-chevron-right"></i> My Orders</router-link>
                            <router-link to="/change-password"><i class="fa-solid fa-chevron-right"></i> Change password</router-link>
                            <router-link to="/log-out" @click.prevent="logout()"><i class="fa-solid fa-chevron-right"></i> log-out</router-link>
                        </ul>
                        <router-link to="/my-wishlist" v-if="user != null"><i class="fa-regular fa-heart"></i><span>Wishlist</span></router-link>
                        <router-link to="/my-cart">
                            <div class="cart_icon_wrapper"><i class="fa-solid fa-cart-shopping"></i><span class="point" v-if="cart && cart.length"></span></div><span>Cart</span>
                        </router-link>
                        <router-link to=""><i class="fa-solid fa-arrow-right-arrow-left"></i><span>Compare</span></router-link>
                        <router-link to="" class="search-icon" @click.prevent="showSearchPopUp = true"><i class="fa-solid fa-search"></i><span>Search</span></router-link>
                        <router-link to="" class="more"><i class="fa-solid fa-bars"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="hide-content" v-if="showSearchPopUp"></div>
        <div class="pop-up search-pop-up" v-if="showSearchPopUp">
            <div class="input-search">
                <input type="text" name="search" id="search" placeholder="Search for items" v-model="search" @keyup="getSugesstions()" @keyup.enter="goToSearch" @focus="showSuggesstion = true" @blur="showSuggesstion = false">
                <i class="fa fa-search" style="cursor: pointer" @click="goToSearch"></i>
                <div class="suggestions suggestions2" v-if="results && results.length">
                    <a :href="item.product_type == 1 ? `/product/${item.id}` : `/card/${item.id}`" v-for="item in results.slice(0, 5)" :key="item.id">{{ item.name }}</a>
                </div>
            </div>
            <button @click="showSearchPopUp = false">Cancel</button>
        </div>
    </header>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';
import { destroyAllCookies } from './../assets/js/destroy-cookies';

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'MainHeader',
    setup() {
        const store = useStore();
        const cartLength = computed(() => store.state.cartLength);
        return { cartLength };
    },
    data() {
        return {
            showSuggesstion: false,
            user: null,
            search: '',
            showSearchPopUp: false,
            cart: null,
            quantities: {},
            total: 0,
            products_cart: null,
            cards_cart: null,
            results: null,
            products: null,
            cards: null,
        }
    },
    methods: {
        async logout() {

            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/users/web/logout`, {
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    destroyAllCookies()
                    sessionStorage.removeItem('user')
                    sessionStorage.removeItem('user_token')
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                        window.location.href = "/";
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
        goToSearch () {
            window.location.href = '/search/' + this.search.replace(/\s+/g, '-')
        },
        async getSugesstions() {
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

                } else {
                    this.results = null
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
                    this.showMsgPopUp = response.data.data.is_cart_updated
                    this.total = response.data.data.total
                    this.products_cart = response.data.data.products

                    for (let i = 0; i < this.products_cart.length; i++) {
                        this.products_cart[i].product_type = 1;
                        this.quantities[`product_${this.products_cart[i].id}`] = this.products_cart[i].qty
                    }
                    this.cards_cart = response.data.data.cards
                    for (let i = 0; i < this.cards_cart.length; i++) {
                        this.cards_cart[i].product_type = 2;
                        this.quantities[`card_${this.cards_cart[i].id}`] = this.cards_cart[i].qty
                    }
                    this.cart = this.products_cart.concat(this.cards_cart)
                } else {
                    $('.loader').fadeOut()
                }

            } catch (error) {
                $('.loader').fadeOut()
                console.error(error);
            }
        },
    },
    mounted() {
        this.user = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : null 
        $(window).on('resize', function () {
            if ($(this).width() > 855) {
                $('nav').css('display', 'flex');
            }
            $('.left nav a span').each(function () {
                $(this).width($(this).parent().width() + 10)
            })
        });

        $('.left nav a span').each(function () {
            $(this).width($(this).parent().width() + 10)
        })
        $(document).on('click', '.account_btn', function (e) {
            e.preventDefault();
            if ($('.controls >ul').hasClass('animate__bounceIn')) {
                $('.controls >ul').fadeOut().removeClass('animate__animated animate__bounceIn')
            } else {
                $('.controls >ul').attr("style", "display: block !important;").addClass('animate__animated animate__bounceIn')
            }
        })
        $(document).on('click', '.controls >ul', function (e) {
            e.preventDefault();
            if ($('.controls >ul').hasClass('animate__bounceIn')) {
                $('.controls >ul').fadeOut().removeClass('animate__animated animate__bounceIn')
            } else {
                $('.controls >ul').attr("style", "display: block !important;").addClass('animate__animated animate__bounceIn')
            }
        })
        $(document).on('click', '.more .fa-bars', function (e) {
            e.preventDefault();
            $('nav').attr("style", "display: flex !important;").addClass('animate__animated animate__fadeInRight')
            $('.hide').fadeIn()
        })
        $(document).on('click', '.close, .hide', function (e) {
            e.preventDefault()
            $('nav, .hide').fadeOut()
        })
    },
    created() {
        this.getCart()
    },
}
</script>