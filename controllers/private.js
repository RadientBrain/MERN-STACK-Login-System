//imports
// const User = require("../models/User");

exports.getPrivateData =  (req, res, next) => {
    res.status(200).json({
        success: true,
        data: `You Signed In Successfully :)`,
    });
};