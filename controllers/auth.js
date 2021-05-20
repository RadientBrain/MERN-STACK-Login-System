//imports
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//Named Exports
//Asynchronous call for the database operations
exports.register = async (req, res, next) =>{
    //res.send("Register Route");
    const {username, email, password} = req.body;

    try{
        const user = await User.create({
            username, email, password,
        });

        // //return the status code
        // res.status(201).json({
        //     success: true,
        //     // //in ES6 we dont need to specify the value of the user
        //     // user

        //     token: "1234567",
        // });
        sendToken(user, 201, res);
    }
    catch(error){
        //Custom ErrorHandler
        next(error);

        // //Native ErrorHandler
        // res.status(500).json({
        //     success: false,
        //     error: error.message,
        // });
    }

};
exports.login = async (req, res, next) =>{
    //res.send("Login Route");
    const {email, password} = req.body;

    if(!email || !password){
       // res.status(400).json({ success: false, error: "Please provide an Email and Password!" })
       return next(new ErrorResponse("Please provide an Email and Password!",400));
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if(!user){
            //Unauthorized StatusCode(401)

            //res.status(401).json({ success:false, error: "Invalid Credentials!"});
            return next(new ErrorResponse("Invalid Credentials!",401));
        }

        //match the bcrypt password with the body password
        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            //Unauthorized StatusCode(401)
            
            // res.status(401).json({ success:false, error: "Invalid Credentials!"});
            return next(new ErrorResponse("Invalid Credentials!",401));
        }

        // //return the auth token(JWT)
        // res.status(200).json({
        //     success: true,
        //     token: "abcdefghijklmno",
        // });
        sendToken(user, 200, res);

    } catch (error) {
        // res.status(500).json({ success: false, error: error.message });
        return next(new ErrorResponse(error.message,500));
    }

};
exports.forgotpassword = async (req, res, next) =>{
    // res.send("Forgot Password Route");
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){

            //Email not in the database
            //For BruteForce security purposes we dont tell exact error
            return next(new ErrorResponse("Email could not be sent!",404));
        }

        const resetToken =  user.getResetPasswordToken();

        //save this new token for the user into db
        await user.save();

        //store reseturl for emailing
        const resetUrl=`http://localhost:3000/passwordreset/${resetToken}`;

        //clicktracking=off because we dont need to reroute via SendGrid
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <p><b>NOTE: <em>This link will expire in 10 minutes</em></b></p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        //using NODEMAILER and SENDGRID
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request [MERN-Login-System]",
                text: message,
            });
            
            res.status(200).json({success:true,data:"Email sent successfully!"});
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent!",500));
        }

    } catch (error) {
        next(error);
    }
};
exports.resetpassword = async (req, res, next) =>{
    // res.send("Reset Password Route");

    //recreate the token from the params in the URL of resetpassword and compare them
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        //mongodb query is used for the password expire(greater than the date now)
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if(!user){
            //status 400 for bad request
            return next(new ErrorResponse("Reset Link Expired!",400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success:true,
            data: "Password Reset Successful!",
            token: user.getSignedToken(),
        });

    } catch (error) {
        next(error);
    }

};


//JWT Token Gen
const sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true, token});
};