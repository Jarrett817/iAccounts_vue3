// postcss-pxtorem将单位转化为rem
module.exports = {
  autoprefixer: {
    browsers: ["Android >= 4.0", "iOS >= 8"]
  },
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
