import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';

import postsRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

app.use('/posts', postsRoutes);

const CONNECTION_URL = 'mongodb+srv://amit:TdiAcDPBvycTMrrk@cluster0.rw2u6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

