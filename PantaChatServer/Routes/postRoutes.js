const express = require('express');
const { createPost, deletePost, likeAndUnliked, replyToPost, getFeedsPosts, getPost, getUserPosts } = require('../controllers/postController');
const protectRout = require('../middlewares/protectRoutes');
const router = new express.Router()




router.get("/feed",protectRout,getFeedsPosts)


router.post('/create',protectRout,createPost)

router.get('/:id',protectRout,getPost)

router.get('/user/:username',getUserPosts)

router.delete('/:id',protectRout,deletePost)

router.put('/like/:id',protectRout,likeAndUnliked)


router.put('/reply/:id',protectRout,replyToPost)








module.exports =router
