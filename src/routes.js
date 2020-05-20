const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();


const ProductController = require('./controllers/ProductController');

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);


//const Post = require("./models/Post");

const PostController = require('./controllers/PostController');

routes.post('/posts', multer(multerConfig).single("file"), PostController.store); 

routes.get('/posts', PostController.index);
routes.delete('/post/:id', PostController.delete);

		

module.exports = routes;