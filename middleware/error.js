const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next)=>{
    let error = { ...err };
    error.message = err.message;

    // //Debugging
    // console.log(err);

    //check for duplicate error key using mongoose
    if(err.code === 11000){
        const message = `Duplicate Field Value Entered`;
        //status 400: bad request
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((val) => val.message);
        //status 400: bad request
        error = new ErrorResponse(message, 400);
    }

    //either a server error(500) or any other error
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;