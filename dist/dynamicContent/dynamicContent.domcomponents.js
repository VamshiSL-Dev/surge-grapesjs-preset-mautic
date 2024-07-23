function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import ContentService from '../content.service';
import DynamicContentService from './dynamicContent.service';
export default class DynamicContentDomComponents {
  constructor() {
    _defineProperty(this, "dcService", void 0);
  }
  static addDynamicContentType(editor) {
    const dc = editor.DomComponents;
    const baseTypeName = ContentService.isMjmlMode(editor) ? 'mj-text' : 'text';
    const tagName = ContentService.isMjmlMode(editor) ? 'mj-text' : 'div';
    const baseType = dc.getType(baseTypeName);
    const baseModel = baseType.model;
    const model = baseModel.extend({
      defaults: {
        ...baseModel.prototype.defaults,
        name: 'Dynamic Content',
        tagName,
        draggable: '[data-gjs-type=cell],[data-gjs-type=mj-column]',
        droppable: false,
        editable: false,
        stylable: false,
        propagate: ['droppable', 'editable'],
        attributes: {
          'data-gjs-type': 'dynamic-content',
          // Type for GrapesJS
          'data-slot': 'dynamicContent' // used to find the DC component on the canvas for e.g. token transformation
        }
      },
      /**
       * Initilize the component
       */
      init() {
        // link component to the corresponding html store item
        this.em.get('Commands').run('preset-mautic:link-component-to-store-item', {
          component: this
        });

        // Add toolbar edit button if it's not already in
        const toolbar = this.get('toolbar');
        const id = 'toolbar-dynamic-content';
        if (!toolbar.filter(tlb => tlb.id === id).length) {
          toolbar.unshift({
            id,
            command: 'preset-mautic:dynamic-content-open',
            attributes: {
              class: 'fa fa-pencil-square-o'
            }
          });
        }
      }
      // @todo: show the store items default content on the canvas
      // updated(property, value, prevValue) {
      //   console.log('Local hook: model.updated', {
      //     property,
      //     value,
      //     prevValue,
      //   });
      // },
    }, {
      // Dynamic Content component detection
      isComponent(el) {
        if (el.getAttribute && el.getAttribute('data-slot') === 'dynamicContent') {
          return {
            type: 'dynamic-content'
          };
        }
        return false;
      }
    });
    const view = baseType.view.extend({
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%;user-select: none;'
      },
      events: {
        dblclick: 'onActive'
      },
      // replace token with human readable view
      onRender(el) {
        const dcService = new DynamicContentService(editor);
        const decId = DynamicContentService.getDataParamDecid(el.model);
        const dcItem = dcService.getStoreItem(decId);
        this.el.innerHTML = dcItem.content;
        dcService.logger.debug('DC: Updated view', dcItem);
      },
      // open the dynamic content modal if the editor is added or double clicked
      onActive() {
        const target = this.model;
        // open the editor in the popup
        this.em.get('Commands').run('preset-mautic:dynamic-content-open', {
          target
        });
      }
      // does not work: gets removed when Sorting (by grapesjs)
      // removed() {
      //   // Delete dynamic-content on Mautic side
      //   const component = this.model;
      //   this.em
      //     .get('Commands')
      //     .run('preset-mautic:dynamic-content-delete-store-item', { component });
      // },
    });

    // add the Dynamic Content component
    dc.addType('dynamic-content', {
      model,
      view
    });
  }
}