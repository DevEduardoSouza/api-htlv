import { JSDOM } from "jsdom";
import { firefox } from "playwright";

export const getHtmlPage = async (url: string) => {
  try {
    const browser = await firefox.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);


    await page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();
    await page.waitForTimeout(1000);

    const html = await page.content();
    return html;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
};

export const getTextContent = (html: string, selector: string) => {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  return element ? element.textContent : null;
};
