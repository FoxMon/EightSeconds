const { followService } = require("../services");

module.exports = {
  async showFollowList(req, res, next) {
    const { userId } = req.params;

    try {
      const followList = await followService.getFollowList(userId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success Loading FollowList",
        datas: followList,
      });
    } catch (err) {
      next(err);
    }
  },

  async checkFollow(req, res, next) {
    const userId = req.userId;
    const { targetId } = req.params;

    try {
      const isFollowed = await followService.confirmFollow(userId, targetId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "true => followed, false => unfollowed",
        datas: { isFollowed },
      });
    } catch (err) {
      next(err);
    }
  },

  async addFollow(req, res, next) {
    const userId = req.userId;
    const { targetId } = req.body;
    try {
      await followService.createFollow(userId, targetId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success adding following",
      });
    } catch (err) {
      next(err);
    }
  },

  async removeFollow(req, res, next) {
    const userId = req.userId;
    const { targetId } = req.body;
    try {
      await followService.deleteFollow(userId, targetId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "success removing following",
      });
    } catch (err) {
      next(err);
    }
  },
};
