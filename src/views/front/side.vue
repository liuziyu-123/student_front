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
                        {label: '班级管理',router:'About'},
                        {label: '师生管理'},
                         ],
                },
                {
                    label: 'Level one 2',
                    children: [{
                            label: 'Level two 2-1',
                            children: [{
                                label: 'Level three 2-1-1',
                            }, ],
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
                    label: 'Level one 3',
                    children: [{
                            label: 'Level two 3-1',
                            children: [{
                                label: 'Level three 3-1-1',
                            }, ],
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


</style>
