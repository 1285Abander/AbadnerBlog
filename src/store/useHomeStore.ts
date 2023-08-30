import { getHomeList, getBlogFile } from '@/util/api'
import { defineStore } from 'pinia'
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const useHomeStore = defineStore('home', {
  state: () => ({
    homeList: {} as HomeStoreType.HomeListType,
    mode: localStorage.getItem("mode") as string,
    notice: "" as string,
    options: [] as Option[]
  }),
  getters: {
    
  },
  actions: {
    async getHomeList() {
      let res = await getHomeList()
      this.options = [
        {
          value: 'fontend',
          label: '前端',
          children: res.data.fontend.map((item: HomeStoreType.HomeInfo) => {
            return {
              value: item.techid.toString(),
              label: item.techstack
            }
          })
        },
        {
          value: 'backend',
          label: '后端',
          children: res.data.backend.map((item: HomeStoreType.HomeInfo) => {
            return {
              value: item.techid.toString(),
              label: item.techstack
            }
          })
        },
      ];
      this.homeList = res.data
    },
    getMode(mode: string) {
      this.mode = mode
    },
    async getNotice() {
      let res = await getBlogFile({
        filename: 'NEW'
      })
      this.notice = res.data
    }
  }
})
