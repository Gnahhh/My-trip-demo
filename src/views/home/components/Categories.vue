<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../../../store/modules/home";

// 获取数据
const homeStore = useHomeStore();
// 请求数据
homeStore.fetchHomeCategories();
const { homeCategories } = storeToRefs(homeStore);

</script>

<template>
  <div class="categories">
    <template v-for="(item) in homeCategories" :key="item.id">
      <div class="category-item">
        <img :src="item.pictureUrl">
        <p>{{ item.title }}</p>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.categories {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; /* 启用水平滚动条 */
  padding: 12px 0 0 0;
  gap: 20px;
  
  /* 隐藏滚动条 - Webkit浏览器 (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  .category-item {
    flex-shrink: 0;
    text-align: center;
    width: 70px;    /* 固定宽度 */
    font-size: 12px;

    img {
      width: 30px;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }

    p {
      margin: 0; /* 移除默认的上下边距 */
      padding: 0; /* 移除默认的内边距 */
      line-height: 2; /* 设置为字体大小的1倍，最小化行高 */
      height: auto; /* 高度自适应内容 */
      font-size: 12px; /* 控制文字大小 */
    }
  }
}
</style>
