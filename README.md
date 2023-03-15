# Blog App

A blog application using node js with react

## Content
- Objective
- User Stories
- Diagrams
- Architecture
- How To tun Application

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

- View user's posts:
As a user, I want to be able to view the published posts of a particular user so that I can see their content and follow them if I like their posts.

- View user's personal posts:
As a user, I want to be able to view a feed of my own posts, including unpublished posts, so that I can manage my content and see what I have created.

- Delete own posts:
As a user, I want to be able to delete my own posts so that I can remove content that I no longer want to be associated with.

- Edit own posts: 
As a user, I want to be able to edit my own posts so that I can make changes to the content and improve it over time.

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

- Change profile information:
As a user, I want to be able to change my profile information, such as my email, so that my account information stays up to date.

- Reset password:
As a user, I want to be able to reset my password if I forget it, by receiving a password reset email with a unique link.

- Filter feed by categories or tags:
As a user, I want to be able to filter the feed of published posts by specific categories or tags so that I can find the content I am interested in.

- View list of liked or marked favorite posts:
As a user, I want to be able to view a list of my own liked posts or marked favorites so that I can easily access my favorite content.

- Report inappropriate comments:
As a user, I want to be able to report a comment or user who has left inappropriate or offensive comments on my posts.

- Invite friends to join:
As a user, I want to be able to invite friends to join the app through email or social media platforms so that I can share my experience with them.

- View activity log:
As a user, I want to be able to view my activity log to see my recent activity on the app, such as posts made, comments left, and likes given.

- Choose email notification preferences:
As a user, I want to be able to choose to receive email notifications for certain types of activity, such as when someone follows me or comments on my post.

- View followers and followings:
As a user, I want to be able to view a list of my followers and followings, and unfollow users if desired, so that I can manage my relationships on the app.

## Diagrams
## Architecture
The application will be designed using the client-server architecture. The backend will be built on Node.js and will use a MongoDB database to store the data. The frontend will be built in React and will communicate with the backend through a RESTful API.

![App Architecture](https://i.ibb.co/sbg27tc/Captura-de-pantalla-2023-03-13-161407.png)

## How To run The Application

To run this project, you will need to add the following environment variables to your backend .env file

`cloudinary_cloud_name`

`cloudinary_api_key`

`cloudinary_api_key`