<!--
 * @Author: allin.zhang
 * @Date: 2021-12-03 17:09:34
 * @LastEditTime: 2021-12-20 22:45:28
 * @LastEditors: allin.zhang
 * @Description: 
 * @FilePath: /agboville_web_vite/src/views/user/info.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <h4>修改个人信息</h4>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="12">
        <el-form
          ref="userForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('user.avatar')" prop="name">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('user.realname')" prop="realname">
            <el-input v-model="ruleForm.realname"></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.nickname')" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.mobile')" prop="mobile">
            <el-input v-model="ruleForm.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.age')" prop="age">
            <!-- <el-input v-model.number="ruleForm.age"></el-input> -->
            <el-input-number v-model="ruleForm.age" :min="1" :max="200" />
          </el-form-item>
          <el-form-item :label="$t('user.gender')" prop="gender">
            <!-- <el-input v-model="ruleForm.gender"></el-input> -->
            <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
            <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{$t('form.submit')}}</el-button>
            <el-button>{{$t('form.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import User from '../../types/user';
import { UserService } from '../../api/UserService';

import { Plus } from '@element-plus/icons-vue'

import { checkNumber } from '../../static/utils/validate';
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  components: {
    Plus
  },
  setup(props, { refs }) {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const userForm = ref(null)
    const ruleForm = ref({
      avatar: "",
      nickname: "",
      realname: "",
      mobile: "",
      age: 1,
      gender: 1,
    })
    const rules = {
      avatar: [{ required: true, message: '请上传头像'}],
      nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      realname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
      age: [{ type: 'number', message: "请输入正确的数字", trigger: 'blur' }],
    }
    const submitForm = (formName) => {
      userForm.value.validate((valid) => {
        if (valid) {
          updateUser()
        } else {
          return false
        }
      })
    }
    const resetForm = (formName) => {
      userForm.value.resetFields()
    }
    const handleAvatarSuccess = (res, file) => {
      ruleForm.avatar.value = URL.createObjectURL(file.raw);
    }
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        // this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        // this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
    const getUserInfo = async () => {
      ruleForm.value = await UserService.detail();
      store.dispatch("SET_USER_INFO", ruleForm.value);
    }
    const updateUser = async () => {
      const res = await UserService.update(ruleForm.value)
      if (res.status === 200 && res.data.code === 0) {
        store.dispatch("SET_USER_INFO", red.data.data);
        ElMessage({ type: "success", message: "修改成功" });
      } else {
        ElMessage({ type: "error", message: res.data.msg || "修改失败" });
      }
    }
    onMounted(() => {
      getUserInfo()
    })
    return {
      userForm,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 98px;
  height: 98px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 34px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 98px;
  height: 98px;
  display: block;
}
</style>