const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({

 //publicPath: process.env.NODE_ENV === "production" ? "/" : "/student",
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
        '/api': {
            // target: 'http://192.168.43.191:8081',
            target:'http://localhost:9001',
            changeOrigin: true,
             pathRewrite:{
                 '^/api':''
             }  
        },
        
    }
}
},
);

// module.exports ={
//   devServer:{
//     disableHostCheck: true
//   }
// }


