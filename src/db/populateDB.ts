import { whitelist } from "../whitelist.ts";
import shell from "shelljs";
//import { addPlayer } from "./db.ts";

for (let i = 0; i < whitelist.length; i++) {
  shell.exec(`npx ts-node-esm src/crawler.ts ${whitelist[i]}`);
}
