<template>
  <div class="login-panel">
    <h1>管理平台登陆</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <FormItem prop="account">
        <Input v-model="formValidate.account" placeholder="请输入用户名" size="large"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="formValidate.password" placeholder="请输入密码" size="large"></Input>
      </FormItem>
      <FormItem class="btn-group">
        <Button type="primary" @click="handleSubmit('formValidate')" size="large"><Icon type="md-checkmark" />登陆</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 15px" size="large"><Icon type="refresh" />重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formValidate: {
        account: "",
        password: ""
      },
      ruleValidate: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.login-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  padding: 25px 40px 15px 40px;
  width: 400px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

  > form {
    padding-top: 15px;
    > .btn-group {
      text-align: center;
    }
  }
  > h1 {
    line-height: 50px;
    text-align: center;
  }
}

.ivu-btn>.ivu-icon {
    line-height: 1;
}
</style>
