import PostMessage from "../modules/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const { body } = req;
    const newPost = new PostMessage(body);

    try {
       await newPost.save();
       res.status(201).json(newPost);
        
    } catch (err) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const deletedPost = await PostMessage.findByIdAndRemove(_id);
    res.json({deletedPost, message: 'post was deleted'});
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.statusCode(404).send('No post with that id');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);
}


