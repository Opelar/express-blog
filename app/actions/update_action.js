const dbAdap = require('../lib/dbAdap');

class UpdateArticleAction {
  async updateArticle(req, res, next) {
    let { id, title, author, type, summary, content, from } = req.body;

    if (!id || !title || !content) {
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
      const artile = await Article.find({ id: id });

      if (!artile) {
        // 没找到该文章，返回错误
        res.send({
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
