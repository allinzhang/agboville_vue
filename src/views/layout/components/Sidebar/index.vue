<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
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
        <!-- <SidebarItem
          v-for="(route, index) in menuList"
          :key="index"
          :item="route"
          :index="index"
          :base-path="route.path"
        ></SidebarItem> -->
        <el-sub-menu
          v-for="(route, index) in menuList"
          :key="route.path"
          :index="route.path"
        >
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>{{ route.title || "" }}</span>
          </template>
          <el-menu-item
            :index="child.path"
            v-for="(child) in route.children"
            :key="child.path"
          >
            {{ child.title || "" }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { mapGetters } from "vuex";
// import { Options, Vue } from "vue-class-component";
import Logo from "./Logo.vue";
// import SidebarItem from "./SidebarItem.vue";

// @Options({
//   components: {
  //   },
// })
// export default class Sidebar extends Vue {
export default defineComponent({
  components: {
    Logo,
    // SidebarItem,
  },
  data () {
    return {
      showLogo: true,
      isCollapse: false,
      activeMenu: 0,
      menuList: [
        { hidden: false, icon: "", title: "总览", path: "/dashboard" },
        { hidden: false, icon: "", title: "今日事项", path: "/dashboard" },
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
