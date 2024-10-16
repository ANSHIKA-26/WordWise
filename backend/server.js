const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit
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
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

ConnectDb();

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later after 5 minutes.",
});

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

app.post("/newsletter", subscribeToNewsletter);
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

// Add login route with rate limiter
app.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Send back the token and user information
    return res
      .status(200)
      .send({ message: "Login successful!", token, userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
