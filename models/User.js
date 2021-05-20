//imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

//Making a Mongoose User Schema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a Username"]
    },
    email:{
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide a valid Email Address"
        ]
    },
    password:{
        type:String,
        required: [true, "Please provide a good Password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Middleware to pre save and post save user in the database
UserSchema.pre("save", async function( next ){
    if(!this.isModified("password")){
        next();
    }


    //creating salt for password hashing
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    //call next to save the hashed password
    next();
});

//Method to verify passwords
UserSchema.methods.matchPasswords = async function(passwd){
    return await bcrypt.compare(passwd, this.password);
};

//Method to get signed JWT Token
UserSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id },process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRE});
};
// //Generate the random secret number using the below code in the terminal
//require('crypto').randomBytes(20).toString("hex")

//Method to reset Token for resetting password
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hash this token (from documentation)
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //Set expiration of the password=10mins [1s = 1000ms]
    this.resetPasswordExpire = Date.now() + 10 * (60*1000);
    return resetToken;
};

//create the module
const User = mongoose.model("User", UserSchema);

//export the module
module.exports = User;