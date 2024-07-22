const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postText: { type: String, required: true },
    createdAt: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
