import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import {normalizeUrl} from "./utils/url.js";

Menu.setApplicationMenu(null);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
    let win = new BrowserWindow({
        width: 1000,
        minWidth: 600,
        height: 700,
        minHeight: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    })

    win.webContents.session.clearCache();
    win.webContents.reloadIgnoringCache();
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
}

ipcMain.handle("http-request", async (_, {url, method, bodyType, bodyContent}) => {
    try {
        let normalizedUrl = normalizeUrl(url);
        if(normalizedUrl === null) {
            return {
                status: "ERROR",
                data: "Invalid URL",
                error: true
            }
        }

        const config = {
            url: normalizedUrl,
            method: method,
            headers: {}
        }

        if(bodyType !== "No body" && bodyContent) {
            switch (bodyType) {
                case "JSON":
                    config.data = JSON.parse(bodyContent);
                    config.headers["Content-Type"] = "application/json";
                    break;

                case "XML":
                    config.data = bodyContent;
                    config.headers["Content-Type"] = "application/xml";
                    break;

                case "Plain text":
                    config.data = bodyContent;
                    config.headers["Content-Type"] = "text/plain";
                    break;

                default:
                    break;
            }
        }

        console.log(config);
        const res = await axios(config);

        return {
            status: res.status,
            headers: res.headers,
            data: res.data,
            type: res.headers["content-type"],
        }
    } catch (err) {
        if (err instanceof SyntaxError) {
            return {
                status: "ERROR",
                data: "Invalid JSON format",
                error: true
            };
        }

        return {
            status: err.response?.status || "ERROR",
            data: err.response?.data || err.message,
            error: true
        }
    }
})

app.whenReady().then(createWindow)