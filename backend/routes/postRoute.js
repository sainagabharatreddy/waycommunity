const Post = require("../model/Post");
const express = require('express');
const router = express.Router();
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy').populate('likes').populate({path:'comments' , populate:{path:'createdBy' , model:'User'}}).sort({'createdAt': -1});
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.post('/userpost', async (req, res) => {
    try {
        const data = {
            postText: req.body.postText,
            createdAt: req.body.createdAt,
            createdBy: req.body.createdBy,
            imageUrl: req.body.imageUrl
        };

        const postRes = await Post.create(data);
        res.status(201).json(postRes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/likes/:postId', async (req, res) => {
    
    try{
        const postId=req.params.postId;
        const data={
         userId:req.body.userId,
         isLike:req.body.isLike
        }
         const post=await Post.findById(postId);
         if(!post.likes)
         {
             const updatePost=await Post.findByIdAndUpdate(postId,{likes:[]},
                { upsert:true,
                 runValidators:true
                 }
             );
             await updatePost.save();
         }
         const updatedPost=await Post.findById(postId);
         data.isLike
         ?updatedPost.likes.push(data.userId)
         :updatedPost.likes.pop(data.userId);
         const result=await updatedPost.save()
         res.status(201).json(result);
     }catch(error)
     {
         res.status(500).json({message:error.message})
     }
});


module.exports = router;
