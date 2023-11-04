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
                        {{ lang == 'en' ? 'Register Your Account' : 'انشئ حسابك' }}
                    </h1>
                    <p>{{ lang == 'en' ? 'Already have an account?' : 'هل لديك حساب؟' }} <router-link to="/login">{{ lang == 'en' ? 'Login' : 'تسجيل الدخول' }}</router-link></p>
                </div>
                <div class="input">
                    <input type="email" name="email" id="email" :placeholder="lang == 'en' ? 'Email' : 'البريد الالكتروني'" v-model="email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" :placeholder="lang == 'en' ? 'Phone Number' : 'رقم الهاتف'" v-model="phone">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" :placeholder="lang == 'en' ? 'Date Of Birth' : 'تاريخ الميلاد'"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" v-model="dob" @blur="validateDate()">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" :placeholder="lang == 'en' ? 'Password' : 'كلمة المرور'" v-model="password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="password_confirmation" id="password_confirmation" :placeholder="lang == 'en' ? 'Confirm Password' : 'تاكيد كلمة المرور'" v-model="password_confirmation">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="registerMethod(this.email, this.phone, this.dob, this.password, this.password_confirmation)">{{ lang == 'en' ? 'Register Account' : 'انشاء حساب' }}</button>
                <p>{{ lang == 'en' ? 'By clicking here and continuing,' : 'بالضغط هنا والمتابعة،' }} <br> {{ lang == 'en' ? 'I agree to the' : 'أنا أوافق على' }} <router-link to="/terms">{{ lang == 'en' ? 'terms of Service and' : 'بنود الخدمة و' }}</router-link> <router-link to="/privacy-policy">{{ lang == 'en' ? 'Privacy Policy' : 'سياسة الخصوصية' }}</router-link></p>
                <!-- <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <router-link to="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With Facebook</router-link>
                <router-link to="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With Google</router-link> -->
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
    name: 'RegisterView',
    data() {
        return {
            phone: null,
            email: null,
            dob: null,
            password: null,
            password_confirmation: null,
            errorMsg: "",
        }
    },
    methods: {
        validateDate() {
            const currentDate = new Date();
            const selectedDate = new Date(this.dob);
            // Check if the year is a 4-digit number
            const year = selectedDate.getFullYear();
            const age = Math.floor((currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000));
            if (this.dob) {
                this.errorMsg = ''
                if (!year || year < 1000 || year > 9999) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = "Please enter a valid 4-digit year."
                    this.errorMsg = "Please enter a valid 4-digit year."
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 3500);
                } else if (age <= 16 || age >= 100) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = "You must be more than 16 years old."
                    this.errorMsg = "You must be more than 16 years old."
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 3500);
                }
            }
        },
        async registerMethod(email, phone, dob, password, password_confirmation) {
            $('.loader').fadeIn().css('display', 'flex')
            if (!this.errorMsg) {
                if (password == password_confirmation)
                    try {
                        const response = await axios.post( `${window.main_url}/register`, {
                            email: email,
                            phone: phone,
                            dob: dob,
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