<template>
    <main class="contact_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> About Us
            </div>
        </div>
        <div class="container">
            <div class="body" v-if="about_company">
                <div>
                    {{ about_company.content }}
                </div>
                <div class="img">
                    <img src="./../assets/imgs/about.jpg" alt="about us image">
                </div>
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
    name: 'AboutView',
    data() {
        return {
            about_company: null,
        }
    },
    methods: {
        async getAbout() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/aboutCompany`,
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.about_company = response.data.data
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
    created() {
        this.getAbout()
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>