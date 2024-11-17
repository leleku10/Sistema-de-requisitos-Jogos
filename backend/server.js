const express = require('express');
const cors = require('cors'); // Importando o pacote CORS
const { connectDB } = require('./db');
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');
const configRoute = require('./routes/configRoute');
const comparasionRoute = require('./routes/comparasionRoute');
const authService = require('./services/authService');
const app = express();
const port = process.env.PORT || 8800;

// Middleware para receber o req JSON
app.use(express.json());
app.use(cors());

// Conectar no DB
connectDB();



// Definindo as rotas
app.use('/', userRoute);
app.use('/', gameRoute);
app.use('/', configRoute);
app.use('/', comparasionRoute);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
