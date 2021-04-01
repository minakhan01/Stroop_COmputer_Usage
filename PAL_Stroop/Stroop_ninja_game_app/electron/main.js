const { app, BrowserWindow, ipcMain, Notification, Tray, Menu } = require("electron");
app.commandLine.appendSwitch('disable-web-security');
const isDev = require("electron-is-dev");
const path = require("path");
let mainWindow;
const { machineId, machineIdSync } = require('node-machine-id')




function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false,

    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;
    

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

    mainWindow.on("close", function (event) {
        event.preventDefault();
        mainWindow.hide();
        mainWindow = null
        return false;
    });

}






const options = {
    title: 'Time for fruit-stroop!',
    subtitle: 'Subtitle of the Click here to start',
    silent: false,
    hasReply: true,
    timeoutType: 'never',
    sound: path.join(__dirname, '../assets/sound.mp3'),
    urgency: 'critical',
    closeButtonText: 'Close Button',
    actions: [{
        type: 'button',
        text: 'Show Button'
    }]
}


app.setAppUserModelId(process.execPath)

app.on("ready", () => {
    createWindow()

    
    setInterval(() => {
        var customNotification = new Notification(options);

        customNotification.addListener('click', () => {
            createWindow()
        });
        if (mainWindow == null)
            customNotification.show()
    }, 20000)    
    
});





ipcMain.on('synchronous-message', (event, arg) => {
    event.returnValue = machineIdSync()
})


var tray

app.whenReady().then(() => {
    tray=new Tray(`${path.join(__dirname, "./icon.png")}`)
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Start app', click: function () {
                createWindow()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
    tray.setToolTip('PAL')
    tray.setContextMenu(contextMenu)
}).catch(console.log)

app.on('before-quit', function (evt) {
    tray.destroy();
});
