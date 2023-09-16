<template>
    <main class="orders_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Account <i class="fa-solid fa-chevron-right"></i> Orders
            </div>
        </div>
        <div class="container">
            <h1>My Orders</h1>
            <div class="table_wrapper">
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
                        <tr>
                            <td>#12254456</td>
                            <td><span class="done">Done</span></td>
                            <td>Master Card</td>
                            <td>102360 EGP</td>
                            <td>15/10/2023 - 10:20 PM</td>
                            <td><button>View Order</button></td>
                        </tr>
                        <tr>
                            <td>#12254456</td>
                            <td><span class="done">Done</span></td>
                            <td>Master Card</td>
                            <td>102360 EGP</td>
                            <td>15/10/2023 - 10:20 PM</td>
                            <td><button>View Order</button></td>
                        </tr>
                        <tr>
                            <td>#12254456</td>
                            <td><span class="canceled">Canceled</span></td>
                            <td>Master Card</td>
                            <td>102360 EGP</td>
                            <td>15/10/2023 - 10:20 PM</td>
                            <td><button>View Order</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>

<script>
// global.jQuery = require('jquery');
// var $ = global.jQuery;
// window.$ = $;

// import axios from 'axios';

export default {
    name: 'OrdersView',
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>