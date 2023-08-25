import http from "./https";

const getHomeList = () => http('/index/maintable')
const getBlogList = (data: {
    techid: number
}) => http(`/index/getfilename`, 'get', data)
const getBlogFile = (data:{
    filename:string
}) => http(`/index/markdown`, 'get', data)

export {
    getHomeList,
    getBlogList,
    getBlogFile
}