module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devServer: {
      progress: false,
      watchOptions: {
        poll: true,
      },
    },
  },
};
