const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const ipc = ipcMain;

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 640,
    frame: false,
    icon: path.join(__dirname, './ico.ico'),
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true
    }
  });
    
    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, 'index.html'));
    win.webContents.openDevTools();

    // Gestion des demandes IPC
    ipc.on('reduce-window', () => {
        win.minimize();
    });

    ipc.on('size-window', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    ipc.on('close-window', () => {
        win.close();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on( 'activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});