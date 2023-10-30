<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                <router-link to="/">Home</router-link> <i class="fa-solid fa-chevron-right"></i> Account
            </div>
        </div>
        <div class="container">
            <form action="">
                <div class="head">
                    <h1>
                        Edit My Profile
                    </h1>
                    <p>Edit Then Click Update Now</p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" placeholder="Date Of Birth"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <button type="submit" class="button">Update Now !</button>
            </form>
        </div>
    </main>
</template>

<script>
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// import { getUser } from './../assets/js/get-user';

export default {
    name: 'EditProfileView',
    data() {
        return {
            user: null,
        }
    },
    mounted() {
        this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
        $('#phone').val(this.user.phone ? this.user.phone : null)
        $('#email').val(this.user.email ? this.user.email : null)
        $('#dob').val(this.user.dob ? this.user.dob : null)
    },
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>