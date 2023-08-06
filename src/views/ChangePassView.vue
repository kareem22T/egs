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
                        Reset your password
                    </h1>
                    <p>We will send you an email to reset your password.</p>
                </div>
                <div class="input">
                    <input type="password" name="old_password" id="old_password" placeholder="Old Password" v-model="old_password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="new_password" id="new_password" placeholder="New Password" v-model="new_password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="confirm_new_password" id="confirm_new_password" placeholder="Confirm New Password" v-model="new_password_confirmation">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="change(this.old_password, this.new_password, this.new_password_confirmation)">Save & Update</button>
                <p>Forgot Your Old Password? <a href="/forgot-password">Click Here</a></p>
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
    name: 'ChangePassView',
    data() {
        return {
            old_password: null,
            new_password: null,
            new_password_confirmation: null,
        }
    },
    methods: {
        async change(old_password, new_password, new_password_confirmation) {
            $('.loader').fadeIn().css('display', 'flex')
            if (new_password == new_password_confirmation)
                try {
                    const response = await axios.post(`${window.main_url}/updatePassword`, {
                        old_password: old_password,
                        new_password: new_password
                    },
                    {
                        headers: {
                            "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                        }
                    }
                    );
                    if (response.data.status === true) {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = response.data.message
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                            this.$router.push('/');
                        }, 4000);
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