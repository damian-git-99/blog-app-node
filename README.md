# Blog App

A blog application using node js with react

## Content
- Screenshots
- Objective
- User Stories
- Architecture
- Modules
- How To Run the Application

## Screenshots

## Objective
The goal of this project is to build a blog application that allows users to post and read articles online.

## User stories
- User registration:
As a new user, I want to be able to sign up for the application by providing my email and password so that I can create a new account and start using the app.

- User login:
As a registered user, I want to be able to log in to the application using my username and password so that I can access my account and use the app.

- Secure authentication:
As a user, I want my authentication to be done securely using bcrypt and session tokens, so that my information is protected from unauthorized access.

- Logout functionality:
As a user, I want to be able to log out of the application so that I can end my session and protect my information.

- Create and publish posts:
As a user, I want to be able to create and publish posts that include text and images so that I can share my thoughts and experiences with others.

- View recent posts feed:
As a user, I want to be able to view a feed of recently published posts from other users so that I can stay up to date with the latest content.

- View user's personal posts:
As a user, I want to be able to view a feed of my own posts, including unpublished posts, so that I can manage my content and see what I have created.

- Delete own posts:
As a user, I want to be able to delete my own posts so that I can remove content that I no longer want to be associated with.

- View user's posts:
As a user, I want to be able to view the published posts of a particular user so that I can see their content.

- Edit own posts: 
As a user, I want to be able to edit my own posts so that I can make changes to the content and improve it over time.

- Change profile information:
As a user, I want to be able to change my profile information, such as my email, so that my account information stays up to date.

## User stories for later
- Search posts using keywords:
As a user, I want to be able to search for specific posts using keywords so that I can quickly find the content I am interested in.

- Mark posts as favorites:
As a user, I want to be able to mark posts as "favorites" so that I can save them and access them later.

- Follow other users:
As a user, I want to be able to follow other users so that I can receive updates on their posts and stay up to date with their content.

- Comment on other users' posts:
As a user, I want to be able to comment on other users' posts so that I can share my thoughts and feedback on their content.

- Receive real-time notifications:
As a user, I want to be able to receive real-time notifications when someone comments on my posts or follows me so that I can stay informed and engaged with the app.

- Report inappropriate posts or users:
As a user, I want to be able to report inappropriate posts or users who violate the application's policies so that I can help maintain a safe and respectful community.

- Configure privacy preferences:
As a user, I want to be able to configure my privacy preferences to determine who can see my posts and profile so that I can control my online presence and protect my information.

- View profile and statistics:
As a user, I want to be able to view my profile and statistics, such as the number of followers and posts I have made, so that I can track my progress on the app.

- Reset password:
As a user, I want to be able to reset my password if I forget it, by receiving a password reset email with a unique link.

- Filter feed by categories or tags:
As a user, I want to be able to filter the feed of published posts by specific categories or tags so that I can find the content I am interested in.

- View list of liked or marked favorite posts:
As a user, I want to be able to view a list of my own liked posts or marked favorites so that I can easily access my favorite content.

- Report inappropriate comments:
As a user, I want to be able to report a comment or user who has left inappropriate or offensive comments on my posts.

- View followers and followings:
As a user, I want to be able to view a list of my followers and followings, and unfollow users if desired, so that I can manage my relationships on the app.

## Architecture
The application will be designed using the client-server architecture. The backend will be built on Node.js and will use a MongoDB database to store the data. The frontend will be built in React and will communicate with the backend through a RESTful API. Additionally, to store the images of the products, we will be using Cloudinary, a cloud-based media management solution that offers a scalable and reliable platform for image and video storage, optimization, and delivery. Cloudinary will allow us to easily manage and manipulate the images, as well as optimize their size and format for fast loading on the frontend.

![App Architecture](https://i.ibb.co/F8SPP9X/Captura-de-pantalla-2023-03-15-180454.png)

## Modules
The key Modules of Blog App are:
- Authentication: Handles the authentication and security process of the application. It includes functions for login, registration, password reset, logout, and session token management. 

- User: Handles user-related actions, including user creation, updating user profile information, email address verification, privacy preferences configuration, and account deletion.

- Post: The "Post" module handles all aspects related to creating, managing, and displaying content posted by users in the application. It includes features such as creating new posts, editing and deleting existing posts, organizing posts by categories or tags, enabling post comments, and displaying post-related information such as likes and views. 

- Social Networking(for later): Manages the social interaction features of the application, allowing users to interact with each other through comments, likes, shares, and private messages. This module includes functions for displaying posts and comments, creating and editing posts, managing comments and likes, and sending and receiving private messages. Additionally, this module may also include features for following or subscribing to other users, as well as reporting or blocking inappropriate content or users.
## How To run The Application

## Setting up Cloudinary
To use Cloudinary in your application, you'll need to create an account and obtain your authentication credentials. Follow these steps to set up Cloudinary:
- Sign up on the Cloudinary website and create an account.
- Once you've created your account, log in to the Cloudinary management console.
- In the "Dashboard" section of the console, click on the "Create a New Cloud" button.
- You'll be prompted to enter a name for your Cloudinary "cloud". This name is used to uniquely identify your Cloudinary account on the platform. Enter a descriptive name and click "Create".
- Once you've created your cloud, you'll be redirected to your account settings page. Here you'll find your Cloudinary authentication credentials:
  - `cloudinary_cloud_name`: This is the name of your Cloudinary "cloud", which is used as a unique identifier for your account on the platform.
  - `cloudinary_api_key`: This is the API key that allows you to access Cloudinary services.
  - `cloudinary_api_secret`: This is the API secret key that is used to authenticate your requests to Cloudinary and protect your information.
- Save your authentication credentials in a secure location. You'll need these credentials to configure the Cloudinary integration in your application





## Run Tha Application with Docker
- [Install Docker](https://www.docker.com/products/docker-desktop/)
- Clone project `git clone https://github.com/damian-git-99/blog-app-node.git`

- Config Environment Variables in docker-compose file
  - `cloudinary_cloud_name`
  - `cloudinary_api_key`
  - `cloudinary_api_secret`
  - `MONGO_URI`=mongodb://localhost:27017/blog_app
  - `JWT_SECRET`
  - `PORT`: by default 4000
- Run `docker compose up`
- App runs on `http://localhost:5173/`

## Run The Application Manually

- [Install node js](https://nodejs.org/es) 
- [Install MongoDB](https://www.mongodb.com/)

To run this project, you will need to add the following environment variables to your backend .env file

- `cloudinary_cloud_name`
- `cloudinary_api_key`
- `cloudinary_api_secret`
- `MONGO_URI`=mongodb://localhost:27017/blog_app
- `JWT_SECRET`
- `PORT`: by default 4000

Clone project `git clone https://github.com/damian-git-99/blog-app-node.git`

Run backend
- `cd node-backend`
- `npm install`
- `npm run dev`

Run Frontend
- `cd react-frontend`
- `npm install`
- `npm run dev`

App runs on `http://localhost:5173/`
