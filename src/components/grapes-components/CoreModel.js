const props = {
  unstylable: [
    'max-height'
  ]
}

export default {
  ...props,

  init() {
    const attrs = { ...this.get('attributes')
    }
    const style = { ...this.get('style')
    }

    for (let prop in style) {
      if (!(prop in attrs)) {
        attrs[prop] = style[prop]
      }
    }

    this.set('attributes', attrs)
    this.set('style', attrs)
    this.listenTo(this, 'change:style', this.handleStyleChange)
  },


  handleStyleChange() {
    const style = { ...this.get('attributes'),
      ...this.get('style')
    }
    this.set('attributes', style)
  },

  /**
   * This will avoid rendering default attributes
   * @return {Object}
   */
  getAttrToHTML() {
    const attr = { ...this.get('attributes')
    }
    const style = { ...this.get('style-default')
    }
    delete attr.style

    for (let prop in attr) {
      const value = attr[prop]

      if (value && value === style[prop]) {
        delete attr[prop]
      }
    }

    return attr
  },


  /**
   * Rhave to change few things for hte MJML's xml (no id, style, class)
   */
  toHTML() {
    let code = ''
    let model = this
    let tag = model.get('tagName'),
      sTag = model.get('void')

    // Build the string of attributes
    let strAttr = ''
    let attr = this.getAttrToHTML()
    for (let prop in attr) {
      let val = attr[prop]
      strAttr += typeof val !== undefined && val !== '' ?
        ' ' + prop + '="' + val + '"' : ''
    }

    let classes = "";
    if (this.attributes.classes.models) {
      for (let i = 0; i < this.attributes.classes.length; i++) {
        if (classes == "") {
          classes += 'class="';
        } else {
          classes += " ";
        }
        classes += this.attributes.classes.models[i].id;
      }
    }

    if (classes != "") {
      classes = " " + classes + '"';
    }

    code +=
      `<${tag}${classes}${strAttr}${sTag ? "/" : ""}>` + model.get("content");


    model.get('components').each((model) => {
      code += model.toHTML()
    })

    if (!sTag)
      code += `</${tag}>`

    return code
  },

}
