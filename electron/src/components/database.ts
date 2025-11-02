import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { join } from "path";
import { app } from "electron";

export class DbHandler {
    
    db: DatabaseType
    
    constructor() {
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
                admission TEXT NOT NULL
            )
        `).run();
    }
    
    create(user: string, admission: string) {
        try {
            this.db.prepare("INSERT INTO users (name, admission) VALUES (?, ?)").run(user, admission);
        } catch(error) {
            throw new Error(`Erro interno ao`);
        }
    }
    
    read(): [{ id: number; user: string; admission: string }] {
        return this.db.prepare("SELECT * FROM users").all() as [{ id: number; user: string; admission: string }];
    }
    
}