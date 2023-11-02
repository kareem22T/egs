<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Account' : 'الحساب' }}
            </div>
        </div>
        <div class="container">
            <form @submit.prevent>
                <div class="head">
                    <h1>
                        {{ lang == 'en' ? 'Account Login' : 'تسجل الدخول' }}
                    </h1>
                    <p>{{ lang == 'en' ? 'Do not have an account?' : 'ليس لديك حساب؟' }} <router-link to="/register"> {{ lang == 'en' ? 'SignUp' : 'انشاء حساب' }}</router-link></p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" :placeholder="lang == 'en' ? 'Email or Phone Number' : 'البريد الالكتروني او رقم الهاتف'" v-model="phone">
                    <img src="./../assets/imgs/user-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" :placeholder="lang == 'en' ? 'Password' : 'كلمة المرور'" v-model="password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="login(this.phone, this.password)">{{ lang == 'en' ? 'Login' : 'تسجل الدخول' }}</button>
                <p>{{ lang == 'en' ? 'Forgot Your Password?' : 'نسيت كلمة السر؟' }} <router-link to="/forgot-password">{{ lang == 'en' ? 'Click Here' : 'انقر هنا' }}</router-link></p>
                <!-- <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <router-link to="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With
                    Facebook</router-link>
                <router-link to="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With
                    Google</router-link> -->
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';
import { setCookie } from './../assets/js/set-cookie'

export default {
    name: 'LoginView',
    data() {
        return {
            phone: null,
            password: null,
            lang: 'en'
        }
    },
    methods: {
        async login(phone, password) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/login`, {
                    email: phone,
                    password: password,
                },
                {
                    headers: {
                        "lang": this.lang
                    }
                }
                );
                if (response.data.status === true) {
                    sessionStorage.setItem('user_token', response.data.data.token)
                    setCookie('user_token', response.data.data.token, 30)
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        if (response.data.data.activation_str == 'Active') {
                            window.location.href = '/'
                        } else if (response.data.data.activation_str == 'waiting_Active') {
                            window.location.href = '/verify'
                        } else if (response.data.data.activation_str == 'deactivated') {
                            document.getElementById('errors').innerHTML = ''
                            let error = document.createElement('div')
                            error.classList = 'error'
                            error.innerHTML = 'Your account has been banned'
                            document.getElementById('errors').append(error)
                            $('#errors').fadeIn('slow')

                            setTimeout(() => {
                                $('input').css('outline', 'none')
                                $('#errors').fadeOut('slow')
                            }, 3500);
                        }
                    }, 1300);
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
        setLangCookies() {
            let langCheck = document.cookie.indexOf('lang')

            this.is_cookies = langCheck >= 0 ? true : false

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
            } else {
                document.body.classList.add(this.lang) // add lang class ##############################
            }

        },
        getHomeData() {
            this.setLangCookies()
        },
    },
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>@import './../assets/css/account.css';</style>