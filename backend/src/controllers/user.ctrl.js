const ApiError = require("../utils/ApiError");
const { userService } = require("../services");

module.exports = {
  // 이메일 중복 체크
  async getEmailDuplValidationResult(req, res, next) {
    const { email } = req.params;
    try {
      await userService.checkEmailDuplication(email);

      res.status(200).json({
        success: true,
        status: 200,
        message: "available email",
      });
    } catch (err) {
      next(err);
    }
  },

  // 닉네임 중복 체크
  async getNicknameDuplValidationResult(req, res, next) {
    const userId = req.userId;
    const { nickname } = req.params;
    try {
      await userService.checkNicknameDuplication(userId, nickname);

      res.status(200).json({
        success: true,
        status: 200,
        message: "available nickname",
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저 닉네임 수정
  async modifyNickname(req, res, next) {
    const userId = req.userId;
    const { newNickname } = req.body;
    try {
      // 중복 체크
      await userService.checkNicknameDuplication(userId, newNickname);

      const user = await userService.updateUserNickname(userId, newNickname);

      res.status(201).json({
        success: true,
        status: 201,
        message: "nickname modification success.",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저 비밀번호 수정
  async modifyPassword(req, res, next) {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    try {
      // 유저 비밀번호가 currentPassword와 일치하는지 비교
      await userService.checkPasswordCoincidence(userId, currentPassword);

      // 기존 비밀번호와 새로운 비밀번호 일치 비교
      await userService.checkPasswordDuplication(userId, newPassword);

      // 비밀번호 수정
      await userService.updateUserPassword(userId, newPassword);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Password modification success",
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저 프로필 사진 변경
  async modifyProfPic(req, res, next) {
    const userId = req.userId;
    const { location } = req.file;
    try {
      const user = await userService.updateUserProfPic(userId, location);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Profile picture modification success",
        datas: {
          profileUrl: location,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // // 유저의 친구 목록 조회
  // async getFollowingList(req, res, next) {
  //   const userId = req.userId;

  //   try {
  //     const followingList = await userService.findFollowingList(userId);

  //     res.status(200).json({
  //       success: true,
  //       status: 200,
  //       message: "success getting following list",
  //       datas: followingList,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // 유저 자기소개 수정
  async modifyDescription(req, res, next) {
    const userId = req.userId;
    const { newDescription } = req.body;

    try {
      const description = await userService.updateUserDescription(
        userId,
        newDescription
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "description modification success",
        datas: description,
      });
    } catch (err) {
      next(err);
    }
  },

  // 유저의 모든 데이터 조회
  async getUserAllData(req, res, next) {
    const { userId } = req.params;

    try {
      const user = await userService.findUserAllData(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success getting user all datas",
        datas: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async getChannelHistory(req, res, next) {
    const userId = req.userId;

    try {
      const history = await userService.findChannelHistory(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Get channel history success",
        datas: history,
      });
    } catch (err) {
      next(err);
    }
  },
};
