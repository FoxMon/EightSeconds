const mongoose = require("mongoose");

const UserSchema = require("./user.model");
const ChannelSchema = require("./channel.model");
const WaitListSchema = require("./waitList.model");
const EmailAuthSchema = require("./emailAuth.model");
const FollowSchema = require("./follow.model");
const ChatRoomSchema = require("./chatRoom.model");
const ChatLogSchema = require("./chatLog.model");
const refreshSchema = require("./refreshToken.model");

module.exports = {
  User: mongoose.model("User", UserSchema),
  Channel: mongoose.model("Channel", ChannelSchema),
  WaitList: mongoose.model("WaitList", WaitListSchema),
  EmailAuth: mongoose.model("EmailAuth", EmailAuthSchema),
  Follow: mongoose.model("Follow", FollowSchema),
  ChatRoom: mongoose.model("ChatRoom", ChatRoomSchema),
  ChatLog: mongoose.model("ChatLog", ChatLogSchema),
  RefreshToken: mongoose.model("RefreshToken", refreshSchema),
};
