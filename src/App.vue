<template>
  <main-header/>
  <router-view/>
  <main-footer/>
  <div class="loader" style="background-color: #fff;">
    <div class="custom-loader"></div>
  </div>
  <div id="errors"></div>
</template>

<script>
import MainHeader from './components/HeaderComponent.vue';
import MainFooter from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  },
  mounted() {
  },
}
</script>

<style>
@import './assets/css/main.css';
#errors {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 1.25rem * 2);
  gap: 1rem;
  z-index: 99999999999999999999;

}
#errors >* {
  width: 100%;
  color: #fff;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

#errors .error {
  background: #e41749;
}
#errors .success {
  background: #12c99b;
}
.loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
  background: #000000a1 !important;
  backdrop-filter: blur(1px);
  display: none;
}
.custom-loader {
  --d:22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #ff3100;
  box-shadow: 
    calc(1*var(--d))      calc(0*var(--d))     0 0,
    calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
    calc(0*var(--d))      calc(1*var(--d))     0 2px,
    calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
    calc(-1*var(--d))     calc(0*var(--d))     0 4px,
    calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
    calc(0*var(--d))      calc(-1*var(--d))    0 6px;
  animation: s7 1s infinite steps(8);
}

@keyframes s7 {
  100% {transform: rotate(1turn)}
}
</style>
