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
            const users = this.db.readAllUsers();
            const [day, month, year] = new Date(Date.now()).toLocaleDateString("pt-BR").split("/");
            const today = `${day}/${month}`;
            users.forEach(user => {
                const [day, month, year] = user.admission.split("/");
                const userAdmission = `${day}/${month}`;
                if (today == userAdmission) {
                    this.db.deleteAllVacations(user.id);
                    this.db.updateUser(user.id, 30, "Não Marcado");
                }
            });
            this.logSystem.write_text(`✅ Funcionários coletados.`);
            return { success: true, message: "✅ Funcionários coletados.", data: users };
        } catch(error) {
            this.logSystem.write_error(`❌ Error in (GetUsers) task: ${error}.`);
            const err = new Error("❌ Erro interno ao coletar funcionários. Contate o administrador.");
            err.name = "";
            throw err;
        }
    }
}