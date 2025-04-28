import { defineStore } from "pinia";
import { getHouseDetails } from "../../services/modules/detail";

export const useDetailStore = defineStore("detailStore", {
  state: () => ({
    detailsInfo: null,
    housePics: null,
    picCategories: null,
    picTitles: {}
  }),

  actions: {
    async fetchHouseDetails(houseId) {
      const data = await getHouseDetails(houseId);
      if (!data) return;
      this.picCategories =  {};
      this.picTitles =  {};
      this.housePics = data.data.mainPart.topModule.housePicture.housePics
      this.detailsInfo = data;

      for (let item of this.housePics) {
        // 标签分类
        if (!this.picTitles[item.enumPictureCategory]) {
          // 移除中括号和冒号
          const cleanTitle = item.title.replace(/[【】\[\]：:]/g, '');
          this.picTitles[item.enumPictureCategory] = cleanTitle;
        }
        // 图片归类
        if(!this.picCategories[item.enumPictureCategory]) {
          this.picCategories[item.enumPictureCategory] = new Array();
          this.picCategories[item.enumPictureCategory].push(item);
        } else {
          this.picCategories[item.enumPictureCategory].push(item);
        }
      }

      // console.log(this.picTitles)
    }
  }
})