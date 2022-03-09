<template>
  <div>
    <el-table :key="tableKey" v-loading="listLoading" :data="navList" border fit highlight-current-row style="width: 100%;">
      <el-table-column fixed="left" label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导航名" min-width="200px" align="center" fixed="left">
        <template slot-scope="{$index, row}">
          <span class="link-type" @click="handleUpdate($index, row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导航地址" min-width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="导航图标" width="80px" align="center">
        <template slot-scope="{row}">
          <img :src="row.icon" alt="" style="width: 1.3rem;">
        </template>
      </el-table-column>
      <el-table-column label="上一级导航" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pnode | pnodeIdC2N(navList) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="180px" align="center">
        <template slot-scope="{row}">
          <span style="color: #909399">{{ row.descr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="155" align="center">
        <template slot-scope="{row}">
          <span>{{ row.utime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :disabled="true" fixed="right" align="center" width="145px" class-name="small-padding fixed-width">
        <template slot-scope="{$index, row}">
          <el-button :disabled="true" size="mini" type="primary">备用</el-button>
          <el-button :disabled="false" size="mini" type="danger" @click="handleDelete($index, row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :page-sizes="[15, 30, 100, 500]" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getNavList"/>
    <NavModel ref="navmodel" @modelCallback="modelCallback" />
  </div>
</template>

<script>
import { getNavList, deleteNav } from '@/api/spec'
import { error, success } from "@/views/common/conf";
import Pagination from '@/components/Pagination'
import { getQueryFilter, pnodeIdC2N } from "@/views/common/tablefunc";
import NavModel from "./NavModel";

export default {
  name: 'NavTable',
  components: {
    Pagination,
    NavModel
  },
  filters: {
    pnodeIdC2N
  },
  props: {
    page: {
      type: Boolean,
      default: () => true
    },
    listQuery: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      total: 0,
      tableKey: 0,
      listLoading: true,
      navList: [],
    }
  },
  created() {
    this.getNavList()
  },
  methods: {
    getNavList() {
      this.listLoading = true
      const listQuery = getQueryFilter(this.listQuery)
      getNavList(listQuery).then(response => {
        if (response.code === 20200) {
          console.log(response)
          this.navList = response.data.items
          this.total = response.data.total
        } else {
          error(response.msg)
        }
      }).finally(() => {
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    getPnodeNav(pnode) {
      this.listLoading = true
      const listQuery = {
        _field: 'id, name',
        __filter: {'pnode': pnode},
        limit: 1000
      }
    },
    handleDelete(index, row) {
      const id = row.id
      deleteNav(id, row).then((response) => {
        if (response.code === 20200) {
          this.navList.splice(index, 1)
          this.total -= 1
          success(response.msg)
        } else {
          error(response.msg)
        }
      })
    },
    handleUpdate(index, row) {
      this.$refs.navmodel.handleUpdate(index, row)
    },
    modelCallback(index, item) {
      if (index > -1) {
        this.navList.splice(index, 1, item)
      } else {
        const total = this.navList.unshift(item)
        this.total = total
      }
    }
  }
}
</script>

<style scoped>

</style>
