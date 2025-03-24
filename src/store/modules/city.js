import { defineStore } from "pinia";
import getCity from "../../services/modules/city";

export const useCityStore = defineStore("city", {
  state: () => ({
    cities: {},
    nowCity: "请选择城市...",
    indexLists: {}
  }),
  actions: {
    async fetchCitiesData() {
      const cityData = await getCity();
      this.cities = cityData.data;

      // 遍历索引
      Object.keys(this.cities).forEach(key => {
        this.indexLists[key] = new Set();
        const category = this.cities[key];
        if (category.hotCities.length > 0) {
          this.indexLists[key].add("#");
        }
        for (const item of category.cities) {
          this.indexLists[key].add(item.group);
        }
        // 最后将 Set 转换为数组
        this.indexLists[key] = [...this.indexLists[key]];
      })
    },
    changeNowCity(city) {
      this.nowCity = city;
      // console.log(this.nowCity);
    }
  }
})