const Article = require("../db/models/article");

class articleController {
  async addArticles(req, res) {
    const articleId = req.body.articleId;
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const image = req.body.image;
    const text = req.body.text;
    const link = req.body.link;
    const commentsAmount = req.body.commentsAmount;
    let newArticle;
    try {
      newArticle = new Article({
        articleId,
        title,
        subtitle,
        image,
        text,
        link,
        commentsAmount,
      });
      await newArticle.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(newArticle);
  }

  async getAllArticles(req, res) {
    try {
      const doc = await Article.find({});
      res.status(200).json(doc);
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  }

  async incrementCommentAmmount(req, res) {
    try {
      const articleId = req.params.id;
      const article = await Article.findOne({ articleId });
      article.commentsAmount = article.commentsAmount + 1;
      await article.save();
      res.sendStatus(200);
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  }

  async decrementCommentAmmount(req, res) {
    try {
      const articleId = req.params.id;
      const article = await Article.findOne({ articleId }); 
      article.commentsAmount = article.commentsAmount - 1;
      await article.save();
      res.sendStatus(200);
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  }
}

module.exports = new articleController();
