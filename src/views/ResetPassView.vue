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
                    <input type="text" name="code" id="code" placeholder="Activation Code" v-model="reset_code">
                    <img src="./../assets/imgs/file-pen-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="new_password" id="new_password" placeholder="New Password" v-model="new_password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button" @click="reset(this.reset_code, this.new_password)">Reset Now !</button>
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
    name: 'ResetPassView',
    data() {
        return {
            reset_code: null,
            new_password: null
        }
    },
    methods: {
        async reset(code, pass) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`${window.main_url}/resetPassword`, {
                    reset_code: code,
                    new_password: pass,
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
                        this.$router.push('/login')
                    }, 3000);
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

<style scoped>
@import './../assets/css/account.css';
</style>