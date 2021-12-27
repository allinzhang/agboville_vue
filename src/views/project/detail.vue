<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-03 17:09:51
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_user_vue/src/views/dashboard/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(0)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M160 64q32 0 32 32v832q0 32-32 32t-32-32V96q0-32 32-32zM576 418.624l128-11.584V168.96l-128-11.52v261.12zm-64 5.824V151.552L320 134.08V160h-64V64l616.704 56.064A96 96 0 01960 215.68v144.64a96 96 0 01-87.296 95.616L256 512V224h64v217.92l192-17.472zm256-23.232l98.88-8.96A32 32 0 00896 360.32V215.68a32 32 0 00-29.12-31.872l-98.88-8.96v226.368z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目SOW</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[0].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(1)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M512 863.36l384-54.848v-638.72L525.568 222.72a96 96 0 01-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 009.088 0l370.432-52.928A64 64 0 01960 169.792v638.72a64 64 0 01-54.976 63.36l-388.48 55.488a32 32 0 01-9.088 0l-388.48-55.488A64 64 0 0164 808.512v-638.72a64 64 0 0173.024-63.36z"></path><path fill="currentColor" d="M480 192h64v704h-64z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目WBS</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[1].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(2)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M128 384v512h768V192H768v32a32 32 0 11-64 0v-32H320v32a32 32 0 01-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1164 0v32h160a32 32 0 0132 32v768a32 32 0 01-32 32H96a32 32 0 01-32-32V160a32 32 0 0132-32h160V96a32 32 0 0164 0v32zm-32 384h64a32 32 0 010 64h-64a32 32 0 010-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64zm192-192h64a32 32 0 010 64h-64a32 32 0 010-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64zm192-192h64a32 32 0 110 64h-64a32 32 0 110-64zm0 192h64a32 32 0 110 64h-64a32 32 0 110-64z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目计划</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[2].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(3)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目任务</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[3].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(4)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M800 416a288 288 0 10-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 01704 0c0 149.312-117.312 330.688-352 544z"></path><path fill="currentColor" d="M512 512a96 96 0 100-192 96 96 0 000 192zm0 64a160 160 0 110-320 160 160 0 010 320z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目范围</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[4].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(5)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M544 768v128h192a32 32 0 110 64H288a32 32 0 110-64h192V768H192A128 128 0 0164 640V256a128 128 0 01128-128h640a128 128 0 01128 128v384a128 128 0 01-128 128H544zM192 192a64 64 0 00-64 64v384a64 64 0 0064 64h640a64 64 0 0064-64V256a64 64 0 00-64-64H192z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目会议</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[5].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(6)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm48-176a48 48 0 11-96 0 48 48 0 0196 0zm-48-464a32 32 0 0132 32v288a32 32 0 01-64 0V288a32 32 0 0132-32z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目风险</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[6].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(7)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M602.496 240.448A192 192 0 11874.048 512l-316.8 316.8A256 256 0 01195.2 466.752L602.496 59.456l45.248 45.248L240.448 512A192 192 0 00512 783.552l316.8-316.8a128 128 0 10-181.056-181.056L353.6 579.904a32 32 0 1045.248 45.248l294.144-294.144 45.312 45.248L444.096 670.4a96 96 0 11-135.744-135.744l294.144-294.208z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目文档</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[7].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(8)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M832 512a32 32 0 1164 0v352a32 32 0 01-32 32H160a32 32 0 01-32-32V160a32 32 0 0132-32h352a32 32 0 010 64H192v640h640V512z"></path><path fill="currentColor" d="M469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 10-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 010 135.808l-331.84 331.84a32 32 0 01-18.112 9.088L436.8 623.68a32 32 0 01-36.224-36.224l15.104-105.6a32 32 0 019.024-18.112l331.904-331.84a96 96 0 01135.744 0z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目变更</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[8].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(9)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M389.44 768a96.064 96.064 0 01181.12 0H896v64H570.56a96.064 96.064 0 01-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 01181.12 0H896v64H762.56a96.064 96.064 0 01-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 01181.12 0H896v64H442.56a96.064 96.064 0 01-181.12 0H128v-64h133.44z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目阶段</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[9].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click.stop="toPath(10)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg class="icon" width="46" height="46" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-365b8594=""><path fill="currentColor" d="M628.736 528.896A416 416 0 01928 928H96a415.872 415.872 0 01299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 11-416 0 208 208 0 01416 0z"></path></svg>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">项目成员</div>
            <CountTo class="card-panel-num" :start-val="0" :end-val="staticsList[10].endVal" :duration="2600" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card class="card-project">
          <template #header>
            <div class="card-header">
              <span>项目介绍</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-collapse v-model="cardList[0]">
            <el-collapse-item title="项目背景与介绍" name="1">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="项目目标" name="2">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card-project">
          <template #header>
            <div class="card-header">
              <span>项目总结</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-collapse v-model="cardList[4]">
            <el-collapse-item title="经验总结" name="1">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="教训总结" name="2">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card class="card-project">
          <template #header>
            <div class="card-header">
              <span>项目成本</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-collapse v-model="cardList[2]">
            <el-collapse-item title="计划成本" name="1">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="实际成本" name="2">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="成本总结" name="3">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card-project">
          <template #header>
            <div class="card-header">
              <span>项目时间</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-collapse v-model="cardList[3]">
            <el-collapse-item title="计划时间" name="1">
              <div>
                计划开始时间:
              </div>
              <div>
                计划结束时间:
              </div>
            </el-collapse-item>
            <el-collapse-item title="实际时间" name="2">
              <div>
                实际开始时间:
              </div>
              <div>
                实际结束时间:
              </div>
            </el-collapse-item>
            <el-collapse-item title="时间总结" name="3">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card class="card-project">
          <template #header>
            <div class="card-header">
              <span>项目交付结果</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-collapse v-model="cardList[1]">
            <el-collapse-item title="计划交付结果" name="1">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="实际交付结果" name="2">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="未交付结果" name="3">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
            <el-collapse-item title="交付结果总结" name="4">
              <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CountTo from '../../components/countTo/vue-countTo.vue';
import { DocumentCopy } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    DocumentCopy,
    CountTo
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const staticsList = [
      { name: "项目SOW", endVal: 60, path: "/project/sow", },
      { name: "项目WBS", endVal: 190, path: "/project/wbs" },
      { name: "项目计划", endVal: 50, path: "/project/plan" },
      { name: "项目任务", endVal: 400, path: "/mission/table" },
      { name: "项目范围", endVal: 2, path: "/project/scope" },
      { name: "项目会议", endVal: 16, path: "/project/meeting" },
      { name: "项目风险", endVal: 4, path: "/project/risk" },
      { name: "项目文档", endVal: 50, path: "/project/doc" },
      { name: "项目变更", endVal: 24, path: "/project/alter" },
      { name: "项目阶段", endVal: 4, path: "/project/stage" },
      { name: "项目成员", endVal: 8, path: "/project/player" },
    ]
    const cardList = ref([1, 1, 1, 1, 1]);
    const toPath = (index: number) => {
      if (staticsList[index].path) {
        router.push({
          path: staticsList[index].path,
          query: route.query
        })
      }
    }
    return {
      staticsList,
      cardList,
      toPath,
    }
  }
})
</script>

<style lang="scss" scoped>
.app-container{
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.card-project{
  width: 100%;
  margin-bottom: 20px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
}
</style>
