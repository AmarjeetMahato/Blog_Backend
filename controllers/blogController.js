import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";


// Get All POST
export const getAllBlogs = async (req,res,next) => {
     try {
           const blogs = await Blog.find();

           if(!blogs) return res.status(404).json('No blogs found!')

           return res.status(200).json(blogs)
     } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Somthing went wrong ${error}`})
     }

}

// Create Post

export const addBlog = async (req,res,next)=> {
    const {title, description, image, user} = await req.body;

    try {
           const existUser = await User.findById(user)
           if(!existUser) return res.status(400).json({msg:`unable to find user by this Id`});

           const blog = new Blog({
            title,
            description,
            image,
            user
           })
           const session = await mongoose.startSession();
           session.startTransaction();
           await blog.save({session});
           existUser.blogs.push(blog);
           await existUser.save({session})
           await session.commitTransaction()
           await blog.save()
           return res.status(200).json({blog})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:`Somthing went wrong ${error}`}) 
    }
}

// Updated Post
export const updateBlog = async (req, res, next)=>{
    const {title,image, description} = await req.body;
       const blogsId = req.params.id;
      try {
        const blog = await Blog.findByIdAndUpdate(blogsId,{
            title, description, image
     })
     await blog.save();
     return res.status(200).json({blog})
      } catch (error) {
        console.log(error);
        return res.status(500).json({msg:` someting went wrong ${error}`})
      }
}


// Get POST by ID
export const getById = async (req, res, next)=> {
    const id = req.params.id;

    try {
            const blog = await Blog.findById(id)
            if(!blog) return res.status(404).json("No blog found..")

            return res.status(200).json({blog})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:` someting went wrong ${error}`})
    }
}



// Delete POST

export const deleteBlog = async(req,res,next)=> {
    const id = req.params.id;

    try {
          const blog = await Blog.findByIdAndRemove(id).populate('user');
          await blog.user.blogs.pull(blog);
          await blog.user.save();

          if(!blog) return res.status(404).json({msg:`unable to delete`})
          return res.status(200).json({msg:"Blog has been deleted.."})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:` someting went wrong ${error}`})
    }
}



export const getByUserId = async(req, res, next) => {
    const userId  = req.params.id;
    try {
        const userBlogs = await User.findById(userId).populate('blogs')
        if(!userBlogs) return res.status(404).json('user not found')

        return res.status(200).json({blogs:userBlogs})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:` someting went wrong ${error}`})
    }
}