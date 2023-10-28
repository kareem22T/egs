<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Account
            </div>
        </div>
        <div class="container">
            <form @submit.prevent>
                <div class="head">
                    <h1>
                        Account Login
                    </h1>
                    <p>Do have an account? <router-link to="/register">SignUp</router-link></p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Email or Phone Number" v-model="phone">
                    <img src="./../assets/imgs/user-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="login(this.phone, this.password)">Login</button>
                <p>Forgot Your Password? <router-link to="/forgot-password">Click Here</router-link></p>
                <!-- <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <router-link to="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With
                    Facebook</router-link>
                <router-link to="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With
                    Google</router-link> -->
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';
import { setCookie } from './../assets/js/set-cookie'

export default {
    name: 'LoginView',
    data() {
        return {
            phone: null,
            password: null,
        }
    },
    methods: {
        async login(phone, password) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/login`, {
                    email: phone,
                    password: password,
                },
                );
                if (response.data.status === true) {
                    sessionStorage.setItem('user_token', response.data.data.token)
                    setCookie('user_token', response.data.data.token, 30)
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('.loader').fadeOut()
                        $('#errors').fadeOut('slow')
                        if (response.data.data.activation_str == 'Active') {
                            window.location.href = '/'
                        } else if (response.data.data.activation_str == 'waiting_Active') {
                            window.location.href = '/verify'
                        } else if (response.data.data.activation_str == 'deactivated') {
                            document.getElementById('errors').innerHTML = ''
                            let error = document.createElement('div')
                            error.classList = 'error'
                            error.innerHTML = 'Your account has been banned'
                            document.getElementById('errors').append(error)
                            $('#errors').fadeIn('slow')

                            setTimeout(() => {
                                $('input').css('outline', 'none')
                                $('#errors').fadeOut('slow')
                            }, 3500);
                        }
                    }, 1300);
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
        }
    },
}
</script>

<style scoped>@import './../assets/css/account.css';</style>