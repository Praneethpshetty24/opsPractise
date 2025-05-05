const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = 3000;
app.use(cors());
app.use(express.json());
const UserRoutes = require('./routes/UserRoutes');

app.use('/api', UserRoutes);

const mongoURI = process.env.MONGODB_URI;


app.get('/', (req, res) => {
    res.send("Hello World from Product API");
});

async function ConnectDB() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
        app.listen(port, () => {
            console.log("Server is running at port " + port);
        });
    } catch (err) {
        console.log("Error in establishing connection " + err);
    }
}

ConnectDB();
