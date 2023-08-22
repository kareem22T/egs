<template>
    <div class="category_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> {{ this.$route.meta.category_name }} <i
                    class="fa-solid fa-chevron-right"></i> {{ this.$route.params.name.replace(/-/g, " ").charAt(0).toUpperCase() + this.$route.params.name.replace(/-/g, " ").slice(1) }}
            </div>
        </div>
        <div class="container sub_categories" v-if="subCategories">
            <a :href="`/`" @click.prevent
                v-for="item in subCategories" :key="item.id">
                <div class="img">
                    <img :src="item.logo" :alt="item.name">
                </div>
                <h4>
                    {{ item.name }}
                </h4>
            </a>
        </div>
    </div>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
// import { router } from 'vue';
import axios from 'axios';

export default {
    name: 'DigitalStoreView',
    data() {
        return {
            categoryData: null,
            categoryType: this.$route.meta.type,
            categoryId: this.$route.params.id,
            subCategories: null,
        }
    },
    methods: {
        async fetchSubCategories(categoryId) {
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/categories/children/children?category_id=${categoryId}`);
                if (response.data.status === true) {
                    this.subCategories = response.data.data
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
    created() {
        this.fetchSubCategories(this.categoryId)
    },
    mounted() {
        $(`.${this.$route.meta.category_path}`).addClass('active')
        $(`.${this.$route.meta.category_path}`).siblings().removeClass('active')
    },
}
</script>