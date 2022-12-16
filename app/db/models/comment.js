const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  articleId: Number,
  parentId: String,
  time: String,
  isEdited: Boolean,
  user: String,
  text: {
    type: String,
    required: true,
  },
  className: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
