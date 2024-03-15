import Database from "better-sqlite3";

const db = new Database("./src/db/whitelist.db");
db.pragma("journal_mode = WAL");

const getCy = db.prepare("SELECT * FROM Whitelist");

console.log(getCy.raw().columns());


/*
TODO:
1. ADD PLAYER FUNCTION
2. CHECK PLAYER-EXSISTS FUNCTION
3. REMOVE PLAYER FUNCTION
4. UPDATE PLAYER FUNCTION 
*/
