const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); 

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',  // Use your email service provider
        auth: {
            user: 'your-email@gmail.com',  // Your email
            pass: 'your-email-password'   // Your email password or app password
        }
    });

    let mailOptions = {
        from: email,  // Sender address (user's email)
        to: 'your-email@gmail.com',  // Receiver address (your email)
        subject: `Contact Us Form Submission from ${firstName} ${lastName}`,
        text: `You have received a new message from your website contact form.

        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
        `
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Error sending email", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
