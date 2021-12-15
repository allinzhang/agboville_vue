<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-03 17:09:51
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_user_vue/src/views/dashboard/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span>项目日历</span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="mini" type="success">新增</el-button>
        </el-button-group>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

})
  // setup() {
  //   const calendar = ref()
  //   const selectDate = (val: string) => {
  //     calendar.value.selectDate(val)
  //   }

  //   return {
  //     calendar,
  //     selectDate,
  //   }
  // }

</script>
