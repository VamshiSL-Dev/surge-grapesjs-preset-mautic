function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ButtonApplyCommand from './buttonApply.command';
import ButtonsService from './buttons.service';
import ContentService from '../content.service';
export default class ButtonApply {
  constructor(editor) {
    _defineProperty(this, "editor", void 0);
    if (!editor) {
      throw new Error('no editor');
    }
    this.editor = editor;
  }

  /**
   * Add the save button before the close button
   */
  addButton() {
    const emailTypeSegment = 'list';
    const mode = ContentService.getMode(this.editor);
    let title = Mautic.translate('grapesjsbuilder.panelsViewsButtonsApplyTitle');
    let disable = false;
    let command = ButtonApply.getCommand();
    if (mode === ContentService.modeEmailHtml || mode === ContentService.modeEmailMjml) {
      const emailType = ButtonsService.getElementValue('emailform_emailType');

      // if it is a segment email, check if segment field is filled
      if (emailType === emailTypeSegment) {
        const emailFormList = ButtonsService.getElementValue('emailform_lists');
        if (emailFormList.length === 0) {
          title = Mautic.translate('grapesjsbuilder.panelsViewsButtonsApplyTitleError');
          disable = true;
          command = '';
        }
      }
    }
    this.editor.Panels.addButton('views', [{
      id: 'views-apply',
      className: `fa fa-check`,
      active: false,
      disable,
      attributes: {
        id: 'btn-views-apply',
        title
      },
      command,
      context: 'views-apply'
    }]);
  }
  addCommand() {
    this.editor.Commands.add(ButtonApplyCommand.name, {
      run: ButtonApply.getCallback()
    });
  }

  /**
   * Get the apply command name based on the editor mode
   *
   * @returns String
   */
  static getCommand() {
    return ButtonApplyCommand.name;
  }

  /**
   * Get the actual Command/Function to be executed on closing of the editor
   *
   * @returns Function
   */
  static getCallback() {
    return ButtonApplyCommand.applyForm;
  }
}