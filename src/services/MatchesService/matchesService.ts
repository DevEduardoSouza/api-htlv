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
}

interface IMatch {
  id: number;
  time: string;
  event: IEvent;
  stars: number;
  maps: string;
  teams: ITeam[];
}

const { BASE, MATCHES } = config;

const getMatches= async () => {
  try {
    const html = await getHtmlPage(`${BASE}/${MATCHES}`);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    return { msg: "sucesso" };
  } catch (error: any) {
    console.error("Error scraping htlv:", error);
    throw new Error(`Failed to scrape the page: ${error.message}`);
  }
};

export default { getMatches };
