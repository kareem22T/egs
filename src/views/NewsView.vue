<template>
    <main class="news_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> News
            </div>
        </div>
        <div class="container">
            <section class="news">
                <div class="news" v-if="news">
                    <div class="news-card" v-for="article in news" :key="article.id">
                        <div class="thumbanail">
                            <img :src="article.img" alt="">
                        </div>
                        <div class="text">
                            <h1 class="title">{{ article.title }}</h1>
                            <p class="bref" v-html="article.desc.length >= 750 ? article.desc.slice(0, 750) + '...' : article.desc">
                            </p>
                            <div>
                                <span class="date"><i class="fa-regular fa-calendar-days"></i> 30/6/2023</span>
                                <router-link  :to="`/news/${article.id}`" class="read-more">Read More <i class="fa-solid fa-angle-right"></i></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- <div class="pagination" v-if="last_page > 1">
                <div v-for="page_num in 20" :key="page_num" >
                    <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                    <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="getNews(page_num)">
                </div>
            </div> -->

            <div class="pagination" v-if="last_page > 1">
            <div v-for="pageNumber in displayedPages" :key="pageNumber">
                <label :for="`page_num_${pageNumber}`" :class="pageNumber == page ? 'active' : ''">{{ pageNumber }}</label>
                <input type="radio" name="page_num" :id="`page_num_${pageNumber}`" v-model="page" :value="pageNumber" @change="getNews(pageNumber)">
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
    name: 'NewsView',
    data() {
        return {
            questions: null,
            news: null,
            total: 0,
            last_page: 1,
            page: 1
        }
    },
    methods: {
        async getNews(page) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/news?per_page=20&page=${page}`,
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.news = response.data.data.news
                    this.total = response.data.data.total
                    this.last_page = response.data.data.last_page
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
        },
    },
    created() {
        this.getNews(this.page)
    },
    mounted() {
        // $(document).on('click', '.question', function () {
        //     $(this).find('.answer').slideToggle('fast')
        //     $(this).find('.question-value i').toggleClass('fa-chevron-down fa-chevron-up')
        // })
    },
    computed: {
        displayedPages() {
            let startPage = this.page - 2;
            let endPage = this.page + 10;

            // If the startPage is less than 1, adjust it to 1
            if (startPage < 1) {
                startPage = 1;
            }

            // If the endPage is greater than the last_page, adjust it to last_page
            if (endPage > this.last_page) {
                endPage = this.last_page;
            }

            // Calculate the range of pages to be displayed
            const length = endPage - startPage + 1;

            // Generate an array with the range of pages
            return Array.from({ length }, (_, i) => startPage + i);
        },
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>