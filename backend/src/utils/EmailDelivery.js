const ApiError = require("./ApiError");
const nodemailer = require("nodemailer");

module.exports = {
  /**
   * 이메일 전송
   * 
   * @param {String} from 
   * @param {String} to 
   * @param {String} subject 
   * @param {String} text 
   * @param {String} html 
   * @returns 
   */
  async sendEmail(from, to, subject, text, html) {
    /* < Input 예시 >
        from: '"Fred Foo 👻" <wnsdml0120@gmail.com>'
        to: "wnsdml0120@gmail.com"
        subject: "Hello ✔"
        text: "Hello world?"
        html: "<b>Hello world?</b>"
    */
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAILS_EMAIL, // Google ID
          pass: process.env.MAILS_PWD, // Google App Password
        },
      });
      return transporter.sendMail({ from, to, subject, text, html });
    } catch (error) {
      throw ApiError.badRequest("이메일 전송 요청 실패하였습니다.")
    }
  }
}