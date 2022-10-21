const { Schema } = require("mongoose");

const chatLogSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ChatRoom",
    },
    chat: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = chatLogSchema;