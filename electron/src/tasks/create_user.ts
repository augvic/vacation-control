import { DbHandler } from "../components/database";
import { LogSystem } from "../components/log_system";

export class CreateUser {
    
    db: DbHandler
    logSystem: LogSystem
    
    constructor() {
        this.db = new DbHandler();
        this.logSystem = new LogSystem();
    }
    
    execute(user: string, admission: string): { success: boolean, message: string } {
        try {
            if (!user || !admission) {
                this.logSystem.write_text(`❌ Preencha todos os campos.`);
                return { success: false, message: `❌ Preencha todos os campos.` };    
            }
            this.db.create(user, admission);
            this.logSystem.write_text(`✅ Usuário (${user}) adicionado.`);
            return { success: true, message: `✅ Usuário (${user}) adicionado.` };
        } catch(error) {
            this.logSystem.write_error(`❌ Error on (CreateUser) task: ${error}`);
            const err = new Error("❌ Erro interno ao adicionar usuário. Contate o administrador.")
            err.name = "";
            throw err;
        }
    }
}