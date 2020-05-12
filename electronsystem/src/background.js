'use strict'

import { app, protocol, BrowserWindow, Menu  } from 'electron'
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/public').replace(/\\/g, '\\\\')
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

function createWindow () {
    console.log('__static',__static)
    // Create the browser window.
    win = new BrowserWindow({
        height: 740,
        width: 1110,
        // minWidth: 1110,
        // minHeight: canMove?740:680,
        // maxWidth: 1110,
        // maxHeight: canMove?740:680,
        useContentSize: true,
        frame: true, //是否有边框控制
        resizable: true, //是否可以缩放
        movable: true, // 是否可拖拽控制
        icon: `${__static}/cat.png`,
        webPreferences: {
            nativeWindowOpen: true, //
            nodeIntegration: true,
            webSecurity: false // 解析xml跨域问题
        },
        // show: false // 先隐藏
    })

    // win.setProgressBar(0.5) // 应用程序进程展示

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })

    creatMenu()
}

// 设置菜单栏
function creatMenu() {
    //  darwin 表示macOS，针对macOS的设置
    if(process.platform === 'darwin'){
        const template = [
            {
                label: 'APP DEMO',
                submenu: [
                    {
                        role: 'about'
                    },
                    {
                        role: 'quit'
                    }
                ]
            }
        ]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    } else {
        const template = [
            {
                label: '文件',
                submenu: [
                    {
                        label: '新建',
                        accelerator: '',
                        // role: 'new',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                console.log('item',item)
                                console.log('focusedWindow',focusedWindow)
                                // focusedWindow.toggleDevTools()
                                let child = new BrowserWindow({ parent: win, modal: true})
                                child.show()
                            }
                        }
                    },
                    {
                        label: '打开',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                console.log('item',item)
                                console.log('focusedWindow',focusedWindow)
                                // focusedWindow.toggleDevTools()
                            }
                        }
                    },
                    {
                        label: '复制',
                        // accelerator: 'CmdOrCtrl+C',
                        role: 'copy'
                    },
                ]
            },
            {
                label: '编辑',
                submenu: [
                    {
                        label: '财务',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                console.log('item',item)
                                console.log('focusedWindow',focusedWindow)
                                // focusedWindow.toggleDevTools()
                            }
                        }
                    },
                    {
                        label: '工程',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                console.log('item',item)
                                console.log('focusedWindow',focusedWindow)
                                // focusedWindow.toggleDevTools()
                            }
                        }
                    }
                ]
            }
        ]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
        // Menu.setApplicationMenu(null)
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    //尝试安装Vue Devtools （可取消）
    // if (isDevelopment && !process.env.IS_TEST) {
    //     // Install Vue Devtools
    //     try {
    //         await installVueDevtools()
    //     } catch (e) {
    //         console.error('Vue Devtools failed to install:', e.toString())
    //     }
    // }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}