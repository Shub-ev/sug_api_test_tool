// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    apiRequest: (url, method, bodyType, bodyContent) =>
        ipcRenderer.invoke("http-request", { url, method, bodyType, bodyContent }),
});