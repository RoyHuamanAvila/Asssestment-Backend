const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;


app.listen(PORT, async () => {
    connectToMongo();
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

