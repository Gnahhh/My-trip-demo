<template>
  <div id="app">
    <header>{{ title }}</header>
    <!-- <main>
      <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
    </main> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';

let title = ref("我是标题")


</script>