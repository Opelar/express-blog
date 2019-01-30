const dbAdap = require('../lib/dbAdap');

class BlogAction {
  async renderHomePage(req, res) {
    let initList = [];
    let list = [];
    try {
      const Article = await dbAdap.getCollection('article');
      initList = await Article.find({})
        .sort({ ctime: -1 })
        .toArray();
    } catch (error) {
      console.log(error);
    }

    initList.forEach(item => {
      let _item = {
        id: item.id,
        title: item.title,
        author: item.author,
        summary: item.summary,
        ctime: item.ctime
      };
      list.push(_item);
    });

    res.render('index', { title: '博客首页', articleList: list });
  }

  async renderDeatilsPage(req, res) {
    const query = req.query;
    if (!query) {
      res.json({
        code: 3200,
        status: false,
        msg: 'param error',
        data: null
      });
      return;
    }
    let articleItem = {};
    try {
      const Article = await dbAdap.getCollection('article');
      articleItem = await Article.findOne(query);
    } catch (error) {
      console.log(item);
    }

    res.render('blog_details', { title: '文章详情', article: articleItem });
  }
}

module.exports = new BlogAction();
