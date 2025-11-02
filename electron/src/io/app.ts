import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { CreateUser } from "../tasks/create_user";

export class App {
    
    createUserTask: CreateUser
    
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
            return this.createUserTask.execute(data.user, data.admission);
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
