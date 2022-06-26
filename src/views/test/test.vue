<template>
<div class="rg_layout">
    <div class="rg_left">
        <p>新用户注册</p>
        <p>USER REGISTER</p>
    </div>

    <div class="rg_center">
        <div class="rg_form">
            <form action="#" method="POST">
                <table>
                    <tr>
                        <td class="td_left"><label for="username">用户名</label></td>
                        <td class="td_right"><input type="text" name="username" id="username" placeholder="请输入用户名"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="password">密码</label></td>
                        <td class="td_right"><input type="password" name="password" id="password" placeholder="请输入密码"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="email">Email</label></td>
                        <td class="td_right"><input type="email" name="email" id="email" placeholder="请输入电子邮件"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="name">姓名</label></td>
                        <td class="td_right"><input type="text" name="name" id="name" placeholder="请输入姓名"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="tel">手机号</label></td>
                        <td class="td_right"><input type="text" name="tel" id="tel" placeholder="请输入电话号码"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label>性别</label></td>
                        <td class="td_right"><input type="radio" name="gender" value="male"> 男
                            <input type="radio" name="gender" value="female"> 女
                        </td>
                    </tr>

                     <tr>
                        <td class="td_left"><label>身份</label></td>
                        <td class="td_right"><input type="radio" name="gender" v-model="student"> 学生
                            <input type="radio" name="gender" v-model="teacher"> 教师
                        </td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="birthday">出生日期</label></td>
                        <td class="td_right"><input type="date" name="birthday" id="birthday"></td>
                    </tr>

                    <tr>
                        <td class="td_left"><label for="checkcode">验证码</label></td>
                        <td class="td_right"><input type="text" name="checkcode" id="checkcode" placeholder="请输入验证码">
                            <el-button plain @click="verification()">{{verificationCode}}</el-button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" align="center"><input type="submit" id="btn_sub" value="注册"></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            verificationCode:'',
            student:'',
            teacher:''
        }
    },

    watch:{
        student(){
            
            console.log(this.teacher)
            console.log(this.student)
        }
    },

    mounted() {
        this.verification();
    },
    methods: {
        verification() {
            this.axios.get('/api/user/verification', {
                params: {

                }
            }).then((res) => {
                console.log(res.data.code==200)
                if(res.data.code==200){
                    this.verificationCode=res.data.result;
                }else{
                    this.$message.warning(res.data.msg)
                }
            });
        }
    }
}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.rg_layout {
    width: 900px;
    height: 500px;
    border: 4px solid #EEEEEE;
    background-color: white;
    /*让div水平居中*/
    margin: auto;
}

.rg_left {
    float: left;
    margin: 15px;
}

.rg_left>p:first-child {
    color: #FFD026;
    font-size: 20px;
}

.rg_left>p:last-child {
    color: #A6A6A6;
    font-size: 20px;
}

.rg_center {
    float: left;
}

.rg_right {
    float: right;
    margin: 15px;
}

.rg_right>p:first-child {
    font-size: 15px;
}

.rg_right>p a {
    color: pink;
}

.td_left {
    width: 100px;
    text-align: right;
    height: 45px;
}

.td_right {
    padding-left: 50px;
}

#username,
#password,
#email,
#name,
#tel,
#birthday,
#checkcode {
    width: 251px;
    height: 32px;
    border: 1px solid #A6A6A6;
    /*设置边框圆角*/
    border-radius: 5px;

}

#checkcode {
    width: 110px;
}

#img_check {
    height: 32px;
    vertical-align: middle;
}

#btn_sub {
    width: 150px;
    height: 40px;
    background-color: #FFD026;
    border: 1px solid #FFD026;
}
</style>
