// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"8tlRk":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "cd1b7dfce28d9c81";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"hW2dw":[function(require,module,exports,__globalThis) {
/**
 * Interactive Summaries App
 * Main application logic for interactive summaries
 */ var _interactiveSummariesDataJs = require("./interactive-summaries-data.js");
var _matrixRainJs = require("./quiz-engine/matrix-rain.js");
var _matrixTerminalJs = require("./quiz-engine/matrix-terminal.js");
class InteractiveSummariesApp {
    constructor(){
        this.currentCategory = null;
        this.currentSummary = null;
        this.matrixRain = null;
        this.matrixTerminal = null;
        this.init();
    }
    async init() {
        try {
            // Initialize matrix rain
            this.initMatrixRain();
            // Initialize matrix terminal
            this.initMatrixTerminal();
            // Setup event listeners
            this.setupEventListeners();
            console.log('Interactive Summaries App initialized');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new (0, _matrixRainJs.MatrixRain)(canvas);
            this.matrixRain.stop();
            // Configure for visibility
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.02)',
                speed: 25,
                density: 0.98,
                color: '#00ff41',
                fontSize: 16
            });
            this.matrixRain.start();
            console.log('Matrix rain initialized');
        }
    }
    initMatrixTerminal() {
        const container = document.getElementById('matrix-terminal-container');
        if (container) {
            this.matrixTerminal = new (0, _matrixTerminalJs.MatrixTerminal)();
            // Customize for interactive summaries
            this.matrixTerminal.bootSequence = [
                "NEUROL\xd3GIA INTERAKT\xcdV \xd6SSZEFOGLAL\xd3 RENDSZER v2.0.1",
                "Copyright (c) 2025 Neurol\xf3gia VizsgApp made by Dr. Zsolaj",
                "",
                "> INITIALIZING INTERACTIVE SUMMARIES...",
                "[ SYSTEM READY ]"
            ];
            this.matrixTerminal.terminalTitle = "NEURAL SUMMARY INTERFACE";
            this.matrixTerminal.init(container);
            console.log('Matrix terminal initialized for interactive summaries');
        }
    }
    setupEventListeners() {
        // Category card clicks
        document.querySelectorAll('.category-card').forEach((card)=>{
            card.addEventListener('click', ()=>{
                const category = card.dataset.category;
                this.handleCategorySelect(category);
            });
        });
        // Back button
        document.querySelectorAll('.back-button').forEach((button)=>{
            button.addEventListener('click', ()=>{
                const target = button.dataset.target;
                this.switchScreen(target);
            });
        });
    }
    handleCategorySelect(category) {
        console.log('Category selected:', category);
        this.currentCategory = category;
        const categoryData = (0, _interactiveSummariesDataJs.summariesData)[category];
        if (!categoryData) {
            console.error('Category not found:', category);
            return;
        }
        // Update screen title
        const titleElement = document.getElementById('summary-list-title');
        if (titleElement) titleElement.textContent = `${categoryData.title} - Interakt\xedv \xf6sszefoglal\xf3k`;
        // Display summaries
        this.displaySummaryList(categoryData);
        // Switch to summary list screen
        this.switchScreen('summary-list-screen');
    }
    displaySummaryList(categoryData) {
        const container = document.getElementById('summary-list-container');
        if (!container) return;
        // Clear existing content
        container.innerHTML = '';
        // Create summary items
        categoryData.summaries.forEach((summary)=>{
            const summaryItem = this.createSummaryItem(summary, categoryData.path);
            container.appendChild(summaryItem);
        });
    }
    createSummaryItem(summary, basePath) {
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `
            <div class="summary-topics">T\xe9m\xe1k: ${summary.topics}</div>
            <h3 class="summary-title">${summary.title}</h3>
            <div class="summary-topics-list">Interakt\xedv \xf6sszefoglal\xf3</div>
        `;
        div.addEventListener('click', ()=>{
            this.handleSummarySelect(summary, basePath);
        });
        return div;
    }
    async handleSummarySelect(summary, basePath) {
        console.log('Summary selected:', summary.title);
        this.currentSummary = summary;
        const summaryPath = basePath + summary.file;
        // Hide all screens
        document.querySelectorAll('.screen').forEach((screen)=>{
            screen.classList.remove('active');
        });
        // Load summary in matrix terminal
        if (this.matrixTerminal) await this.matrixTerminal.loadQuiz(summaryPath, summary.title);
    }
    switchScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach((screen)=>{
            screen.classList.remove('active');
        });
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) targetScreen.classList.add('active');
    }
    onTerminalClose() {
        // Return to summary list when terminal closes
        console.log('Terminal closed, returning to summary list');
        // Ensure we have a current category and repopulate the list if needed
        if (this.currentCategory) {
            const categoryData = (0, _interactiveSummariesDataJs.summariesData)[this.currentCategory];
            if (categoryData) {
                // Update screen title
                const titleElement = document.getElementById('summary-list-title');
                if (titleElement) titleElement.textContent = `${categoryData.title} - Interakt\xedv \xf6sszefoglal\xf3k`;
                // Ensure summary list is populated
                this.displaySummaryList(categoryData);
            }
            this.switchScreen('summary-list-screen');
        } else // No category selected, return to main screen
        this.switchScreen('category-screen');
    }
}
// Initialize app when DOM is ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ()=>{
    window.summariesApp = new InteractiveSummariesApp();
});
else window.summariesApp = new InteractiveSummariesApp();

},{"./interactive-summaries-data.js":"3P4Ji","./quiz-engine/matrix-rain.js":"01bGy","./quiz-engine/matrix-terminal.js":"6H5KU"}],"3P4Ji":[function(require,module,exports,__globalThis) {
/**
 * Interactive Summaries Data Structure
 * Maps categories to their summary HTML files
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "summariesData", ()=>summariesData);
const summariesData = {
    neuroanat: {
        title: "Neuroanat\xf3mia",
        description: "Interakt\xedv \xf6sszefoglal\xf3k az idegrendszer anat\xf3mi\xe1j\xe1r\xf3l",
        path: 'content/interactive_summary/Neuroanat/',
        summaries: [
            {
                topics: '1-3',
                title: "Koponya, gerinc, l\xe1t\xf3p\xe1lya",
                file: "1-3 koponya, gerinc, l\xe1t\xf3p\xe1lya.html"
            },
            {
                topics: '4-5',
                title: "Szemmozg\xe1s, tekint\xe9s",
                file: "4-5. Szemmozg\xe1s_tekint\xe9s.html"
            },
            {
                topics: '6, 14',
                title: "Agyt\xf6rzs anat\xf3mia",
                file: "6, 14Agyt\xf6rzs anatomia.html"
            },
            {
                topics: '7-8',
                title: 'N.V-N.VII',
                file: '7-8. N.V-N.VII.html'
            },
            {
                topics: '9, 12',
                title: "Vestibularis rendszer, sz\xe9d\xfcl\xe9s",
                file: "9, 12. Vestibularis rendszer_sz\xe9d\xfcl\xe9s.html"
            },
            {
                topics: '10-11',
                title: "Szagl\xe1s, hall\xe1s",
                file: "10-11. Szagl\xe1s, hall\xe1s.html"
            },
            {
                topics: '13, 15',
                title: "Bulbaris agyidegek, aktiv\xe1l\xf3 agyt\xf6rzsi rendszerek",
                file: "13, 15. bulbaris agyidegek_aktiv\xe1l\xf3 agyt\xf6rzsi rendszerek.html"
            },
            {
                topics: '16-18',
                title: 'Cerebellum, capsula interna, thalamus',
                file: '16-18. Cerebellum_capsint_thalamus.html'
            },
            {
                topics: '19-20',
                title: 'Basalis ganglionok',
                file: '19-20. basalis ggl.html'
            },
            {
                topics: '21, 22, 24',
                title: "Agyk\xe9reg, paresis, mozgat\xf3rendszer",
                file: "21,22, 24.agyk\xe9reg_paresis_mozgat\xf3rendszer.html"
            },
            {
                topics: '23, 25, 26',
                title: "Prefront\xe1lis, f\xe9ltekei dominancia, asszoci\xe1ci\xf3s k\xf6r\xf6k",
                file: "23, 25, 26.Prefrontalis_F\xe9ltekeidom_asszoci\xe1ci\xf3s k\xf6r\xf6k.html"
            },
            {
                topics: '28-30',
                title: 'Temporal, occipital, parietal lebeny',
                file: '28-30. temporal_occipital_parietal lobe.html'
            },
            {
                topics: '31-33',
                title: "Magatart\xe1s, mem\xf3ria, limbikus rendszer",
                file: "31-33. magatart\xe1s_mem\xf3ria_limbicus rendszer.html"
            },
            {
                topics: '34-35',
                title: 'Hippocampus, hypothalamo-hypophysis',
                file: '34-35. Hippocampus_hypothalamo_hypophysis.html'
            },
            {
                topics: '37-40',
                title: "Besz\xe9dzavar, f\xe1jdalom, gerincvel\u0151, izomt\xf3nus",
                file: "37-40. besz\xe9dzavar_f\xe1jdalom_gerincvel\u0151_izomt\xf3nus.html"
            },
            {
                topics: '41-43',
                title: "Plexus brachialis, lumbalis, sacralis, auton\xf3m",
                file: '41-43. plexus_brach_lumb_sacr_autonom.html'
            },
            {
                topics: '44-46',
                title: "Agyi kering\xe9s, k\xf3r\xe9lettan",
                file: "44-46. agyi kering\xe9s_k\xf3r\xe9lettan.html"
            },
            {
                topics: '47-50',
                title: "Carotis, vertebrobasilaris, v\xe9n\xe1s, gerincvel\u0151 v\xe9rell\xe1t\xe1s",
                file: "47-50. carotis_vertebrobasil_v\xe9n\xe1s_gv_v\xe9rell\xe1t\xe1s.html"
            },
            {
                topics: '51-54',
                title: 'Thalamus, sinusok, liquor',
                file: '51-54.thalamus, sinusok, liquor.html'
            },
            {
                topics: '55-59',
                title: "BBB, v\xe9r-liquor g\xe1t, glia, transzmisszi\xf3",
                file: "55-59. BBB, v\xe9r-liquor g\xe1t, glia, transzmisszi\xf3.html"
            }
        ]
    },
    vizsmod: {
        title: "Vizsg\xe1l\xf3m\xf3dszerek, alap klinikum",
        description: "Diagnosztikai m\xf3dszerek \xe9s klinikai vizsg\xe1latok",
        path: "content/interactive_summary/vizsg\xe1l\xf3m\xf3dszerek, alap klinikum/",
        summaries: [
            {
                topics: '60-62',
                title: "EEG, alv\xe1s, \xfcr\xedt\xe9s",
                file: "60-62. EEG, alv\xe1s, \xfcr\xedt\xe9s.html"
            },
            {
                topics: '63-65',
                title: "Plaszticit\xe1s, genetika, gy\xf3gyszerinterakci\xf3k",
                file: "63-65. plaszt_genetika_gy\xf3gyszerint.html"
            },
            {
                topics: '66-71',
                title: "Liquor, neurofiziol\xf3gia",
                file: "66-71. liquor_neurofiziol\xf3gia.html"
            },
            {
                topics: '72-75',
                title: "K\xe9palkot\xf3 vizsg\xe1latok",
                file: "72-75. k\xe9palkot\xf3.html"
            },
            {
                topics: '76-79',
                title: "Hematol\xf3gia, szagl\xe1s, szemmozg\xe1s, pupilla",
                file: '76-79. HEMAT_SZAGL_SZEMMOZG_PUPILLA.html'
            },
            {
                topics: '80-83',
                title: 'Diplopia, facialis, nystagmus',
                file: '80-83. DIPLOPIA_FACIALIS_NYSTAGMUS.html'
            },
            {
                topics: '84-87',
                title: "Dysarthria, \xe9rz\xe9szavar, izomgyenges\xe9g",
                file: "84-87. DYSARTHIA_\xc9RZ\xc9SZAVAR_IZOMGYENG.html"
            },
            {
                topics: '88-90',
                title: 'Reflex, kisagy, ataxia',
                file: '88-90. REFLEX_KISAGY_ATAXIA.html'
            },
            {
                topics: '91-96',
                title: "Aphasia, neglect, apraxia, exekut\xedv, liber\xe1ci\xf3",
                file: '91-96. APHASIA_NEGLEKT_APRAXIA_EXEKUTIV_LIBERATIO.html'
            },
            {
                topics: '97-100',
                title: "Eszm\xe9letlen, zavar, hypnoid, non-hypnoid",
                file: "97-100. ESZM\xc9LETLEN_ZAVAR_HYPNOID_NONHYPN.html"
            },
            {
                topics: '101-103',
                title: "ICP, herni\xe1ci\xf3, fejf\xe1j\xe1s",
                file: "101-103 ICP_HERNIATIO_FEJF\xc1J.html"
            },
            {
                topics: '104-106',
                title: "Demencia, mem\xf3ria, thalamus",
                file: "104-106. DEMENCIA_MEM\xd3RIA_THALAMUS.html"
            },
            {
                topics: '107-112',
                title: "Gerincvel\u0151, myelopathia, gerincvel\u0151 s\xe9r\xfcl\xe9s",
                file: "107-112. GERINCVEL\u0150_MYELOPATHIA_GERINCVS\xc9R.html"
            },
            {
                topics: '109, 113-114',
                title: "Fels\u0151-als\xf3 v\xe9gtag, tard\xedv dyskinesia",
                file: "109; 113-114. FELS\u0150_ALS\xd3_V\xc9GTAG_TARDIV.html"
            },
            {
                topics: '115-118',
                title: "ACM, watershed, agyt\xf6rzs, lacuna",
                file: "115-118. ACM_WATERSHED_AGYT\xd6RZS_LACUNA.html"
            },
            {
                topics: '119-123',
                title: "Steal, craniocervicalis, atherosclerosis, cerebrovascularis, prevenci\xf3",
                file: '119-123. STEAL_CRANIOCERV_ATHERO_CEREBROVASC_PREV.html'
            },
            {
                topics: '124-128',
                title: "Stroke, TIA, cardioembolia, kezel\xe9s, fiatal",
                file: '124-128. STROKE_TIA_CARDEMB_KEZEL_FIATAL.html'
            },
            {
                topics: '129-133',
                title: "Coagulopathia, antikoagul\xe1ci\xf3, reperf\xfazi\xf3, ICH, SAV",
                file: '129-133. COAG_ANTIKOAG_REPERFUZIO_ICH_SAV.html'
            },
            {
                topics: '134-137',
                title: "\xc9rfejl\u0151d\xe9si rendelleness\xe9gek, gerincvel\u0151 k\xe1rosod\xe1s, epilepszia",
                file: "134-137. \xc9RFEJL_GVK\xc1R_EPILEPI.html"
            },
            {
                topics: '138-141',
                title: "Epilepszia vizsg\xe1lat, kezel\xe9s",
                file: "138-141.EPILEPI_VIZSG_KEZEL\xc9S.html"
            },
            {
                topics: '142-146',
                title: "Antiepilepticumok, r\xf6vid eszm\xe9letveszt\xe9s, idegseb\xe9szet",
                file: "142-146. Antiepilepticumok_R\xd6VIDESM_IDEGSEBEPI.html"
            },
            {
                topics: '147-149',
                title: 'Encephalopathia, EEG, myelopathia',
                file: '147-149. ENCEPH_EEG_MYELOPATHIA.html'
            },
            {
                topics: '150-152',
                title: "PRES, feh\xe9r\xe1llom\xe1ny",
                file: "150-152. PRES_FEH\xc9R\xc1LL.html"
            },
            {
                topics: '153-156',
                title: 'Autoimmun, SM, myelin',
                file: '153-156. AUTOIMM_SM_MYELIN.html'
            },
            {
                topics: '157-159',
                title: 'Myelitis, MG, GBS, CIDP',
                file: '157-159. MYELITIS_MG_GBS_CIDP.html'
            },
            {
                topics: '160-162',
                title: "Neuroimmun ter\xe1pia, immunmodul\xe1ci\xf3",
                file: '160-162. NEUROIMMUN_THERAPIA_IMMUNMOD.html'
            },
            {
                topics: '163-166',
                title: 'Glioma, sella, neurocutan',
                file: '163-166. GLIOME_SELLA_NEUROCUTAN.html'
            },
            {
                topics: '167-170',
                title: "Metastasis, \xf6d\xe9ma, ICP",
                file: "167-170. META_\xd6D\xc9MA_ICP.html"
            },
            {
                topics: '171-174',
                title: "Mirigy, encephalopathia, s\xf3-v\xedz",
                file: "171-174. MIRIGY_ENCEPH_S\xd3VIZ.html"
            },
            {
                topics: '175-179',
                title: "Vitaminhi\xe1ny, hematol\xf3gia, paraneoplasia, intoxik\xe1ci\xf3",
                file: "175-179. VITAMINHI\xc1NY_HEMAT_PARANEO_INTOX.html"
            }
        ]
    },
    klinikum: {
        title: 'Klinikum',
        description: "Neurol\xf3giai betegs\xe9gek \xe9s kezel\xe9sek",
        path: 'content/interactive_summary/Klinikum/',
        summaries: [
            {
                topics: '180-184',
                title: "Szervtranszplant\xe1ci\xf3, drog, alkohol, alv\xe1s, OSAS",
                file: "180-184. SZERVTRANSZPLANT_DROG_ALK_ALV\xc1S_OSAS.html"
            },
            {
                topics: '185-187',
                title: 'Parkinson, Parkinson-plus',
                file: '185-187. PARKINSON_PARKINSONPLUS.html'
            },
            {
                topics: '188-192',
                title: 'Tremor, Wilson, Parkinson-plus',
                file: '188-192. TERMOR_WILSON_PARKINSONPLUS.html'
            },
            {
                topics: '193-195',
                title: 'Dystonia, chorea, botox',
                file: '193-195. DYSTONIA_CHOREA_BOTOX.html'
            },
            {
                topics: '195-199',
                title: "J\xe1r\xe1s, idegseb\xe9szet, meningitis",
                file: "195-199. J\xc1R\xc1S_IDEGSEB_MENINGITIS.html"
            },
            {
                topics: '200-203',
                title: "Neuroinfekci\xf3",
                file: "200-203. NEUROINFEKCI\xd3.html"
            },
            {
                topics: '204-207',
                title: 'TBC, encephalitis',
                file: '204-207. TBC_ENCEPHALIPITS.html'
            },
            {
                topics: '208-212',
                title: 'Bell, mononeuropathia, polyneuropathia',
                file: '208-212. BELL_MONONEURO_POLYNEURO.html'
            },
            {
                topics: '213-216',
                title: "Polyneuropathia, alag\xfat, motoneuron",
                file: '213-216. POLYNEURO_ALAGUT_MOTONEURO.html'
            },
            {
                topics: '217-219',
                title: "Izombetegs\xe9g, izomdystrophia",
                file: '217-219. IZOMBET_IZOMDYSTR.html'
            },
            {
                topics: '220-222',
                title: "Myopathia, f\xe1jdalom szindr\xf3ma",
                file: "220-222. MYOPATHIA_F\xc1JDALOMSY.html"
            },
            {
                topics: '223-226',
                title: "Migr\xe9n, cluster, neuropathia",
                file: "223-226. MIGR\xc9N_CLUSTER_NEUROPATHIA.html"
            },
            {
                topics: '227-230',
                title: 'Pseudotumor, Alzheimer, nem-Alzheimer demencia',
                file: '227-230. PSEUDOTUMOR_ALZHEIMER_NEMALZDEMENCIA.html'
            },
            {
                topics: '231-235',
                title: "FTD, NPH, demencia kezel\xe9s, neuropszichol\xf3gia",
                file: '231-235. FTD_NPH_DEMENCKEZ_NEUROPSZICH.html'
            },
            {
                topics: '236-239',
                title: "Mitokondri\xe1lis, trinukleotid, neurogenetika",
                file: '236-239. MITOKONDR_TRINUKL_NEUROGENETIKA.html'
            },
            {
                topics: '240-243',
                title: "Neurorehabilit\xe1ci\xf3, koponyatrauma",
                file: '240-243. NEUROREHAB_KOPONYATRAUMA.html'
            },
            {
                topics: '244-247',
                title: "Agytrauma, gerincvel\u0151 har\xe1ntl\xe9zi\xf3",
                file: "244-247. AGYTRAUMA_GVHAR\xc1NTL\xc9Z.html"
            },
            {
                topics: '248-251',
                title: "Pszichoszomatika, organikus pszichi\xe1tria",
                file: '248-251. PSZICHOSZOM_ORGANIKUSPSZICH.html'
            },
            {
                topics: '252-254',
                title: "Monitor, agyhal\xe1l, s\xfcrg\u0151ss\xe9gi",
                file: "252-254. MONITOR_AGYHAL\xc1L_S\xdcRG\u0150SS\xc9GI.html"
            },
            {
                topics: '255-259',
                title: "Discopathia, sz\xe9d\xfcl\xe9s, hydrocephalus, id\u0151s, terhes neurol\xf3gia",
                file: "255-259. DISCOPATHIA_SZ\xc9D\xdcL_HYDROCEPH_ID\u0150S_TERHESNEURO.html"
            }
        ]
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}],"fLKIo":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"01bGy":[function(require,module,exports,__globalThis) {
/**
 * Matrix Rain Effect
 * Creates the iconic Matrix digital rain background effect
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MatrixRain", ()=>MatrixRain);
class MatrixRain {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Configuration
        this.config = {
            fontSize: 14,
            fontFamily: 'JetBrains Mono, monospace',
            color: '#00ff41',
            fadeColor: 'rgba(10, 10, 10, 0.05)',
            speed: 35,
            density: 0.95,
            characters: "\u30A2\u30A3\u30A4\u30A5\u30A6\u30A7\u30A8\u30A9\u30AA\u30AB\u30AC\u30AD\u30AE\u30AF\u30B0\u30B1\u30B2\u30B3\u30B4\u30B5\u30B6\u30B7\u30B8\u30B9\u30BA\u30BB\u30BC\u30BD\u30BE\u30BF\u30C0\u30C1\u30C2\u30C4\u30C5\u30C6\u30C7\u30C8\u30C9\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D0\u30D1\u30D2\u30D3\u30D4\u30D5\u30D6\u30D7\u30D8\u30D9\u30DA\u30DB\u30DC\u30DD\u30DE\u30DF\u30E0\u30E1\u30E2\u30E3\u30E4\u30E5\u30E6\u30E7\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EE\u30EF\u30F0\u30F1\u30F2\u30F3\u30F4\u30F5\u30F6\u30F7\u30F8\u30F9\u30FA\u30FC\u30FD\u30FEABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"
        };
        // State
        this.columns = 0;
        this.drops = [];
        this.animationId = null;
        this.lastTime = 0;
        this.init();
    }
    /**
     * Initialize the effect
     */ init() {
        // Set canvas size
        this.resize();
        // Listen for window resize
        window.addEventListener('resize', ()=>this.resize());
        // Initialize drops
        this.initDrops();
    }
    /**
     * Resize canvas to window size
     */ resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Recalculate columns
        this.columns = Math.floor(this.canvas.width / this.config.fontSize);
        // Reinitialize drops if needed
        if (this.drops.length !== this.columns) this.initDrops();
    }
    /**
     * Initialize drop positions
     */ initDrops() {
        this.drops = [];
        for(let i = 0; i < this.columns; i++)// Start drops at random heights from top
        this.drops[i] = Math.random() * (this.canvas.height / this.config.fontSize) * -1;
    }
    /**
     * Start the animation
     */ start() {
        if (!this.animationId) this.animate();
    }
    /**
     * Stop the animation
     */ stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    /**
     * Animation loop
     */ animate(currentTime = 0) {
        this.animationId = requestAnimationFrame((time)=>this.animate(time));
        // Throttle to target speed
        if (currentTime - this.lastTime < this.config.speed) return;
        this.lastTime = currentTime;
        // Draw frame
        this.draw();
    }
    /**
     * Draw a frame
     */ draw() {
        // Fade previous frame
        this.ctx.fillStyle = this.config.fadeColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Set text properties
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
        // Draw characters
        for(let i = 0; i < this.drops.length; i++){
            // Get random character
            const char = this.config.characters.charAt(Math.floor(Math.random() * this.config.characters.length));
            // Calculate position
            const x = i * this.config.fontSize;
            const y = this.drops[i] * this.config.fontSize;
            // Draw character with varying opacity
            const opacity = this.getOpacity(this.drops[i]);
            this.ctx.fillStyle = this.hexToRgba(this.config.color, opacity);
            this.ctx.fillText(char, x, y);
            // Move drop down
            if (y > this.canvas.height && Math.random() > this.config.density) // Reset to top
            this.drops[i] = 0;
            this.drops[i]++;
        }
    }
    /**
     * Get opacity based on position
     * @param {number} position - Drop position
     * @returns {number} Opacity value
     */ getOpacity(position) {
        const screenHeight = this.canvas.height / this.config.fontSize;
        const fadeStart = screenHeight * 0.6;
        if (position < 0) return 0;
        if (position < 5) return position / 5;
        if (position > fadeStart) {
            const fadeProgress = (position - fadeStart) / (screenHeight - fadeStart);
            return Math.max(0, 1 - fadeProgress);
        }
        return 1;
    }
    /**
     * Convert hex color to rgba
     * @param {string} hex - Hex color
     * @param {number} alpha - Alpha value
     * @returns {string} RGBA color
     */ hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    /**
     * Destroy the effect
     */ destroy() {
        this.stop();
        window.removeEventListener('resize', ()=>this.resize());
    }
    /**
     * Set configuration
     * @param {Object} config - Configuration object
     */ setConfig(config) {
        this.config = {
            ...this.config,
            ...config
        };
    }
    /**
     * Trigger a burst effect
     * @param {number} intensity - Burst intensity (0-1)
     */ burst(intensity = 0.5) {
        const affectedColumns = Math.floor(this.columns * intensity);
        const startColumn = Math.floor(Math.random() * (this.columns - affectedColumns));
        for(let i = startColumn; i < startColumn + affectedColumns; i++)this.drops[i] = 0;
    }
    /**
     * Create a wave effect
     */ wave() {
        for(let i = 0; i < this.columns; i++)setTimeout(()=>{
            this.drops[i] = 0;
        }, i * 10);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}],"6H5KU":[function(require,module,exports,__globalThis) {
/**
 * Matrix Terminal Component
 * Retrofuturistic terminal interface for loading quiz modules
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MatrixTerminal", ()=>MatrixTerminal);
class MatrixTerminal {
    constructor(){
        this.container = null;
        this.terminal = null;
        this.iframe = null;
        this.bootSequence = [
            "NEUROL\xd3GIA QUIZ SYSTEM v2.0.1",
            "Copyright (c) 2025 Neurol\xf3gia VizsgApp made by Dr. Zsolaj",
            "",
            "> INITIALIZING...",
            "[ SYSTEM READY ]"
        ];
        this.terminalTitle = "NEURAL QUIZ INTERFACE";
        this.isBooting = false;
    }
    /**
     * Initialize the terminal in the given container
     * @param {HTMLElement} container - Container element
     */ init(container) {
        this.container = container;
        this.createTerminal();
    }
    /**
     * Create the terminal UI
     */ createTerminal() {
        this.terminal = document.createElement('div');
        this.terminal.className = 'matrix-terminal';
        this.terminal.innerHTML = `
            <div class="terminal-frame">
                <div class="terminal-header">
                    <div class="terminal-title">${this.terminalTitle}</div>
                    <div class="terminal-controls">
                        <button class="terminal-btn minimize">_</button>
                        <button class="terminal-btn maximize">\u{25A1}</button>
                        <button class="terminal-btn close" id="terminal-close">\xd7</button>
                    </div>
                </div>
                <div class="terminal-body">
                    <div class="terminal-scanlines"></div>
                    <div class="terminal-glow"></div>
                    <div class="terminal-output" id="terminal-output"></div>
                    <div class="terminal-content" id="terminal-content">
                        <iframe 
                            id="quiz-iframe" 
                            class="quiz-iframe hidden"
                            allowfullscreen
                            allow="autoplay; fullscreen"
                            tabindex="0"
                            frameborder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        `;
        this.container.appendChild(this.terminal);
        // Get references
        this.output = document.getElementById('terminal-output');
        this.content = document.getElementById('terminal-content');
        this.iframe = document.getElementById('quiz-iframe');
        // Setup event listeners
        this.setupEventListeners();
    }
    /**
     * Setup event listeners
     */ setupEventListeners() {
        const closeBtn = document.getElementById('terminal-close');
        if (closeBtn) closeBtn.addEventListener('click', ()=>this.close());
        // Listen for iframe load
        if (this.iframe) this.iframe.addEventListener('load', ()=>this.onQuizLoaded());
    }
    /**
     * Show terminal with boot sequence
     */ async show() {
        // Reset terminal state
        this.reset();
        this.terminal.classList.add('active');
        await this.runBootSequence();
    }
    /**
     * Reset terminal to initial state
     */ reset() {
        // Clear output
        if (this.output) {
            this.output.innerHTML = '';
            this.output.classList.remove('fade-out');
            this.output.classList.remove('visible');
        }
        // Reset iframe
        if (this.iframe) {
            this.iframe.src = 'about:blank';
            this.iframe.classList.add('hidden');
            this.iframe.classList.remove('visible');
        }
        // Reset flags
        this.isBooting = false;
    }
    /**
     * Run boot sequence animation
     */ async runBootSequence() {
        this.isBooting = true;
        // Ensure output is visible and iframe is hidden
        this.output.innerHTML = '';
        this.output.classList.remove('fade-out');
        this.output.classList.add('visible');
        this.iframe.classList.add('hidden');
        this.iframe.classList.remove('visible');
        for (const line of this.bootSequence){
            await this.typeLine(line);
            await this.delay(90); // Reduced from 100ms (10% faster)
        }
        await this.delay(450); // Reduced from 500ms (10% faster)
        this.isBooting = false;
    }
    /**
     * Type a line in the terminal
     * @param {string} text - Text to type
     */ async typeLine(text) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        if (text.startsWith('>')) lineElement.classList.add('command');
        else if (text.startsWith('[')) lineElement.classList.add('success');
        this.output.appendChild(lineElement);
        // Type effect (10% faster)
        for(let i = 0; i < text.length; i++){
            lineElement.textContent = text.substring(0, i + 1);
            if (!text.startsWith('[')) await this.delay(18 + Math.random() * 27); // Reduced from 20-50ms to 18-45ms
        }
        // Add cursor blink at end
        if (text.length > 0) {
            lineElement.innerHTML += '<span class="cursor">\u2588</span>';
            await this.delay(180); // Reduced from 200ms (10% faster)
            lineElement.querySelector('.cursor')?.remove();
        }
        // Auto scroll
        this.output.scrollTop = this.output.scrollHeight;
    }
    /**
     * Load quiz in iframe
     * @param {string} quizPath - Path to quiz HTML
     * @param {string} title - Quiz title
     */ async loadQuiz(quizPath, title) {
        // Show terminal first
        await this.show();
        // Show loading message
        await this.typeLine(`> LOADING: ${title}`);
        // Wait a moment before loading to ensure boot sequence is visible
        await this.delay(450); // Reduced from 500ms (10% faster)
        // Load the quiz with absolute path from current location
        // This ensures the quiz loads from the correct path
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        const fullPath = window.location.origin + basePath + '/' + quizPath;
        console.log('[MatrixTerminal] Loading quiz from:', fullPath);
        this.iframe.src = fullPath;
    }
    /**
     * Called when quiz is loaded in iframe
     */ async onQuizLoaded() {
        // Ignore about:blank loads
        if (this.iframe.src === 'about:blank' || this.iframe.src === '') return;
        if (this.isBooting) return;
        await this.typeLine("[ MODULE LOADED ]");
        await this.delay(270); // Reduced from 300ms (10% faster)
        // Fade out terminal output, fade in quiz
        this.output.classList.add('fade-out');
        await this.delay(270); // Reduced from 300ms (10% faster)
        this.output.classList.remove('visible');
        this.iframe.classList.remove('hidden');
        this.iframe.classList.add('visible');
        // Give focus to iframe for interaction
        setTimeout(()=>{
            this.iframe.focus();
            // Try to focus the iframe content window too
            try {
                if (this.iframe.contentWindow) this.iframe.contentWindow.focus();
            } catch (e) {
                console.log('Could not focus iframe content window');
            }
        }, 100);
    // Don't inject any styles - let the quiz use its original styling
    // The terminal frame provides the Matrix aesthetic
    }
    /**
     * Close terminal
     */ close() {
        this.terminal.classList.add('closing');
        setTimeout(()=>{
            this.terminal.classList.remove('active', 'closing');
            // Full reset
            this.reset();
            // Notify app
            if (window.quizApp) window.quizApp.onTerminalClose();
            else if (window.summariesApp) window.summariesApp.onTerminalClose();
        }, 270); // Reduced from 300ms (10% faster)
    }
    /**
     * Utility delay function
     * @param {number} ms - Milliseconds to delay
     */ delay(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    /**
     * Destroy terminal
     */ destroy() {
        if (this.terminal) {
            this.terminal.remove();
            this.terminal = null;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}]},["8tlRk","hW2dw"], "hW2dw", "parcelRequire94c2", {})

//# sourceMappingURL=interactive-summaries.e28d9c81.js.map
