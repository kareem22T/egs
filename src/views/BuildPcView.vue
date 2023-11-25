<template>
    <main class="category_wrapper wishlist_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">{{ lang == 'en' ? 'Home' : 'الرئيسية' }}</router-link> <i :class="lang == 'en' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i> {{ lang == 'en' ? 'Build PC' : 'جمع حاسوبك' }}
            </div>
        </div>
        <div class="container" style="margin: 0 auto !important">
            <div class="container products" v-if="products && products.length > 0">
                <div class="head">
                    <h2>{{ lang == 'en' ? 'Build Your Computer' : 'جمع الكمبيوتر الخاص بك' }}</h2>
                    <div class="sort">
                        <div>
                            <select name="per_pag" id="per_page" v-model="per_page" @change="this.page = 1; fetchProducts(selectedCategoryId)">
                                <option value="20" selected>{{ lang == 'en' ? 'Show 20 items' : 'عرض 20 عنصر' }}</option>
                                <option value="40">{{ lang == 'en' ? 'Show 40 items' : 'عرض 40 عنصر' }}</option>
                                <option value="60">{{ lang == 'en' ? 'Show 60 items' : 'عرض 60 عنصر' }}</option>
                            </select>
                        </div>
                        <div>
                            {{ lang == 'en' ? 'Sort By:' : 'ترتيب حسب:' }} 
                            <select name="per_pag" id="per_page" v-model="sort_by_price" @change="fetchProducts(this.selectedCategoryId)">
                                <option value="" selected>.................</option>
                                <option value="asc_price">{{ lang == 'en' ? 'Price Low To High' : 'السعر من الارخص للاعلى' }}</option>
                                <option value="desc_price">{{ lang == 'en' ? 'Price High To Low' : 'السعر من الاعلى للارخص' }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="build_wrapper">
                    <div class="table_wrapper cartgories" v-if="categories && categories.length > 0">
                        <table>
                            <thead>
                                <th>{{ lang == 'ar' ? 'Components' : 'المكونات' }}</th>
                            </thead>
                            <tbody>
                                <tr v-for="category in categories" :key="category.id"><td :class="this.selectedCategoryId == category.id ? 'selected' : ''" @click="this.selectedCategoryId = category.id; this.fetchProducts(this.selectedCategoryId)">{{ category.name }} <i v-if="this.selectedItems[category.id]" class="fa-solid fa-check"></i></td></tr>
                            </tbody>
                        </table>
                        <button @click="addProductsToCart" style="padding: 15px 5px; margin-top: 10px;width: 100%"><i class="fa-solid fa-cart-plus"></i> {{ this.lang == 'ar' ? "اضافة العناصر المختارة الي العربة" : " Add Selected items to Cart" }}</button>
                    </div>

                    <div class="body">
                        <div class="product" v-for="item in products" :key="item.id">
                            <img src="./../assets/imgs/shipping_abroad.png" alt="shipping abroad" class="shipping_icon" v-if="item.shipping_abroad">
                            <div class="a_rep">
                                <div class="head">
                                    <div class="left">
                                        <div class="img">
                                            <img :src="item.main_image" :alt="item.name">
                                        </div>
                                        <button :class="this.selectedItems[selectedCategoryId] == item.id ? 'selected' : ''" @click="(this.selectedItems[selectedCategoryId] == item.id) ? this.selectedItems[selectedCategoryId] = undefined : this.selectedItems[selectedCategoryId] = item.id"><i class="fa-regular fa-circle-check"></i> {{ this.selectedItems[selectedCategoryId] == item.id ? ( this.lang == 'ar' ? "مختار" : "Selected" ) : ( this.lang == 'ar' ? "اختر" : "Select" ) }}</button>
                                    </div>
                                    <div class="text">
                                        <div class="prod-name">
                                            <a :href="`/product/${item.id}`" target="_blanck">
                                                {{ item.name }}
                                            </a>
                                            <i @click="addProductToCompare(item)" class="fa-solid fa-arrow-right-arrow-left"></i>
                                        </div>
                                        <div class="prod-name desc" style="cursor: auto;">
                                            <div v-html="item.desc.length > 200 ? item.desc.slice(0, 200) + '...' : item.desc"></div>
                                            <span class="hint-pop-up" v-if="item.desc.length > 200" v-html="item.desc"></span>
                                        </div>
                                    <div style="margin-top: 10px;">
                                        <div class="rate">
                                            <div class="stars">
                                                <i class="fa-regular fa-star active"></i>
                                                <i class="fa-regular fa-star active"></i>
                                                <i class="fa-regular fa-star active"></i>
                                                <i class="fa-regular fa-star active"></i>
                                                <i class="fa-regular fa-star"></i></div>
                                            ( 3 {{ lang == 'en' ? "Reviews" : "مراجعات" }} ) 
                                        </div>
                                        <div style="display: flex;
                                                    gap: 1rem;
                                                    align-items: center;">
                                            <div class="price">
                                                <h1 v-if="item.price_after_discount">{{ item.price_after_discount ? item.price_after_discount.toLocaleString() : '' }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</h1>
                                                <h1>{{ item.price.toLocaleString() }} {{ lang == 'en' ? 'EGP' : 'جنيه مصري' }}</h1>
                                            </div>
                                            <p class="stock" :class="item.type == 0 ? 'in' : (item.type == 1 ? 'managed' : 'out')">{{ item.type == 0 ? (lang == 'en' ? "In Stock" : "متاح") : (item.type == 1 ? (lang == 'en' ? "Limited Stock" : "كمية محدودة") : (lang == 'en' ? "Out Of Stock" : "نفذت الكمية")) }}</p>
                                        </div>
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pagination" v-if="last_page > 1">
                            <div v-for="page_num in last_page" :key="page_num" >
                                <label :for="`page_num_${page_num}`" :class="page_num == page ? 'active' : ''">{{ page_num }}</label>
                                <input type="radio" name="page_num" :id="`page_num_${page_num}`" v-model="page" :value="page_num" @change="fetchProducts(selectedCategoryId)">
                            </div>
                        </div>
                    </div>
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
    name: 'BuildPcView',
    data() {
        return {
            categories: null,
            selectedCategoryId: null,
            products: null,
            per_page: 20,
            page: 1,
            total: 0,
            last_page: 0,
            sort_by_price: null,
            lang: 'en',
            selectedItems: [],
            allAdded: true,
            isuser: true,
        }
    },
    methods: {
        async getCategories() {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/categories/children/children?category_id=34`,
                    {
                        headers: {
                            "lang": this.lang
                        },
                    }
                );
                if (response.data.status === true) {
                    $('.loader').fadeOut()
                    this.categories = response.data.data;
                    this.selectedCategoryId = this.categories[0].id
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
        async addProductToCart(product_id, qty) {
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
                if (response.data.status === false) {
                    this.allAdded = false;
                    this.isuser = response.data.errors[0] == "quantity is not available" || response.data.errors[0] == "الكمية المطلوبة غير متوفرة" ? true : false
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
        async addProductsToCart () {
            $('.loader').fadeIn()
            if (!this.isuser) {
                $('.loader').fadeOut()
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = (this.lang == "ar" ? "يجب عليك تسجيل الدخول اولا" : "You have to login first!")
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')

                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            } else {
                let array = this.selectedItems;
                let methode = (x) => {this.addProductToCart(x, 1)}
                array.forEach(function (value) {
                    methode(parseInt(value))
                })
                setTimeout(() => {
                    if (this.allAdded) {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = this.lang == 'ar' ? "تم اضفة كل العناصر بنجاح" : "Items added succssfuly"
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('.loader').fadeOut()
                            $('#errors').fadeOut('slow')
                            window.location.href = '/my-cart'
                        }, 1500);

                    } else {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = this.lang == 'ar' ? "فشل إضافة بعض العناصر لعدم توفرها" : "Failed to add some items because they are not available"
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')

                        setTimeout(() => {
                            $('.loader').fadeOut()
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                            window.location.href = '/my-cart'
                        }, 3500);
                    }
                }, 1500);

            }
        },
        async fetchProducts(categoryId) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
                const response = await axios.get(`https://api.egyptgamestore.com/api/products/category?category_id=${categoryId}&instock=true&per_page=${this.per_page}&page=${this.page}` + (this.sort_by_price ? `&sort_type=${this.sort_by_price}` : ''), {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token'),
                        "lang": this.lang
                    }
                });
                if (response.data.status === true) {
                    this.products = response.data.data.products
                    this.total = response.data.data.total
                    this.last_page = response.data.data.last_page
                    if (!this.products || !this.products[0])
                        this.showNotProducts = true
                    $('.loader').fadeOut()
                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
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
        addProductToCompare(product) {
            $('.loader').fadeIn()
            if (localStorage.getItem('compare_cart')) {
                if (JSON.parse(localStorage.getItem('compare_cart')).length < 3) {
                    let compare = JSON.parse(localStorage.getItem('compare_cart'));
                    let itemExists1 = compare[0] ? compare[0].id == product.id : false
                    let itemExists2 = compare[1] ? compare[1].id == product.id : false
                    let itemExists3 = compare[2] ? compare[2].id == product.id : false
                    if (!itemExists1 && !itemExists2 && !itemExists3) {
                        compare.push(product)
                        localStorage.setItem('compare_cart', JSON.stringify(compare))
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                            $('.loader').fadeOut()
                        }, 2000);
                    } else {
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'error'
                        error.innerHTML = this.lang == 'ar' ? 'هذا المنتج موجود بالفعل في المقارنة' : 'This product is already in the compare'
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }
                } else {
                    document.getElementById('errors').innerHTML = ''
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = this.lang == 'ar' ? 'المقارنة لا يمكن أن تحتوي على أكثر من 3 عناصر' : 'Compare cannot have more than 3 items'
                    document.getElementById('errors').append(error)
                    $('#errors').fadeIn('slow')
                    setTimeout(() => {
                        $('input').css('outline', 'none')
                        $('#errors').fadeOut('slow')
                        $('.loader').fadeOut()
                    }, 2000);
                }
            } else {
                let compare = []
                compare.push(product)
                localStorage.setItem('compare_cart', JSON.stringify(compare))
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = this.lang == 'ar' ? 'تمت إضافة المنتج للمقارنة بنجاح' : 'product added to compare successfully'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 2000);
            }
        },
        getHomeData() {
            this.setLangCookies()
            this.getCategories().then(() => {
                this.fetchProducts(this.selectedCategoryId)
            })
        },
    },
    created() {
        this.getHomeData()
    },
    mounted() {
        $(document).mousemove(function (e) {
            $('.hint-pop-up').css({
                top: e.clientY,
                left: e.pageX + 10 // Adjust the position to 10px to the right of the mouse
            });
        });
    },
}
</script>

<style scoped>@import './../assets/css/home.css';</style>
<style>
.hint-pop-up {
    position: fixed;
    display: none;
    padding: 10px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    z-index: 99999;
    font-size: 12px;
    border-radius: 10px;
}

.prod-name:hover .hint-pop-up {
    display: block;
}

.prod-name {
    position: relative;
    cursor: pointer;
}
</style>