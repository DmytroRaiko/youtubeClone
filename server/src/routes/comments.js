const express = require('express');
const commentController = require('../controllers/comment');
const authMiddleware = require('../middlewars/authMiddleware');
const ACLMiddleware = require('../middlewars/ACL');
const Comment = require('../models/Comment');
const asyncFunction = require('../middlewars/asyncFunction');

const router = express.Router();

router.post("/", authMiddleware, asyncFunction(commentController.addComment));

router.delete(
  "/:id",
  authMiddleware,
  ACLMiddleware(
    ["channelOwner", "own"],
    {
      source: Comment,
      sourceId: "id",
    },
    "You can delete only your own comment or comment under your video!"
  ),
  asyncFunction(commentController.deleteComment)
);

router.get("/:videoId", asyncFunction(commentController.getComments));

module.exports = router;
