const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");

const { User, EmailAuth, Channel, RefreshToken } = require("../models");

module.exports = {
  /**
   * 유저 데이터 생성
   * @param {String} email 이메일
   * @param {String} password 패스워드
   * @param {String} nickname 닉네임
   * @returns 유저 정보
   */
  async createUser(email, password, nickname) {
    // 중복된 이메일 확인
    const exUserEmail = await User.findOne({ email });
    if (exUserEmail) {
      throw ApiError.badRequest("중복된 이메일이 존재합니다.");
    }

    // 중복된 닉네임 확인
    const exUserNickname = await User.findOne({ nickname });
    if (exUserNickname) {
      throw ApiError.badRequest("중복된 닉네임이 존재합니다.");
    }

    // 이메일 인증 여부 확인
    const emailAuth = await EmailAuth.findOne({ email });
    if (emailAuth) {
      throw ApiError.badRequest("이메일 인증이 완료되지 않았습니다.");
    }

    // 비밀번호 암호화
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: encryptedPassword,
      nickname,
    });

    return user;
  },

  /**
   * 로그인 시 일치 불일치 체크
   *
   * @param {String} email 이메일
   * @param {String} password 패스워드
   * @returns 유저 및 채널 정보
   */
  async checkUser(email, password) {
    // 가입된 이메일인지 확인
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("가입되지 않은 이메일입니다.");
    }

    // 비밀번호가 일치하는지 확인
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw ApiError.badRequest("비밀번호가 일치하지 않습니다.");
    }

    // 채널 정보 포함시켜주기
    const channels = await Promise.all(
      user.channels.map(async (channelId) => {
        const channel = await Channel.findById(channelId);
        return (({ _id, title, img }) => ({ _id, title, img }))(channel);
      })
    );

    return {
      userId: user._id,
      email: user.email,
      nickname: user.nickname,
      channels,
    };
  },

  /**
   * JWT access 토큰 생성
   *
   * @param {String} userId 유저 아이디
   * @returns access 토큰
   */
  async generateAccessToken(userId) {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET_KEY || "q23gh3214fg",
      {
        expiresIn: "1h",
        issuer: "HHS",
      }
    );

    return token;
  },

  /**
   * JWT refresh 토큰 생성
   */
  async generateRefreshToken(userId) {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET_KEY || "q23gh3214fg",
      {
        expiresIn: "30d",
        issuer: "HHS",
      }
    );

    return token;
  },

  /**
   * 리프레시 토큰 DB에 저장
   *
   * @param {String} userId
   * @param {String} refreshToken
   */
  async insertRefreshToken(userId, refreshToken) {
    const exToken = await RefreshToken.findOne({ userId });

    if (exToken) {
      await RefreshToken.findOneAndUpdate({ userId }, { refreshToken });
    } else {
      await RefreshToken.create({ userId, refreshToken });
    }
  },

  async verifyAccessToken(token) {
    const secret = process.env.JWT_SECRET_KEY;
    try {
      console.log(token, secret);
      const decodedToken = jwt.verify(token, secret);

      return decodedToken.userId;
    } catch (err) {
      return false;
    }
  },

  async verifyRefreshToken(token) {
    const exToken = await RefreshToken.findOne({ refreshToken: token });

    if (!exToken) {
      throw ApiError.forbidden("회원의 리프레시 토큰이 아닙니다.");
    }

    const secret = process.env.JWT_SECRET_KEY;

    try {
      console.log(token, secret);
      const decodedToken = jwt.verify(token, secret);
      return decodedToken.userId;
    } catch (err) {
      return false;
    }
  },

  async refresh(access, refresh) {
    console.log(access, refresh)
    if (!access) {
      if (refresh) {
        const newAccessToken = this.generateAccessToken(refresh);
        return newAccessToken;
      } else {
        throw new Error("accessToken과 refreshToken 모두 만료되었습니다. 다시 로그인하세요.");
      }
    }
  },

  async lockUserInfo(userId) {
    await User.findOneAndUpdate({ _id: userId }, { 
      withdrawal: true, 
      channels: [],
      waitResList: [],
      waitReqList: []
    });
  },
};
