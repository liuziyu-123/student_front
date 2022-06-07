<template>
  <div class="top">

      学生管理系统

  <el-button text @click="open">退出登录</el-button>
      
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
 
    data(){
      return{
          data: [],
      }
    },



    methods:{
           //退出登录
           loginOut(){
              this.axios.post('/api/user/loginOut',{},{
                headers: {
                    "token":localStorage.getItem("token")
                }
              }).then((res)=>{

                 if(res.data.code==200){
                  
                   localStorage.removeItem("token")
                   this.data.push({
                            visiable: 'true'
                        }),
                        console.log(this.data);
                    this.$emit('getLoginOut', this.data);
                   this.$router.push({
                     path:'/'
                   })
                 }
              });
           },

            open(){
              ElMessageBox.alert('确定退出系统吗？', '系统提示', {
                confirmButtonText: 'OK',
                    callback: () => {
                      this.loginOut()
    },
              })
            },
    },


}
</script>

<style>
.top{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: blanchedalmond;
}

.el-button{
  float: right;
  height: 50px;
  line-height: 50px;
}
</style>