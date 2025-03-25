<script setup>
// 导入标题
import Topbar from './components/Topbar.vue';
import Locationbar from './components/Locationbar.vue';
import SearchBar from './components/SearchBar.vue';

</script>

<template>
  <div class="home-container">
    <Topbar></Topbar>
    <div class="home-container-box">
      <Locationbar></Locationbar>
      <SearchBar></SearchBar>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-container-box {
  padding: 4px 12px;

  > * {
    margin-bottom: 15px;
  }
}
</style>
