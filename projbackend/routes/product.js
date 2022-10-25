const express = require("express");
const router  = express.Router();


const {getProductById,createProduct} = require("../controllers/product");
const {
    isSignedIn,
    isAdmin,
    isAuthenticated,
  } = require("../controllers/authentication");

const { getUserById } = require("../controllers/user");




//params
router.param("userId", getUserById);
router.param("productId",getProductById);

//all actual routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);


module.exports = router;