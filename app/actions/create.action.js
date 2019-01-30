const dbAdap = require('../lib/dbAdap');

class CreateArticleAction {
  async createArticle(req, res) {
    let { title, author, summary, content } = req.body;

    if (!title || !content) {
      res.json({
        code: 3200,
        status: false,
        msg: 'param error',
        data: null
      });
      return;
    }

    try {
      const Article = await dbAdap.getCollection('article');
      let _article = { title, author, summary, content };
      _article.id = dbAdap.newIdString();
      _article.ctime = _article.utime = Date.now();

      Article.insertOne(_article);

      res.json({
        code: 200,
        status: true,
        msg: 'success',
        data: null
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CreateArticleAction();
