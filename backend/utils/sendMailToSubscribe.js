import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendMailToSubscriber = (userdata) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS_KEY,
        },
    });

    async function main() {
        await transporter.sendMail({
            from: {
                name: "WordWise",
                address: process.env.EMAIL_ID,
            },
            to: userdata.email,
            subject: "Welcome to WordWise! 📖 Your Vocabulary Journey Begins Here",
            text: "Thank you for subscribing to WordWise!",
            html: `
                <div style="background-color: #f9f9fb; padding: 40px; font-family: Arial, sans-serif; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="font-size: 28px; color: #008080; text-align: center; margin-bottom: 20px;">Welcome to WordWise, ${userdata.name}!</h2>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 20px;">
                            We’re thrilled to have you join the WordWise community—a place where words come alive, and every blog post is crafted to expand your vocabulary and deepen your understanding of language and topics you care about.
                        </p>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 20px;">
                            At WordWise, we believe in the power of words to enlighten and inspire. Our responsive, user-friendly platform is designed with you in mind, ensuring that each visit feels as seamless as it is engaging. Whether you’re here to explore our latest blogs, delve into specific topics, or simply enjoy a well-crafted read, WordWise has something for everyone.
                        </p>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 20px;">
                            As part of our community, you’ll be among the first to receive fresh content that’s both insightful and enriching. From curated articles that explore a variety of subjects to interactive features that enhance your reading experience, WordWise is more than just a blog—it’s a journey into the world of words.
                        </p>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 20px;">
                            We encourage you to dive into our sections, such as Home, Leading Blogs, About, and Contact Us. Each one is thoughtfully designed to guide you through your reading adventure. And if you ever wish to share feedback or connect with us, our Contact Us page is always open.
                        </p>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; margin-bottom: 20px;">
                            Thank you for subscribing to WordWise! We’re excited to share our latest blogs and updates with you. Here’s to many engaging reads and enriching experiences ahead!
                        </p>
                        <p style="font-size: 16px; line-height: 1.7; color: #555; text-align: center; margin-top: 30px;">
                            With warm regards,<br/>
                            <strong>The WordWise Team</strong>
                        </p>
                    </div>
                </div>
            `,
        });
    }

    main().catch(console.error);
};

export { sendMailToSubscriber };
