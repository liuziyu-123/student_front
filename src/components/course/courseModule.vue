<template>
<div class="img">
    <el-image style="width:150px;height:100px" :src="url">
    </el-image>
    <div class="text">{{text}}</div>
    <div class="clas">{{clas}}</div>
    <div class="optional">
        <div class="bt">修改</div>
        <div class="bt">删除</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            url: 'http://localhost:8081/file/2e8f2cfe7d8a4a0d94f0de586d5b9609.jpg',
            text: "语文",
            clas: "习题册"
        }
    }

}
</script>

<style>
.optional{
    /* opacity:1; */
    background-color: rgba(37, 16, 41, 0.35);
    /* animation: show 2s 1; */
}


.bt {
    display: inline-block;
    margin-right: 10px;
}

.text {
    margin-right: 10px;
    display: inline;

}

.clas {
    display: inline;
}

.img {
    width: 150px;
    height: 150px;
    position: relative;
    border: 1px solid red;
}

/* @keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
} */

/* @keyframes hidden {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
} */
</style>
