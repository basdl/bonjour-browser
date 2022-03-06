/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Electron
 * =====================
 * Create electron window
 *
 * @contributors: Bastian Huber
 *
 * @license: MIT License
 *
 */
import bonjour = require("bonjour");
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
const config = require("../app/configs/config");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
		},
	});

	if (config.debug === "enabled") {
		mainWindow.loadURL(`http://localhost:${config.server.port}`);
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.loadFile(path.join(__dirname, "../../index.html"));
	}
	mainWindow.setMenu(null);
}

const bj = bonjour();
const services = new Map<string, bonjour.RemoteService>();
// bj.publish({ name: "My Web Server", type: "http", port: 3000 });
// bj.publish({ name: "My Web Server oca", type: "oca", port: 3000 });

setInterval(() => {
	["http", "https", "oca", "ocasec", "ocp", "ocasec"].forEach((element) => {
		bj.find({ type: element }, function (service) {
			service["id"] = service.fqdn;
			service["lastFound"] = new Date();
			services.set(service.fqdn, service);
		});
	});
}, 5000);

app.on("ready", () => {
	ipcMain.handle("myipccall", () => {
		return Array.from(services.values());
	});
	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
