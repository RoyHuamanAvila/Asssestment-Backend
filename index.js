const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    connectToMongo();
    routes(app);
    console.log(`Listen on port ${PORT}`)
})

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB!!')
    } catch (error) {
        console.error('Error connecting to MongoDB', error)
        process.exit(1)
    }
}
