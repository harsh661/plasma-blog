require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;

app.use(cors({credentials:true,origin:['http://localhost:5173', 'https://plasmablog-mern.netlify.app']}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_STRING);

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  try {
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) console.log("Something went wrong");
        res.cookie('token', token, { sameSite: 'none', secure: true }).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(401).json('wrong credentials');
    }
  } catch (error) {
    res.status(404).json('User not found')
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content, file} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: file,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/post', uploadMiddleware.single('file'), async (req,res) => {

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content, file} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc?.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: file
    });

    res.json(postDoc);
  });

});

app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.listen(4000);
//