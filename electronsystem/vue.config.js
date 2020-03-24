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
                //
                // },
                // mac: {
                //
                // },
                productName: 'AppDemo'
            }
            // nodeModulesPath: ['./node_modules']
        }
    }
};