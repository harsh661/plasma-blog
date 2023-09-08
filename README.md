# PlasmaBlogs

Welcome to PlasmaBlogs, a full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to create accounts, log in, and create and manage their blog posts. Below, you'll find an overview of the features and instructions on how to use them:

## Features

### User Authentication

PlasmaBlogs provides user authentication with email and password. Users can create an account, log in securely, and protect their data. JSON Web Tokens (JWT) are used for session management.

### Post Creation

Logged-in users can create new blog posts by clicking the "New Post" button on the navigation bar. They can input a title and content for their post. All posts are stored in a MongoDB database.

### Post List

The home page displays a list of all the blog posts available in the database. Each post includes its title, content, author's name, and the date it was created.

### Post Detail

Clicking on a post in the post list redirects users to the post detail page. Here, they can read the full content of the post, view the author's name, and see the creation date. If the current user is the author of the post, they will have access to an "Edit" button to modify the post.

### Post Editing

Logged-in users can edit their own posts by clicking the "Edit" button on the post detail page. They will be taken to a form where they can update the title and content of the post.

## Getting Started

To run this MERN app locally or deploy it to a server, follow these steps:

1. **Clone the Repository**: 
   ```
   git clone https://github.com/harsh661/plasma-blog.git
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory and run `npm install` to install the server dependencies.
   - Configure your MongoDB connection in the `.env` file.
   - Start the backend server with `npm start`.

3. **Frontend Setup**:
   - Navigate to the `client` directory and run `npm install` to install the frontend dependencies.
   - Modify the API endpoint in the frontend code to match your backend server URL.
   - Start the React app with `npm run dev`.

4. **Open in Browser**:
   - Open your web browser and go to `http://localhost:5173` to access the app.

## Conclusion

PlasmaBlogs is a powerful blogging platform showcasing how to build a full-stack application using the MERN stack. It demonstrates user authentication, database management with MongoDB, and the integration of React for a dynamic frontend. Feel free to explore, create posts, and further customize this platform to suit your needs.

Happy Blogging!
