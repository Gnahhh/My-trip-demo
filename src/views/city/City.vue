<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCityStore } from '../../store/modules/city';
import { storeToRefs } from 'pinia';

import HotCities from './components/HotCities.vue';

const router = useRouter();

// 输入框文本
const text = ref('');

// 取消返回上一层
const onCancel = () => {
  router.back();
}

// 分页标签
const activeName = ref('');

// 获取城市列表
const cityStore = useCityStore();
cityStore.fetchCitiesData();

const indexBarRefs = ref({}); // 存储各个标签页的索引栏引用

const { cities, indexLists } = storeToRefs(cityStore);

// console.log(indexLists.value);

// 监听是否发生变化
watch(activeName, () => {
  nextTick(() => {
    const scrollElement = document.querySelector('.city-content');
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  });
});

// 城市点击事件
const changeCity = (city) => {
  // console.log(city)
  const cityName = city.cityName;
  cityStore.changeNowCity(cityName);
  router.back();
}

// 监听搜索输入
watch(text, (newValue) => {
  if (!newValue.trim()) {
    // 1. 重置标签选择器
    activeName.value = '';

    // 2. 重置所有IndexBar实例
    Object.keys(indexBarRefs.value).forEach(key => {
      const indexBar = indexBarRefs.value[key];
      if (indexBar) {
        // 尝试使用组件自带的reset方法
        if (typeof indexBar.reset === 'function') {
          indexBar.reset();
        } else {
          // 手动清除激活状态
          nextTick(() => {
            const activeIndices = document.querySelectorAll('.van-index-bar__index--active');
            activeIndices.forEach(el => el.classList.remove('van-index-bar__index--active'));
            
            const activeAnchors = document.querySelectorAll('.van-index-anchor--active');
            activeAnchors.forEach(el => el.classList.remove('van-index-anchor--active'));
          });
        }
      }
    });

    // 3. 清除所有高亮效果
    const highlightElements = document.querySelectorAll('.city-highlight, .city-highlight-pulse, .city-highlight-fade');
    highlightElements.forEach(el => {
      el.classList.remove('city-highlight', 'city-highlight-pulse', 'city-highlight-fade');
    });

    // 4. 清除所有定时器
    const intervalsToClean = window._pulseIntervals || [];
    intervalsToClean.forEach(interval => clearInterval(interval));
    window._pulseIntervals = [];

    // 5. 滚动到顶部
    const scrollContainer = document.querySelector('.city-content');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    return;
  }
  
  // 搜索城市
  searchCity(newValue);
});

// 搜索城市函数
const searchCity = (keyword) => {
  // 使用some替代forEach，可以通过返回true提前终止搜索
  return Object.keys(cities.value).some(key => {
    const category = cities.value[key];
    
    // 1. 检查热门城市
    if (category.hotCities?.length) {
      const match = category.hotCities.find(city => 
        city.cityName.includes(keyword)
      );
      
      if (match) {
        // 切换标签
        activeName.value = category.title;
        
        // 使用单一Promise链代替嵌套setTimeout
        nextTick()
          .then(() => {
            // 滚动到热门区域
            if (indexBarRefs.value[key]) {
              indexBarRefs.value[key].scrollTo('#');
            }
            return nextTick();
          })
          .then(() => {
            // 高亮匹配城市
            highlightCity(match.cityName);
          });
        
        return true; // 终止搜索
      }
    }

    // 2. 检查普通城市
    if (category.cities?.length) {
      // 先找到包含匹配城市的字母组
      const matchingGroup = category.cities.find(group => 
        group.cities.some(city => city.cityName.includes(keyword))
      );
      
      if (matchingGroup) {
        const matchingCity = matchingGroup.cities.find(city => 
          city.cityName.includes(keyword)
        );

        // 切换标签
        activeName.value = category.title;
        
        // 使用Promise链
        nextTick()
          .then(() => {
            // 滚动到字母索引
            if (indexBarRefs.value[key]) {
              indexBarRefs.value[key].scrollTo(matchingGroup.group);
            }
            return nextTick();
          })
          .then(() => {
            // 高亮匹配城市
            highlightCity(matchingCity.cityName);
          });
        
        return true; // 终止搜索
      }
    }
    
    return false; // 继续搜索
  });
}

