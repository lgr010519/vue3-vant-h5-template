module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    /**
     * https://juejin.cn/post/6961737808339795975
     * 因为vant的设计稿尺寸是375,而我们开发的设计稿尺寸可能是750
     * 那就需要根据不同的样式动态的解析
     */
    'postcss-px2vp': {
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      selectorBlackList: ['.ignore', '.hairlines'], //指定不转换为视窗单位的类，可以自定义，无限添加 【必须是写在css中,不能写在标签上的 例如: .pc.ignore {...} 这样所有的PC下的都不会被转换】
      viewportWidth: 375
    }
  }
}
