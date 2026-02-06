const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  version: '1.0.0',
});
