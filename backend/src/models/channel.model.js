const { Schema } = require("mongoose");

const ChannelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    ownerId: {
      type: String,
      required: true
    },
    locationDist: {
      type: String,
      required: true
    },
    locationCity: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false
    },
    spec: {
      type: String,
      required: true
    },
    memberNum: {
      type: Number,
      required: true,
    },
    members: {
      type: Array,
      required: false,
      default: []
    },
    status: {
      type: Number,
      required: false,
      default: 0
    },
    chatLog: {
      type: Array,
      required: false,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = ChannelSchema;