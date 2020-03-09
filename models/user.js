const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      max: 32
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 32,
      lowercase: true
    },
    profile: {
      type: String,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    about: {
      type: String
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    resetPasswordLink: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    // create a temporarity variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

module.exports = mongoose.model("User", userSchema);
