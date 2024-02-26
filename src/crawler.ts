import { PlaywrightCrawler } from "crawlee";
import { whitelist } from "./whitelist.ts";

const crawler = new PlaywrightCrawler({
  headless: false,
  async requestHandler({ page }) {
    for (const name of whitelist) {
      const gamertagInput = page.locator(".form-control");
      const submitBtn = page.locator(`#search-submit`);
      await gamertagInput.fill(name);
      await submitBtn.click();
      if (await page.locator("table").isVisible()) {
        const UUID = await page
          .locator('tr:has-text("Floodgate UUID") td code')
          .innerText();
        console.log(UUID);
      }
        await page.locator('.btn-primary').click();
    }
  },
  async failedRequestHandler({ request }) {
    // This function is called when the crawling of a request failed too many times
    console.log(request.errorMessages);
  },
});

await crawler.run(["https://mcprofile.io/"]);

/*

   const gamertagInput = page.locator(`[name="gamertag"]`);
    const submitBtn = page.locator(`[title="Get XUID"]`);
    await gamertagInput.fill("cytron499");
    await submitBtn.click();
    // const UUIDHex = page.locator(`[id="xuidHex"]`)
    //const UUID:string = `00000000-0000-0000-${Array.from(UUIDHex).slice(0,3).join("")}-${(Array.from(UUIDHex).slice(4).join(""))})`
    console.log(await page.locator(`[id="xuidHex"]`).textContent());
    // value to select on succesfull request id="xuidHex"
*/
