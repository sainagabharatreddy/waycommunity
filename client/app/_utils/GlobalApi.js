const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000'
});

const createUser = (data) => axiosClient.post('/api/user', data);
const getUserByEmail = (email) => axiosClient.get('/api/' + email);
const createPost = (data) => axiosClient.post('/apis/userpost', data);
const getAllPost = () => axiosClient.get('/apis/posts');
const onPostLike=(postId,data)=>axiosClient.put("/apis/likes/"+postId,data)
const addComment = (data)=>axiosClient.post('/apic/comments', data)
const deleteComment=(commentId)=>axiosClient.delete("/apic/"+commentId)


export default {
    createUser,
    getUserByEmail,
    createPost,
    getAllPost,
    onPostLike,
    addComment,
    deleteComment
    
};
