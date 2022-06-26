<template>
<form class="userForm">
    <div class="user">
        <label name="userName" class="userName">用户名:</label>
        <input type="text" class="login-user" v-model="userName" />
    </div>
    <br>
    <div class="pswd">
        <label name="passWord" class="passWord">密码: </label>
        <input type="password" class="login-pswd" v-model="passWord" />
    </div>

    <div class="pswd">
        <label name="passWord" class="passWord">密码: </label>
        <input type="password" class="login-pswd" v-model="passWord" />
    </div>

    <el-form-item class="login-end">
        <el-button type="primary" @click="submitForm()">登陆</el-button>
        <el-button type="primary" @click="reset()">重置</el-button>
    </el-form-item>
</form>
</template>

<script>
// const axios = require('axios');

export default {
    data() {
        return {
            userName: '',
            passWord: '',
            data: [],
            param: []
        }
    },

    watch: {
        userName() {
            console.log(this.userName);
        },

        password() {
            console.log(this.passWord);
        }
    },

    // mounted:{

    // },
    computed: {

    },

    methods: {

        //登陆操作
        submitForm() {
            //判断传过来的参数是否为空字符串和null
            if (this.userName == '' || this.password == '') {
                alert("请输入用户名或者密码")
                return false;
            }
            //赋值
            let data = {
                mobile: this.userName,
                password: this.passWord
            }
            //post 请求login登录接口
            this.axios.post('/api/user/login', data).then((res) => {
                //打印返回的token
                console.log("res.data.result", res.data.result);
                if (res.data.code == 200) {
                    localStorage.setItem("token", res.data.result);
                    this.data.push({
                            path: 'About',
                            visiable: 'false'
                        }),
                        this.$emit('getLoginData', this.data);
                    this.$router.push({
                        path: 'About'
                    })
                } else {
                    this.$message.warning(res.data.result);
                }

            });
            // this.data.push({
            //              path: 'About',
            //                  visiable: 'false'
            //             }),
            //             this.$emit('getLoginData', this.data);
            // this.$router.push({
            //     path: 'About'
            // })
        },

        reset() {
            this.userName="";
            this.passWord="";
        }

    }

}
</script>

<style>
body {
    margin: 0px;
    padding: 0px;
    background-image: url('../../assets/loginBack.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    /*关键*/
    background-size: 100% 100%;
    background-size: cover;
}

.userForm {
    border: 2px solid red;
    width: 50%;
    height: 200px;
    margin: 200px auto;
}

.user {
    height: 50px;
    line-height: 50px;
    margin-top: 16px;
}

.userName,
.passWord {
    font-size: 26px;
}

.login-user,
.login-pswd {
    width: 200px;
    height: 30px;
    border: 1px solid #c0c4cc;
    border-radius: 5px;
    outline-style: none;
}

.login-pswd {
    margin-left: 20px;
}

.login-end {
    margin: 22px 300px;
}
</style>
