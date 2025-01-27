const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 


app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if(!name || !email || !message){
    return res.status(400).json({msg:"input data missing"});
  }
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error sending email' });
  }
});
app.get('*',(req,res)=>{
    res.send("hello from server");
})
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});