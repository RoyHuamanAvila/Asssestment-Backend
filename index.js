const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.listen(PORT, async () => {
    console.log(`Listen on port ${PORT}`)
})
