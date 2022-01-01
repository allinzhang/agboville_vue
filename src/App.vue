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

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

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
      const res = await UserService.detail();
      if (res.status === 200 && res.data.code === 0) {
        store.dispatch("SET_USER_INFO", res.data.data);
      } else {
        store.dispatch("SET_USER_INFO", "");
        localStorage.removeItem("SET_TOKEN")
      }
    }
    onMounted(getUserInfo)
    // const languageType = navigator.language.toLowerCase();
    // console.log("languageType", languageType)
    // const modules = import.meta.glob(`../node_modules/element-plus/lib/locale/lang/${languageType}`)
    // console.log("modules", modules)
    // const state = reactive({
    //   locale: require(`element-plus/lib/locale/lang/${languageType}`).default,
    // });
    // const locale = languageType
    return {
      locale: zhCn
      // ...toRefs(state)
    }
  }
})
</script>

<style>
</style>
