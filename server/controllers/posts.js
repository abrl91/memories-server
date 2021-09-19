import PostMessage from "../modules/postMessage.js";

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
