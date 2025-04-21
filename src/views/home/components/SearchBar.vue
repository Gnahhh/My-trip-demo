<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useHomeStore } from '../../../store/modules/home';
import { useCityStore } from '../../../store/modules/city';
import dayjs from 'dayjs';

// 获取store
const homeStore = useHomeStore();
const cityStore = useCityStore();

// 获取路由
const router = useRouter();

// 颜色样式
const color = '#FF9645';

// 时间数据
const liveStart = ref('8月25日');
const liveEnd = ref('8月26日');
const liveDate = ref(1);
const show = ref(false);

// 选择日期函数
const onConfirm = ([startDate, endDate]) => {
  // 格式化时间
  liveStart.value = dayjs(startDate).format('M月D日');
  liveEnd.value = dayjs(endDate).format('M月D日');
  // 计算天数差
  liveDate.value = dayjs(endDate).diff(dayjs(startDate), 'day');
  show.value = false;
}

// 热门建议
// 数据请求
homeStore.fetchHotSuggestions();
// 获取热门建议
storeToRefs(homeStore);
const { hotSuggestions } = storeToRefs(homeStore);


// 点击搜索跳转
const { nowCity } = storeToRefs(cityStore);
const searchClick = function() {
  router.push({
    path: "/search",
    query: {
      liveStart: liveStart.value,
      liveEnd: liveEnd.value,
      nowCity: nowCity.value
    }
  });
}





</script>

<template>
  <!-- 日期选择 -->
  <div class="select-date">
    <div class="select-bar" @click="show = true">
      <div class="start-date">
        <span class="title gray">入住</span>
        <span class="content">{{ liveStart }}</span>
      </div>
      <div class="data-range">
        <span class="content gray">共{{ liveDate }}晚</span>
      </div>
      <div class="end-date">
        <span class="title gray">离店</span>
        <span class="tontent">{{ liveEnd }}</span>
      </div>
    </div>

    <!-- 细节描述 -->
    <div class="section gray">
      <div class="describe">
        <span>人数不限</span>
        <span>价格不限</span>
      </div>
      <div class="keywords">
        <span>关键字/位置/名宿名</span>
      </div>
    </div>

    <!-- 热门建议 -->
    <div class="hotSuggestions">
      <div class="hotSuggestions-item" v-for="(tag, index) in hotSuggestions" 
        :key="index" 
        :style="{ color: tag.tagText.color, backgroundColor:  tag.tagText.background.color }"
      >
        {{ tag.tagText.text }}
      </div>
    </div>

    <div class="search-button" @click="searchClick">开始搜索</div>
    
    <van-calendar 
      v-model:show="show" 
      type="range" 
      @confirm="onConfirm" 
      :color="color"
      :style="{ height: '60%' }"
    />

  </div>
</template>

<style lang="less" scoped>

.gray {
  color: gray;
}

// 日期选择
.select-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .start-date, .end-date {
    display: flex;
    align-items: center;
    flex-direction: column;
    
    .title {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}

// 其他选择项
.section {
  margin-bottom: 20px;
  padding: inherit;
  padding-left: 0;
  padding-right: 0;
  font-size: 14px;

  .describe {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

// hot tags
.hotSuggestions {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 14px;

  .hotSuggestions-item {
    margin: 6px;
    padding: 2px 10px;
    border-radius: 999px;
  }
}

.search-button {
  margin: 0 auto;
  padding: 10px 0;
  width: 96%;
  border-radius: 999px;
  background-color: transparent;
  background-image: linear-gradient(to right, var(--theme-color), #eec009);
  text-align: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: white;
}
</style>
