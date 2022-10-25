const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//my Routes

const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');



//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("App is really crashed")
});


//middle wares  
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);

const port  = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send(`your app is on fire at the port ${port}`);

})
app.listen(port,()=>{
console.log(`app is running at ${port}`);
})
