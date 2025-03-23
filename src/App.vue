<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-show="!route.meta.notShowTabbar"></tabbar>
  </div>
</template>

<script setup>
// 导入组件
import { useRoute } from 'vue-router';
import Tabbar from './components/Tabbar/Tabbar.vue';

const route = useRoute();

// 导入功能
import { ref, useAttrs } from 'vue';

let title = ref("我是标题")


</script>