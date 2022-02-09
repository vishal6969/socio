const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
    const newConversation = await new Conversation({
        members: [req.body.sender, req.body.receiver],
    })
    console.log(req.body);
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get conversation
router.get("/:id", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.id] }
        });
        res.status(200).json(conversations); 
    } catch (err) {
        res.status(500).json(err);   
    }
})
module.exports = router;