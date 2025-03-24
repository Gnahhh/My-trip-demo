<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getImageUrl } from "@/utils/load_assets.js";

const router = useRouter();

const tabbarData = [
  {
    path: "/home",
    title: "首页",
    img: "tab_home.png",
    imgActive: "tab_home_active.png"
  },
  {
    path: "/favor",
    title: "喜欢",
    img: "tab_favor.png",
    imgActive: "tab_favor_active.png"
  },
  {
    path: "order",
    title: "订单",
    img: "tab_order.png",
    imgActive: "tab_order_active.png"
  },
  {
    path: "message",
    title: "消息",
    img: "tab_message.png",
    imgActive: "tab_message_active.png"
  }
]

// 当前活跃的索引
const activeIndex = ref(0);

// barItem点击事件
const barItemClisk = (index, path) => {
  activeIndex.value = index;
  router.push(path);
}
</script>

<template>
  <div class="tabbar">
    <ul>
      <template v-for="(item, index) in tabbarData" :key="index">
        <li class="item" :class="{ active: activeIndex === index }" @click="barItemClisk(index, item.path)">
          <img :src="getImageUrl(activeIndex === index ? item.imgActive : item.img)" />
          <span>{{ item.title }}</span>
        </li>
      </template>
      
    </ul>
  </div>
</template>

<style lang="less" scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;

  ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 34px;

      &.active {
        color: var(--theme-color);
      }

      span {
        font-size: 76%;
      }

      img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
      }
    }
  }


}
</style>
