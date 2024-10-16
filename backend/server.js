const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
//blog modal
const BlogModal = require("./modal/BlogModal");

//middleware
const formidable = require("express-formidable");

//to process image
const fs = require("fs").promises;

const ConnectDb = require("./Database");
const { subscribeToNewsletter } = require("./controllers/NewsLetterController");
const { saveContactForm } = require("./controllers/ContactController");
const User = require("./model/User");
const { sendOtp } = require("./config/nodemailer");

app.use(bodyParser.json());
const corsOptions = {
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'], // Allow POST method
  credentials: true
};

app.use(cors(corsOptions));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectDb();

app.post("/send-email", async (req, res) => {
  const { Name, email, phone, message } = req.body;
  //console.log("Received email:",  Name, email, phone, message); 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // add you email
      pass: process.env.EMAIL_PASS, // add your password
    },
  });

  let mailOptions = {
    from: email,
    to: "arora.anshika.26@gmail.com", // add email where you want to send the message
    subject: `Contact Us Form Submission from ${Name} `,
    text: `You have received a new message from your website contact form.

        Name: ${Name} 
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Error sending email", error });
  }
});

// New endpoint for newsletter subscription
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  let mailOptions = {
    from: "your-email@gmail.com",
    to: "your-email@gmail.com",
    subject: "New Newsletter Subscription",
    text: `You have a new subscriber! Email: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Subscription successful!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error sending subscription email", error });
  }
});

app.post('/newsletter',subscribeToNewsletter);
app.post("/submit-contact-form", saveContactForm);

//create a blog Api

app.post("/post_blog", formidable(), async (req, resp) => {
  try {
    const { heading, topic, content, writerName } = req.fields;

    if (!heading || !topic || !content || !writerName) {
      return resp.status(400).send({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const blogdata = {
      heading,
      topic,
      content,
      writerName,
    };

    const blog = await new BlogModal(blogdata).save();

    // process the image if it exists
    if (req.files && req.files.image) {
      blog.image.data = await fs.readFile(req.files.image.path);
      blog.image.contentType = req.files.image.type;
      await fs.unlink(req.files.image.path); // delete the file after saving
      await blog.save();
    }

    return resp.status(201).send({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  console.log("hii");
  
  const user = await User.findOne({ email });

  if(!user){
    return res.status(404).json({
      success: false,
      data: "User not found"
    })
  }

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = verifyCode;
  await user.save();

  sendOtp(email, verifyCode)

  try {
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error!!" });
  }
})

app.post("/verify_otp", async(req, res)=>{
  try {
    const { id, otp } = req.body;

    const existingCustomer = await User.findOne({ _id: id });

    if (!existingCustomer) {
        return res.status(404).json({ error: "User not found" });
    }

    if(existingCustomer.otp !== otp){
        return res.status(400).json({ error: "Invalid verification code", success: false });
    }

    existingCustomer.otp = ""
    await existingCustomer.save();

    return res.status(200).json({ message: "verified", success: true})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false})
  }

})

app.post("/reset_password", async(req, res)=>{
  try {
    const {id, password} = req.body
  
    const customer = await User.findOne({ _id: id });
    if (!customer) {
      return res.status(401).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    customer.password = hashedPassword;
    await customer.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(501).json({ error: "Internal server error" });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
