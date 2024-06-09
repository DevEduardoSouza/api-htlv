import { getHtmlPage } from "@/utils/domUtils";
import { JSDOM } from "jsdom";
import { config } from "../../config/config";

interface IEvent {
  name: string;
  logo: string;
}

interface ITeam {
  id: number;
  name: string;
  logo: string;
}

interface IResult {
  event: IEvent;
  maps: string;
  time: string;
  teams: ITeam[];
  matchId: number;
}

const { BASE, RESULTS } = config;

 const getResults = async () => {
  const html = await getHtmlPage(`${BASE}/${RESULTS}`);
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const results: IResult[] = [];

  const resultsSublist = document.querySelectorAll(".results-sublist");

  resultsSublist.forEach((sublist) => {
    const date = sublist.querySelector(".standard-headline")?.textContent || "";
    
    const team1LogoElement = sublist.querySelector(
      ".line-align.team1 img"
    ) as HTMLImageElement;

    const team2LogoElement = sublist.querySelector(
      ".line-align.team2 img"
    ) as HTMLImageElement;

    const team1: ITeam = {
      id: 1,
      name: sublist.querySelector(".line-align.team1 .team")?.textContent || "",
      logo: team1LogoElement?.src || "",
    };

    const team2: ITeam = {
      id: 1,
      name: sublist.querySelector(".line-align.team2 .team")?.textContent || "",
      logo: team2LogoElement?.src || "",
    };

    const event: IEvent = {
      name: sublist.querySelector(".line-align.event")?.textContent || "",
      logo: "",
    };
  });

  return { data: results };
};

export default { getResults };
