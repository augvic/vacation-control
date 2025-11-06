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
            this.db.prepare(`
                CREATE TABLE IF NOT EXISTS vacations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    begin TEXT NOT NULL,
                    end TEXT NOT NULL
                )
            `).run();
        } catch(error) {
            const err = new Error(`Error in (Database) component in (constructor) method: ${error}.`);
            err.name = "";
            throw err;
        }
    }
    
    createUser(user: string, admission: string) {
        try {
            this.db.prepare("INSERT INTO users (user, admission, status, daysLeft) VALUES (?, ?, ?, ?)").run(user, admission, "Não marcado", "30");
        } catch(error) {
            throw new Error(`Error in (Database) component in (createUser) method: ${error}.`);
        }
    }
    
    readAllUsers() {
        try {
            return this.db.prepare("SELECT * FROM users").all() as [{ id: number; user: string; admission: string; status: string; daysLeft: string }];
        } catch(error) {
            throw new Error(`Error in (Database) component in (readAllUsers) method: ${error}.`);
        }
    }
    
    deleteUser(id: number) {
        try {
            this.db.prepare(`DELETE FROM users WHERE id = ${id}`).run();
        } catch(error) {
            throw new Error(`Error in (Database) component in (deleteUser) method: ${error}.`);
        }
    }
    
    createVacation(userId: number, begin: string, end: string) {
        try {
            this.db.prepare(`INSERT INTO vacations (userid, begin, end) VALUES (?, ?, ?)`).run(userId, begin, end);
        } catch(error) {
            throw new Error(`Error in (Database) component in (createVacation) method: ${error}.`);
        }
    }
    
    readAllVacations(userId: number) {
        try {
            return this.db.prepare(`SELECT * FROM vacations WHERE userid = ${userId}`).all() as [{ id: number; userId: string; begin: string; end: string }];
        } catch(error) {
            throw new Error(`Error in (Database) component in (readAllUsers) method: ${error}.`);
        }
    }
    
    deleteVacation(id: number) {
        try {
            this.db.prepare(`DELETE FROM vacations WHERE id = ${id}`).run();
        } catch(error) {
            throw new Error(`Error in (Database) component in (deleteVacation) method: ${error}.`);
        }
    }
    
}