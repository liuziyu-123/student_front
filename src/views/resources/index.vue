<template>
  
<div></div>
<PictureModule   />


</template>

<script>
import PictureModule from '../../components/resources/pictureModule.vue'

export default {
components: {
        PictureModule
    },
    data(){
        return{
           type:0,
           pictureData:[]  //图片信息
        }
    },
    mounted(){

    },

    methods:{
         getResourceList(){
            this.$http.get('api/file/getList',{
                params:{
                    type:this.type
                }
            }).then((res)=>{
                console.log(res.data.list);
            })
         }
    }
}
</script>

<style>

</style>