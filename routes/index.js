const app = require("express");
const router = app.Router();

router.use("/org", require("./org"));


module.exports = router;
