<script setup lang="ts">
import { reactive, onMounted, ref, nextTick } from "vue"
import { notification, message } from 'ant-design-vue';
import { getBlogFile } from "@/util/api"
import { useHomeStore } from "@/store/useHomeStore";
import { useWriteStore } from "@/store/useWriteStore"
import MyIcon from "@/util/MyIcon"
import BlogSuspended from "@/views/BlogView/components/BlogSuspended.vue"
import { postAddFile, postDeleteFile, PostChangeFile } from "@/util/api"

const HomeStore = useHomeStore()
const WirteStore = useWriteStore()

HomeStore.getHomeList()
const text = ref('')
const techValue = ref<string[]>([])
const fileValue = ref("")
const visible = ref(false)
const modalVisible = ref(false)
const filenameValue = ref("")
const titleValue = ref("")

let fileid: number | null
let techid: number | null

const openModal = () => {
    modalVisible.value = true
}

const upLoadMd = () => {
    console.log(text)
    if (localStorage.getItem("token") === "Abander")
        PostChangeFile({
            filename: fileValue.value,
            context: text.value
        }).then(res => {
            info("success", res.data)
            modalVisible.value = false
        })
    else
        info("info", '没有权限哦')
}


const onChange = (v: string[]) => {
    console.log(v)
    if (v) {
        techid = Number(v[1])
        WirteStore.getWriteList({
            techid: Number(v[1])
        })
    } else {
        techid = null
    }
    fileValue.value = ''
    text.value = ""
    fileid = null
    WirteStore.cleanWriteList()
}

const handleChange = (v: string) => {
    console.log(v)
    if (v) {
        getBlogFile({
            filename: v
        }).then(res => {
            text.value = res.data
        })
        fileid = WirteStore.writeFileList[WirteStore.writeFileList.findIndex(item => {
            return item.value === v
        })].fileid
    }
}

const info = (type: string, res: string) => {
    switch (type) {
        case "success":
            message.success(
                res
            );
            break;
        case "info":
            message.info(
                res
            )
            break;
        default:
            break;
    }

}

const onOpenAdd = () => {
    if (visible.value) {
        if (techid && filenameValue.value !== "" && titleValue.value !== "") {
            console.log(techid, filenameValue.value, titleValue.value)
            if (localStorage.getItem("token") === "Abander") {
                postAddFile({
                    filename: filenameValue.value,
                    techid,
                    title: titleValue.value
                }).then(res => {
                    console.log(res)
                    info("success", res.data)
                })
                WirteStore.getWriteList({
                    techid
                })
                onAddClose()
            }
            else
                info("info", '没有权限哦')

        } else {
            notification.open({
                message: '请输入完整信息',
                description:
                    `当前缺少：
                    ${techid ? "" : "技术栈选择"}
                    ${filenameValue.value !== "" ? "" : "文件名"}
                    ${titleValue.value !== "" ? "" : "标题"}
                    `,
            });
        }
    } else {
        visible.value = true;
    }
}

const onAddClose = () => {
    visible.value = false;
    filenameValue.value = ""
    titleValue.value = ""
}

const onDel = () => {
    if (fileid) {
        if (localStorage.getItem("token") === "Abander") {
            postDeleteFile({
                fileid,
                filename: fileValue.value
            }).then(res => {
                info("success", res.data)
            })
            fileValue.value = ''
            text.value = ""
            fileid = null
        }
        else
            info("info", '没有权限哦')

    }
}

//快捷键重写

