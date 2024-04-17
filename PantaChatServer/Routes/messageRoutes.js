const express = require('express');
const router = new express.Router()
const protectRout = require('../middlewares/protectRoutes');
const { sendMessage, getMessages, getConversations } = require('../controllers/messageController');



router.get("/conversations",protectRout, getConversations);
router.get("/:otherUserId",protectRout, getMessages);
router.post("/",protectRout, sendMessage);



module.exports =router