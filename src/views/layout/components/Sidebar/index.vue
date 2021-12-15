<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="1"
        :collapse="isCollapse"
        :background-color="'#FFFFFF'"
        :text-color="'#292d34'"
        :unique-opened="false"
        :active-text-color="'#409EFF'"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <SidebarItem
          v-for="(route, index) in menuList"
          :key="route.path"
          :item="route"
          :index="index"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { mapGetters } from "vuex";
// import { Options, Vue } from "vue-class-component";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";

// @Options({
//   components: {
  //   },
// })
// export default class Sidebar extends Vue {
export default defineComponent({
  components: {
    Logo,
    SidebarItem,
  },
  data () {
    return {
      showLogo: true,
      isCollapse: false,
      activeMenu: 0,
      menuList: [
        {
          hidden: false,
          icon: "",
          title: "总览",
          path: "/dashboard",
          children: [
            { icon: "", title: "项目总览", path: "/dashboard/project" },
            { icon: "", title: "任务总览", path: "/dashboard/mission" },
          ],
        },
        {
          hidden: false,
          icon: "",
          title: "项目",
          path: "/project",
          children: [
            { icon: "", title: "项目管理", path: "/project/list" },
            { icon: "", title: "任务管理", path: "/mission/table" },
          ],
        },
      ],
    };
  }
  // setup() {
  //   return {
  //     isCollapse: true,
  //   };
  // }
})

// export default {
  // components: { SidebarItem, Logo },
  // computed: {
  //   ...mapGetters([
  //     'permission_routes',
  //     'sidebar'
  //   ]),
  //   activeMenu() {
  //     const route = this.$route
  //     const { meta, path } = route
  //     // if set path, the sidebar will highlight the path you set
  //     if (meta.activeMenu) {
  //       return meta.activeMenu
  //     }
  //     return path
  //   },
  //   showLogo() {
  //     return this.$store.state.settings.sidebarLogo
  //   },
  //   variables() {
  //     return variables
  //   },
  //   isCollapse() {
  //     return !this.sidebar.opened
  //   }
  // }
// };
</script>
