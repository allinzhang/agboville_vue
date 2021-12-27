<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <el-menu default-active="1" class="menu-mission" mode="horizontal" v-if="isProjectMenu">
      <el-menu-item index="1">表格</el-menu-item>
      <el-menu-item index="2">看板</el-menu-item>
      <el-menu-item index="3">日历</el-menu-item>
      <el-menu-item index="4">甘特图</el-menu-item>
      <el-menu-item index="5">时间线</el-menu-item>
    </el-menu>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar" class="user-avatar" />
          <span class='user-name'>{{userInfo.nickname || ""}}</span>
          <el-icon :size="6"><arrow-down-bold /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.stop="toUserInfoPage">个人信息</el-dropdown-item>
            <el-dropdown-item divided>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
import { computed, defineComponent, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowDownBold } from "@element-plus/icons-vue";

// import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'


// @Options({
//   components: {
//     //     Breadcrumb,
//     //     Hamburger,
//     //     ErrorLog,
//     //     Screenfull,
//     //     SizeSelect,
//     //     Search
//   },
//   //   computed: {
//   //     ...mapGetters([
//   //       'sidebar',
//   //       'avatar',
//   //       'device'
//   //     ])
//   //   },
// })
// export default class Layout extends Vue {
export default defineComponent({
  components: {
    ArrowDownBold,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const sidebar = ref({ open: true})

    const isProjectMenu = computed(() => store.state.project.isProjectMenu);
    const userInfo = computed(() => store.state.user.userInfo);
    const toUserInfoPage = () => {
      router.push("/user/info")
    }
    const logout = () => {
      store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`);
    }
    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar')
    }
    return {
      isProjectMenu,
      sidebar,
      userInfo,
      toUserInfoPage,
      toggleSideBar,
      logout
    }
  }
})

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .menu-mission{
    float: left;
    width: 500px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name{
          font-size: 16px;
          color: #666;
        }
        // .el-icon-caret-bottom {
        //   cursor: pointer;
        //   position: absolute;
        //   right: -20px;
        //   top: 25px;
        //   font-size: 12px;
        // }
      }
    }
  }
}
</style>
