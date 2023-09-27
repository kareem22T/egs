<template>
    <main class="wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Order Details
            </div>
        </div>
        <div class="container">
            <h1 v-if="Order && Order.length > 0">{{ order_name }}</h1>
            <div class="table_wrapper" v-if="Order && Order.length > 0">
                <table>
                    <tbody>
                        <tr v-for="product in Order" :key="product.id">
                            <td>
                                <div class="head"
                                    @click="product.product_type == 1 ? this.$router.push(`/product/${product.product_id}`) : this.$router.push(`/card/${product.card_id}`)">
                                    <img :src="product.product_type == 1 ? product.main_image : product.img">
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
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 v-if="!Order || Order.length == 0"
                style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">Your Order is Empty
            </h1>
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
            order_name: ''
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
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>