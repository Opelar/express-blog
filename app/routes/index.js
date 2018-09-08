const express = require('express');
const router = express.Router();
const blogIndexAction = require("../actions/blog_action");

// GET home page.
router.get("/", blogIndexAction.renderHomePage);
// GET article details
router.get("/details", blogIndexAction.renderDeatilsPage);

module.exports = router;
