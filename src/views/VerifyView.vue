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
                        {{ lang == 'en' ? 'Activation' : 'التفعيل' }}
                    </h1>
                    <p>{{ lang == 'en' ? 'Please Enter OTP Sent To Your Phone And Email' : 'الرجاء إدخال رمز  OTP المرسلة إلى هاتفك والبريد الإلكتروني' }}</p>
                </div>
                <div class="input">
                    <input type="text" name="verification_code" id="verification_code" :placeholder="lang == 'en' ? 'Type Your Code' : 'ادخل الرمز'" v-model="code">
                    <img src="./../assets/imgs/file-pen-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="verify(this.code)">{{ lang == 'en' ? 'Submit & Complete' : 'تاكيد وإكمال' }}</button>
                <p> <router-link to="" @click.prevent="resend()">{{ lang == 'en' ? 'Send Again ' : 'أعد الإرسال' }}</router-link></p>
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';

export default {
    name: 'VerifyView',
    data() {
        return {
            code: null,
            lang: 'en'
        }
    },
    methods: {
        async verify(code) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/activeAccount`, {
                    code: code,
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        "lang": this.lang
                    }
                },
                );
                $('.loader').fadeOut()
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        window.location.href = '/';
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
        },
        async resend() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/resendCode`, {
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        "lang": this.lang
                    }
                },
                );
                $('.loader').fadeOut()
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
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