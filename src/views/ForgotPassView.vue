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
                        Reset your password
                    </h1>
                    <p>We will send you an email to reset your password.</p>
                </div>
                <div class="input">
                    <input type="text" name="email" id="email" placeholder="Type Your Email">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <button type="submit" class="button">Reset Now !</button>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'ForgotPassView',
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>