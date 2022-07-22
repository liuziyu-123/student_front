<template>
<div class="register-form">
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
        <el-input v-model="form.province" />
    </el-form-item>
    <el-form-item label="市">
        <el-input v-model="form.city" />
    </el-form-item>
    <el-form-item label="区">
        <el-input v-model="form.area" />
    </el-form-item>
    <el-form-item label="出生日期">
        <el-col :span="11">
            <el-date-picker v-model="form.birthday" type="date" value-format="YYYY-MM-DD"  placeholder="Pick a date" style="width: 100%" />
        </el-col>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit()">Create</el-button>
        <el-button>Cancel</el-button>
    </el-form-item>
</el-form>
</div>
</template>

<script>
export default {

    data() {
        return {
            form :{
                userName: '',
                mobile: '',
                password:'',
                identity:'',
                sex:'',
                province:'',
                city:'',
                area:'',
                birthday: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            }
        }
    },
    mounted(){
        this.verification();
    },
    methods:{
        verification(){
            this.$http.get('/api/user/verification',{
                params:{
                },
               
            },).then((res)=>{
                console.log(res);
            });
    },
    onSubmit(){
        
          console.log(this.form)
            this.form.identity=+this.form.identity
          let params=JSON.stringify(this.form)
        
          this.$http.post('/api/user/insertTs',params
          //{
        //         area:  this.form.area,
        //         birthday: this.form.birthday,
        //         city: this.form.city,
        //         delivery: this.form.delivery,
        //         desc: this.form.desc,
        //         identity: this.form.identity,
        //         mobile: this.form.mobile,
        //         password: this.form.password,
        //         province: this.form.province,
        //         resource: this.form.resource,
        //         sex: this.form.sex,
        //         type: this.form.type,
        //         userName: this.form.userName
        //   }
           
        //   ,{
        //         headers:{
        //             'token':localStorage.getItem('token')
        //         }
        //     }
        ).then((res)=>{
            console.log("erere"+res);
        })
    }

}
}
</script>
<style>
.register-form{
    width: 70%;
    margin: 0 auto;

}
</style>
