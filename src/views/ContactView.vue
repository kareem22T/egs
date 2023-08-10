<template>
    <main class="contact_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Contact Us
            </div>
        </div>
        <div class="container">
            <div class="head">
                <h1>Contact Us</h1>
                <p>Our Team Would love to hear from you !</p>
                <hr>
            </div>
            <div class="body">
                <form action="">
                    <input type="text" name="first_name" id="first_name" placeholder="First Name">
                    <input type="text" name="last_name" id="last_name" placeholder="Last Name">
                    <input type="email" name="email" id="email" placeholder="Email">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number">
                    <textarea name="msg" id="msg" cols="30" rows="10" placeholder="Message"></textarea>
                    <button>Send Message</button>
                </form>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.33663489036!2d31.21726479293497!3d30.059556316659574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1691388418277!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'ContactView',
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