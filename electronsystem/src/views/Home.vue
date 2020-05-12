<template>
  <div class="home">
    <div id="holder">
      Drag your file here
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {

  },
  mounted() {
    //h5原生api拖拽文件配合electron获取真实文件路径
    document.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();

      for (const f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
      }
    });
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }
}
</script>
