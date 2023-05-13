const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require("electron");
const url = require("url");
const path = require("path");
const { autoUpdater, AppUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
let curWindow;
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
    icon: path.join(__dirname, "./logo.ico"),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });

  ipcMain.on('custom-message', (event, message) => {
    console.log('got an IPC message', e, message);
  });
  function showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
    mainWindow.webContents.send("updateMessage", message);
  }

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  autoUpdater.checkForUpdates();
  showMessage(`Checking for updates. Current version ${app.getVersion()}`);
}

autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
});
app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
