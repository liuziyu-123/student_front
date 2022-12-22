<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" @click="getClassInfo()" />
    <el-input class="clasCss" placeholder="请输入班级名称" v-model="className" />
    <el-button type="primary" class="createClass" @click=" conversion=0, drawer = true">
        创建班级
    </el-button>
</div>
<el-drawer v-model="drawer" :title="this.conversion==0 ? '创建班级': '修改班级'" :with-header="true">

    <label style="margin-right:20px">选择年级</label>
    <el-select v-model="gradeId" placeholder="请选择" :disabled="this.conversion==0 ? false : true" @change="getGradeId" style="width:250px; border-radius:20px">
        <el-option v-for="item in gradeDate" :key="item.id" :label="item.gradeName" :value="item.id">
        </el-option>
    </el-select>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">选择班主任</label>
    <el-select v-model="headTeacherId" placeholder="请选择" @change="getHeadTeacher" style="margin-left:20px">
        <el-option v-for="item in headTeacherDate" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
    </el-select>
    <br>
    <br>
    <br>
    <br>
    <el-button @click="drawer=false">取消</el-button>
    <el-button @click="this.conversion==0 ? insertClass() : updateClass()">确定</el-button>

</el-drawer>

<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="100" align="center" />
        <el-table-column prop="className" label="班级名称" align="center" />
        <el-table-column prop="headTeacherName" label="班主任" width="150" align="center" />
        <el-table-column prop="createBy" label="创建人" width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
        <el-table-column label="是否生效" width="180" align="center">
            <template v-slot="scope">
                <el-switch v-model="scope.row.isForbidden" @change="turnOnOff(scope.$index, scope.row)"></el-switch>
            </template>
        </el-table-column>
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
            gradeDate: [],
            headTeacherName: '',
            headTeacherId: '',
            gradeId: '',
            headTeacherDate: [],
            gradeName:''

        }
    },

    mounted() {
        this.getClassInfo();
        this.getTeacherInfo();
        this.getGradeInfo();
    },

    methods: {
        //获取年级
        getGradeId(item) {
            this.gradeId = item
          const element=  this.gradeDate.find((element)=>{
                return this.gradeId==element.id;
            })
            console.log("element",element);
            this.gradeName=element.gradeName
        
        },
        //获取班主任Id
        getHeadTeacher(item) {
            this.headTeacherId = item
        },

        //================================================
        //修改
        handleEdit(index, row) {
            console.log(index, row);
            this.conversion = 1,
                this.drawer = true,
                this.className = row.className,
                this.headTeacherId = row.headTeacherName
            this.updateClassData = row

        },
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
            this.getClassInfo()

        },

        turnOnOff(index, row) {
            console.log(index, row);
            this.updateStatus(row);
        },

        //新增班级
        insertClass() {
            this.$http.post('/api/class/insertClass', {
                gradeId: this.gradeId,
                gradeName:this.gradeName,
                headTeacherId: this.headTeacherId
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                    this.drawer = false;
                    this.gradeName = '';
                    this.headTeacherId = '';
                    this.$message.success("新增成功")
                    this.getClassInfo();
                }
            })
        },

        //修改班级信息
        updateClass() {
            console.log(this.updateClassData);
            this.$http.post('/api/class/updateClass', {
                classId: this.updateClassData.id,
                headTeacher: this.headTeacherId
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                if (res.code == 200) {
                    this.drawer = false;
                    this.headTeacherId = '';
                    this.gradeName = '';
                    this.getClassInfo();
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
                    this.getClassInfo();
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

        //获取班级信息
        getClassInfo() {
            this.$http.get('api/class/selectAllClass', {
                params: {
                    gradeName: this.gradeName,
                    headTeacherName: this.headTeacherName,
                    page: this.curPage,
                    pageSize: this.pageSize
                }
            }).then((res) => {
                this.tableData = [];
                this.curPage = res.result.curPage,
                    this.totalCount = res.result.totalCount,
                    this.pageSize = res.result.pageSize,
                    this.totalPages = res.result.totalPages,
                    res.result.list.forEach((item, index) => {
                        this.tableData.push({
                            no: (res.result.curPage - 1) * res.result.pageSize + index + 1,
                            isForbidden:item.isForbidden==1 ? true :false,
                            className:item.className,
                            createBy:item.createBy,
                            createTime:item.createTime,
                            headTeacherName:item.headTeacherName,
                            id:item.id

                            //...item
                        })
                    })
                console.log(this.tableData)
            })
        },
        updateStatus(row) {
            console.log("row",row)
            // let data = {
            //     classId: row.id,
            //     status: row.isEffective
            // }

            this.$http.post('api/class/updateStatus',{
                 classId: row.id,
                status: row.isForbidden==true ? 1 : 0
            },{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.getClassInfo();
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改失败!',
                    });
                }
            });
        },
        //获取年级信息
        getGradeInfo() {
            this.$http.get('api/grade/selectGrade', {
                params: {
                    gradeName: '',
                    gradeDirectorId: '',
                    page:0,
                    pageSize:0
                }
            }).then((res) => {
                this.gradeDate=[];
                res.result.list.forEach(item=>{
                    this.gradeDate.push({
                        ...item
                    })      
                })
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
