<template>
<div class="ts-top-select">
    <el-select v-model="ts" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" @click="teacherOrStudent(item)" />
    </el-select>

    <el-input class="ts-input" v-model="province" placeholder="Please province" />

    <el-input class="ts-input" v-model="city" placeholder="Please city" />

    <el-input class="ts-input" v-model="area" placeholder="Please area" />

    <el-input class="ts-input" v-model="tsName" placeholder="Please tsName" />

    <el-button type="success" plain  @click="register()">新增</el-button>
</div>
<div class="ts-table">
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="no" label="序号" width="150" />
        <el-table-column prop="tsNo" label="工号" width="150" />
        <el-table-column prop="tsName" label="姓名" />
        <el-table-column prop="tsSex" label="性别" width="100" />
        <el-table-column prop="identity" label="身份" width="100"/>
        <el-table-column prop="address" label="地址" width="180"/>
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
            tableData: [{
                    no: '1',
                    tsNo: '223323',
                    tsName: '刘梓毓',
                    tsSex:'男',
                    identity:'学生',
                    address:'安徽省合肥市蜀山区',
                    birthday:'2022-06-15'
                },
                {
                    no: '2',
                    tsNo: '3423',
                    tsName: 'Tom',
                    tsSex:'男',
                    identity:'教师',
                    address:'安徽省合肥市蜀山区',
                    birthday:'2022-06-15'
                },
                {
                    no: '3',
                    tsNo: '6454',
                    tsName: 'Join',
                    tsSex:'男',
                    identity:'学生',
                    address:'安徽省合肥市蜀山区',
                    birthday:'2022-06-15'
                },
                {
                    no: '4',
                    tsNo: '756',
                    tsName: '刘梓毓',
                    tsSex:'男',
                    identity:'学生',
                    address:'安徽省合肥市蜀山区',
                    birthday:'2022-06-15'
                },
            ]
        }
    },

    methods: {
        teacherOrStudent(data) {

            console.log(data);
            this.ts = data.value

        },
        register(){
            this.$router.push({
                path:'register'
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

.ts-paging{
    text-align: center;
    margin-top: 30px;
}
</style>
