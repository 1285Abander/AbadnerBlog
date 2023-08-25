<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useHomeStore } from "@/store/useHomeStore";
import { useWriteStore } from "@/store/useWriteStore"
const HomeStore = useHomeStore()
const WirteStore = useWriteStore()

HomeStore.getHomeList()
const text = ref('')
const techValue = ref()

const upLoadMd = (text: string, html: string) => {
    console.log(text, html)
}

const onChange = (v) => {
    console.log(v)
}
</script>

<template>
    <div class="writeTotal">
        <div class="chooseTech">
            <a-cascader v-model:value="techValue" :options="HomeStore.options" placeholder="Please select"
                @change="onChange" />
        </div>
        <div class="Write">
            <v-md-editor v-model="text" height="800px" @save="upLoadMd"></v-md-editor>
        </div>
    </div>
</template>

<style lang="less" scoped>
.writeTotal {
    width: 100%;
    height: 100vh;

    .Write {
        width: 70%;
        margin: 0 auto;
    }
}
</style>