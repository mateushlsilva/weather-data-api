import cors = require("cors");
import { Router, Request, Response } from "express";
import climate from './climate.route'

const routes = Router()

routes.use(cors());
routes.use("/climate", climate)

routes.use((req: Request, res: Response) => res.status(404).json({ error: "Requisição desconhecida" }));

export default routes;