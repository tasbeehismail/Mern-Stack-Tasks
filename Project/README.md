# Blog Website

This is a full-stack blog website built with React, Node.js, Express, and MongoDB. Users can sign up, log in, create, edit, delete, and view blog posts. The website also includes search functionality to find blogs by title or tags.

## Features

- User authentication (signup, login)
- Create, edit, delete, and view blog posts
- Search blogs by title or tags
- Responsive design

## Technologies Used

- Frontend: React, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT (JSON Web Token)
- Styling: CSS

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/tasbeehismail/Mern-Stack-Tasks.git
    cd Project
    ```

2. Install dependencies for both the client and server:

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Create a `.env` file in the server and add your environment variables:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
	BASE_URL='http://localhost:3000'
	MAILER_USER='yourmail@gmail.com'
	MAILER_PASS='one app password'

    ```

4. Start the development servers:

    ```bash
    # In the server directory
    node server.js

    # In the client directory
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the blog website.
2. Sign up for a new account or log in with an existing account.
3. Create, edit, delete, and view blog posts.
4. Use the search bar to find blogs by title or tags.

## Screenshots

![Blog Website](https://github.com/tasbeehismail/Mern-Stack-Tasks/tree/main/Project/Screenshot.gif)

