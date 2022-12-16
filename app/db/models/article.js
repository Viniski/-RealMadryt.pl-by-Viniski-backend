const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  articleId: Number,
  title: String,
  subtitle: String,
  image: String, 
  text: String,
  link: String,
  commentsAmount: Number,
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
