const blogAction = (module.exports = {
  // blog home page
  async renderHomePage(req, res, next) {
    res.render("index", { title: "博客首页" });
  },

  async renderDeatilsPage(req, res, next) {
    const query = req.query;
    console.log(query);
    res.render("blog_details", { title: "文章详情" });
  }
});
