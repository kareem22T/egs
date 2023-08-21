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
                <form @submit.prevent>
                    <input type="text" name="username" id="username" placeholder="Name" v-model="username">
                    <input type="email" name="email" id="email" placeholder="Email" v-model="email">
                    <input type="text" name="subject" id="subject" placeholder="Subject" v-model="subject">
                    <textarea name="msg" id="msg" cols="30" rows="10" placeholder="Message" v-model="msg"></textarea>
                    <button @click="send(username, email, subject, msg)">Send Message</button>
                </form>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.33663489036!2d31.21726479293497!3d30.059556316659574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1691388418277!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <section class="contact-info">
            <div class="container">
                <div>
                    <h1>WE'd Love To <br> Hear Form You</h1>
                    <p>Chat with our friendly team</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <h3>Email Us</h3>
                    <a href="mailto:info@egyptgamestore.com">
                        info@egyptgamestore.com
                    </a>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <h3>Call Us</h3>
                    <p>
                        Sunday to Thursday <br>
                        from 9 am to 10 pm
                    </p>
                    <a href="tel:00201145636999">
                        00201145636999
                    </a>
                </div>
                <div>
                    <i class="fa-solid fa-landmark"></i>
                    <h3>Visit Us</h3>
                    <p>
                        10 Mashroe Kolleyet El Banat, Naser city, Cairo Egypt
                    </p>
                </div>
            </div>
        </section>
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
            username: null,
            last_name: null,
            email: null,
            subject: null,
            msg: null,
        }
    },
    methods: {
        async send(username, email, subject, message) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.post(`https://api.egyptgamestore.com/api/sendContactUs`, {
                    username: username,
                    email: email,
                    subject: subject,
                    message: message
                },
                );
                if (response.data.status === true) {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'success'
                    error.innerHTML = response.data.message
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    $('.body input, .body textarea').val('')
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
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
        }
    },
}
</script>

<style scoped>
@import './../assets/css/home.css';
</style>