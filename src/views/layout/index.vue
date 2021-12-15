<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 15:58:15
 * @LastEditTime: 2021-12-14 21:33:29
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/layout/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <AppMain />
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
import { defineComponent } from "vue";
// import { computed } from "vue";
// import { useStore } from "vuex";
// import { StateProps } from "../../store";

// import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar.vue";
// import RightPanel from '@/components/RightPanel'
// import ResizeMixin from './mixin/ResizeHandler.js'
// import { mapState } from 'vuex'

// @Options({
//   components: {
//     AppMain,
//     Navbar,
//     // // RightPanel,
//     // Settings,
//     Sidebar,
//     // TagsView
//   },
//   // mixins: [ResizeMixin],
// })
// export default class Layout extends Vue {
export default defineComponent({
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  setup() {
    // const store = useStore<StateProps>();
    // const userId = computed(() => store.state.user.userId);
    return {
      // userId,
      classObj: {
        // hideSidebar: !this.sidebar.opened,
        hideSidebar: false,
        // openSidebar: this.sidebar.opened,
        openSidebar: true,
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === "mobile",
      },
    };
  },
  methods: {
    handleClickOutside() {
      // this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }

  // private get userId () {
  //   return this.store
  // }
})
</script>
<style lang="scss" scoped>
@import "../../static/styles/mixin.scss";
@import "../../static/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
