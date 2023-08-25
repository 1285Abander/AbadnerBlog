declare namespace HomeStoreType {
    interface HomeInfo {
        techid: number,
        techstack: string,
        techname: string
    }

    interface HomeListType {
        fontend: HomeInfo[],
        backend: HomeInfo[]
    }
}
declare namespace BlogStoreType {
    interface FileInfo {
        fileid: number
        filename: string
        techid: number
        title: string
    }

    interface BlogInfo {
        filelist: FileInfo[],
        techname: HomeStoreType.HomeInfo
    }
}