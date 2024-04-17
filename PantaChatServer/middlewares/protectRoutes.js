const User = require("../Modals/userSchema");
const jwt = require("jsonwebtoken")
const  protectRout = async (req,res,next)=>{
    try {
        console.log("inside protectRout")
        const token = req.cookies.jwt;
        
		if (!token){
            return res.status(401).json('Authorization failed! please try again');
        } 

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");

		req.user = user;

		next();
    } catch (error) {
        
		res.status(406).json(`error : ${error.message}`)
        console.log("Error in protectRout: ", error.message);	
    }
}

module.exports = protectRout