import { defineStore } from "pinia";
import { getHotSuggestions, getHomeCategories, getHomeList } from "../../services/modules/home";

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggestions: [],
    homeCategories: [],
    homeList: [],
    page: 1
  }),
  actions: {
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