onMounted(() => {
    let txtarea = document.querySelector("textarea");
    if (txtarea)
        txtarea.onkeydown = (e) => {
            console.log(e.key);
            if (e.ctrlKey && e.shiftKey) {
                e.preventDefault()
                switch (e.key) {
                    case "~":
                        let start = txtarea?.selectionStart;
                        let finish = txtarea?.selectionEnd;
                        if (start && finish && start !== finish) {
                            let allText = txtarea?.value;
                            let sel = allText?.substring(start, finish);
                            text.value = allText?.substring(0, start) + "`" + sel + "`" + allText?.substring(finish, allText.length);
                            nextTick(() => {
                                txtarea?.setSelectionRange((start as number) + 1, (finish as number) + 1)
                            })
                        } else {
                            info("info", "要先选中哦~")
                        }
                        break;
                    default:
                        break;
                }
            } else if (e.ctrlKey) {
                switch (e.key) {
                    case "d":
                        console.log(1)
                        e.preventDefault()
                        let start = txtarea?.selectionStart;
                        let finish = txtarea?.selectionEnd;
                        while (text.value[(start as number) - 1] >= "A" && text.value[(start as number) - 1] <= "Z" || text.value[(start as number) - 1] >= "a" && text.value[(start as number) - 1] <= "z") {
                            (start as number) -= 1;
                        }
                        while (text.value[(finish as number) + 1] >= "A" && text.value[(finish as number) + 1] <= "Z" || text.value[(finish as number) + 1] >= "a" && text.value[(finish as number) + 1] <= "z") {
                            (finish as number) += 1;
                        }
                        txtarea?.setSelectionRange((start as number), (finish as number) + 1)
                        break;
                    default:
                        break;
                }
            }
        }
})

const handleUploadImage = () => {
    
}

</script>

<template>
    <div class="writeTotal">
        <div class="chooseTech" ref="drawerOwner">
            <a-cascader v-model:value="techValue" style="margin-right: 2vh;" :options="HomeStore.options"
                placeholder="请选择技术栈" @change="onChange" />
            <a-select ref="select" v-model:value="fileValue" style="width:200px;margin-right: 2vh;"
                :options="WirteStore.writeFileList" @change="handleChange" aria-placeholder="请选择文件">
            </a-select>
            <a-button type="primary" shape="circle" @click="onOpenAdd" style="margin-right: 2vh;">
                <template #icon>
                    <MyIcon class="icon" :type="visible ? 'icon-duigoux' : 'icon-jiahao'" />
                </template>
            </a-button>
            <div class="drawerBox" style="margin-right: 15px;">
                <a-drawer placement="left" :closable="false" style="background-color: var(--theme_bg_color)"
                    :visible="visible" :get-container="false" :wrap-style="{ position: 'absolute' }" @close="onAddClose"
                    :mask-style="{ backgroundColor: 'var(--theme_main_color)' }">
                    <div class="inputTotal">
                        <a-input v-model:value="filenameValue" placeholder="请输入文件名"
                            style="width: 50%;margin-right: 15px;" />
                        <a-input v-model:value="titleValue" placeholder="请输入标题" style="width: 50%;" />
                    </div>
                </a-drawer>
            </div>
            <a-popconfirm title="真的要删除吗？作者没做撤回哦" ok-text="狠狠的删" cancel-text="算了" @confirm="onDel">
                <a-button type="primary" shape="circle" style="margin-right: 2vh;">
                    <template #icon>
                        <MyIcon class="icon" :type="'icon-icon'" />
                    </template>
                </a-button>
            </a-popconfirm>
        </div>
        <div class="Write">
            <v-md-editor :disabled-menus="[]" @upload-image="handleUploadImage" v-model="text"
                @save="openModal"></v-md-editor>
        </div>
        <a-modal v-model:open="modalVisible" title="保存确认" @ok="upLoadMd" okText="保存" cancelText="取消">
            确认保存并上传吗
        </a-modal>
    </div>
    <BlogSuspended />
</template>

<style lang="less" scoped>
.writeTotal {
    width: 100%;
    height: 100vh;

    .chooseTech {
        display: flex;
        width: 70%;
        margin: 0 auto;
        align-items: center;
        overflow: hidden;
        height: 75px;

        .drawerBox {
            width: 50%;
            overflow: hidden;
            position: relative;
            height: 75px;

            .inputTotal {
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
    }

    .Write {
        width: 70%;
        margin: 0 auto;
    }
}
</style>