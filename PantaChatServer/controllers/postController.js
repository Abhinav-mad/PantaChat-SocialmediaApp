const Post = require("../Modals/postSchema")
const User = require("../Modals/userSchema")
const {v2 : cloudinary} = require('cloudinary')



exports.createPost = async (req,res)=>{
    try {
        const { postedBy, text } = req.body
		let { img } = req.body

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" })
		}

		const user = await User.findById(postedBy)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" })
		}

		const maxLength = 500
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` })
		}

		
		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img)
			img = uploadedResponse.secure_url
		}

	
		const newPost = new Post({ postedBy, text, img })
		await newPost.save()

		res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in createPost function: ", error.message)	
	 
    }
}


exports.getPost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		res.status(200).json(post)

        
    } catch (error) {
        
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in getPost function: ", error.message)	
	 
    }
}

exports.deletePost =  async (req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)
		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		} else {

		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" })
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0]
			await cloudinary.uploader.destroy(imgId)
		}

		await Post.findByIdAndDelete(req.params.id)

		res.status(200).json({ message: "Post deleted successfully" })

}

    } catch (error) {
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in delPost function: ", error.message)	
	 
    }
}


exports.likeAndUnliked = async (req,res)=>{
    try {

        const { id: postId } = req.params
		const userId = req.user._id

		const post = await Post.findById(postId)

		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}
        else{

		const userLikedPost = post.likes.includes(userId)

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
			res.status(200).json({ message: "Post unliked successfully" })
		} else {
			// Like post
			post.likes.push(userId)
			await post.save()
			res.status(200).json({ message: "Post liked successfully" })
		}
        }
    } catch (error) {
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in likeFunction function: ", error.message)	
	 
    }
}

exports.replyToPost =async (req,res)=>{
	console.log("inside replyToPos")
    try {
        const { text } = req.body
		const postId = req.params.id
		const userId = req.user._id
		const userProfilePic = req.user.profilePic
		const username = req.user.username

		if (!text) {

			return res.status(400).json({ error: "Text field is required"})

		}

		const post = await Post.findById(postId)
		if (!post) {
			return res.status(404).json({ error: "Post not found" })
		}

		const reply = { userId, text, userProfilePic, username }

		post.replies.push(reply)
		await post.save()

		res.status(200).json(reply)
    } catch (error) {
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in replyToPost function: ", error.message)	
    }
}

exports.getFeedsPosts = async (req,res) => {
	try {
		const userId = req.user._id
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const following = user.following

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })

		res.status(200).json(feedPosts)
    } catch (error) {
        res.status(500).json(`error : ${error.message}`)
        console.log("Error in getFeedPost function: ", error.message)	
    }
}		


exports.getUserPosts = async (req,res)=>{
    const {username} = req.params
  try {
	const user = await User.findOne({ username })
		if (!user) {
			return res.status(404).json({ error: "User not found" })
		}

		const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 })

		res.status(200).json(posts)
	
  } catch (error) {
	res.status(500).json(`error : ${error.message}`)
	console.log("Error in getUserPOsts function: ", error.message)	
	
  }

}