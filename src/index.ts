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
import fetchJavaUUID from "./fetchJavaUUID.ts";
const finished: IWhitelist[] = [];


async function jsonGen() {
  for (const name of whitelist) {
    finished.push({
      uuid: `${await fetchJavaUUID(name)}`,
      name: `${name}`,
    });
    // finished.push({
    //   uuid: `${await fetchUUID(name)}`,
    //   name: `.${name}`,
    // });
  }
  // console.log(finished);
  return finished;
}

console.log(await jsonGen());

// something something for workaround I forgot lol
export { fetchJavaUUID };

