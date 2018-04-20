const sign = require("../lib/sign");
const dbAdap = require("../lib/dbAdap");

const updateAction = (module.exports = {
  async updateArticle(req, res, next) {
    let { id, title, author, type, summary, content, from } = req.body;

    if (!id || !title || !content) {
      // 返回参数错误
      return;
    }

    try {
      const Article = await dbAdap.getCollection("article");
      const artile = await Article.find({ id: id });

      if (!artile) {
        // 没找到该文章，返回错误
        return;
      }

      let _article = { id, title, author, type, summary, content, from };
      _article.utime = Date.now();

      Article.update({ id, id }, { $set: _article });
    } catch (error) {
      console.log(error);
    }
  }
});
