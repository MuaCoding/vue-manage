<template>
  <div class="list-group" v-if="completed&&conList.length > 1">
    <h1 class="page-title">首页轮播</h1>
    <div class="action-bar">
      <Button type="primary" size="large" icon="md-add" @click="creater()">新增轮播图</Button>
    </div>
    <Table stripe border size="large" :columns="type" :data="conList"></Table>
    <div style="text-align: center; margin-top: 20px;">
      <Page :total="conList.length" show-elevator/>
    </div>
  </div>
  <div class="list-group" v-else="!completed&&conList.length == 1">
    <Form label-position="left" :label-width="100">
      <FormItem label="所属名称">
        <Input size="large"></Input>
      </FormItem>
      <FormItem label="类别">
        <Input size="large"></Input>
      </FormItem>
      <FormItem label="排序">
        <Input size="large"></Input>
      </FormItem>
      <FormItem label="网站Url">
        <Input size="large"></Input>
      </FormItem>
      <FormItem label="图片">
        <Input></Input>
      </FormItem>
      <FormItem label="发布内容">
        <Input></Input>
      </FormItem>
    </Form>
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
          key: "ID",
          align: "center"
        },
        {
          title: "标题",
          key: "Name",
          align: "center"
        },
        {
          title: "图片",
          key: "Img",
          align: "center"
        },
        {
          title: "排序",
          key: "OrderNum",
          align: "center"
        },
        {
          title: "地址",
          key: "Url",
          align: "center"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("Dropdown", { props: { trigger: "click" } }, [
              h("a", {}, [
                h("span", { style: { marginRight: "5px" } }, "选项"),
                h("Icon", { props: { type: "ios-arrow-down" } })
              ]),
              h("DropdownMenu", { slot: "list" }, [
                h(
                  "DropdownItem",
                  {
                    nativeOn: {
                      click: name => {
                        this.modify(params.row);
                      }
                    }
                  },
                  "修改"
                )
              ]),
              h("DropdownMenu", { slot: "list" }, [
                h(
                  "DropdownItem",
                  {
                    nativeOn: {
                      click: name => {
                        this.delete(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ])
            ]);
          }
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
            this.completed = false;
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
    },
    modify(item) {
      console.log(item);
    },
    delete(item) {},
    creater() {}
  },
  watch: {
    $route(to, from) {
      this._getDetail();
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.ivu-layout-content {
  h1.page-title {
    line-height: 40px;
    overflow: hidden;
    margin-bottom: 20px;
  }
}

.list-group {
  .action-bar {
    margin-bottom: 30px;
    width: 100%;
  }
}
</style>
