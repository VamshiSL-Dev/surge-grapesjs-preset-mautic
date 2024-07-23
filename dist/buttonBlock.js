function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class ButtonBlock {
  constructor(editor) {
    _defineProperty(this, "blockManager", void 0);
    this.blockManager = editor.BlockManager;
  }
  addButtonBlock() {
    const style = `<style>
                      .button {
                        display:inline-block;
                        text-decoration:none;
                        border-color:#4e5d9d;
                        border-width:10px 20px;
                        border-style:solid;
                        -webkit-border-radius:3px;
                        -moz-border-radius:3px;
                        border-radius:3px;
                        background-color:#4e5d9d;
                        font-size:16px;
                        color:#ffffff;
                      }           
                    </style>`;
    this.blockManager.add('button', {
      label: Mautic.translate('grapesjsbuilder.buttonBlockLabel'),
      category: Mautic.translate('grapesjsbuilder.categoryBlockLabel'),
      attributes: {
        class: 'gjs-fonts gjs-f-button'
      },
      content: `${style}
         <a href="#" target="_blank" class="button">Button</a>`
    });
  }
}