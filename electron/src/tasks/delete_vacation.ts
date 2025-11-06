import { DbHandler } from "../components/database";
import { LogSystem } from "../components/log_system";

export class DeleteVacation {
    
    db: DbHandler
    logSystem: LogSystem
    
    constructor() {
        this.db = new DbHandler();
        this.logSystem = new LogSystem();
    }
    
    execute(id: number) {
        try {
            this.db.deleteVacation(id);
            return { success: true, message: `✅ Registro excluído.` }
        } catch(error) {
            this.logSystem.write_error(`❌ Error in (DeleteVacation) task: ${error}.`);
            const err = new Error("❌ Erro interno ao remover registro. Contate o administrador.")
            err.name = "";
            throw err;
        }
    }
}