const { Server} =  require('socket.io')


const http =  require('http')

const express = require('express')


const Message = require("../Modals/messageSchema")
const Conversation  = require("../Modals/ConversationSchema")


const app =  express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:4000",
		methods: ["GET", "POST"],
	},
});


const getRecipientSocketId = (recipientId) => {
	return userSocketMap[recipientId];
};

const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	console.log("fffff")
	const userId = socket.handshake.query.userId;

	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
		try {
			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
			console.log(conversationId)
		} catch (error) {
			console.log(error);
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});


	
socket.on("connect_error", (err) => {
	console.error("Connection error:", err.message);
	// Handle the error appropriately
  });


});




module.exports = { io, server, app,getRecipientSocketId };