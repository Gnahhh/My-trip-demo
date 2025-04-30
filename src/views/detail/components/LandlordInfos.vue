<script setup>
import InfoItem from '../../../components/Detail/InfoItem.vue';

const props = defineProps({
  landlordInfos: {
    type: Object,
    default: () => ({}),
    required: true // 可选，明确表示该属性不是必须的
  }
})

console.log(props)
</script>

<template>
  <div class="landlord">
    <InfoItem>
      <template #title>房东信息</template>
      <div class="landlord-content">
        <div class="content-caption">
          <h6 class="caption-score">V{{ landlordInfos.businessType }}房东</h6>
          <p class="caption-describe">
            <span class="describe-item" v-for="(item, index) in landlordInfos.hotelSummary" :key="index">
              {{ item.title }}
            </span>
          </p>
        </div>
        <div class="content-infos">
          <div class="landlord-details">
            <div class="details">
              <div class="avator">
                <img :src="landlordInfos.hotelLogo" alt="">
              </div>
              <div class="landlord-names">
                <h5>{{ landlordInfos.hotelName }}</h5>
                <p>
                  <span v-for="(item, index) in landlordInfos.hotelTags" :key="index"
                    :class="{ color: item.tagText.color }"
                  >
                    {{ item.tagText.text }}
                  </span>
                </p>
              </div>
            </div>
            <div class="call">
              联系房东
            </div>
          </div>

          <div class="comment">
            <div class="comment-box" v-for="(item, index) in landlordInfos.hotelSummary" :key="index">
              <p class="comment-title">{{ item.title }}</p>
              <p class="comment-details">{{ item.introduction }}</p>
              <p class="comment-count">{{ item.tip }}</p>
            </div>
          </div>
        </div>
      </div>
      <template #right>了解更多</template>
    </InfoItem>
  </div>
</template>

<style lang="less" scoped>
.landlord {
  
  .landlord-content {

    .content-caption {
      padding: 4px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      background-image: linear-gradient(to right, #9F8CC8, #DBB8F5);
      color: white;

      span {
        font-size: 10px;
      }

      .describe-item:not(:last-child)::after {
        content: "・";
      }
    }
  }

  .content-infos {
    .landlord-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;

      .details {
        display: flex;
        align-items: center;

        .avator {
          margin-right: 4px;
          width: 40px;
          
          img {
            width: 100%;
            border-radius: 50%;
            object-fit: cover; 
          }
        }
      }

      .landlord-names {
        span {
          font-size: 12px;

          &:not(:last-child)::after {
            content: "|";
            margin: 0 2px;
            vertical-align: middle;
          }
        }
      }

      .call {
        padding: 4px 10px;
        // background-color: var(--theme-color);
        background-image: linear-gradient(to right, var(--theme-color), #f1b844);
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        color: white;
      }
    }

    .comment {
      margin: 20px 8px;
      display: flex;
      justify-content: space-between;

      .comment-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin: 0 0 6px;
      }
      
      .comment-details {
        font-size: 13px;
        line-height: 1.4;
        color: #666;
        margin: 0 0 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .comment-count {
        font-size: 12px;
        color: #999;
        margin: 0;
        text-align: right;
      }
    }
  }
}
</style>
