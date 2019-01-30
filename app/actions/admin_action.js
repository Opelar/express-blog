const sign = require('../lib/sign');
const dbAdap = require('../lib/dbAdap');
const adminUser = require('../lib/adminUser');

async function registerAdmin() {
  const User = await dbAdap.getCollection('user');
  const isExist = await User.count({
    $or: [{ username: adminUser.username }]
  });

  if (isExist) return;

  let u = {};
  u.id = dbAdap.newIdString();
  u.username = adminUser.username;
  u.salt = sign.getSalt();
  u.pwdhash = sign.encodePwd(adminUser.password, u.salt);
  u.ctime = u.utime = Date.now();
  
  User.insertOne(u);
}

class AdminAction {
  loginPage(req, res, next) {
    if (req.session.isLogin) {
      return res.redirect('/admin');
    }
    registerAdmin();
    res.render('admin_login', { title: '博客后台登录' });
  }

  adminIndexPage(req, res, next) {
    if (!req.session.isLogin) {
      return res.redirect('/admin/login');
    }
    res.render('admin_index', { title: '博客后台管理' });
  }

  adminArticleCreate(req, res, next) {
    if (!req.session.isLogin) {
      return res.redirect('/admin/login');
    }
    res.render('admin_article_create', { title: '文章录入' });
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({
        code: 3200,
        status: false,
        msg: 'param error',
        data: null
      });
    }

    try {
      const User = await dbAdap.getCollection('user');
      const u = await User.findOne({ username: username });

      if (!u) {
        res.json({
          code: 4101,
          status: false,
          msg: 'user not exists',
          data: null
        });
        return;
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
          msg: 'success',
          data: null
        });
      } else {
        res.json({
          code: 200,
          status: false,
          msg: 'The password is incorrect',
          data: null
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AdminAction();
