<script setup>
const props = defineProps({
  houseData: {
    type: Object,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['homeClick']);

// 处理函数
const handleClick = function() {
  emit('homeClick', props.houseData);
}
</script>

<template>
  <div class="home-item-v2" @click="handleClick">
    <img :src="houseData.image.url" alt="">
    <div class="details">
      <p class="location"><van-icon name="location" />{{ houseData.location }}</p>
      <p class="information">{{ houseData.houseName }}</p>
      <p class="point">{{ houseData.summaryText }}</p>
      <p class="price">${{ houseData.productPrice }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-item-v2 {
  display: flex;
  flex-direction: column;

  img {
    vertical-align: bottom;
    width: 100%;
    border-radius: 2% 2% 0 0;
  }

  .details {
    flex: 1;
    padding: 12px;
    // background-color: red;
    background-color: #f9f7f3;
    border-radius: 0 0 3% 3%;
    text-align: left;
    color: rgb(64, 63, 63);

    .location {
      font-size: 12px;
      color: #717171;
      font-weight: normal;
      display: flex;
      align-items: center;
      
      .van-icon {
        margin-right: 4px;
        position: relative;
        top: -1px;
      }
    }

    .information {
      margin: 6px 0 2px 0;
      font-size: 14px;
      font-weight: 600;
      color: #222;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 限制显示为2行 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
    
    .point {
      font-size: 12px;
      color: #717171;
      font-weight: normal;
      margin-bottom: 4px;
    }
    
    .price {
      font-size: 15px;
      font-weight: 600;
      color: #222;
      margin-top: 4px;
    }

    p {
      margin: 1px;
    }
  }
}
</style>
