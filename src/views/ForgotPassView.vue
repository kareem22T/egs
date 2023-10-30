<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">Home</router-link> <i class="fa-solid fa-chevron-right"></i> Account
            </div>
        </div>
        <div class="container">
            <form @submit.prevent>
                <div class="head">
                    <h1>
                        Reset your password
                    </h1>
                    <p>We will send you an email to reset your password.</p>
                </div>
                <div class="input">
                    <input type="email" name="email" id="email" placeholder="Type Your Email" v-model="email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <button type="submit" class="button" @click="reset(this.email)">Reset Now !</button>
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';

export default {
    name: 'ForgotPassView',
    data() {
        return {
            email: null,
        }
    },
    methods: {
        async reset(email) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/requestPasswordReset`, {
                    email: email,
                },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        this.$router.push('/reset-password')
                    }, 3000);
                } else {
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
        }
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>