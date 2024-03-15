import { PlaywrightCrawler } from "crawlee";
import { whitelist, IWhitelist } from "./whitelist.ts";

let UUIDs: IWhitelist[] = [];

const crawler = new PlaywrightCrawler({
  headless: true,
  //navigationTimeoutSecs: 1500,
  async requestHandler({ page }) {
    for (const name of whitelist) {
      const gamertagInput = page.locator(".form-control");
      const submitBtn = page.locator(`#search-submit`);
      await gamertagInput.fill(name);
      await submitBtn.click();
      const logicGate = await page.content();
      if (
        logicGate
          .toString()
          .includes(`<title>MCProfile - Account Not Found</title>`)
      ) {
        await page.locator(".btn-primary").click();
      } else {
        const UUID = await page
          .locator('tr:has-text("Floodgate UUID") td code')
          .innerText();
        UUIDs.push({
          uuid: UUID.toString(),
          name: `.${name}`,
        });
        await page.locator(".btn-primary").click();
      }
    }
    console.log(UUIDs);
  },
  async failedRequestHandler({ request }) {
    // This function is called when the crawling of a request failed too many times
    console.log(request.errorMessages);
  },
});

await crawler.run(["https://mcprofile.io/"]);
