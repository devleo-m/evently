import bodyParser from "body-parser";
import express from "express";
import sequelize from "../config/database";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
        app.listen(port, () => {
        console.log(`Servidor iniciado em http://localhost:${port}`);
        });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados', err);
});
