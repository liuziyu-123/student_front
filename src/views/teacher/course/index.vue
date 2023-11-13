<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" />
    <el-input class="courseName" placeholder="请输入课程名称" v-model="courseName" />
    <el-button type="primary" class="createCourse" @click="drawer = true,getSubjectInfo()">
        创建课程
    </el-button>
</div>
<el-drawer v-model="drawer" title="createCourse" :with-header="true">
    <label style="margin-right:20px">所选年级:</label>
    <el-select v-model="gradeName" placeholder="请选择年级" @change="getGradeId" style="width:250px; border-radius:20px">
        <el-option v-for="item in gradeData" :key="item.id" :label="item.gradeName" :value="item.id" />
    </el-select>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">所选班级:</label>
    <el-select v-model="className" placeholder="请选择班级" style="width:250px; border-radius:20px">
        <el-option v-for="item in classData" :key="item.id" :label="item.className" :value="item.id" />
    </el-select>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">所选分类:</label>
    <el-select v-model="subjectName" @change="getGradeName" placeholder="请选择课程分类" style="width:250px; border-radius:20px">
        <el-option v-for="item in subjectData" :key="item.subjectName" :label="item.subjectName" :value="item.subjectName" />
    </el-select>
    <br />
    <br />
    <br />

    <label style="margin-right:20px">课程名称:</label>
    <el-input  v-model="courseName" style="width:250px; border-radius:20px" placeholder="请输入课程名称"></el-input>
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
        <el-switch v-model="ineffect" style="margin-left:20px" />
    </el-form-item>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">上传封面:</label>

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
            courseName: '',
            drawer: false,
            ineffect: 0,
            gradeData: [], //年级信息
            classData: [], //班级信息
            subjectData: [], //学科信息
            gradeName: '',
            className: '',
            subjectName: ''
        }
    },

    mounted() {
        this.getGradeInfo();
    },
    methods: {
        getGradeId(item) {
            this.gradeId = item
            this.getClassInfo(item)
        },
        //获取年级信息
        getGradeInfo() {
            this.$http.get('api/grade/selectGrade', {
                params: {
                    gradeName: '',
                    gradeDirectorId: '',
                    page: 0,
                    pageSize: 0
                }
            }).then((res) => {
                this.gradeData = [];
                res.result.list.forEach(item => {
                    this.gradeData.push({
                        ...item
                    })
                })
            })
        },

        //获取年级Id 用于获取该年级的班级
        getClassInfo(gradeId) {
            this.className = '',
                this.$http.get('api/class/getClassByGradeId', {
                    params: {
                        gradeId: gradeId
                    }
                }).then((res) => {
                    this.classData = [];
                    res.result.forEach(item => {
                        this.classData.push({
                            ...item
                        })
                    })
                })
        },

        //获取学科信息
        getSubjectInfo() {
            this.$http.get('api/subject/getSubjectList', {
                params: {
                }
            }).then((res) => {
                this.subjectData = [],
                    res.result.list.forEach(element=> {
                        this.subjectData.push({
                            subjectName: element.subjectName
                    })
                    });
                    console.log(this.subjectData);
            })
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
