const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;





const { databaseConnect } = require("../utils/DbConnect");

// routes

// middleware
app.use(cors());
app.use(express.json());

// database
databaseConnect();

app.get("/", (req, res) => {
  return res.send("Backend server is running...!!!");
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
