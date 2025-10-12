import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

export class App {
    
    constructor() {
        app.whenReady().then(() => { 
            this.createElectronWindow();
        });
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
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
    
    private renderMainHtml(win: any) {
        win.loadFile("./app/main_window/main.html");
    }
    
    private startMinMaxCloLogic(win: any) {
        ipcMain.on("window-minimize", () => win.minimize());
        ipcMain.on("window-maximize", () => {
            if (win.isMaximized()) {
                win.unmaximize();
            } else {
                win.maximize();
            }
        });
        ipcMain.on("window-close", () => win.close());
    }
    
    private createElectronWindow() {
        const win = this.instantiateBrowser();
        this.renderMainHtml(win);
        this.startMinMaxCloLogic(win);
    };
    
}
