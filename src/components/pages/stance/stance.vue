<template>
  <Layout :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <!-- <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Layout</BreadcrumbItem> -->
    </Breadcrumb>
    <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="welcome" width="auto">

            <MenuGroup title="管理平台">
              <MenuItem name="welcome"> 欢迎页
              </MenuItem>
            </MenuGroup>
            <MenuGroup :title="group.Name" v-for="group in sidebars" :key="group.ID">
              <MenuItem :name="item.ID" :to="`/app/stance/substance/${item.PID}/${item.ID}`" v-for="item in group.sides" :key="item.ID"> {{item.Name}}
              </MenuItem>
            </MenuGroup>

          </Menu>
        </Sider>
        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Content>
  </Layout>
</template>

<script>
import { getSidebar } from "api/sidebar";
import { ERR_OK } from "api/config";
import { BuildHierarchy } from "common/js/buildHierarchy";
import axios from "axios";

export default {
  name: "stance",
  data() {
    return {
      sidebars: []
    };
  },
  created() {
    this._getSidebar();
  },
  methods: {
    _getSidebar() {
      getSidebar().then(res => {
        if (res.Code === 1) {
          this.sidebars = BuildHierarchy(res.data, 1);
          console.log(this.sidebars);
        } else if (res.Code == -1) {
          this.$Modal.error({
            title: "错误信息",
            content: "您的用户状态已失效，请前往登录页面重新登录",
            onOk: () => {
              this.$router.replace("/login");
            }
          });
        }
      });
    },
    LinkTo(item) {
      alert(0)
      this.$router.push({
        path: `/app/stance/substance/${item.PID}/${item.ID}`
      });
      this.setTopList(item);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
