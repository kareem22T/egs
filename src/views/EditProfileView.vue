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
                        Edit My Profile
                    </h1>
                    <p>Edit Then Click Update Now</p>
                </div>
                <div class="input">
                    <input type="text" name="phone" id="phone" placeholder="Phone Number" value="01550552371">
                    <img src="./../assets/imgs/phone-solid.svg" alt="phone icon">
                </div>
                <div class="input">
                    <input type="text" name="email" id="email" placeholder="Email" value="kotbekareem74@gmail.com">
                    <img src="./../assets/imgs/envelope-regular.svg" alt="email icon">
                </div>
                <div class="input">
                    <input type="text" name="dob" id="dob" placeholder="Date Of Birth"
                    onfocus="(this.type='date')" onblur="(this.type='text')" class="form-control" value="10/2/2004">
                    <img src="./../assets/imgs/calendar-days-regular.svg" alt="calendar icon">
                </div>
                <button type="submit" class="button">Update Now !</button>
            </form>
        </div>
    </main>
</template>

<script>
export default {
    name: 'EditProfileView',
}
</script>

<style scoped>
@import './../assets/css/account.css';
</style>