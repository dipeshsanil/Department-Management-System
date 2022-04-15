require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const departmentRoutes = require("./routes/department");
const announcementRoutes = require("./routes/announcement");


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true
 })
 .then( () => {
     console.log("DB CONNECTED")
 })
 
//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", departmentRoutes);
app.use("/api", announcementRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () =>{
    console.log(`app is running at ${port}`);
});