const express = require("express");
const router = express.Router();
const adminAction = require("../actions/admin.action");
const createArticleAction = require("../actions/create.action");

router.get("/", adminAction.adminIndexPage);
router.get("/login", adminAction.loginPage);
router.post("/login", adminAction.login);
router.get("/create", adminAction.adminArticleCreate);
router.post("/create", createArticleAction.createArticle);

module.exports = router;
