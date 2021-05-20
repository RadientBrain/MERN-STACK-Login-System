require('dotenv').config({path: "./config.env"});

//Some Imports
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Connect to the DB
connectDB();

const app = express();

/******************* Connect routes start*********************/
//Middleware to get(extract) the data from the request.body
app.use(express.json());
// redirect to routes/auth if of form api/auth
app.use('/api/auth', require('./routes/auth'));
//redirect to the dashboard after login
app.use('/api/private', require('./routes/private'));
/******************* Connect routes end*********************/


//Error Handler(Should be the last piece of middleware)
app.use(errorHandler);


//Defining port to be run on
const PORT = process.env.PORT || 5000;

//constant variable to handle the server crash
const server = app.listen( PORT, ()=> console.log(`Server is up on ${PORT}`) );

process.on("unhandledRejection", (err, promise)=> {
    console.log(`Error Log: ${err}`);
    server.close(()=> process.exit(1));
})