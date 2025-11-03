export class IpcHandler {
    
    async send_user(data: { user: string, admission: string }) {
        try {
            return window.api.createUser(data);
        } catch(error) {
            const err = new Error(`Error on (IpcHandler) component on (send_user) method: ${error}`);
            err.name = "";
            throw err;
        }
    }
    
}
