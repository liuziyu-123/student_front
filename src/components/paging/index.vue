<template>
<el-pagination style="margin-left: 50%;
    transform: translate(-50%,50%);" background  layout="prev, pager, next, jumper,sizes,total" 
:page-sizes="[2, 3, 5, 10, 50, 100]"
:total="totalCount" 
:current-page="curPage"
:pager-count="pageSize"
@size-change="handleSizeChange" 
@current-change="handleCurrentChange" />

</template>

<script>
export default {

    data() {
        return {
           InfoTotal:100,
           msgPage:1,
           pageSize:10
        }
    },

    props:{
      totalCount:{
        type:Number,
        default:0
      },
      curPage:{
        type:Number,
        default:1
      },
      pageSize:{
        type:Number,
        default:10
      },
      totalPages:{
        type:Number,
        default:1
      }

    },

    methods: {

        handleSizeChange(val) {
            console.log("sizeChange", val);
            this.pageSize=val
           let data={
              page:this.msgPage,
              pageSize:this.pageSize
            }
            
            this.$emit("pageList",data)
        },
        handleCurrentChange(val) {
            console.log("currentChange", val);
            this.msgPage=val
            let data={
              page:this.msgPage,
              pageSize:this.pageSize
            }
            // let data=[]
            // data.push({
            //   page:this.msgPage,
            //   pageSize:this.pageSize
            // })
            this.$emit("pageList",data)
            
        }

    }
}
</script>

<style>
.left-square {
    display: inline-block;
}

.el-row {
    display: inline-block;
}
</style>
