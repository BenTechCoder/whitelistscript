/* 
[
  {
    "uuid": "f430dbb6-5d9a-444e-b542-e47329b2c5a0",
    "name": "username"
  },
  {
    "uuid": "e5aa0f99-2727-4a11-981f-dded8b1cd032",
    "name": "username"
  }
]
*/

import { IWhitelist, whitelist } from "./whitelist.ts";
import { queryPlayer } from "./db/db.ts";
const finished: IWhitelist[] = [];

async function jsonGen() {
  for (const name of whitelist) {
    const player = await queryPlayer(name);
    if (player?.java_uuid !== undefined) {
      finished.push({
        uuid: `${player.java_uuid}`,
        name: `${name}`,
      });
    }
    if (player?.bedrock_uuid !== "none") {
      finished.push({
        uuid: `${player?.bedrock_uuid}`,
        name: `.${name}`,
      });
    }
  }
  console.log(finished);
  return finished;
}

console.log(await jsonGen());

// something something for workaround I forgot lol
export {};
