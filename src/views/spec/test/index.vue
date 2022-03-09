<template>
  <div>
    <section class="todoapp" style="padding: 0">
      <!-- header -->
      <header class="header">
        <div class="new-todo">公告</div>
      </header>
      <!-- main section -->
        <section v-show="todos.length" class="main">
          <ul class="todo-list">
              <li class="todo" v-for="(item, index) in todos" :key="index" :value="item">
              <div class="view">
                <el-row>
                  <el-col :span="8">
                    <label v-text="item.text" style="font-weight: 500" />
                  </el-col>
                  <el-col :span="8">
                    <label v-text="item.name" style="font-weight: 500" />
                  </el-col>
                  <el-col :span="8">
                    <label v-text="item.age" style="font-weight: 500" />
                  </el-col>
                </el-row>
              </div>
            </li>
          </ul>
        </section>
    </section>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
const defalutList = [
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 },
  { text: '制度发布', name: 'omy', age: 14 }
]
export default {
  name: 'Test',
  components: { ImageCropper, PanThumb },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      todos: defalutList,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    cropSuccess(resData) {
      console.log(resData)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>

