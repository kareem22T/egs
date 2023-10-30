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
                        Activation
                    </h1>
                    <p>Please Enter OTP Sent To Your Phone And Email</p>
                </div>
                <div class="input">
                    <input type="text" name="verification_code" id="verification_code" placeholder="Type Your Code" v-model="code">
                    <img src="./../assets/imgs/file-pen-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="verify(this.code)">Submit & Complete</button>
                <p>Didn't Recive Code ? <router-link to="" @click.prevent="resend()">Send Again</router-link></p>
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
    name: 'VerifyView',
    data() {
        return {
            code: null,
        }
    },
    methods: {
        async verify(code) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/activeAccount`, {
                    code: code,
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                    }
                },
                );
                $('.loader').fadeOut()
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        window.location.href = '/';
                    }, 4000);
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
        },
        async resend() {

            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/resendCode`, {
                },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                    }
                },
                );
                $('.loader').fadeOut()
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                    }, 4000);
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
        },

    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>