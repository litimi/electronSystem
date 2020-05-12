import fs from 'fs'

export default{
  install (Vue) {
    Vue.prototype.getJavaPath = function () {
      let javapath
      if (process.platform === 'darwin') {
        javapath = `${__static}/jdk/mac/bin/java`

      } else if(process.platform === 'linux'){
        javapath = `${__static}/jdk/linux/bin/java`
      }
      else {
        javapath = `${__static}/jdk/win/bin/java.exe`
      }
      return javapath
    }
  }
}
