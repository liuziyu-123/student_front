<template>
<div class="ts-top-select">
    <!--教师，学生-->
    <el-select v-model="ts" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="teacherOrStudent(item)" />
    </el-select>

    <el-input class="ts-input" v-model="tsName" placeholder="请输入名称" />
    
    <!--省-->
    <el-select v-model="provinceName" class="m-2" placeholder="Select" size="large"  @change="getProvince">
        <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>
     <!--市-->
    <el-select v-model="cityName" class="m-2" placeholder="Select"  :disabled="provinceName === 1" size="large"  @change="getCity">
        <el-option v-for="item in cityList" :key="item.id"    :label="item.name" :value="item.name"  />
    </el-select>
     <!--区-->
    <el-select v-model="areaName" class="m-2" placeholder="Select" size="large"  @change="getArea">
        <el-option v-for="item in areaList" :key="item.id"   :disabled="cityName === undefined" :label="item.name" :value="item.name"  />
    </el-select>

    

    <el-button type="success" plain @click="register()">新增</el-button>
</div>
<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="150" />
        <el-table-column prop="userNo" label="工号" width="150" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="sex" label="性别" width="100" />
        <el-table-column prop="identity" label="身份" width="100" />
        <el-table-column prop="address" label="地址" width="180" />
        <el-table-column prop="birthday" label="生日" />
    </el-table>
    <div class="ts-paging">
        <Paging  @userList="userList"/>
    </div>
</div>
</template>

<script>
import Paging from '../../components/paging/index.vue'
export default {

    components: {
        Paging
    },
    data() {
        return {
            page:1,
            pageSize:10,
            ts: '全部',
            provinceName: 1,
            cityName: undefined,
            areaName: undefined,
            tsName: '',
            options: [
                 {
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
            provinceList:[],
            cityList:[],
            areaList:[],
            tableData: []
        }
    },

    mounted() {

       // console.log(provinceName == undefined)
        this.getAddressProvince();
        this.selectTeacherOrStudent();
    },

    methods: {
        //点击页码所触发的方法
        userList(data){
            console.log(data)
            this.page=data[0].page
            this.pageSize=data[0].pageSize
            this.selectTeacherOrStudent()
        },

        //切换身份
        teacherOrStudent(data) {

            console.log(data);
            this.ts = data.value
            this.selectTeacherOrStudent()
        },
        //跳转到新增页面
        register() {
            this.$router.push({
                path: 'register'
            })
        },

        //获取用户列表
        selectTeacherOrStudent() {
            this.tableData=[]
            let tsVoData = {
                identity: this.ts=='全部' ? '' : this.ts,
                province: this.province,
                city: this.city,
                area: this.area,
                userName: this.tsName,
                userNo: this.tsName
            }
            let jsonData = JSON.stringify(tsVoData)

            this.$http.get('/api/user/tsInfo', {
                params: {
                    page: this.page,
                    pageSize: this.pageSize,
                    tsVoData: jsonData
                }
            }).then((res) => {
                res.result.forEach((element,index) => {
                    this.tableData.push({
                        no:index+1,
                        age: element.age,
                        area: element.area,
                        birthday: element.birthday,
                        city: element.city,
                        createBy: element.createBy,
                        createTime: element.createTime,
                        id: element.id,
                        identity:element.identity,
                        mobile: element.mobile,
                        modifyBy: element.modifyBy,
                        modifyTime: element.modifyTime,
                        password: element.password,
                        province: element.province,
                        address:element.province+element.city+element.area,
                        sex: element.sex,
                        userName: element.userName,
                        userNo: element.userNo
                    })
                });

                console.log("this.tableData",this.tableData);
            })
        },


        //获取所有省份
        getAddressProvince(){
            
             this.$http.get('/api/user/getProvince',{
                params:{

                }
             }).then((res)=>{
                this.provinceList=res.result
                console.log(res)

             })
        },

        getProvince(){
             console.log("1111" + this.provinceName)
             console.log(this.provinceName == undefined)
            this.cityName = undefined;
            this.areaName = undefined;
            this.getAddressCity(this.provinceName);

           
        },

        //获取某省的所有市
        getAddressCity(provinceName){
           
             this.$http.get('/api/user/getCity',{
                params:{
                    provinceName:provinceName
                }
             }).then((res)=>{
                this.cityList=res.result
                console.log(res)

             })
        },


        //获取某市的地区
        getArea(){
             this.$http.get('/api/user/getArea',{
                params:{

                }
             }).then((res)=>{
                this.areaList=res.result
                console.log(res)

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
    width: 80%;
    margin: 40px auto;
}

.ts-top-select {
    margin-top: 30px;
}

.ts-input {
    width: 120px;
    height: 40px;
    margin-left: 20px;
    position: relative;
}

.ts-paging {
    text-align: center;
    margin-top: 30px;
}
</style>
