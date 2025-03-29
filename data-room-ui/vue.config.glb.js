// GLB 文件处理配置
module.exports = {
  chainWebpack: (config) => {
    // 添加对 .glb 文件的处理规则
    config.module
      .rule("glb")
      .test(/\.glb$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "static/models/[name].[hash:8].[ext]", // 文件输出路径和命名规则
      })
      .end();
  }
}; 