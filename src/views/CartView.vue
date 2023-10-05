<template>
    <main class="card_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Cart
            </div>
        </div>
        <div class="container">
            <div class="table_wrapper"  v-if="cart && cart.length > 0">
                <table>
                    <tbody>
                        <tr v-for="product in cart" :key="product.id">
                            <td>
                                <div class="head"
                                    @click="product.product_type == 1 ? this.$router.push(`/product/${product.id}`) : this.$router.push(`/card/${product.id}`)">
                                    <img :src="product.product_type == 1 ? product.img : product.img">
                                    <p>{{ product.name.length >= 20 ? product.name.slice(0, 20) + '...' : product.name }}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="price">
                                    <span>Price</span>
                                    <p>{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : product.price.toLocaleString() }} EGP
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div class="qty">
                                    <span>Qty</span>
                                    <div>
                                        <span @click="
                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) > 1 ?
                                            (product.product_type == 1 ?
                                                addProductToCart(product.id,
                                                    (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) - 1
                                                )
                                            : 
                                            addCardToCart(product.id, 
                                                (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) - 1
                                            ))
                                        :
                                        ''
                                        ">
                                            <i class="fa fa-minus"></i>
                                        </span> 
                                        {{ product.product_type == 1 ? quantities[`product_${product.id}`] :  quantities[`card_${product.id}`] }} 
                                        <span @click="
                                            (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) > 0 ?
                                                (product.product_type == 1 ?
                                                    addProductToCart(product.id,
                                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) + 1
                                                    )
                                                    :
                                                    addCardToCart(product.id,
                                                        (product.product_type == 1 ? quantities[`product_${product.id}`] : quantities[`card_${product.id}`]) + 1
                                                    ))
                                                :
                                                ''
                                            ">
                                                <i class="fa-solid fa-plus"></i>
                                            </span>
                                        </div>
                                </div>
                            </td>
                            <td>
                                <div class="total">
                                    <span>Total</span>
                                    <p >{{ product.total_price.toLocaleString() }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="remove">
                                    <button @click="
                                        (product.product_type == 1 ?
                                            deleteProductToCart(product.id)
                                            :
                                            deleteCardToCart(product.id)
                                        )
                                    "><i class="fa fa-close"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="total" v-if="cart && cart.length > 0">
                <div class="head">
                    Cart Total
                </div>
                <div class="bottom">
                    <h4>Total <span>{{total.toLocaleString() }} EGP</span></h4>
                    <button @click="this.$router.push('/checkout')">Process To Checkout</button>
                </div>
            </div>
            <h1 v-if="!cart || cart.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">Your Cart is Empty</h1>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CartView',
    data() {
        return {
            cart: null,
            quantities: {},
            total: 0,
            products: null,
            cards: null,
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
        async addCardToCart(product_id, qty) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/cards/${product_id}/add-cart`, {
                    qty: qty
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        async addProductToCart(product_id, qty) {
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/add-cart`, {
                    qty: qty
                },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        async deleteCardToCart(product_id) {
            try {
                const response = await axios.delete(`https://api.egyptgamestore.com/api/cards/${product_id}/delete-cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        async deleteProductToCart(product_id) {
            try {
                const response = await axios.delete(`https://api.egyptgamestore.com/api/products/${product_id}/delete-cart`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        this.getCart()
                    }, 0);
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
        this.getCart()
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>