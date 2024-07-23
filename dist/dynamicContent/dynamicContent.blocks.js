function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class DynamicContentBlocks {
  constructor(editor, opts = {}) {
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "opts", void 0);
    _defineProperty(this, "blockManager", void 0);
    this.editor = editor;
    this.opts = opts;
    this.blockManager = this.editor.BlockManager;
  }
  addDynamciContentBlock() {
    this.blockManager.add('dynamic-content', {
      label: Mautic.translate('grapesjsbuilder.dynamicContentBlockLabel'),
      activate: true,
      select: true,
      attributes: {
        class: 'fa fa-tag'
      },
      content: {
        type: 'dynamic-content',
        content: '{dynamiccontent="Dynamic Content"}',
        style: {
          padding: '10px'
        },
        activeOnRender: 1
      }
    });
  }
}