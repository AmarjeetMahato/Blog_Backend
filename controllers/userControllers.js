import User from "../model/User.js";
import bcrypt from "bcrypt"


export const getUser = async (req,res,next)=> {

    try {
        const user = await User.find();

        if(!user) return res.status(404).json('No User found!')

        return res.status(200).json(user)
  } catch (error) {
     console.log(error);
     return res.status(500).json({msg:`Somthing went wrong ${error}`})
  }


}



export const signUp = async (req,res,next)=> {

    const {name, email, password} = await req.body ; 
    try {
           if(!name || !email || !password) return new Error("Invalid Credentials")
           const existUser = await User.findOne({email})

           if(existUser) return new Error("User already exist..")
        
           const salt = await bcrypt.genSaltSync(10)
           const hashedPassword = await bcrypt.hashSync(password, salt)

           const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            blogs:[]
           })

           await newUser.save()

           return res.status(201).json("User has been Created...")
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Something went wrong ${error}`})
    }

}




export const signIn = async(req,res,next)=> {

    const {email,password} = await req.body;

    try {
        //    Check the email
          const user = await  User.findOne({email})

          if(!user) return  res.status(404).json("User not found")

          const checkedPassword = await bcrypt.compareSync(password, user.password) 
          if(!checkedPassword) {
            return res.status(400).json("Wrong Password..")
          }

          await user.save()
          return res.status(200).json("User logged In")
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:`Something went wrong ${error}`})
    }
}