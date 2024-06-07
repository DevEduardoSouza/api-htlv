import { JSDOM } from "jsdom";
import { chromium } from "playwright";

export const getHtmlPage = async (url: string) => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    await page.waitForTimeout(2000);
    await page
      .locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
      .click();

    const html = await page.content();
    await browser.close();
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
