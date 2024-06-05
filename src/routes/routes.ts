import { Request, Response, Router } from "express";
import { startScraping, matchesController } from "../controllers/startScraping";

const routes = Router();

routes.get("/api/odds", (req: Request, res: Response) =>
  startScraping(req, res)
);

routes.get("/api/matches", (req: Request, res: Response) =>
  matchesController(req, res)
);

export default routes;
