import { Router } from "express";
import { ClimateController } from "../controllers";

const routes = Router()

routes.get('/find/:city', ClimateController.getCurrentClimate)
routes.get('/history/:city', ClimateController.getClimateHistory)

export default routes