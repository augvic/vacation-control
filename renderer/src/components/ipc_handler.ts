export class IpcHandler {
    
    async sendUser(data: { user: string, admission: string }) {
        try {
            return window.api.createUser(data);
        } catch(error) {
            const err = new Error(`Error on (IpcHandler) component on (sendUser) method: ${error}`);
            err.name = "";
            throw err;
        }
    }
    
    async getUsers() {
        try {
            return window.api.getUsers();
        } catch(error) {
            const err = new Error(`Error on (IpcHandler) component on (getUsers) method: ${error}`);
            err.name = "";
            throw err;
        }
    }
    
    async deleteUser(data: { id: number, user: string }) {
        try {
            return window.api.deleteUser(data);
        } catch(error) {
            const err = new Error(`Error on (IpcHandler) component on (getUsers) method: ${error}`);
            err.name = "";
            throw err;
        }
    }
    
}
