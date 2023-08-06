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
                        Register Your Account
                    </h1>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                <div class="input">
                    <input type="email" name="email" id="email" placeholder="Email" v-model="email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number" v-model="phone">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" placeholder="Date Of Birth"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" v-model="dob">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" placeholder="Password" v-model="password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" v-model="password_confirmation">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="registerMethod(this.email, this.phone, this.dob, this.password, this.password_confirmation)">Register Account</button>
                <p>By clicking here and continuing, <br> I agree to the <a href="/terms">Terms</a> of Service and <a href="/privacy-policy">Privacy Policy</a></p>
                <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <a href="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With Facebook</a>
                <a href="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With Google</a>
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
    name: 'RegisterView',
    data() {
        return {
            phone: null,
            email: null,
            dob: null,
            password: null,
            password_confirmation: null,
        }
    },
    methods: {
        async registerMethod(email, phone, dob, password, password_confirmation) {
            $('.loader').fadeIn().css('display', 'flex')
            if (password == password_confirmation)
                try {
                    const response = await axios.post( `${window.main_url}/register`, {
                        email: email,
                        phone: phone,
                        dob: dob,
                        password: password,
                        password_confirmation: password_confirmation,
                    },
                    );
                    $('.loader').fadeOut()
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
                            $('#errors').fadeOut('slow')
                            this.$router.push('/verify');
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
                        $('form input').css('outline', '2px solid #e41749')
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
            else {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'password and its confirmation do not match'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                $('input').css('outline', '2px solid #e41749')
                $('.loader').fadeOut()
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 3500);
            }
        }
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>