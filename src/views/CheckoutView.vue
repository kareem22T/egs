<template>
    <main class="card_wrapper checkout_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Cart
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
                        <h4>Subtotal <span>{{ total.toLocaleString() }} EGP</span></h4>
                    </div>
                    <button>Place Oreder</button>
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
            cupon: '',
            shipingMethod: '',
            paymentMethod: ''
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
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>