function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-else-return */
import ContentService from '../content.service';
import ButtonCloseCommands from './buttonClose.command';
export default class ButtonClose {
  /**
   * Add close button with save for Mautic
   */
  constructor(editor) {
    _defineProperty(this, "editor", void 0);
    /**
     * The close command based on the editor mode
     */
    _defineProperty(this, "command", void 0);
    if (!editor) {
      throw new Error('no editor');
    }
    this.editor = editor;
    this.command = this.getCommand();
  }
  addButton() {
    this.editor.Panels.addButton('views', [{
      id: 'close',
      className: 'fa fa-times-circle',
      attributes: {
        title: 'Close'
      },
      command: this.command
    }]);
  }
  addCommand() {
    this.editor.Commands.add(this.command, {
      run: this.getCallback()
    });
  }

  /**
   * Get the close command based on the editor mode
   */
  getCommand() {
    const mode = ContentService.getMode(this.editor);
    if (mode === ContentService.modePageHtml) {
      return 'mautic-editor-page-html-close';
    }
    if (mode === ContentService.modeEmailHtml) {
      return 'mautic-editor-email-html-close';
    }
    if (mode === ContentService.modeEmailMjml) {
      return 'mautic-editor-email-mjml-close';
    }
    throw new Error(`no valid builder mode: ${mode}`);
  }

  /**
   * get the actual Command/Function to be executed on closing of the editor
   * @returns Function
   */
  getCallback() {
    if (this.command === 'mautic-editor-page-html-close') {
      return ButtonCloseCommands.closeEditorPageHtml;
    }
    if (this.command === 'mautic-editor-email-html-close') {
      return ButtonCloseCommands.closeEditorEmailHtml;
    }
    if (this.command === 'mautic-editor-email-mjml-close') {
      return ButtonCloseCommands.closeEditorEmailMjml;
    }
    throw new Error(`no valid command: ${this.command}`);
  }
}