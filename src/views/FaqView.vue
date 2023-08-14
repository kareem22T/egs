<template>
    <main class="faq_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> FAQ
            </div>
        </div>
        <div class="container">
            <h1>FAQ</h1>
            <div class="questions">
                <div v-for="item in questions" :key="item.id" class="question">
                    <div class="question-value"><span>{{ item.question }}</span><span><i class="fa-solid fa-chevron-down"></i></span></div>
                    <div class="answer">{{ item.answer }}</div>
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
    name: 'FaqView',
    data() {
        return {
            questions: null,
        }
    },
    methods: {
        async getFaq() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`http://api.egyptgamestore.com/api/web/faqs`
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.questions = response.data.data
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
        this.getFaq()
    },
    mounted() {
        $(document).on('click', '.question', function () {
            $(this).find('.answer').slideToggle('fast')
            $(this).find('.question-value i').toggleClass('fa-chevron-down fa-chevron-up')
        })
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>