<template>
  <div class="about">
  <el-upload
    action="http://localhost:8081/file/upload/img"
    multiple
    list-type="picture-card"
    :class="{'is-not-allow-access':picIDListCount>=3}"
    :file-list="imageUrls"
    :on-remove="handleRemove"
    :on-preview="handlePictureCardPreview"
    :on-success="uploadSuccess"
  >
    <span> <i class="el-icon-plus" style="font-size:14px;" ></i> 添加图片</span>
  </el-upload>
  <!-- 大图预览 -->
  <el-image-viewer
      v-if="showImgViewer"
      :hide-on-click-modal="av"
      @close="closeImgViewer"
      :url-list="imagePreviewUrls"
      :z-index="3000"
      :initial-index="initialImgPreviewIndex"
  />

  </div>
</template>

<script>
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
 
  export default {
    components: {
      // ElImageViewer
  },
  data(){
    return {
      av:true,
      showImgViewer:false,
      initialImgPreviewIndex:0, // 预览打开看到的图片下标
      imagePreviewUrls:[], // 预览图片的下标
    }
  },
  methods:{
    // 图片预览
    handlePictureCardPreview (file) {
      console.log(file.url)
      let index = this.imagePreviewUrls.indexOf(file.url)
      if (index >= 0) {
        this.initialImgPreviewIndex = index
      }
      this.showImgViewer = true
    },


    closeImgViewer () {
      console.log("3r3r3r"+this.showImgViewer)
      this.showImgViewer = false
    },


    // 上传成功回调
    uploadSuccess (file, fileList) {
      console.log(file)
         console.log(fileList)
      if (fileList.status === 'success') {
        this.imagePreviewUrls.push(fileList.url) // 预览图片的数组
      }
    },
    // 删除选中的文件
    handleRemove (file) {
      // 删除预览数组对应的图片
      let index = this.imagePreviewUrls.indexOf(file.url)
      if (index > -1) {
        this.imagePreviewUrls.splice(index, 1)
      }
      // 执行删除
      
    },

  }
  }

</script>


<style>

</style>
