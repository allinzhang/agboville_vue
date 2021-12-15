<!--
 * @Author: allin.zhang
 * @Date: 2021-12-15 13:31:37
 * @LastEditTime: 2021-12-15 23:01:23
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/dashboard/components/TransactionTable.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="项目名" min-width="200">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="任务数" width="195" align="center">
      <template #default="scope">
        {{ scope.row.mission }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template #default="scope">
        <el-tag type="info" v-if="scope.row.status == 0">正常</el-tag>
        <el-tag type="danger" v-else-if="scope.row.status == 1">延误</el-tag>
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { transactionList } from '@/api/remote-search'

export default {
  computed: {
    // statusFilter() {
    //   return status => {
    //     const statusMap = {
    //       success: 'success',
    //       pending: 'danger'
    //     }
    //     return statusMap[status]
    //   }
    // },
    // orderNoFilter(str) {
    //   return str.substring(0, 30)
    // }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = [
        {name: "一案健康", status: 0, mission: 10},
        {name: "一兜商城", status: 1, mission: 24},
      ]
      // transactionList().then(response => {
      //   // this.list = response.data.items.slice(0, 8)
      // })
    }
  }
}
</script>
