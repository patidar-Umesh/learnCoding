import nodemailer from 'nodemailer'


const  mailSender = async (email, title, body) => {

    try {
        // create transporter
        const  transporter =  nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
              },
        })

        const info = await transporter.sendMail({
            from: `LearnCoding`,
            to: `${email}`, 
            subject: `${title}`, 
            html: `${body}`, 
          });

        // console.log('mail information', info)
        return info

    } catch (error) {
        console.log('Error from nodemailer', error)
    }

}


export default mailSender