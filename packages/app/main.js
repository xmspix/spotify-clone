// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function setIcon() {
  switch (process.platform) {
    case "darwin":
      return path.join(__dirname, "./appicons/icons/mac/icon.icns");
      break;
    case "win32":
      return path.join(__dirname, "./appicons/icons/win/icon.ico");
      break;

    default:
      return path.join(__dirname, "./appicons/icons/png/16x16.png");
      break;
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: setIcon(),
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  // mainWindow.setOverlayIcon("./build/logo192.png", "Spotify Clone");
  mainWindow.loadURL(startUrl);
  console.log(`This platform is ${process.platform}`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
