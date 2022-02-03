import "reflect-metadata"; //deve ser a primeira importação
import express from "express";
import "express-async-errors";
import "../typeorm"; //cria conexão com o banco
import routes from "./routes/index.routes";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, ()=>{
    console.log("Servidor Iniciado!");
});