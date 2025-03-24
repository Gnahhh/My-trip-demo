<script setup>
import { useRouter } from 'vue-router';
import { useCityStore } from '../../../store/modules/city';

const router = useRouter();

const props = defineProps({
  hotCities: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 获取仓库
const cityStore = useCityStore();

// 城市点击事件
const changeCity = (city) => {
  const cityName = city.cityName;
  cityStore.changeNowCity(cityName);
  router.back();
}

</script>

<template>
  <div class="hot-cities">
    <van-index-anchor index="热门" />
    <div class="hot-cities-list">
      <template v-for="(item, index) in props?.hotCities" :key="index">
        <van-cell class="hot-cities-list-item" :title="item.cityName" @click="changeCity(item)"/>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .hot-cities-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px 0;
    text-align: center;

    :deep(.van-cell) {
      padding: 8px 0;

      /* 移除下边框 */
      &::after {
        display: none;
      }
    }
  }
</style>
