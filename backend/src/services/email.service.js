const ApiError = require("../utils/ApiError");
const { sendEmail } = require("../utils/EmailDelivery")

// 모델 불러오기
const { EmailAuth } = require("../models");

module.exports = {
  /**
   * 이메일 인증 번호 생성
   * 
   * @param {String} email 이메일
   * 
   */
  async createAuthCode(email) {
    // 인증 번호 생성
    const authCode = Math.random().toString(36).slice(-8);    
    try {
      const isExist = await EmailAuth.findOne({ email });
      
      // 기존 인증 번호 존재 시 갱신
      if (isExist) {
        await EmailAuth.findOneAndUpdate({ email }, { authCode });
      } else {
        await EmailAuth.create({ email, authCode });
      }

      // 이메일 전송
      const from = '"8LOGGING" <wnsdml0120@gmail.com>';
      const to = email;
      const subject = "8LOGGING 회원가입 이메일 인증 번호";
      const text = `인증번호는 ${authCode} 입니다.`;
      const html = `인증번호는 <b>${authCode}</b> 입니다.`;
      await sendEmail(from, to, subject, text, html);

    } catch (error) {
      throw ApiError.badRequest("인증 번호 생성 및 전송 실패하였습니다.");
    }
  },

  /**
   * 이메일 인증 번호 확인
   * 
   * @param {String} email 이메일
   * @param {String} authCode 인증 코드
   */
  async checkAuthCode(email, authCode) {
    try {
      const emailAuth = await EmailAuth.findOne({ email });
      if (emailAuth.authCode == authCode) {
        await EmailAuth.findOneAndDelete({ email });
        return true
      } else {
        return false
      }
    } catch (error) {
      throw ApiError.badRequest("이메일 인증 번호 확인 실패했습니다.")
    }
  }
};
