import { PlaywrightCrawler } from "crawlee";
//import { IWhitelist, whitelist } from "./whitelist";

const crawler = new PlaywrightCrawler({
  async requestHandler({ page, request }) {
    // This function is called to extract data from a single web page
    // 'page' is an instance of Playwright.Page with page.goto(request.url) already called
    // 'request' is an instance of Request class with information about the page to load
    const gamertagInput = page.locator(".form-control");
    console.log(gamertagInput)
    console.log(request.url)
  },
  async failedRequestHandler({ request }) {
    // This function is called when the crawling of a request failed too many times
    console.log(request.errorMessages);
  },
});

await crawler.run(["https://www.cxkes.me/xbox/xuid"]);
