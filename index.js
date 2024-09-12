const express = require('express');
const nodemailer=require('nodemailer');
const cors = require("cors");
const bodyparser = require("body-parser");
//const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } =require('mongodb');


const mclient=new MongoClient('mongodb://localhost:27017/MCOO275');
mclient.connect();
const db=mclient.db("MCOO275");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const jwtsecret="bce50806518f053fcdb6c980fd4af40de1a8c300088d30ecf6818828bde34912a33f48765ca6ae0ec3bce50806518aaaaf8a20ab588a8cfbd64aad39b06bd596ac3f426da4d";

// route to add data to internal list
app.post('/login', async (req, res) => {
  const { email, confCode } = req.body;
    const user = await findUserByEmail(email);
    console.log(user);
    if (user && confCode == user.confCode ) {
      console.log ("matched user");
        const token = jwt.sign({ userId: user._id }, jwtsecret, { expiresIn: '1h' });
        res.json({ name: user.name, streetNumber: user.streetNumber, streetName: user.streetName,
          city: user.city, state: user.state, zip: user.zip, email: user.email, phone: user.phone, 
          chinuch: user.chinuch, confCode: user.confCode, token: token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

async function findUserByEmail(email) {
  let users= db.collection("users");
  user = await users.findOne({ email });
  console.log(user.email + "coming from finding function");
  return user;
}

async function findUserById(id) {
  let users= db.collection("users");
  return await users.findOne({"_id":new ObjectId(id) });
}


// route to retrieve the items from the database
app.get("/snacks", async (req, res) => {
  let collection = await db.collection("products");
  let results = await collection.find({})
    .toArray();
  res.send(results).status(200);
})

// route to save data to database
app.post('/update', async (req, res) => {
  const { name, streetNumber, streetName, city, state, zip, phone, email, chinuch, confCode} = req.body;
  console.log('in update function');
  console.log("name" + email);

  try {
      let users = db.collection("users");
      await users.findOneAndUpdate({confCode: confCode},
         {$set: {name: name, streetNumber: streetNumber, 
          streetName: streetName, city: city,
      state: state, zip: zip, phone: phone, email: email,
       chinuch: chinuch}});
  } catch (error) {
    res.status(500).send(error.message);
  }
});


async function authenticate(req, res, next) {
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  try {
      const decoded = jwt.verify(token, jwtsecret);
      req.user = decoded;
      next();
  } catch (error) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
}

// route to retrieve data from database
app.get('/account', authenticate, async (req, res) => {
 const user=await findUserById(req.user.userId);
 console.log(user);
  res.json(user);
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
          console.log('Email sent: ' + info.response);
        }
      });
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


  