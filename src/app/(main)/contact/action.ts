'use server'

export async function sendMail(data: any): Promise<{ status: number, message: string }> {
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //465 // 587
        secure: true,
        auth: {
            user: process.env.NEXT_EMAIL_USER,
            pass: process.env.NEXT_EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3'
        }

    });

    try {
        const info = await transporter.sendMail({
            from: data.email,
            to: process.env.NEXT_EMAIL_USER,
            subject: data.subject,
            text: data.text
        });

        console.log("Message sent: %s", info.messageId);
        return { status: 200, message: 'success' }
    } catch (error) {
        console.log(error);
        return { status: 200, message: 'error' }

    }
}