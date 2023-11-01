<template>
    <footer>
        <div class="container">
            <div class="main">
                <div class="bg">
                    <div class="container">
                        <span class="circle"></span>
                    </div>
                    <span class="square"></span>
                </div>
                <img src="./../assets/imgs/logo-dark.png">
                <div class="call">
                    <img src="./../assets/imgs/customer_icon.png">
                    <p>
                        {{ footer_data.Got_questions}}? {{footer_data.Call}}!
                        <router-link to="tel:01145636999">01145636999</router-link>
                    </p>
                </div>
                <img src="./../assets/imgs/banks.png" alt="">
            </div>
        </div>
        <div class="copy">
            {{ footer_data.cpr }}
        </div>
    </footer>
</template>

<script>
export default {
    name: 'MainFooter',
    data() {
        return {
            footer_data: null,
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
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/footer.json');
            this.footer_data = this.lang == 'ar' ? data.ar : data.en
        },

    },
    created() {
        this.getHomeData()
    },
}
</script>