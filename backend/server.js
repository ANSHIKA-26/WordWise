const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
//blog modal
const BlogModal = require("./modal/BlogModal");

//middleware
const formidable = require("express-formidable");

//to process image
const fs = require("fs").promises;

const ConnectDb = require("./Database");

app.use(bodyParser.json());
app.use(cors());
ConnectDb();

app.post("/send-email", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // add you email
      pass: "your-email-password", // add your password
    },
  });

  let mailOptions = {
    from: email,
    to: "your-email@gmail.com", // add email where you want to send the message
    subject: `Contact Us Form Submission from ${firstName} ${lastName}`,
    text: `You have received a new message from your website contact form.

        Name: ${firstName} ${lastName}
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
