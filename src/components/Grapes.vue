<template>
  <v-container fluid>
    <div id="gjs"></div>
  </v-container>
</template>

<script>

import grapes from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import VBtn from './grapes-components/v-btn'

export default {
  name: 'Grapes',
  props: {
    msg: String
  },

  mounted () {
    const type = 'v-btn'
    grapes.plugins.add('components-vue', (editor, options) => {
      var blockManager = editor.BlockManager
      var comps = editor.DomComponents
      var config = editor.getConfig();
      config.forceClass = 0;

      blockManager.add(type, {
        label: 'Button',
        content: '<v-btn />'
      })

      comps.addType(type, VBtn(editor))
    })

    grapes.init({
      container: '#gjs',
      // storageManager: { type: 'none' },
      plugins: ['components-vue'],
      canvas: {
        styles: ['https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css']
      },
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
