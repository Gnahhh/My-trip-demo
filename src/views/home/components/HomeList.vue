<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../../../store/modules/home";
import HomeItemV1 from "../../../components/HomeItem/HomeItemV1.vue";
import HomeItemV2 from "../../../components/HomeItem/HomeItemV2.vue";

// 获取房屋列表
const homeStore = useHomeStore();


const { homeList } = storeToRefs(homeStore);

// 触底请求新的房屋数据
// 创建观察者实例
const homesRef = ref(null);

// 监听homeList数据变化
// 提升intersectionObserver到组件级别
let intersectionObserver = null;

// 监听homeList数据变化
onMounted(async () => {
  // 等待数据加载完成
  await homeStore.fetchHomeList();
  
  // 等待DOM更新
  await nextTick();
  
  // 创建观察器
  setupObserver();
});

// 创建观察器的函数
function setupObserver() {
  // 如果已有观察器，先断开连接
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
  
  // 创建新的观察器
  intersectionObserver = new IntersectionObserver((entries) => {
    // 如果不在视口内，返回
    if (entries[0].intersectionRatio <= 0) return;
    
    // 触发加载更多数据
    loadMoreData();
    
  }, {
    root: null,
    rootMargin: "-20px",
    threshold: 0,
  });
  
  // 确保DOM元素存在
  if (homesRef.value?.lastElementChild) {
    // 开始观察新的最后一个元素
    intersectionObserver.observe(homesRef.value.lastElementChild);
    // console.log("正在观察:", homesRef.value.lastElementChild);
  }
}

// 加载更多数据的函数
async function loadMoreData() {
  // console.log("加载更多数据");
  
  // 解除当前观察
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
  
  // 加载更多数据
  await homeStore.fetchHomeList();
  
  // 等待DOM更新
  await nextTick();
  
  // 重新设置观察器观察新的最后一个元素
  setupObserver();
}

// 组件销毁时清理
onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
});


</script>

<template>
  <div class="homelist">
    <div class="title">
      <h1>热门精选</h1>
    </div>
    <div class="homes" ref="homesRef">
      <template v-for="(item) in homeList" :key="item.data.houseName">
        <HomeItemV1 
          v-if="item.discoveryContentType === 9"
          :houseData="item.data"
        ></HomeItemV1>
        <home-item-v-2 
          v-else-if="item.discoveryContentType === 3"
          :houseData="item.data"
        ></home-item-v-2>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.homelist {
  .title > h1 {
    margin-left: 10px;
    font-size: 22px;
    font-weight: 900;
    /* 使用多个细微偏移的阴影创造更粗的效果 */
    text-shadow: 0 0 1px #000, 0 0 1px #000;
  }

  .homes {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px; /* 负外边距抵消子元素的内边距 */
    
    > div {
      width: 50%; /* 每项占据50%宽度 */
      padding: 8px; /* 内边距创建间隔 */
      box-sizing: border-box; /* 确保padding计入总宽度 */
    }

  }

}


</style>