// 高亮显示城市
const highlightCity = (cityName) => {
  // 首先取消所有现有高亮
  document.querySelectorAll('.city-highlight').forEach(el => {
    el.classList.remove('city-highlight', 'city-highlight-fade');
  });
  
  // 延迟确保DOM更新完毕
  setTimeout(() => {
    const cells = document.querySelectorAll('.van-cell');
    let targetCell = null;
    
    // 精确匹配优先
    for (const cell of cells) {
      const titleEl = cell.querySelector('.van-cell__title');
      if (titleEl && titleEl.textContent.trim() === cityName) {
        targetCell = cell;
        break;
      }
    }

    // 部分匹配作为备选
    if (!targetCell) {
      for (const cell of cells) {
        if (cell.textContent.includes(cityName)) {
          targetCell = cell;
          break;
        }
      }
    }
    
    if (targetCell) {
      // 1. 计算并执行滚动
      const scrollContainer = document.querySelector('.city-content');
      if (scrollContainer) {
        const targetTop = targetCell.offsetTop;
        const offsetTop = 120; // 顶部偏移，避免被标签栏遮挡
        
        // 平滑滚动
        scrollContainer.scrollTo({
          top: targetTop - offsetTop,
          behavior: 'smooth'
        });
      }
      
      // 2. 添加高亮效果
      targetCell.classList.add('city-highlight');
      
      // 3. 创建闪烁动画效果
      let pulseCount = 0;
      const pulseInterval = setInterval(() => {
        targetCell.classList.toggle('city-highlight-pulse');
        pulseCount++;
        
        if (pulseCount >= 4) {
          clearInterval(pulseInterval);
          setTimeout(() => {
            targetCell.classList.add('city-highlight-fade');
            setTimeout(() => {
              targetCell.classList.remove('city-highlight', 'city-highlight-fade', 'city-highlight-pulse');
            }, 600);
          }, 1000);
        }
      }, 300);
    }
  }, 200);
}

</script>

<template>
  <div class="city">
    <div class="serch-box">
      <!-- 搜索框 -->
      <van-search 
        v-model="text" 
        placeholder="城市/区域/位置" 
        shape="round"
        show-action
        clearable
      >
        <template #action>
          <div @click="onCancel">取消</div>
        </template>
      </van-search>

      <!-- 分页标签 -->
      <van-tabs 
        v-model:active="activeName"
        color="#ff9645"
      >
        <template v-for="(value, key, index) in cities" :key="index">
          <van-tab :title="value?.title" :name="value.title"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 城市列表 -->
    <div class="city-content">
      <template v-for="(value, key, index) in cities" :key="index">
        <van-index-bar 
          v-show="value.title === activeName"
          :index-list="indexLists[key]"
          :ref="el => { if(el) indexBarRefs[key] = el }"
        >
          <hot-cities :hotCities="value.hotCities"></hot-cities>
          <template v-for="(item, index) in value.cities" :key="index">
            <van-index-anchor :index="item.group" />
            <template v-for="(item, index) in item.cities" :key="index">
              <van-cell :title="item.cityName" @click="changeCity(item)"/>
            </template>
          </template>
        </van-index-bar>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.city {
  display: flex;
  flex-direction: column;
  padding: 4px 10px 0;
  height: 100vh;
  overflow: hidden;

  .serch-box {
    z-index: 10; /* 确保在内容之上 */
  }

  :deep(.city-highlight) {
    background-color: rgba(255, 150, 69, 0.15) !important; // 添加明显的背景色
    color: var(--theme-color) !important;
    font-weight: bold;
    transform: scale(1.05);
    transition: all 0.3s;
    // 添加微妙的阴影增强视觉效果
    box-shadow: 0 2px 8px rgba(255, 150, 69, 0.2);
  }
  
  :deep(.city-highlight-fade) {
    background-color: transparent !important;
    color: inherit !important;
    font-weight: normal;
    transform: scale(1);
    box-shadow: none;
  }

  .city-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;

     /* 隐藏滚动条但保留滚动功能 */
    -ms-overflow-style: none;  /* IE/Edge */
    scrollbar-width: none;     /* Firefox */

    --van-index-anchor-sticky-text-color: var(--theme-color);
    --van-index-bar-index-active-color: var(--theme-color);
  }

  :deep(.van-search__field .van-field__left-icon) {
    color: var(--theme-color) !important;
  }

  --van-tabs-line-height: 34px;
}

</style>
