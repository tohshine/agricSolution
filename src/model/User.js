const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    requre: true,
  },
});

UserSchema.pre("save", function (done) {
  const user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return done(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return done(err);
      user.password = hash;
      done();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      if (!isMatch) return reject(false);
      resolve(true);
    });
  });
};

mongoose.model("user", UserSchema);
