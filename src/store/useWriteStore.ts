import { getBlogList } from '@/util/api'
import { defineStore } from 'pinia'


export const useWriteStore = defineStore('write', {
    state: () => ({
        blogList: {} as BlogStoreType.BlogInfo,
    }),
    getters: {

    },
    actions: {
        async getBlogList(data: {
            techid: number,
            activeIndex: number
        }) {
            let res = await getBlogList({
                techid: data.techid
            })
            this.blogList = res.data
        },
    }
})
