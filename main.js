const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

exports.garageSwitch = () => {
	let gpio = require("onoff").Gpio;
	let doorPin = new gpio(4, "out");
	doorPin.writeSync(1);

	const flipSwitch = () => {
		doorPin.writeSync(0);
		setTimeout(() => doorPin.writeSync(1), 500);
	};

	flipSwitch();
};

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1300,
		height: 750,
		icon: path.join(__dirname, "./src/template/icon.png"),
		show: false,
		darkTheme: true,
		fullscreen: true,
		autoHideMenuBar: true,
		webPreferences: { enableRemoteModule: true, nodeIntegration: true }
	});

	let indexPath;

	if (process.env.NODE_ENV === "dev") {
		indexPath = url.format({
			protocol: "http:",
			host: "localhost:3000",
			pathname: "/",
			slashes: true
		});
	} else {
		indexPath = url.format({
			protocol: "file:",
			pathname: path.join(__dirname, "dist", "index.html"),
			slashes: true
		});
	}

	mainWindow.loadURL(indexPath);
	mainWindow.once("ready-to-show", () => mainWindow.show());
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", async () => createWindow());

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
