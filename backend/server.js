const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
const app = express();
const { login } = require("./signUp/signup"); // Imported login function
const PORT = process.env.PORT || 3000;

// Blog modal
const BlogModal = require("./modal/BlogModal");

// Middleware
const formidable = require("express-formidable");
const fs = require("fs").promises;
const cookieParser = require("cookie-parser");

const ConnectDb = require("./Database");
const { subscribeToNewsletter } = require("./controllers/NewsLetterController");
const { saveContactForm } = require("./controllers/ContactController");

// Middleware setup
app.use(bodyParser.json());
const corsOptions = {
  origin: [
    "http://localhost:5501",
    "http://127.0.0.1:5501",
    "http://127.0.0.1:5500",
  ],
  methods: ["GET", "POST", "HEAD", "OPTIONS"], // Allow POST method
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectDb();

// Create a rate limiter for the login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later after 5 minutes.",
});

// Email sending logic
app.post("/send-email", async (req, res) => {
  const { Name, email, phone, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Add your email
      pass: process.env.EMAIL_PASS, // Add your password
    },
  });

  let mailOptions = {
    from: email,
    to: "arora.anshika.26@gmail.com", // Add email where you want to send the message
    subject: `Contact Us Form Submission from ${Name}`,
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
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

app.post("/newsletter", subscribeToNewsletter);
app.post("/submit-contact-form", saveContactForm);

// Create a blog API
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

    // Process the image if it exists
    if (req.files && req.files.image) {
      blog.image.data = await fs.readFile(req.files.image.path);
      blog.image.contentType = req.files.image.type;
      await fs.unlink(req.files.image.path); // Delete the file after saving
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

// Add login route with rate limiter
app.post("/login", loginLimiter, login);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
