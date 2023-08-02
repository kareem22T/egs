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
                        Activation
                    </h1>
                    <p>Please Enter OTP Sent To Your Phone And Email</p>
                </div>
                <div class="input">
                    <input type="password" name="verification_code" id="verification_code" placeholder="Type Your Code">
                    <img src="./../assets/imgs/file-pen-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button">Submit & Complete</button>
                <p>Didn't Recive Code ? <a href="/forgot-password">Send Again</a></p>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'VerifyView',
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>