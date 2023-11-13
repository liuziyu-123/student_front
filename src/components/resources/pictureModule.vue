<template>
<div class="img">
    <el-image style="width:150px;height:100px" :src="url">
    </el-image>
    <div class="text">{{text}}</div>
    <div class="clas">{{clas}}</div>
</div>
</template>

<script>
export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {
                    url: '',
                    name: '',
                    state: ''
                }
            }
        }
    },
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
