const User = require("../models/user");
exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save the user to the database"
      });
    }
    res.json(user);
  });
};

exports.signin = (req,res)=>{

    console.log(req.body);
    res.json(req.body);
}