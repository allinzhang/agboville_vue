<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-31 10:50:05
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/mission/board.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-container">
    <div class='main-fuild'>
      <div class='row-board'>
        <div class='li-board'
          v-for="(item, index) in missionList"
          :key="index"
          >
          <div class='title-board'>
            <div class='left-title_board'>
              <div class='str-title_board'>{{item.name}}</div>
              <div class='total-list_board'>{{item.list.length || "0"}}</div>
            </div>
            <div class='right-title_board'>
              <div class='btn-more_board'>
                <svg class="icon" width="18" height="18" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M764.416 254.72a351.68 351.68 0 0186.336 149.184H960v192.064H850.752a351.68 351.68 0 01-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 01-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 01-86.336-149.312H64v-192h109.248a351.68 351.68 0 0186.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 01172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 10-384 0 192 192 0 00384 0z"></path></svg>
              </div>
              <div class='btn-add_board'>
                <svg class="icon" width="18" height="18" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M480 480V128a32 32 0 0164 0v352h352a32 32 0 110 64H544v352a32 32 0 11-64 0V544H128a32 32 0 010-64h352z"></path></svg>
              </div>
            </div>
          </div>
          <!--  -->
          <div class='column-li_board'>
            <div class='content-column_li_board'>
              <div class='drag-column_li_board'>
                <draggable
                  v-model="item.list"
                  group="mission"
                  @start="drag=true" 
                  @end="drag=false" 
                  >
                  <template #item="{element}">
                    <section
                      class='section-mission_li_board'
                      >
                      <div class='card-mission_li_board'>
                        <div>
                          <div class='card-mission_clickable'>
                            <div class='card-mission-content'>
                              <div class='card-mission-content_header'>
                                <div class='card-mission-content_header-hierarchy'>
                                  <div class='card-mission-content_header-project-name'>老板加</div>
                                  <div class='card-mission-content_header-arrow'>
                                    <svg class="icon" width="12" height="12" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 000 42.752 29.12 29.12 0 0041.728 0L714.24 534.336a32 32 0 000-44.672L382.592 149.376a29.12 29.12 0 00-41.728 0z"></path></svg>
                                  </div>
                                  <div class='card-mission-content_header-category-list'>
                                    <div class='card-mission-content_header-category-li'>后台</div>
                                  </div>
                                </div>
                                <div class='card-mission-content_body'>
                                  <div class='card-mission-content_body_container'>
                                    <span class='card-mission-content_body-clickable'>
                                      <div class='card-mission-content_body-clickable-name'>{{index}}任务名称{{element.id || ""}}</div>
                                    </span>
                                    <div class='card-mission-content_body-user'>
                                      <el-avatar :size="32" src="http://pm.wujek.cn/head.jpg"></el-avatar>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <footer class='card-mission-content_footer'>
                                <div class='card-mission-content_footer-left'>
                                  <div></div>
                                  <div></div>
                                  <div class='card-mission-content_footer-startdate'>
                                    <span  class='card-mission-content_footer-startdate-value'>Sep 12</span>
                                  </div>
                                  <span class='card-mission-content_footer-date-sysbol'>-</span>
                                  <div class='card-mission-content_footer-enddate'>
                                    <span  class='card-mission-content_footer-enddate-value'>Nov 01</span>
                                  </div>
                                </div>
                              </footer>
                              <div style="margin: 0 -11px;"></div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </section> 
                  </template>
                </draggable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <draggable
        class="syllable_ul"
        element="ul"
        :list="syllable"
        :options="{group:'title', animation:150}"
        :no-transition-on-drag="true"
        @change="change"
        @start="start"
        @end="end"
        :move="move"
      >
        <transition-group type="transition"  :name="!drag? 'syll_li' : null" :css="true">
          <li v-for="(item , idx) in syllable" :key="idx">{{item.title}}</li>
        </transition-group>
      </draggable> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import draggable from "vuedraggable"

import { MissionService } from "../../api/MissionService";

export default defineComponent({
  components: {
    draggable,
  },
  setup () {
    const route = useRoute();
    const missionList = ref([]);
    const drag = ref(false);
    const missionService = new MissionService();
    let projectId = "";
    if (route.query.id) {
      projectId = route.query.id as string;
    }
    missionList.value = [
      {
        name: "任务池",
        list: [
          { id:"1", name: "用户管理" },
          { id:"2", name: "用户管理" },
          { id:"3", name: "用户管理" },
          { id:"4", name: "用户管理" },
          { id:"5", name: "用户管理" },
          { id:"6", name: "用户管理" },
          { id:"7", name: "用户管理" },
          { id:"8", name: "用户管理" },
          { id:"9", name: "用户管理" },
          { id:"10", name: "用户管理" },
        ]
      },
      {
        name: "未开始",
        list: [
          { id:"1", name: "用户管理" },
          { id:"2", name: "用户管理" },
          { id:"3", name: "用户管理" },
          { id:"4", name: "用户管理" },
          { id:"5", name: "用户管理" },
          { id:"6", name: "用户管理" },
          { id:"7", name: "用户管理" },
          { id:"8", name: "用户管理" },
          { id:"9", name: "用户管理" },
          { id:"10", name: "用户管理" },
        ]
      },
    ]
    const getList = () => {
      missionService.board(projectId);
    }
    onMounted(() => {
      getList()
    })
    return {
      drag,
      missionList
    }
  },

})
</script>

