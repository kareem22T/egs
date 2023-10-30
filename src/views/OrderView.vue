<template>
    <main class="wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">Home</router-link> <i class="fa-solid fa-chevron-right"></i> Order Details
            </div>
        </div>
        <div class="container">
            <h1 v-if="Order && Order.length > 0">Your Order {{ order_name }} <span v-if="status">{{ status }}</span></h1>
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
                                    <span>Price</span>
                                    <p>{{ product.total_price.toLocaleString() }} EGP</p>
                                </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>Quantity</span>
                                    <p>{{ product.qty }} {{ product.qty > 1 ? 'item' : 'items' }}</p>
                                </div>
                                <button v-if="product.product_type == 2 && product.codes" @click="codes = product.codes; viewCodePopUp = true;">View Codes</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="total-main" v-if="total_price || payment_fees || sub_total">
                    <div class="head">
                        Order Details
                    </div>
                    <div class="bottom">
                        <div v-if="details">
                            <h4 class="text-details" v-if="details.full_name">Full Name <span>{{ details.full_name }}</span></h4>
                            <h4 class="text-details" v-if="details.country">Country <span>{{ details.country }}</span></h4>
                            <h4 class="text-details" v-if="details.street_number">Street <span>{{ details.street_number }}</span></h4>
                            <h4 class="text-details" v-if="details.home_number">Phone <span>{{ details.home_number }}</span></h4>
                        </div>
                        <br>
                        <h4 class="text-details" v-if="shipping_method">Shipping Method <span>{{ shipping_method == 1 ? "Online" : (shipping_method == 2 ? "2 Day" : "Store Pickup") }}</span></h4>
                        <h4 class="text-details" v-if="payment_method">Payment Method <span>{{ payment_method }}</span></h4>
                        <h4 class="text-details" v-if="RefNumber"><span>Reference Number <i @click="showHelpRefPopUp = true" class="fa-regular fa-circle-question" style="cursor: pointer;"></i></span><span>{{ RefNumber }} </span></h4>
                        <br>
                        <h4 v-if="coupon_code">Coupon Code <span>{{ coupon_code }}</span></h4>
                        <h4 v-if="coupon_value">Coupon Discount <span>- {{ coupon_value.toLocaleString() }} EGP</span></h4>
                        <h4 v-if="payment_fees">Payment Fees <span>{{ payment_fees.toLocaleString() }} EGP</span></h4>
                        <h4 v-if="sub_total">Sub Total <span>{{ sub_total.toLocaleString() }} EGP</span></h4>
                        <h4 style="font-weight: 700" v-if="total_price">Total Price <span>{{ total_price.toLocaleString() }} EGP</span></h4>
                    </div>
                </div>
            </div>
            <h1 v-if="!Order || Order.length == 0"
                style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">Your Order is Empty
            </h1>
            <div class="hide-content" v-if="isOrderSuccess"></div>
            <div class="pop-up" v-if="isOrderSuccess">
                <p>Payment has been completed succesfuly</p>
                <button @click="isOrderSuccess = false">OK</button>
            </div>
            <div class="hide-content" v-if="isOrderFaild"></div>
            <div class="pop-up" v-if="isOrderFaild">
                <p>an error happend in payment prosses try again!</p>
                <button @click="isOrderFaild = false">OK</button>
            </div>
            <div class="hide-content" v-if="viewCodePopUp"></div>
            <div class="pop-up" v-if="viewCodePopUp">
                <h4>Your Codes:</h4>
                <p v-html="codes"></p>
                <button @click="viewCodePopUp = false">OK</button>
            </div>
            <div class="hide-content" v-if="showHelpRefPopUp"></div>
            <div class="pop-up" v-if="showHelpRefPopUp">
                <p>This is the number you can use to pay on</p>
                <button @click="showHelpRefPopUp = false">OK</button>
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
            coupon_value: null
        }
    },
    methods: {
        async getOrder() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/orders/${this.$route.params.id}`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
    },
    created() {
        this.getOrder()
        if (this.$route.query.success && this.$route.query.success === 'true')
            this.isOrderSuccess = true;
        else if (this.$route.query.success && this.$route.query.success === 'false')
            this.isOrderFaild = true;
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>