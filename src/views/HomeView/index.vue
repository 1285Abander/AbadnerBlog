<script setup lang="ts">
import MyIcon from "../../util/MyIcon"
import { useHomeStore } from '../../store/useHomeStore'
import { onMounted, computed, ref, reactive, watchEffect } from "vue"
import { useRouter } from 'vue-router';
import useMode from "../../util/changeMode"
import BlogNotice from "./components/BlogNotice.vue";

//初始化
const HomeStore = useHomeStore()
const router = useRouter()
HomeStore.getHomeList()
/* 跳转 */
const goTo = (e: any) => {
    if (e.target.getAttribute('techid')) {
        router.push({
            path: 'blog',
            query: {
                techid: e.target.getAttribute('techid'),
                activeIndex: 0
            }
        })
    }
    console.log()
}

//背景Canvas
class Sun {
    canvas: any;
    context: any;
    timer: any;
    mountainArr: any[];
    starArr: any[];
    meteorArr: any[];
    width: number;
    height: number;
    constructor() {
        this.canvas = null;
        this.context = '';
        this.timer = null;
        this.mountainArr = [];
        this.starArr = [];
        this.meteorArr = [];
        this.width = 1950;
        this.height = window.innerHeight;
        this.init();
    }
    init() {
        this.canvas = document.getElementById('fwhfCanvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.display = 'block';
        this.context = this.canvas.getContext('2d');

        var drawMountainX = 0;
        while (drawMountainX < this.width) {
            if (this.rand(1, 2) == 1) {
                this.mountainArr.push([drawMountainX, this.rand(this.height - 70, this.height - 50), drawMountainX - this.rand(15, 25), this.height - 60]);
            } else {
                this.mountainArr.push([drawMountainX, this.rand(this.height - 70, this.height - 50)]);
            }
            drawMountainX += this.rand(10, 30);
        }

        var ladder = 0;
        while (ladder < this.height - 300) {
            for (var i = 0; i < (this.height - ladder) / 100; i++) {
                this.starArr.push([this.rand(0, this.width), this.rand(ladder, ladder + 20), this.rand(0, 10), 0.1]);
            }
            ladder += 20;
        }

        this.drawTimer();
    }
    drawlightSky() {
        this.context.beginPath();
        var skyStyle = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        skyStyle.addColorStop(0, "#1C558F");
        skyStyle.addColorStop(0.3, "#276DC3");
        skyStyle.addColorStop(0.7, "#67A4DF");
        skyStyle.addColorStop(1, "#CFD1D9");
        this.context.fillStyle = skyStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawTimer() {
        this.drawlightSky()
    }
    rand(min: number, max: number) {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
}
class FwhfStarrySky {
    canvas: any;
    context: any;
    timer: any;
    mountainArr: any[];
    starArr: any[];
    meteorArr: any[];
    width: number;
    height: number;
    constructor() {
        this.canvas = null;
        this.context = '';
        this.timer = null;
        this.mountainArr = [];
        this.starArr = [];
        this.meteorArr = [];
        this.width = 1950;
        this.height = window.innerHeight;
        this.init();
    }
    init() {
        this.canvas = document.getElementById('fwhfCanvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.display = 'block';
        this.context = this.canvas.getContext('2d');

        var drawMountainX = 0;
        while (drawMountainX < this.width) {
            if (this.rand(1, 2) == 1) {
                this.mountainArr.push([drawMountainX, this.rand(this.height - 70, this.height - 50), drawMountainX - this.rand(15, 25), this.height - 60]);
            } else {
                this.mountainArr.push([drawMountainX, this.rand(this.height - 70, this.height - 50)]);
            }
            drawMountainX += this.rand(10, 30);
        }

        var ladder = 0;
        while (ladder < this.height - 300) {
            for (var i = 0; i < (this.height - ladder) / 100; i++) {
                this.starArr.push([this.rand(0, this.width), this.rand(ladder, ladder + 20), this.rand(0, 10), 0.1]);
            }
            ladder += 20;
        }

        this.drawTimer();
    }
    drawlightSky() {
        this.context.beginPath();
        var skyStyle = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        skyStyle.addColorStop(0, "#1C558F");
        skyStyle.addColorStop(0.3, "#276DC3");
        skyStyle.addColorStop(0.7, "#67A4DF");
        skyStyle.addColorStop(1, "#CFD1D9");
        this.context.fillStyle = skyStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawSky() {
        this.context.beginPath();
        var skyStyle = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        skyStyle.addColorStop(0, "#000211");
        skyStyle.addColorStop(0.3, "#080d23");
        skyStyle.addColorStop(0.7, "#18203d");
        skyStyle.addColorStop(1, "#293756");
        this.context.fillStyle = skyStyle;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.closePath();
    }
    darwStar() {
        this.starArr.forEach((v) => {
            this.context.beginPath();
            this.context.fillStyle = "rgba(255,255,255," + v[2] / 10 + ")";
            this.context.arc(v[0], v[1], 1, 0, 2 * Math.PI);
            this.context.fill();
            this.context.closePath();
        });
    }
    drawMeteor() {
        var meteorNum = this.rand(-9, 9);
        if (meteorNum == 1) {
            this.meteorArr.push([this.rand(0, this.width + this.height), 0, this.rand(1, 3)]);
        }
        this.meteorArr.forEach((v) => {
            this.context.beginPath();
            this.context.fillStyle = "rgba(255,255,255,1)";
            if (v[0] > this.width) {
                this.context.arc(v[0], v[1] + (v[0] - this.width), 1, 0, 2 * Math.PI);
            } else {
                this.context.arc(v[0], v[1], 1, 0, 2 * Math.PI);
            }
            this.context.fill();
            if (v[0] > this.width) {
                var meteorStyle = this.context.createLinearGradient(v[0], v[1], v[0] + v[2] * 20, v[1] + (v[0] - this.width) - v[2] * 20);
                meteorStyle.addColorStop(0, "rgba(255,255,255,1)");
                meteorStyle.addColorStop(1, "rgba(255,255,255,0)");
                this.context.strokeStyle = meteorStyle;
                this.context.lineTo(v[0], v[1] + (v[0] - this.width));
                this.context.lineTo(v[0] + v[2] * 20, v[1] + (v[0] - this.width) - v[2] * 20);
            } else {
                var meteorStyle = this.context.createLinearGradient(v[0], v[1], v[0] + v[2] * 20, v[1] - v[2] * 20);
                meteorStyle.addColorStop(0, "rgba(255,255,255,1)");
                meteorStyle.addColorStop(1, "rgba(255,255,255,0)");
                this.context.strokeStyle = meteorStyle;
                this.context.lineTo(v[0], v[1]);
                this.context.lineTo(v[0] + v[2] * 20, v[1] - v[2] * 20);
            }
            this.context.stroke();
            this.context.closePath();
        })
        this.meteorArr.forEach((v, index) => {
            v[0] -= v[2];
            v[1] += v[2];
            if (v[0] < -20 || v[1] > this.height) {
                this.meteorArr.splice(index, 1);
            }
        })
    }
    drawTimer() {
        this.drawSky();
        this.darwStar();
        this.drawMeteor();
        this.timer = setInterval(() => {
            this.starArr.forEach((v) => {
                if (v[2] + v[3] < 0 || v[2] + v[3] > 10) {
                    v[3] *= -1;
                }
                v[2] += v[3];
            });
            this.drawSky();
            this.darwStar();
            this.drawMeteor();
        }, 20)
    }
    drawLight() {
        this.drawlightSky()
    }
    rand(min: number, max: number) {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height)
        clearInterval(this.timer)
    }
}
let Sky: any | null = null
/* 初始化背景 */
onMounted(() => {
    if (Sky)
        Sky.clearCanvas()
    Sky = localStorage.getItem("mode") === "dark" ? new FwhfStarrySky() : new Sun()
    changeCss(cssMode)
    HomeStore.getMode((mode.value as string))
})

//切换主题
let { changeMode, mode, cssMode, changeCss } = useMode()
const loading = ref(false)

/* 小提示 */
const tips = reactive([
    "爱意东升西落，浪漫至死不渝",
])
const tipsNum = ref(0)
/* 切换事件 */
const change = () => {
    loading.value = !loading.value
    tipsNum.value = Math.floor(Math.random() * tips.length)
    console.log(tipsNum)
    let TimeOut = setTimeout(() => {
        loading.value = !loading.value
        clearTimeout(TimeOut)
    }, 1500)
}
/* 切换动画 */
const onAfterEnter = () => {
    if (Sky)
        Sky.clearCanvas()
    Sky = localStorage.getItem("mode") === "dark" ? new Sun() : new FwhfStarrySky()
    let { cssMode } = changeMode()
    changeCss(cssMode)
    HomeStore.getMode((mode.value as string))
}
/* 图标内容 */
const logoSrc = computed(() => {
    return mode.value === "dark" ? true : false
})

//更新公告
const noticeShow = ref(false)
const showNotice = () => {
    noticeShow.value = !noticeShow.value
}
/* 遮罩层 */
watchEffect(() => {
    if (noticeShow.value) {
        document.body.style.cssText = "width:clc(100%);height:100vh;overflow:hidden;"
    } else {
        document.body.style.cssText = "overflow:auto"
    }
})
//个人展示2.0
const fontShow = ref(true)
const backShow = ref(true)
</script>

<template>
    <div class="HomeTotal">
        <div id="canvans">
            <canvas id='fwhfCanvas'></canvas>
        </div>
        <div class="Title_Total">
            <div class="chanegButton">
                <div @click="change" class="button">
                    <MyIcon v-if="logoSrc" class="switch" :type="'icon-yueliang'" />
                    <MyIcon v-else="!logoSrc" class="switch" :type="'icon-taiyang'" />
                </div>
                <div @click="showNotice" class="button notice">
                    <MyIcon class="switch" :type="'icon-gonggao'" />
                </div>
                <Transition name="Loading" @after-enter="onAfterEnter">
                    <div class="loading" v-show="loading">
                        <div class="showBox">
                            <Transition name="IconS">
                                <MyIcon v-if="logoSrc" class="icon" :type="'icon-yueliang'" />
                                <MyIcon v-else="!logoSrc" class="icon" :type="'icon-taiyang'" />
                            </Transition>
                        </div>
                        <div class="tips" v-text="tips[0]"></div>
                    </div>
                </Transition>
            </div>
            <h1>Abander Blog</h1>
            <div class="endTotal">
                <div class="bigbox" v-show="fontShow">
                    <div class="title">前端</div>
                    <div class="box" @click="goTo">
                        <div class="sbox" v-for="item1 in HomeStore.homeList.fontend" v-text="item1.techstack"
                            :techid="item1.techid"></div>
                    </div>
                </div>
                <div class="info">
                    <p>笔者姓名：姚涵豪</p>
                    <p>笔者简介：6年码龄，掌握C语言，python，C++等编程语言，有硬件开发基础；热爱编程，关注新技术发展，热衷学习新技术、钻研技术源码；本博客主要记录前端与后端从零学习过程与曾解决的问题</p>
                    <p>编程真（哔————）是这个世界上最好玩的事情！</p>
                    <p>本博客主要技术栈：</p>
                    <p @click="goTo">前端：<span >Less</span>、<span :techid="11">Vue3</span>、<span :techid="10">Typescript</span></p>
                    <p @click="goTo">后端：<span :techid="1">Java</span>、<span :techid="4">Spring Boot</span>、<span :techid="3">Mysql</span></p>
                </div>
                <div class="bigbox" v-show="backShow">
                    <div class="title">后端</div>
                    <div class="box" @click="goTo">
                        <div class="sbox" v-for="item1 in HomeStore.homeList.backend" v-text="item1.techstack"
                            :techid="item1.techid"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition name="notice">
        <BlogNotice v-show="noticeShow" :showNotice="showNotice" />
    </transition>
</template>

<style lang="less" scoped>
.Loading-enter-active,
.Loading-leave-active {
    transition: all 0.3s ease-in-out;
}

.Loading-enter-from,
.Loading-leave-to {
    opacity: 0;
}

.IconS-enter-active,
.IconS-leave-active {
    transition: all 0.5s linear;
}

.IconS-enter-from {
    transform: translateY(-150%) rotate(180deg) !important;
}

.IconS-leave-to {
    transform: translateY(-150%) rotate(-180deg) !important;
}


.notice-enter-active,
.notice-leave-active {
    transition: all 0.3s ease-in-out;
}

.notice-enter-from,
.notice-leave-to {
    opacity: 0;
}

.HomeTotal {
    background-color: var(--theme_index_bg_color);
    user-select: none;

    .chanegButton {
        .button {
            border-radius: 50%;
            background-color: white;
            position: absolute;
            right: 100px;
            top: 50px;

            .switch {
                padding: 5px;
                font-size: 35px;
                color: black;
            }
        }

        .notice {
            right: 0;

            .switch {
                padding: 10px;
                font-size: 25px;
            }
        }

        .loading {
            transition: all 0.6s ease-in-out;
            font-size: 20vh;
            background-color: var(--theme_index_bg_color);
            left: 0;
            top: 0;
            position: fixed;
            width: 100%;
            height: 100%;

            .showBox {
                margin-top: 150px;
                height: 50%;
                overflow: hidden;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: end;

                .icon {
                    color: var(--theme_color);
                    transform-origin: 50% 250% 0;
                    transform: translateY(-150%) rotate(0deg);
                }
            }

            .tips {
                text-align: center;
                color: var(--theme_active_color);
                font-size: 20px;
            }
        }
    }

    #canvans {
        position: absolute;
        top: 0;
        height: 100vh;
        background-color: var(--theme_index_bg_color);
        width: 100%;
        overflow: hidden;
    }

    div {
        background-color: transparent;
        color: var(--theme_active_color);
    }

    .Title_Total {
        position: relative;
        margin: 0 auto;
        z-index: 1000;
        width: 75vw;
        background-color: transparent;

        h1 {
            background-color: transparent;
            font-size: 5vh;
            padding-top: 22vh;
            text-align: center;
            color: white;
            text-shadow: 0 0 5px white;
        }

        .endTotal {
            display: flex;
            justify-content: center;
            align-items: start;
            width: 75vw;
            margin: 0 auto;

            .info {
                display: flex;
                flex-direction: column;
                min-width: 400px;
                flex: 5;
                align-self: flex-start;
                color: var(--theme_active_color);
                font-size: 2vh;
                padding-top: 10vh;
                user-select: none;

                p {
                    padding: 15px;

                    span {
                        color: var(--theme_main_color);
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }

            .bigbox {
                margin-top: 40px;
                flex: 5;

                .title {
                    text-align: center;
                    font-size: 40px;
                    margin: 10px;
                }

                .box {
                    display: grid;
                    grid-template-columns: repeat(3, 15vh);
                    gap: 30px;

                    .sbox {
                        line-height: 15vh;
                        border-radius: 15px;
                        text-align: center;
                        height: 15vh;
                        background-color: var(--theme_op_bg_color);
                    }

                    .sbox:hover {
                        transition: all 0.3s ease-in-out;
                        background-color: var(--theme_color);
                        box-shadow: 0 0 5px 0 white;
                        color: black;
                    }
                }
            }
        }
    }
}
</style>