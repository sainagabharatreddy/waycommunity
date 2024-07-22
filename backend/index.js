const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;


app.use(express.json());
app.use(cors());


const uri = process.env.MONGODB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Hello, this is your Express app!');
});

const userRoute = require('./routes/userRoute');  
app.use('/api', userRoute);  

const postRoute = require('./routes/postRoute')
app.use('/apis', postRoute);


const commentRoute = require('./routes/commentRoute')
app.use('/apic', commentRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
