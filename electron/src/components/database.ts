import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { join } from "path";
import { app } from "electron";

export class DbHandler {
    
    db: DatabaseType
    
    constructor() {
        try {
            let dbPath = "";
            if (app.isPackaged) {
                dbPath = join(process.resourcesPath, "database.db");
            } else {
                dbPath = join(__dirname, "..", "..", "storage", "database.db");
            }
            this.db = new Database(dbPath);
            this.db.prepare(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user TEXT NOT NULL,
                    admission TEXT NOT NULL,
                    status TEXT NOT NULL,
                    daysLeft TEXT NOT NULL
                )
            `).run();
        } catch(error) {
            const err = new Error(`Error on (Database) component on (constructor) method: ${error}`);
            err.name = "";
            throw err;
        }
    }
    
    create(user: string, admission: string) {
        try {
            this.db.prepare("INSERT INTO users (user, admission, status, daysLeft) VALUES (?, ?, ?, ?)").run(user, admission, "-", "-");
        } catch(error) {
            throw new Error(`Error on (Database) component on (create) method: ${error}`);
        }
    }
    
    readAll() {
        try {
            return this.db.prepare("SELECT * FROM users").all() as [{ id: number; user: string; admission: string; status: string; daysLeft: string }];
        } catch(error) {
            throw new Error(`Error on (Database) component on (read) method: ${error}`);
        }
    }
    
}