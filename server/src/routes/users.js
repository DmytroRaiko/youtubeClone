const express = require('express');
const userController = require('../controllers/user.js');
const asyncFunction = require('../middlewars/asyncFunction.js');
const authMiddleware = require('../middlewars/authMiddleware.js');
const ACLMiddleware = require('../middlewars/ACL');
const router = express.Router();
const User = require('../models/User');

// update user data
router.put(
  "/:id",
  authMiddleware,
  ACLMiddleware(
    "own",
    {
        sourceId: "id",
    },
    "You can update only your account!",
  ),
  asyncFunction(userController.updateUser)
);

// delete a user
router.delete(
  "/:id",
  authMiddleware,
  ACLMiddleware(
    "own",
    {
      sourceId: "id",
    },
    "You can delete only your account!",
  ),
  asyncFunction(userController.deleteUser)
);

// get a user
router.get("/find/:id", asyncFunction(userController.getUser));

// subscribe a user
router.put("/sub/:id", authMiddleware, asyncFunction(userController.subscribe));

// unsubscribe a user
router.put("/unsub/:id", authMiddleware, asyncFunction(userController.unsubscribe));

// like a video
router.put("/like/:id", authMiddleware, asyncFunction(userController.like));

// dislike a video
router.put("/dislike/:id", authMiddleware, asyncFunction(userController.dislike));

module.exports = router;
