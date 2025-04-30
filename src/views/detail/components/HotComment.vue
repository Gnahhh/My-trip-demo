<script setup>
import InfoItem from '../../../components/Detail/InfoItem.vue';

const props = defineProps({
  hotComments: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="hot-comment">
    <InfoItem>
      <template #title>热门评论</template>
      <div class="hot-comment-box">
        <div class="score">
          <div class="score-infos"><span>{{ hotComments.overall }}</span></div>
          <div class="score-describe">
            <span class="score-describe">{{ hotComments.scoreTitle }}</span>
            <span class="score-describe-count">{{ hotComments.totalCount }}条评论</span>
            <van-rate 
              :modelValue="Number(hotComments.overall)" 
              :color="'var(--theme-color)'" 
              allow-half
              size="12"
              readonly
            />
          </div>
        </div>
        <div class="describe">
          <p class="describe-item" v-for="(desc, index) in hotComments.subScores" :key="index">
            {{ desc }}
          </p>
        </div>
      </div>
      <div class="shorts-comment">
        <span v-for="(short, index) in hotComments.commentTagVo" :key="index"
          :style="{color: short.color}"
        >
          {{ short.text }}
        </span>
      </div>

      <div class="user-comments">
        <div class="user">
          <div class="user-infos">
            <div class="avator">
              <img :src="hotComments.comment.userAvatars" alt="">
            </div>
            <div class="info">
              <p class="name">{{ hotComments.comment.userName }}</p>
              <p class="time">{{ hotComments.comment.checkInDate }}</p>
            </div>
          </div>
          <div class="comment-infos">
            <p>{{ hotComments.comment.commentDetail }}</p>
          </div>
        </div>
      </div>
      <template #right>查看更多</template>
    </InfoItem>
  </div>
</template>

<style lang="less" scoped>
.hot-comment {
  .hot-comment-box {
    display: flex;
    justify-content: space-between;

    .score {
      display: flex;

      .score-infos {
        margin-right: 8px;
        font-size: 40px;
        text-shadow: 1px 1px 0 black;
        overflow: visible;
        
        span {
          position: relative;
          padding-left: 4px;
          z-index: 1;
        }

        span:after {
          content: "";
          position: absolute;
          width: 80%;            /* 与span内容等宽 */
          height: 5px;            /* 横线粗细 */
          background-color: #ff9645;
          bottom: 5px;
          left: 0px;                /* 从左侧开始，而不用负margin */
          border-radius: 4px;
          z-index: -1;
        }
      }

      .score-describe {
        display: flex;
        flex-direction: column;
        padding-top: 2px;

        // 评分标题
        span.score-describe {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-bottom: 4px;
        }

        // 评分数字
        .score-describe-count {
          font-size: 15px;
          color: #666;
          margin-bottom: 6px;
        }

        // 星级组件包装
        .van-rate {
          margin-top: -2px;
        }
      }
    }

    .describe {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;

      .describe-item {
        font-size: 12px;
      }
    }

  }
  .shorts-comment {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;

    span {
      font-size: 14px;
    }
  }

  .user-comments {
    margin-top: 16px;

    .user-infos {
      display: flex;

      .avator {
        width: 44px;

        img {
          width: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        
      }

      .info {
        margin-left: 4px;
        flex: 1;
        
        .name {
          font-size: 15px;
          font-weight: bold;
          color: #333;
          margin: 0 0 4px;
        }
        
        .time {
          font-size: 12px;
          color: #999;
          margin: 0;
        }
      }
    }
  }

  .comment-infos {
    margin-top: 6px;
    p {
      font-size: 13px;
      line-height: 1.6;
      color: #333;
      margin: 0;
    }
  }
}
</style>
