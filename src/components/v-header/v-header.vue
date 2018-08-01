<template>
  <div>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">管理平台</div>
        <div class="layout-nav">
          <MenuItem name="1" to="/index">
          <Icon type="ios-navigate"></Icon>
          内容管理
          </MenuItem>
          <MenuItem name="2" to="/system">
          <Icon type="ios-analytics"></Icon>
          系统管理
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  name: "v-header",
  data() {
    return {
      mag: ""
    };
  }
};
</script>

<style scoped></style>
