const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is requied"], //requird value must be need. otherwise it'll show error
      tirm: true, //trim removes spaces among letters
      validate: {
        validator: function (name) {
          return name.length >= 3 && name.length <= 20;
        },
        message:
          "First name must be atleast have 3 letter and maximum 20 letters",
      },
    },
    lastName: {
      type: String,
      required: [true, "Last name is requied"],
      tirm: true,
      validate: {
        validator: function (name) {
          return name.length >= 3 && name.length <= 20;
        },
        message:
          "last name must be atleast have 3 letter and maximum 20 letters",
      },
    },
    email: {
      type: String,
      required: [true, 'email is requied'],
      lowerscase: true,
      unique: true,
      validate: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `{props.email} is not valid email address...!`,
    },
    userName: {
      type: String,
      required: [true, 'Username is requied'],
      trim: true,
      unique: [true, 'Username must be unique'],
    },
    hash_password: {
      type: String,
      required: [true, "Enter a password"],
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    ContactNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//full name is created by using mongoose virtual method
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
