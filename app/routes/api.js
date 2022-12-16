const express = require("express");
const router = express.Router();

const commentActions = require("../controllers/commentControllers");
const userActions = require("../controllers/userControllers");
const authorizationActions = require("../controllers/authorizationController");
const mailingActions = require("../controllers/mailingController");
const articleActions = require("../controllers/articleController");

router.get("/comments", commentActions.getAllComments);
router.get("/comments/:id", commentActions.getComment);
router.post("/comments", commentActions.saveComment);
router.put("/comments/:id", commentActions.updateComment);
router.delete("/comments/:id", commentActions.deleteComment);

router.post("/register", userActions.register);
router.post("/login", userActions.login);
router.delete("/logout", userActions.logout);
router.put("/password-change", userActions.passwordChange);
router.post("/refresh-token", authorizationActions.refreshToken);
router.post("/authorization", authorizationActions.authorization);
router.post("/mailing", mailingActions.mailing);

router.post("/articles", articleActions.addArticles);
router.get("/articles", articleActions.getAllArticles);
router.put(
  "/articles-comments-increment/:id",
  articleActions.incrementCommentAmmount
);
router.put(
  "/articles-comments-decrement/:id",
  articleActions.decrementCommentAmmount
);

module.exports = router;
