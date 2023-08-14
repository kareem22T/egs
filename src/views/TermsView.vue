<template>
    <main class="register_wrapper">
        <div class="container">
            <div class="terms_wrapper"></div>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;


import axios from 'axios';

export default {
    name: 'TermsView',
    data() {
    },
    methods: {
        async getTerms() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`http://api.egyptgamestore.com/api/terms`,
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    $('.terms_wrapper').html(response.data.data.content)
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
    mounted() {
        this.getTerms()
    },
}
</script>

<style scoped>
.terms_wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.terms_wrapper ul {
    padding-left: 2rem;
}
</style>