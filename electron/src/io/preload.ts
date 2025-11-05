import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    minimize: () => ipcRenderer.send("window-minimize"),
    maximize: () => ipcRenderer.send("window-maximize"),
    close: () => ipcRenderer.send("window-close"),
    createUser: (data: { user: string, admission: string }) => ipcRenderer.invoke("user:create", data),
    getUsers: () => ipcRenderer.invoke("user:get"),
    deleteUser: (data: { id: number, user: string }) => ipcRenderer.invoke("user:delete", data),
});
