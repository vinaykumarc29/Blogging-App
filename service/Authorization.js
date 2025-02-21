const jwt = require("jsonwebtoken");

const secretKey =" $almanKhan";

function CreateTokenForUser(User) {
    const payload = {
        _id:User._id,
        Name:User.FullName,
        Email:User.Email,
        ProfileImage: User.ProfileImageUrl,
        Role: User.Role
    }
    const token = jwt.sign(payload,secretKey);
    return token;
}

function VerifyTokenForUser(token){
const User = jwt.verify(token,secretKey);
return User;
}

module.exports ={
    CreateTokenForUser,VerifyTokenForUser
}