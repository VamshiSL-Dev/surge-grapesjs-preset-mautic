function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export default class Logger {
  constructor(editor) {
    _defineProperty(this, "editor", void 0);
    if (!editor) {
      throw new Error('Editor is required');
    }
    this.editor = editor;
  }
  debug(msg, params = {}) {
    this.log(msg, params, 'debug');
  }
  info(msg, params = {}) {
    this.log(msg, params, 'info');
  }
  warning(msg, params = {}) {
    this.log(msg, params, 'warning');
  }
  error(msg, params = {}) {
    this.log(msg, params, 'error');
  }

  /**
   *
   * @param {string} msg log message
   * @param {object} params optional params
   * @param {string} level  log level
   */
  log(msg, params, level = 'debug') {
    const options = {
      ...{
        ns: Logger.namespace,
        level
      },
      ...params
    };
    this.editor.log(msg, options);
  }

  /**
   * What kind of logs to display
   * @param {string} filter `log`, `log:info`, `grapesjs-preset`, `grapesjs-preset:info`
   */
  addListener(filter = 'log:debug') {
    // find the severity for debug, info, warning.
    const displaySeverity = Logger.filters.findIndex(element => element === filter);

    // severity only works with items in Logger.filters. All other filters are applied directly
    if (displaySeverity === -1) {
      // this.editor.on(filter, (msg, opts) => console.info(msg, opts));
    } else {
      // listen for all logs with a severity > than the current setting.
      Logger.filters.forEach((item, severity) => {
        // @todo severity >1 (warning and error) is already logged via backbone. find out how it works.
        if (displaySeverity <= severity && severity <= 1) {
          this.editor.on(item, (msg, opts) => console.info(msg, opts));
        }
      });
    }
  }
}
_defineProperty(Logger, "namespace", 'grapesjs-preset');
_defineProperty(Logger, "filters", ['log:debug', 'log:info', 'log:warning']);