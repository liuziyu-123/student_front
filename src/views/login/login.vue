<template>
  <form class="userForm">
      <div class="user">
      <label name="userName" class="userName">用户名:</label>
      <input type="text" class="login-user" v-model="userName"/>
      </div>
      <br>
      <div  class="pswd">
      <label  name="passWord" class="passWord">密码:  </label>
        <input type="password"  class="login-pswd" v-model="password"/>
      </div>

      <el-form-item class="login-end">
      <el-button type="primary" @click="submitForm()"
        >Submit</el-button
      >
      <el-button @click="resetForm()">Reset</el-button>
    </el-form-item>
  </form>
</template>

<script>
export default {
    data(){
        return {
            userName:'',
            password:'',
        }
    },

    watch:{
        userName(){
            console.log(this.userName);
        },

        password(){
            console.log(this.password);
        }
    },

    // mounted:{

    // },
    computed:{

    },

    methods:{
        submitForm(){
            if(this.userName==''||this.password==''){
                alert("请输入用户名或者密码")
                return false;
            }
            this.$router.push({path: '/About'})
        },

        resetForm(){
            this.userName='';
            this.password=''
        }

    }


}
</script>

<style >
body{
    margin:0px;
    padding: 0px;
    background-image: url('../../assets/loginBack.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;  /*关键*/
    background-size: 100% 100%;
    z-index: -1;
    background-size: cover;
}

.userForm{
   border: 2px solid  red;
   width: 50%;
   height: 200px;
   margin: 200px auto;
}

.user{   
    height: 50px;
    line-height: 50px;
    margin-top: 16px;
}

.userName,.passWord{
  font-size: 26px;
}

.login-user,.login-pswd{
    width: 200px;
    height: 30px;
    border: 1px solid #c0c4cc;
    border-radius: 5px;
    outline-style: none; 
}

.login-pswd{
    margin-left: 20px;
}

.login-end{
    margin: 22px 300px;
}


</style>