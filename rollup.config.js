// rollup.config.js
import strip from 'rollup-plugin-strip'

export default {
  input: './src/main.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/my-lib.js'
    }
  ],
  plugins: [
    strip({
      //如果不想执行该配置项时 设置为false即可
      // set this to `false` if you don't want to
      // remove debugger statements
      //去除debugger
      debugger: true,

      // defaults to `[ 'console.*', 'assert.*' ]`
      //去除文件中指定的语句
      functions: ['console.log', 'assert.*', 'debug', 'alert'],

      // set this to `false` if you're not using sourcemaps –
      // defaults to `true`
      // 代码映射信息
      sourceMap: true
    })
  ]
}
