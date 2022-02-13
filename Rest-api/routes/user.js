const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user details
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account updated successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("cannot update other users");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("cannot delete other users");
  }
});

//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get user friendList
router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.following.map((fid) => {
        return User.findById(fid);
      })
    );

    const friendList = [];

    friends.map((f) => {
      const { _id, username, profilePhoto } = f;
      friendList.push({ _id, username, profilePhoto });
    });

    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const curr = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await curr.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user followed");
      } else {
        res.status(403).json("you already follow");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const curr = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await curr.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot unfollow yourself");
  }
});
module.exports = router;
