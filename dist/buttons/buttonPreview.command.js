function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ButtonsService from './buttons.service';
import ContentService from '../content.service';
export default class ButtonPreviewCommand {
  /**
   * Email preview command
   *
   * @param editor
   */
  static previewForm(editor) {
    const form = ButtonsService.getForm();
    const instanceId = ButtonsService.getInstanceId(form);
    ButtonPreviewCommand.openPreview(editor, instanceId);
  }

  /**
   * Open  the email preview
   *
   * @param editor
   * @param emailId
   */
  static openPreview(editor, emailId) {
    const mode = ContentService.getMode(editor);
    const url = `${window.location.origin}${mauticBaseUrl}${mode.split('-')[0]}/preview/${emailId}`;
    window.open(url, '_blank');
  }
}
/**
 * The command name
 */
_defineProperty(ButtonPreviewCommand, "name", 'preset-mautic:preview-form');