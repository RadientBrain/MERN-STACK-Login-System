//imports
// const User = require("../models/User");

exports.getPrivateData =  (req, res, next) => {
    res.status(200).json({
        success: true,
        data: `Welcome User, You got Access to the private data in this route`,
    });
};