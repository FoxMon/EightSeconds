const { ChatLog } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const dateToString = require("../utils/dateToString");

module.exports = {
  /**
   * 채팅 저장
   *
   * @param {String} roomId 소켓 룸 아이디
   * @param {String} userId 유저 아이디
   * @param {String} chat 채팅 내용
   * @returns 채팅 로그
   */
  async addChatLog(roomId, userId, chat) {
    const log = await ChatLog.create({ roomId, userId, chat });

    return log;
  },

  /**
   * 채팅 내역 불러오기
   *
   * @param {String} roomId 소켓 room 아이디
   * @returns 채팅 내역
   */
  async getChatLog(roomId) {
    console.log(roomId);
    const logs = await ChatLog.aggregate([
      {
        $match: {
          roomId: ObjectId(roomId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          roomId: 1,
          chat: 1,
          userId: 1,
          createdAt: 1,
          userInfo: {
            nickname: 1,
            profPic: 1,
          },
        },
      },
    ]);

    const resultLog = logs.map((log) => {
      log.createdAt = dateToString(log.createdAt);
      return log;
    });

    return resultLog;
  },

  /**
   *
   * @param {String} chatId 채팅 내역 아이디
   * @returns 유저 채팅 내역
   */
  async getUserChatLog(chatId) {
    const logs = await ChatLog.aggregate([
      {
        $match: {
          _id: ObjectId(chatId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          roomId: 1,
          chat: 1,
          userId: 1,
          createdAt: 1,
          userInfo: {
            nickname: 1,
            profPic: 1,
          },
        },
      },
    ]);

    const resultLog = logs.map((log) => {
      log.createdAt = dateToString(log.createdAt);
      return log;
    });

    return resultLog[0];
  },

  /**
   *
   * @param {String} chatId 채팅 내역 아이디
   * @param {*} chat 채팅 내용
   */
  async updateChatLog(chatId, chat) {
    await ChatLog.updateOne({ _id: chatId }, { chat });
  },

  /**
   *
   * @param {String} chatId 채팅 내역 아이디
   */
  async deleteChatLog(chatId) {
    await ChatLog.deleteOne({ _id: chatId });
  },
};
