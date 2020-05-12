const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    devServer: {
        // can be overwritten by process.env.HOST
        host: '0.0.0.0', // '0.0.0.0' localhost
        port: 8080
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'));
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                // win: {
                //icon:'./public/icon.ico', // 修改打包应用图标必须为.ico文件否则将会报错
                // asar: false, // 配置打包是否添加为asar压缩文件
                // target: ["nsis","zip"] // 设置打包为zip包绿色免安装版本删除则打包为安装的exe程序
                // },
                // mac: {
                //
                // },
                productName: 'AppDemo' // 打包的应用名称（可自行修改）
            }
            // nodeModulesPath: ['./node_modules']
        }
    }
};