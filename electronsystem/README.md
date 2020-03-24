# electronsystem

## 安装依赖
```
npm install 或者 cnpm install
```

### 项目运行
```
npm run electron:serve
```

### 项目打包
```
npm run electron:build
```

### 项目配置说明
```
若是无法安装成功项目依赖可采用一下方式进行手工配置

在src文件夹下创建background.js文件并粘贴以下代码
'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

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
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true, // width 和 height 将设置为 web 页面的尺寸，不包含边框，这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点
    frame: false, // 隐藏边框
    resizable: false, // 配置窗口大小是否可变
    movable: true, // 是否可拖拽
    icon: `${__static}/logo.png`, // 图标
    webPreferences: {
      nodeIntegration: true,
      <!-- 跨域限制配置 -->
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  <!-- createMenu() 执行菜单栏可选配置 --> 
}

<!-- 可选菜单栏配置 -->
function creatMenu() {
    if(process.platform === 'darwin'){
        const template = [
            {
                label: 'APP DEMO',
                submenu: [
                    {
                        role: 'xxx'
                    },
                    {
                        role: 'xxxx'
                    }
                ]
            }
        ]
        let menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    } else {
        Menu.setApplicationMenu(null)
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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
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

创建vue.config.js并将以下代码复制粘贴
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  }
};

修改app名称
修改public/index.html
将title修改为自己项目想要的名字即可

打包软件图标配置及app名称
修改vue.config.js
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './public/app.ico'
        },
        mac: {
          icon: './public/app.png'
        },
        productName: 'AppDemo'
      }
    }
  }

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
