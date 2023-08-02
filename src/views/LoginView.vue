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
                        Account Login
                    </h1>
                    <p>Do have an account? <a href="/register">SignUp</a></p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button">Login</button>
                <p>Forgot Your Password? <a href="/forgot-password">Click Here</a></p>
                <div class="or">
                    <span></span>
                    or
                    <span></span>
                </div>
                <a href="" class="sign"><img src="./../assets/imgs/facebook_icon.jpg" alt="facebook_icon">Sign up With
                    Facebook</a>
                <a href="" class="sign"><img src="./../assets/imgs/google_icon.jpg" alt="google_icon">Sign up With
                    Google</a>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'LoginView',
}
</script>

<style scoped>@import './../assets/css/account.css';</style>