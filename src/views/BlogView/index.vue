<script setup lang="ts">
import BlogHead from './components/BlogHead.vue';
import BodyLeft from './components/BodyLeft.vue'
import BodyRight from './components/BodyRight.vue'
import BlogSuspended from './components/BlogSuspended.vue'
import { useBlogStore } from '../../store/useBlogStore'
import { useRoute } from 'vue-router';
import { watch } from 'vue'

const BlogStore = useBlogStore()
const route = useRoute()
watch(() => route.query.techid, () => {
    BlogStore.getBlogList({
        techid: (route.query.techid as unknown as number),
        activeIndex: (route.query.activeIndex as unknown as number)
    })
}, {
    immediate: true
})

document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
})
</script>

<template>
    <BlogHead />
    <div class="bodyBig">
        <div class="body_total">
            <BodyLeft />
            <BodyRight />
        </div>
    </div>
    <BlogSuspended />
</template>

<style lang="less" scoped>
.bodyBig {
    background-color: var(--theme_bg_color);
    transition: all .3s ease-in-out;

    .body_total {
        display: flex;
        margin: 60px auto 0;
        width: 1200px;
    }

    @media screen and (max-width:768px) {
        .body_total {
            width: 100%;
        }
    }
}
</style>