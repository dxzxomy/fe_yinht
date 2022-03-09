<template>
  <div>
    <pan-thumb :image="imgDataUrl" />
    <ImageCropper field="img"
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      url="/v1/spec/upload_avatar"
      img-format="png"
      @crop-success="cropSuccess"
      @close="close">
    </ImageCropper>
    <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      更换图标
    </el-button>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import 'babel-polyfill'; // es6 shim
import ImageCropper from '@/components/ImageCropper'

export default {
  name: "NavIcon",
  components: {
    PanThumb,
    ImageCropper
  },
  props: {
    imgDataUrl: {
      type: String,
      default: (() => '')
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
    }
  },
  methods: {
    cropSuccess(imgDataUrl, field){
      this.$emit('update:imgDataUrl', imgDataUrl);
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>

</style>
