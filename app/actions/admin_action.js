const sign = require("../lib/sign");
const dbAdap = require("../lib/dbAdap");

const adminAction = (module.exports = {
  // get login page
  async loginPage(req, res, next) {
    res.render("admin_login", { title: "博客后台登录" });
  },

  // get admin index
  async adminIndexPage(req, res, next) {
    res.render("admin_index", { title: "博客后台管理" });
  },

  // create article page
  async adminArticleCreate(req, res, next) {
    res.render("admin_article_create", { title: "文章录入" });
  },

  // post login
  async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send({
        code: 3200,
        msg: "param error",
        data: []
      });
    }
    let salt = sign.getSalt();
    let _password = sign.encodePwd(password, salt);
    console.log("salt: ", salt);
    console.log("pwd: ", _password);
    // 存库呗
    res.json({ code: 200, msg: "成功", data: [] });
  }
});
