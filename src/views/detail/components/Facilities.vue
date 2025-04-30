<script setup>
import { computed } from "vue";
import InfoItem from '../../../components/Detail/InfoItem.vue';

const props = defineProps({
  facilities: Object
})

// 计算属性：获取特定类型的设施
const getFacilityByType = computed(() => {
  return (type) => {
    // facilities?.houseFacilitys[item]
    return props.facilities?.houseFacilitys[type] || null
  }
})

</script>

<template>
  <div class="facilities">
    <InfoItem>
        <template #title>房屋设施</template>
        <div class="content">
          <div class="group" v-for="(item, index) in facilities?.facilitySort" :key="index">
            <div class="theme">
              <img :src="getFacilityByType(item)?.icon" alt="">
              <p>{{ getFacilityByType(item)?.groupName }}</p>
            </div>
            
            <div class="details-grid">
              <div class="details-item" v-for="(facs, index) in getFacilityByType(item)?.facilitys.slice(0, 4)" :key="index">
                <van-icon name="passed" color="#DFF8FA" />
                <p>{{ facs.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <template #right><span>查看全部设施</span></template>
      </InfoItem>
  </div>
</template>

<style lang="less" scoped>
.facilities{
    margin: 30px 0;

    .content {
      display: flex;
      flex-direction: column;
      gap: 25px;
      margin: 20px 10px;
    }

    .group {
      display: grid;
      grid-template-columns: 80px 1fr; /* 固定标题宽度为80px */

      .theme {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        
        img {
          width: 22px;
          height: 22px;
          margin-bottom: 3px;
        }
      }

      .details-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);  /* 两列等宽 */
        grid-gap: calc(5px + 1vh) calc(10px + 8vw);  
        
        margin-left: 30px;       

        .details-item {
          display: flex;
          align-items: center;
        }

        .van-icon {
          flex-shrink: 0;
          font-size: 16px;
          margin-right: 6px;
        }
        
      }

      p {
        font-size: 13px;
        margin: 0;
        white-space: nowrap;
      }
    }
  }
</style>
