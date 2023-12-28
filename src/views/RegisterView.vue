<template>
    <main>
        <div class="breadcrumb_section bg_gray page-title-mini">
            <div class="container"><!-- STRART CONTAINER -->
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="page-title">
                            <h1>Register</h1>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <ol class="breadcrumb justify-content-md-end">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Pages</a></li>
                            <li class="breadcrumb-item active">Register</li>
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
                                        <h3>{{ lang == 'en' ? 'Register Your Account' : 'انشئ حسابك' }}</h3>
                                    </div>
                                    <form method="post" @submit.prevent>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" name="name" :placeholder="lang == 'en' ? 'Enter Your Name' : 'ادخل اسمك'" v-model="name">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" name="email" :placeholder="lang == 'en' ? 'Email' : 'البريد الالكتروني'" v-model="email">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input type="text" class="form-control" name="email" :placeholder="lang == 'en' ? 'Phone Number' : 'رقم الهاتف'" v-model="phone">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input class="form-control" type="password" name="password"  :placeholder="lang == 'en' ? 'Password' : 'كلمة المرور'" v-model="password">
                                        </div>
                                        <div class="form-group mb-3">
                                            <input class="form-control" type="password" name="password" :placeholder="lang == 'en' ? 'Confirm Password' : 'تاكيد كلمة المرور'" v-model="password_confirmation">
                                        </div>
                                        <div class="login_footer form-group mb-3">
                                            <div class="chek-form">
                                                <div class="custome-checkbox">
                                                    <input class="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox2" value="">
                                                    <label class="form-check-label" for="exampleCheckbox2"><span>{{ lang == 'en' ? 'I agree tearms & privacy policy' : 'أوافق على الشروط وسياسة الخصوصية' }}</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-fill-out btn-block" name="register" @click="registerMethod(this.name, this.email, this.phone, this.dob, this.password, this.password_confirmation)">{{ lang == 'en' ? 'Register Account' : 'انشاء حساب' }}</button>
                                        </div>
                                    </form>
                                    <div class="form-note text-center">{{ lang == 'en' ? 'Already have an account?' : 'هل لديك حساب؟' }} <router-link to="/login">{{ lang == 'en' ? 'Login' : 'تسجيل الدخول' }}</router-link></div>
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
    name: 'RegisterView',
    data() {
        return {
            phone: null,
            email: null,
            name: null,
            dob: null,
            password: null,
            password_confirmation: null,
            errorMsg: "",
        }
    },
    methods: {
        async registerMethod(name, email, phone, dob, password, password_confirmation) {
            $('.loader').fadeIn().css('display', 'flex')
            if (!this.errorMsg) {
                if (password == password_confirmation)
                    try {
                        const response = await axios.post( `${window.main_url}/register`, {
                            name: name,
                            email: email,
                            phone: phone,
                            password: password,
                            password_confirmation: password_confirmation,
                        }, {
                            headers: {
                                "lang": this.lang
                            }
                        }
                        );
                        $('.loader').fadeOut()
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
                                $('#errors').fadeOut('slow')
                                window.location.href = '/verify';
                            }, 4000);
                        } else {
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
                else {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = 'password and its confirmation do not match'
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 3500);
                }
            } else {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = this.errorMsg
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 3500);
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

<style scoped>
@import './../assets/css/account.css';
</style>