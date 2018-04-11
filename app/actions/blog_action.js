const dbAdap = require("../lib/dbAdap");

const blogAction = (module.exports = {
  // blog home page
  async renderHomePage(req, res, next) {
    let initList = [];
    let list = [];
    try {
      const Article = await dbAdap.getCollection("article");
      initList = await Article.find({}).sort({ ctime: -1 }).toArray();
    } catch (error) {
      console.log(error);
    }
    
    initList.map((item, index) => {
      let _item = {
        id: item.id,
        title: item.title,
        author: item.author,
        summary: item.summary,
        ctime: item.ctime
      }
      list.push(_item);
    })
    
    res.render("index", { title: "博客首页", articleList: list });
  },

  async renderDeatilsPage(req, res, next) {
    const query = req.query;
    let articleItem = {};
    try {
      const Article = await dbAdap.getCollection("article");
      articleItem = await Article.findOne(query);
    } catch (error) {
      console.log(item);
    }

    res.render("blog_details", { title: "文章详情", article: articleItem });
  }
});
