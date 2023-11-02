<template>
    <main class="wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Order Details' : 'تفاصل الطلب' }}
            </div>
        </div>
        <div class="container">
            <h1 v-if="Order && Order.length > 0">{{ lang == 'en' ? 'Order' : 'الطلب' }} {{ order_name }} <span v-if="status">{{ status }}</span></h1>
            <div class="order_address">

            </div>
            <div class="table_wrapper" v-if="Order && Order.length > 0">
                <table>
                    <tbody>
                        <tr v-for="product in Order" :key="product.id">
                            <td>
                                <div class="head"
                                    @click="product.product_type == 1 ? this.$router.push(`/product/${product.product_id}`) : this.$router.push(`/card/${product.card_id}`)">
                                    <img :src="product.product_type == 1 ? product.img : product.img">
                                    <p>{{ product.name.length >= 39 ? product.name.slice(0, 39) + '...' : product.name }}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>{{ lang == 'en' ? 'Price' : 'السعر' }}</span>
                                    <p>{{ product.total_price.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>{{ lang == 'en' ? 'Quantity' : 'العدد' }}</span>
                                    <p>{{ product.qty }} {{ lang == 'en' ? product.qty > 1 ? 'item' : 'items' : product.qty > 1 ? 'عنصر' : 'عناصر' }}</p>
                                </div>
                                <button v-if="product.product_type == 2 && product.codes" @click="codes = product.codes; viewCodePopUp = true;">{{ lang == 'en' ? 'View Codes' : 'عرض الرموز' }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="total-main" v-if="total_price || payment_fees || sub_total">
                    <div class="head">
                        {{ lang == 'en' ? 'Order Details' : 'تفاصيل الطلب' }}
                    </div>
                    <div class="bottom">
                        <div v-if="details">
                            <h4 class="text-details" v-if="details.full_name">{{ lang == 'en' ? 'Full Name' : 'الاسم كامل' }} <span>{{ details.full_name }}</span></h4>
                            <h4 class="text-details" v-if="details.country">{{ lang == 'en' ? 'Country' : 'البلد' }} <span>{{ details.country }}</span></h4>
                            <h4 class="text-details" v-if="details.street_number">{{ lang == 'en' ? 'Street' : 'الشارع' }} <span>{{ details.street_number }}</span></h4>
                            <h4 class="text-details" v-if="details.home_number">{{ lang == 'en' ? 'Phone' : 'الهاتف' }} <span>{{ details.home_number }}</span></h4>
                        </div>
                        <br>
                        <h4 class="text-details" v-if="shipping_method">{{ lang == 'en' ? 'Shipping Method' : 'طريقة الشحن' }} <span>{{ shipping_method == 1 ? "Online" : (shipping_method == 2 ? "2 Day" : "Store Pickup") }}</span></h4>
                        <h4 class="text-details" v-if="payment_method">{{ lang == 'en' ? 'Payment Method' : 'وسيلة الدفع' }} <span>{{ payment_method }}</span></h4>
                        <h4 class="text-details" v-if="RefNumber"><span>{{ lang == 'en' ? 'Reference Number' : 'الرقم المرجعي' }} <i @click="showHelpRefPopUp = true" class="fa-regular fa-circle-question" style="cursor: pointer;"></i></span><span>{{ RefNumber }} </span></h4>
                        <br>
                        <h4 v-if="coupon_code">{{ lang == 'en' ? 'Coupon Code' : 'كود القسيمة' }} <span>{{ coupon_code }}</span></h4>
                        <h4 v-if="coupon_value">{{ lang == 'en' ? 'Coupon Discount' : 'نسبة الخصم' }} 
                            <span><span  dir="ltr">- {{ coupon_value.toLocaleString() }}</span> {{ lang == 'en' ? 'EGP' : 'جنيه' }}</span>
                        </h4>
                        <h4 v-if="payment_fees">{{ lang == 'en' ? 'Payment Fees' : 'تكلفة الدفع' }} <span>{{ payment_fees.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</span></h4>
                        <h4 v-if="sub_total">{{ lang == 'en' ? 'Sub Total' : 'المجموع الفرعي' }} <span>{{ sub_total.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</span></h4>
                        <h4 style="font-weight: 700" v-if="total_price">{{ lang == 'en' ? 'Total Price' : 'السعر الكلي' }} <span>{{ total_price.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه' }}</span></h4>
                    </div>
                </div>
            </div>
            <h1 v-if="!Order || Order.length == 0"
                style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == 'en' ? 'Your Order is Empty' : 'طلبك فارغ' }}
            </h1>
            <div class="hide-content" v-if="isOrderSuccess"></div>
            <div class="pop-up" v-if="isOrderSuccess">
                <p>{{ lang == 'en' ? 'Payment has been completed succesfuly' : 'تم اتمام عملية الدفع بنجاح' }}</p>
                <button @click="isOrderSuccess = false">{{ lang == 'en' ? 'OK' : 'حسنا' }}</button>
            </div>
            <div class="hide-content" v-if="isOrderFaild"></div>
            <div class="pop-up" v-if="isOrderFaild">
                <p>{{ lang == 'en' ? 'an error happend in payment prosses try again!' : 'حدث خطا اثناء الدفع,  حاول مرة اخرى' }}</p>
                <button @click="isOrderFaild = false">{{ lang == 'en' ? 'OK' : 'حسنا' }}</button>
            </div>
            <div class="hide-content" v-if="viewCodePopUp"></div>
            <div class="pop-up" v-if="viewCodePopUp">
                <h4>{{ lang == 'en' ? 'Your Codes' : 'الرموز خاصتك' }}:</h4>
                <p v-html="codes"></p>
                <button @click="viewCodePopUp = false">{{ lang == 'en' ? 'OK' : 'حسنا' }}</button>
            </div>
            <div class="hide-content" v-if="showHelpRefPopUp"></div>
            <div class="pop-up" v-if="showHelpRefPopUp">
                <p>{{ lang == 'en' ? 'This is the number you can use to pay on' : 'الرقم الي يمكنك الدفع من خلاله' }}</p>
                <button @click="showHelpRefPopUp = false">{{ lang == 'en' ? 'OK' : 'حسنا' }}</button>
            </div>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'OrderView',
    data() {
        return {
            Order: null,
            products: null,
            cards: null,
            order_name: '',
            isOrderSuccess: false,
            isOrderFaild: false,
            viewCodePopUp: false,
            showHelpRefPopUp: false,
            status: null,
            payment_fees: 0,
            sub_total: 0,
            total_price: 0,
            codes: null,
            details: null,
            payment_method: null,
            shipping_method: null,
            RefNumber: null,
            coupon_code: null,
            coupon_value: null,
            lang: 'en'
        }
    },
    methods: {
        async getOrder() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/orders/${this.$route.params.id}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.products = response.data.data.products
                    this.order_name = response.data.data.name
                    this.status = response.data.data.status
                    this.payment_fees = response.data.data.payment_fees
                    this.sub_total = response.data.data.sub_total
                    this.total_price = response.data.data.total_price
                    this.payment_method = response.data.data.payment_method
                    this.shipping_method = response.data.data.shipping_method
                    this.details = response.data.data.details
                    this.RefNumber = response.data.data.RefNumber
                    this.coupon_code = response.data.data.coupon_code
                    this.coupon_value = response.data.data.coupon_value
                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                    }
                    this.cards = response.data.data.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                    }
                    this.Order = this.products.concat(this.cards)
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
            this.getOrder()
        },
    },
    created() {
        this.getHomeData()
        if (this.$route.query.success && this.$route.query.success === 'true')
            this.isOrderSuccess = true;
        else if (this.$route.query.success && this.$route.query.success === 'false')
            this.isOrderFaild = true;
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>