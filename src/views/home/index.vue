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