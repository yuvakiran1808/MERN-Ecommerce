var express = require("express");
var router = express.Router();
// const bodyParser = require('body-parser');

const {signup,signin} = require("../controllers/auth");
// var jsonParser = bodyParser.json()

router.post("/signup", signup);
router.post("/signin",signin);


module.exports = router;