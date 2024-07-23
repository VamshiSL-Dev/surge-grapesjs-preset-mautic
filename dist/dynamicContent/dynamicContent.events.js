function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import DynamicContentCommands from './dynamicContent.commands';
import DynamicContentService from './dynamicContent.service';
export default class DynamicContentEvents {
  constructor(editor) {
    _defineProperty(this, "editor", void 0);
    _defineProperty(this, "dcService", void 0);
    this.editor = editor;
    this.dcService = new DynamicContentService(this.editor);
    this.dccmd = new DynamicContentCommands(this.editor);
  }

  // @todo merge events and listeners. or move this to the component itself as a
  // local listener. see create-new-dynamic-content-store-item
  onComponentRemove() {
    this.editor.on('component:remove', component => {
      // Delete dynamic-content on Mautic side
      if (component.get('type') === 'dynamic-content') {
        this.editor.runCommand('preset-mautic:dynamic-content-delete-store-item', {
          component
        });
      }
    });
  }
}