import { IpcHandler } from "../components/ipc_handler";

export class CreateUser {
    
    ipcHandler: IpcHandler
    
    constructor() {
        this.ipcHandler = new IpcHandler();
    }
    
    async execute(data: { user: string, admission: string }) {
        try {
            const response = await this.ipcHandler.send_user(data);
            
            return { success: true, message: `Usuário ${user} adicionado.` };
        } catch(error) {
            return { success: false, message: "Erro ao adicionar usuário. Contate o administrador." }
        }
    }
}