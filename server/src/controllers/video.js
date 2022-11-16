const handleError = require('../error');
const Video = require('../models/Video');
const User = require('../models/User');

module.exports = {
  addVideo: async (req, res) => {
    const { id: authId } = req.user;

    const newVideo = new Video({
      userId: authId,
      ...req.body
    });

    const savedVideo = await
      newVideo
        .save()
        .catch((err) => { throw handleError(500, err) });

    res.status(200).json(savedVideo);
  },

  changeVideo: async (req, res) => {
    const { id: videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) throw handleError(404, "Video Not found");

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: req.body
      }, { new: true }).catch((err) => { throw handleError(500, err) });


    res.status(200).json(updatedVideo);
  },

  deleteVideo: async (req, res) => {
    const { id: videoId } = req.params;

    await
      Video
        .findByIdAndDelete(videoId)
        .catch((err) => { throw handleError(404, err) });

    res.status(200).json("Video deleted successfully!");
  },

  getVideo: async (req, res) => {
    const { id: videoId } = req.params;

    const video = await
      Video
        .findById(videoId)
        .catch((err) => { throw handleError(404, err) });

    res.status(200).json(video);
  },

  viewVideo: async (req, res) => {
    const { id: videoId } = req.params;

    await Video
      .findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } }
      )
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json("The video has been increased");
  },

  trends: async (req, res) => {
    const videos = await Video.find().sort({ views: -1 })
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json(videos);
  },

  random: async (req, res) => {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }])
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json(videos);
  },

  sub: async (req, res) => {
    const { id: authId } = req.user;

    const user = await User.findById(authId)
    const { subscribedUsers } = user;

    const videoList = await Promise.all(
      subscribedUsers.map( channelId => {
        return Video.find({ userId: channelId });
      })
    )

    res.status(200).json(videoList.flat().sort((a, b) => b.createdAt - a.createdAt));
  },

  getByTags: async (req, res) => {
    const tags = req.query.tags?.split(',');

    const videos = await Video.find(
      { tags: { $in: tags } }
    )
      .limit(20)
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json(videos);
  },

  search: async (req, res) => {
    const { q: query } = req.query;

    const videos = await Video
      .find(
        { title: { $regex: query, $options: 'i' } }
      ).limit(40)
      .catch((err) => { throw handleError(404, err) });

    res.status(200).json(videos);
  },
};
