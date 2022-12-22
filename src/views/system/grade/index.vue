<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" @click="getGradeInfo()" />
    <el-input class="clasCss" placeholder="请输入年级名称" v-model="className" />
    <el-button type="primary" class="createClass" @click=" conversion=0, drawer = true">
        创建年级
    </el-button>
</div>
<el-drawer v-model="drawer" :title="this.conversion==0 ? '创建年级': '修改年级'" :with-header="true">

    <label style="margin-right:20px">选择年级</label>
    <el-select v-model="gradeName" placeholder="请选择" :disabled="this.conversion==0 ? false : true" @change="getGrade" style="width:250px; border-radius:20px">
        <el-option v-for="item in gradeDate" :key="item.value" :label="item.value" :value="item.value">
        </el-option>
    </el-select>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">选择年级主任</label>
    <el-select v-model="gradeDirctorName" placeholder="请选择" @change="getHeadTeacher" style="margin-left:20px">
        <el-option v-for="item in headTeacherDate" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
    <br>
    <br>
    <br>
    <br>
    <el-button @click="drawer=false">取消</el-button>
    <el-button @click="this.conversion==0 ? insertGrade() :updateGrade()">确定</el-button>

</el-drawer>

<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="100" align="center" />
        <el-table-column prop="gradeName" label="年级名称" align="center" />
        <el-table-column prop="gradeDirctorName" label="年级主任" width="150" align="center" />
        <el-table-column prop="createBy" label="创建人" width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <view-list theme="outline" size="24" fill="#333" style="float:left;margin-top:5px;margin-left:25px" />
                <el-button size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

            </template>
        </el-table-column>
    </el-table>
    <div class="ts-paging">
        <Paging @pageList="getPageInfo" :totalCount='totalCount' :curPage='curPage' :pageSize='pageSize' :totalPages='totalPages' />
    </div>
</div>
</template>

<script>
import Paging from '../../../components/paging/index.vue';
import {
    Search,
    ViewList
} from '@icon-park/vue-next';
export default {
    components: {
        Paging,
        Search,
        ViewList
    },
    data() {
        return {
            conversion: 0, //0代表创建   1代表修改
            className: '',
            drawer: false,
            isForbidden: true,
            tableData: [], //表格数据
            totalCount: 0,
            curPage: 1,
            pageSize: 10,
            totalPages: 0,
            updateClassData: '', //班级修改时，保存的数据
            gradeDate: [{
                value: '一年级',
            }, {
                value: '二年级',
            }, {
                value: '三年级',
            }, {
                value: '四年级',
            }, {
                value: '五年级',
            }, {
                value: '六年级',
            }, {
                value: '七年级',
            }, {
                value: '八年级',
            }, {
                value: '九年级',
            }, {
                value: '高一',
            }, {
                value: '高二',
            }, {
                value: '高三',
            }],
            gradeName: '',
            gradeDirctorName:'',
            headTeacherName:'',
            gradeDirectorId:'',
            headTeacherDate: [],

        }
    },

    mounted() {
        this.getGradeInfo();
        this.getTeacherInfo();
    },

    methods: {
        //获取年级
        getGrade(item) {
            this.gradeName = item
        },
        //获取年级主任Id
        getHeadTeacher(item) {
             console.log("item",item);
            this.gradeDirectorId = item
            console.log("this.gradeDirectorId",this.gradeDirectorId);
        },

        //================================================
        //修改
        handleEdit(index, row) {
            console.log(index, row);
            this.conversion = 1,
                this.drawer = true,
                this.gradeName = row.gradeName,
                this.gradeDirctorName = row.gradeDirctorName
            this.updateClassData = row

        },

        //删除
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('是否删除当前学科信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.deleteClass(row.id);

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // this.deleteSubject(row.id);
        },

        //获取分页信息
        getPageInfo(data) {
            this.curPage = data.page
            this.pageSize = data.pageSize
            this.getGradeInfo()

        },

        //新增年级
        insertGrade() {
            this.$http.post('/api/grade/insertGrade', {
                gradeName: this.gradeName,
                gradeDirectorId: this.gradeDirectorId
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                    this.drawer = false;
                    this.gradeName = '';
                    this.gradeDirectorId = '';
                    this.$message.success("新增成功")
                    this.getGradeInfo();
                }
            })
        },

        //修改年级信息
        updateGrade() {

            this.updateClassData.gradeDirectorId=this.gradeDirectorId;

            this.$http.post('/api/grade/updateGradeInfo', JSON.stringify(this.updateClassData), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if (res.code == 200) {
                    this.drawer = false;
                    this.gradeDirectorId = '';
                    this.gradeName = '';
                    this.getGradeInfo();
                    this.$message.success("修改成功")
                }
            })
        },

        //删除学科信息
        deleteClass(classId) {
            this.$http.post('/api/class/deleteClass', {
                classId: classId
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getGradeInfo();
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败!',
                    });
                }
            })
        },

        //获取教师信息
        getTeacherInfo() {
            this.$http.get('api/ts/getTeacherInfo', {
                params: {

                }
            }).then((res) => {
                this.headTeacherDate = [];
                res.result.forEach(e => {
                    this.headTeacherDate.push({
                        value: e.id,
                        label: e.userName
                    })
                })
            })
        },

        //获取年级信息
        getGradeInfo() {
            this.$http.get('api/grade/selectGrade', {
                params: {
                    gradeName: this.gradeName,
                    gradeDirectorId: this.gradeDirectorId,
                    page:this.curPage,
                    pageSize:this.pageSize
                }
            }).then((res) => {
                this.tableData=[];
                this.curPage = res.result.curPage,
                    this.totalCount = res.result.totalCount,
                    this.pageSize = res.result.pageSize,
                    this.totalPages = res.result.totalPages,
                res.result.list.forEach((item,index)=>{
                    this.tableData.push({
                        no: (res.result.curPage - 1) * res.result.pageSize + index + 1,
                        ...item
                    })      
                })
                 console.log(this.tableData)
            })
        }
    }

}
</script>

<style>
.el-button {
    align-items: center;
}

.clasCss {
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

.ts-table {
    width: 90%;
    margin: 40px auto;
}

.ts-paging {
    text-align: center;
    margin-left: 150px;
    margin-top: 30px;
}

.createClass {
    float: left;
    height: 40px;
    background-color: blue;
}
</style>
