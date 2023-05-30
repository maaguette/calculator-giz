const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;
const template = [
  /*  {
     label: 'Actualiser',
     accelerator: 'CmdOrCtrl+R',
     click: () => {
       mainWindow.webContents.reloadIgnoringCache()
     }
   },
   {
     label: 'Documentation',
   }, */
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(Menu.buildFromTemplate(template))

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
}


app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
