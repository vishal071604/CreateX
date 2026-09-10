const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    liked: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can like one post only once
likeSchema.index(
  {
    user: 1,
    post: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);