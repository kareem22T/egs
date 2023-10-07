<template>
    <main class="card_wrapper checkout_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Checkout
            </div>
        </div>
        <div class="container">
            <div class="table_wrapper" v-if="cart && cart.length > 0">
                <div class="head">
                    <h1>Billing Details</h1>
                    <hr>
                </div>
                <form action="">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" name="name" id="name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <input type="text" name="country" id="country" v-model="country">
                    </div>
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" name="city" id="city" v-model="city">
                    </div>
                    <div class="form-group">
                        <label for="street">Street</label>
                        <input type="text" name="street" id="street" v-model="street">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="text" name="phone" id="phone" v-model="phone">
                    </div>
                    <div class="form-group">
                        <label for="home">Home Number</label>
                        <input type="text" name="home" id="home" v-model="home">
                    </div>
                </form>
            </div>
            <div class="total" v-if="cart && cart.length > 0">
                <div class="head">
                    Your Order
                </div>
                <div class="bottom">
                    <div class="products">
                        <h5>Products <span>Total</span></h5>
                        <p v-for="product in cart" :key="product.id">
                            {{ product.name.length >= 40 ? product.name.slice(0, 40) + '...' : product.name }}
                            <span>
                                {{ product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`] }} x 
                                {{ product.price_after_discount ? product.price_after_discount.toLocaleString() : product.price.toLocaleString() }}
                            </span>
                        </p>
                        <h5>Choose payment method</h5>
                        <form action="">
                            <div class="form-group">
                                <label for="payment_method_0"  :class="payment_method === '0' ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_0" v-model="payment_method" value="0">
                                    Credit Card
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_1" :class="payment_method === '1' ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_1" v-model="payment_method" value="1">
                                    Mobile Wallet
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_2" :class="payment_method == 2 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_2" v-model="payment_method" value="2">
                                    Fawry
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_3" :class="payment_method == 3 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_3" v-model="payment_method" value="3">
                                    Aman / Masary
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_4" :class="payment_method == 4 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_4" v-model="payment_method" value="4">
                                    valU Installment
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_5" :class="payment_method == 5 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_5" v-model="payment_method" value="5">
                                    Credit Card Installment
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_6" :class="payment_method == 6 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_6" v-model="payment_method" value="6">
                                    Contact Installment
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_7" :class="payment_method == 7 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_7" v-model="payment_method" value="7">
                                    Forsa Installment
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="payment_method_8" :class="payment_method == 8 ? 'selected' : ''">
                                    <input type="radio" name="payment_method" id="payment_method_8" v-model="payment_method" value="8">
                                    Cash on delivery
                                </label>
                            </div>
                        </form>
                        <h5>Choose shipping method</h5>
                        <form action="">
                            <div class="form-group" v-if="!products.length">
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
                            <label for="coupon">Coupon</label>
                            <input type="text" name="coupon" id="coupon" v-model="coupon" @input="checkCoupon(coupon, shipping_method)" placeholder="Coupon">
                        </div>
                        <h5>Subtotal <span>{{ total.toLocaleString() }} EGP</span></h5>
                        <h5 v-if="shipping_money">Shipping <span>{{ shipping_money.toLocaleString() }} EGP</span></h5>
                        <h5 v-if="coupon_discount">Discount <span>- {{ coupon_discount.toLocaleString() }} EGP</span></h5>
                        <h4>Total <span>{{ (total + shipping_money - coupon_discount).toLocaleString() }} EGP</span></h4>
                    </div>
                    <button @click="addOrder(name, country, city, street, phone, home, ipAddress, coupon, shipping_method, payment_method)">Place Oreder</button>
                </div>
            </div>
            <h1 v-if="!cart || cart.length == 0"
                style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">Your Cart is Empty</h1>
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
            country: '',
            city: '',
            street: '',
            phone: '',
            home: '',
            coupon: '',
            coupon_discount: 0,
            shipping_method: '',
            payment_method: '',
            shipping_money: 0
        }
    },
    methods: {
        async getCart() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
        async addOrder(name, country, city, street, phone, home, ip_address, coupon, shipping_method, payment_method) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/users/orders`,
                    {
                        full_name: name,
                        country: country,
                        city: city,
                        street_number: street,
                        home_number: phone,
                        id_home_number: home, 
                        ip_address: ip_address,
                        coupon: coupon,
                        shipping_method: shipping_method,
                        payment_method: payment_method
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
                        $('.loader').fadeOut()
                        if (response.data.data.payment_link)
                            window.location.href = response.data.data.payment_link
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
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        },
                    }
                );
                if (response.data.status === true) {
                    this.coupon_discount = response.data.data.discount_money
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
        getIPAddress() {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    this.ipAddress = response.data.ip;
                })
                .catch(error => {
                    console.log(error);
                });
        }    },
    created() {
        this.getCart()
        this.getIPAddress();
        this.getCartPrice()
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>