const sign = require("../lib/sign");
const dbAdap = require("../lib/dbAdap");

const createAction = (module.exports = {
  // 文章录入
  createArticle(req, res, next) {
    let { title, author, type, summary, content, from } = req.body;

    if (!title || !content) {
      // 返回参数错误
      return;
    }
    
    try {
      const Article = await dbAdap.getCollection("article");
      let article = { title, author, type, summary, content, from }
      article.id = dbAdap.newIdString();
      article.ctime = article.utime = Date.now();

      Article.insertOne(article);
    } catch (error) {
      console.log(error);
    }
    
  }
});
