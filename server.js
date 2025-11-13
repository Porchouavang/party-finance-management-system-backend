const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const cors = require('cors');
const path = require('path')
const app = express();
require('dotenv').config();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

app.use(bodyParser.json());
app.use("/api", router);

const PORT = 3001;

app.listen(PORT, () => {
    console.log("Server running on port 3001");
});