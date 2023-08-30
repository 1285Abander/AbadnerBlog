import http from "./https";

const getHomeList = () => http('/index/maintable')
const getBlogList = (data: {
    techid: number
}) => http(`/index/getfilename`, 'get', data)
const getBlogFile = (data: {
    filename: string
}) => http(`/index/markdown`, 'get', data)
const postAddFile = (data: {
    filename: string,
    techid: number,
    title: string
}) => http(`/index/addMrakdown`, 'post', data)

const PostChangeFile = (data: {
    filename: string,
    context: string
}) => http(`/index/changeMarkdown`, 'post', data)

const postDeleteFile = (data: {
    filename: string,
    fileid: number
}) => http(`/index/deleteMarkdown`, 'post', data)


export {
    getHomeList,
    getBlogList,
    getBlogFile,
    postAddFile,
    PostChangeFile,
    postDeleteFile
}