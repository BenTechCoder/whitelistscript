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

const finished: IWhitelist[] = [];

async function fetchUUID(name: string) {
  const response = await fetch(
    `https://playerdb.co/api/player/minecraft/${name}`
  );

  // TODO: FIX the "any" workaround
  const UUID: any = await response.json();
  // console.log(await UUID.data.player.id)
  return await UUID.data.player.id;
}

async function jsonGen() {
  for (const name of whitelist) {
    finished.push({
      uuid: `${await fetchUUID(name)}`,
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


export { };

