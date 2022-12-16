const Comment = require("../db/models/comment");

class CommentController {
  async saveComment(req, res) {
    const articleId = req.body.articleId;
    const id = req.body.id;
    const parentId = req.body.parentId;
    const time = req.body.time;
    const isEdited = req.body.isEdited;
    const user = req.body.user;
    const text = req.body.text;
    const className = req.body.className;
    let newComment;
    try {
      newComment = new Comment({
        articleId,
        id,
        parentId,
        time,
        isEdited,
        user,
        text,
        className,
      });
      await newComment.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(newComment);
  }

  async getAllComments(req, res) {
    const doc = await Comment.find({});
    res.status(200).json(doc);
  }

  async getComment(req, res) {
    const id = req.params.id;
    const comment = await Comment.findOne({ _id: id });
    res.status(200).json(comment);
  }

  async updateComment(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const time = req.body.time;
    const isEdited = req.body.isEdited;
    const user = req.body.user;

    const comment = await Comment.findOne({ _id: id });
    comment.text = text;
    comment.time = time;
    comment.isEdited = isEdited;
    comment.user = user;
    await comment.save();

    res.status(201).json(comment);
  }

  async deleteComment(req, res) {
    const id = req.params.id;
    await Comment.deleteOne({ _id: id });
    res.sendStatus(204);
  }
}

module.exports = new CommentController();
