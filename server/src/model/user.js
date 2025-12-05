import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    match: /^[a-z0-9_]{3,16}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  fullName: {
    type: String,
    required: [true, "Please enter your fullname!"],
    trim: true,
    minLength: [4, "Full name must be at least 4 characters"],
    maxLength: [40, "Full name cannot exceed 40 characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Please enter at least 8 characters"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message: "Please enter a strong password",
    },
  },
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema);
export default User;
