<template>
  <!-- <Table stripe :columns="columns1" :data="data1"></Table> -->
</template>

<script>
import { getContentList } from "api/content";

export default {
  name: "substance",
  data() {
    return {};
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (!this.$route.params.cid) {
        this.$router.push("/");
        return;
      }
      getContentList(this.$route.params.cid).then(res => {
        console.log(res);
        if (res.Code === 1) {
          // this.sidebars = BuildHierarchy(res.data, 1);
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
    }
  },
  watch: {
    $route(to, from) {
      this._getDetail();
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
