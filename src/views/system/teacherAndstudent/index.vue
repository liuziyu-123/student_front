<template>
<div class="ts-top-select">

    <el-button type="primary" class="insertUser" @click=" conversion=0, drawer = true">新增</el-button>
    <!--教师，学生-->

    <div style="display:inline-block; margin-right:10px">身份 :</div>
    <el-select v-model="identity" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="teacherOrStudent(item)" />
    </el-select>

    <div style="display:inline-block;margin-right:10px">姓名 :</div>
    <el-input class="ts-input" v-model="tsName" placeholder="请输入名称" />

    <!--省-->
    <div style="display:inline-block;margin-right:10px">省 :</div>
    <el-select clearable v-model="provinceName" class="m-2" placeholder="Select" size="large" @change="getCity" @clear="setProvinceNull">
        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>
    <!--市-->
    <div style="display:inline-block;margin-right:10px">市 :</div>
    <el-select clearable v-model="cityName" class="m-2" placeholder="Select" :disabled="provinceName === '全部'" size="large" @change="getArea" @clear="setCityNull">
        <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>
    <!--区-->
    <div style="display:inline-block;margin-right:10px">区 :</div>
    <el-select clearable v-model="areaName" class="m-2" placeholder="Select" :disabled="cityName === undefined" size="large">
        <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>

    <el-button type="primary" style="float:right;height: 40px" @click="selectTeacherOrStudent">查询</el-button>
</div>

<el-drawer v-model="drawer" :title="this.conversion==0 ? '新增用户': '修改用户'" :with-header="true">

    <el-form :model="form" label-width="120px">
        <el-form-item label="姓名">
            <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="身份">
            <el-select v-model="form.identity" placeholder="please select your identity">
                <el-option label="学生" value="1" />
                <el-option label="教师" value="0" />
            </el-select>
        </el-form-item>
        <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="please select your sex">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
            </el-select>
        </el-form-item>
        <el-form-item label="省">
            <el-select clearable v-model="form.provinceName" class="m-2" placeholder="Select" size="large" @change="getCity" @clear="setProvinceNull">
                <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="市">
            <el-select clearable v-model="form.cityName" class="m-2" placeholder="Select" :disabled="form.provinceName === ''" size="large" @change="getArea" @clear="setCityNull">
                <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="区">
            <el-select clearable v-model="form.areaName" class="m-2" placeholder="Select" :disabled="form.cityName === undefined" size="large">
                <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.name" />
            </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
            <el-col :span="11">
                <el-date-picker v-model="form.birthday" type="date" value-format="YYYY-MM-DD" placeholder="Pick a date" style="width: 100%" />
            </el-col>
        </el-form-item>
    </el-form>
    <el-button @click="clearDate">取消</el-button>
    <el-button @click="this.conversion==0 ? insertUser() : updateUser()">确定</el-button>

</el-drawer>
<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="150" />
        <el-table-column prop="userNo" label="工号" width="150" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="sex" label="性别" width="100" />
        <el-table-column prop="identity" label="身份" width="100" />
        <el-table-column prop="address" label="地址" width="180" />
        <el-table-column prop="birthday" label="生日" />
        <el-table-column label="操作" align="center">
            <template v-slot="scope">
                <el-button size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
 
        <Paging @userList="userList" :totalCount='totalCount' :curPage='curPage' :pageSize='pageSize' :totalPages='totalPages' />
    
</div>
</template>

