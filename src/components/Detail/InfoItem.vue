<script setup>
defineProps({
  // 是否显示右侧箭头
  showArrow: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="info-item">
    <div class="left-content">
      <slot></slot>
    </div>

    <div class="right-content">
      <slot name="right">
      </slot>
      <van-icon v-if="showArrow" name="arrow" class="arrow-icon" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 8px 0;

  .right-content {
    display: flex;
    align-items: end;
    color: #ff9645;
  }
}
</style>
