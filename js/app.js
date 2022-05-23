const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

const reduceBtn = document.getElementById('reduce-btn');
const sizeBtn = document.getElementById('size-btn');
const closeBtn = document.getElementById('close-btn');

reduceBtn.addEventListener('click', () => {
    ipc.send('reduce-window');
});

sizeBtn.addEventListener('click', () => {
    ipc.send('size-window');
});

closeBtn.addEventListener('click', () => {
    ipc.send('close-window');
});
