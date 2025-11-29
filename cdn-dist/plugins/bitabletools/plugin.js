var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var DOMPurify = (typeof window !== 'undefined' ? window.DOMPurify : undefined);
var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
var formatDate = function (d) { return "".concat(d.getFullYear(), "-").concat(pad(d.getMonth() + 1), "-").concat(pad(d.getDate())); };
var formatDateTime = function (d) { return "".concat(formatDate(d), " ").concat(pad(d.getHours()), ":").concat(pad(d.getMinutes())); };
var esc = function (s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
var safeJson = function (x) { try {
    return JSON.stringify(x);
}
catch (_a) {
    return '';
} };
var trim = function (s) { return (s || '').trim(); };
var now = function () { return Date.now(); };
var confirmAsync = function (ed, msg) { return new Promise(function (resolve) { try {
    ed.windowManager.confirm(msg, function (state) { return resolve(!!state); });
}
catch (_a) {
    resolve(true);
} }); };
var toText = function (x) {
    if (x == null)
        return '';
    if (typeof x === 'string')
        return x;
    if (typeof x === 'number' || typeof x === 'boolean')
        return String(x);
    if (Array.isArray(x))
        return x.map(function (it) { return toText(it); }).filter(function (s) { return s; }).join(', ');
    if (typeof x === 'object') {
        if (typeof x.text === 'string')
            return x.text;
        if (Array.isArray(x.text_arr))
            return x.text_arr.map(function (t) { return toText(t); }).join(', ');
        if (Array.isArray(x.elements))
            return x.elements.map(function (el) { return toText(el); }).join('');
        if (Array.isArray(x.children))
            return x.children.map(function (el) { return toText(el); }).join('');
        if (Array.isArray(x.ops))
            return x.ops.map(function (op) { return (typeof op.insert === 'string' ? op.insert : toText(op.insert)); }).join('');
        if (typeof x.name === 'string')
            return x.name;
        if (typeof x.title === 'string')
            return x.title;
        if (typeof x.label === 'string')
            return x.label;
        if (typeof x.url === 'string')
            return x.url;
        return safeJson(x);
    }
    return String(x);
};
var formatValue = function (meta, v) {
    var T = (typeof FieldType !== 'undefined' ? FieldType : window.FieldType) || {};
    if (v == null)
        return '';
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.Text || (meta === null || meta === void 0 ? void 0 : meta.type) === T.LongText || (meta === null || meta === void 0 ? void 0 : meta.type) === T.Url || (meta === null || meta === void 0 ? void 0 : meta.type) === T.Email)
        return toText(v);
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.Date) {
        var d = new Date(Number(v));
        return isNaN(d.getTime()) ? String(v) : formatDate(d);
    }
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.DateTime) {
        var d = new Date(Number(v));
        return isNaN(d.getTime()) ? String(v) : formatDateTime(d);
    }
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.Number || (meta === null || meta === void 0 ? void 0 : meta.type) === T.Percent || (meta === null || meta === void 0 ? void 0 : meta.type) === T.Currency)
        return typeof v === 'number' ? String(v) : String(Number(v));
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.SingleSelect)
        return toText(v);
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.MultiSelect) {
        var arr = Array.isArray(v) ? v : (Array.isArray(v === null || v === void 0 ? void 0 : v.options) ? v.options : []);
        return arr.map(function (x) { return toText(x); }).filter(function (s) { return s; }).join(', ');
    }
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.Attachment) {
        var arr = Array.isArray(v) ? v : (Array.isArray(v === null || v === void 0 ? void 0 : v.files) ? v.files : []);
        return arr.map(function (x) { var _a, _b, _c; return (_c = (_b = (_a = x === null || x === void 0 ? void 0 : x.name) !== null && _a !== void 0 ? _a : x === null || x === void 0 ? void 0 : x.file_name) !== null && _b !== void 0 ? _b : x === null || x === void 0 ? void 0 : x.url) !== null && _c !== void 0 ? _c : ''; }).filter(function (s) { return s; }).join(', ');
    }
    if ((meta === null || meta === void 0 ? void 0 : meta.type) === T.Lookup) {
        if (Array.isArray(v))
            return v.map(function (x) { return toText(x); }).filter(function (s) { return s; }).join(', ');
        return toText(v);
    }
    if (Array.isArray(v))
        return v.map(function (x) { return toText(x); }).filter(function (s) { return s; }).join(', ');
    if (v && typeof v === 'object')
        return toText(v);
    return String(v);
};
tinymce.PluginManager.add('bitabletools', function (ed) {
    var LS_KEY = 'tinymce.templates';
    var MAX_TEMPLATES = 100;
    var uuid = function () { return 'tpl-' + Math.random().toString(36).slice(2) + Date.now(); };
    var loadTemplates = function () { try {
        var raw = localStorage.getItem(LS_KEY);
        var arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
    }
    catch (_a) {
        return [];
    } };
    var saveTemplates = function (list) { try {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    }
    catch (e) {
        ed.notificationManager.open({ text: '模板保存失败：' + String((e === null || e === void 0 ? void 0 : e.message) || e), type: 'warning' });
    } };
    var findByName = function (list, name) { return list.find(function (t) { return t.name === name; }); };
    var suggestName = function (list, base) { var n = base.trim() || '未命名模板'; if (!findByName(list, n))
        return n; var i = 2; while (findByName(list, "".concat(n, "(").concat(i, ")")))
        i++; return "".concat(n, "(").concat(i, ")"); };
    ed.ui.registry.addMenuButton('fieldSelect', {
        text: '字段',
        fetch: function (callback) {
            var B = (typeof bitable !== 'undefined' ? bitable : window.bitable);
            var build = function () { return __awaiter(_this, void 0, void 0, function () {
                var table, metas, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!B || !B.base) {
                                callback([{ type: 'menuitem', text: '未检测到 Base SDK', onAction: function () { } }]);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, B.base.getActiveTable()];
                        case 1:
                            table = _a.sent();
                            return [4 /*yield*/, table.getFieldMetaList()];
                        case 2:
                            metas = _a.sent();
                            items = metas.map(function (m) { return ({ type: 'menuitem', text: m.name, onAction: function () { var html = "<span class=\"bt-field\" data-field-id=\"".concat(m.id, "\" data-field-name=\"").concat(esc(m.name), "\">").concat(esc(m.name), "</span>"); ed.insertContent(html); } }); });
                            callback(items);
                            return [2 /*return*/];
                    }
                });
            }); };
            build();
        }
    });
    var openSaveTemplateDialog = function () {
        var html = "\n      <div style=\"padding:8px\">\n        <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:8px\">\n          <label style=\"width:84px\">\u6A21\u677F\u540D\u79F0</label>\n          <input id=\"tpl-name\" style=\"flex:1;padding:6px;border:1px solid #d9d9d9;border-radius:4px\" placeholder=\"\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0\" />\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:flex-start\">\n          <label style=\"width:84px;line-height:28px\">\u63CF\u8FF0</label>\n          <textarea id=\"tpl-desc\" style=\"flex:1;padding:6px;border:1px solid #d9d9d9;border-radius:4px;min-height:80px\" placeholder=\"\u53EF\u9009\u586B\"></textarea>\n        </div>\n      </div>";
        var spec = { title: '保存为模板', size: 'normal', body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] }, buttons: [{ type: 'custom', name: 'save', text: '保存' }, { type: 'cancel', text: '取消' }], onAction: function (api, details) { return __awaiter(_this, void 0, void 0, function () { var dlg, nameInput, descInput, name, description, content, list, item, ok, newName, newItem, newItem; return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (details.name !== 'save')
                            return [2 /*return*/];
                        dlg = document.querySelector('.tox-dialog');
                        nameInput = dlg ? dlg.querySelector('#tpl-name') : null;
                        descInput = dlg ? dlg.querySelector('#tpl-desc') : null;
                        name = trim((nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || '');
                        description = trim((descInput === null || descInput === void 0 ? void 0 : descInput.value) || '');
                        if (!name) {
                            ed.notificationManager.open({ text: '模板名称不能为空', type: 'warning' });
                            return [2 /*return*/];
                        }
                        content = ed.getContent();
                        list = loadTemplates();
                        item = findByName(list, name);
                        if (!item) return [3 /*break*/, 2];
                        return [4 /*yield*/, confirmAsync(ed, '同名模板已存在，是否覆盖？')];
                    case 1:
                        ok = _a.sent();
                        if (ok) {
                            item.content = content;
                            item.description = description;
                            item.updatedAt = now();
                        }
                        else {
                            newName = suggestName(list, name);
                            newItem = { id: uuid(), name: newName, description: description, content: content, createdAt: now(), updatedAt: now() };
                            list.push(newItem);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        newItem = { id: uuid(), name: name, description: description, content: content, createdAt: now(), updatedAt: now() };
                        list.push(newItem);
                        _a.label = 3;
                    case 3:
                        if (list.length > MAX_TEMPLATES) {
                            list.sort(function (a, b) { return a.updatedAt - b.updatedAt; });
                            list.splice(0, list.length - MAX_TEMPLATES);
                        }
                        saveTemplates(list);
                        api.close();
                        ed.notificationManager.open({ text: '模板已保存', type: 'success' });
                        return [2 /*return*/];
                }
            }); }); } };
        ed.windowManager.open(spec);
    };
    var openApplyTemplateDialog = function () {
        var list = loadTemplates().sort(function (a, b) { return b.updatedAt - a.updatedAt; });
        var selectedId;
        var itemHtml = list.map(function (t) { return "<div class=\"tpl-item\" data-id=\"".concat(t.id, "\" data-text=\"").concat(esc(t.name.toLowerCase()), "\" style=\"padding:8px;border:1px solid #eee;border-radius:4px;margin-bottom:8px;cursor:pointer\"><div style=\"font-weight:600\">").concat(esc(t.name), "</div><div style=\"color:#999;font-size:12px\">\u66F4\u65B0\u4E8E ").concat(formatDateTime(new Date(t.updatedAt)), "</div></div>"); }).join('') || '<div style=\"color:#999\">暂无模板</div>';
        var html = "\n      <div style=\"padding:8px;height:420px;box-sizing:border-box\">\n        <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:8px\">\n          <input id=\"tpl-search\" style=\"flex:1;padding:6px;border:1px solid #d9d9d9;border-radius:4px\" placeholder=\"\u641C\u7D22\u6A21\u677F\u540D\u79F0\" />\n        </div>\n        <div style=\"display:flex;gap:12px;height:calc(420px - 52px)\">\n          <div style=\"flex:1;overflow:auto\">".concat(itemHtml, "</div>\n          <div style=\"flex:1;overflow:auto;border:1px solid #eee;border-radius:4px;padding:8px\">\n            <div style=\"font-weight:600;margin-bottom:8px\">\u9884\u89C8</div>\n            <div id=\"tpl-preview\" style=\"min-height:220px;box-sizing:border-box;overflow:auto\">\u8BF7\u9009\u62E9\u6A21\u677F\u67E5\u770B\u9884\u89C8</div>\n          </div>\n        </div>\n      </div>");
        var bindEvents = function () { var dlg = document.querySelector('.tox-dialog'); var body = dlg ? dlg.querySelector('.tox-dialog__body') : null; if (!body)
            return; body.addEventListener('click', function (e) { var el = e.target.closest('.tpl-item'); if (el) {
            selectedId = el.getAttribute('data-id') || undefined;
            body.querySelectorAll('.tpl-item').forEach(function (x) { return x.style.borderColor = '#eee'; });
            el.style.borderColor = '#4096ff';
            var tpl_1 = list.find(function (t) { return t.id === selectedId; });
            var prev = body.querySelector('#tpl-preview');
            if (prev && tpl_1) {
                var safe = (function () { try {
                    return DOMPurify.sanitize(tpl_1.content || '');
                }
                catch (_a) {
                    return tpl_1.content || '';
                } })();
                prev.innerHTML = safe;
            }
        } }); var search = body.querySelector('#tpl-search'); if (search) {
            search.addEventListener('input', function () { var q = (search.value || '').toLowerCase(); body.querySelectorAll('.tpl-item').forEach(function (x) { var txt = x.getAttribute('data-text') || ''; x.style.display = txt.includes(q) ? '' : 'none'; }); });
        } };
        var spec = { title: '应用模板', size: 'large', body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] }, buttons: [{ type: 'custom', name: 'apply', text: '应用' }, { type: 'cancel', text: '关闭' }], onAction: function (api, details) { if (details.name !== 'apply')
                return; if (!selectedId) {
                ed.notificationManager.open({ text: '请先选择一个模板', type: 'warning' });
                return;
            } var tpl = list.find(function (t) { return t.id === selectedId; }); if (!tpl) {
                ed.notificationManager.open({ text: '模板不存在或已被删除', type: 'warning' });
                return;
            } ed.setContent(tpl.content); api.close(); } };
        ed.windowManager.open(spec);
        setTimeout(bindEvents, 0);
    };
    var openManageTemplateDialog = function () {
        var list = loadTemplates().sort(function (a, b) { return b.updatedAt - a.updatedAt; });
        var rows = list.map(function (t) { return "\n      <div class=\"tpl-row\" data-id=\"".concat(t.id, "\" style=\"padding:8px;border-bottom:1px solid #eee\">\n        <div style=\"display:flex;justify-content:space-between;align-items:center\">\n          <div>\n            <div style=\"font-weight:600\">").concat(esc(t.name), "</div>\n            <div style=\"color:#999;font-size:12px\">\u66F4\u65B0\u4E8E ").concat(formatDateTime(new Date(t.updatedAt)), "</div>\n          </div>\n          <div style=\"display:flex;gap:12px\">\n            <a href=\"#\" data-act=\"rename\">\u91CD\u547D\u540D</a>\n            <a href=\"#\" data-act=\"copy\">\u590D\u5236</a>\n            <a href=\"#\" data-act=\"delete\" style=\"color:#d4380d\">\u5220\u9664</a>\n          </div>\n        </div>\n      </div>"); }).join('') || '<div style=\"padding:8px;color:#999\">暂无模板</div>';
        var html = "<div style=\"padding:8px;max-height:460px;overflow:auto\">".concat(rows, "</div>");
        var spec = { title: '管理模板', size: 'large', body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] }, buttons: [{ type: 'cancel', text: '关闭' }], onAction: function () { } };
        var api = ed.windowManager.open(spec);
        setTimeout(function () {
            var dlg = document.querySelector('.tox-dialog');
            var body = dlg ? dlg.querySelector('.tox-dialog__body') : null;
            if (!body)
                return;
            body.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
                var a, act, row, id, arr, idx, ok, base, name_1, item, renameHtml, renameSpec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            a = e.target.closest('a[data-act]');
                            if (!a)
                                return [2 /*return*/];
                            e.preventDefault();
                            act = a.getAttribute('data-act') || '';
                            row = a.closest('.tpl-row');
                            id = (row === null || row === void 0 ? void 0 : row.getAttribute('data-id')) || '';
                            arr = loadTemplates();
                            idx = arr.findIndex(function (x) { return x.id === id; });
                            if (idx < 0)
                                return [2 /*return*/];
                            if (!(act === 'delete')) return [3 /*break*/, 2];
                            return [4 /*yield*/, confirmAsync(ed, '确认删除该模板？')];
                        case 1:
                            ok = _a.sent();
                            if (!ok)
                                return [2 /*return*/];
                            arr.splice(idx, 1);
                            saveTemplates(arr);
                            api.close();
                            openManageTemplateDialog();
                            return [3 /*break*/, 3];
                        case 2:
                            if (act === 'copy') {
                                base = arr[idx].name;
                                name_1 = suggestName(arr, base);
                                item = __assign(__assign({}, arr[idx]), { id: uuid(), name: name_1, createdAt: now(), updatedAt: now() });
                                arr.unshift(item);
                                saveTemplates(arr);
                                api.close();
                                openManageTemplateDialog();
                            }
                            else if (act === 'rename') {
                                renameHtml = "\n        <div style=\"padding:8px\">\n          <div style=\"margin-bottom:8px\">\u91CD\u547D\u540D\u6A21\u677F</div>\n          <input id=\"tpl-rename\" style=\"width:100%;padding:6px;border:1px solid #d9d9d9;border-radius:4px\" value=\"".concat(esc(arr[idx].name), "\" />\n        </div>");
                                renameSpec = { title: '重命名', body: { type: 'panel', items: [{ type: 'htmlpanel', html: renameHtml }] }, buttons: [{ type: 'custom', name: 'ok', text: '保存' }, { type: 'cancel', text: '取消' }], onAction: function (api2, d2) { if (d2.name !== 'ok')
                                        return; var nInput = document.querySelector('#tpl-rename'); var newName = trim((nInput === null || nInput === void 0 ? void 0 : nInput.value) || ''); if (!newName) {
                                        ed.notificationManager.open({ text: '名称不能为空', type: 'warning' });
                                        return;
                                    } var arr2 = loadTemplates(); if (arr2.some(function (x) { return x.name === newName && x.id !== id; })) {
                                        ed.notificationManager.open({ text: '已存在同名模板', type: 'warning' });
                                        return;
                                    } var j = arr2.findIndex(function (x) { return x.id === id; }); if (j >= 0) {
                                        arr2[j].name = newName;
                                        arr2[j].updatedAt = now();
                                        saveTemplates(arr2);
                                    } api2.close(); api.close(); openManageTemplateDialog(); } };
                                ed.windowManager.open(renameSpec);
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }, 0);
    };
    var openInsertDataTableDialog = function () { return __awaiter(_this, void 0, void 0, function () {
        var B, getTables, getTableName, getViews, getViewName, getVisibleFieldIds, getRecordIdsInView, tables, tableNames, initialViews, _a, initialViewNames, initialIds, _b, initialCount, optionsOf, html, spec, api;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    B = (typeof bitable !== 'undefined' ? bitable : window.bitable);
                    if (!B || !B.base) {
                        ed.windowManager.open({ title: '插入数据表', body: { type: 'panel', items: [{ type: 'htmlpanel', html: '<div style="padding:8px">未检测到 Base SDK</div>' }] }, buttons: [{ type: 'cancel', text: '关闭' }] });
                        return [2 /*return*/];
                    }
                    getTables = function () { return __awaiter(_this, void 0, void 0, function () { var t, _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 6, , 7]);
                                if (!B.base.getTableList) return [3 /*break*/, 2];
                                return [4 /*yield*/, B.base.getTableList()];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                if (!B.base.getTables) return [3 /*break*/, 4];
                                return [4 /*yield*/, B.base.getTables()];
                            case 3: return [2 /*return*/, _b.sent()];
                            case 4: return [4 /*yield*/, B.base.getActiveTable()];
                            case 5:
                                t = _b.sent();
                                return [2 /*return*/, t ? [t] : []];
                            case 6:
                                _a = _b.sent();
                                return [2 /*return*/, []];
                            case 7: return [2 /*return*/];
                        }
                    }); }); };
                    getTableName = function (t) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                if (!t.getName) return [3 /*break*/, 2];
                                return [4 /*yield*/, t.getName()];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2: return [2 /*return*/, t.name || '未命名表'];
                            case 3:
                                _a = _b.sent();
                                return [2 /*return*/, '未命名表'];
                            case 4: return [2 /*return*/];
                        }
                    }); }); };
                    getViews = function (t) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 5, , 6]);
                                if (!t.getViewList) return [3 /*break*/, 2];
                                return [4 /*yield*/, t.getViewList()];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                if (!t.getViews) return [3 /*break*/, 4];
                                return [4 /*yield*/, t.getViews()];
                            case 3: return [2 /*return*/, _b.sent()];
                            case 4: return [2 /*return*/, []];
                            case 5:
                                _a = _b.sent();
                                return [2 /*return*/, []];
                            case 6: return [2 /*return*/];
                        }
                    }); }); };
                    getViewName = function (v) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                if (!v.getName) return [3 /*break*/, 2];
                                return [4 /*yield*/, v.getName()];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2: return [2 /*return*/, v.name || '未命名视图'];
                            case 3:
                                _a = _b.sent();
                                return [2 /*return*/, '未命名视图'];
                            case 4: return [2 /*return*/];
                        }
                    }); }); };
                    getVisibleFieldIds = function (v) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 7, , 8]);
                                if (!v)
                                    return [2 /*return*/, null];
                                if (!v.getVisibleFieldIdList) return [3 /*break*/, 2];
                                return [4 /*yield*/, v.getVisibleFieldIdList()];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                if (!v.getVisibleFieldIds) return [3 /*break*/, 4];
                                return [4 /*yield*/, v.getVisibleFieldIds()];
                            case 3: return [2 /*return*/, _b.sent()];
                            case 4:
                                if (!v.getFieldIdList) return [3 /*break*/, 6];
                                return [4 /*yield*/, v.getFieldIdList()];
                            case 5: return [2 /*return*/, _b.sent()];
                            case 6:
                                if (Array.isArray(v.fields))
                                    return [2 /*return*/, v.fields.map(function (x) { return (typeof x === 'string' ? x : x.id); })];
                                return [3 /*break*/, 8];
                            case 7:
                                _a = _b.sent();
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/, null];
                        }
                    }); }); };
                    getRecordIdsInView = function (t, v) { return __awaiter(_this, void 0, void 0, function () { var recs, _a, _b; return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 5, , 6]);
                                if (!(v === null || v === void 0 ? void 0 : v.getRecordIdList)) return [3 /*break*/, 2];
                                return [4 /*yield*/, v.getRecordIdList()];
                            case 1: return [2 /*return*/, _c.sent()];
                            case 2:
                                if (!(v === null || v === void 0 ? void 0 : v.getRecords)) return [3 /*break*/, 4];
                                return [4 /*yield*/, v.getRecords()];
                            case 3:
                                recs = _c.sent();
                                return [2 /*return*/, Array.isArray(recs) ? recs.map(function (r) { return (r === null || r === void 0 ? void 0 : r.id) || (r === null || r === void 0 ? void 0 : r.recordId); }).filter(function (x) { return typeof x === 'string'; }) : []];
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                _a = _c.sent();
                                return [3 /*break*/, 6];
                            case 6:
                                _c.trys.push([6, 8, , 9]);
                                return [4 /*yield*/, t.getRecordIdList()];
                            case 7: return [2 /*return*/, _c.sent()];
                            case 8:
                                _b = _c.sent();
                                return [2 /*return*/, []];
                            case 9: return [2 /*return*/];
                        }
                    }); }); };
                    return [4 /*yield*/, getTables()];
                case 1:
                    tables = _c.sent();
                    return [4 /*yield*/, Promise.all(tables.map(function (t) { return getTableName(t); }))];
                case 2:
                    tableNames = _c.sent();
                    if (!tables[0]) return [3 /*break*/, 4];
                    return [4 /*yield*/, getViews(tables[0])];
                case 3:
                    _a = _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = [];
                    _c.label = 5;
                case 5:
                    initialViews = _a;
                    return [4 /*yield*/, Promise.all(initialViews.map(function (v) { return getViewName(v); }))];
                case 6:
                    initialViewNames = _c.sent();
                    if (!(tables[0] && initialViews[0])) return [3 /*break*/, 8];
                    return [4 /*yield*/, getRecordIdsInView(tables[0], initialViews[0])];
                case 7:
                    _b = _c.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _b = [];
                    _c.label = 9;
                case 9:
                    initialIds = _b;
                    initialCount = Math.max(1, Array.isArray(initialIds) ? initialIds.length : 20);
                    optionsOf = function (arr) { return arr.map(function (n, i) { return "<option value=\"".concat(i, "\">").concat(esc(n), "</option>"); }).join(''); };
                    html = "\n      <div style=\"padding:8px\">\n        <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:8px\">\n          <label style=\"width:84px\">\u6570\u636E\u8868</label>\n          <select id=\"ins-table\" style=\"flex:1;padding:6px;border:1px solid #d9d9d9;border-radius:4px\">".concat(optionsOf(tableNames), "</select>\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:center;margin-bottom:8px\">\n          <label style=\"width:84px\">\u89C6\u56FE</label>\n          <select id=\"ins-view\" style=\"flex:1;padding:6px;border:1px solid #d9d9d9;border-radius:4px\">").concat(optionsOf(initialViewNames), "</select>\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:center\">\n          <label style=\"width:84px\">\u8BB0\u5F55\u884C\u6570</label>\n          <input id=\"ins-limit\" type=\"number\" min=\"1\" value=\"").concat(initialCount, "\" style=\"width:120px;padding:6px;border:1px solid #d9d9d9;border-radius:4px\" />\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:center\">\n          <label style=\"width:84px\">\u663E\u793A\u5E8F\u53F7</label>\n          <input id=\"ins-index\" type=\"checkbox\" />\n        </div>\n      </div>");
                    spec = { title: '插入数据表', size: 'normal', body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] }, buttons: [{ type: 'custom', name: 'insert', text: '插入' }, { type: 'cancel', text: '取消' }], onAction: function (api, details) { return __awaiter(_this, void 0, void 0, function () {
                            var dlg, tableSel, viewSel, limitInput, indexInput, showIndex_1, ti, t_1, views, vi, v, recIds, maxRows, metasAll_1, visibleIds, metas_1, fieldHandles_1, valueRows, headerColsData, headerCols, bodyRows, htmlTable, e_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (details.name !== 'insert')
                                            return [2 /*return*/];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 8, , 9]);
                                        dlg = document.querySelector('.tox-dialog');
                                        tableSel = dlg ? dlg.querySelector('#ins-table') : null;
                                        viewSel = dlg ? dlg.querySelector('#ins-view') : null;
                                        limitInput = dlg ? dlg.querySelector('#ins-limit') : null;
                                        indexInput = dlg ? dlg.querySelector('#ins-index') : null;
                                        showIndex_1 = !!(indexInput && indexInput.checked);
                                        ti = Math.max(0, Math.min(tables.length - 1, Number((tableSel === null || tableSel === void 0 ? void 0 : tableSel.value) || 0)));
                                        t_1 = tables[ti];
                                        return [4 /*yield*/, getViews(t_1)];
                                    case 2:
                                        views = _a.sent();
                                        vi = Math.max(0, Math.min(views.length - 1, Number((viewSel === null || viewSel === void 0 ? void 0 : viewSel.value) || 0)));
                                        v = views[vi];
                                        return [4 /*yield*/, getRecordIdsInView(t_1, v)];
                                    case 3:
                                        recIds = _a.sent();
                                        if (!Array.isArray(recIds))
                                            recIds = [];
                                        maxRows = Math.max(1, Number((limitInput === null || limitInput === void 0 ? void 0 : limitInput.value) || recIds.length || 1));
                                        return [4 /*yield*/, t_1.getFieldMetaList()];
                                    case 4:
                                        metasAll_1 = _a.sent();
                                        return [4 /*yield*/, getVisibleFieldIds(v)];
                                    case 5:
                                        visibleIds = _a.sent();
                                        metas_1 = visibleIds && visibleIds.length > 0 ? visibleIds.map(function (id) { return metasAll_1.find(function (m) { return m.id === id; }); }).filter(function (x) { return !!x; }) : metasAll_1;
                                        if (!metas_1 || metas_1.length === 0) {
                                            ed.notificationManager.open({ text: '该视图无可显示字段', type: 'warning' });
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, Promise.all(metas_1.map(function (m) { return t_1.getField(m.id); }))];
                                    case 6:
                                        fieldHandles_1 = _a.sent();
                                        recIds = recIds.slice(0, maxRows);
                                        return [4 /*yield*/, Promise.all(recIds.map(function (rid) { return __awaiter(_this, void 0, void 0, function () { var vals; return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Promise.all(fieldHandles_1.map(function (f) { return f.getValue(rid); }))];
                                                    case 1:
                                                        vals = _a.sent();
                                                        return [2 /*return*/, vals.map(function (val, idx) { return esc(formatValue(metas_1[idx], val)); })];
                                                }
                                            }); }); }))];
                                    case 7:
                                        valueRows = _a.sent();
                                        headerColsData = metas_1.map(function (m) { return "<th style=\"padding:8px;border-bottom:1px solid #eee;text-align:left;\">".concat(esc(m.name), "</th>"); }).join('');
                                        headerCols = (showIndex_1 ? "<th style=\"padding:8px;border-bottom:1px solid #eee;text-align:left;\">\u5E8F\u53F7</th>" : '') + headerColsData;
                                        bodyRows = valueRows.map(function (row, i) { var indexCell = showIndex_1 ? "<td style=\"padding:8px;border-bottom:1px solid #eee;vertical-align:top;\">".concat(i + 1, "</td>") : ''; return "<tr>".concat(indexCell).concat(row.map(function (txt) { return "<td style=\"padding:8px;border-bottom:1px solid #eee;vertical-align:top;\">".concat(txt || '', "</td>"); }).join(''), "</tr>"); }).join('');
                                        htmlTable = "<table style=\"width:100%;border-collapse:collapse;table-layout:fixed\"><thead><tr>".concat(headerCols, "</tr></thead><tbody>").concat(bodyRows, "</tbody></table>");
                                        ed.insertContent(htmlTable);
                                        api.close();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        e_1 = _a.sent();
                                        ed.notificationManager.open({ text: '插入失败：' + String((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1), type: 'warning' });
                                        return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); } };
                    api = ed.windowManager.open(spec);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var dlg, body, tableSel_1, viewSel_1, limitInput_1, updateViews_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            try {
                                dlg = document.querySelector('.tox-dialog');
                                body = dlg ? dlg.querySelector('.tox-dialog__body') : null;
                                if (!body)
                                    return [2 /*return*/];
                                tableSel_1 = body.querySelector('#ins-table');
                                viewSel_1 = body.querySelector('#ins-view');
                                limitInput_1 = body.querySelector('#ins-limit');
                                updateViews_1 = function () { return __awaiter(_this, void 0, void 0, function () { var ti, t, views, names, ids, _a, _b; return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            ti = Math.max(0, Math.min(tables.length - 1, Number((tableSel_1 === null || tableSel_1 === void 0 ? void 0 : tableSel_1.value) || 0)));
                                            t = tables[ti];
                                            return [4 /*yield*/, getViews(t)];
                                        case 1:
                                            views = _c.sent();
                                            return [4 /*yield*/, Promise.all(views.map(function (v) { return getViewName(v); }))];
                                        case 2:
                                            names = _c.sent();
                                            viewSel_1.innerHTML = optionsOf(names);
                                            _c.label = 3;
                                        case 3:
                                            _c.trys.push([3, 7, , 8]);
                                            if (!views[0]) return [3 /*break*/, 5];
                                            return [4 /*yield*/, getRecordIdsInView(t, views[0])];
                                        case 4:
                                            _a = _c.sent();
                                            return [3 /*break*/, 6];
                                        case 5:
                                            _a = [];
                                            _c.label = 6;
                                        case 6:
                                            ids = _a;
                                            if (limitInput_1)
                                                limitInput_1.value = String(Math.max(1, Array.isArray(ids) ? ids.length : 20));
                                            return [3 /*break*/, 8];
                                        case 7:
                                            _b = _c.sent();
                                            return [3 /*break*/, 8];
                                        case 8: return [2 /*return*/];
                                    }
                                }); }); };
                                if (tableSel_1)
                                    tableSel_1.addEventListener('change', function () { updateViews_1(); });
                                if (viewSel_1)
                                    viewSel_1.addEventListener('change', function () { return __awaiter(_this, void 0, void 0, function () { var ti, t, views, vi, v, ids, _a; return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 3, , 4]);
                                                ti = Math.max(0, Math.min(tables.length - 1, Number((tableSel_1 === null || tableSel_1 === void 0 ? void 0 : tableSel_1.value) || 0)));
                                                t = tables[ti];
                                                return [4 /*yield*/, getViews(t)];
                                            case 1:
                                                views = _b.sent();
                                                vi = Math.max(0, Math.min(views.length - 1, Number((viewSel_1 === null || viewSel_1 === void 0 ? void 0 : viewSel_1.value) || 0)));
                                                v = views[vi];
                                                return [4 /*yield*/, getRecordIdsInView(t, v)];
                                            case 2:
                                                ids = _b.sent();
                                                if (limitInput_1)
                                                    limitInput_1.value = String(Math.max(1, Array.isArray(ids) ? ids.length : 20));
                                                return [3 /*break*/, 4];
                                            case 3:
                                                _a = _b.sent();
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    }); }); });
                            }
                            catch (_b) { }
                            return [2 /*return*/];
                        });
                    }); }, 0);
                    return [2 /*return*/];
            }
        });
    }); };
    ed.ui.registry.addMenuButton('templates', { text: '模板', fetch: function (callback) { var items = [{ type: 'menuitem', text: '保存为模板', onAction: function () { return openSaveTemplateDialog(); } }, { type: 'menuitem', text: '应用模板', onAction: function () { return openApplyTemplateDialog(); } }, { type: 'menuitem', text: '管理模板', onAction: function () { return openManageTemplateDialog(); } }]; callback(items); } });
    ed.ui.registry.addButton('insertDataTable', { text: '插入数据表', onAction: function () { openInsertDataTableDialog(); } });
    ed.ui.registry.addButton('recordPicker', {
        text: '选择记录',
        onAction: function () { return __awaiter(_this, void 0, void 0, function () {
            var B, table, metas, recordIds, pageSize, page, fields, applyRecordToEditor, renderHtml, initialHtml, dlgRef, rowClickHandler, bindRowClicks, specFor;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        B = (typeof bitable !== 'undefined' ? bitable : window.bitable);
                        if (!B || !B.base) {
                            ed.windowManager.open({ title: '选择记录', body: { type: 'panel', items: [{ type: 'htmlpanel', html: '<div style="padding:8px">未检测到 Base SDK</div>' }] }, buttons: [{ type: 'cancel', text: '关闭' }] });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, B.base.getActiveTable()];
                    case 1:
                        table = _a.sent();
                        return [4 /*yield*/, table.getFieldMetaList()];
                    case 2:
                        metas = _a.sent();
                        if (!metas || metas.length === 0) {
                            ed.windowManager.open({ title: '选择记录', body: { type: 'panel', items: [{ type: 'htmlpanel', html: '<div style="padding:8px">当前表无字段</div>' }] }, buttons: [{ type: 'cancel', text: '关闭' }] });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, table.getRecordIdList()];
                    case 3:
                        recordIds = _a.sent();
                        pageSize = 10;
                        page = 0;
                        return [4 /*yield*/, Promise.all(metas.map(function (m) { return table.getField(m.id); }))];
                    case 4:
                        fields = _a.sent();
                        applyRecordToEditor = function (rid) { return __awaiter(_this, void 0, void 0, function () {
                            var tokens, valueMap;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        tokens = ed.getBody().querySelectorAll('span.bt-field[data-field-id], span.bt-field[data-field-name]');
                                        if (tokens.length === 0)
                                            return [2 /*return*/];
                                        valueMap = {};
                                        return [4 /*yield*/, Promise.all(metas.map(function (m, idx) { return __awaiter(_this, void 0, void 0, function () { var v; return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, fields[idx].getValue(rid)];
                                                    case 1:
                                                        v = _a.sent();
                                                        valueMap[m.id] = formatValue(m, v);
                                                        return [2 /*return*/];
                                                }
                                            }); }); }))];
                                    case 1:
                                        _a.sent();
                                        tokens.forEach(function (el) { var fid = el.getAttribute('data-field-id') || ''; var fname = el.getAttribute('data-field-name') || ''; var val = valueMap[fid]; if (!val) {
                                            var idx = metas.findIndex(function (mm) { return mm.name === fname; });
                                            if (idx >= 0) {
                                                var id2 = metas[idx].id;
                                                val = valueMap[id2];
                                                el.setAttribute('data-field-id', id2);
                                            }
                                        } if (typeof val === 'string') {
                                            el.textContent = val;
                                        } });
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        renderHtml = function () { return __awaiter(_this, void 0, void 0, function () {
                            var start, end, slice, valueRows, headerCols, containerVh, rowH, rows, html;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        start = page * pageSize;
                                        end = Math.min(recordIds.length, start + pageSize);
                                        slice = recordIds.slice(start, end);
                                        return [4 /*yield*/, Promise.all(slice.map(function (id) { return __awaiter(_this, void 0, void 0, function () { var vals; return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Promise.all(fields.map(function (f) { return f.getValue(id); }))];
                                                    case 1:
                                                        vals = _a.sent();
                                                        return [2 /*return*/, vals.map(function (v, idx) { return formatValue(metas[idx], v); })];
                                                }
                                            }); }); }))];
                                    case 1:
                                        valueRows = _a.sent();
                                        headerCols = metas.map(function (m) { return "<th style=\"position:sticky;top:0;z-index:2;text-align:left;padding:8px 6px;background:#fff;color:#666;border-bottom:1px solid #eee;box-shadow:0 2px 6px rgba(0,0,0,0.08);\">".concat(m.name, "</th>"); }).join('');
                                        containerVh = 65;
                                        rowH = "calc(".concat(containerVh, "vh / ").concat(pageSize, ")");
                                        rows = slice.map(function (id, idx) { var cols = valueRows[idx].map(function (txt) { return "<td style=\"padding:8px 6px;border-bottom:1px solid #eee;vertical-align:top;\">".concat(esc(txt || ''), "</td>"); }).join(''); return "<tr data-rec-id=\"".concat(id, "\" style=\"height:").concat(rowH, ";cursor:pointer\">").concat(cols, "</tr>"); }).join('');
                                        html = "\n        <div style=\"padding:8px;height:".concat(containerVh, "vh;box-sizing:border-box\">\n          <div style=\"margin-bottom:8px;font-weight:600\">\u5F53\u524D\u8868\u5B57\u6BB5\u5217\u8868</div>\n          <div style=\"overflow-x:auto;overflow-y:auto\">\n            <table style=\"width:max-content;border-collapse:collapse;min-width:100%;table-layout:fixed\">\n              <thead><tr>").concat(headerCols, "</tr></thead>\n              <tbody>").concat(rows, "</tbody>\n            </table>\n          </div>\n        </div>");
                                        return [2 /*return*/, html];
                                }
                            });
                        }); };
                        return [4 /*yield*/, renderHtml()];
                    case 5:
                        initialHtml = _a.sent();
                        rowClickHandler = function (e) { return __awaiter(_this, void 0, void 0, function () { var target, tr, rid; return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    target = e.target;
                                    tr = target && target.closest ? target.closest('tr[data-rec-id]') : null;
                                    if (!tr) return [3 /*break*/, 2];
                                    rid = tr.getAttribute('data-rec-id');
                                    if (!rid) return [3 /*break*/, 2];
                                    return [4 /*yield*/, applyRecordToEditor(rid)];
                                case 1:
                                    _a.sent();
                                    if (dlgRef && typeof dlgRef.close === 'function')
                                        dlgRef.close();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        }); }); };
                        bindRowClicks = function () { setTimeout(function () { var dlg = document.querySelector('.tox-dialog'); var body = dlg ? dlg.querySelector('.tox-dialog__body') : null; if (body) {
                            body.removeEventListener('click', rowClickHandler);
                            body.addEventListener('click', rowClickHandler);
                        } }, 0); };
                        specFor = function (html) { var tp = Math.max(1, Math.ceil(recordIds.length / pageSize)); var it = "\u7B2C ".concat(page + 1, " / ").concat(tp, " \u9875\uFF0C\u5171 ").concat(recordIds.length, " \u6761"); return { title: '选择记录', size: 'large', body: { type: 'panel', items: [{ type: 'htmlpanel', html: html }] }, buttons: [{ type: 'custom', name: 'info', text: it }, { type: 'custom', name: 'prev', text: '上一页' }, { type: 'custom', name: 'next', text: '下一页' }, { type: 'cancel', text: '关闭' }], onAction: function (dlgApi, details) { return __awaiter(_this, void 0, void 0, function () { var newHtml, newHtml, e_2; return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 6, , 7]);
                                        if (!(details.name === 'prev')) return [3 /*break*/, 3];
                                        if (!(page > 0)) return [3 /*break*/, 2];
                                        page -= 1;
                                        return [4 /*yield*/, renderHtml()];
                                    case 1:
                                        newHtml = _a.sent();
                                        dlgApi.redial(specFor(newHtml));
                                        bindRowClicks();
                                        _a.label = 2;
                                    case 2: return [3 /*break*/, 5];
                                    case 3:
                                        if (!(details.name === 'next')) return [3 /*break*/, 5];
                                        if (!((page + 1) * pageSize < recordIds.length)) return [3 /*break*/, 5];
                                        page += 1;
                                        return [4 /*yield*/, renderHtml()];
                                    case 4:
                                        newHtml = _a.sent();
                                        dlgApi.redial(specFor(newHtml));
                                        bindRowClicks();
                                        _a.label = 5;
                                    case 5: return [3 /*break*/, 7];
                                    case 6:
                                        e_2 = _a.sent();
                                        ed.notificationManager.open({ text: String((e_2 === null || e_2 === void 0 ? void 0 : e_2.message) || e_2), type: 'warning' });
                                        return [3 /*break*/, 7];
                                    case 7: return [2 /*return*/];
                                }
                            }); }); } }; };
                        dlgRef = ed.windowManager.open(specFor(initialHtml));
                        bindRowClicks();
                        return [2 /*return*/];
                }
            });
        }); }
    });
});
