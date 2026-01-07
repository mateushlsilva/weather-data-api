import { Request, Response } from "express";
import { ClimateService } from "../services";

class ClimateController {
    public async getClimateHistory(req: Request, res: Response): Promise<Response> {
        try {
            const city = req.params.city
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const data = await ClimateService.getClimateHistory(city, page, limit)

            return res.status(200).json(data)
        }
        catch (err) {
            console.error("Controller error:", err);

            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }

    public async getCurrentClimate(req: Request, res: Response): Promise<Response> {
        try {
            const city = req.params.city
            const data = await ClimateService.getCurrentClimate(city)
            return res.status(200).json(data)
        }
        catch (err) {
            console.error("Controller error:", err);

            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            });
        }
    }
}

export default new ClimateController()