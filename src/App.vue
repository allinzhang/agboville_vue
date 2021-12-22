<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 15:58:15
 * @LastEditTime: 2021-12-20 22:38:25
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from 'vuex';

import * as types from "./store/modules/types";

import { UserService } from './api/UserService';

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
    const getUserInfo = async () => {
      // const userInfo = await UserService.detail();
      // store.dispatch("SET_USER_INFO", userInfo);
    }
    onMounted(getUserInfo)
    // const languageType = navigator.language.toLowerCase();
    // const state = reactive({
    //   locale: require(`element-plus/lib/locale/lang/${languageType}`).default,
    // });
    return {
      // ...toRefs(state)
    }
  }
})
</script>

<style>
</style>
