

import express  from "express"
import { getUser, signIn, signUp } from "../controllers/userControllers.js"


const router = express.Router()


router.get("/",getUser)
router.post("/signUp",signUp)
router.post("/signIn",signIn)




export default router

