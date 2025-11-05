export class IpcHandler {
    
    async sendUser(data: { user: string, admission: string }) {
        try {
            return window.api.createUser(data);
        } catch(error) {
            const err = new Error(`Error in (IpcHandler) component in (sendUser) method: ${error}.`);
            err.name = "";
            throw err;
        }
    }
    
    async getUsers() {
        try {
            return window.api.getUsers();
        } catch(error) {
            const err = new Error(`Error in (IpcHandler) component in (getUsers) method: ${error}.`);
            err.name = "";
            throw err;
        }
    }
    
    async deleteUser(data: { id: number, user: string }) {
        try {
            return window.api.deleteUser(data);
        } catch(error) {
            const err = new Error(`Error in (IpcHandler) component in (getUsers) method: ${error}.`);
            err.name = "";
            throw err;
        }
    }
    
    async createVacation(data: { userId: number, user: string, begin: string, end: string }) {
        try {
            return window.api.createVacation(data);
        } catch(error) {
            const err = new Error(`Error in (IpcHandler) component in (createVacation) method: ${error}.`);
            err.name = "";
            throw err;
        }
    }

}
