const express = require('express');
const app = express();
const PORT = 8000;
const postRouter = require('./src/routers/post.router')
const authRouter = require('./src/routers/auth.router')
const mongoConnect = require('./config/mongo.config');
const cors = require('cors')
mongoConnect()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', postRouter)
app.use('/api/auth', authRouter)


// Exemple of sending mail
const nodemailer = require("nodemailer");
app.get('/api/send-mail', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'localhost',
    port: 25,
    secure: false,
  });

  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'Welcome to my website'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send("Mail sent")
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})