const dbAdap = require('../lib/dbAdap');

class CreateActionArticle {
  // 文章录入
  async createArticle(req, res, next) {
    let { title, author, summary, content } = req.body;

    // console.log(req.body);

    if (!title || !content) {
      // 返回参数错误
      res.send({
        code: 3200,
        status: false,
        msg: 'param error',
        data: []
      });
      return;
    }

    try {
      const Article = await dbAdap.getCollection('article');
      let _article = { title, author, summary, content };
      _article.id = dbAdap.newIdString();
      _article.ctime = _article.utime = Date.now();

      Article.insertOne(_article);

      // 返回成功
      res.json({
        code: 200,
        status: true,
        msg: 'success',
        data: []
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CreateActionArticle();
