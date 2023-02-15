const app = require("express");
const router = app.Router();

router.use("/org", require("./org"));
// router.use("/login", require("./login"));


module.exports = router;
