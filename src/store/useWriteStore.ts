import { getBlogList, getBlogFile } from '@/util/api'
import { defineStore } from 'pinia'

interface Option {
    value: string;
    label: string;
    fileid: number;
}

export const useWriteStore = defineStore('write', {
    state: () => ({
        writeFileList: [] as Option[]
    }),
    getters: {

    },
    actions: {
        async getWriteList(data: {
            techid: number
        }) {
            let res = await getBlogList({
                techid: data.techid
            })
            this.writeFileList = res.data.filelist.map((item: BlogStoreType.FileInfo) => {
                return {
                    value: item.filename,
                    label: item.filename + "/" + item.title,
                    fileid: item.fileid
                }
            })
        },
        cleanWriteList() {
            this.writeFileList = []
        }
    }
})
