<script setup lang="ts">
import { onMounted } from "vue"
import useMode from "./util/changeMode"
import { ref } from "vue"

const loading = ref(false)

const changeLoading = (way: "open" | "close") => {
  console.log("加载")
  if (way === "open" && loading.value === false) {
    loading.value = true
  } else if (way === "close" && loading.value === true) {
    loading.value = false
  }
}

(window as any).changeLoading = changeLoading

let { cssMode } = useMode()
onMounted(() => {
  document.documentElement.style.setProperty("--theme_index_bg_color", cssMode.theme_index_bg_color)
  document.documentElement.style.setProperty("--theme_bg_color", cssMode.theme_bg_color)
  document.documentElement.style.setProperty("--theme_border_color", cssMode.theme_border_color)
  document.documentElement.style.setProperty("--theme_main_color", cssMode.theme_main_color)
  document.documentElement.style.setProperty("--theme_active_color", cssMode.theme_active_color)
  document.documentElement.style.setProperty("--theme_bg_active_color", cssMode.theme_bg_active_color)
  document.documentElement.style.setProperty("--theme_color", cssMode.theme_color)
  document.documentElement.style.setProperty("--theme_op_bg_color", cssMode.theme_op_bg_color)
  document.documentElement.style.setProperty("--theme_sbox_title_color", cssMode.theme_sbox_title_color)
})
</script>

<template>
  <router-view />
  <transition name="loading">

  </transition>
  <div class="loading_total" v-show="loading">
    <div class="show">
      <p class="loading_text"><span class="A">L</span>oading <span>...</span> </p>
    </div>
  </div>
</template>

<style lang="less">
.loading-enter-active,
.loading-leave-active {
  transition: all 0.3s ease-in-out;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading_total {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .show {
    width: 500px;
    height: 150px;
    overflow: hidden;

    .loading_text {
      text-align: center;
      font-weight: 600;
      color: var(--theme_color);
      line-height: 150px;
      font-size: 70px;
      display: flex;
      justify-content: center;
      align-items: center;

      .A {
        display: block;
        transform: translate(0, 0);
        animation: der 2s ease-in-out infinite forwards;
      }

      @keyframes der {
        0% {
          transform: translate(0, -20%) rotate(0);
        }

        10% {
          transform: translate(0, 0) rotate(20deg);
        }

        20% {
          transform: translate(20%, -20%) rotate(20deg);
        }

        80% {
          transform: translate(20%, 100%) rotate(300deg);
          opacity: 1;
        }

        85% {
          transform: translate(20%, 100%) rotate(300deg);
          opacity: 0;
        }

        95% {
          transform: translate(0, -100%) rotate(0);
          opacity: 0;
        }

        100% {
          transform: translate(0, -100%) rotate(0);
          opacity: 1;
        }
      }
    }
  }
}

:root {
  --theme_index_bg_color: #293756;
  --theme_bg_color: #121212;
  --theme_bg_active_color: rgb(73, 73, 73);
  --theme_border_color: #363636;
  --theme_main_color: #c9d1d9;
  --theme_active_color: white;
  --theme_color: rgb(122, 237, 244);
  --theme_op_bg_color: rgba(122, 237, 244, 0.6);
  --theme_sbox_title_color: lightgray;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif, SimHei, SimSun;
}

body {
  background-color: var(--theme_bg_color);
}

h2 {
  color: var(--theme_active_color);
  line-height: 300% !important;
}

h2::after {
  padding-left: 10px;
  content: "A";
  font-style: italic;
  color: var(--theme_color);
  opacity: 0;
}

h2:hover::after {
  transition: all 0.3s ease-in-out;
  opacity: 100;
}
</style>
