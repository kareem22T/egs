<template>
    <main>
        <!-- <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Account' : 'الحساب' }}
            </div>
        </div> -->
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>Login</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">Login</li>
                        </ol>
                    </div>
                </div>
            </div><!-- END CONTAINER-->
        </div>
        <div class="main_content">
            <!-- START LOGIN SECTION -->
            <div class="login_register_wrap section">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-md-10">
                            <div class="login_wrap">
                                <div class="padding_eight_all bg-white">
                                    <div class="heading_s1">
                                        <h3>{{ lang == 'en' ? 'Account Login' : 'تسجل الدخول' }}</h3>
                                    </div>
                                    <form method="post" @submit.prevent>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" name="email"
                                                :placeholder="lang == 'en' ? 'Email or Phone Number' : 'البريد الالكتروني او رقم الهاتف'"
                                                v-model="phone">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input class="form-control" type="password" name="password"
                                                :placeholder="lang == 'en' ? 'Password' : 'كلمة المرور'" v-model="password">
                                        </div>
                                        <div class="login_footer form-group mb-3">
                                            <div class="chek-form">
                                                <div class="custome-checkbox">
                                                    <input class="form-check-input" type="checkbox" name="checkbox"
                                                        id="exampleCheckbox1" value="">
                                                    <label class="form-check-label" for="exampleCheckbox1"><span>Remember
                                                            me</span></label>
                                                </div>
                                            </div>
                                            <a href="#">{{ lang == 'en' ? 'Forgot Your Password?' : 'نسيت كلمة السر؟' }}</a>
                                        </div>
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-fill-out btn-block" name="login" @click="login(this.phone, this.password)">{{ lang == 'en' ? 'Login' : 'تسجيل الدخول' }}</button>
                                        </div>
                                    </form>
                                    <div class="different_login">
                                        <span> or</span>
                                    </div>
                                    <div class="form-note text-center">{{ lang == 'en' ? 'Do not have an account?' : 'ليس لديك حساب؟' }} <router-link to="/register">{{ lang ==
                                        'en' ? 'Sign Up Now' : 'انشاء حساب' }}</router-link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END LOGIN SECTION -->
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
                    email_or_phone: phone,
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
                        console.log(response.data)
                        if (response.data.data.verified == 1) {
                            window.location.href = '/'
                        } else{
                            window.location.href = '/verify'
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