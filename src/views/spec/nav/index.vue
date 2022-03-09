<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery._filter.name" placeholder="导航名称" class="search-input-large filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery._filter['`level`']" clearable filterable placeholder="导航节点层级" class="search-input-large filter-item">
        <el-option v-for="(val, key, index) in {1: '一级导航', 2: '二级导航'}" :key="index" :label="val" :value="key" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-search" @click="handleFilter">查刷</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-delete" @click="clearFilter">清除</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新建</el-button>
    </div>
    <NavTable ref="navtable" :listQuery="listQuery"/>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import NavTable from './components/NavTable';

export default {
  name: 'Nav',
  components: { NavTable },
  directives: { waves },
  data() {
    return {
      total: 0,
      tableKey: 0,
      page_sizes: [15, 30, 100, 500],
      listLoading: true,
      listQuery: {
        _filter: {},
        page: 1,
        limit: 15,
        sort: '-id'
      }
    }
  },
  methods: {
    getQueryFilter() {
      for (const k in this.listQuery._filter) {
        if (this.listQuery._filter[k] === '') {
          delete this.listQuery._filter[k]
        }
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.$refs.navtable.getNavList()
    },
    clearFilter() {
      this.listQuery._filter = {}
    },
    handleCreate() {
      this.$refs.navtable.$refs.navmodel.handleCreate()
    },
  }
}
</script>

<style scoped>
  .search-input-medium {
    width: 110px;
    margin-left: 1px;
  }
  .search-input-large {
    width: 150px;
    margin-left: 1px;
  }
</style>
