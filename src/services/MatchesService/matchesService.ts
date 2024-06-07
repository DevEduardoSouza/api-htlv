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

interface IMatch {
  id: number;
  time: string;
  event: IEvent;
  stars: number;
  maps: string;
  teams: ITeam[];
  date: string;
}

const { BASE, MATCHES } = config;

const getMatches = async () => {
  try {
    const html = await getHtmlPage(`${BASE}/${MATCHES}`);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const matches: IMatch[] = [];

    const upcomingMatches = document.querySelectorAll(
      ".upcomingMatchesSection"
    );

    upcomingMatches.forEach((upcomingMatch) => {
      const matchElements = upcomingMatch.querySelectorAll(".upcomingMatch");

      matchElements.forEach((matchElement) => {
        const date =
        upcomingMatch.querySelector(".matchDayHeadline")?.textContent || "";
        const idTeam1 = matchElement.getAttribute("team1");
        const idTeam2 = matchElement.getAttribute("team2");

        const eventNameElement = matchElement.querySelector(
          ".matchEventName.gtSmartphone-only"
        );

        const eventLogoElement = matchElement.querySelector(
          ".matchEventLogoContainer img"
        ) as HTMLImageElement;

        const eventName = eventNameElement?.textContent;
        if (!eventName) {
          // Se o nome do evento não estiver presente, pule para o próximo match
          return;
        }

        // Event
        const event: IEvent = {
          name: eventNameElement?.textContent || "TBD",
          logo: eventLogoElement?.src || "",
        };

        // Teams
        const team1LogoElement = matchElement.querySelector(
          ".matchTeam.team1 .matchTeamLogoContainer img"
        ) as HTMLImageElement;

        const team2LogoElement = matchElement.querySelector(
          ".matchTeam.team2 .matchTeamLogoContainer img"
        ) as HTMLImageElement;

        const team1: ITeam = {
          name:
            matchElement.querySelector(
              ".matchTeam.team1 .matchTeamName.text-ellipsis"
            )?.textContent || "NA",
          logo: team1LogoElement?.src || "",
          id: Number(idTeam1),
        };

        const team2: ITeam = {
          name:
            matchElement.querySelector(
              ".matchTeam.team2 .matchTeamName.text-ellipsis"
            )?.textContent || "NA",
          logo: team2LogoElement?.src || "",
          id: Number(idTeam2),
        };

        // Obtendo o link correto para o match atual
        const link = matchElement.querySelector(
          "a.match.a-reset"
        ) as HTMLLinkElement;

        const id = Number(link.href.split("/")[2]);

        const stars = Number(matchElement.getAttribute("stars"));
        const time =
          matchElement.querySelector(".matchTime")?.textContent || "";
        const maps =
          matchElement.querySelector(".matchMeta")?.textContent || "";

        // Adicione outras propriedades aqui, se necessário
        const match: IMatch = {
          id: id,
          time: time,
          event: event,
          stars: stars,
          maps: maps,
          teams: [team1, team2],
          date: date,
        };

        matches.push(match);
      });
    });

    return { data: matches };
  } catch (error: any) {
    console.error("Error scraping htlv:", error);
    throw new Error(`Failed to scrape the page: ${error.message}`);
  }
};

export default { getMatches };
