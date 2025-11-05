import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { CreateUser } from "../tasks/create_user";
import { GetUsers } from "../tasks/get_users";
import { DeleteUser } from "../tasks/delete_user";

export class App {
    
    createUserTask: CreateUser
    getUsersTask: GetUsers
    deleteUserTask: DeleteUser
    
    constructor() {
        app.whenReady().then(() => { 
            this.createElectronWindow();
        });
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
        this.createUserTask = new CreateUser();
        this.getUsersTask = new GetUsers()
        this.deleteUserTask = new DeleteUser();
    }
    
    private startIpcHandler(win: any) {
        ipcMain.on("window-minimize", () => win.minimize());
        ipcMain.on("window-maximize", () => {
            if (win.isMaximized()) {
                win.unmaximize();
            } else {
                win.maximize();
            }
        });
        ipcMain.on("window-close", () => win.close());
        ipcMain.handle("user:create", (event, data: { user: string, admission: string }) => {
            try {
                return this.createUserTask.execute(data.user, data.admission);
            } catch(error) {
                return { success: false, message: error }
            }
        });
        ipcMain.handle("user:get", (event) => {
            try {
                return this.getUsersTask.execute();
            } catch(error) {
                return { success: false, message: error }
            }
        });
        ipcMain.handle("user:delete", (event, data) => {
            try {
                return this.deleteUserTask.execute(data.id, data.user);
            } catch(error) {
                return { success: false, message: error }
            }
        });
    }
    
    private renderMainHtml(win: any) {
        win.loadFile(join(__dirname, "..", "..", "storage", ".renderer", "main.html"));
    }
    
    private instantiateBrowser() {
        return new BrowserWindow({
            width: 1100,
            height: 600,
            minWidth: 1100,
            minHeight: 600,
            frame: false,
            icon: join(__dirname, "..", "..", "icon.png"),
            webPreferences: {
                preload: join(__dirname, "preload.js"),
                contextIsolation: true,
            }
        });
    }
    
    private createElectronWindow() {
        const win = this.instantiateBrowser();
        this.renderMainHtml(win);
        this.startIpcHandler(win);
    };
    
}
