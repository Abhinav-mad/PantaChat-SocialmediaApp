const path = require("path")
require('dotenv').config()
const express  = require('express')
const cors  =require('cors')
const { connectDB } = require('./DB/connectDB')
const cookieParser = require('cookie-parser')
const userRoutes = require('./Routes/userRoutes')
const postRoutes = require('./Routes/postRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const {v2 : cloudinary} = require('cloudinary')
const {app,server} = require('./socket/socket')
connectDB()
          



const PORT = process.env.PORT  || 3000
__dirname = path.resolve();
  
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SCRT 
  });


app.use(express.json({limit:"60mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//Routes

app.use("/api/users",userRoutes)

app.use("/api/posts",postRoutes)

app.use("/api/messages",messageRoutes)






//localhot:3000 for both frontend ,backend
console.log("before if block")
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV==="production") {
	app.use(express.static(path.join(__dirname, "PantaChat","dist")));
 console.log("inside production mode")
}	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "PantaChat", "dist", "index.html"));
	});

  console.log("Current working directory:", __dirname);
console.log("Resolved path:", path.resolve(__dirname, "PantaChat", "dist", "index.html"));
  console.log("after if block")
  console.log(process.env.NODE_ENV)


server.listen(PORT,()=> console.log(`server started at Port ${PORT}` ))                