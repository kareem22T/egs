<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Account' : 'الحساب' }}
            </div>
        </div>
        <div class="container">
            <form action="">
                <div class="head">
                    <h1>
                        {{ lang == 'en' ? "Edit My Profile" : "تعديل ملفي الشخصي" }}
                    </h1>
                    <p>{{ lang == 'en' ? "Edit Then Click Update Now" : "عدل ثم انقر فوق التحديث الآن" }}</p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" :placeholder="lang == 'en' ? 'Phone Number' : 'رقم الهاتف'">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="text" name="email" id="email" :placeholder="lang == 'en' ? 'Email' : 'البريد الالكتروني'">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" :placeholder="lang == 'en' ? 'Date Of Birth' : 'تاريخ الميلاد'"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <button type="submit" class="button">{{ lang == 'en' ? "Update Now !" : "تحديث الان !" }}</button>
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// import { getUser } from './../assets/js/get-user';

export default {
    name: 'EditProfileView',
    data() {
        return {
            user: null,
            lang: 'en'
        }
    },
    methods: {
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
    mounted() {
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
        $('#phone').val(this.user.phone ? this.user.phone : null)
        $('#email').val(this.user.email ? this.user.email : null)
        $('#dob').val(this.user.dob ? this.user.dob : null)
    },
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>