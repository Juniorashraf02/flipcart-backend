const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;





const { databaseConnect } = require("../utils/DbConnect");

// routes
const userRouter = require("../routes/userRoute/userAuth");




// middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1', userRouter)



// database
databaseConnect();

app.get("/", (req, res) => {
  return res.send("Backend server is running...!!!");
});

app.all("*", (req, res)=>{
  return res.send("No route found!")
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`.bgGreen);
});

