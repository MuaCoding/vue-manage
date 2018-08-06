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
          <Menu active-name="1" width="auto">
            <MenuGroup title="内容管理">
              <MenuItem name="1" to="/app/stance/substance">
              <Icon type="md-document" /> 文章管理
              </MenuItem>
              <MenuItem name="2">
              <Icon type="md-chatbubbles" /> 评论管理
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="统计分析">
              <MenuItem name="3">
              <Icon type="md-heart" /> 用户留存
              </MenuItem>
              <MenuItem name="4">
              <Icon type="md-leaf" /> 流失用户
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
import axios from 'axios';

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
      getSidebar().then((res) => {
        if (res.Code === 1) {
          console.log(res)
          // this.sidebars = res.data.slider;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
