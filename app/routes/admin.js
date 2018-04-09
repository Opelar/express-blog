const express = require("express");
const router = express.Router();

/* GET admin login */
router.get("/", function(req, res, next) {
  res.render("admin_login", { title: "博客后台登录" });
});

/* GET admin login */
router.get("/index", function(req, res, next) {
  res.render("admin_index", { title: "博客后台管理" });
});

module.exports = router;
