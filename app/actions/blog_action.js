const blogAction = (module.exports = {
  // blog home page
  renderHomePage(req, res, next) {
    res.render("index", { title: "博客首页" });
  }
});
