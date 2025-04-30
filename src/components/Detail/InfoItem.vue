<script setup>
import { useSlots } from "vue";
defineProps({
  // 是否显示右侧箭头
  showArrow: {
    type: Boolean,
    default: true
  }
})

// 获取插槽
const slot = useSlots();

const hasTitleContent = function() {
  return slot.title;
}
</script>

<template>
  <div class="info-item" :class="{ 'has-title': hasTitleContent() }">
    <h1 class="title"
      v-if="hasTitleContent()"
    >
      <slot name="title"></slot>
    </h1>

    <div class="content" :class="{'has-title-layout': hasTitleContent()}">
      <div class="info">
        <slot></slot>
      </div>
      <div class="show-more">
        <slot name="right"></slot>
        <van-icon v-if="showArrow" name="arrow" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.info-item {
  position: relative;
  width: 100%;
  padding-bottom: 4px;
  margin-bottom: 20px;

  &.has-title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, #f0f0f0, transparent);
  }
  
  // 标题样式
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  // 内容区域
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    // 有标题时的特殊布局
    &.has-title-layout {
      flex-direction: column;

      .info {
        width: 100%;
        align-self: flex-start;
      }

      .show-more {
        align-self: flex-end;
      }
    }

    // 主要信息区域
    .info {
      flex: 1;
      min-width: 0; // 确保文本可以正确截断
      overflow: hidden;
      text-overflow: ellipsis;
    }
    // 右侧区域
    .show-more {
      display: flex;
      align-items: center;
      
      margin-left: 12px;
      font-size: 14px;
      color: #ff9645;
      white-space: nowrap; // 防止右侧内容换行
      
      .arrow-icon {
        margin-left: 4px;
      }
    }
  }
}
</style>
