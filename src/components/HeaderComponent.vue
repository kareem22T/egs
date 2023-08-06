<template>
    <header class="main">
        <div class="head">
            <div class="container">
                <div class="left">
                    <p>Welcome To <span>EGYPT GAME STORE!</span></p>
                    <ul>
                        <a href="/about-us">
                            <li>About Us</li>
                        </a>
                        <a href="/careers">
                            <li>Careers</li>
                        </a>
                        <a href="/contact-us">
                            <li>Contact US</li>
                        </a>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <a href="tel:01145636999">
                            <img src="./../assets/imgs/phone-solid-white.svg" alt="phone icon">
                            <li>Need Help? Call Us: 01145636999</li>
                        </a>
                        <a href="mailto:support@egyptgamestore.com">
                            <img src="./../assets/imgs/envelope-regular-white.svg" alt="email icon">
                            <li>support@egyptgamestore.com</li>
                        </a>
                        <a href="">
                            <img src="./../assets/imgs/globe-solid-white.svg" alt="email icon">
                            <li>EN</li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="container">
                <div class="left">
                    <img src="./../assets/imgs/logo.png" alt="logo">
                    <div class="input-search">
                        <input type="text" name="search" id="search" placeholder="Search for items">
                        <i class="fa fa-search"></i>
                    </div>
                    <nav>
                        <a href="/" class="active">Home<span></span></a>
                        <a href="">World2Egypt<span></span></a>
                        <a href="">Physical Store<span></span></a>
                        <a href="">Digital Store<span></span></a>
                        <a href="">Used Market<span></span></a>
                        <a href="">Deals<span></span></a>
                    </nav>
                </div>
                <div class="right">
                    <div class="controls">
                        <a href="" class="account_btn">
                            <i class="fa-regular fa-user"></i><span>Account</span>
                        </a>
                        <ul v-if="user == null">
                            <a href="/login"><i class="fa-solid fa-chevron-right"></i> Login</a>
                            <a href="/register"><i class="fa-solid fa-chevron-right"></i> Register</a>
                        </ul>
                        <ul v-if="user != null">
                            <a href="/edit-profile"><i class="fa-solid fa-chevron-right"></i> My Profile</a>
                            <a href="/my-orders"><i class="fa-solid fa-chevron-right"></i> My Orders</a>
                            <a href="/change-password"><i class="fa-solid fa-chevron-right"></i> Change password</a>
                            <a href="/log-out" @click.prevent="logout()"><i class="fa-solid fa-chevron-right"></i> log-out</a>
                        </ul>
                        <a href="" v-if="user != null"><i class="fa-regular fa-heart"></i><span>Wishlist</span></a>
                        <a href=""><i class="fa-solid fa-cart-shopping"></i><span>Cart</span></a>
                        <a href=""><i class="fa-solid fa-arrow-right-arrow-left"></i><span>Compare</span></a>
                        <a href="" class="search-icon"><i class="fa-solid fa-search"></i><span>Search</span></a>
                        <a href="" class="more"><i class="fa-solid fa-bars"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';
import { destroyAllCookies } from './../assets/js/destroy-cookies';

export default {
    name: 'MainHeader',
    data() {
        return {
            user: null,
        }
    },
    methods: {
        async logout() {

            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://egs23.egyptgamestore.com/api/users/web/logout`, {
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
                    $('form input').css('outline', '2px solid #e41749')
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
        $(document).on('click', '.more .fa-bars', function (e) {
            e.preventDefault();
            $('nav').attr("style", "display: flex !important;").addClass('animate__animated animate__bounceIn')
            $(this).removeClass('fa-bars').addClass('fa-close')
        })
        $(document).on('click', '.more .fa-close', function (e) {
            e.preventDefault()
            $(this).addClass('fa-bars').removeClass('fa-close')
            $('nav').fadeOut().removeClass('animate__animated animate__bounceIn')
        })
    },
}
</script>