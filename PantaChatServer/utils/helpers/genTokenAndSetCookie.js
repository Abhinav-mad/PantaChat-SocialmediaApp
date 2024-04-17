const jwt  =require('jsonwebtoken') 

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "360d",
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: 360 * 24 * 60 * 60 * 1000, // 360 days
		sameSite: "strict", // CSRF
	});

	return token;
};

module.exports = generateTokenAndSetCookie;