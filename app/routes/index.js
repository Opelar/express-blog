const express = require('express');
const router = express.Router();
const blogAction = require("../actions/blog_action");

// GET home page.
router.get("/", blogAction.renderHomePage);
// GET article details
router.get("/details", blogAction.renderDeatilsPage);

module.exports = router;
