<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../../store/modules/home';
import Topbar from './components/Topbar.vue';
import Locationbar from './components/Locationbar.vue';
import SearchBar from './components/SearchBar.vue';
import Categories from './components/Categories.vue';
import HomeList from './components/HomeList.vue';
import StickSearch from './components/StickSearch.vue';

// 获取是否能够显示
const homeStore = useHomeStore();
const { stickSearchVisible } = storeToRefs(homeStore);
const searchBarRef = ref(null);

const observer = ref(null);

onMounted(() => {
  // console.log(searchBarRef.value.searchbarRef);

  observer.value = new IntersectionObserver(entries => {
    if(!entries[0]) return;
    if(!entries[0].isIntersecting) {
      homeStore.showStickSearch();
    } else {
      homeStore.hideStickSearch();
    }
  },{
    root: null,
    threshold: 0,
    rootMargin: "-10px 0px 0px 0px"
  })

  // 如果SearchBar存在，开始观察它
  if (searchBarRef.value) {
    observer.value.observe(searchBarRef.value.searchbarRef);
  }
})

  
// // 组件卸载时停止观察
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

</script>

<template>
  <div class="home-container">
    <Topbar></Topbar>
    <div class="home-container-box">
      <Locationbar></Locationbar>
      <SearchBar ref="searchBarRef"></SearchBar>
      <categories></categories>
      <HomeList></HomeList>
      <div class="sticky">
        <Transition name="slide-down">
          <StickSearch v-show="stickSearchVisible"></StickSearch>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-container-box {
  padding: 4px 12px;

  > * {
    margin-bottom: 15px;
  }

  .sticky {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    .slide-down-enter-active,
    .slide-down-leave-active {
      transition: all 0.3s ease;
    }

    .slide-down-enter-from,
    .slide-down-leave-to {
      transform: translateY(-100%);
      opacity: 0;
    }

    .slide-down-enter-to,
    .slide-down-leave-from {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
