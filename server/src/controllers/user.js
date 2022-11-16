const handleError = require('../error');
const User = require('../models/User');
const Video = require('../models/Video');

module.exports = {
  updateUser: async (req, res) => {
    const { id: userId } = req.user;

    const { password, ...body } = req.body;

    const updatedUser = await
      User
        .findByIdAndUpdate(
          userId,
          { $set: body, },
          { new: true }
        )
        .catch((err) => { throw handleError(400, err) });

    res.status(200).json(updatedUser);
  },

  deleteUser: async (req, res) => {
      const { id: userId } = req.user;

      await User
        .findByIdAndDelete(userId)
        .catch((err) => { throw handleError(404, "User not found") });

      res.status(200).json("User has been deleted");
  },

  getUser: async (req, res) => {
    const { id: userId } = req.params;

    const user = await
      User
        .findById(userId)
        .catch((err) => { throw handleError(400, err) });

    res.status(200).json(user);
  },

  subscribe: async (req, res) => {
    const { id: authId } = req.user;
    const { id: channelId } = req.params

    await User
      .findByIdAndUpdate(
        authId,
        { $push: { subscribedUsers: channelId } }
      )
      .catch((err) => { throw handleError(400, err) });

    await User.findByIdAndUpdate(
      channelId,
      { $inc: { subscribers: 1, } }
    ).catch((err) => { throw handleError(400, err) });;

    res.status(200).json("Subscription successfully.");
  },

  unsubscribe: async (req, res) => {
    const { id: authId } = req.user;
    const { id: channelId } = req.params;

    await User.findByIdAndUpdate(authId,
      {
        $pull: {
          subscribedUsers: channelId,
        }
      }).catch((err) => { throw handleError(400, err) });

    await User.findByIdAndUpdate(
      channelId,
      {
        $inc: { subscribers: -1, },
      }
    ).catch((err) => { throw handleError(400, err) });

    res.status(200).json("Unsubscription successfully.");
  },

  like: async (req, res) => {
    const { id: authId } = req.user;
    const { id: videoId } = req.params;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: authId },
      $pull: { dislike: authId },
    }).catch((err) => { throw handleError(400, err) });

    res.status(200).json("The video has been liked");
  },

  dislike: async (req, res) => {
    const { id: authId } = req.user;
    const { id: videoId } = req.params;

    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: authId },
      $pull: { likes: authId },
    }).catch((err) => { throw handleError(400, err) });

    res.status(200).json("The video has been disliked");
  },
};
