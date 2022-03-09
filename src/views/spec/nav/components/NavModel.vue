<template>
  <div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="item" label-width="80px" label-position="left">
        <el-form-item label="图标" prop="icon">
          <el-input v-model="imgDataUrl? imgDataUrl:item.icon" v-show="false" :disabled="true" />
          <NavIcon :imgDataUrl.sync="imgDataUrl? imgDataUrl:item.icon" />
        </el-form-item>
        <el-form-item label="导航名" prop="name">
          <el-input v-model="item.name" />
        </el-form-item>
        <el-form-item label="导航地址" prop="url">
          <el-input v-model="item.url" />
        </el-form-item>
        <el-form-item label="节点层级" prop="level">
          <el-select v-model="item.level" class="filter-item" placeholder="节点层级" filterable>
            <el-option v-for="(val, key, index) in {'一级导航': 1, '二级导航': 2}" :key="index" :label="key" :value="val"/>
          </el-select>
        </el-form-item>
        <el-form-item label="上级导航" prop="pnode">
          <el-select v-model="item.pnode" class="filter-item"  placeholder="上级导航" filterable>
            <el-option v-for="item in $parent.navList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="descr">
          <el-input type="textarea" v-model="item.descr" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNav, updateNav } from '@/api/spec'
import { error, success } from '@/views/common/conf'
import { textMap } from "@/views/common/dictMap";
import Pagination from '@/components/Pagination'
import NavIcon from "./NavIcon";
import { rules } from "./rules";
import PanThumb from '@/components/PanThumb'
import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload';

export default {
  name: 'NavModel',
  components: {
    Pagination,
    PanThumb,
    myUpload,
    NavIcon
  },
  watch: {
    imgDataUrl() {
      console.log(this.imgDataUrl)
    }
  },
  data() {
    return {
      item: {},
      dialogStatus: '',
      dialogFormVisible: false,
      imgDataUrl: '',
      rules,
      textMap
    }
  },
  methods: {
    createData() {
      this.$refs[ 'dataForm'].validate((valid) => {
        if (valid) {
          createNav(this.item).then(response => {
            if (response.code === 20201) {
              const newItem = response.data
              success(response.msg)
              this.$emit('modelCallback', -1, newItem)
            } else {
              error(response.msg)
            }
          }).finally(() => {
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const exchangeData = Object.assign({}, this.item)
          delete exchangeData.model
          updateNav(exchangeData.id, exchangeData).then(response => {
            if (response.code === 20200) {
              const newItem = response.data
              this.$emit('modelCallback', this.index, newItem)
            }
            this.dialogFormVisible = false
            this.$emit('apiNotify', response)
          })
        }
      })
    },
    handleUpdate(index, row) {
      console.log('child', index, row)
      this.item = Object.assign({}, row) // copy obj
      this.index = index
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
      if (this.$refs['dataForm']) {
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
      this.resetItem()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    resetItem() {
      this.item = {}
    },
    changeImg(img) {
      this.imgDataUrl = img
    }
  }
}

</script>

<style scoped>
.el-form {
  width: 300px;
  margin-left:50px
}
.long-item {
  width: 500px;
}
.search-input-large {
  width: 240px;
}
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
}
.el-dialog__body {
  overflow: auto;
}
</style>
