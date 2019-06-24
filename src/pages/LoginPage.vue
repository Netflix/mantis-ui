<template>
  <div class="layout vertical center-center full-height flex">
    <el-card :class="$style['login-card']">
      <div slot="header" class="clearfix layout horizontal center-center">
        <img
          :class="$style['mantis-logo']"
          src="../assets/images/mantis-logo-full-transparent.png"
          alt="Mantis Logo"
        />
      </div>
      <div>
        <el-form
          ref="loginForm"
          status-icon
          :model="form"
          :rules="rules"
          label-width="140px"
          label-position="left"
        >
          <el-form-item label="Name:" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Email:" prop="email">
            <el-input v-model="form.email" type="email" />
          </el-form-item>
          <el-form-item label="Master Name:" prop="masterName">
            <el-input v-model="form.masterName" />
          </el-form-item>
          <el-form-item label="Mantis Master Url:" prop="masterUrl">
            <el-input v-model="form.masterUrl" />
          </el-form-item>
          <el-form-item label="Mesos Url:" prop="mesosUrl">
            <el-input v-model="form.mesosUrl" />
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('loginForm')">
              Reset
            </el-button>
            <el-button type="primary" @click="submitForm('loginForm')">
              Create
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Button, Card, Form, FormItem, Input } from 'element-ui';
import store from '@/store';
import { ActionTypes } from '@/store/actions';

export default {
  name: 'LoginPage',

  components: {
    [Card.name]: Card,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button,
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        masterName: '',
        masterUrl: '',
        mesosUrl: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input your name',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Please input your email',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input a valid email address',
            trigger: 'blur',
          },
        ],
        masterName: [
          {
            required: true,
            message: 'Please input your master name',
            trigger: 'blur',
          },
        ],
        masterUrl: [
          {
            required: true,
            message: 'Please input your master url',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const masters = [
            {
              name: this.form.masterName,
              url: this.form.masterUrl,
            },
          ];
          store.dispatch(ActionTypes.LoginUser, {
            name: this.form.name,
            email: this.form.email,
          });
          store.dispatch(ActionTypes.SetMantisMasters, masters);
          store.dispatch(ActionTypes.SetMesosUrl, this.form.mesosUrl);
          this.$router.push('/clusters');
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style module>
.mantis-logo {
  width: 60px;
  height: 75%;
}

@media only screen and (min-width: 992px) {
  .login-card {
    width: 600px;
  }
}
</style>
