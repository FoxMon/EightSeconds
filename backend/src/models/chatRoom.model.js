const { Schema, Types } = require("mongoose");

const chatRoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    max: {
      type: Number,
      required: true,
      min: 2,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = chatRoomSchema;
