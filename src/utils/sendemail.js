import nodemailer from 'nodemailer';

export async function sendemail(to,subject,html){

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "asmakhlaif03@gmail.com",
      pass: "bdvy ksjv ndxe gvki",
    },
  });

  const info = await transporter.sendMail({
    from: '"node 10 👻" <asmakhlaif03@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text: "Hello world?", // plain text body
    html, // html body
  });
}


  