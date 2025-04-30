<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useDetailStore } from '../../store/modules/detail';
import { useRouter } from 'vue-router';

import DetailTitles from "./components/DetailTitles.vue";
import Facilities from "./components/Facilities.vue";
import LandlordInfos from "./components/LandlordInfos.vue";
import HotComment from "./components/HotComment.vue";

const props = defineProps({
  houseId: String
})

// 获取路由
const router = useRouter();

const detailStore = useDetailStore();
// 请求数据
detailStore.fetchHouseDetails(props.houseId);

// 获取数据
const { detailsInfo, housePics, picCategories, picTitles } = storeToRefs(detailStore);

// 获取轮播实例
const swipeRef = ref(null);

// 添加跳转到类别的方法
function jumpToCategory(category) {
  if (!housePics.value || !swipeRef.value) return;
  
  // 查找该类别的第一张图片
  const targetIndex = housePics.value.findIndex(item => 
    String(item.enumPictureCategory) === String(category)
  );
  
  if (targetIndex >= 0) {
    // 跳转到找到的索引位置
    swipeRef.value.swipeTo(targetIndex);
  }
}

</script>

<template>
  <div class="homeDetails">
    <van-nav-bar 
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="router.back()"
    />
    <div class="detail">
      <!-- {{detailsInfo}} -->
      <van-swipe 
        ref="swipeRef"
        class="my-swipe" 
        :autoplay="3000" 
        indicator-color="white"
      >
        <van-swipe-item 
          v-for="(item, index) in housePics"
          :key="index"
        >
          <img :src="item.url">
        </van-swipe-item>
        <template #indicator="{ active }">
          <div 
            class="indicator-list"
            v-if="picCategories && Object.keys(picCategories).length > 0"    
          >
            <span 
              v-for="(value, key) in picCategories" 
              :key="key"
              class="indicator"
              :class="{ active: housePics[active]?.enumPictureCategory == key}"
              @click="jumpToCategory(key)"
            >
              {{ picTitles[key] }}<span v-show="housePics[active]?.enumPictureCategory == key">: </span>
              <span 
                v-show="housePics[active]?.enumPictureCategory == key"
              >
                {{ picCategories[key].findIndex(pic => pic.url === housePics[active]?.url) + 1 }} / {{ picCategories[key].length }}
              </span>
            </span>
          </div>
        </template>
      </van-swipe>

      <div class="detail-content">
        <DetailTitles :titleInfos="detailsInfo?.data?.mainPart?.topModule"></DetailTitles>
        <Facilities :facilities="detailsInfo?.data?.mainPart?.dynamicModule?.facilityModule?.houseFacility"></Facilities>
        <LandlordInfos :landlordInfos="detailsInfo?.data?.mainPart?.dynamicModule?.landlordModule"></LandlordInfos>
        <HotComment :hotComments="detailsInfo?.data?.mainPart?.dynamicModule?.commentModule"></HotComment>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.homeDetails {
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;


  --van-nav-bar-icon-color: #ff9645;
  --van-nav-bar-text-color: #ff9645;
  --van-nav-bar-title-text-color: #333;
  --van-nav-bar-background: #fff;
  --van-nav-bar-arrow-size: 16px;


  .detail {
    flex: 1;
    overflow-y: auto;

    .my-swipe {
      height: 200px; 

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .indicator-list {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        gap: 8px;
        padding: 3px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 16px;
        backdrop-filter: blur(2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;


        .indicator {
          padding: 4px 8px;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;          
        }

        .active {
          color: white;
          background: #ff9645;
          transform: scale(1.05);
          box-shadow: 0 2px 4px rgba(255, 150, 69, 0.3);
        }
      }
    }

    .detail-content {
      padding: 8px 18px;
      width: 100%;
      overflow-wrap: break-word; /* 允许长单词换行 */
      word-break: break-word;    /* 在适当位置断开单词 */
      white-space: normal;       /* 正常换行 */
      overflow: hidden;
    }

  
  }
}
</style>
