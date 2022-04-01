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
import { networkInterfaces } from "os";

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

app.on("ready", () => {
	ipcMain.handle("getServices", () => {
		return Array.from(browser.services.values());
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

class ServiceBrowser {
	bj: bonjour.Bonjour[] = new Array<bonjour.Bonjour>();
	services = new Map<string, bonjour.RemoteService>();

	allInterfaces(): string[] {
		const result = [];
		const networks = networkInterfaces();
		const names = Object.keys(networks);

		for (let i = 0; i < names.length; i++) {
			const net = networks[names[i]];
			for (let j = 0; j < net.length; j++) {
				const iface = net[j];
				if (iface.family === "IPv4" && !iface.internal) {
					result.push(iface.address);
				}
			}
		}

		if (result.length == 0) {
			result.push("127.0.0.1");
		}

		return result;
	}

	constructor() {
		this.allInterfaces().forEach((iface) => {
			const b = bonjour({ interface: iface });
			b.publish({ name: "My Web Server", type: "http", port: 3000 });
			this.bj.push(b);
		});

		setInterval(() => {
			this.query();
		}, 5000);
		this.query();
	}

	serviceFound(service: bonjour.RemoteService) {
		service["id"] = service.fqdn;
		this.services.set(service.fqdn, service);
	}

	query() {
		this.bj.forEach((browser) => {
			browser.find({}, (service: bonjour.RemoteService) => {
				this.serviceFound(service);
			});
		});
	}
}

const browser = new ServiceBrowser();
