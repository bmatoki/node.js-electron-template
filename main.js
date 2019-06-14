const electron = require('electron');
const url = require('url');
const path = require('path');

const {
  app, BrowserWindow, Tray, Menu, ipcMain, shell,
} = electron;
let appIcon = null;
let mainWindow = null;

// Refresh the app only while in dev
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
});

// to make singleton instance
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    mainWindow.show();
  }
});

if (isSecondInstance) {
  app.quit();
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600, height: 600, resizable: false, frame: false,
  });

  // second window.
  const prefsWindow = new BrowserWindow({
    width: 271,
    height: 305,
    show: false,
    resizable: false,
    frame: false,
  });
  prefsWindow.loadURL(`file://${__dirname}/app/second.html`);

  ipcMain.on('toggle-prefs', () => {
    if (prefsWindow.isVisible()) {
      prefsWindow.hide();
    } else {
      prefsWindow.show();
    }
  });

  ipcMain.on('request-update-label-in-second-window', (event, arg) => {
    // Request to update the label in the renderer process of the second window
    // prefsWindow.webContents.send('action-update-label', arg);
    mainWindow.webContents.send('action-update-label', arg);
  });

  appIcon = new Tray(path.join(__dirname, 'icon', 'newIcon.ico'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Example',
      enabled: false,
    },
    {
      label: 'Hide Tray Icon',
      click() {
        mainWindow = null;
        app.quit();
      },
    },
    {
      label: 'Second window',
      click() {
        prefsWindow.show();
      },
    },
    {
      label: 'Restart Application',
      click() {
        app.relaunch();
        app.exit();
      },
    },
    {
      label: 'Open File Location',
      click() {
        shell.showItemInFolder('filepath');
      },
    },
  ]);

  appIcon.setToolTip('Example menu');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('double-click', () => {
    mainWindow.show();
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true,
    baseUrl: path.join(__dirname, 'app/'),
  }));

  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });


  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  ipcMain.on('appIcon', (event, arg) => {
        appIcon.setImage(path.join(__dirname, 'icon', 'icon.ico'));
  });
});
