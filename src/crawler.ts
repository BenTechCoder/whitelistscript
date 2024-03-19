import { PlaywrightCrawler } from "crawlee";
import { KeyValueStore } from "crawlee";
import fetchJavaUUID from "./fetchJavaUUID.ts";
import { addPlayer } from "./db/db.ts";
const name = process.argv[2];

export async function fetchBedrockUUID(name: string): Promise<string | null> {
  const crawler = new PlaywrightCrawler({
    headless: true,
    maxConcurrency: 1,
    preNavigationHooks: [
      async () => {
        // sleep for 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
    ],
    //navigationTimeoutSecs: 1500,
    async requestHandler({ page }) {
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
        await KeyValueStore.setValue("OUTPUT", "none");
        await page.locator(".btn-primary").click();
      } else {
        const bedrockUUID = await page
          .locator('tr:has-text("Floodgate UUID") td code')
          .innerText();
        await KeyValueStore.setValue("OUTPUT", bedrockUUID);
        await page.locator(".btn-primary").click();
      }
    },
    async failedRequestHandler({ request }) {
      // This function is called when the crawling of a request failed too many times
      console.log(request.errorMessages);
    },
  });
  await crawler.run(["https://mcprofile.io/"]);
  console.log(await KeyValueStore.getValue("OUTPUT"));
  return await KeyValueStore.getValue("OUTPUT");
}

async function add2DB(name: string) {
  let javaUUID: string = await fetchJavaUUID(name);
  let bedrockUUID: any = await fetchBedrockUUID(name);
  addPlayer(name, javaUUID, bedrockUUID);
  console.log(` added with ${javaUUID}, ${bedrockUUID}`);
  return `added with ${javaUUID}, ${bedrockUUID}`;
}

await add2DB(name);

// const lol = await fetchBedrockUUID("FIREPILOT22");
// console.log(lol)
