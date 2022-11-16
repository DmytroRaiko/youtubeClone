const express = require('express');
const authMiddleware = require('../middlewars/authMiddleware');
const ACLMiddleware = require('../middlewars/ACL');
const Video = require('../models/Video');
const videoController = require('../controllers/video');
const asyncFunction = require('../middlewars/asyncFunction');
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  asyncFunction(videoController.addVideo)
);

router.put(
  "/:id",
  authMiddleware,
  ACLMiddleware(
    "own",
    {
      source: Video,
      sourceId: "id",
    },
    "You can update only your video!",
  ),
  asyncFunction(videoController.changeVideo)
);

router.delete(
  "/:id",
  authMiddleware,
  ACLMiddleware(
    "own",
    {
      source: Video,
      sourceId: "id",
    },
    "You can delete only your video!",
  ),
  asyncFunction(videoController.deleteVideo)
);

router.get(
  "/find/:id",
  authMiddleware,
  asyncFunction(videoController.getVideo)
);

router.put(
  "/view/:id",
  authMiddleware,
  asyncFunction(videoController.viewVideo)
);

router.get(
  "/trend",
  asyncFunction(videoController.trends)
);

router.get(
  "/random",
  asyncFunction(videoController.random)
);

router.get(
  "/sub",
  authMiddleware,
  asyncFunction(videoController.sub)
);

router.get(
  "/tags",
  asyncFunction(videoController.getByTags)
);

router.get(
  "/search",
  asyncFunction(videoController.search)
);

module.exports = router;
