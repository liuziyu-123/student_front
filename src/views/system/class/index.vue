<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" @click="getSubjectList()" />
    <el-input class="clasCss" placeholder="请输入班级名称" v-model="className" />
    <el-button type="primary" class="createClass" @click=" conversion=0, drawer = true">
        创建班级
    </el-button>
</div>
<el-drawer v-model="drawer" :title="this.conversion==0 ? '创建班级': '修改班级'" :with-header="true">

    <label style="margin-right:20px">选择年级</label>
    <el-select v-model="gradeName" placeholder="请选择" @change="getGrade" style="width:250px; border-radius:20px">
    <el-option
      v-for="item in gradeDate"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select>
    <br />
    <br />
    <br />
    <label style="margin-right:20px">选择班主任</label>
   <el-select v-model="headTeacher" placeholder="请选择"  @change="getGrade" style="margin-left:20px">
    <el-option
      v-for="item in headTeacherDate"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <br>
    <br>
    <br>
    <br>
    <el-button @click="drawer=false" >取消</el-button>
    <el-button @click="this.conversion==0 ? insertSubject() :updateSubject()">确定</el-button>

</el-drawer>

<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="100" align="center" />
        <el-table-column prop="subjectNo" label="班级编号" width="250" align="center" />
        <el-table-column prop="subjectName" label="班级名称" align="center" />
        <el-table-column prop="createBy" label="创建人" width="150" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
        <el-table-column label="是否生效" width="180" align="center">
            <template v-slot="scope">
                <el-switch v-model="scope.row.isEffective"  @change="turnOnOff(scope.$index, scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <el-button size="medium" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="medium" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
               
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
    Search
} from '@icon-park/vue-next';
export default {
    components: {
        Paging,
        Search
    },
    data() {
        return {
            conversion: 0, //0代表创建   1代表修改
            className: '',
            drawer: false,
            ineffect: true,
            tableData: [], //表格数据
            totalCount: 0,
            curPage: 0,
            pageSize: 0,
            totalPages: 0,
            updateSubjectData: '', //科学修改时，保存的数据
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
            gradeName:'',
             headTeacher:'',
            headTeacherDate:[{
                value:'43423423',
                label:'石丽平'
            },{value:'45434344',
                label:'张玉敏'}],

        }
    },

    mounted() {
        this.getSubjectList();
    },

    methods: {

            getGrade(item){
                console.log(item);
            },






        //================================================
        //修改
        handleEdit(index, row) {
            console.log(index, row);
            this.conversion = 1,
                this.drawer = true,
                this.subjectName = row.subjectName,
                console.log(this.ineffect+"生效状态");
                this.updateSubjectData = row
                
        },
         handleDelete(index, row) {
            console.log(index, row);
             this.$confirm('是否删除当前学科信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

              this.deleteSubject(row.id);   

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // this.deleteSubject(row.id);
        },

        turnOnOff(index, row){
            console.log(index, row);
            this.subjectName=row.subjectName
            this.ineffect=row.isEffective
            this.updateSubjectData = row
          //  console.log(this.updateSubjectData);
             this.updateSubject();
        },

        //获取分页信息
        getPageInfo(data) {
            this.curPage = data.page
            this.pageSize = data.pageSize
            this.getSubjectList()

        },

        //新增学科
        insertSubject() {

            // data=JSON.stringify(data)
            this.$http.post('/api/subject/insertSubject', {
                subjectName: this.subjectName,
                iseffective: this.ineffect === true ? 1 : 0
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                     this.drawer = false;
                     this.subjectName='';
                    this.$message.success("新增成功")
                     this.getSubjectList();
                }
            })
        },

        //修改学科信息
        updateSubject() {
            console.log(this.updateSubjectData);
            this.updateSubjectData.subjectName = this.subjectName;
            this.updateSubjectData.isEffective = this.ineffect === true ? 1 : 0
            this.$http.post('/api/subject/updateSubject', JSON.stringify(this.updateSubjectData), ).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                    this.drawer = false;
                    this.subjectName = "";
                    this.getSubjectList();
                    this.$message.success("修改成功")
                }
            })
        },

        //删除学科信息
         deleteSubject(subjectId) {
            this.$http.post('/api/subject/deleteSubject', {
                subjectId:subjectId
            },{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            } ).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSubjectList();
                }else{
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                }
                }
            )
        },

        //获取学科列表
        getSubjectList() {

            this.$http.get('api/subject/getSubjectList', {
                params: {
                    page: this.curPage,
                    pageSize: this.pageSize,
                    subjectName: this.subjectName
                }
            }).then((res) => {
                this.tableData = [],
                    this.curPage = res.result.curPage,
                    this.totalCount = res.result.totalCount,
                    this.pageSize = res.result.pageSize,
                    this.totalPages = res.result.totalPages,
                    res.result.list.forEach((element, index) => {
                        this.tableData.push({
                            no: (res.result.curPage - 1) * res.result.pageSize + index + 1,
                            subjectNo: element.id,
                            subjectName: element.subjectName,
                            createBy: element.createBy,
                            createTime: element.createTime,
                            isEffective: element.isEffective==1? true: false,
                            id: element.id
                        })

                    });
                console.log(this.tableData);
            })
        }
    }

}
</script>

<style>

.el-button{
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
