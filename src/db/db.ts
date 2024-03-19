import Database from "better-sqlite3";

type Player = {
  gamertag: string;
  java_uuid: string;
  bedrock_uuid: string;
};

const db = new Database("./src/db/whitelist.db");
db.pragma("journal_mode = WAL");

// SQL stmnts for the functions

const insertPlayer = db.prepare(
  "INSERT INTO Whitelist (gamertag, java_uuid, bedrock_uuid) VALUES (?, ?, ?)"
);

const selectPlayerByGamertag = db.prepare(
  "SELECT * FROM Whitelist WHERE gamertag = ?"
);

//const insertPlayerBedrock = db.prepare();

//

export function addPlayer(
  gamertag: string,
  javaUUID: string,
  bedrockUUID: string | null
) {
  insertPlayer.run(gamertag, javaUUID, bedrockUUID);
}

export function queryPlayer(name: string) {
  const player: Player = selectPlayerByGamertag.get(name) as Player;
  if (player === undefined) {
    return undefined;
  } else {
    return player;
  }
}

// function updatePlayer(params:type) {

// }

// function removePlayer(params:type) {

// }

//function addPlayerJava(UUID: string) {}

//function addPlayerBedrock(UUID: string) {}

/*
TODO:
1. ADD PLAYER FUNCTION ✅
2. CHECK PLAYER-EXSISTS FUNCTION✅
3. REMOVE PLAYER FUNCTION
4. UPDATE PLAYER FUNCTION 
*/
queryPlayer("Cyb3rBac0n");
