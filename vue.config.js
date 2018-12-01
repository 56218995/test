const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js'
                },{
                    from:'src/lib/abp.js'
                }])
            ]
            // ,
            // resolve:{
            //     extensions:['.js','.vue','.json'],
            //     alias:{
            //         '@':resolve('src')
            //     }
            // }         
        }
      } else {
        return {
            plugins:[
                new CopyWebpackPlugin([{
                    from:'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
                    to:'dist'
                },{
                    from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                    to:'dist'
                },{
                    from:'src/lib/abp.js',
                    to:'dist'
                }])
            ]
            // ,
            // resolve:{
            //     extensions:['.js','.vue','.json'],
            //     alias:{
            //         '@':resolve('src')
            //     }
            // }    
        }
      }
    }
}