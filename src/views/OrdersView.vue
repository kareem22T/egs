<template>
    <main class="orders_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Account' : 'الحساب' }} <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i>  {{ lang == 'en' ? 'Orders' : 'عمليات الشراء' }}
            </div>
        </div>
        <div class="container">
            <h1 v-if="orders && orders.length > 0">{{ lang == 'en' ? 'My Orders' : 'طلباتي' }}</h1>
            <div class="table_wrapper" v-if="orders && orders.length > 0">
                <table>
                    <thead>
                        <tr>
                            <td>{{ lang == 'en' ? 'order' : 'الطلب' }} #</td>
                            <td>{{ lang == 'en' ? 'Status' : 'الحالة' }}</td>
                            <td>{{ lang == 'en' ? 'Payment Methode' : 'وسيلة الدفع' }}</td>
                            <td>{{ lang == 'en' ? 'Total' : 'المجموع' }}</td>
                            <td>{{ lang == 'en' ? 'Date' : 'التاريخ' }}</td>
                            <td>{{ lang == 'en' ? 'Details' : 'تفاصيل' }}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" >
                            <td>{{order.name }}</td>
                            <td><span class="canceled">{{order.status }}</span></td>
                            <td>{{order.payment_method }}</td>
                            <td>{{order.total_price.toLocaleString()}} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</td>
                            <td>{{order.created_at }}</td>
                            <td><button @click="this.$router.push(`/order/${order.id}`)">{{ lang == 'en' ? 'View Order' : 'عرض الطلب' }}</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 v-if="!orders || orders.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == 'en' ? 'No orders yet' : 'لا توجد عمليات شراء' }}</h1>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'OrdersView',
    data() {
        return {
            orders: null,
            lang: 'en'
        }
    },
    methods: {
        async getOrders() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/orders`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.orders = response.data.data
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
            this.getOrders()
        },
    },
    created() {
        this.getHomeData()
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>