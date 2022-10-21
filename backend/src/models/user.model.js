const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      default: "자기소개",
    },
    profPic: {
      type: String,
      required: false,
      default:
        "https://elice-8seconds.s3.ap-northeast-2.amazonaws.com/1665109688589_image_1648301949725_750.jpeg",
    },
    channels: {
      type: Array,
      required: false,
      default: [],
    },
    waitResList: {
      type: Array,
      required: false,
      default: [],
    },
    waitReqList: {
      type: Array,
      required: false,
      default: [],
    },
    withdrawal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
