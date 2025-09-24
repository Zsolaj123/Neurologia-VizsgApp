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
})({"23GG4":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "46e4c0c220b9f315";
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

},{}],"iHTqF":[function(require,module,exports,__globalThis) {
/**
 * Quiz Engine - Main Application Entry Point
 * Initializes and coordinates all quiz modules
 */ var _quizLoaderSimpleJs = require("./quiz-engine/quiz-loader-simple.js");
var _quizUiJs = require("./quiz-engine/quiz-ui.js");
var _matrixRainJs = require("./quiz-engine/matrix-rain.js");
var _matrixTerminalJs = require("./quiz-engine/matrix-terminal.js");
class QuizApp {
    constructor(){
        this.state = {
            currentCategory: null,
            currentQuizPath: null,
            quizData: null,
            userProgress: this.loadProgress()
        };
        // Initialize modules
        this.loader = new (0, _quizLoaderSimpleJs.QuizLoader)();
        this.ui = new (0, _quizUiJs.QuizUI)();
        this.matrixRain = null;
        this.matrixTerminal = null;
        this.init();
    }
    async init() {
        try {
            // Show loading
            this.ui.showLoading(true);
            // Initialize matrix rain effect
            this.initMatrixRain();
            // Initialize matrix terminal
            this.initMatrixTerminal();
            // Setup event listeners
            this.setupEventListeners();
            // Load quiz metadata
            await this.loadQuizMetadata();
            // Update progress displays
            this.updateProgressBars();
            // Hide loading
            this.ui.showLoading(false);
        } catch (error) {
            console.error('Quiz app initialization error:', error);
            this.ui.showError("Hiba t\xf6rt\xe9nt az alkalmaz\xe1s bet\xf6lt\xe9se k\xf6zben.");
        }
    }
    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new (0, _matrixRainJs.MatrixRain)(canvas);
            // Stop any existing animation
            this.matrixRain.stop();
            // Configure for better visibility - same as podcast player
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.02)',
                speed: 25,
                density: 0.98,
                color: '#00ff41',
                fontSize: 16 // Slightly larger characters
            });
            // Restart with new config
            this.matrixRain.start();
            console.log('Matrix rain initialized in quiz engine with enhanced settings');
        }
    }
    initMatrixTerminal() {
        const container = document.getElementById('matrix-terminal-container');
        if (container) {
            this.matrixTerminal = new (0, _matrixTerminalJs.MatrixTerminal)();
            this.matrixTerminal.init(container);
            console.log('Matrix terminal initialized');
        }
    }
    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach((card)=>{
            card.addEventListener('click', (e)=>{
                const category = e.currentTarget.dataset.category;
                this.handleCategorySelect(category);
            });
        });
        // Back buttons
        document.querySelectorAll('.back-button').forEach((button)=>{
            button.addEventListener('click', (e)=>{
                const target = e.currentTarget.dataset.target;
                this.ui.switchScreen(target);
            });
        });
    // Quiz controls removed - all quiz interaction happens in iframe
    }
    async loadQuizMetadata() {
        // Define quiz structure based on directory analysis
        this.quizMetadata = {
            neuroanat: {
                title: "Neuroanat\xf3mia",
                path: 'content/quizzes/Neuroanat',
                quizzes: [
                    {
                        file: "1-3 Koponya_gerinc_l\xe1t\xf3p\xe1lya.html",
                        topics: '1-3',
                        title: "Koponya, gerinc \xe9s l\xe1t\xf3p\xe1lya"
                    },
                    {
                        file: "4-6. K\xf6z\xe9pagy_tekint\xe9s_szemmozg\xe1s.html",
                        topics: '4-6',
                        title: "K\xf6z\xe9pagy, tekint\xe9s \xe9s szemmozg\xe1s"
                    },
                    {
                        file: "7-11. NV_VII_vestib_hall\xe1s.html",
                        topics: '7-11',
                        title: "V., VII. agyideg, vestibularis \xe9s hall\xe1s"
                    },
                    {
                        file: "12. Sz\xe9d\xfcl\xe9s_vertigo.html",
                        topics: '12',
                        title: "Sz\xe9d\xfcl\xe9s \xe9s vertigo"
                    },
                    {
                        file: "12-15. Sz\xe9d\xfcl\xe9s_bulbaris_h\xedd.html",
                        topics: '12-15',
                        title: "Sz\xe9d\xfcl\xe9s, bulbaris \xe9s h\xedd"
                    },
                    {
                        file: '16-20. kisagy_thalamus_caps interna_basalis ggl.html',
                        topics: '16-20',
                        title: 'Kisagy, thalamus, capsula interna, basalis ganglionok'
                    },
                    {
                        file: "21-24. mozgato_paresis_prefront_k\xe9rgiszerk.html",
                        topics: '21-24',
                        title: "Mozgat\xf3, paresis, prefront\xe1lis, k\xe9rgi szervez\u0151d\xe9s"
                    },
                    {
                        file: "25-27. Dominancia_asszoc_\xe9rz\u0151rendszerek.html",
                        topics: '25-27',
                        title: "Dominancia, asszoci\xe1ci\xf3s \xe9s \xe9rz\u0151rendszerek"
                    },
                    {
                        file: '28-30. Occip_perieet_temporalis.html',
                        topics: '28-30',
                        title: "Occipitalis, parietalis \xe9s temporalis"
                    },
                    {
                        file: "31-34. limbik_magatart_mem\xf3ria_hippocamp.html",
                        topics: '31-34',
                        title: "Limbikus, magatart\xe1s, mem\xf3ria \xe9s hippocampus"
                    },
                    {
                        file: "35-38. Hypothal_hypophys_besz\xe9d_f\xe1jdalom.html",
                        topics: '35-38',
                        title: "Hypothalamus, hypophysis, besz\xe9d \xe9s f\xe1jdalom"
                    },
                    {
                        file: "39-40. gerincvel\u0151_izomt\xf3nus.html",
                        topics: '39-40',
                        title: "Gerincvel\u0151 \xe9s izomt\xf3nus"
                    },
                    {
                        file: '41-43. plexus_cerv_lumb_sacr_autonom.html',
                        topics: '41-43',
                        title: "Plexusok \xe9s auton\xf3m idegrendszer"
                    },
                    {
                        file: "44-48. agyi kering\xe9s (carotis, vertebro, gv, v\xe9n\xe1s).html",
                        topics: '44-48',
                        title: "Agyi kering\xe9s"
                    },
                    {
                        file: "49-53. V\xe9n\xe1s anat\xf3mia_gvv\xe9rell_v\xe9n\xe1skering\xe9s_sinuscavernosus_thalamus\xe9sbasalisggl.html",
                        topics: '49-53',
                        title: "V\xe9n\xe1s anat\xf3mia"
                    },
                    {
                        file: "54-59.  agy v\xedzt\xe9r, BBB, v\xe9r-liquor, transzmitterek.html",
                        topics: '54-59',
                        title: "Agy v\xedzt\xe9r, BBB, transzmitterek"
                    }
                ]
            },
            vizsmod: {
                title: "Vizsg\xe1l\xf3m\xf3dszerek, alap klinikum",
                path: "content/quizzes/Vizsg\xe1l\xf3m\xf3dszerek, alap klinikum",
                quizzes: [
                    {
                        file: "60-64. EEG, alv\xe1s, \xfcr\xedt\xe9s, plasztic, genetika.html",
                        topics: '60-64',
                        title: "EEG, alv\xe1s, \xfcr\xedt\xe9s, plaszticit\xe1s, genetika"
                    },
                    {
                        file: "65-69. gy\xf3gyszer, liquor, EEG, EP.html",
                        topics: '65-69',
                        title: "Gy\xf3gyszerinterakci\xf3k, liquor, EEG, EP"
                    },
                    {
                        file: '70-75 EMG_ENG_CT_MR_ANGIO_UH.html',
                        topics: '70-75',
                        title: "EMG, ENG, CT, MR, angiogr\xe1fia, ultrahang"
                    },
                    {
                        file: "76-79. HEMAT_SZAGL\xc1S_TEKINT\xc9S_PUPILLA.html",
                        topics: '76-79',
                        title: "Haemorheol\xf3gia, szagl\xe1s, tekint\xe9s, pupilla"
                    },
                    {
                        file: '80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html',
                        topics: '80-84',
                        title: 'Diplopia, nystagmus, facialis, Bell, dysarthria'
                    },
                    {
                        file: "85-89. IZOMGYEENG_\xc9RZ\xc9S_DISSZOC_REFLEX_KISAGY.html",
                        topics: '85-89',
                        title: "Izomgyenges\xe9g, \xe9rz\xe9szavar, reflexek, kisagy"
                    },
                    {
                        file: '90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html',
                        topics: '90-95',
                        title: "Ataxia, aphasia, neglect, apraxia, exekut\xedv"
                    },
                    {
                        file: "96-99. LIBER\xc1CI\xd3S_ESZM\xc9LETLEN_ZAVART_HYPNOID.html",
                        topics: '96-99',
                        title: "Liber\xe1ci\xf3s jelek, eszm\xe9letlen, zavart, hypnoid"
                    },
                    {
                        file: "100-105. NEMHYPN_HERNIA_DEMENCIA_EML\xc9KE.html",
                        topics: '100-105',
                        title: "Nem hypnoid, herni\xe1ci\xf3, demencia, eml\xe9kez\xe9s"
                    },
                    {
                        file: "106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DER\xc9K.html",
                        topics: '106-110',
                        title: "Thalamus, spin\xe1lis, GV trauma, der\xe9kf\xe1j\xe1s"
                    },
                    {
                        file: "111-115. SPINGY\xd6K_CONUSCAUDA_ALS\xd3V\xc9GTAG_TARDIV_ACM.html",
                        topics: '111-115',
                        title: "Spin\xe1lis gy\xf6k\xf6k, conus/cauda, als\xf3v\xe9gtag, ACM"
                    },
                    {
                        file: "116-119. AGYT\xd6RZS_HAT\xc1RTER_LACUNA_STEAL.html",
                        topics: '116-119',
                        title: "Agyt\xf6rzsi, hat\xe1rter\xfcleti, lacunaris, steal"
                    },
                    {
                        file: '120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html',
                        topics: '120-124',
                        title: "Craniocervicalis, atherog\xe9n, cerebrovascularis, primer prevenci\xf3"
                    },
                    {
                        file: '125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html',
                        topics: '125-129',
                        title: "TIA, cardi\xe1lis emb\xf3lia, fiatalok stroke-ja"
                    },
                    {
                        file: "130-134. ANTIKOAG_REPERF_INTRACEREBRV\xc9RZ_SAV_EREKFEJL.html",
                        topics: '130-134',
                        title: "Antikoagul\xe1ns, reperf\xfazi\xf3, ICH, SAV"
                    },
                    {
                        file: '135-139. GVVASC_EPILEPI.html',
                        topics: '135-139',
                        title: "Gerincvel\u0151 vaszkul\xe1ris, epilepszia"
                    },
                    {
                        file: "140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZM\xc9LETR\xd6V.html",
                        topics: '140-145',
                        title: "Epilepszia, antiepileptikum, status, eszm\xe9letveszt\xe9s"
                    },
                    {
                        file: "146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KIS\xc9R.html",
                        topics: '146-150',
                        title: "Idegseb\xe9szeti epilepszia, encephalitis, myelopathia"
                    },
                    {
                        file: "151-156. FEH\xc9R\xc1LL_PRES_AUTOI_DEMYELIN_SM.html",
                        topics: '151-156',
                        title: "Feh\xe9r\xe1llom\xe1ny, PRES, autoimmun, SM"
                    },
                    {
                        file: '157-161. GVGYULL_GBS_MG_IVIG.html',
                        topics: '157-161',
                        title: "GV gyullad\xe1s, GBS, myasthenia, IVIG"
                    },
                    {
                        file: "162-166. IMMUNTH_GLIOMA_T\xc9RFOGL_NEUROCUTAN.html",
                        topics: '162-166',
                        title: "Immunoter\xe1pia, glioma, t\xe9rfoglal\xf3, neurocutan"
                    },
                    {
                        file: '167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html',
                        topics: '167-170',
                        title: "Agydaganatok, sella r\xe9gi\xf3, ICP"
                    },
                    {
                        file: "171-175. MIRIGY_S\xd3VIZ_HYPOGLYK_VITAMIN.html",
                        topics: '171-175',
                        title: "Endokrin, s\xf3-v\xedz, hypoglycaemia, vitamin"
                    },
                    {
                        file: '176-179. HEMAT_PARANEO_ONKO_GYSZ.html',
                        topics: '176-179',
                        title: "Hematol\xf3gia, paraneoplasztikus, onkol\xf3gia, gy\xf3gyszer"
                    }
                ]
            },
            klinikum: {
                title: 'Klinikum',
                path: 'content/quizzes/Klinikum',
                quizzes: [
                    {
                        file: "180-187. TRANSZPLAT_PARKINSON_OSAS_ALV\xc1S.html",
                        topics: '180-187',
                        title: "Transzplant\xe1ci\xf3, Parkinson, OSAS, Alv\xe1s"
                    },
                    {
                        file: '188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html',
                        topics: '188-194',
                        title: 'Parkinson-plus, Dystonia, Wilson, Tremor'
                    },
                    {
                        file: '195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html',
                        topics: '195-199',
                        title: "Botox, J\xe1r\xe1s, Idegseb\xe9szet, Meningitis"
                    },
                    {
                        file: '200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html',
                        topics: '200-206',
                        title: "Antibiotikum, Neuroinfekci\xf3, Prion, Encephalitis"
                    },
                    {
                        file: '207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html',
                        topics: '207-212',
                        title: 'Encephalitis, Bell, Mononeuritis, Polyneuritis'
                    },
                    {
                        file: '213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html',
                        topics: '213-219',
                        title: "Polyneuropathia, Alag\xfat, Motoneuron, Izomdisztr\xf3fia"
                    },
                    {
                        file: "220-225. MYOPATHIA_F\xc1JDALOMSY_MIGR\xc9N_TENSIO_NEURALGIA.html",
                        topics: '220-225',
                        title: "Myopathia, F\xe1jdalom, Migr\xe9n, Neuralgia"
                    },
                    {
                        file: '226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html',
                        topics: '226-230',
                        title: 'Neuropathia, Pseudotumor, Alzheimer, Demencia'
                    },
                    {
                        file: '231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html',
                        topics: '231-239',
                        title: "FTD, NPH, Neuropszichi\xe1tria, Mitokondri\xe1lis, Neurogenetika"
                    },
                    {
                        file: "240-247. NEUROREHAB_KOPONYAS\xc9R_POSTTRAUMA_GVK\xc1R.html",
                        topics: '240-247',
                        title: "Neurorehabilit\xe1ci\xf3, Koponyas\xe9r\xfcl\xe9s, Posttrauma, GV k\xe1rosod\xe1s"
                    },
                    {
                        file: '248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html',
                        topics: '248-254',
                        title: "Pszichoszomatika, Organikus pszichi\xe1tria, Monitoroz\xe1s"
                    },
                    {
                        file: "255-259. DISCOPATHIA_SZ\xc9D\xdcL\u0150S_HYDROCEPH_TERHESS\xc9G_ID\u0150S.html",
                        topics: '255-259',
                        title: "Discopathia, Sz\xe9d\xfcl\xe9s, Hydrocephalus, Terhess\xe9g, Id\u0151skor"
                    }
                ]
            }
        };
    }
    handleCategorySelect(category) {
        this.state.currentCategory = category;
        const categoryData = this.quizMetadata[category];
        if (categoryData) {
            // Update UI
            this.ui.displayQuizList(categoryData);
            this.ui.switchScreen('quiz-list-screen');
        }
    }
    async handleQuizSelect(quizPath) {
        console.log('[QuizApp] Handling quiz selection:', quizPath);
        try {
            this.ui.showLoading(false);
            // Extract title from quiz path
            const filename = quizPath.split('/').pop();
            const title = filename.replace('.html', '');
            // Hide all screens
            document.querySelectorAll('.screen').forEach((screen)=>{
                screen.classList.remove('active');
            });
            // Load quiz in Matrix terminal
            console.log('[QuizApp] Loading quiz in Matrix terminal...');
            if (this.matrixTerminal) await this.matrixTerminal.loadQuiz(quizPath, title);
            else throw new Error('Matrix terminal not initialized');
            this.state.currentQuizPath = quizPath;
        } catch (error) {
            console.error('[QuizApp] Error loading quiz:', error);
            this.ui.showError(`Hiba t\xf6rt\xe9nt a kv\xedz bet\xf6lt\xe9se k\xf6zben: ${error.message}`);
            this.ui.showLoading(false);
        }
    }
    // Old quiz handling methods removed - now handled by iframe in terminal
    loadProgress() {
        const saved = localStorage.getItem('quizProgress');
        return saved ? JSON.parse(saved) : {};
    }
    saveQuizProgress(results) {
        if (!this.state.userProgress[this.state.currentCategory]) this.state.userProgress[this.state.currentCategory] = {};
        this.state.userProgress[this.state.currentCategory][this.state.currentQuizPath] = {
            completed: true,
            bestScore: results.percentage,
            lastAttempt: new Date().toISOString()
        };
        localStorage.setItem('quizProgress', JSON.stringify(this.state.userProgress));
        this.updateProgressBars();
    }
    updateProgressBars() {
        Object.keys(this.quizMetadata).forEach((category)=>{
            const categoryData = this.quizMetadata[category];
            const progress = this.calculateCategoryProgress(category, categoryData);
            this.ui.updateCategoryProgress(category, progress);
        });
    }
    calculateCategoryProgress(category, categoryData) {
        const userCategoryProgress = this.state.userProgress[category] || {};
        const completedQuizzes = Object.keys(userCategoryProgress).filter((quiz)=>userCategoryProgress[quiz].completed).length;
        return Math.round(completedQuizzes / categoryData.quizzes.length * 100);
    }
    onTerminalClose() {
        // Return to quiz list when terminal closes
        console.log('[QuizApp] Terminal closed, returning to quiz list');
        this.ui.switchScreen('quiz-list-screen');
    }
}
// Initialize app when DOM is ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ()=>{
    window.quizApp = new QuizApp();
});
else window.quizApp = new QuizApp();

},{"./quiz-engine/quiz-loader-simple.js":"hrlLY","./quiz-engine/quiz-ui.js":"4FxIT","./quiz-engine/matrix-rain.js":"01bGy","./quiz-engine/matrix-terminal.js":"6H5KU"}],"hrlLY":[function(require,module,exports,__globalThis) {
/**
 * Simplified Quiz Loader Module
 * Returns quiz paths without parsing
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "QuizLoader", ()=>QuizLoader);
class QuizLoader {
    constructor(){
    // No cache needed for simple path loading
    }
    /**
     * Get quiz path - no parsing needed
     * @param {string} quizPath - Path to the quiz HTML file
     * @returns {Object} Quiz metadata
     */ getQuizInfo(quizPath) {
        const filename = quizPath.split('/').pop();
        const title = filename.replace('.html', '');
        return {
            path: quizPath,
            title: title,
            filename: filename
        };
    }
    /**
     * Clear any old cached data
     */ clearCache() {
    // No cache in simplified version
    }
}

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

},{}],"4FxIT":[function(require,module,exports,__globalThis) {
/**
 * Quiz UI Module
 * Handles all UI interactions and display updates
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "QuizUI", ()=>QuizUI);
class QuizUI {
    constructor(){
        this.elements = {
            screens: {
                category: document.getElementById('category-screen'),
                quizList: document.getElementById('quiz-list-screen'),
                activeQuiz: document.getElementById('quiz-active-screen'),
                results: document.getElementById('results-screen')
            },
            loading: document.getElementById('loading-overlay'),
            quizContent: document.getElementById('quiz-content'),
            questionCounter: document.getElementById('question-counter'),
            timer: document.querySelector('.timer-text'),
            quizTitle: document.getElementById('active-quiz-title'),
            submitButton: document.getElementById('submit-answer'),
            nextButton: document.getElementById('next-question')
        };
    }
    /**
     * Switch between screens
     * @param {string} screenId - ID of the screen to show
     */ switchScreen(screenId) {
        console.log('[QuizUI] Switching to screen:', screenId);
        // Hide all screens
        Object.values(this.elements.screens).forEach((screen)=>{
            if (screen) {
                screen.classList.remove('active');
                console.log('[QuizUI] Hiding screen:', screen.id);
            }
        });
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            console.log('[QuizUI] Showing screen:', screenId);
            // Scroll to top
            window.scrollTo(0, 0);
        } else console.error('[QuizUI] Screen not found:', screenId);
    }
    /**
     * Show/hide loading overlay
     * @param {boolean} show - Whether to show loading
     */ showLoading(show) {
        console.log('[QuizUI] Show loading:', show);
        if (this.elements.loading) {
            if (show) this.elements.loading.classList.remove('hidden');
            else this.elements.loading.classList.add('hidden');
            console.log('[QuizUI] Loading element classes:', this.elements.loading.className);
        } else console.warn('[QuizUI] No loading element found');
    }
    /**
     * Show error message
     * @param {string} message - Error message to display
     */ showError(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--quiz-incorrect);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(toast);
        // Remove after 5 seconds
        setTimeout(()=>{
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(()=>toast.remove(), 300);
        }, 5000);
    }
    /**
     * Display quiz list for a category
     * @param {Object} categoryData - Category metadata
     */ displayQuizList(categoryData) {
        const container = document.getElementById('quiz-list-container');
        const title = document.getElementById('quiz-list-title');
        if (title) title.textContent = `${categoryData.title} kv\xedzek`;
        if (!container) return;
        container.innerHTML = '';
        categoryData.quizzes.forEach((quiz)=>{
            const item = document.createElement('div');
            item.className = 'quiz-item';
            item.dataset.quizPath = `${categoryData.path}/${quiz.file}`;
            // Check if completed
            const progress = this.getQuizProgress(quiz.file);
            const isCompleted = progress && progress.completed;
            item.innerHTML = `
                <div class="quiz-item-info">
                    <h3 class="quiz-item-title">${quiz.title}</h3>
                    <p class="quiz-item-topics">T\xe9m\xe1k: ${quiz.topics}</p>
                </div>
                <div class="quiz-item-status">
                    ${isCompleted ? `<span class="quiz-score completed">\u{2713} ${progress.bestScore}%</span>` : '<span class="quiz-score">M\xe9g nem teljes\xedtett</span>'}
                </div>
            `;
            item.addEventListener('click', (e)=>{
                e.preventDefault();
                e.stopPropagation();
                const app = window.quizApp;
                if (app) {
                    console.log('[QuizUI] Quiz item clicked:', item.dataset.quizPath);
                    app.handleQuizSelect(item.dataset.quizPath);
                } else console.error('[QuizUI] QuizApp not found on window!');
            });
            container.appendChild(item);
        });
    }
    /**
     * Display a quiz question
     * @param {Object} question - Question data
     * @param {number} current - Current question number
     * @param {number} total - Total questions
     */ displayQuestion(question, current, total) {
        console.log('[QuizUI] Displaying question:', {
            hasQuestion: !!question,
            hasQuizContent: !!this.elements.quizContent,
            current,
            total
        });
        if (!question || !this.elements.quizContent) {
            console.error('[QuizUI] Missing question or quiz content element');
            return;
        }
        // Update counter
        if (this.elements.questionCounter) this.elements.questionCounter.textContent = `K\xe9rd\xe9s ${current} / ${total}`;
        // Build question HTML
        console.log('[QuizUI] Building answers HTML, answers:', question.answers);
        const answersHTML = Object.entries(question.answers).map(([index, text])=>`
            <div class="answer-option" data-answer-index="${index}">
                <div class="answer-label">
                    <span class="answer-letter">${String.fromCharCode(65 + parseInt(index))}</span>
                    <span class="answer-text">${text}</span>
                </div>
            </div>
        `).join('');
        this.elements.quizContent.innerHTML = `
            <div class="question">${question.question}</div>
            <div class="answers">${answersHTML}</div>
        `;
        console.log('[QuizUI] Quiz content updated, innerHTML length:', this.elements.quizContent.innerHTML.length);
        console.log('[QuizUI] Quiz content element visible:', this.elements.quizContent.offsetHeight > 0);
        // Reset submit button
        if (this.elements.submitButton) this.elements.submitButton.disabled = true;
    }
    /**
     * Select an answer option
     * @param {HTMLElement} answerElement - Answer element
     */ selectAnswer(answerElement) {
        // Remove previous selection
        document.querySelectorAll('.answer-option').forEach((option)=>{
            option.classList.remove('selected');
        });
        // Add selection
        answerElement.classList.add('selected');
    }
    /**
     * Show answer result
     * @param {Object} result - Answer result from manager
     */ showAnswerResult(result) {
        const selectedOption = document.querySelector('.answer-option.selected');
        if (!selectedOption) return;
        // Mark selected answer
        selectedOption.classList.add(result.isCorrect ? 'correct' : 'incorrect');
        // Mark correct answer if different
        if (!result.isCorrect) {
            const correctLetter = result.correctAnswer.toUpperCase();
            const correctIndex = correctLetter.charCodeAt(0) - 65;
            const correctOption = document.querySelector(`[data-answer-index="${correctIndex}"]`);
            if (correctOption) correctOption.classList.add('correct');
        }
        // Disable all options
        document.querySelectorAll('.answer-option').forEach((option)=>{
            option.classList.add('disabled');
        });
        // Show explanation if wrong
        if (!result.isCorrect && result.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'explanation';
            explanationDiv.innerHTML = `<strong>Magyar\xe1zat:</strong> ${result.explanation}`;
            this.elements.quizContent.appendChild(explanationDiv);
        }
    }
    /**
     * Update timer display
     * @param {number} seconds - Elapsed seconds
     */ updateTimer(seconds) {
        if (!this.elements.timer) return;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    /**
     * Reset quiz UI
     */ resetQuiz() {
        if (this.elements.quizContent) this.elements.quizContent.innerHTML = '';
        if (this.elements.submitButton) {
            this.elements.submitButton.classList.remove('hidden');
            this.elements.submitButton.disabled = true;
        }
        if (this.elements.nextButton) this.elements.nextButton.classList.add('hidden');
        this.updateTimer(0);
    }
    /**
     * Update category progress bar
     * @param {string} category - Category ID
     * @param {number} progress - Progress percentage
     */ updateCategoryProgress(category, progress) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (!card) return;
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.progress-text');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
            progressFill.dataset.progress = progress;
        }
        if (progressText) progressText.textContent = `${progress}% teljes\xedtve`;
    }
    /**
     * Get quiz progress from localStorage
     * @param {string} quizFile - Quiz filename
     * @returns {Object|null} Progress data
     */ getQuizProgress(quizFile) {
        const progress = localStorage.getItem('quizProgress');
        if (!progress) return null;
        const data = JSON.parse(progress);
        // Search through all categories
        for (const category of Object.values(data))for (const [path, progressData] of Object.entries(category)){
            if (path.includes(quizFile)) return progressData;
        }
        return null;
    }
    /**
     * Set quiz title
     * @param {string} title - Quiz title
     */ setQuizTitle(title) {
        if (this.elements.quizTitle) this.elements.quizTitle.textContent = title;
    }
    /**
     * Create loading spinner
     * @returns {HTMLElement} Spinner element
     */ createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        return spinner;
    }
    /**
     * Animate score display
     * @param {number} score - Score percentage
     * @param {HTMLElement} element - Element to animate
     */ animateScore(score, element) {
        let current = 0;
        const increment = score > 50 ? 2 : 1;
        const duration = 1000;
        const steps = duration / (1000 / 60); // 60 fps
        const stepSize = score / steps;
        const interval = setInterval(()=>{
            current += stepSize;
            if (current >= score) {
                current = score;
                clearInterval(interval);
            }
            element.textContent = `${Math.round(current)}%`;
        }, 1000 / 60);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}],"01bGy":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}]},["23GG4","iHTqF"], "iHTqF", "parcelRequire94c2", {})

//# sourceMappingURL=quiz.20b9f315.js.map
