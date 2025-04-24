<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../../../store/modules/home';
import dayjs from 'dayjs';

// 导入home仓库,获取时间
const homeStore = useHomeStore();
const { checkInDate, checkOutDate } = storeToRefs(homeStore);

// 格式化日期的计算属性
const formattedCheckIn = computed(() => {
  return dayjs(checkInDate.value).format('MM.DD');
});
const formattedCheckOut = computed(() => {
  return dayjs(checkOutDate.value).format('MM.DD');
});

// 切换日期
function changeTime() {
  homeStore.showCalendar();
}

// ----搜索工具
const searchValue = ref("");
const onSearch = function() {

}
const onCancel = function() {

}
</script>

<template>
  <div class="stickSearch">
    <div class="time" @click="changeTime">
      <div class="in">住 {{ formattedCheckIn }}</div>
      <div class="out">离 {{ formattedCheckOut }}</div>
    </div>
    <div class="search">
      <van-search
        v-model="searchValue"
        placeholder="关键字/位置/名宿"
        @search="onSearch"
        @cancel="onCancel"
      >
        <template #left-icon></template>
        <template #right-icon><van-icon name="search" /></template>
      </van-search>
    </div>
  </div>
</template>

<style lang="less" scoped>
.stickSearch {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  text-align: center;;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); 

  .time {
    font-size: 13px;
    position: relative; /* 添加相对定位 */
    
    /* 添加右下角三角形 */
    &::after {
      content: "";
      position: absolute;
      right: -6px;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 8px 8px; /* 控制三角形大小 */
      border-color: transparent transparent #ff8c35 transparent; /* 设置颜色 */
    }
  }

  .search {
    flex: 1;

    .van-search {
      padding: 10px 0 10px 8px;
    }
  }
}
</style>
