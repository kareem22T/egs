<template>
    <main class="register_wrapper">
        <div class="page-head">
            <div class="container">
                Home <i class="fa-solid fa-chevron-right"></i> Account
            </div>
        </div>
        <div class="container">
            <form action="">
                <div class="head">
                    <h1>
                        Register Your Account
                    </h1>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="email" name="email" id="email" placeholder="Email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" placeholder="Date Of Birth"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" placeholder="Confirm Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button">Register Account</button>
                <p>By clicking here and continuing, <br> I agree to the <a href="/terms">Terms</a> of Service and <a href="/privacy-policy">Privacy Policy</a></p>
                <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <a href="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With Facebook</a>
                <a href="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With Google</a>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'RegisterView',
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>