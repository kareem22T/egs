<template>
    <main class="orders_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Account <i class="fa-solid fa-chevron-right"></i> Orders
            </div>
        </div>
        <div class="container">
            <h1 v-if="orders && orders.length > 0">My Orders</h1>
            <div class="table_wrapper" v-if="orders && orders.length > 0">
                <table>
                    <thead>
                        <tr>
                            <td>Order #</td>
                            <td>Status</td>
                            <td>Payment Methode</td>
                            <td>Total</td>
                            <td>Date</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" >
                            <td>#{{order.RefNumber }}</td>
                            <td><span class="canceled">{{order.status }}</span></td>
                            <td>{{order.payment_method }}</td>
                            <td>{{order.total_price.toLocaleString()}} EGP</td>
                            <td>{{order.created_at }}</td>
                            <td><button>View Order</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 v-if="!orders || orders.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">No orders yet</h1>
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
        }
    },
    methods: {
        async getWishlist() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/users/orders?status=0`,
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
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
    },
    created() {
        this.getWishlist()
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>