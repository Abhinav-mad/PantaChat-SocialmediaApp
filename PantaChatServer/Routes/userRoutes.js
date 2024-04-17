const express = require('express');
const { signupUser, loginUSer, logoutUSer, followUnfollowUser, updateUser, getUserProfile, getSuggestedUSer } = require('../controllers/userController');
const protectRout = require('../middlewares/protectRoutes');

const router = new express.Router()

router.get('/profile/:query',getUserProfile);

router.get('/suggested',protectRout,getSuggestedUSer);


router.post('/signup',signupUser);

router.post('/login',loginUSer);

router.post('/logout',logoutUSer);

//to follow and unfollow


router.post('/follow/:id',protectRout,followUnfollowUser);


//to update user

router.put('/update/:id',protectRout,updateUser);





module.exports =router