const express = require("express")
const app = express.Router()
const nodemailer = require('nodemailer')
require("dotenv").config();


app.get('/', (req, res)=> {
  res.send({msg: "Please use POST to send a message"})
})

app.post('/', (req, res) => {

    let {name, email, message} = req.body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },

      

    });
    
    const mailOptions = {
      to: 'diegoallies27@gmail.com',
      from: email,
      
      subject: 'Someone contacted you !!',
      text: ` 
      ${name} has contacted you

      Please contact them on ${email}

      ${name}'s message:
      ${message}

      
      `
    };

    const tomailOptions = {
      from: 'diegoallies27@gmail.com',
      to: email,
     
      
      subject: 'Automated Response',
      text: ` 

      <p>
      
      Hello there ${name} ! :

       This is a automated message confirming
       that you reached out to me with the email
       ${email}, if this was not
       done by you feel free to
       contact me on :

       diegoallies27@gmail.com.
       
      Else expect to hear from me soon. 

      Happy Days ツ 

      </p>

      
      `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send({msg: "email not sent"})
      } else {
        console.log('Email sent: ' + info.response);
        res.send({msg: "Email has been sent successfully"})
      }
    });

    
    transporter.sendMail(tomailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send({msg: "email not sent " + error})
      } else {
        console.log('Email sent: ' + info.response);
        res.send({msg: "Email has been sent successfully"})
      }
    });


});

module.exports = app;