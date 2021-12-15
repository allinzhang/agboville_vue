<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 15:58:15
 * @LastEditTime: 2021-12-14 17:06:33
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex';

import * as types from "./store/modules/types";

export default defineComponent({
  setup() {
    const store = useStore();
    for (let key in types) {
      const value = sessionStorage.getItem(key);
      if (value) {
        store.dispatch(key, value);
      }
    }
    store.dispatch("SET_TOKEN", localStorage.getItem("SET_TOKEN"))
    return {

    }
  }
})
</script>

<style>
</style>
