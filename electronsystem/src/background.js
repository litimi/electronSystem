'use strict'

const electron = require('electron')
const { app, protocol, BrowserWindow, Menu, ipcMain, ipcRenderer  } = electron
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import child_process from 'child_process'
import './store'
import Systemset from 'nedb'
import path from 'path'
import moment from 'moment';

const ipc = ipcMain;
const fs = require('fs');
const net = require('net');

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// let javapath;
// if (process.platform === 'darwin') {
//     javapath = `${__static}/jdk/mac/bin/java`
//
// } else if(process.platform === 'linux'){
//     javapath = `${__static}/jdk/linux/bin/java`
// }
// else {
//     javapath = `${__static}/jdk/win/bin/java.exe`
// }
// console.log('__dirname', __dirname, __static);


// 用于存储所有的连接
// const clients = [];
// const server = net.createServer((socket) => {
//     //将已经断开连接的socket从clients中移除
//     clients.forEach(socket => socket.write('connnect\n'));
//     // 哪个客户端与我连接socket就是谁
//     clients.push(socket);
//     socket.write('start\n');
//     console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom`);
//
//     // 触发多次
//     socket.on('data', clientData).on('error', (err) => {
//         clients.splice(clients.indexOf(socket), 1);
//         console.log(`${socket.remoteAddress}下线了 当前在线${clients.length}`)
//     })
// });

// 有任何客户端发消息都会触发
// function clientData(chunk) {
//     try {
//         console.log(chunk.toString().trim());
//         let { result, formlist, priorityList, allConfig, reportFilePath } = global.testingStatus;
//         const retData = JSON.parse(chunk.toString().trim().split('\n')[0]);
//         if (parseInt(retData.percent) >= 1) {
//             result[retData.type] = true;
//         }
//         if (Object.keys(result).filter(key => result[key] === false).length === 0 && priorityList.length > 0) {
//             let currPriority = priorityList.shift();
//             let newFormlist = formlist.filter(item => item.priority === currPriority);
//             newFormlist.forEach(item => {
//                 result[item.field] = false
//             });
//             startPlug(newFormlist, allConfig, reportFilePath)
//         }
//
//         win.webContents.send('processBar', chunk.toString().trim())
//     } catch (error) {
//         console.log(error);
//         socket.write('弄啥咧！')
//     }
// }

// const port = 2080;
// server.listen(port, (err) => {
//     if (err) {
//         console.log('端口被占用');
//         return false
//     }
//     console.log(`服务端正常启动监听【${port}】端口`)
// });

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}])

null;

function createWindow () {
    console.log('__static',__static)
    let size = require('electron').screen.getPrimaryDisplay().workAreaSize
    global.screenSize = size
    console.log(size)
    let canMove = true
    console.log(typeof(size.width))
    if (size.width == 1280 && size.height == 680) {
        canMove = false
    }
    // Create the browser window.
    win = new BrowserWindow({
        // width: 800,
        // height: 600,
        // webPreferences: {
        //     webSecurity: false, // 取消跨域限制
        //     nodeIntegration: true
        // }
        height: canMove?740:680,
        width: 1110,
        minWidth: 1110,
        minHeight: canMove?740:680,
        maxWidth: 1110,
        maxHeight: canMove?740:680,
        useContentSize: true,
        frame: false,
        resizable: false,
        movable: true,
        // icon: `${__static}/logos.png`,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false // 解析xml跨域问题
        },
        show: false // 先隐藏
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
        win.webContents.openDevTools()
    }

    win.on('closed', () => {
        win = null
    })

    // const db = new Systemset({
    //     autoload: true,
    //     filename: path.join(app.getPath('userData'), '/systemset.db')
    // });
    // console.log(app.getPath('userData'))
    win.on('ready-to-show', function () {
        win.show() // 初始化后再显示
    });


}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

// 登录窗口最小化
ipc.on('min', function () {
    win.minimize();
});

ipc.on('close', function () {
    win.close()
});

// app.send('watchScren', electron.screen.getPrimaryDisplay().scaleFactor)


function readFileList(path, filesList) {
    const files = fs.readdirSync(path);
    files.forEach((itm, index) => {
        const stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            // 递归读取文件
            readFileList(`${path + itm}/`, filesList);
        } else {
            const obj = {};// 定义一个对象存放文件的路径和名字
            obj.path = path.replace(/\\/g, '/');// 路径
            obj.filename = itm;// 名字
            obj.size = stat.size;//文件大小，以字节为单位
            obj.files = path.replace(/\\/g, '/') + itm;
            filesList.push(obj);
        }
    });
}

var getFiles = {
    // 获取文件夹下的所有文件
    getFileList(path) {
        const filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
};
