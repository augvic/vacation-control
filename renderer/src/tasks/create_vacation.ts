import { IpcHandler } from "../components/ipc_handler.js";

export class CreateVacation {
    
    ipcHandler: IpcHandler
    
    constructor() {
        this.ipcHandler = new IpcHandler();
    }
    
    async execute(data: { userId: number, user: string, begin: string, end: string }) {
        try {
            return await this.ipcHandler.createVacation(data);
        } catch(error) {
            console.error(`❌ Error on (CreateVacation) task: ${error}.`);
            const err = new Error("❌ Erro interno ao criar registro de férias. Contate o administrador.");
            err.name = "";
            throw err;
        }
    }
}