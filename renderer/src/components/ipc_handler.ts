export class IpcHandler {
    
    async send_user(data: { user: string, admission: string }) {
        return window.api.createUser(data);
    }
    
}
