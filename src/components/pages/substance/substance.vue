<template>
  <div class="list-group" v-if="completed">
    <h1 class="page-title">首页轮播</h1>
    <div class="action-bar">
    </div>
    <Table stripe border ellipsis :columns="type" :data="conList"></Table>
  </div>
</template>

<script>
import { getContentList } from "api/content";
import { BuildHierarchy } from "common/js/buildHierarchy";

export default {
  name: "substance",
  data() {
    return {
      completed: false,
      type: [
        {
          title: "#",
          key: "ID"
        },
        {
          title: "标题",
          key: "Name"
        },
        {
          title: "图片",
          key: "Img"
        },
        {
          title: "排序",
          key: "OrderNum"
        },
        {
          title: "地址",
          key: "Url"
        },
        {
          title: "操作",
          key: "operation"
        }
      ],
      conList: []
    };
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
        if (res.Code === 1) {
          if (res.detail.length == 1) {
          } else if (res.detail.length > 1) {
            this.completed = true;
            if (!this.$route.params.pid) {
              this.$router.push("/");
              return;
            }
            var data = BuildHierarchy(
              res.detail,
              Number(this.$route.params.pid)
            );
            this.conList = data[0].sides;
          }
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
