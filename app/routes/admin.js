const express = require("express");
const router = express.Router();

/* GET admin login */
router.get("/", function(req, res, next) {
  res.render("admin_login", { title: "博客后台登录" });
});

/* GET admin index */
router.get("/index", function(req, res, next) {
  res.render("admin_index", { title: "博客后台管理" });
});

/* GET admin create */
router.get("/create", function(req, res, next) {
  res.render("admin_article_create", { title: "文章录入" });
});

module.exports = router;
