const express = require('express');
const router = express.Router();
const blogAction = require("../actions/blog.action");

router.get("/", blogAction.renderHomePage);
router.get("/details", blogAction.renderDeatilsPage);

module.exports = router;
