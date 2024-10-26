import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

window.ipcRenderer = ipcRenderer;

ipcRenderer.on('update_available', () => {
  const notification = document.createElement('div');
  notification.innerText = '有新版本可用。下载中...';
  document.body.appendChild(notification);
});

ipcRenderer.on('update_downloaded', () => {
  const notification = document.createElement('div');
  notification.innerText = '更新下载完成。重启应用以应用更新。';
  const button = document.createElement('button');
  button.innerText = '重启';
  button.addEventListener('click', () => {
    ipcRenderer.send('restart_app');
  });
  notification.appendChild(button);
  document.body.appendChild(notification);
});


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
