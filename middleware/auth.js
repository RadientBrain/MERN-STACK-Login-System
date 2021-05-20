//Protected Auth for JWT

//imports 
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        //Bearer slafjssfs
        //Split at space and take the 2nd part(the token)
    }

    //if no token found
    if(!token){
        return next(new ErrorResponse("Not Authorised to Access this Route",401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return next(new ErrorResponse("No User Found with this ID", 404));
        }


        req.user = user;
        
        //call next to continue the next piece of middleware in the routes
        next();

    } catch (error) {
        return next(error);
        // return next(new ErrorResponse("Fatal Error! Not Authorised to Access this Route",401));
    }

}