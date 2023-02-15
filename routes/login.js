
const app = require('express')
const router = app.Router();



// authenticate the user and generate a token

router.post('/login', require('../auth/token'));


module.exports = router;