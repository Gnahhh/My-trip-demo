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
  <div class="home-item-v1" @click="handleClick">
    <img :src="houseData.image.url" alt="">
    <div class="details">
      <div class="title">{{ houseData.summaryText }}</div>
      <div class="information">{{ houseData.houseName }}</div>
      <div class="grade">
        <van-rate 
          :modelValue="Number(houseData.commentScore)" 
          readonly 
          allow-half 
          void-color="white"
          color="orange"
          size="14"
          gutter="2"
        />
        <p class="pride">${{ houseData.productPrice }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-item-v1 {
  position: relative;

  img {
    vertical-align: bottom;
    width: 100%;
    height: 100%; /* 图片占满整个容器高度 */
    border-radius: 3%;
    object-fit: cover;
  }

  .details {
    z-index: 1;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    margin: 8px;
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius:  0 0 3% 3%;
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    color: #fff;

    .information {
      margin: 6px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 限制显示为2行 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .grade {
      display: flex; 
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0;
      }
    }
  }
}
</style>
