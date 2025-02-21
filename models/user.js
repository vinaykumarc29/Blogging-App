const { createHmac, randomBytes } = require("node:crypto");
const   mongoose= require("mongoose");
const { CreateTokenForUser } = require("../service/Authorization");
 

const UserSchema = new mongoose.Schema (
  {
    FullName: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
    ProfileImageUrl: {
      type: String,
      default: "/images/profile",
    },
    Role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("Password")) return;
  const salt = randomBytes(16).toString();
  const HashedPassword = createHmac("sha256", salt)
    .update(user.Password)
    .digest("hex");


    this.salt = salt
    this.Password = HashedPassword

    next();
});



UserSchema.static("MatchPasswordAndGeneratetoken", async function(Email,Password){
  const User =await USER.findOne({Email});
  if(!User){
   throw new Error("User Not Found")
  }
  const salt = User.salt;
  const UserHashedPassword = createHmac("sha256", salt).update(Password).digest("hex");
  if(UserHashedPassword !== User.Password){
    throw new Error("Invalid Password");
  }
  const token = CreateTokenForUser(User);
  return token;
})

const USER = mongoose.model("User", UserSchema);
module.exports = USER 
