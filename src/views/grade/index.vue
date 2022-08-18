<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" />
    <el-input class="courseName" placeholder="请输入课程名称" v-model="courseName" />
    <el-button type="primary" class="createCourse" @click="centerDialogVisible = true">
        创建年级
    </el-button>
</div>
 <el-dialog v-model="centerDialogVisible" title="添加年级" width="30%"  center>
   <label style="margin-left:70px">年级名称:</label>
   <el-input placeholder="请输入年级名称" style="width:200px;margin-left:20px"></el-input>
     
    <template #footer style="height:40px;">
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

<Img />
</template>

<script>
import Img from '../../components/course/courseModule.vue';
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
            centerDialogVisible: false,
            ineffect: 0
        }
    }

}
</script>

<style>

.el-dialog--center{
    height: 200px !important;
    }

.dialog-footer button {

  margin-right: 100px;
}

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
