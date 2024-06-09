import { Request, Response, Router } from "express";
import { startScraping, matchesController, resultsController } from "../controllers/startScraping";

const routes = Router();

routes.get("/api/odds", (req: Request, res: Response) =>
  startScraping(req, res)
);

routes.get("/api/matches", (req: Request, res: Response) =>
  matchesController(req, res)
);

routes.get("/api/results", (req: Request, res: Response) =>
  resultsController(req, res)
);


export default routes;
