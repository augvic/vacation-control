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
                return { success: false, message: `❌ Preencha todos os campos.` };    
            }
            this.db.create(user, admission);
            return { success: true, message: `Usuário ${user} adicionado.` };
        } catch(error) {
            this.logSystem.write_error(`⌚ ${Date.now()}\n❌ Erro: ${error}`);
            throw new Error("Erro ao adicionar usuário. Contate o administrador.")
        }
    }
}