<template>
  <Layout :style="{padding: '0 50px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
    </Breadcrumb>
    <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu ref="menu" :active-name="activemenu" width="auto">

            <MenuGroup title="管理平台">
              <MenuItem :name="0" :to="`/app/stance/welcome`"> 欢迎页
              </MenuItem>
            </MenuGroup>
            <MenuGroup :title="group.Name" v-for="group in sidebars" :key="group.ID">
              <MenuItem :name="item.ID" @click.native="goLink(item)" v-for="item in group.sides" :key="item.ID">{{item.Name}}
              </MenuItem>
            </MenuGroup>

          </Menu>
        </Sider>
        <Content :style="{padding: '5px 24px 80px', minHeight: '280px', background: '#fff'}">
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
      sidebars: [],
      activemenu: 0
    };
  },
  created() {
    this._getSidebar();
  },
  mounted() {
    this.menuList();
  },
  methods: {
    menuList() {
      this.$route.params.cid ? this.activemenu = Number(this.$route.params.cid) : this.activemenu = 0;
    },
    _getSidebar() {
      getSidebar().then(res => {
        if (res.Code === 1) {
          this.sidebars = BuildHierarchy(res.data, 1);
          // 激活选中
          this.$nextTick(() => {
            this.$refs.menu.updateOpened();
            this.$refs.menu.updateActiveName();
          });
        } else if (res.Code == -1) {
          sessionStorage.setItem("UserName", "");
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
    goLink(item) {
      this.$router.push({
        path: `/app/stance/substance/${item.PID}/${item.ID}`
      });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
