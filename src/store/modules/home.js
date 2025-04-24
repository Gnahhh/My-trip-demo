import { defineStore } from "pinia";
import { getHotSuggestions, getHomeCategories, getHomeList } from "../../services/modules/home";

export const useHomeStore = defineStore('home', {
  state: () => ({
    // 业务数据
    hotSuggestions: [],
    homeCategories: [],
    homeList: [],
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 86400000,

    // UI状态
    // 新增日历显示状态
    calendarVisible: false,
    stickSearchVisible: false,

    page: 1
  }),
  actions: {
    updateDates(checkIn, checkOut) {
      this.checkInDate = checkIn;
      this.checkOutDate = checkOut;
    },
    // 新增控制日历显示的方法
    showCalendar() {
      this.calendarVisible = true;
    },
    hideCalendar() {
      this.calendarVisible = false;
    },
    // 修改是否显示粘滞
    showStickSearch() {
      this.stickSearchVisible = true;
    },
    hideStickSearch() {
      this.stickSearchVisible = false;
    },
    async fetchHotSuggestions() {
      const { data } = await getHotSuggestions();
      this.hotSuggestions = data;
    },
    async fetchHomeCategories() {
      const { data } = await getHomeCategories();
      this.homeCategories = data;
    },
    async fetchHomeList() {
      const { data } = await getHomeList(this.page++);
      this.homeList.push(...data);
    }
  }
})