const express = require('express');
const nodemailer=require('nodemailer');
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
import transactionRoutes from "./transactionRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import dotenv from 'dotenv';

mongoose.connect('mongodb://localhost:27017/MCOO275',)
  .then(() => {
    console.log('Connected to MongoDB');
    // Get the database object from the mongoose connection
    db = mongoose.connection.db;
  })
    .catch(err => console.error('Error connecting to MongoDB:', err));

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let dataList = [];

// route to add data to internal list
app.post('/login', (req, res) => {
  const newData = req.body;
  dataList.push(newData);
  console.log(newData);
  res.json({message: 'Data added successfully'});
});

// route to retrieve the items from the database
app.get("/snacks", async (req, res) => {
  let collection = await db.collection("products");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
})

// route to retrieve data from internal list
app.get('/account', (req, res) => {
  res.json(dataList);
});

// route to handle contact form and send email
app.post('/contact', (req, res) => {
  const {name, email, message } = req.body;

  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mcoo275test@gmail.com',
          pass: 'abqv gnqb mfdr jbbu'
        }
      });
    
      const mailOptions = {
        from: 'mcoo275test@gmail.com',
        to: 'mcoo275test@gmail.com',
        subject: `Message from ${name} - ${email}`,
        text: message
      };
    
      // sending the email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          console.log(`Message from ${name} - ${email}`);
          res.status(500).json({message: 'Failed to send email'});
        } else {
          res.json({message: 'Email sent successfully'});
          console.log('Email sent: ' + info.response);
        }
      });
})

// Use routes
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


  