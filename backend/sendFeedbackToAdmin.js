import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sendMailToAdmin = (userdata) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ID, // by this email id you will get mail 
            pass: process.env.PASS_KEY, // passkey 
        },
    });

    async function main() {
        await transporter.sendMail({
            from: {
                name: `Wordwise - ${new Date().toLocaleString()}`,
                address: process.env.EMAIL_ID,
            }, // sender address
            to: process.env.ADMIN_EMAIL_ID, // list of receivers
            subject: "New User Feedback from Wordwise ✔", // Subject line
            text: "Wordwise User Feedback", // plain text body
            html: `<div style="background: black; color: white; height: 100vh; padding: 20px;">
                        <div class="heading" style="font-size: 2rem; text-align: center; margin-bottom: 20px;">
                            Wordwise User Feedback
                        </div>
                        <table style="width: 50%; border-collapse: collapse; margin: 0 auto;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #0076b4;">
                                        Field
                                    </th>
                                    <th style="border: 1px solid white; padding: 10px; text-align:center; background-color: #0076b4;">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Submitted At</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${new Date(userdata.submittedAt).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Overall Experience</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.overallExperience}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Recommendation</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.recommendation}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Additional Comments</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.additionalComments}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Improvement</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.improvement}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Most Helpful Feature</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.mostHelpfulFeature}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">New Features</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.newFeatures}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">Features Used</td>
                                    <td style="border: 1px solid white; padding: 10px; text-align:center;">${userdata.featuresUsed.join(', ')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>`, // html body
        });
    }

    main().catch(console.error);
}

export { sendMailToAdmin };
