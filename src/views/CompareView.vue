<template>
    <main class="wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i
                    :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ?
                        'Compare' : 'المقارنة' }}
            </div>
        </div>
        <div class="container">
            <div class="table_wrapper compare_wrapper" v-if="compare && compare.length > 0">
                <table>
                    <tbody>
                        <tr>
                            <td>{{ lang == 'en' ? 'Product' : 'المنتج' }}</td>
                            <td v-for="product in compare" :key="product.id"><img style="width: clamp(9.375rem, calc(4.375rem + 10vw), 12.5rem);" :src="product.main_image"></td>
                        </tr>
                        <tr>
                            <td>{{ lang == 'en' ? 'Price' : 'السعر' }}</td>
                            <td v-for="product in compare" :key="product.id">
                                <div class="price">
                                    <h1 v-if="product.price_after_discount">{{ product.price_after_discount ? product.price_after_discount.toLocaleString() : '' }} <span>{{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h1>
                                    <h1><span>{{ product.price.toLocaleString() }}</span> <span>{{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</span></h1>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ lang == 'en' ? 'Availability' : 'التوفر' }}</td>
                            <td v-for="product in compare" :key="product.id">
                                <p class="stock" :class="product.type == 0 ? 'in' : (product.type == 1 ? 'managed' : 'out')">{{ product.type == 0 ? (lang == 'en' ? "In Stock" : "متاح") : (product.type == 1 ? (lang == 'en' ? "Limited Stock" : "كمية محدودة") : (lang == 'en' ? "Out Of Stock" : "نفذت الكمية")) }}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ lang == 'en' ? 'Description' : 'الوصف' }}</td>
                            <td v-for="product in compare" :key="product.id" style="font-size: clamp(0.8125rem, calc(0.5125rem + 0.6vw), 1rem);" v-html="product.desc">
                            </td>
                        </tr>
                        <tr>
                            <td>{{ lang == 'en' ? 'Add To Cart' : 'اضافة الي العربة' }}</td>
                            <td v-for="product in compare" :key="product.id">
                                <button style="cursor: pointer" @click="
                                    addProductToCart(product.id, 1, product.stock, product.type)
                                "><i class="fa-solid fa-cart-shopping"></i> <span>{{ lang == 'en' ? 'Add To Cart' : 'اضافة الى العربة' }}</span></button>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ lang == 'en' ? 'Delete' : 'حذف' }}</td>
                            <td v-for="product in compare" :key="product.id">
                                <div class="remove" style="width: fit-content">
                                    <button @click="removeProductFromCompare(product.id)"><i class="fa fa-close"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h1 v-if="!compare || compare.length == 0"  style="width:100%;margin: 5rem 0px; text-align: center; color: rgb(113, 113, 113);">{{ lang == 'en' ? 'There are no products added to compare' : 'لا توجد منتجات مضافة للمقارنة' }}</h1>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from 'axios';

export default {
    name: 'CompareView',
    data() {
        return {
            about_company: null,
            compare: localStorage.getItem('compare_cart') ? JSON.parse(localStorage.getItem('compare_cart')) : "",
            lang: "en"
        }
    },
    methods: {
        setLangCookies() {
            let langCheck = document.cookie.indexOf('lang')

            this.is_cookies = langCheck >= 0 ? true : false

            function getCookie(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            } // to get an cookie by name ##############################

            if (langCheck !== -1) {
                this.lang = getCookie('lang') // check lang cookie exist ##############################
            }

            if (sessionStorage.getItem("lang"))
                this.lang = sessionStorage.getItem("lang") // check lang session exist ##############################

            sessionStorage.setItem("lang", this.lang); // set lang session ##############################

            let searchParams = new URLSearchParams(window.location.search)
            if (searchParams.has('lang')) {
                this.lang = searchParams.get('lang')
                document.body.classList.add(searchParams.get('lang')) // add lang class ##############################
            } else {
                document.body.classList.add(this.lang) // add lang class ##############################
            }

        },
        async getAbout(lang) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/aboutCompany`,
                    {
                        headers: {
                            "lang": lang
                        }
                    }
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
        async addProductToCart(product_id, qty, product_valid_qty, product_stock) {
            if (product_stock == 2) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This product is not available now'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);

            } else if (product_valid_qty < qty && product_stock == 1) {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'This quantity is not available'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            } else {
                $('.loader').fadeIn().css('display', 'flex')
                try {
                    const response = await axios.post(`https://api.egyptgamestore.com/api/products/${product_id}/add-cart`, {
                        qty: qty,
                        type: 'add',
                    },
                        {
                            headers: {
                                "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                                "lang": this.lang
                            }
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
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                            if (!this.cart || !this.cart.length) {
                                window.location.reload()
                            }
                        }, 1000);
                    } else {
                        $('.loader').fadeOut()
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = response.data.errors[0] == "quantity is not available" || response.data.errors[0] == "الكمية المطلوبة غير متوفرة" ? (this.lang == "ar" ? "نفذت الكمية" : "Quantity not avilable") : (this.lang == "ar" ? "يجب عليك تسجيل الدخول اولا" : "You have to login first!")
                        document.getElementById('errors').append(error)
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
        removeProductFromCompare(id) {
            const array = this.compare;
            
            // Find the index of the object with the specified id
            const indexToRemove = array.findIndex(item => item.id === id);
            console.log(indexToRemove);
            // Remove the object from the array if it exists
            if (indexToRemove !== -1) {
                array.splice(indexToRemove, 1);
                localStorage.setItem('compare_cart', JSON.stringify(array))
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = this.lang == 'ar' ? 'تم حذف العنصر بنجاح' : 'item has been deleted successfully'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                    this.compare  = localStorage.getItem('compare_cart') ? JSON.parse(localStorage.getItem('compare_cart')) : ""
                }, 2000);
            }
        },
        getHomeData() {
            this.setLangCookies()
            this.getAbout(this.lang)
        },

    },
    created() {
        this.getHomeData()
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>