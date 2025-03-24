<script setup>

</script>

<template>
  <div class="topbar">
    <div class="head">
      <span>my-vue-demo</span>
    </div>
    <div class="banner">
      <img src="@/assets/imgs/Home/banner.webp" alt="">
    </div>
  </div>
</template>

<style lang="less" scoped>
.topbar {

  .head {
    padding: 10px 0;
    text-align: center;
    color: var(--theme-color);
    font-size: var(--theme-size);
    background-color: white;
  }

  .banner {
  width: 100%;

    img {
      width: 100%;
      // aspect-ratio: 4 / 3;
      object-fit: contain;
    }
  }
}
</style>
