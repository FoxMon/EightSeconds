const { authService, emailService, userService, followService, channelService } = require("../services");

module.exports = {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await authService.checkUser(email, password);

      await userService.findLockedUser(email);

      const accessToken = await authService.generateAccessToken(user.userId);
      const refreshToken = await authService.generateRefreshToken(user.userId);
      await authService.insertRefreshToken(user.userId, refreshToken);

      const userData = {
        accessToken,
        refreshToken,
        ...user,
      };

      res.status(201).json({
        success: true,
        status: 201,
        message: "login success",
        datas: userData,
      });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      const user = await authService.createUser(email, password, nickname);

      res.status(201).json({
        success: true,
        status: 201,
        message: "register success",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async withdrawUser(req, res, next) {
    const userId = req.userId;

    try {
      await followService.deleteAllFollow(userId);
      const user = await userService.findUserAllData(userId);
      console.log(user.channels)
      await Promise.all(user.channels.map( async(channel) => {
        if (channel.position==0) {
          await channelService.deleteChannel(userId, String(channel._id));
          console.log("delete", channel._id);
        } else if (channel.position==1) {
          await channelService.quitChannel(userId, String(channel._id));
          console.log("quit", channel._id);
        } else {
          await channelService.cancelEnter(userId, String(channel._id));
          console.log("cancel enter", channel._id);
        }
      } ));
      await authService.lockUserInfo(userId);
      
      res.status(201).json({
        success: true,
        status: 201,
        message: "success locking user info",
      });
    } catch (err) {
      next(err);
    }
  },

  async sendEmailAuthCode(req, res, next) {
    const { email } = req.body;
    try {
      await emailService.createAuthCode(email);

      res.status(201).json({
        success: true,
        status: 201,
        message: "email authCode send success",
      });
    } catch (err) {
      next(err);
    }
  },

  async checkEmailAuthCode(req, res, next) {
    const { email, authCode } = req.body;
    try {
      const isCorrect = await emailService.checkAuthCode(email, authCode);
      var message = "";
      if (isCorrect) {
        message = "email authCode correct";
      } else {
        message = "email authCode incorrect";
      }

      res.status(201).json({
        success: isCorrect,
        status: 201,
        message,
      });
    } catch (err) {
      next(err);
    }
  },

  async reissueToken(req, res, next) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers["refresh-token"];

    try {
      const validAccessToken = await authService.verifyAccessToken(accessToken);
      const validRefreshToken = await authService.verifyRefreshToken(
        refreshToken
      );

      const newAccessToken = await authService.refresh(
        validAccessToken,
        validRefreshToken
      );
      res.status(201).json({
        success: true,
        status: 201,
        message: "reissue new refresh token",
        datas: {
          newAccessToken,
        },
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        status: 401,
        mesasge: err.message,
        neededBothToken: true,
      }); 
    }
  },
};
