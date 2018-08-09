import Vue from "vue";

export default Vue.extend({

  data() {
    return {
      text: 'blubb'
    }
  },
  template: '<v-btn block style="margin: 0px; height: 100%;">{{this.text}}</v-btn>'
})