<style lang="scss" scoped>
  .app-container{
    // position: relative;
    // flex-grow: 1;
    // min-height: 0;
    // height: 0;
    // overflow: hidden;
    // display: flex;
    // flex-direction: column;
    // position: relative;
    // padding: 0;
    // min-width: 0;
    // transition: margin-top .6s cubic-bezier(.785,.135,.15,.86),height .6s cubic-bezier(.785,.135,.15,.86);
    // flex-grow: 1;
    // order: 2;
    // height: 100%;
    // overflow: auto;
    background: #f9fafb;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
    min-width: 0;
    transition: margin-top .6s cubic-bezier(.785,.135,.15,.86),height .6s cubic-bezier(.785,.135,.15,.86);
    flex-grow: 1;
    order: 2;
    height: calc(100vh - 50px);
    overflow: auto;
    
  }
  .main-fuild{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .row-board{
    flex-grow: 1;
    transition: .3s linear;
    display: flex;
    flex-wrap: nowrap;
    align-content: flex-start;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 15px;
    padding-left: 15px;
  }
  .li-board{
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    width: 270px;
    padding: 0 5px 0 0;
  }
  .title-board{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 9px;
    padding: 14px 10px 12px;
    cursor: default;
    box-shadow: 0 1px 2px 1px rgb(0 0 0 / 6%);
    margin: 6px 0 6px 6px;
    border-radius: 3px;
    background: #fff;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 9px;
    padding: 14px 10px 12px;
    color: rgb(211, 211, 211);
  }
  .left-title_board{
    display: flex;
    align-items: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    min-width: 0;
  }
  .str-title_board{
    display: flex;
    // width: calc(100% - 10px);
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
    color: #544d61;
    text-transform: uppercase;
    margin-right: 8px;
  }
  .total-list_board{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    color: #292d34;
    height: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    min-width: 25px;
    background-color: transparent!important;
    border: 1px solid #e9ebf0;
  }
  .right-title_board{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-left: 15px;
  }
  .btn-more_board,
  .btn-add_board{
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding-right: 5px;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  // 任务列表
  .column-li_board{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 399px;
    height: 0;
  }
  .content-column_li_board{
    flex-grow: 1;
    padding: 0 1px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: thin;
    overflow-x: hidden;
  }
  .drag-column_li_board{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    cursor: grab;
  }
  .section-mission_li_board{
    margin: 6px 0 6px 6px;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0 1px 2px 1px rgb(0 0 0 / 6%);
    cursor: pointer;
    position: relative;
    order: 2;
  }
  .card-mission_li_board{
    // border: 1px solid #fff;
    border-radius: 4px;
  }
  .card-mission_clickable{
    display: flex;
  }
  .card-mission-content{
    padding: 7px 10px 2px;
    min-width: 0;
    flex-grow: 1;
  }
  .card-mission-content_header{
    display: flex;
    flex-direction: column;
  }
  .card-mission-content_footer{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 4px 0 6px;
  }
  .card-mission-content_header-hierarchy{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    margin: 0 0 7px;
  }
  .card-mission-content_header-project-name{
    margin-right: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    font-weight: 300;
    line-height: 1.2;
    color: #544d61;
  }
  .card-mission-content_header-arrow{
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    stroke: transparent;
    fill: #7c828d;
  }
  .card-mission-content_header-category-list{
    display: flex;
    align-items: center;
    min-width: 0;

  }
  .card-mission-content_header-category-li{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    font-weight: 300;
    line-height: 1.2;
    color: #544d61;
  }
  .card-mission-content_body{
    margin: 0;
    color: #544d61;
    font-size: 0;
    position: relative;
  }
  .card-mission-content_body_container{
    display: flex;
    align-items: flex-start;
  }
  .card-mission-content_body-clickable{
    cursor: pointer;
    width: 100%;
    margin-bottom: 5px;
  }
  .card-mission-content_body-clickable-name{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
    cursor: pointer;
    display: inline;
    color: #000;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
  .card-mission-content_body-user{
    margin: -2px -2px -7px 2px;
  }
  .card-mission-content_footer-left{
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-wrap: wrap;
  }
  .card-mission-content_footer-startdate{

  }
  .card-mission-content_footer-startdate-value{
    font-size: 11px;
    font-weight: 400;
    color: #343434;
    cursor: pointer;
    display: flex;
  }
  .card-mission-content_footer-date-sysbol{
    margin-right: 5px;
    margin-left: 5px;
  }
  .card-mission-content_footer-enddate{

  }
  .card-mission-content_footer-enddate-value{
    font-size: 11px;
    font-weight: 400;
    color: #343434;
    cursor: pointer;
    display: flex;
  }
</style>
