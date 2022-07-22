<template>
<div class="top">
    <list theme="outline" class="mulu" size="24" fill="#333" @click="hiddenSidefun()" />
    学生管理系统

    <el-button text @click="open()">退出登录</el-button>

</div>
</template>

<script>
import {
    ElMessageBox
} from 'element-plus'
import {
    List
} from '@icon-park/vue-next'

export default {
    components: {
        List
    },
    props:{
      hiddenSide:{
        type:Boolean,
        default:false
      }
    },

    data() {
        return {
            data: []
        }
    },

    methods: {
        //退出登录
        loginOut() {
            this.axios.post('/api/user/loginOut', {}, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((res) => {

                if (res.data.code == 200) {

                    localStorage.removeItem("token")
                    this.data.push({
                            visiable: 'true'
                        }),
                        console.log(this.data);
                    this.$emit('getLoginOut', this.data);
                    this.$router.push({
                        path: '/'
                    })
                }
            });
        },

        open() {
            ElMessageBox.alert('确定退出系统吗？', '系统提示', {
                confirmButtonText: 'OK',
                callback: () => {
                    this.loginOut()
                },
            })
        },

        hiddenSidefun(){
          console.log(this.hiddenSide);
          if(this.hiddenSide){
            console.log("top==="+this.hiddenSide)
             this.$emit('hiddenSidefunction', false);
          }else{
             console.log("top111=="+this.hiddenSide)
            //  this.data.push({
            //                 visiable: 'false'
            //             }),
              this.$emit('hiddenSidefunction',true );
              
          }
        }
    },

}
</script>

<style>
.mulu {
    float: left;
    margin-top: 15px;
}

.top {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: blanchedalmond;
}

.el-button {
    float: right;
    height: 50px;
    line-height: 50px;
}
</style>
