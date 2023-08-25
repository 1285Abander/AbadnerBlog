import { getBlogList, getBlogFile } from '@/util/api'
import { defineStore } from 'pinia'


export const useBlogStore = defineStore('blog', {
    state: () => ({
        blogList: {} as BlogStoreType.BlogInfo,
        markdowm: "" as string
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
            if (res.data.filelist.length != 0)
                this.getBlogFile({
                    filename: res.data.filelist[data.activeIndex].filename
                })
            else {
                this.getBlogFile({
                    filename: 'BUILD'
                })
            }
        },

        async getBlogFile(data: {
            filename: string
        }) {
            let res = await getBlogFile(data)
            this.markdowm = res.data
        }
    }
})
