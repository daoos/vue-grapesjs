module.exports = {
  pluginOptions: {
    graphqlMock: false,
    apolloEngine: false
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },
  }
}
