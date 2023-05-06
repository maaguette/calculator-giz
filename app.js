const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");

const template = [
  {
    label: 'Actualiser',
    accelerator: 'CmdOrCtrl+R',
    click: () => {
      mainWindow.reload();
    }
  },
  {
    label: 'Documentation',
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(Menu.buildFromTemplate(template))
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/giz-calculator/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
