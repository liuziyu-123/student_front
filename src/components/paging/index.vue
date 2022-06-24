<template>
  <el-pagination background layout="prev, pager, next" :total="10" />
</template>

<script>



export default {


  data(){
    return {
        list:[1,2,3,4,5],
        pagination: {
        pageSizeOptions: ['10', '20', '50', '100', '200'],
        showQuickJumper: true,
        showSizeChanger: true,
        hideOnSinglePage: false,
        showTotal(total) {
          return `共 ${total} 条`;
        },
        onShowSizeChange: (current, pageSize) => {
          this.pagination.current = current;
          this.pagination.pageSize = pageSize;
        },
        onChange: (current, pageSize) => {
          this.pagination.current = current;
          this.pagination.pageSize = pageSize;
        },
        buildOptionText(props) {
          return props.value + '条/页';
        },
        current: 1,
        pageSize: 10,
        total: 0
      },
    }
  }


}
</script>

<style>
.left-square{
   display: inline-block;
}

.el-row{
    display: inline-block;
}





</style>