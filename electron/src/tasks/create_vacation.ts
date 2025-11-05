import { DbHandler } from "../components/database";
import { LogSystem } from "../components/log_system";

export class CreateVacation {
    
    db: DbHandler
    logSystem: LogSystem
    
    constructor() {
        this.db = new DbHandler();
        this.logSystem = new LogSystem();
    }
    
    execute(userId: number, user: string, begin: string, end: string): { success: boolean, message: string } {
        try {
            this.db.createVacation(userId, begin, end)
            this.logSystem.write_text(`✅ Registro de férias de (${user}) adicionado.`);
            return { success: true, message: `✅ Registro de férias de (${user}) adicionado.` };
        } catch(error) {
            this.logSystem.write_error(`❌ Error in (CreateVacation) task: ${error}.`);
            const err = new Error("❌ Erro interno ao adicionar registro de férias. Contate o administrador.")
            err.name = "";
            throw err;
        }
    }
}