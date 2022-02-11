const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
  const newConversation = await new Conversation({
    members: [req.body.sender, req.body.receiver],
  });
  console.log(req.body);
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all conversations of a user
router.get("/:id", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a single conversation
router.get("/find/:id1/:id2", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.id1, req.params.id2] },
    });
      res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
