<template>
<div class="courseAll">
    <div class="inil yu" id="yuwen">语文</div>
    <div class="inil shu">数学</div>
    <div class="inil ying">英语</div>
    <div class="inil wu">物理</div>
    <div class="inil hua">化学</div>
    <div class="inil sheng">生物</div>
</div>
<!--搜索-->
<div style="height: 40px; border:1px solid red">
    <search  class="search"    theme="outline" size="24" fill="#333"/>
<el-input class="courseName"  placeholder="请输入课程名称" v-model="courseName" />
</div>

<Img />
</template>

<script>
import Img from '../../../components/course/courseModule.vue'
import {Search} from '@icon-park/vue-next';
export default {
    components: {
        Img,
        Search
    },
    data() {
        return {
            courseName:''
        }
    },
    methods:{
        getDivId(e){
           let divs= document.querySelectorAll('.inil');
           console.log("EEEE",divs)
           for(let i=0;i<divs.length;i++){
                divs[i].addEventListener("click",function () {
                    console.log("我是第一个冒泡传递");
                      console.log(divs[i].innerHTML)
                })
              
           }

        }
    },
    mounted(){
       this.getDivId()
    }

}
</script>

<style>
.courseAll {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid red; 
}

.inil {
    width:256px; 
    height: 50px;
    display: table-cell;    
    font-size: 16;
    line-height:50px;
    color: white;
}

.yu{
    background-color: rgb(156, 78, 48);
}

.shu{
    background-color: rgb(80, 121, 138);
}

.ying{
    background-color: rgb(36, 53, 57);
}
.wu{
    background-color: rgb(131, 179, 37);
}

.hua{
    background-color: rgb(26, 104, 32);
}

.sheng{
    background-color: rgb(13, 209, 143);
}

.courseName{
    width: 200px;
    height: 40px;
    float: right;
    margin-right: 10px;
    border-radius: 30px;
}

.search{
    float: right;
    margin-right: 50px;
    margin-top: 10px;
}
</style>
