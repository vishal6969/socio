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
        console.log(err);
    }
});

module.exports = router;