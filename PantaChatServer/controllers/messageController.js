const Message = require("../Modals/messageSchema")
const Conversation  = require("../Modals/ConversationSchema")



const {v2 : cloudinary} = require('cloudinary');
const { getRecipientSocketId } = require("../socket/socket");
const {io} = require("../socket/socket")

exports.sendMessage = async (req,res)=>{
    try {
        
		const { recipientId, message } = req.body;
		let { img } = req.body;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, recipientId] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, recipientId],
				lastMessage: {
					text: message,
					sender: senderId,
				},
			});
			await conversation.save();
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newMessage = new Message({
			conversationId: conversation._id,
			sender: senderId,
			text: message,      
			img: img || "",
		});

		await Promise.all([
			newMessage.save(),
			conversation.updateOne({
				lastMessage: {
					text: message,
					sender: senderId,
				},
			}),
		]);

		const recipientSocketId = getRecipientSocketId(recipientId);
		if (recipientSocketId) {
			io.to(recipientSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//get all messages


exports.getMessages = async(req,res)=>{
    const { otherUserId } = req.params;
	const userId = req.user._id;

    try {
        const conversation = await Conversation.findOne({
			participants: { $all: [userId, otherUserId] },
		});

		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const messages = await Message.find({
			conversationId: conversation._id,
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




exports.getConversations = async (req,res)=>{
    console.log("inside getConversatoins")
    
    const userId = req.user._id;
    try {
        
        //find all messages which userId is included in the participants array  
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		// remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


