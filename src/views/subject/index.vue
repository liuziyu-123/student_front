<template>
<!--搜索-->
<div style="height: 40px; border:1px solid red">

    <search class="search" theme="outline" size="24" fill="#333" />
    <el-input class="courseName" placeholder="请输入课程名称" v-model="courseName" />
    <el-button type="primary" class="createSubject" @click="drawer = true">
        创建学科
    </el-button>
</div>
<el-drawer v-model="drawer" title="createSubject" :with-header="true">

    <label style="margin-right:20px">学科名称:</label>
    <el-input style="width:250px; border-radius:20px" placeholder="请输入学科名称" v-model="subjectName"></el-input>
    <br />
    <br />
    <br />
    <el-form-item label="是否生效:" style="margin-left:57px">
        <el-switch v-model="ineffect" style="margin-left:20px" />
    </el-form-item>
    <el-button @click="drawer=false">取消</el-button>
    <el-button @click="insertSubject()">确定</el-button>

</el-drawer>

<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="100" />
        <el-table-column prop="subjectNo" label="学科编号" width="100" />
        <el-table-column prop="subjectName" label="学科名称"  />
        <el-table-column prop="createBy" label="创建人" width="100" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column  label="是否生效" width="180">
            <template v-slot="scope">
                <el-switch v-model="scope.row.isEffective"></el-switch>
            </template>
        </el-table-column>
    </el-table>
    <div class="ts-paging">
        <Paging @userList="userList"  :totalCount='totalCount' :curPage='curPage'  :pageSize='pageSize'  :totalPages='totalPages'   />
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
        Paging
    },
    data() {
        return {
            subjectName: '',
            courseName: "",
            drawer: false,
            ineffect: true,
            tableData: [],
            totalCount:'',
            curPage:'',
            pageSize:'',
            totalPages:''

        }
    },

    mounted() {
        this.getSubjectList();
    },

    methods: {
        //新增学科
        insertSubject() {
            console.log(this.subjectName);
            console.log(this.ineffect);

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
                    this.$message.success("新增成功")
                }
            })
        },

        //获取学科列表
        getSubjectList() {
            this.$http.get('api/subject/getSubjectList', {
                params: {
                    page: this.page,
                    pageSize: this.pageSize,
                    subjectName: this.subjectName
                }
            }).then((res) => {
                this.curPage=res.result.curPage,
                this.totalCount=res.result.totalCount,
                this.pageSize=res.result.pageSize,
                this.totalPages=res.result.totalPages,
                res.result.list.forEach((element, index) => {
                    this.tableData.push({
                        no: (res.result.curPage - 1) * res.result.pageSize + index + 1,
                        subjectName: element.subjectName,
                        createBy: element.createBy,
                        createTime: element.createTime,
                        isEffective: element.isEffective
                    })

                });
                console.log(this.tableData);
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

.ts-table {
    width: 80%;
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
