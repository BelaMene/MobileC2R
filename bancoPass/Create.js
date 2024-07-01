import * as SQLite from 'expo-sqlite';

export const create = async () => {
    let db = null;
    try {
        db = await SQLite.openDatabaseAsync('weightControlDB');
        await db.execSync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS weights (
                id INTEGER PRIMARY KEY NOT NULL,
                date TEXT NOT NULL,
                weight REAL NOT NULL
            );
        `);
        console.log("[LOG] Table 'weights' created or already exists.");
    } catch (error) {
        console.log("[ERROR] Error executing SQL:", error);
    }
    return db;
}
