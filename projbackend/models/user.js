const { v4: uuidv4 } = require('uuid');
const mongoose  = require("mongoose");
// const { Schema } = mongoose; we can also import mongoose schema like this
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required : true,
    maxlength:32,
    trim:true,
  },
  Lastname:{
    type: String,
    maxlength:32,
    trim:true,
  },
  email : {
    type : String,
    trim : true,
    required : true,
    unique : true, 
  },
  //TODO:
  encry_password: {
    type : String,
    // trim : true,
    // unique : true,
    required : true
  },
  userinfo:{
     type : String,
     trim : true,
  },
  salt : String,
  role:{
    type : String,
    default : 0,
  },
  purchases:{
    type : Array,
    default : []
  }
},{timestamps : true});

userSchema.virtual("password")
        .set(function(password){
              this._password = password;
              this.salt = uuidv4();
              this.encry_password = this.securePassword(password);
        })
        .get(function(){
          return this._password;
        })



userSchema.methods = {

  authenticate : function(plainpassword){
    return this.securePassword(plainpassword)===this.encry_password;
  },
  securePassword:  function(plainpassword){
             if(!plainpassword) return "";
             try {
              return  crypto.createHmac('sha256', this.salt)
              .update(plainpassword)
              .digest('hex');
             } catch (err) {
                 return ""; 
             }
  }
}


module.exports = mongoose.model("User",userSchema);