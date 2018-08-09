  export default (editor) => {
    let domc = editor.DomComponents;
    const ComponentsView = domc.ComponentsView;
    return {

      init() {
        this.stopListening(this.model, 'change:style')
        this.listenTo(this.model, 'change:attributes change:src', this.rerender)
      },


      rerender() {
        this.render(null, null, {}, 1)
      },

      /**
       * Render children components
       * @private
       */
      renderChildren: function (appendChildren) {
        var container = this.getChildrenContainer()

        // This trick will help perfs by caching children
        if (!appendChildren) {
          this.componentsView = new ComponentsView({
            collection: this.model.get('components'),
            config: this.config,
            defaultTypes: this.opts.defaultTypes,
            componentTypes: this.opts.componentTypes,
          })
          this.childNodes = this.componentsView.render(container).el.childNodes
        } else {
          this.componentsView.parent = container
        }

        var childNodes = Array.prototype.slice.call(this.childNodes)

        for (var i = 0, len = childNodes.length; i < len; i++) {
          container.appendChild(childNodes.shift())
        }

        if (container !== this.el) {
          var disableNode = function (el) {
            var children = Array.prototype.slice.call(el.children)
            children.forEach(function (el) {
              el.style['pointer-events'] = 'none'
              if (container !== el) {
                disableNode(el)
              }
            })
          }
          disableNode(this.el)
        }
      },


      renderStyle() {
        if (this.attributes)
          this.el.style = this.attributes.style
      },


      renderContent() {
        let content = this.model.get('content')

        if (content) {
          this.getChildrenContainer().innerHTML = content
        }
      },


      render(p, c, opts, appendChildren) {
        this.renderAttributes();
        this.renderContent();
        this.renderChildren(appendChildren);
        this.childNodes = this.getChildrenContainer().childNodes;
        this.renderStyle();
        return this;
      }
    }
  }