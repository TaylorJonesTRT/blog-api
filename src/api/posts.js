const express = require('express');
const postController = require('../controllers/postController');

const app = express();

// GET request for creating a new blog post. This is before any route that
// displays a blog post(using id)
app.post('/create', postController.createNewPost);

// POST request for deleting a blog post by its ID
app.post('/post/:id/delete', postController.deletePostByID);

// POST request for updating a blog post by its ID
app.post('/post/:id/update', postController.updatePostByID);

// GET request for retrieving a blog post and all it's data/information by its ID.
app.get('/post/:id', postController.getPostByID);

// GET request for retrieving every blog post in the database and their data/information
app.get('/', postController.showAllPosts);

module.exports = app;
