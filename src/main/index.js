import { app, shell, BrowserWindow,ipcMain} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';


const loginwidth = 900;
const loginheight = 500;
const mainWidth = 1100;

log.transports.file.level = 'info';
autoUpdater.logger = log;
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const mainHeight = 800;  //850
function createWindow() { 
  // Create the browser wind  ow.
  const mainWindow = new BrowserWindow({
    width: loginwidth,
    minWidth: loginwidth,
    height: loginheight,
    minHeight: loginheight,
    show: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    frame: false,
    transparent: true,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false, //上下文隔离
      webSecurity: false, //关闭同源策略
      allowRunningInsecureContent: true, //允许运行不安全内容
    }
  })

  //监控是否到主进程
  ipcMain.on('logintomain', (e,istomain) => {
    mainWindow.setResizable(true);
    if(istomain){
      mainWindow.setSize(mainWidth, mainHeight);
      mainWindow.setMinimumSize(mainWidth, mainHeight);
      mainWindow.center();
    }else
    {
      mainWindow.setMinimumSize(loginwidth, loginheight);
      mainWindow.setSize(loginwidth, loginheight);
      mainWindow.center();
      mainWindow.setResizable(false);
    }
  })

  //监控是否最小化
  ipcMain.on('minimize', (e,islogin) => {
    mainWindow.setResizable(true);
    mainWindow.minimize();
    if(islogin){ 
      mainWindow.setResizable(false);
     }
  })

  //监控是否全屏
  ipcMain.on('maximize', (e,islogin) => {
    mainWindow.setResizable(true);
    if (mainWindow.isMaximized()) {
      if(islogin){ 
        mainWindow.setSize(loginwidth, loginheight);
        mainWindow.setMinimumSize(loginwidth, loginheight);
       }
       else{
        mainWindow.setSize(mainWidth, mainHeight);
        mainWindow.setMinimumSize(mainWidth, mainHeight);
      }
      mainWindow.center();
    }
    else {
      mainWindow.maximize();
    }
    if(islogin){ 
      mainWindow.setResizable(false);
     }
  })

  //监控是否关闭
  ipcMain.on('close', (e) => {
    mainWindow.close();
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then(() => {
 
  electronApp.setAppUserModelId('com.electron')

 
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
   
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

