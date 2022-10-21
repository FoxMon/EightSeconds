const ApiError = require("../utils/ApiError");
const { channelService } = require("../services");

module.exports = {
  async makeChannel(req, res, next) {
    const userId = req.userId;
    // location은 upload middleware 통해서 얻은 imageUrl임을 유의
    var location = "https://elice-8seconds.s3.ap-northeast-2.amazonaws.com/plogging_cover.png";
    if(req.file) {
      var { location } = req.file;
    }
    const { title, locationDist, locationCity, memberNum, spec } = req.body;
    try {
      const channelInfo = await channelService.createChannel(
        title,
        userId,
        locationDist,
        locationCity,
        memberNum,
        spec,
        location
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel create success.",
        datas: {
          _id: channelInfo._id,
          location: channelInfo.location,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async showChannelList(req, res, next) {
    try {
      // status == 0 : 모집 중인 채널
      // status == 1 : 모집 완료된 채널
      // status == 2 : 활동 종료된 채널
      const { page, status } = req.query;

      const channels = await channelService.getChannelList(page, status);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Channel list load success",
        totalPages: channels.totalPages,
        datas: channels.channelItems,
      });
    } catch (err) {
      next(err);
    }
  },

  async searchChannelList(req, res, next) {
    try {
      // status == 0 : 모집 중인 채널
      // status == 1 : 모집 완료된 채널
      // status == 2 : 활동 종료된 채널
      const { page, status, keyword, filter } = req.query;

      const channels = await channelService.searchChannel(page, status, keyword, filter);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Search result load success",
        totalPages: channels.totalPages,
        datas: channels.channelItems,
      });
    } catch (err) {
      next(err);
    }
  },

  async showChannelInfo(req, res, next) {
    const { channelId } = req.params;
    try {
      const channelInfo = await channelService.getChannelInfo(channelId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Channel info load success.",
        datas: channelInfo,
      });
    } catch (err) {
      next(err);
    }
  },

  async changeChannelInfo(req, res, next) {
    const userId = req.userId;
    const channelId = req.params.channelId;
    var location = null;
    if (req.file) {
      var { location } = req.file;
    }
    const { newTitle, newStatus, newSpec, newLocationDist, newLocationCity } =
      req.body;
    const toUpdate = {
      title: newTitle,
      status: newStatus,
      spec: newSpec,
      locationDist: newLocationDist,
      locationCity: newLocationCity,
      img: location,
    };
    try {
      const updatedChannelId = await channelService.updateChannelInfo(
        userId,
        channelId,
        toUpdate
      );

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel info change success",
        datas: {
          _id: updatedChannelId,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async requestChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { message } = req.body;

    try {
      const channels = await channelService.requestEnter(userId, channelId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel enter request success",
        datas: channels
      });
    } catch (err) {
      next(err);
    }
  },

  async cancelChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
  
    try {
      await channelService.cancelEnter(userId, channelId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "Channel enter cancel success",
      //  datas: channels
      });
    } catch (err) {
      next(err);
    }
  },

  async showWaitList(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
  
    try {
      const waitList = await channelService.getWaitList(userId, channelId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "Wait list get success",
        datas: waitList
      });
    } catch (err) {
      next(err);
    }
  },

  async acceptChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { waitingId } = req.body;
  
    try {
      await channelService.acceptEnter(userId, channelId, waitingId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "channel enter accept success",
      });
    } catch (err) {
      next(err);
    }
  },

  async rejectChannelEnter(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;
    const { waitingId } = req.body;
  
    try {
      await channelService.rejectEnter(userId, channelId, waitingId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "channel enter reject success",
      });
    } catch (err) {
      next(err);
    }
  },

  async loadMainContent(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;

    try{
      const userPosition = await channelService.checkUserChannelRelation(userId, channelId);
      const response = {};
      
      if (userPosition==0 || userPosition==1) {
        const channelInfo = await channelService.getChannelInfo(channelId);
        if (userPosition==0) {
          const waitList = await channelService.getWaitList(userId, channelId);
          channelInfo.waitList = waitList;
        }
        response.success = true;
        response.message = "channel main content load success";
        response.datas = channelInfo;
      } else {
        response.success = false;
        if (userPosition==2) {
          response.message = "pending channel entrance";
        } else {
          response.message = "non-member access is forbidden";
        }
      }

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },

  async leaveChannel(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;

    try {
      await channelService.quitChannel(userId, channelId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "channel leave success",
        //datas: channels
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteChannel(req, res, next) {
    const userId = req.userId;
    const { channelId } = req.params;

    try {
      await channelService.deleteChannel(userId, channelId);

      res.status(201).json({
        success: true,
        status: 201,
        message: "channel delete success",
        //datas: channels
      });
    } catch (err) {
      next(err);
    }
  },
};
