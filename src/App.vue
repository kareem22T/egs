<template>
  <main-header/>
  <router-view/>
  <main-footer/>
</template>

<script>
import MainHeader from './components/HeaderComponent.vue';
import MainFooter from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style>
@import './assets/css/main.css';
</style>
