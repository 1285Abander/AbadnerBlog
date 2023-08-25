<script setup lang="ts">
import {
    CloseOutlined
} from '@ant-design/icons-vue';
import { computed } from "vue"
import { useHomeStore } from "../../../store/useHomeStore"
import MarkdownIt from 'markdown-it'

const md = MarkdownIt()
const HomeStore = useHomeStore()
const props = defineProps({
    showNotice: Function
})

const markdown = computed(() => {
    return md.render(HomeStore.notice)
})

HomeStore.getNotice()
console.log(props.showNotice)
</script>

<template>
    <div class="notice_bg">
        <div class="notice_box">
            <CloseOutlined class="close" @click="props.showNotice" />
            <div class="notice_mark" v-html="markdown">

            </div>
            <button class="button" @click="props.showNotice">朕已阅</button>
        </div>
    </div>
</template>
<style lang="less">
.notice_mark {
    color: var(--theme_active_color);
}
</style>

<style lang="less" scoped>
.notice_bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;

    .notice_box {
        position: relative;
        margin: 0 auto;
        width: 70%;
        height: 80%;
        background-color: var(--theme_index_bg_color);
        overflow: auto;

        .close {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 30px;
        }

        .notice_mark {
            padding: 50px 20px 20px;
        }

        .button {
            padding: 10px 20px;
            font-size: 25px;
            color: var(--theme_bg_color);
            outline: none;
            border: none;
            border-radius: 15px;
            background-color: var(--theme_color);
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }


}
</style>