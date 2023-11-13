<template>

<div v-if="loginvisble==='false'">
     <el-container>
    <el-aside v-show="this.hiddenSide" >
            <Side/>
    </el-aside>
      <el-container>
        <el-header> 
            <Top @getLoginOut="loginOutData"  @hiddenSidefunction="hiddenSideFun"      :hiddenSide='hiddenSide'   />
        </el-header>
        <el-main style="padding:0"> 
            <router-view />
        </el-main>
      </el-container>
     </el-container>

</div>
<div v-if="loginvisble==='true'">
    <Login @getLoginData="loginData" />  
</div>
</template>

<script>
import Side from '@/views/front/side.vue'
import Top from '@/views/front/top.vue'
import Login from '@/views/login/index.vue'
export default {
    data() {
        return {
            loginvisble: 'true',
            hiddenSide:false
        }
    },
    computed: {

    },
    watch: {
        loginvisble() {
            console.log("watch==" + this.loginvisble)
        }
    },

    components: {
        Side,
        Top,
        Login
    },

    methods: {
        loginData(data) {
            this.loginvisble = data[0].visiable
            console.log("methods==" + this.loginvisble)

        },

        loginOutData(data){
             this.loginvisble = data[0].visiable
            console.log("methods==" + this.loginvisble)
        },

        hiddenSideFun(data){
            this.hiddenSide=data;
            console.log(data);
        }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.el-container{
    height: 100vh;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #325f8b;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.el-header{
     font-size: 20px;
    background-color: blanchedalmond;
}
.el-aside{
    width:9%  !important;
    font-size: 18;
}

</style>
