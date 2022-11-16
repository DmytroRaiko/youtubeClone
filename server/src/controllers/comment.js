const handleError = require('../error');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Video = require('../models/Video');

module.exports = {
  addComment: async (req, res) => {
    const { id: userId } = req.user;

    const newComment = new Comment({ ...req.body, userId })

    const savedComment = await newComment.save().catch((err) => { throw handleError(500, err) });

    res.status(200).json(savedComment);
  },

  deleteComment: async (req, res) => {
    const { id: commentId } = req.params;

    await Comment
      .findByIdAndDelete(commentId)
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json("Comment has been deleted successfully!");
  },

  getComments: async (req, res) => {
    const { videoId } = req.params;

    const comments = await Comment
      .find({ videoId })
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json(comments);
  },
};
