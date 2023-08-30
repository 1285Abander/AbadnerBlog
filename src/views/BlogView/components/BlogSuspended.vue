<script setup lang="ts">
import MyIcon from "../../../util/MyIcon"
import { computed, ref } from "vue"
import { message } from 'ant-design-vue';
import { useHomeStore } from '@/store/useHomeStore';
import useMode from "../../../util/changeMode"
import { useRouter } from 'vue-router'

const router = useRouter()
const HomeStore = useHomeStore()
const { mode, changeMode, changeCss } = useMode()
const showTool = ref(false)

const logoSrc = computed(() => {
    return mode.value === "dark" ? true : false
})

const changeTool = () => {
    showTool.value = !showTool.value
}

const inMaking = () => {
    message.info('该功能正在制作中...');
}

const scrollTop = () => {
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const changeM = () => {
    let { cssMode } = changeMode()
    changeCss(cssMode)
    HomeStore.getMode((mode.value as string))
}

const goBack = () => {
    router.back()
}

</script>

<template>
    <div class="hoverTotal">
        <div class="toolTotal">
            <Transition name="IconSowZero">
                <div v-show="showTool" class="sbox" @click="goBack">
                    <MyIcon class="icon back" type="icon-huitui" />
                </div>
            </Transition>
            <Transition name="IconSowOne">
                <div v-show="showTool" class="sbox" @click="inMaking">
                    <MyIcon class="icon search" type="icon-sousuo" />
                </div>
            </Transition>
            <Transition name="IconSowTow">
                <div v-show="showTool" class="sbox" @click="scrollTop">
                    <MyIcon class="icon" type="icon-huidaodingbu" />
                </div>
            </Transition>
            <Transition name="IconSowThree">
                <div v-show="showTool" class="sbox" @click="changeM">
                    <Transition name="IconScroll" mode="out-in">
                        <MyIcon v-if="logoSrc" class="icon" :type="'icon-yueliang'" />
                        <MyIcon v-else="!logoSrc" class="icon" :type="'icon-taiyang'" />
                    </Transition>
                </div>
            </Transition>
        </div>
        <div class="iconShow">
            <div class="sbox" @click="changeTool">
                <MyIcon class="icon" type="icon-gongju" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.IconSowZero-enter-from,
.IconSowZero-leave-to {
    transform: translateY(400%);
    opacity: 0;
}

.IconSowOne-enter-from,
.IconSowOne-leave-to {
    transform: translateY(300%);
    opacity: 0;
}

.IconSowTow-enter-from,
.IconSowTow-leave-to {
    transform: translateY(200%);
    opacity: 0;
}

.IconSowThree-enter-from,
.IconSowThree-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.IconScroll-enter-from,
.IconScroll-leave-to {
    transform: rotate(180deg);
    opacity: 0;
}

.IconScroll-enter-active,
.IconScroll-leave-active {
    transition: all 0.2s ease-in-out;
}

.hoverTotal {
    position: fixed;
    bottom: 100px;
    right: 200px;
    z-index: 10000;
    font-size: 45px;

    .sbox {
        transition: all ease-in-out .2s;
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid var(--theme_bg_color);
        border-radius: 50%;
        background-color: var(--theme_main_color);
        margin: 5px 0;
    }

    .sbox.hide1 {
        transform: translateY(300%);
        opacity: 0;
    }

    .sbox.hide2 {
        transform: translateY(200%);
        opacity: 0;
    }

    .sbox.hide3 {
        transform: translateY(100%);
        opacity: 0;
    }

    .sbox:hover {
        border: 2px solid var(--theme_bg_active_color);
        background-color: var(--theme_active_color);
    }

    .sbox:active {
        transform: scale(1.2);
    }

    .toolTotal {
        .icon {
            color: var(--theme_bg_color);
        }

        .icon.search {
            font-size: 39px;
        }
    }

    .iconShow {
        .icon {
            color: var(--theme_bg_color);
        }
    }
}
</style>