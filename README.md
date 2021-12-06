
# 🙋‍♂️🙋‍♀️🤔 Ask ❓❔⁉️

1. [About　💁](#about-)
2. [Features　✨](#features-)
3. [Live Application 🌈](#live-application-)
4. [Requirements　🙏](#requirements-)
5. [Getting Started　🎬](#getting-started-)
6. [Tech Stack　🤖](#tech-stack-)

# About 💁
This is a full-stack social media application platform for posting questions. If you have any questions that you want to be answered or maybe have a forum or read some opinions from others on a specific topic, then Ask is right place for you. 
# Features ✨
#### 1. Questions Lists
Want to read some popular questions or just read some answers in a specific topic, you can read it in the homepage without even registering in the app. 
#### 2.Questions Filter
If you want to filter the questions based on the popularity and time or top rated questions, you can do this by clicking a specific tab in the home page.
#### 3. Previously Viewed Questions
Your previously viewed questions are being stored for you in case you want to go back to that question. You can see that section in the right side of your screen.
#### 4. Ask Question Form
If you want to ask your own question, there is a form in the app which will appear if you click the "ask" button in the navigation in the top.
#### 5. Vote or Unvote for a question
Do you like the question or the question does not make any sense to you? You can click the arrow buttons beside the question to vote or unvote for the questions you are satisfied or not.
#### 6. Answer Question
Do you know the answer in the question? you can answer the whenever you want to. Just click the question and you will be directed to its page and you can start.
#### 7. Tag system
You can start adding tags to your questions to access the question more easily in filter option

# Live Application 🌈
You can try the live application [here](https://ask-yu.herokuapp.com/).  
# Requirements 🙏
To use this application, 
* This is the client side repository. You need to run the server side at the same time. This is [Server Repository](https://github.com/Team-Freshly-Washed-Turtles/pet-server).
* You need **Node.js**, **yarn** installed on your computer. Also, you need to use **mongodb** on your computer or on cloud.
# Getting Started 🎬
#### 1. Install Dependencies
To install all dependencies, run this code in your terminal.
```
npm install
```
note:
also install dependencie in the client side by going to the client directory.
#### 2. Set Up Environment Variables
To set up environment variables, create ```.env``` file and set up your own environment variables in the file.
```
jwtsecret = anything
PG_USER = your_username
PG_PASSWORD = your_password
PG_HOST = your_localhost
PG_PORT = your_port
PG_DATABASE = your_database
jwtSecret = your_secret
```

#### 3. Create your own database and run the sql commands in db.sql  
#### 4. Run the server and client
To start the server, run this code in your terminal.
```
npm run dev
```
#### 5. Let's get started!
  
# Tech Stack 🤖  
1. React
2. Redux
3. PostgreSQL
4. Node.js
5. Express.js
6. Cloudinary
