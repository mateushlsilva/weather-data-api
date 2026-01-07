import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import routes from "./routes";
import { setupSwagger } from "./docs";


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
setupSwagger(app)

app.use(routes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
    console.log(`Documentação em /docs`)
});