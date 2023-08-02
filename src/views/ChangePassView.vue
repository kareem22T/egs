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
                    <input type="password" name="old_password" id="old_password" placeholder="Old Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="new_password" id="new_password" placeholder="New Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <div class="input">
                    <input type="password" name="confirm_new_password" id="confirm_new_password" placeholder="Confirm New Password">
                    <img src="./../assets/imgs/lock-solid.svg" alt="lock icon">
                </div>
                <button type="submit" class="button">Save & Update</button>
                <p>Forgot Your Old Password? <a href="/forgot-password">Click Here</a></p>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'ChangePassView',
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>