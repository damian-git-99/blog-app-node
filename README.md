# Blog App

A blog application using node js with react

## Content
- Objective
- Use Cases
- Diagrams
- Architecture
- How To tun Application

## Objective
The goal of this project is to build a blog application that allows users to post and read articles online.

## Use Cases
- Users can register in the application by providing their email and password.
- Users can login to the app using their username and password.
- Authentication is done securely using bcrypt and session tokens.
- Users can log out of the application.
- Users can create and publish posts in the app.
- Posts can include text and images.
- Users can view a feed of recently published posts from other users.
- Users can view the published posts of a particular user.
- Users can view a feed of their posts including unpublished posts.
- Users can delete their own posts.
- Users can edit their own posts.

## Use cases for later
- Users can search for specific posts using keywords.
- Users can mark posts as "favorites" to save them and access them later.
- Users can follow other users to receive updates on their posts.
- Users can comment on other users' posts.
- Users can receive real-time notifications when someone comments on their posts or follows them.
- Users can report inappropriate posts or users who violate the application's policies.
- Users can configure their privacy preferences to determine who can see their posts and profile.
- Users can view their profile and statistics, such as the number of followers and posts made.
- Users can change their profile information, such as their email.
- Users can reset their password if they forget it, by receiving a password reset email with a unique link.
- Users can filter the feed of published posts by specific categories or tags.
- Users can view a list of their own liked posts or marked favorites.
- Users can report a comment or user who has left inappropriate or offensive comments on their posts.
- Users can invite friends to join the app through email or social media platforms.
- Users can view their activity log to see their recent activity on the app, such as posts made, comments left, and likes given.
- Users can choose to receive email notifications for certain types of activity, such as when someone follows them or comments on their post.
- Users can view a list of their followers and followings, and unfollow users if desired.

## Diagrams
## Architecture
The application will be designed using the client-server architecture. The backend will be built on Node.js and will use a MongoDB database to store the data. The frontend will be built in React and will communicate with the backend through a RESTful API.

![App Architecture](https://i.ibb.co/sbg27tc/Captura-de-pantalla-2023-03-13-161407.png)

## How To run The Application

To run this project, you will need to add the following environment variables to your backend .env file

`cloudinary_cloud_name`

`cloudinary_api_key`

`cloudinary_api_key`