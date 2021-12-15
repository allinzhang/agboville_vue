/*
 * @Author: allin.zhang
 * @Date: 2021-12-03 15:58:15
 * @LastEditTime: 2021-12-14 21:32:41
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/router/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from "../views/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       component: () => import("../views/redirect/index.vue"),
  //     },
  //   ],
  // },
  {
    path: "/login",
    component: () => import("../views/login/index.vue"),
    // hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import('../views/dashboard/index.vue'),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/project",
    component: Layout,
    redirect: "/project/list",
    children: [
      {
        path: "list",
        component: () => import("../views/project/list.vue"),
        name: "ProjectList",
        meta: { title: "项目管理", icon: "project", affix: true },
      },
      {
        path: "member",
        component: () => import("../views/project/member.vue"),
        name: "ProjectMember",
        meta: { title: "项目成员", icon: "member", affix: true },
      },
    ],
  },
  {
    path: "/mission",
    component: Layout,
    redirect: "/mission/table",
    children: [
      {
        path: "board",
        component: () => import("../views/mission/board.vue"),
        name: "MissionBoard",
        meta: { title: "任务管理", icon: "board", affix: true },
      },
      {
        path: "calendar",
        component: () => import("../views/mission/calendar.vue"),
        name: "MissionCalendar",
        meta: { title: "任务管理", icon: "calendar", affix: true },
      },
      {
        path: "gantt",
        component: () => import("../views/mission/gantt.vue"),
        name: "MissionGantt",
        meta: { title: "任务管理", icon: "gantt", affix: true },
      },
      {
        path: "list",
        component: () => import("../views/mission/list.vue"),
        name: "MissionList",
        meta: { title: "任务管理", icon: "list", affix: true },
      },
      {
        path: "mind",
        component: () => import("../views/mission/mind.vue"),
        name: "MissionMind",
        meta: { title: "任务管理", icon: "mind", affix: true },
      },
      {
        path: "table",
        component: () => import("../views/mission/table.vue"),
        name: "MissionTable",
        meta: { title: "任务管理", icon: "table", affix: true },
      },
      {
        path: "timeline",
        component: () => import("../views/mission/timeline.vue"),
        name: "MissionTimeline",
        meta: { title: "任务管理", icon: "timeline", affix: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
