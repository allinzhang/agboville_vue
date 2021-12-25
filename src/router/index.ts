/*
 * @Author: allin.zhang
 * @Date: 2021-12-03 15:58:15
 * @LastEditTime: 2021-12-19 16:15:08
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
        path: "alter",
        component: () => import("../views/project/alter.vue"),
        name: "ProjectAlter",
        meta: { title: "项目变更管理", icon: "alter", affix: true },
      },
      {
        path: "detail",
        component: () => import("../views/project/detail.vue"),
        name: "ProjectDetail",
        meta: { title: "项目详情", icon: "detail", affix: true },
      },
      {
        path: "doc",
        component: () => import("../views/project/doc.vue"),
        name: "ProjectDoc",
        meta: { title: "项目文档", icon: "doc", affix: true },
      },
      {
        path: "duty",
        component: () => import("../views/project/duty.vue"),
        name: "ProjectDuty",
        meta: { title: "项目职责", icon: "duty", affix: true },
      },
      {
        path: "list",
        component: () => import("../views/project/list.vue"),
        name: "ProjectList",
        meta: { title: "项目管理", icon: "project", affix: true },
      },
      {
        path: "meeting",
        component: () => import("../views/project/meeting.vue"),
        name: "ProjectMeeting",
        meta: { title: "项目会议", icon: "meeting", affix: true },
      },
      {
        path: "member",
        component: () => import("../views/project/member.vue"),
        name: "ProjectMember",
        meta: { title: "项目成员", icon: "member", affix: true },
      },
      {
        path: "plan",
        component: () => import("../views/project/plan.vue"),
        name: "ProjectPlan",
        meta: { title: "项目计划", icon: "plan", affix: true },
      },
      {
        path: "player",
        component: () => import("../views/project/player.vue"),
        name: "ProjectPlayer",
        meta: { title: "项目成员管理", icon: "player", affix: true },
      },
      {
        path: "risk",
        component: () => import("../views/project/risk.vue"),
        name: "ProjectRisk",
        meta: { title: "项目风险管理", icon: "risk", affix: true },
      },
      {
        path: "scope",
        component: () => import("../views/project/scope.vue"),
        name: "ProjectScope",
        meta: { title: "项目范围", icon: "scope", affix: true },
      },
      {
        path: "sow",
        component: () => import("../views/project/sow.vue"),
        name: "ProjectSow",
        meta: { title: "项目SOW", icon: "sow", affix: true },
      },
      {
        path: "stage",
        component: () => import("../views/project/stage.vue"),
        name: "ProjectStage",
        meta: { title: "项目阶段", icon: "stage", affix: true },
      },
      {
        path: "wbs",
        component: () => import("../views/project/wbs.vue"),
        name: "ProjectWbs",
        meta: { title: "项目WBS", icon: "wbs", affix: true },
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
  {
    path: "/user",
    component: Layout,
    redirect: "/user/info",
    children: [
      {
        path: "info",
        component: () => import("../views/user/info.vue"),
        name: "UserInfo",
        meta: { title: "用户信息", icon: "member", affix: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