<script>
import Paging from '../../../components/paging/index.vue'
export default {

    components: {
        Paging
    },
    data() {
        return {
            conversion: 0, //0代表创建   1代表修改
            drawer: false, //是否展示右侧弹窗
            totalCount: 0, //数据的总数
            curPage: 1, //当前的页
            pageSize: 10, //每页个数
            totalPages: 0, //总页数
            identity: '全部', //身份
            provinceName: '全部', //省名
            cityName: undefined,
            areaName: undefined,
            tsName: '',
            options: [{
                    value: '',
                    label: '全部',
                },

                {
                    value: '0',
                    label: '教师',
                },
                {
                    value: '1',
                    label: '学生',
                }
            ],
            provinceList: [], //省集合
            cityList: [], //市集合
            areaList: [], //区集合
            tableData: [], //列表集合
            form: {
                userName: '',
                mobile: '',
                password: '',
                identity: '',
                sex: '',
                provinceName: '',
                cityName: undefined,
                areaName: undefined,
                birthday: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            }
        }
    },

    mounted() {

        // console.log(provinceName == undefined)
        this.getAddressProvince();
        this.selectTeacherOrStudent();
    },

    methods: {
        //点击页码所触发的方法
        userList(data) {
            console.log(data)
            this.page = data[0].page
            this.pageSize = data[0].pageSize
            this.selectTeacherOrStudent()
        },

        //切换身份
        teacherOrStudent(data) {

            console.log(data);
            this.ts = data.value
            this.selectTeacherOrStudent()
        },

        //setCityNull
        setProvinceNull() {
            this.provinceName = '全部'
            this.form.provinceName=''
            this.form.cityName=undefined
             this.form.areaName=undefined

        },

        setCityNull() {
            this.cityName = undefined
            this.areaName=undefined
            this.form.cityName=undefined
            this.form.areaName=undefined
        },

        //修改
        handleEdit(index, row) {
            console.log(index, row);
            this.conversion = 1,
                this.drawer = true
               this.form=row
               this.subjectName = row.subjectName
                //this.updateSubjectData = row
              //  console.log("this.form",this.form)
        },
        //删除操作
        handleDelete(index, row) {
            console.log(index, row);
             this.$confirm('是否删除当前用户信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                //deleteTs
              this.deleteUser(row.id);   

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            // this.deleteSubject(row.id);
        },

        insertUser() {

            console.log(this.form)
            this.form.identity = +this.form.identity
            let params = JSON.stringify(this.form)

            this.$http.post('/api/ts/insertTs', params

            ).then((res) => {
                this.drawer = false
                console.log("erere" + res);
            })
        },
        
        updateUser(){
            console.log(this.form)
            this.form.identity = +this.form.identity
            let params = JSON.stringify(this.form)
             this.$http.post('/api/ts/updateTs', params

            ).then((res) => {
                this.drawer = false
                console.log("erere" + res);
            })
        },


        deleteUser(userId){
              this.$http.post('/api/ts/deleteTs',{
                userId:userId
              } ,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
            ).then((res) => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!' 
                    });
                    this.selectTeacherOrStudent();
                }else{
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                }
                }
            )
        },
        //清除表单数据
        clearDate(){
            this.form={
                userName: '',
                mobile: '',
                password: '',
                identity: '',
                sex: '',
                provinceName: '',
                cityName: undefined,
                areaName: undefined,
                birthday: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            }
            this.drawer=0
        },

        //获取用户列表
        selectTeacherOrStudent() {
            this.tableData = []

            let tsVoData = {
                page: this.curPage,
                pageSize: this.pageSize,
                identity: this.ts == '全部' ? '' : this.ts,
                provinceName: this.provinceName== '全部' ? '':this.provinceName,
                cityName: this.cityName,
                areaName: this.areaName,
                userName: this.tsName,
                userNo: this.tsName
            }
            let jsonData = JSON.stringify(tsVoData)

            this.$http.post('/api/ts/tsInfo', jsonData).then((res) => {
                this.curPage = res.result.curPage,
                    this.totalCount = res.result.totalCount,
                    this.pageSize = res.result.pageSize,
                    this.totalPages = res.result.totalPages,
                    res.result.list.forEach((element, index) => {
                        this.tableData.push({
                            no: index + 1,
                            age: element.age,
                            areaName: element.areaName,
                            birthday: element.birthday,
                            cityName: element.cityName,
                            createBy: element.createBy,
                            createTime: element.createTime,
                            id: element.id,
                            identity: element.identity == 1 ? '学生' : '教师',
                            mobile: element.mobile,
                            modifyBy: element.modifyBy,
                            modifyTime: element.modifyTime,
                            password: element.password,
                            provinceName: element.provinceName,
                            address: element.provinceName + element.cityName + element.areaName,
                            //1 男   2女
                            sex: element.sex == 1 ? '男' : '女',
                            userName: element.userName,
                            userNo: element.userNo
                        })
                    });

                console.log("this.tableData", this.tableData);
            })
        },

        //获取所有省份
        getAddressProvince() {

            this.$http.get('/api/ts/getProvince', {
                params: {

                }
            }).then((res) => {
                this.provinceList = res.result
                console.log(res)

            })
        },

        getCity() {
            let province = ""
            if (this.form.provinceName != '') {
                province = this.form.provinceName
                this.form.cityName = undefined;
                this.form.areaName = undefined;
            } else {
                province = this.provinceName == '全部' ? "" : this.provinceName
                this.cityName = undefined;
                this.areaName = undefined;
            }

            this.getAddressCity(province);

        },

        //获取某省的所有市
        getAddressCity(provinceName) {

            this.$http.get('/api/ts/getCity', {
                params: {
                    provinceName: provinceName
                }
            }).then((res) => {
                this.cityList = res.result;
                this.cityName = undefined;

                console.log(this.cityName === undefined)

            })
        },

        //获取某市的地区
        getArea() {
            let city = ""
             if (this.form.cityName != undefined) {
                city = this.form.cityName
            } else {
                city = this.cityName
            }
         
            this.$http.get('/api/ts/getArea', {
                params: {
                    cityName: city
                }
            }).then((res) => {
                this.areaList = res.result

            })
        }

    }
}
</script>

<style>
.m-2 {

    margin-right: 50px;
    width: 120px;

}

.ts-table {
    width: 90%;
    margin: 40px auto;
}

.ts-top-select {
    margin-top: 30px;
}

.ts-input {
    width: 120px;
    height: 40px;
    margin-right: 20px;
    position: relative;
}

.insertUser {
    float: left;
    height: 40px;
}
</style>
