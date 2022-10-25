const { check,body, validationResult } = require("express-validator");
var express = require("express");
var router = express.Router();

const { signout, signup,signin,isSignedIn } = require("../controllers/authentication");

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is not valid").isEmail(),
    check("password", "password is not valid").isLength({ min: 5 }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 }),
  ],
  signin
);
router.get("/signout", signout);

router.get("/test",isSignedIn,(req,res)=>{
     res.json(req.auth);
});


module.exports = router;
