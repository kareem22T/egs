<template>
    <main class="contact_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Contact Us' : 'اتصل بنا' }}
            </div>
        </div>
        <div class="container">
            <div class="head">
                <h1>{{ lang == 'en' ? 'Contact Us' : 'اتصل بنا' }}</h1>
                <p>{{ lang == 'en' ? 'Our Team Would love to hear from you !' : 'فريقنا يحب أن يسمع منك!' }}</p>
                <hr>
            </div>
            <div class="body">
                <form @submit.prevent>
                    <input type="text" name="username" id="username" :placeholder="lang == 'en' ? 'Name' : 'الاسم'" v-model="username">
                    <input type="email" name="email" id="email" :placeholder="lang == 'en' ? 'Email' : 'الايميل'" v-model="email">
                    <input type="text" name="subject" id="subject" :placeholder="lang == 'en' ? 'Subject' : 'الموضوع'" v-model="subject">
                    <textarea name="msg" id="msg" cols="30" rows="10" :placeholder="lang == 'en' ? 'Message' : 'محتوى الرسالة'" v-model="msg"></textarea>
                    <button @click="send(username, email, subject, msg)">{{ lang == 'en' ? 'Send Message' : 'أرسل رسالة' }}</button>
                </form>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.33663489036!2d31.21726479293497!3d30.059556316659574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1691388418277!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <section class="contact-info">
            <div class="container">
                <div>
                    <h1>{{ lang == 'en' ? "WE'd Love To" : 'نحن سعداء' }} <br> {{ lang == 'en' ? "Hear Form You" : "لتلقي رسالتك"}}</h1>
                    <p>{{ lang == 'en' ? "Chat with our friendly team" : 'الدردشة مع فريقنا الودود' }}</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <h3>{{ lang == 'en' ? 'Email Us' : 'راسلنا'}}</h3>
                    <a href="mailto:info@egyptgamestore.com">
                        info@egyptgamestore.com
                    </a>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <h3>{{ lang == 'en' ? 'Call Us' : 'اتصل بنا' }}</h3>
                    <p>
                        {{ lang == 'en' ? 'Sunday to Thursday' : 'من الاحد الي الخميس' }} <br>
                        {{ lang == 'en' ? 'from 9 am to 10 pm' : 'من ٩ صباحا حتى ١٠ مساء' }}
                    </p>
                    <a href="tel:00201145636999">
                        00201145636999
                    </a>
                </div>
                <div>
                    <i class="fa-solid fa-landmark"></i>
                    <h3>{{ lang == 'en' ? 'Visit Us' : 'نتشرف بزيارتك' }}</h3>
                    <p>
                        {{ lang == 'en' ? '10 Mashroe Kolleyet El Banat, Naser city, Cairo Egypt' : '10 مشروع كلية البنات, مدينة نصر, القاهرة مصر' }}
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'ContactView',
    data() {
        return {
            username: null,
            last_name: null,
            email: null,
            subject: null,
            msg: null,
            lang: "en"
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
        async send(username, email, subject, message) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/sendContactUs`, {
                    username: username,
                    email: email,
                    subject: subject,
                    message: message
                }, {
                    headers: {
                        "lang": this.lang
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
                    $('.body input, .body textarea').val('')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 4000);
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
@import './../assets/css/home.css';
</style>