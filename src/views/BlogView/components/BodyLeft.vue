<script setup lang="ts">
import { useBlogStore } from "../../../store/useBlogStore"
import { ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router";

const route = useRoute()
const BlogStore = useBlogStore()
const activeIndex = ref(Number(route.query.activeIndex as unknown as number))
const router = useRouter()

watch(() => route.query.activeIndex, () => {
    BlogStore.getBlogFile({
        filename: BlogStore.blogList.filelist[route.query.activeIndex as unknown as number].filename
    })
    console.log(route.query.activeIndex as unknown as number)
    activeIndex.value = Number(route.query.activeIndex as unknown as number)
})

const getFile = (index: number, e: any) => {
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    console.log(route.path)
    router.push({
        path: route.path,
        query: {
            ...route.query,
            activeIndex: index
        }
    })
}


</script>

<template>
    <div class="left_total">
        <div :class="activeIndex === index ? 'list active' : 'list'" v-for="(item, index) in  BlogStore.blogList.filelist "
            v-text="item.title" :key="item.fileid" :filename="item.filename" @click="getFile(index, $event)"></div>
    </div>
</template>

<style lang="less" scoped>
.left_total {
    background-color: var(--theme_bg_color);
    min-width: 200px;
    width: 200px;
    position: sticky;
    top: 60px;
    height: 100%;
    overflow: auto;
    box-shadow: 9px 9px 5px -5px var(--theme_bg_active_color);
    transition: all .3s ease-in-out;

    .list {
        cursor: pointer;
        line-height: 30px;
        padding: 10px;
        font-size: 17px;
        font-weight: 400;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--theme_main_color);
        transition: all 0.3s ease-in-out;
    }

    .list:hover {
        color: var(--theme_active_color);
    }

    .active {
        font-weight: 600;
        color: var(--theme_active_color) !important;
        background-color: var(--theme_bg_active_color);
    }
}
</style>