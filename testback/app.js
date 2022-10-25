const express = require('express');
const  mongoose  = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');


//myroutes

const authRoutes = require("./routes/auth");




// DB connection
mongoose.connect('mongodb://localhost:27017/mobiles',{
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   // useCreateIndex:true
}).then(()=>{
   console.log("DB connection securely connected")
}).catch((e)=>{
   console.log(e);
   console.log("Db is not connected");
})



app.use(bodyParser.json())

app.use("/api", authRoutes);
const port = 3000;

app.get('/',(req,res)=>{
   return res.send("You are in Home page");
});

app.post('/about',(req,res)=>{
   return res.json({
      About  : "hey you are in about page so go ahead"
   });
});

const admin = (req,res)=>{
   res.send("Hey you are in admin dashboard");
}
const isadmin = (req,res,next)=>{
  console.log("The admin is runnign");
   next();
}
const isloggedin = (req,res,next)=>{
  console.log("The admin is loggedin");
   next();
}

app.get("/admin",isloggedin,isadmin,admin);

app.listen(port,()=>{
    console.log("Server is live...")
});


