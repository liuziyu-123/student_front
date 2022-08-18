<template>
<!--手风琴-->
<el-tree :data="data" accordion  @node-click="handleNodeClick"   class="side"/>
</template>

<script>
export default {
    data() {
        return {

            data: [{
                    label: '系统管理',
                    children: [{
                        label: '角色管理',router:'home'},
                        {label: '班级管理',router:'about'},
                        {label: '师生管理',router:'ts'},
                        {label: '学科管理',router:'subject'},
                         {label: '年级管理',router:'grade'},
                         ],
                },
                {
                    label: '学生管理',
                    children: [{
                            label: '课程管理',
                            router:'studentCourse',
                        },
                        {
                            label: 'Level two 2-2',
                            children: [{
                                label: 'Level three 2-2-1',
                            }, ],
                        },
                    ],
                },
                {
                    label: '教师管理',
                    children: [{
                            label: '课程管理',
                            router:'teacherCourse'
                        },
                        {
                            label: 'Level two 3-2',
                            children: [{
                                label: 'Level three 3-2-1',
                            }, ],
                        },
                    ],
                },
            ]

        }
    },

    methods:{
       handleNodeClick(data){
                console.log('data',JSON.stringify(data))
                this.$router.push({
                path: data.router
            })
              
            },
    }

}
</script>

<style>

.side{
  height: 100vh;
}

.el-tree{
    background-color: burlywood !important;
}
.el-tree-node__label{
    color:white
}
.el-tree-node__label:hover{
    color:black
}
.el-tree-node__content:hover{
    background-color: rgb(58, 78, 96) !important;
}
.el-tree-node__content{
    background-color: burlywood !important;
}

</style>
