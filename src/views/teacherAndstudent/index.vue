<template>
<div class="ts-top-select">
    <el-select v-model="ts" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="teacherOrStudent(item)" />
    </el-select>

    <el-input class="ts-input" v-model="province" placeholder="Please province" />

    <el-input class="ts-input" v-model="city" placeholder="Please city" />

    <el-input class="ts-input" v-model="area" placeholder="Please area" />

    <el-input class="ts-input" v-model="tsName" placeholder="Please tsName" />

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
        <Paging />
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
            ts: '教师',
            province: '安徽省',
            city: '合肥市',
            area: '蜀山区',
            tsName: '',
            options: [{
                    value: '教师',
                    label: '教师',
                },
                {
                    value: '学生',
                    label: '学生',
                }
            ],
            tableData: []
        }
    },

    mounted() {
        this.selectTeacherOrStudent();
    },

    methods: {
        teacherOrStudent(data) {

            console.log(data);
            this.ts = data.value

        },
        register() {
            this.$router.push({
                path: 'register'
            })
        },
        selectTeacherOrStudent() {
            let tsVoData = {
                identity: this.ts == '教师' ? 0 : 1,
                province: this.province,
                city: this.city,
                area: this.area,
                userName: this.tsName,
                userNo: this.tsName
            }

            let jsonData = JSON.stringify(tsVoData)

            //   console.log(params,"6666666");

            this.$http.get('/api/user/tsInfo', {
                params: {
                    page: 1,
                    pageSize: 10,
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
