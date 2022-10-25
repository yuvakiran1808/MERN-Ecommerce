const Product = require("../models/product");
const formidable = require("formidable");
var _ = require("lodash");
var fs = require('fs');
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product is not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem in the file with the images",
      });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }

    
    let product = new Product(fields);

    // console.log(product);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);

      product.photo.contentType = file.photo.type;
    }
    // console.log(product); 
    //save to the db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          err: "Saving tshirts in the DB failed",
        });
      }
      res.json(product);
    });
  });
};
