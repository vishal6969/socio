const router = require("express").Router();
const Message = require("../models/Message");

//new message
router.post("/", async (req, res) => {
    
    const newMessage = await new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get messages of a conversation
router.get("/:id", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;