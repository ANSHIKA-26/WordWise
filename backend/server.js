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
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    let mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Contact Us Form Submission from ${firstName} ${lastName}`,
        text: `You have received a new message from your website contact form.

        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Error sending email", error });
    }
});

// New endpoint for newsletter subscription
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: 'New Newsletter Subscription',
        text: `You have a new subscriber! Email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Subscription successful!" });
    } catch (error) {
        res.status(500).send({ message: "Error sending subscription email", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
