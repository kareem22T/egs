<template>
    <main class="card_wrapper checkout_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Checkout' : 'اتمام الشراء' }}
            </div>
        </div>
        <div class="container">
            <div class="table_wrapper" v-if="cart && cart.length > 0">
                <div class="head">
                    <h1>{{ page_data.head }}</h1>
                    <hr>
                </div>
                <form action="">
                    <div class="form-group">
                        <label for="name">{{ lang == 'en' ? 'Full Name' : 'الاسم كامل' }}</label>
                        <input type="text" name="name" id="name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="country">{{ lang == 'en' ? 'Country' : 'البلد' }}</label>
                        <input type="text" name="country" id="country" v-model="country" disabled>
                    </div>
                    <div class="form-group">
                        <label for="city">{{ lang == 'en' ? 'City' : 'المدينة' }}</label>
                        <input type="text" name="city" id="city" v-model="city">
                    </div>
                    <div class="form-group">
                        <label for="street">{{ lang == 'en' ? 'Street' : 'الشارع' }}</label>
                        <input type="text" name="street" id="street" v-model="street">
                    </div>
                    <div class="form-group">
                        <label for="phone">{{ lang == 'en' ? 'Phone Number' : 'رقم الهاتف' }}</label>
                        <input type="text" name="phone" id="phone" v-model="phone">
                    </div>
                </form>
            </div>
            <div class="total" v-if="cart && cart.length > 0">
                <div class="head">
                    {{ lang == 'en' ? 'Your Order' : 'طلبك' }}
                </div>
                <div class="bottom">
                    <div class="products">
                        <h5>{{ lang == 'en' ? 'Products' : 'المنتجات' }} <span>{{ lang == 'en' ? 'Total' : 'المجموع' }}</span></h5>
                        <p v-for="product in cart" :key="product.id">
                            {{ product.name.length >= 40 ? product.name.slice(0, 40) + '...' : product.name }}
                            <span>
                                {{ product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`] }} x 
                                {{ product.price_after_discount ? product.price_after_discount.toLocaleString() : product.price.toLocaleString() }}
                            </span>
                        </p>
                        <h5>{{ lang == 'en' ? 'Choose payment method' : 'اختر طريقة الدفع' }}</h5>
                        <form action="">
                            <div class="form-group">
                                <label for="payment_method_0"  :class="payment_method === '0' ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_0" v-model="payment_method" value="0" @change="getCartPrice">
                                    Credit/Debit Cards
                                </label>
                                <span v-if="payment_method == '0'" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                    {{ lang == 'en' ? 'Credit - Debit - Meeza - Prepaid' : 'اختر ائتمان - خصم مباشر - مدفوعة مقدما - ميزة' }}
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_1" :class="payment_method === '1' ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_1" v-model="payment_method" value="1" @change="getCartPrice">
                                    Mobile Wallet
                                </label>
                                    <span v-if="payment_method == '1'" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                        {{ lang == 'en' ? 'Vodafone Cash - Orange Cash - Etisalat Cash - WE Pay- All banks’ mobile wallets' : 'فودافون كاش - اورانج كاش - اتصالات كاش - خدمة وي للمدفوعات - المحافظ الالكترونية البنكية' }}
                                    </span>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_2" :class="payment_method == 2 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_2" v-model="payment_method" value="2" @change="getCartPrice">
                                    Fawry
                                </label>
                                    <span v-if="payment_method == 2" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                    {{ lang == 'en' ? 'Pay by cash at any kiosk or shop with Fawry logo through Fawry Pay' : 'الدفع كاش من خلال الأكشاك والمحلات التي تحمل علامة فورى من خلال خدمة فورى باى' }}
                                    
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_3" :class="payment_method == 3 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_3" v-model="payment_method" value="3" @change="getCartPrice">
                                    Aman / Masary
                                </label>
                                    <span v-if="payment_method == 3" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                    {{ lang == 'en' ? 'Pay by cash at any kiosk or shop with Aman/Masary logo' : 'الدفع كاش من خلال الأكشاك والمحلات التي تحمل علامة أمان/ مصارى' }}
                                    </span>
                            </div>
                            <div class="form-group" v-if="installment_option">
                                <label for="payment_method_4" :class="payment_method == 4 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_4" v-model="payment_method" value="4" @change="getCartPrice">
                                    valU Installment
                                </label>
                                    <span v-if="payment_method == 4" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                        {{ lang == 'en' ? 'Pay in installments until 60 Months with valid ValU account - minimum order 500 EGP' : 'التقسيط من خلال خدمة فاليو بحد أدنى 500 جنيه للطلب حتى 60 شهر بشرط استخدام حساب مفعل ' }} 
                                    </span>
                            </div>
                            <div class="form-group" v-if="installment_option">
                                <label for="payment_method_5" :class="payment_method == 5 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_5" v-model="payment_method" value="5" @change="getCartPrice">
                                    Credit Card Installment
                                </label>
                                    <span v-if="payment_method == 5" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                        {{ lang == 'en' ? 'Participating banks (NBE - Bank Misr - NBD - CIB -NBK - Mashreq ) - Installment periods are shown after you enter your card information and before payment confirmation.' : 'التقسيط من خلال الكروت الائتمانية فيزا وماستر كارد للبنوك التالية ( الاهلي المصري - مصر - التجاري الدولي - الكويت الوطنى- المشرق - دبى الوطني) يتم عرض المدد بعد ادخال بيانات البطاقة و قبل تأكيد الدفع' }} 
                                    </span>
                            </div>
                            <div class="form-group" v-if="installment_option">
                                <label for="payment_method_6" :class="payment_method == 6 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_6" v-model="payment_method" value="6" @change="getCartPrice">
                                    Contact Installment
                                </label>
                                    <span v-if="payment_method == 6" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                        {{ lang == 'en' ? 'Pay in installments (6-12-24 Months) with a valid Contact account - minimum order 500 EGP' : 'التقسيط من خلال خدمة كونتكت وبحد أدنى 500 جنيه للطلب حتي 24 شهر  بشرط استخدام حساب مفعل' }} 
                                    </span>
                            </div>
                            <div class="form-group" v-if="installment_option">
                                <label for="payment_method_7" :class="payment_method == 7 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_7" v-model="payment_method" value="7" @change="getCartPrice">
                                    Forsa Installment
                                </label>
                                    <span v-if="payment_method == 7" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                    {{ lang == 'en' ? 'Pay in installments with valid Forsa account - minimum order 500 EGP' : 'التقسيط من خلال خدمة فرصة بحد أدنى 500 جنيه للطلب حتي 24 شهر  بشرط استخدام حساب مفعل' }}  
                                </span>
                            </div>
                            <div class="form-group" v-if="shipping_method != '1'">
                                <label for="payment_method_8" :class="payment_method == 8 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_8" v-model="payment_method" value="8"  @change="getCartPrice">
                                    Cash on delivery
                                </label>
                                <span v-if="payment_method == 8" style="padding: 10px;display: block;margin-top: 10px;border-radius: .4rem;font-size: 13px;background: #d5dfe440;text-align: center;white-space: break-spaces;max-width: 320px;">
                                    {{ lang == 'en' ? 'Pay in Cash to delivery agent or at our store locations or delivery points all over Egypt' : 'الدفع عند الاستلام من خلال مندوب التوصيل او في فروعنا او من خلال نقاط التوصيل المنتشرة بالمحافظات' }}  
                                </span>
                            </div>
                        </form>
                        <h5>
                            {{ lang == 'en' ? 'Choose shipping method' : 'اختر طريقة الشحن' }}  
                        </h5>
                        <form action="">
                            <div class="form-group" v-if="!products.length && payment_method != 8">
                                <label for="shipping_method_1"  :class="shipping_method === '1' ? 'selected' : ''">
                                    <input type="radio" name="shipping_method" id="shipping_method_1" v-model="shipping_method" value="1" @change="getCartPrice">
                                    Online
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="shipping_method_2"  :class="shipping_method === '2' ? 'selected' : ''">
                                    <input type="radio" name="shipping_method" id="shipping_method_2" v-model="shipping_method" value="2" @change="getCartPrice">
                                    2day
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="shipping_method_3"  :class="shipping_method === '3' ? 'selected' : ''">
                                    <input type="radio" name="shipping_method" id="shipping_method_3" v-model="shipping_method" value="3" @change="getCartPrice">
                                    Store pickup
                                </label>
                            </div>
                        </form>
                        <div class="form-group" style="flex-direction: column; margin-top: 10px; gap: 0px; align-items: start;">
                            <label for="coupon">{{ lang == 'en' ? 'Coupon' : 'قسيمة الخصم' }}</label>
                            <input type="text" name="coupon" id="coupon" v-model="coupon" @input="checkCoupon(coupon, shipping_method)" :placeholder="lang == 'en' ? 'Coupon' : 'الكود'">
                        </div>
                        <h5>{{ lang == 'en' ? 'Subtotal' : 'المجموع الفرعي' }} <span>{{ total.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h5>
                        <h5 v-if="shipping_money">{{ lang == 'en' ? 'Shipping' : 'الشحن' }} <span>{{ shipping_money.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h5>
                        <h5 v-if="payment_fees">{{ lang == 'en' ? 'Payment Fees' : 'تكاليف الدفع' }} <span>{{ payment_fees.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h5>
                        <h5 v-if="coupon_discount && coupon">{{ lang == 'en' ? 'Discount' : 'خصم' }} <span>- {{ coupon_discount.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h5>
                        <h4>{{ lang == 'en' ? 'Total' : "المجموع" }} <span>{{ (total + payment_fees + shipping_money - coupon_discount).toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h4>
                    </div>
                    <button @click="addOrder(name, country, city, street, phone, ipAddress, coupon, shipping_method, payment_method)">{{ lang == 'en' ? 'Place Order' : 'اكمل الطلب' }}</button>
                </div>
            </div>
            <h1 v-if="!cart || cart.length == 0"
                style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == "en" ? "Your Cart is Empty" : "عربة التسوق فارغة" }}</h1>
        </div>
        <div class="hide-content" v-if="payment_msg_popup"></div>
        <div class="pop-up" v-if="payment_msg_popup">
            <p v-html="payment_msg"></p>
            <button @click="this.$router.push('/my-orders')">{{ lang == "en" ? "Ok" : "حسنا" }}</button>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CheckoutView',
    data() {
        return {
            cart: null,
            quantities: {},
            total: 0,
            subtotal: 0,
            products: null,
            cards: null,
            ipAddress: null,
            name: '',
            city: '',
            street: '',
            phone: '',
            home: '',
            coupon: '',
            coupon_discount: 0,
            shipping_method: '',
            payment_method: '',
            shipping_money: 0,
            payment_msg: null,
            payment_msg_popup: false,
            order_id: null,
            installment_option: false,
            lang: 'en',
            country: 'Egypt',
            page_data: null,
            payment_fees: 0,
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
        async getCart(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.total = response.data.data.total
                    this.products = response.data.data.products

                    for (let i = 0; i < this.products.length; i++) {
                        this.products[i].product_type = 1;
                        this.quantities[`product_${this.products[i].id}`] = this.products[i].qty
                    }
                    this.cards = response.data.data.cards
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].product_type = 2;
                        this.quantities[`card_${this.cards[i].id}`] = this.cards[i].qty
                    }
                    this.cart = this.products.concat(this.cards)
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
        async getCartPrice() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/cart/price?shipping_method=${this.shipping_method}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.shipping_money = response.data.data.shipping_fees
                    this.installment_option = response.data.data.installment_option
                    switch (this.payment_method) {
                        case '0':
                            this.payment_fees = parseInt(response.data.data.credit_fees);
                            break;

                        case '1':
                            this.payment_fees = parseInt(response.data.data.wallet_fees);
                            break;

                        case '2':
                            this.payment_fees = parseInt(response.data.data.fawry_fees);
                            break;

                        case '3':
                            this.payment_fees = parseInt(response.data.data.aman_masary_fees);
                            break;

                        case '4':
                            this.payment_fees = parseInt(response.data.data.valu_fees);
                            break;

                        case '5':
                            this.payment_fees = parseInt(response.data.data.bank_installments_fees);
                            break;

                        case '6':
                            this.payment_fees = parseInt(response.data.data.contact_fees);
                            break;

                        case '7':
                            this.payment_fees = parseInt(response.data.data.forsa_fees);
                            break;

                        case '8':
                            this.payment_fees = parseInt(response.data.data.other_payment_fees);
                            break;
                    
                        default:
                            this.payment_fees = 0;
                            break;
                    }

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
        async addOrder(name, country, city, street, phone, ip_address, coupon, shipping_method, payment_method) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/users/orders`,
                    {
                        full_name: name,
                        country: country,
                        city: city,
                        street_number: street,
                        home_number: phone,
                        ip_address: ip_address,
                        coupon: coupon,
                        shipping_method: shipping_method,
                        payment_method: payment_method
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        if (response.data.data.payment_link) {
                            window.location.href = response.data.data.payment_link
                            $('.loader').fadeOut()
                        }
                        if (response.data.data.message) {
                            $('.loader').fadeOut()
                            this.payment_msg = response.data.data.message
                            this.payment_msg_popup = true
                        }
                        if (!response.data.data.message && !response.data.data.payment_link) {
                            $('#errors').fadeIn('slow')
                            setTimeout(() => {
                                $('#errors').fadeOut('slow')
                                window.location.href = `/order/${response.data.data.order_id}`
                            }, 3000);
                        }
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
        async checkCoupon(code, shipping_method) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/users/cart/coupons/check`,
                    {
                        code: code,
                        shipping_method: shipping_method
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    this.coupon_discount = response.data.data.discount_money
                } else {
                    $('.loader').fadeOut()
                    this.coupon_discount = 0
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
        getIPAddress() {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    this.ipAddress = response.data.ip;
                })
                .catch(error => {
                    console.log(error);
                });
        } ,
        getHomeData() {
            this.setLangCookies()
            let data = require('../assets/api/checkout.json');
            this.page_data = this.lang == 'ar' ? data.ar : data.en
            this.getCart(this.lang)
            this.getIPAddress();
            this.getCartPrice(this.lang)
            this.country = this.lang == 'ar' ? "مصر" : "Egypt"
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