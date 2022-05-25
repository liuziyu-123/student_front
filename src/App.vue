<template>
<Top />
<div v-if="loginvisble==='false'">
    <div class="app-side">
        <Side class="side" />
    </div>
    <div class="app-right">
        <router-view />
    </div>
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

        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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

.app-side {
    width: 150px;
    height: 100%;
    background-color: black;
    float: left;

}
</style>
