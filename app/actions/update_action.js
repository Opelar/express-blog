const dbAdap = require('../lib/dbAdap');

class UpdateArticleAction {
  async updateArticle(req, res, next) {
    const { id, title, author, type, summary, content, from } = req.body;

    if (!id || !title || !content) {
      res.json({
        code: 3200,
        status: false,
        msg: 'param error',
        data: []
      });
      return;
    }

    try {
      const Article = await dbAdap.getCollection('article');
      const artile = await Article.find({ id: id });

      if (!artile) {
        res.json({
          code: 4101,
          status: false,
          msg: 'article not exists',
          data: []
        });
        return;
      }

      let _article = { id, title, author, type, summary, content, from };
      _article.utime = Date.now();

      Article.update({ id }, { $set: _article });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UpdateArticleAction();
