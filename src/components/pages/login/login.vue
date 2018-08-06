<template>
  <div class="login-panel">
    <h1>管理平台登陆</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <FormItem prop="account">
        <Input v-model="formValidate.account" type="text" placeholder="请输入用户名" size="large"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input v-model="formValidate.password" type="password" placeholder="请输入密码（密码长度不能小于6位）" size="large"></Input>
      </FormItem>
      <FormItem class="btn-group">
        <Button type="primary" @click="handleSubmit('formValidate')" size="large">
            <Icon type="md-checkmark" /><span>登陆</span>
        </Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 15px" size="large">
            <Icon type="md-refresh" /><span>重置</span>
          </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "login",
    data() {
      return {
        formValidate: {
          account: "",
          password: ""
        },
        ruleValidate: {
          account: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          password: [{
            required: true,
            type: "string",
            min: 6,
            message: "请输入密码,密码长度不能小于6位",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const url = "/api/Users/login";
            const options = {
              UserName: this.formValidate.account,
              Password: this.formValidate.password
            };
            const data = Object.assign({}, options);

            return axios
              .post(url, data)
              .then((res) => {
                if (res.data.Code == 1) {
                  sessionStorage.setItem("UserName", res.data.data.UserName);
                  this.$router.replace("/");
                  this.$Message.success("登陆成功");
                }else{
                  this.$Message.error("登陆失败，账号或密码不正确");
                }
              });
          } else {
            this.$Message.error('表单验证失败!');
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
    >form {
      padding-top: 15px;
      >.btn-group {
        text-align: center;
      }
    }
    >h1 {
      line-height: 50px;
      text-align: center;
    }
  }

  .ivu-btn .ivu-icon {
    line-height: 1.5;
  }

  .ivu-btn .ivu-icon+span {
    margin-left: 4px;
  }
</style>
