import { Request, Response } from "express";
import scraperService from "../services/scraperService";
import matchesService from "@/services/MatchesService/matchesService";

export const startScraping = async (req: Request, res: Response) => {
  try {
    const data = await scraperService.scrape();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
};

export const matchesController = async (req: Request, res: Response) => {
  try {
    const data = await matchesService.getMatches();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
};
