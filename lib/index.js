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
const whitelist = [
    "Cyb3rBac0n",
    "Herobrine3953",
    "DREW_BONKERS_",
    "starpilot999",
    "SoliasDream",
    "FIREPILOT22",
    "Flintsteel351",
    "cytron499",
];
const finished = [];
async function fetchUUID(name) {
    const response = await fetch(`https://playerdb.co/api/player/minecraft/${name}`);
    const UUID = await response.json();
    // console.log(await UUID.data.player.raw_id)
    return await UUID.data.player.raw_id;
}
async function jsonGen() {
    for (const name of whitelist) {
        finished.push({
            uuid: `${await fetchUUID(name)}`,
            name: `${name}`,
        });
    }
    // console.log(finished);
    return finished;
}
console.log(await jsonGen());
export {};
