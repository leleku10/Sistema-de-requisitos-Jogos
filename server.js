const express = require('express');
const connectDB = require('./db');
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');

const app = express();

const port = process.env.port || 8800;

//Conectar no DB
connectDB();

//Middleware para receber o req JSON
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});