const { contextBridge, ipcRenderer } = require('electron');

const subscribe = (channel, callback) => {
  if (typeof callback !== 'function') return () => {};
  const handler = (_event, payload) => callback(payload);
  ipcRenderer.on(channel, handler);
  return () => ipcRenderer.removeListener(channel, handler);
};

contextBridge.exposeInMainWorld('desktop', {
  version: '1.0.0',
  onUpdateAvailable: (callback) => subscribe('auto-update-available', callback),
  onUpdateDownloaded: (callback) => subscribe('auto-update-downloaded', callback),
  onUpdateError: (callback) => subscribe('auto-update-error', callback),
});
