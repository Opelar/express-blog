const sign = require("../lib/sign");
const dbAdap = require("../lib/dbAdap");
const adminUser = require("../lib/adminUser");

// 注册后台管理用户
async function registerAdmin() {
  try {
    const User = await dbAdap.getCollection("user");
    const isExist = await User.count({
      $or: [{ username: adminUser.username }]
    });

    console.log(isExist);
    if (isExist) return;

    let u = {};
    // 基础id username
    u.id = dbAdap.newIdString();
    u.username = adminUser.username;
    // 生成盐值及密码hash
    u.salt = sign.getSalt();
    u.pwdhash = sign.encodePwd(adminUser.password, u.salt);
    // 生成创建修改时间戳
    u.ctime = u.utime = Date.now();
    // 入库
    User.insertOne(u);
  } catch (error) {
    console.log(error);
  }
}

const adminAction = (module.exports = {
  // get login page
  loginPage(req, res, next) {
    if (req.session.isLogin) {
      return res.redirect("/admin");
    }
    registerAdmin();
    res.render("admin_login", { title: "博客后台登录" });
  },

  // get admin index
  adminIndexPage(req, res, next) {
    if (!req.session.isLogin) {
      return res.redirect("/admin/login");
    }
    res.render("admin_index", { title: "博客后台管理" });
  },

  // create article page
  adminArticleCreate(req, res, next) {
    if (!req.session.isLogin) {
      return res.redirect("/admin/login");
    }
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

    try {
      const User = await dbAdap.getCollection("user");
      const u = await User.findOne({ username: username });
      // console.log(u);

      if (!u) {
        res.send({
          code: 4101,
          status: false,
          msg: "user not exists",
          data: []
        });
      }

      let login_hash = sign.encodePwd(password, u.salt);
      if (u.pwdhash === login_hash) {
        req.session.userInfo = {
          id: u.id,
          username: u.username,
          ctime: u.ctime
        };
        req.session.isLogin = true;

        res.json({
          code: 200,
          status: true,
          msg: "success",
          data: []
        });
      } else {
        res.json({
          code: 200,
          status: false,
          msg: "The password is incorrect",
          data: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});
