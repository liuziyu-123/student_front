<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" />
    <el-input class="courseName" placeholder="请输入课程名称" v-model="courseName" />
    <el-button type="primary" class="createCourse" @click="drawer = true">
        创建课程
    </el-button>
</div>
<el-drawer v-model="drawer" title="createCourse" :with-header="true">
    <label style="margin-right:20px">所选分类:</label>
    <el-select v-model="gradeName"   @change="getGradeName"   style="width:250px; border-radius:20px">
        <el-option  v-for="item in gradeDate" :key="item.value" :label="item.value" :value="item.value" />
    </el-select>
    <br />
    <br />
    <br />

    <label style="margin-right:20px">课程名称:</label>
    <el-input style="width:250px; border-radius:20px" placeholder="请输入课程名称"></el-input>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">所选班级:</label>
    <el-select style="width:250px; border-radius:20px">
        <el-option />
    </el-select>
    <br />
    <br />
    <br />
    <!--开始时间和结束时间-->
    <label style="margin-right:20px">开始时间:</label>
    <el-date-picker style="width:250px; border-radius:20px"></el-date-picker>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">结束时间:</label>
    <el-date-picker style="width:250px; border-radius:20px"></el-date-picker>
    <br />
    <br />
    <br />
    <el-form-item label="是否生效:" style="margin-left:57px">
        <el-switch v-model="ineffect"  style="margin-left:20px" />
    </el-form-item>
</el-drawer>

<Img />
</template>

<script>
import Img from '../../../components/course/courseModule.vue';
import {
    Search
} from '@icon-park/vue-next';
export default {
    components: {
        Img,
        Search
    },
    data() {
        return {
            courseName: "",
            drawer: false,
            ineffect: 0,
             gradeDate:[{
                value:'一年级',
            },{
                value:'二年级',
            },{
                value:'三年级',
            },{
                value:'四年级',
            },{
                value:'五年级',
            },{
                value:'六年级',
            },{
                value:'七年级',
            },{
                value:'八年级',
            },{
                value:'九年级',
            },{
                value:'高一',
            },{
                value:'高二',
            },{
                value:'高三',
            }],
            gradeName:""

        }
    },
    methods:{
        getGradeName(item){
            this.gradeName=item
        }
    }

}
</script>

<style>
.courseName {
    width: 200px;
    height: 40px;
    float: right;
    margin-right: 10px;
    border-radius: 30px;
}

.search {
    float: right;
    margin-right: 50px;
    margin-top: 10px;
}

.createCourse {
    float: left;
    height: 40px;
    background-color: blue;
}
</style>
