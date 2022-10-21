const { Schema } = require("mongoose");

const WaitListSchema = new Schema(
  {
    channelId: {
      type: String,
      required: true,
      unique: true
    },
    ownerId: {
      type: String,
      required: true
    },
    waiting: {
      type: Array,
      required: false,
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = WaitListSchema;