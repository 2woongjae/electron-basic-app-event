const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

console.log('start');

app.on('will-finish-launching', () => {
    /*
     the application has finished basic startup.
     [Windows / Linux] => = ready
     [macOS] => = applicationWillFinishLaunching (NSApplication)
     Setup 'open-file', 'open-url' events
     Start 'crash reporter' and 'auto updater'
     In most cases, you should just do everything in the ready event handler.
    */
    console.log('will-finish-launching');
});

app.on('ready', (launchInfo) => {
    /*
     Electron has finished initializing.
     [macOS] launchInfo Object
     */
    console.log(`ready : ${JSON.stringify(launchInfo)}`);

    mainWindow = new BrowserWindow({width: 600, height: 600});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
});

app.on('window-all-closed', () => {
    /*
     all windows have been closed.
     */
    console.log('window-all-closed');
    app.quit();
});

app.on('before-quit', (event) => {
    /*
     starts closing its windows.
     */
    // event.preventDefault();
    console.log('before-quit');
});

app.on('will-quit', (event) => {
    /*
     all windows have been closed and the application will quit.
     */
    // event.preventDefault();
    console.log('will-quit');
});

/*
 window-all-closed 와 will-quit 차이
 If you do not subscribe to this event and all windows are closed, the default behavior is to quit the app;
 however, if you subscribe, you control whether the app quits or not.
 If the user pressed Cmd + Q, or the developer called app.quit(), Electron will first try to close all the windows and then emit the will-quit event, and in this case the window-all-closed event would not be emitted.
 */

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
});

/*
    [macOS]
    열려있는 윈도우가 없고 dock 에서 어플리케이션 아이콘을 클릭하면 발생하는 이벤트
 */
app.on('activate', (event, hasVisibleWindows) => {
    console.log(`activate : ${hasVisibleWindows}`);
});