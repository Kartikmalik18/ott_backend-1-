const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');


const app = express();
const corsOptions = {
    origin: 'http://localhost:5174',  // Frontend URL
    methods: ['GET', 'POST','DELETE','PUT','HEAD'],        // Allowed methods
    credentials: true,                // Allow cookies or authentication info
  };
  app.use(cors(corsOptions));  // Enable CORS with the specified options



app.use(express.json({limit: "10mb"}));

app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 5000;


connectDB().then(()=> {
    app.listen(PORT, ()=>{
        console.log("Server is running")
    })
})

