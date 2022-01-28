const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {

    try {
    //create hash of password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
    //create user
        const user = new User({
            username: req.body.username,
            
            email: req.body.email,
            password: hash
        })
    //save user and respond
        res.status(200).json(await user.save());
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(400).json("wrong password");

        res.status(200).json("ok");
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;