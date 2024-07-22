const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    
    commentText:String,
    post:{
        type:mongoose.Schema.Types.ObjectId,ref:'Post'
    }
    ,createdAt:String,

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }
}, { timestamps: true });

const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;
