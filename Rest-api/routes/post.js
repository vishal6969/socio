const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async (req, res) => {
    
    const newUser = await new Post(req.body);
    try {
        const savedPost = await newUser.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update post
router.put("/:id", async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            await post.updateOne({ $set:req.body });
            res.status(200).json("updated Post");
        } else {
            res.status(403).json("you cannot update someone's post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//delete post
router.post("/:id", async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            await post.deleteOne();
            res.status(200).json("post deleted");
        } else {
            res.status(403).json("you cannot delete someone's post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//like post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("liked post");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("unliked post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get timeline
router.get("/timeline/:userId", async (req, res) => {
    try {
        const curUser = await User.findById(req.params.userId);
        const ownPosts = await Post.find({ userId: curUser._id });
        const friendPosts = await Promise.all(
            curUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            }));
        res.status(200).json(ownPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
})

//get user's own posts
router.get("/profile/:username", async (req, res) => {
    try {
        const curUser = await User.findOne({ username:req.params.username });
        const ownPosts = await Post.find({ userId: curUser._id });
        res.status(200).json(ownPosts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;