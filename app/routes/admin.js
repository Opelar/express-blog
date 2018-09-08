const express = require("express");
const router = express.Router();
const adminAction = require("../actions/admin_action");
const createArticleAction = require("../actions/create_action");

// GET admin index
router.get("/", adminAction.adminIndexPage);
// GET admin login
router.get("/login", adminAction.loginPage);
// POST admin login
router.post("/login", adminAction.login);
// GET admin create
router.get("/create", adminAction.adminArticleCreate);
// POST article create
router.post("/create", createArticleAction.createArticle);

module.exports = router;
