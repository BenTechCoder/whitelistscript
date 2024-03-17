import Database from "better-sqlite3";

const db = new Database("./src/db/whitelist.db");
db.pragma("journal_mode = WAL");

const getCy = db.prepare("SELECT * FROM Whitelist WHERE gamertag = ?");
console.log(getCy.get("cy499Studio"));

// SQL stmnts for the functions

const insertPlayer = db.prepare("INSERT INTO Whitelist (gamertag, java_uuid, bedrock_uuid) VALUES (?, ?, ?)");

//const insertPlayerBedrock = db.prepare();

//

export function addPlayer(gamertag: string, javaUUID: string, bedrockUUID: string|null) {
    insertPlayer.run(gamertag, javaUUID, bedrockUUID)
}

//function addPlayerJava(UUID: string) {}

//function addPlayerBedrock(UUID: string) {}

// function updatePlayer(params:type) {

// }

// function removePlayer(params:type) {

// }

// function playerExists(params:type) {

// }

/*
TODO:
1. ADD PLAYER FUNCTION
2. CHECK PLAYER-EXSISTS FUNCTION
3. REMOVE PLAYER FUNCTION
4. UPDATE PLAYER FUNCTION 
*/
