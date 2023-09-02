<script setup lang="ts">

const onChange = (e: any) => {
    const [file] = e.target.files
    console.log(file)
}

const onTouch = () => {
    console.log("touch")
}
</script>

<template>
    <div>
        test
        <input type="file" @change="onChange">
    </div>
    <div class="test" @touchstart="onTouch">

    </div>
</template>

<style lang="less" scoped>
.test {
    width: 150px;
    height: 250px;
    background-color: red;
}
</style>