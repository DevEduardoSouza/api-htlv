import { getHtmlPage } from "@/utils/domUtils";
import { JSDOM } from "jsdom";
import { config } from "../../config/config";

interface IEvent {
  name: string;
  logo: string;
}

interface ITeam {
  name: string;
  logo: string;
  resultScore: number;
}

interface IResult {
  event: IEvent;
  maps: string;
  date: string;
  teams: ITeam[];
  matchId: number;
  matchLink: string;
}

const { BASE, RESULTS } = config;

const getResults = async () => {
  try {
    const html = await getHtmlPage(`${BASE}/${RESULTS}`);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results: IResult[] = [];

    const resultsSublist = document.querySelectorAll(
      ".results-holder.allres .results-all .results-sublist"
    );

    resultsSublist.forEach((sublist) => {
      const subs: NodeListOf<HTMLElement> =
        sublist.querySelectorAll(".result-con");

      const date =
        sublist.querySelector(".standard-headline")?.textContent || "";

      subs.forEach((sub) => {
        const team1LogoElement = sub.querySelector(
          ".line-align.team1 img"
        ) as HTMLImageElement;

        const team2LogoElement = sub.querySelector(
          ".line-align.team2 img"
        ) as HTMLImageElement;

        const eventLogoElement = sub.querySelector(
          ".event img"
        ) as HTMLImageElement;

        const matchLinkElement = sub.querySelector(
          ".a-reset"
        ) as HTMLLinkElement;

        const team1: ITeam = {
          name:
            sub.querySelector(".line-align.team1 .team")?.textContent || "",
          logo: team1LogoElement?.src || "",
          resultScore: Number(
            sub.querySelector(".result-score span:first-child")?.textContent ||
              ""
          ),
        };

        const team2: ITeam = {
          name:
            sub.querySelector(".line-align.team2 .team")?.textContent || "",
          logo: team2LogoElement?.src || "",
          resultScore: Number(
            sub.querySelector(".result-score span:last-child")?.textContent || ""
          ),
        };

        const event: IEvent = {
          name: sub.querySelector(".event .event-name")?.textContent || "",
          logo: eventLogoElement?.src || "",
        };

        const matchLink = matchLinkElement?.href || "";

        const maps = sub.querySelector(".star-cell .map-text")?.textContent || "";

        const link = sub.querySelector(".a-reset") as HTMLLinkElement;

        const id = Number(link.href.split("/")[2]);

        const result: IResult = {
          matchId: id,
          date,
          teams: [team1, team2],
          event,
          maps: maps,
          matchLink: matchLink,
        };

        results.push(result);
      });
    });

    return { data: results };
  } catch (error) {
    console.log(error);
  }
};

export default { getResults };
