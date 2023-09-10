import express from "express"
import dotenv from "dotenv"
import {connected} from "./config/database.js"
import userRouter from "./routes/userRoutes.js"
import blogRouter from "./routes/blogRoutes.js"


dotenv.config()

const PORT = process.env.PORT || 5000


const app = express()
app.use(express.json())
connected()

// Routes
app.use('/api/auth/user',userRouter)
app.use('/api/auth/blog',blogRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
