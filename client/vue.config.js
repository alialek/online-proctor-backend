module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/main.scss";`
      }
    }
  }
};
