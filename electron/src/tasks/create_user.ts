import { DbHandler } from "../components/database";

export class CreateUser {
    
    db: DbHandler
    
    constructor() {
        this.db = new DbHandler();
    }
    
    execute(user: string, admission: string): { success: boolean, message: string } {
        try {
            this.db.create(user, admission);
            return { success: true, message: `Usuário ${user} adicionado.` };
        } catch(error) {
            return { success: false, message: "Erro ao adicionar usuário. Contate o administrador." }
        }
    }
}