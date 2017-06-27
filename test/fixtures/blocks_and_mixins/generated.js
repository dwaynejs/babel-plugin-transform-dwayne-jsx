let _tmpl, _mixin;

import { Block, Class, Each } from 'dwayne';

class MyBlock extends Block {
  static html = (_tmpl = [{
    type: "div",
    args: {
      "Class:active": (_mixin = _ => _.active, _mixin.mixin = Class, _mixin)
    },
    children: [{
      type: "#text",
      value: _ => _.text
    }, {
      type: Each,
      args: {
        set: _ => _.set,
        item: "item",
        uid: () => item => item.id,
        __source: {
          file: "source.js",
          line: 7,
          column: 7
        }
      },
      children: [{
        type: "#text",
        value: _ => _.item.value
      }]
    }]
  }], _tmpl.vars = ["active", "text", "set"], _tmpl);
}

export default MyBlock;