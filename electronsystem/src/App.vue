<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import electron  from 'electron';
import fs from 'fs'
import path from 'path'
export default {
  name: 'App',
  data () {
    return {}
  },
  mounted(){
    console.log('fs', fs)
    console.log('path', path)
    console.log('electron', electron)
    console.log('__static', __static)   
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
