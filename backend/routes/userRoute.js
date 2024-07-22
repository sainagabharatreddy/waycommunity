// routes/userRoute.js
const express = require('express');
const router = express.Router();

const User= require('../model/User.js')

router.get('/users', async (req, res) => {
    
    try{
        const user = await User.find();
        res.json(user);

    }
    catch(e){
        res.status(500).json({message: e.message})

    }
});

router.post('/user', async (req, res) => {
    
    try{
         const data = {
            name:req.body.name,
            email:req.body.email,
            image:req.body.image
         }
        const userRef = await User.findOneAndUpdate(data, data, {
            new: true,
            upsert:true,
            runValidators:true
        })
        const userRes = await userRef.save()
        res.status(201).json(userRes)

    }
    catch(e){
        res.status(500).json({message: e.message})

    }
});

router.get('/:email',async(req,res)=>{
    const userEmail=req.params.email;
    try{
        const users=await User.findOne({email:userEmail});
        res.json(users)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})
module.exports = router;
