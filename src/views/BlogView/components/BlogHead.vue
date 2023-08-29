<script setup lang="ts">
import logo from "../../../assets/AbanderBlog.png"
import logoLight from "../../../assets/AbanderBlogLight.png"
import { useHomeStore } from "@/store/useHomeStore";
import { useBlogStore } from "@/store/useBlogStore";
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router";

const HomeStore = useHomeStore()
const BlogStore = useBlogStore()
const router = useRouter()
const route = useRoute()
const showKey = ref("")

if (Object.keys(HomeStore.homeList).length === 0) {
    HomeStore.getHomeList()
}
const logoSrc = computed(() => {
    return HomeStore.mode === "dark" ? logo : logoLight
})
const goHome = () => {
    router.push("/")
}
const onShow = (key: string) => {
    showKey.value = showKey.value === key ? "" : key
}
const techName = computed(() => {
    return BlogStore.blogList.techname ? BlogStore.blogList.techname.techname : ""
})
const onSkip = (techid: number) => {
    router.push({
        path: "/blog",
        query: {
            techid,
            activeIndex: 0
        }
    })
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
</script>

<template>
    <div class="BlogheadTotal">
        <div class="box">
            <div class="logo">
                <img :src="logoSrc" alt="" @click="goHome">
                <p>AbanderBlog</p>
            </div>
            <div class="navTotal">
                <div :class="techName === key ? 'navItem active' : 'navItem'" v-for="(item, key) in HomeStore.homeList"
                    :key="key" @click="onShow(key)">
                    <div class="title" v-text="key === 'fontend' ? '前端' : (key === 'backend' ? '后端' : ' ')"></div>
                    <Transition name="navitem">
                        <div v-show="techName === key || showKey === key" class="navbox">
                            <div :class="route.query.techid as any == item1.techid ? 'sbox checked' : 'sbox'"
                                v-for="item1 in item" v-text="item1.techstack" @click="onSkip(item1.techid)"></div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.navitem-enter-active,
.navitem-leave-active {
    transition: all 0.3s ease-in-out;
}

.navitem-enter-from,
.navitem-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}



.BlogheadTotal {
    user-select: none;
    transition: all .3s ease-in-out;
    position: fixed;
    z-index: 10;
    top: 0;
    width: 100%;
    background-color: var(--theme_bg_color);
    height: 60px;
    box-shadow: 0 0 2px 0 lightgray;

    .box {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        margin: 0 auto;
        height: 100%;

        .logo {
            display: flex;
            align-items: center;

            img {
                height: 60%;
                padding-left: 15px;
            }

            p {
                color: var(--theme_color);
                text-shadow: 0 0 3px white;
                line-height: 60px;
                font-size: 20px;
                padding-left: 25px;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }
        }


        .navTotal {
            text-align: center;
            color: var(--theme_active_color);
            display: flex;
            justify-content: start;
            line-height: 60px;

            .navItem {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: start;
                padding: 0 10px;
                align-items: center;

                .sbox,
                .title {
                    cursor: pointer;
                    padding: 0 10px;
                    color: var(--theme_sbox_title_color);
                }

                .title {
                    color: var(--theme_active_color);
                    font-weight: 600;
                }

                .navbox {
                    background-color: var(--theme_bg_color);
                    width: 120px;
                    border-radius: 10px;
                    box-shadow: 0 0 1px 1px var(--theme_border_color);
                    transition: all 0.3s ease-in-out;
                    top: 60px;
                    z-index: 1000;
                    position: absolute;
                }

                .sbox {
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    line-height: 40px;
                    border-bottom: 1px var(--theme_border_color) solid;
                    background-color: transparent;
                }

                .sbox::after {
                    transition: all 0.2s ease-in-out;
                    content: "";
                    background-color: var(--theme_color);
                    display: block;
                    margin: 0 auto;
                    width: 0;
                    height: 2px;
                }

                .sbox:hover::after {
                    width: 0;
                    width: 70%;
                }

                .sbox:hover {
                    color: var(--theme_color);
                }

                .sbox.checked {
                    color: var(--theme_color);
                    text-shadow: 0 0 2px white;
                }

                .sbox.checked::after {
                    content: "";
                    background-color: var(--theme_color);
                    display: block;
                    margin: 0 auto;
                    width: 70%;
                    height: 2px;
                }
            }

            .navItem.active {
                display: flex;
                flex-direction: row;
                justify-content: start;
                padding: 0 10px;

                .sbox,
                .title {
                    padding: 0 10px;
                }

                .navbox {
                    width: auto;
                    border-radius: none;
                    color: var(--theme_active_color);
                    height: auto;
                    display: flex;
                    position: static;
                    box-shadow: none;
                }

                .sbox {
                    border-bottom: none;
                }
            }
        }
    }
}

@media screen and (max-width:768px) {
    .BlogheadTotal {
        height: 6vh;

        .box {
            width: 100%;
        }
    }
}
</style>