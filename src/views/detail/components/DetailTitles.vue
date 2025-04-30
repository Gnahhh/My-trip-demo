<script setup>
import InfoItem from "../../../components/Detail/InfoItem.vue";

const props = defineProps({
  titleInfos: Object,
})

</script>

<template>
  <div class="detail-titles">
    <p class="header">
      {{ titleInfos?.houseName }}
    </p>
    <div class="tags">
      <span 
        v-for="(value, key) in titleInfos?.houseTags" 
        class="tag"
        :key="key"
        :style="{ 
          color: value?.tagText?.color, 
          backgroundColor: value?.tagText?.background?.color 
        }"
      >
        {{ value?.tagText?.text }}
      </span>
    </div>
    <div class="comment-content">
      <InfoItem>
        <p>
          <span class="score">{{ titleInfos?.commentBrief?.scoreTitle }}</span>
          <span class="prase">{{ titleInfos?.commentBrief?.overall }}</span>
          <span class="comment">"{{ titleInfos?.commentBrief?.commentBrief }}"</span>
        </p>
        <template v-slot:right>
          <span class="comment-count">
            {{ titleInfos?.commentBrief?.totalCount }}条评论
          </span>
        </template>
      </InfoItem>
    </div>
    <div class="location">
      <InfoItem>
        <p>{{ titleInfos?.nearByPosition?.address }}</p>
        <template #right><span>地图-周边</span></template>
      </InfoItem>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail-titles {
  .header {
    margin: 4px 0;
    font-size: large;
    font-weight: bold;
    line-height: 1.4;
    letter-spacing: 0.02em;
  }
  .tags {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;  

    /* 隐藏滚动条 - Webkit浏览器 */
    &::-webkit-scrollbar {
      display: none;
    }

    .tag {
      font-size: 11px;
      padding: 1px;
      margin: 2px;
    }
  }

  .comment-content {
    margin: 16px 0;
    border-radius: 8px;
    
    p {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 0;
      
      // 评分标题
      .score {
        font-size: 14px;
        color: #666;
        margin-right: 8px;
      }
      
      // 评分数值
      .prase {
        font-size: 22px;
        font-weight: bold;
        color: #ff9645;
        margin-right: 12px;
      }
      
      // 评论内容
      .comment {
        font-size: 14px;
        color: #333;
        font-style: italic;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
        // 确保引号与文本一起
        white-space: nowrap;
        display: inline-block;
      }
    }
    
    // 评论数量
    .comment-count {
      font-size: 13px;
    }
  }

  .location {
    margin: 16px 0;
    
    p {
      margin: 0;
      font-size: 14px;
      color: #333;
      // 地址文本可能很长，添加省略号
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      
      // 添加位置图标
      &::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>') no-repeat;
        background-size: contain;
        vertical-align: top;
        margin-right: 6px;
      }
    }
  }
}
</style>
