const express = require('express');
const { connectDB } = require('./db');
const userRoute = require('./routes/userRoute');
const gameRoute = require('./routes/gameRoute');
const configRoute = require('./routes/configRoute');
const authRoute = require('./routes/authRoute');
const comparasionRoute = require('./routes/comparasionRoute');
const cors = require('cors');

const app = express();

const port = process.env.port || 8800;

const corsOptions = {
    origin: "http://localhost:3000",  // Permitir requisições de http://localhost:3000 (sem a barra final)
    methods: ["GET", "POST", "PUT", "DELETE"],  // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"],  // Cabeçalhos permitidos
  };
  
  app.use(cors(corsOptions));  // Aplica a configuração do CORS
  

//Conectar no DB
connectDB();

//Middleware para receber o req JSON
app.use(express.json());

app.use('/', userRoute);
app.use('/', gameRoute);
app.use('/', configRoute);
app.use('/', comparasionRoute);
app.use('/', authRoute);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});