<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:12:46
 * @LastEditTime: 2021-12-07 10:41:55
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_user_vue/src/views/layout/components/AppMain.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
import { defineComponent } from "vue";
// @Options({
//   components: {},
// })
// export default class AppMain extends Vue {
export default defineComponent({
  // private get cachedViews() {
  //   return this.$store.state.tagsView.cachedViews;
  // }

  // private get key() {
  //   return this.$route.path;
  // }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
