export function handleError() {
  sessionStorage.setItem("UserName", "");
  this.$Modal.error({
    title: "错误信息",
    content: "您的用户状态已失效，请前往登录页面重新登录",
    onOk: () => {
      this.$router.replace("/login");
    }
  });
}
