import VueButton from './VueButton'
import CoreModel from '../CoreModel'
import Vue from 'vue'
import CoreView from '../CoreView'

export default (editor) => {
  var comps = editor.DomComponents
  var defaultType = comps.getType('default')
  var defaultModel = defaultType.model
  var defaultView = defaultType.view;
  const type = 'v-btn'

  return {

    model: defaultModel.extend({
      ...CoreModel,
      defaults: {
        ...defaultModel.prototype.defaults,
        droppable: false,
        stylable: [
          'height', 'width'
        ],
        resizable: true
      },

    }, {
      isComponent: function (el) {
        if (el.tagName === type.toUpperCase())
          return {
            type,
            content: el.innerHTML,
            components: [],
          }
      }
    }),
    view: defaultType.view.extend({
      ...CoreView(editor),

      initialize(o) {
        defaultView.prototype.initialize.apply(this, arguments);
        this.classEmpty = this.ppfx + 'v-btn';
      },
      events: {
        click: 'initResize'
      },

      tagName: 'div',

      attributes: {
        style: 'pointer-events: all; padding: 6px;',
      },

      getChildrenSelector() {
        return 'div';
      },

      renderChildren() {
        var div = document.createElement('div')
        while (this.el.lastChild)
          this.el.removeChild(this.el.lastChild)
        this.el.appendChild(div)
      
        Vue.nextTick((() => {
          var vbtn = new VueButton({
            el: div,
            data: {
              text: 'hello'
            }
          })
          this.updateAttributes();
          this.updateClasses();
          
          var actCls = this.$el.attr('class') || '';
          this.$el.attr('class', (actCls + ' ' + this.classEmpty).trim());
        }).bind(this))
      }
    })

  }
}