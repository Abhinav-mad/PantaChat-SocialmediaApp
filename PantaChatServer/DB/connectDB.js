const mongoose = require('mongoose')
    
exports.connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			// To avoid warnings in the console
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
