# MERN-STACK-Login-System
### A full-stack Login-Register-ForgotPassword-Logout System

## Preview
![Login]('./Login_img.jpg')
![Register]('./Register_img.jpg')
![Forgot Password]('./ForgotPass_img.jpg')
![Welcome]('./Welcome_img.jpg')

## Features
- Register
- Login
- Password Reset through Email 
- Logout
- 404-Error Page
- JWT Authentication
- Protected-Routes

## Tech
This Project uses a number of open source projects to work properly:


- [MongoDB] - cross-platform document-oriented database
- [Express] - fast node.js network app framework 
- [ReactJS] - front-end JavaScript library
- [Node.js] - evented I/O for the backend
- [Nodemon] - monitoring for changes
- [VSCode]  - freeware source-code editor
- [Bootstrap]   - open-source CSS framework

Other libraries used are:
- Mongoose
- Nodemailer
- Postman
...etc

## Email Sending Service
- [SendGrid] - smtp relay service

## Installation

You must have [MongoDB], [Express], [ReactJS] and [Node.js] setup on your computer to get the code working.

#### Steps to run it
- Clone this repository
    ```sh
    git clone 'https://github.com/RadientBrain/MERN-STACK-Login-System.git'
    ```
- Open 3 terminals and cd to specific directories
    - In the 1st terminal run the node server :
        ```sh
        cd MERN-STACK-Login-System
        npm install
        npm run server
        ```
    - In the 2nd terminal connect to the MongoDB database :
        ```sh
        cd MERN-STACK-Login-System
        mongod
        ```
    - In the 3rd terminal connect to the react frontend:
        ```sh
        cd MERN-STACK-Login-System/client
        npm install
        npm start
        ```

**Verify the deployment by navigating to the below address in your preferred browser once all the commands are executed**

```sh
http://127.0.0.1:3000
```
**or**
```sh
http://localhost:3000
```


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [SendGrid]: <https://sendgrid.com/>
   [MongoDB]: <https://www.mongodb.com/>
   [Nodemon]: <https://nodemon.io/>
   [Node.js]: <http://nodejs.org>
   [Bootstrap]: <https://getbootstrap.com/>
   [Express]: <http://expressjs.com>
   [ReactJS]: <https://reactjs.org/>
   [VSCode]: <https://code.visualstudio.com/>