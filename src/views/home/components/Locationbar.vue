<script setup>

import { fetchCityName } from "@/utils/fetch_location.js";

import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useCityStore } from "../../../store/modules/city";
import { storeToRefs } from "pinia";

const router = useRouter();

// 获取城市仓库
const cityStore = useCityStore();
const { nowCity } = storeToRefs(cityStore);

let isLocating = ref(false);

// 获取当前位置信息
const getLocation = () => {
  // 判断是否还在定位中
  if (isLocating.value) return;

  // 设置定位信息
  isLocating.value = true;
  cityStore.changeNowCity('定位中...')

  // 开始定位
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("正在定位")
        const { latitude, longitude } = position.coords;
        fetchCityName(latitude, longitude).then(cityName => {
          cityStore.changeNowCity(cityName)
          isLocating.value = false;
        });
        
      },
      error => {
        cityStore.changeNowCity('定位失败')
        isLocating.value = false;
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  } else {
    cityStore.changeNowCity('不支持定位');
    isLocating.value = false;
  }
}

// 获取城市列表
const getCities = () => {
  router.push("/city");
}

</script>

<template>
  <div class="location-bar">
    <div class="location-box">
      <div class="city" @click="getCities">{{ nowCity }}</div>
      <div class="locate" @click="getLocation">
        <span>我的位置</span>
        <img src="../../../assets/imgs/Home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.location-box {
  display: flex;
  justify-content: space-between;

  height: 30px;
  font-size: 14px;
  color: gray;

  .city {
    display: flex;
    align-items: center;
  }

  .locate {
    display: flex;
    align-items: center;
  }

  img {
    padding: 0 0 0 2px;
    height: 60%;
  }
}
</style>
