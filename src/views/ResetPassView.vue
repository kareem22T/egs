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
                        {{ lang == 'en' ? 'Reset your password' : 'اعد ضبط كلمه السر' }}
                    </h1>
                    <p>{{ lang == 'en' ? 'We will send you an email to reset your password.' : 'سوف نرسل لك بريدًا إلكترونيًا لإعادة تعيين كلمة المرور الخاصة بك.' }}</p>
                </div>
                <div class="input">
                    <input type="text" name="code" id="code" :placeholder="lang == 'en' ? 'Activation Code' : 'رمز التحقق'" v-model="reset_code">
                    <img src="./../assets/imgs/file-pen-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="new_password" id="new_password" :placeholder="lang == 'en' ? 'New Password' : 'كلمة السر الجديدة'" v-model="new_password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="reset(this.reset_code, this.new_password)">{{ lang == 'en' ? 'Reset Now !' : 'احفظ الان!' }}</button>
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
    name: 'ResetPassView',
    data() {
        return {
            reset_code: null,
            new_password: null,
            lang: 'en'
        }
    },
    methods: {
        async reset(code, pass) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/resetPassword`, {
                    reset_code: code,
                    new_password: pass,
                },
                {
                    headers: {
                        'lang': this.lang
                    }
                }
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        this.$router.push('/login')
                    }, 3000);
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

<style scoped>
@import './../assets/css/account.css';
</style>