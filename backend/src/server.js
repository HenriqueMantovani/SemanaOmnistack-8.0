const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

// conexão com banco MongoDB
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-1vsqb.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);