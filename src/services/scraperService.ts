import { getHtmlPage } from "@/utils/domUtils";
import { JSDOM } from "jsdom";
import { config } from "../config/config";

// Definição de tipos para os dados do jogo
interface TeamData {
  name: string | null;
  score: string | null;
  odds: string | null;
}

interface GameData {
  competitionName: string | null;
  timeMatch: string | null;
  teams: {
    home: TeamData;
    away: TeamData;
    drawOdds: string | null;
  };
}

const scrape = async (): Promise<GameData[]> => {
  try {
    const html = await getHtmlPage(config.BASE);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const competitions = document.querySelectorAll(
      "div.ovm-CompetitionList > div"
    );

    const results: GameData[] = [];

    competitions.forEach((competition) => {
      const competitionName = competition.querySelector(
        ".ovm-CompetitionHeader_NameText"
      )?.textContent ?? null;

      competition.querySelectorAll(".ovm-Fixture_Container").forEach((match) => {
        const timeMatch = match.querySelector(
          ".ovm-FixtureDetailsTwoWay_Timer.ovm-InPlayTimer"
        )?.textContent ?? null;

        // Home
        const teamHome = match.querySelector(
          "div:nth-child(1) > div.ovm-FixtureDetailsTwoWay_TeamName"
        )?.textContent ?? null;
        const teamHomeStandardScore = match.querySelector(
          ".ovm-StandardScoresSoccer_TeamOne"
        )?.textContent ?? null;
        const teamHomeOdds = match.querySelector(
          "div.ovm-MarketGroup > div > div > div:nth-child(1) > span"
        )?.textContent ?? null;

        // Away
        const teamAway = match.querySelector(
          "div:nth-child(2) > div.ovm-FixtureDetailsTwoWay_TeamName"
        )?.textContent ?? null;
        const teamAwayStandardScore = match.querySelector(
          ".ovm-StandardScoresSoccer_TeamTwo"
        )?.textContent ?? null;
        const teamAwayOdds = match.querySelector(
          "div.ovm-MarketGroup > div > div > div:nth-child(3) > span"
        )?.textContent ?? null;

        // Draw odds
        const drawOdds = match.querySelector(
          "div.ovm-MarketGroup > div > div > div:nth-child(2) > span"
        )?.textContent ?? null;

        // Cria um objeto representando o jogo e adiciona ao array results
        const gameData: GameData = {
          competitionName,
          timeMatch,
          teams: {
            home: {
              name: teamHome,
              score: teamHomeStandardScore,
              odds: teamHomeOdds,
            },
            away: {
              name: teamAway,
              score: teamAwayStandardScore,
              odds: teamAwayOdds,
            },
            drawOdds,
          },
        };

        results.push(gameData);
      });
    });

    return results;
  } catch (error: any) {
    console.error("Error scraping bet365:", error);
    throw new Error(`Failed to scrape the page: ${error.message}`);
  }
};

export default { scrape };
