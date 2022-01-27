const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("userpage");
});

module.exports = router;