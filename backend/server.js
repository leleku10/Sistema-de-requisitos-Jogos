const express = require('express');
const { connectDB } = require('./db');
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');
const configRoute = require('./routes/configRoute');
const comparasionRoute = require('./routes/comparasionRoute');
const token = require('./services/authService');

token();

const app = express();

const port = process.env.port || 8800;

//Conectar no DB
connectDB();

//Middleware para receber o req JSON
app.use(express.json());

app.use('/', userRoute);
app.use('/', gameRoute);
app.use('/', configRoute);
app.use('/', comparasionRoute);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});