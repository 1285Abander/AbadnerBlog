<script setup lang="ts">
import hljs from "highlight.js"
import MarkdownIt from 'markdown-it'
import { computed, reactive, onUnmounted, ref, onMounted } from 'vue'
import { useBlogStore } from '../../../store/useBlogStore'
import Throttle from "../../../util/throttle"

const BlogStore = useBlogStore()
const md = new MarkdownIt()

let newStr = reactive<string[]>([])

hljs.configure({
    ignoreUnescapedHTML: true
})

const vHighlight = {
    updated: (el: any) => {
        const blocks: HTMLElement[] = el.querySelectorAll('pre code');
        blocks.forEach((block) => {
            hljs.highlightElement(block)
        });
    }
}

const markdown = computed(() => {
    activeIndex.value = 0
    let newMd = md.render(BlogStore.markdowm)
    let strArr = newMd.match(/<h2>(.*)<\/h2>/g)
    newStr = (strArr?.map(item => {
        if (item.slice(4, item.length - 5)[0] <= '9' && item.slice(4, item.length - 5)[0] >= '0') {
            return (item.slice(4, item.length - 5).match(/[0-9]\d*.(.*)/) as RegExpMatchArray)[1]
        } else
            return item.slice(4, item.length - 5)
    }) as string[])
    let newMarkDowm = BlogStore.markdowm.replaceAll("localhost:8080", "120.26.44.158:8888")

    return md.render(newMarkDowm)
})

const scrollItem = (e: any) => {
    const h2Element = document.querySelectorAll('h2')
    h2Element[e.target.getAttribute("index")].scrollIntoView({
        behavior: 'smooth',
        block: "start",
    })
}

const { throttle } = Throttle()
const activeIndex = ref(0)
const nowTop = computed(() => {
    return activeIndex.value * 40 + 95
})

const scrollWindow = () => {
    throttle(100, () => {
        const h2Element = document.querySelectorAll('h2')
        if (h2Element.length != 0) {
            if (document.documentElement.scrollTop === document.documentElement.offsetHeight - document.documentElement.clientHeight) {
                activeIndex.value = h2Element.length - 1
            } else {
                if (document.documentElement.scrollTop + 200 < h2Element[activeIndex.value].offsetTop) {
                    if (activeIndex.value > 0)
                        activeIndex.value -= 1
                } else if (activeIndex.value < h2Element.length - 1) {
                    if (document.documentElement.scrollTop + 200 > h2Element[activeIndex.value + 1].offsetTop)
                        activeIndex.value += 1
                }
            }
        }
    })
}

document.addEventListener('scroll', scrollWindow)

onUnmounted(() => {
    document.removeEventListener('scroll', scrollWindow)
})
</script>

<template>
    <div class="markdown_body">
        <div class="markdwon_total">
            <div class="markdown-body" v-highlight v-html="markdown"></div>
        </div>
        <div class="navRight">
            <div class="rightBox">
                <div class="title">本页目录</div>
                <div @click="scrollItem">
                    <div class="line" v-show="newStr" :style="{ top: `${nowTop}px` }"></div>
                    <div :class="activeIndex === index ? 'navItem active' : 'navItem'" v-for="(item, index) in  newStr"
                        :key="item" v-text="item" :index="index"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.hljs {
    font-size: 16px !important;

    span {
        line-height: 200%;
    }
}

.markdown-body {
    color: var(--theme_main_color);
    transition: all .3s ease-in-out;
    background-color: var(--theme_bg_color) !important;
}

.markdown-body table {
    background-color: var(--theme_bg_color);
}

.markdown-body table tr:nth-child(2n) {
    background-color: var(--theme_bg_color);
}

.markdown-body table tr {
    background-color: var(--theme_bg_color);
}
</style>

<style lang="less" scoped>
.markdown_body {
    transition: all .3s ease-in-out;
    flex: 6;
    min-width: 1100px;
    display: flex;
    justify-content: space-between;

    .markdwon_total {
        min-width: 900px;
        flex: 5;
        padding: 15px;
    }

    .markdwon_total::-webkit-scrollbar {
        width: 0;
    }

    .navRight {
        flex: 1;
        width: 200px;
        font-size: 15px;

        .rightBox {
            padding-top: 60px;
            position: sticky;
            top: 0;
            right: 0;
            transition: all 0.3s ease-in-out;

            .title {
                padding-top: 5px;
                margin-bottom: 10px;
                color: var(--theme_main_color);
            }

            .navItem {
                border-left: 2px var(--theme_index_bg_color) solid;
                transition: all 0.3s ease-in-out;
                height: 40px;
                line-height: 30px;
                width: 160px;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: var(--theme_main_color);
                padding: 5px;
            }

            .navItem:hover {
                color: var(--theme_active_color);
            }

            .active {
                color: var(--theme_active_color);
                font-weight: 600;
            }

            .line {
                position: absolute;
                height: 40px;
                width: 3px;
                background-color: var(--theme_color);
                transition: all .3s ease-in-out;
            }
        }

    }
}

@media screen and (max-width:768px) {
    .markdown_body {
        width: 100%;
        min-width: auto;

        .markdwon_total {
            min-width: auto;
            width: 100%;
        }
    }
}
</style>