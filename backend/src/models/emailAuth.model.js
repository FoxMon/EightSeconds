const { Schema } = require("mongoose");

const EmailAuthSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    authCode: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = EmailAuthSchema;