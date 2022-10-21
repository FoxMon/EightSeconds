const { Schema } = require("mongoose");

const followSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = followSchema;