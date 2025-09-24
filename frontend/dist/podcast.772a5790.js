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
})({"92exv":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "03b995ba772a5790";
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

},{}],"ekfpp":[function(require,module,exports,__globalThis) {
/**
 * Podcast Application
 * Main controller for the podcast player interface
 */ var _podcastDataJs = require("./podcast-data.js");
var _podcastPlayerJs = require("./podcast-player.js");
var _matrixRainJs = require("./quiz-engine/matrix-rain.js");
class PodcastApp {
    constructor(){
        this.currentCategory = null;
        this.currentScreen = 'category-screen';
        this.matrixRain = null;
        // Screen elements
        this.screens = {
            category: document.getElementById('category-screen'),
            list: document.getElementById('podcast-list-screen')
        };
        // UI elements
        this.categoryCards = document.querySelectorAll('.category-card');
        this.backButtons = document.querySelectorAll('.back-btn');
        this.searchInput = document.querySelector('.search-input');
        this.searchBtn = document.querySelector('.search-btn');
        this.podcastList = document.getElementById('podcast-list');
        this.categoryTitle = document.getElementById('category-title');
        this.initialize();
    }
    /**
     * Initialize the application
     */ async initialize() {
        console.log('Initializing Podcast App...');
        // Initialize matrix rain effect
        this.initMatrixRain();
        // Load podcast data
        await this.loadPodcastData();
        // Setup event listeners
        this.setupEventListeners();
        // Update category counts
        this.updateCategoryCounts();
        console.log('Podcast App initialized successfully');
    }
    /**
     * Initialize matrix rain effect with enhanced visibility
     */ initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new (0, _matrixRainJs.MatrixRain)(canvas);
            // Configure for better visibility
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.02)',
                speed: 25,
                density: 0.98,
                color: '#00ff41' // Ensure green color
            });
            this.matrixRain.start();
            console.log('Matrix rain initialized');
        }
    }
    /**
     * Load podcast data
     */ async loadPodcastData() {
        try {
            await (0, _podcastDataJs.podcastData).loadPodcasts();
            console.log('Podcast data loaded successfully');
        } catch (error) {
            console.error('Error loading podcast data:', error);
            this.showError("Hiba t\xf6rt\xe9nt a podcastok bet\xf6lt\xe9se sor\xe1n");
        }
    }
    /**
     * Setup event listeners
     */ setupEventListeners() {
        // Category card clicks
        this.categoryCards.forEach((card)=>{
            card.addEventListener('click', ()=>{
                const categoryId = card.dataset.category;
                this.selectCategory(categoryId);
            });
        });
        // Back button clicks
        this.backButtons.forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                const target = btn.dataset.target;
                this.navigateToScreen(target);
            });
        });
        // Search functionality
        this.searchBtn?.addEventListener('click', ()=>this.performSearch());
        this.searchInput?.addEventListener('keypress', (e)=>{
            if (e.key === 'Enter') this.performSearch();
        });
    }
    /**
     * Update category counts in the UI
     */ updateCategoryCounts() {
        const countElements = document.querySelectorAll('.podcast-count');
        countElements.forEach((element)=>{
            const categoryId = element.dataset.category;
            const count = (0, _podcastDataJs.podcastData).getPodcastCount(categoryId);
            element.textContent = count;
        });
    }
    /**
     * Select a category and show its podcasts
     * @param {string} categoryId - Category identifier
     */ selectCategory(categoryId) {
        this.currentCategory = categoryId;
        const categoryInfo = (0, _podcastDataJs.podcastData).getCategoryInfo(categoryId);
        if (!categoryInfo) {
            console.error('Invalid category:', categoryId);
            return;
        }
        // Update title
        this.categoryTitle.textContent = categoryInfo.name;
        // Load podcasts for this category
        const podcasts = (0, _podcastDataJs.podcastData).getPodcastsByCategory(categoryId);
        this.displayPodcasts(podcasts);
        // Navigate to list screen
        this.navigateToScreen('podcast-list-screen');
    }
    /**
     * Display podcast list
     * @param {Array} podcasts - Array of podcast objects
     */ displayPodcasts(podcasts) {
        this.podcastList.innerHTML = '';
        if (podcasts.length === 0) {
            this.podcastList.innerHTML = `
                <div class="no-results">
                    <p>Nincsenek el\xe9rhet\u{151} podcastok ebben a kateg\xf3ri\xe1ban.</p>
                </div>
            `;
            return;
        }
        podcasts.forEach((podcast)=>{
            const podcastItem = this.createPodcastElement(podcast);
            this.podcastList.appendChild(podcastItem);
        });
    }
    /**
     * Create a podcast list item element
     * @param {Object} podcast - Podcast object
     * @returns {HTMLElement} Podcast element
     */ createPodcastElement(podcast) {
        const item = document.createElement('div');
        item.className = 'podcast-item';
        item.dataset.podcastId = podcast.id;
        const categoryInfo = (0, _podcastDataJs.podcastData).getCategoryInfo(podcast.categoryId);
        const podcastUrl = (0, _podcastDataJs.podcastData).getPodcastUrl(podcast);
        item.innerHTML = `
            <div class="podcast-number">${podcast.topicNumbers || '-'}</div>
            <div class="podcast-info">
                <div class="podcast-title">${podcast.title}</div>
                <div class="podcast-duration">${podcast.duration || "Id\u0151tartam ismeretlen"}</div>
            </div>
            <button class="podcast-play-btn" title="Lej\xe1tsz\xe1s">\u{25B6}</button>
        `;
        // Add click handlers
        item.addEventListener('click', (e)=>{
            if (!e.target.classList.contains('podcast-play-btn')) this.playPodcast(podcast, podcastUrl, categoryInfo);
        });
        item.querySelector('.podcast-play-btn').addEventListener('click', (e)=>{
            e.stopPropagation();
            this.playPodcast(podcast, podcastUrl, categoryInfo);
        });
        // Add to playlist on right-click
        item.addEventListener('contextmenu', (e)=>{
            e.preventDefault();
            (0, _podcastPlayerJs.podcastPlayer).addToPlaylist(podcast, podcastUrl, categoryInfo);
            this.showToast("Hozz\xe1adva a lej\xe1tsz\xe1si list\xe1hoz");
        });
        return item;
    }
    /**
     * Play a podcast
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */ playPodcast(podcast, url, categoryInfo) {
        // Remove playing class from all items
        document.querySelectorAll('.podcast-item').forEach((item)=>{
            item.classList.remove('playing');
        });
        // Add playing class to current item
        const currentItem = document.querySelector(`[data-podcast-id="${podcast.id}"]`);
        if (currentItem) currentItem.classList.add('playing');
        // Play the podcast
        (0, _podcastPlayerJs.podcastPlayer).playPodcast(podcast, url, categoryInfo);
    }
    /**
     * Perform search
     */ performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) {
            // If no query, show all podcasts for current category
            if (this.currentCategory) {
                const podcasts = (0, _podcastDataJs.podcastData).getPodcastsByCategory(this.currentCategory);
                this.displayPodcasts(podcasts);
            }
            return;
        }
        // Search across all categories or within current category
        let results;
        if (this.currentCategory) {
            // Search within current category
            const categoryPodcasts = (0, _podcastDataJs.podcastData).getPodcastsByCategory(this.currentCategory);
            results = categoryPodcasts.filter((podcast)=>{
                const lowercaseQuery = query.toLowerCase();
                return podcast.title.toLowerCase().includes(lowercaseQuery) || podcast.topicNumbers.includes(query);
            });
        } else // Search across all categories
        results = (0, _podcastDataJs.podcastData).searchPodcasts(query);
        this.displayPodcasts(results);
    }
    /**
     * Navigate to a screen
     * @param {string} screenId - Screen identifier
     */ navigateToScreen(screenId) {
        // Hide all screens
        Object.values(this.screens).forEach((screen)=>{
            screen.classList.remove('active');
        });
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            // Clear search when going back to categories
            if (screenId === 'category-screen') {
                this.currentCategory = null;
                if (this.searchInput) this.searchInput.value = '';
            }
        }
    }
    /**
     * Show error message
     * @param {string} message - Error message
     */ showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(()=>{
            errorDiv.remove();
        }, 5000);
    }
    /**
     * Show toast notification
     * @param {string} message - Toast message
     */ showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        // Trigger animation
        setTimeout(()=>{
            toast.classList.add('show');
        }, 100);
        // Remove after delay
        setTimeout(()=>{
            toast.classList.remove('show');
            setTimeout(()=>toast.remove(), 300);
        }, 3000);
    }
}
// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{
    window.podcastApp = new PodcastApp();
});
// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    .error-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff0000;
        color: #000;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-family: 'JetBrains Mono', monospace;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }

    .toast-notification {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: var(--podcast-bg-secondary);
        border: 2px solid var(--podcast-accent);
        color: var(--podcast-accent);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        font-family: 'JetBrains Mono', monospace;
        box-shadow: var(--podcast-glow);
        z-index: 2000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }

    .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        color: var(--podcast-text-secondary);
        font-family: 'JetBrains Mono', monospace;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

},{"./podcast-data.js":"8YNkc","./podcast-player.js":"6qYx1","./quiz-engine/matrix-rain.js":"01bGy"}],"8YNkc":[function(require,module,exports,__globalThis) {
/**
 * Podcast Data Module
 * Organizes and manages podcast metadata
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PodcastData", ()=>PodcastData);
parcelHelpers.export(exports, "podcastData", ()=>podcastData);
class PodcastData {
    constructor(){
        this.categories = {
            neuroanat: {
                name: "Neuroanat\xf3mia",
                path: 'content/podcast/neuroanat/',
                topics: '1-59',
                podcasts: []
            },
            vizsgalat: {
                name: "Vizsg\xe1l\xf3m\xf3dszerek, alap klinikum",
                path: "content/podcast/vizsg\xe1l\xf3m\xf3dszerek, alap klinikum/",
                topics: '60-179',
                podcasts: []
            },
            klinikum: {
                name: "R\xe9szletes Klinikum",
                path: "content/podcast/r\xe9szletes klinikum/",
                topics: '180-259',
                podcasts: []
            }
        };
    }
    /**
     * Load all podcasts from the server
     */ async loadPodcasts() {
        for (const [categoryId, category] of Object.entries(this.categories))try {
            const podcasts = await this.fetchPodcastsForCategory(category.path);
            category.podcasts = this.parsePodcasts(podcasts, categoryId);
            console.log(`Loaded ${category.podcasts.length} podcasts for ${category.name}`);
        } catch (error) {
            console.error(`Error loading podcasts for ${category.name}:`, error);
        }
    }
    /**
     * Fetch podcast files for a category
     * @param {string} path - Category path
     * @returns {Promise<Array>} List of filenames
     */ async fetchPodcastsForCategory(path) {
        // Since we can't directly list directory contents from the browser,
        // we'll need to either:
        // 1. Create a server endpoint to list files
        // 2. Or maintain a static list of podcast files
        // For now, we'll use a predefined list based on the file structure
        // This would ideally be replaced with a server API call
        return this.getStaticPodcastList(path);
    }
    /**
     * Get static podcast list (temporary solution)
     * In production, this should be replaced with a dynamic file listing API
     */ getStaticPodcastList(path) {
        const lists = {
            'content/podcast/neuroanat/': [
                "1-3 Koponya, Gerinc, L\xe1t\xe1s_ \xc9letvesz\xe9lyes Sz\u0171k\xfcletek \xe9s Vak Ablakok.mp3",
                "1. Kopony\xe1d K\xf6nyvt\xe1ra_ Amit a Saj\xe1t Forr\xe1said El\xe1rulnak.mp3",
                "4-6 Agyad rejtett karmestere_ A szemmozg\xe1s hihetetlen vil\xe1ga.mp3",
                '7-14 audio.mp3',
                '12-15 audio.mp3',
                '12-15_2.mp3',
                '16-20 audi.mp3',
                '21-24Mind Over Movement_ Decoding the Brain_s Control Center.mp3',
                "25-26 (2 v\xe9ltelnje)Agyf\xe9ltek\xe9k t\xe1nca \xe9s a szem titkai_ Leny\u0171g\xf6z\u0151 betekint\xe9s az idegrendszerbe.mp3",
                "27-30 Agyunk titkos t\xe9rk\xe9pei_ Hogyan l\xe1tunk, hallunk, \xe9rz\xfcnk \xe9s \xe9rt\xfcnk_.mp3",
                "31-33\xc9rzelem, Eml\xe9k, D\xf6nt\xe9s_ Az Agy Sz\xednfalai M\xf6g\xf6tt.mp3",
                "34-36Agyunk titkai_ Eml\xe9kek, hormonok \xe9s a besz\xe9d rejt\xe9lyei.mp3",
                "37-40Gerincvel\u0151_ A Test Aut\xf3p\xe1ly\xe1ja \u2013 F\xe1jdalom, Mozg\xe1s \xe9s a Tudat Kapui.mp3",
                "41.43 A Tested Bels\u0151 K\xe1belei_ \xdatmutat\xf3 Az Idegek \xc9s A Robotpil\xf3ta Rendszerhez.mp3",
                "44-46 Agyi kering\xe9s_ \xc9let \xe9s hal\xe1l m\xe1sodpercek alatt.mp3",
                "47-50Agyv\xe9rz\xe9s \xe9s Gerincvel\u0151_ \xc9let \xe9s Hal\xe1l a Sz\u0171k Utc\xe1kban.mp3",
                "51-53. Agyunk \xc9rh\xe1l\xf3zata_ \xc9let \xe9s Hal\xe1l Egy V\xe9kony Vonalon.mp3",
                "54-57. Agyunk titkos v\xe9delme_ Falak, folyad\xe9k \xe9s a gliasejtek hadserege.mp3",
                "58-59. Agyp\xe1nc\xe9l \xe9s Bels\u0151 Er\u0151forr\xe1sok_ Hogyan V\xe9dekezik \xe9s T\xe1pl\xe1lkozik a Legokosabb Szerv\xfcnk_.mp3"
            ],
            "content/podcast/vizsg\xe1l\xf3m\xf3dszerek, alap klinikum/": [
                "60-61. EEG_ T\xe9rk\xe9p az Alv\xf3 Agyhoz \xe9s \xc9jszakai Utaz\xe1saink.mp3",
                "62-63. Agyunk Korm\xe1nyoz_ Titkos Ir\xe1ny\xedt\xe1s \xe9s Csod\xe1latos \xc1talakul\xe1s.mp3",
                "64-65. Agyunk Sorsa G\xe9nekben K\xf3dolva, Gy\xf3gyszerekkel Sz\u0151ve_ Neurol\xf3giai Kaland a Tudom\xe1ny Labirintus\xe1ban.mp3",
                "66-67. Agyi-gerincvel\u0151i folyad\xe9k_ \xc9let vagy v\xe9letlen_.mp3",
                "68-69. Agyhull\xe1mok \xe9s Idegp\xe1ly\xe1k Titkai_ EEG \xe9s EP K\xf6zelr\u0151l.mp3",
                "70-71. Idegek \xe9s Izmok Titkos Nyelve_ EMG \xe9s ENG a K\xf3rnyom\xe1ban.mp3",
                "72-73. Agyvizsg\xe1lat R\xf6ntgennel \xe9s M\xe1gneses Er\u0151vel_ CT, MR, Angiogr\xe1fia \u2013 Mikor melyik _szem\xfcveg_ a legjobb_.mp3",
                "74-75. Agyunk rejtett vil\xe1ga_ Funkci\xf3 \xe9s v\xe9rell\xe1t\xe1s a k\xe9palkot\xe1s t\xfckr\xe9ben.mp3",
                "76-77. A v\xe9r titkai \xe9s az illatok rejt\xe9lyei_ agyunk k\xe9t arca.mp3",
                "77-79. A Pupill\xe1k Titkos Nyelve_ \xc9letvesz\xe9lyes Jelek \xe9s Rejtett \xdczenetek.mp3",
                "80-81. A szemed titkos \xfczenetei_ Kett\u0151sl\xe1t\xe1s \xe9s szemtekerezg\xe9s, ami m\xf6g\xf6tt rejt\u0151zhet.mp3",
                "82-83. Arcb\xe9nul\xe1s_ Amit tudnod kell az arcidegr\u0151l \xe9s a Bell-par\xe9zisr\u0151l.mp3",
                "84-85. Izomgyenges\xe9g, Besz\xe9dzavar, Nyel\xe9si Neh\xe9zs\xe9g_ Mit \xdczen a Test\xfcnk_.mp3",
                "86-87. K\xfcl\xf6n Utakon J\xe1r\xf3 \xc9rz\xe9sek_ A Disszoci\xe1lt \xc9rz\xe9szavar Rejt\xe9lye.mp3",
                "88-89. Reflexek \xe9s R\xe1ng\xe1sok_ Az Idegek \xe9s a Kisagy Titkai.mp3",
                "90-92. Botladoz\xf3 l\xe9ptek, elakad\xf3 szavak_ Az ataxia \xe9s az af\xe1zia rejt\xe9lyei.mp3",
                "93-95. Amikor az agy tr\xe9f\xe1l_ Neglekt, apraxia, agn\xf3zia \xe9s az exekut\xedv funkci\xf3k rejt\xe9lyei.mp3",
                "96- 98. Eszm\xe9letveszt\xe9s, Zavarodotts\xe1g, \xc9s Elfeledett Reflexek_ Mi T\xf6rt\xe9nik Az Agyban_.mp3",
                "99-100. A tudatzavarok titkai_ \xe9bers\xe9g, tartalom \xe9s a val\xf3s\xe1g elmos\xf3d\xf3 hat\xe1rai.mp3",
                "101-102. Fej\xfcnkben a Vesz\xe9ly_ Az Agy Be\xe9kel\u0151d\xe9s \xe9s a Koponya\u0171ri Nyom\xe1s Tragikus J\xe1t\xe9kai.mp3",
                "103-104. Fejf\xe1j\xe1s \xe9s Demencia_ Mikor \xfcss\xfcnk v\xe9szharangot_ - T\xfcnetek, Vesz\xe9lyek \xe9s F\xe9lre\xe9rt\xe9sek.mp3",
                "105-106. Mem\xf3ria \xe9s Thalamus_ Az Elfelejtett Kapcsol\xf3 az Agym\u0171k\xf6d\xe9sben.mp3",
                "107-108. Gerincvel\u0151 s\xe9r\xfcl\xe9sek_ K\xe9t t\xedpus, k\xe9t vesz\xe9ly \u2013 Amikor az id\u0151 \xe9letet ment.mp3",
                "109&113 Fels\u0151- \xe9s Als\xf3 V\xe9gtagi Idegk\xe1rosod\xe1sok_ Detekt\xedvmunka a T\xfcnetek Labirintus\xe1ban \u2013 Mikor Jeleznek V\xe9szhelyzetet a Test\xfcnk _V\xf6r\xf6s Z\xe1szl\xf3i__.mp3",
                "110-112. Der\xe9kf\xe1j\xe1s, Lumb\xe1g\xf3, Isi\xe1sz_ Mikor kell azonnal orvoshoz fordulni_ Red Flag-ek \xe9s a Cauda Equina Szindr\xf3ma.mp3",
                "114. Tard\xedv Diszkin\xe9zia_ Mi\xe9rt Mozog Akaratlanul a Testem_ Gy\xf3gyszer-induk\xe1lt Mozg\xe1szavarok \xe9s \xdaj Kezel\xe9si Lehet\u0151s\xe9gek.mp3",
                "115-116. Az Agyi Detekt\xedvmunka_ A Stroke Rejt\xe9lyes T\xfcnetei \xe9s a _Bez\xe1rts\xe1g Szindr\xf3ma_.mp3",
                "117-118. Rejtett Agyi Infarktusok_ Hat\xe1rter\xfcleti \xe9s Lacunaris Stroke \u2013 K\xfcl\xf6nbs\xe9gek \xe9s Megel\u0151z\xe9s.mp3",
                "119-120. Lopott V\xe9r, Billeg\u0151 Fej_ K\xe9t Rejt\xe9lyes Betegs\xe9g, Ami \xd6sszek\xf6t \xe9s Megt\xe9veszt.mp3",
                "121-122. \xc9relmeszesed\xe9s \xe9s Stroke_ Az Alattomos Gyullad\xe1s, Ami Megel\u0151zhet\u0151 \u2013 A Kock\xe1zatok \xe9s Teend\u0151k.mp3",
                "123-124. Stroke_ El\u0151zd meg az els\u0151t! Okok, rizik\xf3faktorok \xe9s a 80%-ban elker\xfclhet\u0151 vesz\xe9ly.mp3",
                "125-126. TIA \xe9s a Sz\xedv Kapcsolata_ V\xe9szjelz\xe9sb\u0151l Megel\u0151z\xe9s \u2013 Hogyan El\u0151zd meg a Stroke-ot_.mp3",
                "127-128. Stroke fiatalon \xe9s id\u0151sen_ Rejtett okok \xe9s \xe9letment\u0151 percek \u2013 amit az agyi \xe9rkatasztr\xf3f\xe1r\xf3l tudnod kell.mp3",
                "129-130. V\xe9ralvad\xe1s \xe9s Agy_ Vesz\xe9lyek, Egyens\xfaly \xe9s \xc9letment\u0151 Kezel\xe9sek.mp3",
                "131-132. Stroke M\xe9lyelemz\xe9s_ Id\u0151, Agy \xe9s a Modern Kezel\xe9sek \u2013 Izgalmas \xc1tt\xf6r\xe9sek \xe9s Ami a CT Ut\xe1n J\xf6n.mp3",
                "133-134. Vill\xe1mcsap\xe1s-fejf\xe1j\xe1s \xe9s az agyi \xe9rrendszer rejtett vesz\xe9lyei_ Amit a spont\xe1n szubarachnoide\xe1lis v\xe9rz\xe9sr\u0151l tudni \xe9rdemes.mp3",
                "135. Gerincvel\u0151i Vaszkul\xe1ris K\xe1rosod\xe1sok_ A Rejtett Stroke-t\xf3l a Batson Plexus Titk\xe1ig.mp3",
                "136-137. Epilepszia_ Az Agy Elektromos Viharai \u2013 Roostok, Mechanizmusok \xe9s az EEG Titkai.mp3",
                "138-139. Epilepszia_ Az Agy Elektromos Viharai \u2013 Roostok, Mechanizmusok \xe9s az EEG Titkai.mp3",
                "140-141. Epilepszia vagy _csak_ egy roham_ Az els\u0151 roham kivizsg\xe1l\xe1sa \xe9s a diagn\xf3zis kulisszatitkai.mp3",
                "143-144. Epilepszia Kezel\xe9s A-t\xf3l Z-ig_ Mikor Kell Gy\xf3gyszer \xe9s Mit Tegy\xfcnk V\xe9szhelyzetben_.mp3",
                "145. \xc1jul\xe1s, Epilepszia, PNES_ A R\xf6vid Eszm\xe9letveszt\xe9sek Titkai \xe9s Mi\xe9rt Fontos az Elk\xfcl\xf6n\xedt\xe9s.mp3",
                "146. Epilepszia idegseb\xe9szete_ Milyen m\u0171t\xe9tek adnak rem\xe9nyt a gy\xf3gyszerrezisztens esetekben_.mp3",
                "147-148. Encephalopathia \xe9s EEG_ Az Agy Rejtett Hull\xe1mai \xe9s Betegs\xe9gei.mp3",
                "149. Mielop\xe1tia_ Gy\u0171jt\u0151fogalom a gerincvel\u0151 m\u0171k\xf6d\xe9si zavarair\xf3l \u2013 T\xfcnetek, okok \xe9s kezel\xe9s a szak\xe9rt\u0151 szem\xe9vel.mp3",
                "150-151. Agyunk rejt\xe9lyei_ Stroke \xe9s feh\xe9r\xe1llom\xe1nyi k\xe1rosod\xe1sok \u2013 Forr\xe1sok m\xe9lymer\xfcl\xe9se a megel\u0151z\xe9s\xe9rt.mp3",
                "152-153. PRES \xe9s Autoimmun Encephalitisek_ Az Agy \xc1rvize \xe9s Az Immunrendszer T\xe1mad\xe1sa \u2013 Mi a K\xfcl\xf6nbs\xe9g_.mp3",
                "155.156. Sclerosis Multiplex_ Rejt\xe9lyes Betegs\xe9gt\u0151l a Forradalmi Kezel\xe9sekig \u2013 Egy M\xe9lymer\xfcl\xe9s az SM Vil\xe1g\xe1ba.mp3",
                "157. Mielitisz_ Gerincvel\u0151-gyullad\xe1s \u2013 Az Okok, T\xfcnetek \xe9s a Titokzatos Antitestek Vil\xe1ga.mp3",
                "158. GBS \xe9s CIDP_ A Perif\xe9ri\xe1s Idegrendszer Autoimmun Betegs\xe9gei \u2013 Mi a K\xfcl\xf6nbs\xe9g, \xe9s Mi\xe9rt Fontos_.mp3",
                "159. Myasthenia Gravis_ M\xe9lymer\xfcl\xe9s az Ingadoz\xf3 Izomgyenges\xe9g Vil\xe1g\xe1ba.mp3",
                "160-161. 3 alapvet\u0151 immunter\xe1pia neurol\xf3giai betegs\xe9gekben_ Szteroidok, Plazmafer\xe9zis \xe9s IVIG \u2013 Hat\xe1smechanizmus, indik\xe1ci\xf3k \xe9s kock\xe1zatok.mp3",
                "162. Neuroimmunol\xf3giai Betegs\xe9gek Kezel\xe9se_ A S\xfalyos, M\xe9gis Szem\xe9lyre Szabott Harc az Immunrendszer Ellen.mp3",
                "163-164. Agydaganatok Forradalma_ Glioma \xe9s Meningeoma \u2013 A Molekul\xe1ris Ujjlenyomat \xc1talak\xedtja a Diagn\xf3zist \xe9s a Kezel\xe9st.mp3",
                "165-166. Agyunk K\xe9t K\xe9nyes Pontja_ Sella R\xe9gi\xf3 \xe9s Neurokut\xe1n Szindr\xf3m\xe1k \u2013 Betegs\xe9gek \xe9s C\xe9lzott Ter\xe1pi\xe1k.mp3",
                "167-168. Agydaganatok \xe9s \xc1tt\xe9tek_ Molekul\xe1ris Diagn\xf3zist\xf3l a Szem\xe9lyre Szabott Kezel\xe9sig.mp3",
                "169-170. Agy\xf6d\xe9ma \xe9s Kopony\xe1n Bel\xfcli Nyom\xe1s_ Az \xd6rd\xf6gi K\xf6r Megszak\xedt\xe1sa a Diagn\xf3zist\xf3l a M\u0171t\xe9tig.mp3",
                "171-172. Amikor a Hormonok \xe9s az Anyagcsere F\xe1rasztja az Agyat_ Visszaford\xedthat\xf3 T\xfcnetek \xe9s Rejtett K\xf3rk\xe9pek.mp3",
                "173-174. Borul\xf3 bels\u0151 egyens\xfaly_ s\xf3, v\xedz \xe9s cukor \u2013 \xcdgy hat agyadra a k\xe9miai harm\xf3nia felborul\xe1sa.mp3",
                "175-176. Vitaminok \xe9s v\xe9rk\xe9p_ Rejtett \xf6sszef\xfcgg\xe9sek az idegrendszerrel \u2013 Wernicke, B12, folsav \xe9s ami m\xf6g\xf6tt\xfck van.mp3",
                "177. L\xe9gz\xe9s, pupilla, tudat_ Neurol\xf3giai Gy\xf3gyszerek T\xfaladagol\xe1sa \xe9s Azonnali Teend\u0151k.mp3",
                "178-179. R\xe1k \xe9s Idegrendszer_ Rejtett T\xfcnetek, Mell\xe9khat\xe1sok \xe9s a Diagn\xf3zis Kih\xedv\xe1sai.mp3"
            ],
            "content/podcast/r\xe9szletes klinikum/": [
                "180. Az Elfeledett Mell\xe9khat\xe1s_ Neurol\xf3giai Sz\xf6v\u0151dm\xe9nyek Szerv\xe1t\xfcltet\xe9s Ut\xe1n \u2013 Ak\xe1r 75%-os Kock\xe1zat.mp3",
                "181-182. Alkoholt\xf3l \xe9s Drogokt\xf3l Az Idegsz\xe1lakig_ Az Agy Speci\xe1lis K\xe1rosod\xe1sai \xe9s a Rejtett T\xe1pl\xe1lkoz\xe1si Hi\xe1nyok.mp3",
                "183-184. Alv\xe1szavarok A-t\xf3l Z-ig_ OSAS, Inszomnia \xe9s Ami M\xe9g Fontosabb \u2013 Hogyan Jelezhetik Agyi Betegs\xe9geket_.mp3",
                "185-187. Parkinson-k\xf3r_ A Remeg\xe9sen T\xfal \u2013 Korai Jelek, Rejtett T\xfcnetek \xe9s Kezel\xe9si Kih\xedv\xe1sok.mp3",
                "188. Remeg\xe9sr\u0151l R\xe9szletesen_ T\xfcnett\u0151l a Kezel\xe9sig \xe9s Az Agy Titkai.mp3",
                "189-190. Parkinsonizmus \xfatveszt\u0151_ At\xedpusos form\xe1k \xe9s m\xe1sodlagos okok m\xe9lyelemz\xe9se.mp3",
                "191-192. Mozg\xe1szavarok \xe9s Rejtett R\xe9mek_ Dystonia, Chorea \xe9s a Wilson-k\xf3r Titkai.mp3",
                "193-194. Diszt\xf3nia \xe9s Chorea_ K\xe9t Mozg\xe1szavar \u2013 Mi a L\xe9nyegi K\xfcl\xf6nbs\xe9g_.mp3",
                '195. Botox Beyond Beauty_ Unpacking the Surprising Medical Power of Botulinum Toxin A.mp3',
                "195. Botox a neurol\xf3gi\xe1ban_ M\xe9regb\u0151l gy\xf3gyszer \u2013 A c\xe9lzott idegkezel\xe9s titkai \xe9s j\xf6v\u0151je.mp3",
                "196. J\xe1r\xe1szavarok_ Az Idegrendszer Titkai a L\xe9p\xe9seinkben \u2013 Diagn\xf3zis \xe9s Figyelmeztet\u0151 Jelek.mp3",
                '196. The Secret Language of Your Walk_ Decoding Neurological Gait Disorders.mp3',
                "197-198. Idegseb\xe9szet \xe9s Auton\xf3m Zavarok_ Mikor Seg\xedt a M\u0171t\xe9t, \xe9s Hogyan \xc9rthet\u0151k a _L\xe1thatatlan_ T\xfcnetek_.mp3",
                "199. Agyh\xe1rtyagyullad\xe1s vagy Agyt\xe1lyog_ \xc9letment\u0151 K\xfcl\xf6nbs\xe9gek \xe9s a Gyors Felismer\xe9s Fontoss\xe1ga.mp3",
                "200-201. Agyunk v\xe9delme \xe9s t\xe1mad\xe1sa_ Neuroinfekci\xf3k \xe9s AIDS az idegrendszerben.mp3",
                "202-203. Az Agy Kam\xe9leonjai_ Neuroborreliosis \xe9s Neurosyphilis \u2013 K\xe9t Alattomos Idegrendszeri Fert\u0151z\xe9s.mp3",
                "204-205. Rejtett K\xf3rokoz\xf3k \xe9s Agyt\xe1mad\xf3 Parazit\xe1k_ Az Idegrendszer V\xe9delm\xe9ben.mp3",
                "206-207. Az idegrendszer alattomos ellens\xe9gei_ Lass\xfa v\xedrusok, prionok \xe9s az agyvel\u0151gyullad\xe1s.mp3",
                "208. Bell-par\xe9zis_ Amikor az arc megb\xe9nul \u2013 Okok, t\xfcnetek, diagn\xf3zis \xe9s kil\xe1t\xe1sok.mp3",
                "209-210. Zsibbad\xe1s, F\xe1jdalom, Gyenges\xe9g_ Mikor jelez idegk\xe1rosod\xe1st a tested_ - A mononeuropathi\xe1k rejtett okai \xe9s kezel\xe9se.mp3",
                "211-212. Polyneuropathia_ Diagn\xf3zis, Kezel\xe9s \xe9s a J\xf6v\u0151 \xcdg\xe9retei \u2013 Egy Keszty\u0171-Zokni Szenved\xe9s Anat\xf3mi\xe1ja.mp3",
                "213-214. Polyneuropathia_ Az Idegek Rejt\xe9lyei \u2013 Diagn\xf3zis, Okok \xe9s \xc1tt\xf6r\xe9sek a Kezel\xe9sben.mp3",
                "215-216. Alag\xfat Szindr\xf3m\xe1k vs. Motoneuron Betegs\xe9gek_ A Zsibbad\xe1s \xe9s Gyenges\xe9g K\xe9t Arca \u2013 Mi az Elt\xe9r\xe9s_",
                "217. Izombetegs\xe9gek Detekt\xedvmunk\xe1ja_ A Myopathia Diagn\xf3zis\xe1t\xf3l a Kezel\xe9sig.mp3",
                "218-219. Izombetegs\xe9gek \xe9s Ideg-Izom Kapcsolat_ Dystrophia, Myotonia \xe9s Autoimmun T\xe1mad\xe1sok Felt\xe1r\xe1sa.mp3",
                "220-221. Szerzett Izombetegs\xe9gek_ Mi\xe9rt Fontos Tudnod a Myopathi\xe1kr\xf3l \xe9s Mi Rejlik M\xf6g\xf6tt\xfck_.mp3",
                "222-223. F\xe1jdalomszindr\xf3m\xe1k \xe9s Migr\xe9n_ Mi\xe9rt Komplexebb, Mint Gondoln\xe1d_ \u2013 Biopszichoszoci\xe1lis Megk\xf6zel\xedt\xe9s \xe9s \xdaj Kezel\xe9sek.mp3",
                "224-225. Fejf\xe1j\xe1sok \xe9s Neuralgi\xe1k_ Amikor a Fej\xfcnk Pokoll\xe1 V\xe1lhat \u2013 A V\xf6r\xf6s Z\xe1szl\xf3kt\xf3l az \xd6ngyilkos F\xe1jdalomig.mp3",
                "226-227. Neurop\xe1tia \xe9s \xc1l-agydaganat_ K\xe9t Rejt\xe9lyes Neurol\xf3giai \xc1llapot K\xfcl\xf6nbs\xe9gei \xe9s Kezel\xe9se.mp3",
                "228. Alzheimer_ Glob\xe1lis Kih\xedv\xe1s, Megel\u0151z\xe9s \xe9s Agyunk Titkai \u2013 Mi\xe9rt Nem V\xe9gzet a Genetika_.mp3",
                "229-230. Vascularis \xe9s Nem-Alzheimer Demenci\xe1k_ Sok Arc, M\xe1s T\xfcnetek \xe9s Agyv\xe9delem.mp3",
                "231. FTD_ A Demencia Rejtett Arca \u2013 Viselked\xe9s, Nyelv \xe9s \xdaj Rem\xe9nyek Fiatalabb Korban.mp3",
                "232-233. Demencia vagy Kezelhet\u0151 Ok_ Amikor a V\xedzfej\u0171s\xe9g Ut\xe1nozza a Hanyatl\xe1st.mp3",
                "234-235. Demenci\xe1k_ A Korai Felismer\xe9st\u0151l a C\xe9lzott Ter\xe1pi\xe1kig \u2013 \xdaj Rem\xe9ny a Szellemi Frissess\xe9g\xe9rt.mp3",
                "236-237. \xd6r\xf6kletes Idegrendszeri Betegs\xe9gek_ Mitokondri\xe1lis Zavarok \xe9s Genetikai Dadog\xe1s \u2013 A Genetika Rejt\xe9lyei \xe9s a J\xf6v\u0151 Ter\xe1pi\xe1i.mp3",
                "238-239. Neurogenetika \xe9s a Diagnosztikai Forradalom_ A G\xe9nter\xe1pi\xe1t\xf3l az Etikai Dilemm\xe1kig.mp3",
                "240-241. Agys\xe9r\xfcl\xe9s Ut\xe1n_ Neuroplaszticit\xe1s, Af\xe1zia \xe9s a Kommunik\xe1ci\xf3 Helyre\xe1ll\xedt\xe1sa \u2013 Mi a Siker Kulcsa_.mp3",
                "242-243. Fejs\xe9r\xfcl\xe9st\u0151l a Rehabilit\xe1ci\xf3ig_ Amit a Traum\xe1s Agyk\xe1rosod\xe1sr\xf3l Tudni Kell.mp3",
                "244-245. Rejtett K\xe1rok az Agym\u0171k\xf6d\xe9sben_ Mi az a TAS \xe9s Hogyan V\xe9dhetj\xfck Meg Magunkat_.mp3",
                "246-247. Gerincvel\u0151-k\xe1rosod\xe1s vs. Har\xe1ntl\xe9zi\xf3_ Mi a K\xfcl\xf6nbs\xe9g \xe9s Mi\xe9rt Sz\xe1m\xedt az Id\u0151_",
                "248-249. Elme, Agy \xe9s Test_ A Neurol\xf3giai Betegs\xe9gek Rejtett Kapcsolatai \u2013 FND-t\u0151l a Depresszi\xf3ig.mp3",
                "250-251. Agyhib\xe1k vagy Szoftveres Zavarok_ A Neurokognit\xedv \xe9s Funkcion\xe1lis T\xfcneti Zavarr\xf3l.mp3",
                "252-253. Agyhal\xe1l \xe9s Agyv\xe9delem_ A Neuro-Intenz\xedv Oszt\xe1lyok Rejt\xe9lyes Vil\xe1ga.mp3",
                "254. Az Id\u0151 \xc9letet Ment_ Neurol\xf3giai V\xe9szhelyzetek Gyors Felismer\xe9se \xe9s Kezel\xe9se \u2013 A Stroket\xf3l a Ritka Szindr\xf3m\xe1kig.mp3",
                "255. Discop\xe1thia \xe9s Gerincs\xe9rv_ K\xfcl\xf6nbs\xe9gek, T\xfcnetek \xe9s Hat\xe9kony Kezel\xe9s M\u0171t\xe9t N\xe9lk\xfcl.mp3",
                "256-257. Sz\xe9d\xfcl\xe9s \xe9s V\xedzfej\u0171s\xe9g_ Az \xc9rthet\u0151 \xdatmutat\xf3 a Diagn\xf3zis Labirintus\xe1ban.mp3",
                "258-259. Neurol\xf3giai kih\xedv\xe1sok terhess\xe9g \xe9s id\u0151s korban_ Biztons\xe1gos kezel\xe9s \xe9s a preeclampsia rejtett \xf6r\xf6ks\xe9ge.mp3"
            ]
        };
        return lists[path] || [];
    }
    /**
     * Parse podcast filenames to extract metadata
     * @param {Array} filenames - List of podcast filenames
     * @param {string} categoryId - Category identifier
     * @returns {Array} Parsed podcast objects
     */ parsePodcasts(filenames, categoryId) {
        return filenames.filter((filename)=>filename.endsWith('.mp3')).map((filename, index)=>{
            const parsed = this.parseFilename(filename);
            return {
                id: `${categoryId}_${index}`,
                categoryId,
                filename,
                ...parsed
            };
        }).sort((a, b)=>{
            // Sort by start topic number
            const aStart = parseInt(a.topicNumbers.split('-')[0]) || 999;
            const bStart = parseInt(b.topicNumbers.split('-')[0]) || 999;
            return aStart - bStart;
        });
    }
    /**
     * Parse a podcast filename to extract topic numbers and title
     * @param {string} filename - Podcast filename
     * @returns {Object} Parsed metadata
     */ parseFilename(filename) {
        // Remove .mp3 extension
        const name = filename.replace('.mp3', '');
        // Try to extract topic numbers at the beginning
        const topicMatch = name.match(/^(\d+(?:-\d+)?(?:\.\d+)?)/);
        let topicNumbers = '';
        let title = name;
        if (topicMatch) {
            topicNumbers = topicMatch[1];
            // Remove topic numbers from title
            title = name.substring(topicMatch[0].length).trim();
            // Clean up title - remove leading punctuation
            title = title.replace(/^[._\s]+/, '');
        }
        // Clean up title
        title = title.replace(/_/g, ' ').trim();
        return {
            topicNumbers,
            title: title || "N\xe9vtelen podcast",
            duration: null // Would need server-side processing to get actual duration
        };
    }
    /**
     * Get podcasts for a specific category
     * @param {string} categoryId - Category identifier
     * @returns {Array} List of podcasts
     */ getPodcastsByCategory(categoryId) {
        return this.categories[categoryId]?.podcasts || [];
    }
    /**
     * Get category info
     * @param {string} categoryId - Category identifier
     * @returns {Object} Category information
     */ getCategoryInfo(categoryId) {
        return this.categories[categoryId];
    }
    /**
     * Search podcasts across all categories
     * @param {string} query - Search query
     * @returns {Array} Matching podcasts
     */ searchPodcasts(query) {
        const lowercaseQuery = query.toLowerCase();
        const results = [];
        for (const [categoryId, category] of Object.entries(this.categories)){
            const matches = category.podcasts.filter((podcast)=>{
                return podcast.title.toLowerCase().includes(lowercaseQuery) || podcast.topicNumbers.includes(query);
            });
            results.push(...matches);
        }
        return results;
    }
    /**
     * Get the full URL for a podcast file
     * @param {Object} podcast - Podcast object
     * @returns {string} Full URL
     */ getPodcastUrl(podcast) {
        const category = this.categories[podcast.categoryId];
        // URL encode the path to handle spaces and special characters
        const encodedPath = category.path.split('/').map((part)=>encodeURIComponent(part)).join('/');
        const encodedFilename = encodeURIComponent(podcast.filename);
        return `${encodedPath}${encodedFilename}`;
    }
    /**
     * Get podcast count for a category
     * @param {string} categoryId - Category identifier
     * @returns {number} Number of podcasts
     */ getPodcastCount(categoryId) {
        return this.categories[categoryId]?.podcasts.length || 0;
    }
    /**
     * Create a playlist from topic range
     * @param {string} categoryId - Category identifier
     * @param {number} startTopic - Start topic number
     * @param {number} endTopic - End topic number
     * @returns {Array} Playlist of podcasts
     */ createPlaylistFromRange(categoryId, startTopic, endTopic) {
        const categoryPodcasts = this.getPodcastsByCategory(categoryId);
        return categoryPodcasts.filter((podcast)=>{
            const topicStart = parseInt(podcast.topicNumbers.split('-')[0]) || 0;
            return topicStart >= startTopic && topicStart <= endTopic;
        });
    }
}
const podcastData = new PodcastData();

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

},{}],"6qYx1":[function(require,module,exports,__globalThis) {
/**
 * Podcast Player Module
 * Handles audio playback and player controls
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PodcastPlayer", ()=>PodcastPlayer);
parcelHelpers.export(exports, "podcastPlayer", ()=>podcastPlayer);
class PodcastPlayer {
    constructor(){
        this.audio = document.getElementById('audio-element');
        this.playlist = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        this.isSeeking = false;
        // Player elements
        this.player = document.getElementById('audio-player');
        // Remove the minimized class to start expanded
        this.player.classList.remove('minimized');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressHandle = document.querySelector('.progress-handle');
        this.currentTime = document.querySelector('.time-current');
        this.totalTime = document.querySelector('.time-total');
        this.volumeBtn = document.getElementById('volume-btn');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.volumeFill = document.querySelector('.volume-fill');
        this.volumeHandle = document.querySelector('.volume-handle');
        this.trackNumber = document.querySelector('.track-number');
        this.trackTitle = document.querySelector('.track-title');
        this.trackCategory = document.querySelector('.track-category');
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.playlistToggle = document.getElementById('playlist-toggle');
        this.playlistPanel = document.getElementById('playlist-panel');
        this.playlistItems = document.getElementById('playlist-items');
        // Waveform canvas
        this.canvas = document.getElementById('waveform');
        this.canvasCtx = this.canvas.getContext('2d');
        this.animationId = null;
        this.initializePlayer();
        this.setupEventListeners();
        this.loadSavedState();
    }
    /**
     * Initialize player settings
     */ initializePlayer() {
        // Set initial volume
        this.audio.volume = 0.8;
        this.updateVolumeDisplay(0.8);
        // Setup canvas size
        this.resizeCanvas();
        window.addEventListener('resize', ()=>this.resizeCanvas());
    }
    /**
     * Setup all event listeners
     */ setupEventListeners() {
        // Audio events
        this.audio.addEventListener('timeupdate', ()=>this.updateProgress());
        this.audio.addEventListener('loadedmetadata', ()=>this.updateDuration());
        this.audio.addEventListener('ended', ()=>this.handleTrackEnd());
        this.audio.addEventListener('play', ()=>this.handlePlay());
        this.audio.addEventListener('pause', ()=>this.handlePause());
        this.audio.addEventListener('error', (e)=>this.handleError(e));
        // Player controls
        this.playPauseBtn.addEventListener('click', ()=>this.togglePlayPause());
        this.prevBtn.addEventListener('click', ()=>this.playPrevious());
        this.nextBtn.addEventListener('click', ()=>this.playNext());
        // Progress bar
        this.progressBar.addEventListener('mousedown', (e)=>this.startSeek(e));
        this.progressBar.addEventListener('touchstart', (e)=>this.startSeek(e.touches[0]));
        // Volume control
        this.volumeBtn.addEventListener('click', ()=>this.toggleMute());
        this.volumeSlider.addEventListener('mousedown', (e)=>this.startVolumeChange(e));
        this.volumeSlider.addEventListener('touchstart', (e)=>this.startVolumeChange(e.touches[0]));
        // UI controls
        this.minimizeBtn.addEventListener('click', ()=>this.toggleMinimize());
        this.playlistToggle.addEventListener('click', ()=>this.togglePlaylist());
        // Playlist clear button
        document.querySelector('.playlist-clear')?.addEventListener('click', ()=>this.clearPlaylist());
        // Keyboard shortcuts
        document.addEventListener('keydown', (e)=>this.handleKeyboard(e));
    }
    /**
     * Load saved player state from localStorage
     */ loadSavedState() {
        const savedState = localStorage.getItem('podcastPlayerState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.audio.volume = state.volume || 0.8;
            this.updateVolumeDisplay(this.audio.volume);
        }
    }
    /**
     * Save player state to localStorage
     */ saveState() {
        const state = {
            volume: this.audio.volume,
            currentPodcast: this.playlist[this.currentIndex]?.id,
            currentTime: this.audio.currentTime
        };
        localStorage.setItem('podcastPlayerState', JSON.stringify(state));
    }
    /**
     * Load a podcast into the player
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */ loadPodcast(podcast, url, categoryInfo) {
        this.audio.src = url;
        this.updateTrackInfo(podcast, categoryInfo);
        this.player.classList.remove('minimized');
        this.saveState();
    }
    /**
     * Play a podcast
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */ async playPodcast(podcast, url, categoryInfo) {
        this.loadPodcast(podcast, url, categoryInfo);
        try {
            await this.audio.play();
        } catch (error) {
            console.error('Error playing podcast:', error);
        }
    }
    /**
     * Add podcast to playlist
     * @param {Object} podcast - Podcast object
     * @param {string} url - Podcast URL
     * @param {Object} categoryInfo - Category information
     */ addToPlaylist(podcast, url, categoryInfo) {
        const playlistItem = {
            podcast,
            url,
            categoryInfo
        };
        // Check if already in playlist
        const existingIndex = this.playlist.findIndex((item)=>item.podcast.id === podcast.id);
        if (existingIndex === -1) {
            this.playlist.push(playlistItem);
            this.updatePlaylistDisplay();
        }
    }
    /**
     * Play podcast at index
     * @param {number} index - Playlist index
     */ playAtIndex(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentIndex = index;
            const item = this.playlist[index];
            this.playPodcast(item.podcast, item.url, item.categoryInfo);
            this.updatePlaylistDisplay();
        }
    }
    /**
     * Toggle play/pause
     */ togglePlayPause() {
        if (this.audio.paused) this.audio.play();
        else this.audio.pause();
    }
    /**
     * Play previous track
     */ playPrevious() {
        if (this.currentIndex > 0) this.playAtIndex(this.currentIndex - 1);
    }
    /**
     * Play next track
     */ playNext() {
        if (this.currentIndex < this.playlist.length - 1) this.playAtIndex(this.currentIndex + 1);
    }
    /**
     * Handle play event
     */ handlePlay() {
        this.isPlaying = true;
        this.playPauseBtn.querySelector('.control-icon').textContent = "\u23F8";
        this.startWaveformAnimation();
        // Update playing indicators
        document.querySelectorAll('.podcast-item').forEach((item)=>{
            item.classList.remove('playing');
        });
        const currentPodcast = this.playlist[this.currentIndex]?.podcast;
        if (currentPodcast) {
            const playingItem = document.querySelector(`[data-podcast-id="${currentPodcast.id}"]`);
            if (playingItem) playingItem.classList.add('playing');
        }
    }
    /**
     * Handle pause event
     */ handlePause() {
        this.isPlaying = false;
        this.playPauseBtn.querySelector('.control-icon').textContent = "\u25B6";
        this.stopWaveformAnimation();
        this.saveState();
    }
    /**
     * Handle track end
     */ handleTrackEnd() {
        if (this.currentIndex < this.playlist.length - 1) this.playNext();
        else this.handlePause();
    }
    /**
     * Handle playback error
     * @param {Event} error - Error event
     */ handleError(error) {
        console.error('Playback error:', error);
        alert("Hiba t\xf6rt\xe9nt a podcast lej\xe1tsz\xe1sa k\xf6zben.");
    }
    /**
     * Update progress display
     */ updateProgress() {
        if (!this.isSeeking && this.audio.duration) {
            const progress = this.audio.currentTime / this.audio.duration * 100;
            this.progressFill.style.width = `${progress}%`;
            this.progressHandle.style.left = `${progress}%`;
            this.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    /**
     * Update duration display
     */ updateDuration() {
        this.totalTime.textContent = this.formatTime(this.audio.duration);
    }
    /**
     * Start seeking
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */ startSeek(e) {
        this.isSeeking = true;
        this.seek(e);
        const moveHandler = (e)=>this.seek(e.touches ? e.touches[0] : e);
        const upHandler = ()=>{
            this.isSeeking = false;
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.removeEventListener('touchend', upHandler);
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mouseup', upHandler);
        document.addEventListener('touchend', upHandler);
    }
    /**
     * Seek to position
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */ seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (this.audio.duration) {
            this.audio.currentTime = percent * this.audio.duration;
            this.progressFill.style.width = `${percent * 100}%`;
            this.progressHandle.style.left = `${percent * 100}%`;
        }
    }
    /**
     * Toggle mute
     */ toggleMute() {
        if (this.audio.volume > 0) {
            this.lastVolume = this.audio.volume;
            this.audio.volume = 0;
            this.volumeBtn.querySelector('.control-icon').textContent = "\uD83D\uDD07";
        } else {
            this.audio.volume = this.lastVolume || 0.8;
            this.volumeBtn.querySelector('.control-icon').textContent = "\uD83D\uDD0A";
        }
        this.updateVolumeDisplay(this.audio.volume);
    }
    /**
     * Start volume change
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */ startVolumeChange(e) {
        this.changeVolume(e);
        const moveHandler = (e)=>this.changeVolume(e.touches ? e.touches[0] : e);
        const upHandler = ()=>{
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.removeEventListener('touchend', upHandler);
            this.saveState();
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mouseup', upHandler);
        document.addEventListener('touchend', upHandler);
    }
    /**
     * Change volume
     * @param {MouseEvent|Touch} e - Mouse or touch event
     */ changeVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.audio.volume = percent;
        this.updateVolumeDisplay(percent);
    }
    /**
     * Update volume display
     * @param {number} volume - Volume level (0-1)
     */ updateVolumeDisplay(volume) {
        const percent = volume * 100;
        this.volumeFill.style.width = `${percent}%`;
        this.volumeHandle.style.left = `${percent}%`;
        if (volume === 0) this.volumeBtn.querySelector('.control-icon').textContent = "\uD83D\uDD07";
        else if (volume < 0.5) this.volumeBtn.querySelector('.control-icon').textContent = "\uD83D\uDD09";
        else this.volumeBtn.querySelector('.control-icon').textContent = "\uD83D\uDD0A";
    }
    /**
     * Update track info display
     * @param {Object} podcast - Podcast object
     * @param {Object} categoryInfo - Category information
     */ updateTrackInfo(podcast, categoryInfo) {
        this.trackNumber.textContent = podcast.topicNumbers || '-';
        this.trackTitle.textContent = podcast.title;
        this.trackCategory.textContent = categoryInfo.name;
    }
    /**
     * Toggle minimize state
     */ toggleMinimize() {
        this.player.classList.toggle('minimized');
    }
    /**
     * Toggle playlist display
     */ togglePlaylist() {
        this.playlistPanel.classList.toggle('active');
    }
    /**
     * Update playlist display
     */ updatePlaylistDisplay() {
        this.playlistItems.innerHTML = '';
        this.playlist.forEach((item, index)=>{
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            if (index === this.currentIndex) playlistItem.classList.add('active');
            playlistItem.innerHTML = `
                <div class="playlist-item-info">
                    <div class="playlist-item-number">${item.podcast.topicNumbers}</div>
                    <div class="playlist-item-title">${item.podcast.title}</div>
                </div>
                <span class="playlist-remove" data-index="${index}">\u{2715}</span>
            `;
            playlistItem.addEventListener('click', (e)=>{
                if (e.target.classList.contains('playlist-remove')) this.removeFromPlaylist(index);
                else this.playAtIndex(index);
            });
            this.playlistItems.appendChild(playlistItem);
        });
    }
    /**
     * Remove item from playlist
     * @param {number} index - Playlist index
     */ removeFromPlaylist(index) {
        this.playlist.splice(index, 1);
        if (index < this.currentIndex) this.currentIndex--;
        else if (index === this.currentIndex) {
            if (this.isPlaying) this.audio.pause();
            this.currentIndex = -1;
        }
        this.updatePlaylistDisplay();
    }
    /**
     * Clear playlist
     */ clearPlaylist() {
        this.playlist = [];
        this.currentIndex = -1;
        if (this.isPlaying) this.audio.pause();
        this.updatePlaylistDisplay();
    }
    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */ handleKeyboard(e) {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT') return;
        switch(e.key){
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.audio.volume = Math.min(1, this.audio.volume + 0.1);
                this.updateVolumeDisplay(this.audio.volume);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.audio.volume = Math.max(0, this.audio.volume - 0.1);
                this.updateVolumeDisplay(this.audio.volume);
                break;
        }
    }
    /**
     * Format time for display
     * @param {number} seconds - Time in seconds
     * @returns {string} Formatted time
     */ formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    /**
     * Resize canvas
     */ resizeCanvas() {
        const rect = this.player.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    /**
     * Start waveform animation
     */ startWaveformAnimation() {
        const animate = ()=>{
            this.drawWaveform();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    /**
     * Stop waveform animation
     */ stopWaveformAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        // Clear canvas
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Draw waveform visualization
     */ drawWaveform() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.canvasCtx.clearRect(0, 0, width, height);
        // Simple waveform effect
        const barCount = 50;
        const barWidth = width / barCount;
        const barSpacing = 2;
        this.canvasCtx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        for(let i = 0; i < barCount; i++){
            const barHeight = Math.random() * height * 0.8 + height * 0.1;
            const x = i * barWidth + barSpacing;
            const y = (height - barHeight) / 2;
            this.canvasCtx.fillRect(x, y, barWidth - barSpacing * 2, barHeight);
        }
    }
}
const podcastPlayer = new PodcastPlayer();

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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fLKIo"}]},["92exv","ekfpp"], "ekfpp", "parcelRequire94c2", {})

//# sourceMappingURL=podcast.772a5790.js.map
