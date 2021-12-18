<template>
  <div v-if="!item.hidden">
    <!-- <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template> -->

    <!-- v-else -->
    <el-sub-menu :index="resolvePath(item.path)">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ item.title || "" }}</span>
      </template>
      <el-menu-item
        :index="child.path"
        v-for="(child) in item.children"
        :key="child.path"
      >
        {{ child.title || "" }}
      </el-menu-item>
    </el-sub-menu>
    <!-- <el-submenu
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Options, Vue } from "vue-class-component";
// import { Prop } from "vue-property-decorator";
import path from "path";
import { isExternal } from "../../../../static/utils/validate";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
// import FixiOSBug from "./FixiOSBug";

interface MenuItem {
  hidden: boolean;
  title: string;
  icon: string;
}
interface SidebarItemData {
  onlyOneChild: MenuItem | null;
}

// @Options({
//   components: {
//     Item,
//     AppLink,
//   },
//   // mixins: [FixiOSBug],
// })
// export default class SidebarItem extends Vue {
export default defineComponent({
  // @Prop(Number) index!: number;
  // @Prop() item!: MenuItem;
  // @Prop(String) basePath!: string;
  // @Prop(Boolean) isNest!: boolean;
  props: {
    index: Number,
    item: MenuItem,
    basePath: String,
    isNest: Boolean,
  },
  // data(): SidebarItemData {
  //   return {
  //     onlyOneChild: null,
  //   };
  // }
  methods: {
    resolvePath(routePath: string) {
      // if (isExternal(routePath)) {
      //   return routePath;
      // }
      // if (isExternal(this.basePath)) {
      //   return this.basePath;
      // }
      // return path.resolve(this.basePath, routePath);
      return routePath;
    }
  }

  // public hasOneShowingChild(children = [], parent: MenuItem): boolean {
  //   const showingChildren = children.filter((item: MenuItem) => {
  //     if (item.hidden) {
  //       return false;
  //     } else {
  //       // Temp set(will be used if only has one showing child)
  //       this.onlyOneChild = item;
  //       return true;
  //     }
  //   });

  //   // When there is only one child router, the child router is displayed by default
  //   if (showingChildren.length === 1) {
  //     return true;
  //   }

  //   // Show parent if there are no child router to display
  //   if (showingChildren.length === 0) {
  //     this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
  //     return true;
  //   }

  //   return false;
  // }
})
</script>
