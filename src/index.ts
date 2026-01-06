import express from "express";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
    console.log(`Documentação em /doc`)
});