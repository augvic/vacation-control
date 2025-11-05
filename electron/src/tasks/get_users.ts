import { DbHandler } from "../components/database";
import { LogSystem } from "../components/log_system";

export class GetUsers {
    
    db: DbHandler
    logSystem: LogSystem
    
    constructor() {
        this.db = new DbHandler();
        this.logSystem = new LogSystem();
    }
    
    execute() {
        try {
            const users = this.db.readAll();
            this.logSystem.write_text(`✅ Funcionários coletados.`);
            return { success: true, message: "✅ Funcionários coletados.", data: users };
        } catch(error) {
            this.logSystem.write_error(`❌ Error in (GetUsers) task: ${error}`);
            const err = new Error("❌ Erro interno ao coletar funcionários. Contate o administrador.");
            err.name = "";
            throw err;
        }
    }
}