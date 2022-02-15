# Getting started with this application...

1. `npm install`
2. `cd socket`
3. `npm install`
4. `cd ../front-end`
5. `npm install`
6. `cd ../Rest-api`
7. `npm install`
8. `cd ..`
9. `npm start`

## Purpose of this project:
It is a **MERN** stack project, which imitates modern day social media platforms. One can directly register/login to the web application using email id and password. You can post images along with a text description. Make friends by following someone and seeing what they have posted. Also, there is messenger option to message your connections instantly.

## Technologies used:
* **React**(react-hooks, react-router, Context-API)
* **Node**(express, mongoose, dotenv, multer, morgan, helmet, path)
* **socket_io**

## Code Structure of the project

*I have divided application into three different pieces:*

***api***

    All the mongoose models are defined in this folder. Also, query requests to the mongoDB are written in here and the api is capable of getting, updating and deleting data from the mongoDB Atlas.   

***socket-server*** 

    This piece of the application particularly works for the messenger. It is responsible to create quick socket connections between two different nodes/user when they send messages to each other.
    
***front-end***
    
    It implements the user interface including all the functional components and routes necessary to travel across different pages and content on the application.
    
## Flow of Application
1. As soon as you start this application, a link will open up in your browser at port number **3000** of your **localhost**.
2. You may be asked to register if you are new user, this request will be directed to **proxy** at port number **8800**. Create post, like/unlike post, follow/unfollow user, all these requests will also be directed to same port.
3. Messenger works as a combination of both mongoDB and socket_io. All the previous messages(if any) will be loaded from mongoDB, but the new messages will be handled by socket **server first** at port number **8900** and then pushed to mongoDB.
## Conclusion
It is a great fun project to learn making web applications using MERN stack. Most of it consists of basic and fundamental concepts that you can learn on the go while making this project without any prior knowledge of react or mongoDB. However, one should have an intermediate knowledge of javascript and little conciousness about nodejs.
