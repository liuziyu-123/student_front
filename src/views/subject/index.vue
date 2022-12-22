<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" @click="getSubjectList()" />
    <el-input class="subjectName" placeholder="请输入学科名称" v-model="subjectName" />
    <el-button type="primary" class="createSubject" @click=" conversion=0, drawer = true">
        创建学科
    </el-button>
</div>
<el-drawer v-model="drawer" :title="this.conversion==0 ? '创建学科': '修改学科'" :with-header="true">

    <label style="margin-right:20px">学科名称:</label>
    <el-input style="width:250px; border-radius:20px" placeholder="请输入学科名称" v-model="subjectName"></el-input>
    <br />
    <br />
    <br />
    <el-form-item label="是否生效:" style="margin-left:57px">
        <el-switch v-model="ineffect" style="margin-left:20px" />
    </el-form-item>
    <el-button @click="drawer=false">取消</el-button>
    <el-button @click="this.conversion==0 ? insertSubject() :updateSubject()">确定</el-button>

</el-drawer>

<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="100" align="center" />
        <el-table-column prop="subjectNo" label="学科编号" width="250" align="center" />
        <el-table-column prop="subjectName" label="学科名称" align="center" />
        <el-table-column prop="createBy" label="创建人" width="150" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
        <el-table-column label="是否生效" width="180" align="center">
            <template v-slot="scope">
                <el-switch v-model="scope.row.isEffective"  @change="turnOnOff(scope.$index, scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <el-button size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <!-- <el-popover placement="top" width="160" v-model="visible">
                    <p>这是一段内容这是一段内容确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                    <el-button v-slot="scope">删除</el-button>

                </el-popover> -->
            </template>
        </el-table-column>
    </el-table>
    <div class="ts-paging">
        <Paging @pageList="getPageInfo" :totalCount='totalCount' :curPage='curPage' :pageSize='pageSize' :totalPages='totalPages' />
    </div>
</div>
</template>

<script>
import Paging from '../../components/paging/index.vue';
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
            subjectName: '',
            courseName: "",
            drawer: false,
            ineffect: true,
            tableData: [], //表格数据
            totalCount: 0,
            curPage: 1,
            pageSize: 10,
            totalPages: 0,
            updateSubjectData: '', //科学修改时，保存的数据
            visible: false,
            subjectIds:[]

        }
    },

    mounted() {
        this.getSubjectList();
    },

    methods: {
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
            this.subjectIds=[];
             console.log("dddd"+this.subjectIds);
            this.subjectIds.push(subjectId);
            let params=JSON.stringify(this.subjectIds);
            this.$http.post('/api/subject/deleteSubject',params,
             { 
                headers: {
                    "Content-Type": "application/json"
                }
            }   
            ).then((res) => {
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
.subjectName {
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

.createSubject {
    float: left;
    height: 40px;
    background-color: blue;
}
</style>
