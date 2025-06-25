var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { inject, shallowRef, defineComponent, unref, shallowReactive, reactive, computed, h as h$1, provide, ref, watch, getCurrentInstance, watchEffect, nextTick, toRef, onMounted, defineAsyncComponent, onUnmounted, camelize, capitalize, toValue, Transition, mergeProps, useSSRContext, createSlots, withCtx, renderSlot, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, toRefs, withDirectives, Fragment, renderList, vShow, resolveComponent, useTemplateRef, createTextVNode, onBeforeUnmount, useAttrs, createElementBlock, isRef, normalizeStyle, createElementVNode, normalizeClass, useCssVars, normalizeProps, guardReactiveProps, Suspense, resolveDynamicComponent, toHandlers, createSSRApp, customRef } from "vue";
import { useElementSize, useWindowSize, useWindowScroll, useEventListener, useToggle, useStorage, usePreferredDark, watchImmediate, provideLocal, injectLocal } from "@vueuse/core";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderSlotInner, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import ElementPlus, { ElForm, ElMessage } from "element-plus";
import { isString as isString$1, isNumber, isObject, isArray as isArray$1, isBoolean, isFunction } from "lodash";
var isLinkWithProtocol = (link) => /^[a-z][a-z0-9+.-]*:/.test(link) || link.startsWith("//");
var markdownLinkRegexp = /.md((\?|#).*)?$/;
var isLinkExternal = (link, base = "/") => isLinkWithProtocol(link) || // absolute link that does not start with `base` and does not end with `.md`
link.startsWith("/") && !link.startsWith(base) && !markdownLinkRegexp.test(link);
var isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
var inferRoutePath = (rawPath) => {
  if (!rawPath || rawPath.endsWith("/")) return rawPath;
  let routePath = rawPath.replace(/(^|\/)README.md$/i, "$1index.html");
  if (routePath.endsWith(".md")) {
    routePath = `${routePath.substring(0, routePath.length - 3)}.html`;
  } else if (!routePath.endsWith(".html")) {
    routePath = `${routePath}.html`;
  }
  if (routePath.endsWith("/index.html")) {
    routePath = routePath.substring(0, routePath.length - 10);
  }
  return routePath;
};
var FAKE_HOST = "http://.";
var normalizeRoutePath = (pathname, current) => {
  if (!pathname.startsWith("/") && current) {
    const loc = current.slice(0, current.lastIndexOf("/"));
    return inferRoutePath(new URL(`${loc}/${pathname}`, FAKE_HOST).pathname);
  }
  return inferRoutePath(pathname);
};
var resolveLocalePath = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b.length - a.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
var SPLIT_CHAR_REGEXP = /(#|\?)/;
var splitPath = (path) => {
  const [pathname, ...hashAndQueries] = path.split(SPLIT_CHAR_REGEXP);
  return {
    pathname,
    hashAndQueries: hashAndQueries.join("")
  };
};
var TAGS_ALLOWED = ["link", "meta", "script", "style", "noscript", "template"];
var TAGS_UNIQUE = ["title", "base"];
var resolveHeadIdentifier = ([tag, attrs, content]) => {
  if (TAGS_UNIQUE.includes(tag)) {
    return tag;
  }
  if (!TAGS_ALLOWED.includes(tag)) {
    return null;
  }
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([
    tag,
    Object.entries(attrs).map(([key, value]) => {
      if (typeof value === "boolean") {
        return value ? [key, ""] : null;
      }
      return [key, value];
    }).filter((item) => item != null).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    content
  ]);
};
var dedupeHead = (head) => {
  const identifierSet = /* @__PURE__ */ new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (identifier && !identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
var ensureEndingSlash = (str) => str.endsWith("/") || str.endsWith(".html") ? str : `${str}/`;
var removeEndingSlash = (str) => str.endsWith("/") ? str.slice(0, -1) : str;
var removeLeadingSlash = (str) => str.startsWith("/") ? str.slice(1) : str;
var isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
var isString = (val) => typeof val === "string";
const redirects$1 = JSON.parse("{}");
const routes$1 = Object.fromEntries([
  ["/get-started.html", { loader: () => import(
    /* webpackChunkName: "get-started.html" */
    "./assets/get-started.html-BdPQssGp.js"
  ), meta: { "title": "" } }],
  ["/", { loader: () => import(
    /* webpackChunkName: "index.html" */
    "./assets/index.html-C37h-P5v.js"
  ), meta: { "title": "Home" } }],
  ["/404.html", { loader: () => import(
    /* webpackChunkName: "404.html" */
    "./assets/404.html-CSkdfVbW.js"
  ), meta: { "title": "" } }]
]);
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = globalThis.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) {
      setupFn(proxy.proxiedTarget);
    }
  }
}
/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
  // add the Module string tag
  obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    process.env.NODE_ENV !== "production" && warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i2) => value === b[i2]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (process.env.NODE_ENV !== "production" && !from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  // TODO: could we use a symbol in the future?
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
const START = "";
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      process.env.NODE_ENV !== "production" && warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function createMemoryHistory(base = "") {
  let listeners = [];
  let queue2 = [[START, {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location2, state = {}) {
    position++;
    if (position !== queue2.length) {
      queue2.splice(position);
    }
    queue2.push([location2, state]);
  }
  function triggerListeners(to, from, { direction, delta }) {
    const info = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners) {
      callback(to, from, info);
    }
  }
  const routerHistory = {
    // rewritten by Object.defineProperty
    location: START,
    // rewritten by Object.defineProperty
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to, state) {
      queue2.splice(position--, 1);
      setLocation(to, state);
    },
    push(to, state) {
      setLocation(to, state);
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1)
          listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
      queue2 = [[START, {}]];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction = (
        // we are considering delta === 0 going forward, but in abstract mode
        // using 0 for the delta doesn't make sense like it does in html5 where
        // it reloads the page
        delta < 0 ? NavigationDirection.back : NavigationDirection.forward
      );
      position = Math.max(0, Math.min(position + delta, queue2.length - 1));
      if (shouldTrigger) {
        triggerListeners(this.location, from, {
          direction,
          delta
        });
      }
    }
  };
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => queue2[position][0]
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => queue2[position][1]
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const NavigationFailureSymbol = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [
    1
    /* ErrorTypes.MATCHER_NOT_FOUND */
  ]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [
    2
    /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
  ]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [
    4
    /* ErrorTypes.NAVIGATION_ABORTED */
  ]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [
    8
    /* ErrorTypes.NAVIGATION_CANCELLED */
  ]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [
    16
    /* ErrorTypes.NAVIGATION_DUPLICATED */
  ]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  if (process.env.NODE_ENV !== "production" || false) {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  } else {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if (to.path != null)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys2 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys2.push({
          name: value,
          repeatable,
          optional
        });
        const re22 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re22 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re22})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re22}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re22})(?:/(?:${re22}))*)` : `(${re22})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re22 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict && !pattern.endsWith("/"))
    pattern += "(?:/|$)";
  const re2 = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re2);
    const params = {};
    if (!match)
      return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys2[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re: re2,
    score,
    keys: keys2,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i2 = 0;
  while (i2 < a.length && i2 < b.length) {
    const diff = b[i2] - a[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i2 = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${path}" should be "/${path}".` : `Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  if (process.env.NODE_ENV !== "production") {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    if (process.env.NODE_ENV !== "production") {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          normalizeRouteRecord(assign({}, mainNormalizedRecord, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            // we might be the child of an alias
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }))
        );
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (process.env.NODE_ENV !== "production" && normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (process.env.NODE_ENV !== "production" && parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        if (process.env.NODE_ENV !== "production") {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          if (process.env.NODE_ENV !== "production") {
            checkSameNameAsAncestor(record, parent);
          }
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      if (process.env.NODE_ENV !== "production") {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if (location2.path != null) {
      path = location2.path;
      if (process.env.NODE_ENV !== "production" && !path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      }
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function paramsFromLocation(params, keys2) {
  const newParams = {};
  for (const key of keys2) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", {
    value: {}
  });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "object" ? props[name] : props;
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a, b) {
  return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
function checkSameParams(a, b) {
  for (const key of a.keys) {
    if (!key.optional && !b.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b.keys) {
    if (!key.optional && !a.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkSameNameAsAncestor(record, parent) {
  for (let ancestor = parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.record.name === record.name) {
      throw new Error(`A route named "${String(record.name)}" has been added as a ${parent === ancestor ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
    }
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    const sortOrder = comparePathParserScore(matcher, matchers[mid]);
    if (sortOrder < 0) {
      upper = mid;
    } else {
      lower = mid + 1;
    }
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    if (process.env.NODE_ENV !== "production" && upper < 0) {
      warn(`Finding ancestor route "${insertionAncestor.record.path}" failed for "${matcher.record.path}"`);
    }
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) {
    if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
      return ancestor;
    }
  }
  return;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
const viewDepthKey = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const routerKey = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
const routerViewLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i2 = handlers.indexOf(handler);
      if (i2 > -1)
        handlers.splice(i2, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, process.env.NODE_ENV !== "production" ? canOnlyBeCalledOnce(next, to, from) : next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (process.env.NODE_ENV !== "production" && guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    if (process.env.NODE_ENV !== "production" && !record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (process.env.NODE_ENV !== "production") {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise2 = rawComponent;
          rawComponent = () => promise2;
        } else if (rawComponent.__asyncLoader && // warn only once per component
        !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        if (process.env.NODE_ENV !== "production" && !("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (process.env.NODE_ENV !== "production" && (!hasPrevious || to !== previousTo)) {
      if (!isRouteLocation(to)) {
        if (hasPrevious) {
          warn(`Invalid value for prop "to" in useLink()
- to:`, to, `
- previous to:`, previousTo, `
- props:`, props);
        } else {
          warn(`Invalid value for prop "to" in useLink()
- to:`, to, `
- props:`, props);
        }
      }
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent$1(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => p);
      }
      return p;
    }
    return Promise.resolve();
  }
  if ((process.env.NODE_ENV !== "production" || false) && isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
        linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h$1("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent$1(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    process.env.NODE_ENV !== "production" && warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if ((process.env.NODE_ENV !== "production" || false) && isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    // remove variables that can contain vue instances
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let label = devtoolsData.route.path;
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          let textColor = 0;
          if (devtoolsData.error) {
            label = devtoolsData.error;
            backgroundColor = RED_100;
            textColor = RED_700;
          } else if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label,
            textColor,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("❌");
      } else {
        data.status = formatDisplay("✅");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes2 = matcher.getRoutes().filter((route) => !route.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !route.parent.record.components);
      routes2.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes2 = routes2.filter((route) => (
          // save matches state based on the payload
          isRouteMatching(route, payload.filter.toLowerCase())
        ));
      }
      routes2.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes2.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes2 = matcher.getRoutes();
        const route = routes2.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
const RED_100 = 16704226;
const RED_700 = 12131356;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys2) {
  const ret = {};
  for (const key in obj) {
    if (!keys2.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (process.env.NODE_ENV !== "production" && !routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://router.vuejs.org/api/interfaces/RouterOptions.html#history');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (process.env.NODE_ENV !== "production" && !parent) {
        warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`, route);
      }
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else if (process.env.NODE_ENV !== "production") {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      if (process.env.NODE_ENV !== "production") {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    if (process.env.NODE_ENV !== "production" && !isRouteLocation(rawLocation)) {
      warn(`router.resolve() was passed an invalid location. This will fail in production.
- Location:`, rawLocation);
      return resolve({});
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      if (process.env.NODE_ENV !== "production" && "params" in rawLocation && !("name" in rawLocation) && // @ts-expect-error: the type is never
      Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (process.env.NODE_ENV !== "production" && hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    if (process.env.NODE_ENV !== "production") {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${rawLocation.path != null ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      if (process.env.NODE_ENV !== "production" && newTargetLocation.path == null && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          if (process.env.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          isSameRouteLocation(stringifyQuery$1, resolve(failure2.to), toLocation) && // and we have done it a couple of times
          redirectedFrom && // @ts-expect-error: added only in dev
          (redirectedFrom._count = redirectedFrom._count ? (
            // @ts-expect-error
            redirectedFrom._count + 1
          ) : 1) > 30) {
            warn(`Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) {
        if (record.beforeEnter) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true, force: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            assign(locationAsObject(error.to), {
              force: true
            }),
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      if (process.env.NODE_ENV !== "production") {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          if (process.env.NODE_ENV !== "production")
            warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if ((process.env.NODE_ENV !== "production" || false) && isBrowser) {
        addDevtools(app, router2, matcher);
      }
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise2, guard) => promise2.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
}
var clientDataSymbol = Symbol(
  ""
);
var useClientData = () => {
  const clientData = inject(clientDataSymbol);
  if (!clientData) {
    throw new Error("useClientData() is called without provider.");
  }
  return clientData;
};
var usePageComponent = () => useClientData().pageComponent;
var usePageData = () => useClientData().pageData;
var usePageFrontmatter = () => useClientData().pageFrontmatter;
var usePageHead = () => useClientData().pageHead;
var usePageLang = () => useClientData().pageLang;
var usePageLayout = () => useClientData().pageLayout;
var useRouteLocale = () => useClientData().routeLocale;
var useRoutePath = () => useClientData().routePath;
var useRoutes = () => useClientData().routes;
var useSiteData = () => useClientData().siteData;
var contentUpdatedCallbacks = shallowRef([]);
var onContentUpdated = (fn) => {
  contentUpdatedCallbacks.value.push(fn);
  onUnmounted(() => {
    contentUpdatedCallbacks.value = contentUpdatedCallbacks.value.filter(
      (f) => f !== fn
    );
  });
};
var redirects = shallowRef(redirects$1);
var routes = shallowRef(routes$1);
var resolveRoutePath = (pathname, currentPath) => {
  const normalizedRoutePath = normalizeRoutePath(pathname, currentPath);
  if (routes.value[normalizedRoutePath]) return normalizedRoutePath;
  const encodedRoutePath = encodeURI(normalizedRoutePath);
  if (routes.value[encodedRoutePath]) {
    return encodedRoutePath;
  }
  const redirectedRoutePath = redirects.value[normalizedRoutePath] || redirects.value[encodedRoutePath];
  if (redirectedRoutePath) {
    return redirectedRoutePath;
  }
  return normalizedRoutePath;
};
var resolveRoute = (path, currentPath) => {
  const { pathname, hashAndQueries } = splitPath(path);
  const routePath = resolveRoutePath(pathname, currentPath);
  const routeFullPath = routePath + hashAndQueries;
  if (!routes.value[routePath]) {
    return {
      ...routes.value["/404.html"],
      path: routeFullPath,
      notFound: true
    };
  }
  return {
    ...routes.value[routePath],
    path: routeFullPath,
    notFound: false
  };
};
var resolveRouteFullPath = (path, currentPath) => {
  const { pathname, hashAndQueries } = splitPath(path);
  return resolveRoutePath(pathname, currentPath) + hashAndQueries;
};
var guardEvent = (event) => {
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
  if (event.defaultPrevented) return;
  if (event.button !== void 0 && event.button !== 0) return;
  if (event.currentTarget) {
    const target = event.currentTarget.getAttribute("target");
    if (target == null ? void 0 : target.match(/\b_blank\b/i)) return;
  }
  event.preventDefault();
  return true;
};
var RouteLink = defineComponent({
  name: "RouteLink",
  props: {
    /**
     * The route path to link to
     */
    to: {
      type: String,
      required: true
    },
    /**
     * Whether the link is active to have an active class
     *
     * Notice that the active status is not automatically determined according to the current route.
     */
    active: Boolean,
    /**
     * The class to add when the link is active
     */
    activeClass: {
      type: String,
      default: "route-link-active"
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const router = useRouter();
    const route = useRoute();
    const path = computed(
      () => props.to.startsWith("#") || props.to.startsWith("?") ? props.to : `${"/"}${resolveRouteFullPath(props.to, route.path).substring(1)}`
    );
    return () => h$1(
      "a",
      {
        class: ["route-link", { [props.activeClass]: props.active }],
        href: path.value,
        onClick: (event = {}) => {
          if (guardEvent(event)) {
            void router.push(props.to).catch();
          }
        }
      },
      slots.default()
    );
  }
});
var AutoLink = defineComponent({
  name: "AutoLink",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const config2 = toRef(props, "config");
    const route = useRoute();
    const siteData2 = useSiteData();
    const withProtocol = computed(() => isLinkWithProtocol(config2.value.link));
    const linkTarget = computed(
      () => config2.value.target || (withProtocol.value ? "_blank" : void 0)
    );
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const isInternal = computed(
      () => !withProtocol.value && !isBlankTarget.value
    );
    const linkRel = computed(
      () => config2.value.rel || (isBlankTarget.value ? "noopener noreferrer" : null)
    );
    const linkAriaLabel = computed(
      () => config2.value.ariaLabel ?? config2.value.text
    );
    const shouldBeActiveInSubpath = computed(() => {
      if (config2.value.exact) return false;
      const localePaths = Object.keys(siteData2.value.locales);
      return localePaths.length ? (
        // Check all the locales
        localePaths.every((key) => key !== config2.value.link)
      ) : (
        // Check root
        config2.value.link !== "/"
      );
    });
    const isActive = computed(() => {
      if (!isInternal.value) return false;
      if (config2.value.activeMatch) {
        return (config2.value.activeMatch instanceof RegExp ? config2.value.activeMatch : new RegExp(config2.value.activeMatch, "u")).test(route.path);
      }
      if (shouldBeActiveInSubpath.value) {
        return route.path.startsWith(config2.value.link);
      }
      return route.path === config2.value.link;
    });
    return () => {
      const { before, after, default: defaultSlot } = slots;
      const content = (defaultSlot == null ? void 0 : defaultSlot(config2.value)) ?? [
        before == null ? void 0 : before(config2.value),
        config2.value.text,
        after == null ? void 0 : after(config2.value)
      ];
      return isInternal.value ? h$1(
        RouteLink,
        {
          "class": "auto-link",
          "to": config2.value.link,
          "active": isActive.value,
          "aria-label": linkAriaLabel.value
        },
        () => content
      ) : h$1(
        "a",
        {
          "class": "auto-link external-link",
          "href": config2.value.link,
          "aria-label": linkAriaLabel.value,
          "rel": linkRel.value,
          "target": linkTarget.value
        },
        content
      );
    };
  }
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a, _b;
      return isMounted.value ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
    };
  }
});
var runContentUpdatedCallbacks = (reason) => {
  contentUpdatedCallbacks.value.forEach((fn) => fn(reason));
};
var Content = defineComponent({
  name: "Content",
  props: {
    path: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const pageComponent = usePageComponent();
    const ContentComponent = computed(() => {
      if (!props.path) return pageComponent.value;
      const route = resolveRoute(props.path);
      return defineAsyncComponent(
        async () => route.loader().then(({ comp }) => comp)
      );
    });
    const frontmatter = usePageFrontmatter();
    watch(
      frontmatter,
      () => {
        runContentUpdatedCallbacks("updated");
      },
      { deep: true, flush: "post" }
    );
    return () => h$1(ContentComponent.value, {
      onVnodeMounted: () => {
        runContentUpdatedCallbacks("mounted");
      },
      onVnodeUpdated: () => {
        runContentUpdatedCallbacks("updated");
      },
      onVnodeBeforeUnmount: () => {
        runContentUpdatedCallbacks("beforeUnmount");
      }
    });
  }
});
var LAYOUT_NAME_DEFAULT = "Layout";
var LANG_DEFAULT = "en-US";
var resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs2) => clientConfigs2.reduce(
    (prev, item) => ({
      ...prev,
      ...item.layouts
    }),
    {}
  ),
  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (pageHeadTitle, pageFrontmatter, siteLocaleDate) => {
    const description = isString(pageFrontmatter.description) ? pageFrontmatter.description : siteLocaleDate.description;
    const head = [
      ...Array.isArray(pageFrontmatter.head) ? pageFrontmatter.head : [],
      ...siteLocaleDate.head,
      ["title", {}, pageHeadTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (pageData, siteLocaleDate) => [pageData.title, siteLocaleDate.title].filter((item) => !!item).join(" | "),
  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (pageData, siteLocaleData) => pageData.lang || siteLocaleData.lang || LANG_DEFAULT,
  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (pageData, layouts) => {
    const layoutName = isString(pageData.frontmatter.layout) ? pageData.frontmatter.layout : LAYOUT_NAME_DEFAULT;
    if (!layouts[layoutName]) {
      throw new Error(`[vuepress] Cannot resolve layout: ${layoutName}`);
    }
    return layouts[layoutName];
  },
  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, decodeURI(routePath)),
  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: ({ base, locales: locales2, ...siteData2 }, routeLocale) => {
    var _a;
    return {
      ...siteData2,
      ...locales2[routeLocale],
      head: [
        // when merging head, the locales head should be placed before root head
        // to get higher priority
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- unsafe indexed access
        ...((_a = locales2[routeLocale]) == null ? void 0 : _a.head) ?? [],
        ...siteData2.head
      ]
    };
  }
});
var defineClientConfig = (clientConfig = {}) => clientConfig;
var withBase = (url) => {
  if (isLinkHttp(url)) return url;
  return `${"/"}${removeLeadingSlash(url)}`;
};
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var constants_exports = {};
__export(constants_exports, {
  COMPONENT_STATE_TYPE: () => COMPONENT_STATE_TYPE,
  INSPECTOR_ID: () => INSPECTOR_ID,
  INSPECTOR_LABEL: () => INSPECTOR_LABEL,
  INSPECTOR_NODES: () => INSPECTOR_NODES,
  INSPECTOR_STATE_SECTION_NAME: () => INSPECTOR_STATE_SECTION_NAME,
  PLUGIN_ID: () => PLUGIN_ID,
  PLUGIN_LABEL: () => PLUGIN_LABEL
});
var PLUGIN_ID = "org.vuejs.vuepress";
var PLUGIN_LABEL = "VuePress";
var COMPONENT_STATE_TYPE = PLUGIN_LABEL;
var INSPECTOR_ID = PLUGIN_ID;
var INSPECTOR_LABEL = PLUGIN_LABEL;
var INSPECTOR_NODE_INTERNAL = {
  id: "INTERNAL",
  label: "Internal",
  keys: ["layouts", "routes", "redirects"]
};
var INSPECTOR_NODE_SITE = {
  id: "SITE",
  label: "Site",
  keys: ["siteData", "siteLocaleData"]
};
var INSPECTOR_NODE_ROUTE = {
  id: "ROUTE",
  label: "Route",
  keys: ["routePath", "routeLocale"]
};
var INSPECTOR_NODE_PAGE = {
  id: "PAGE",
  label: "Page",
  keys: [
    "pageData",
    "pageFrontmatter",
    "pageLang",
    "pageHead",
    "pageHeadTitle",
    "pageLayout",
    "pageComponent"
  ]
};
var INSPECTOR_NODES = {
  [INSPECTOR_NODE_INTERNAL.id]: INSPECTOR_NODE_INTERNAL,
  [INSPECTOR_NODE_SITE.id]: INSPECTOR_NODE_SITE,
  [INSPECTOR_NODE_ROUTE.id]: INSPECTOR_NODE_ROUTE,
  [INSPECTOR_NODE_PAGE.id]: INSPECTOR_NODE_PAGE
};
var INSPECTOR_STATE_SECTION_NAME = "State";
const config$a = defineClientConfig({
  setup() {
  }
});
const clientConfig0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$a
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_HEADER_SELECTOR = [...new Array(6)].map((_, i2) => `[vp-content] h${i2 + 1}`).join(",");
const resolveHeaders = (headers, levels = 2) => {
  if (levels === false) {
    return [];
  }
  const [high, low] = typeof levels === "number" ? [levels, levels] : levels === "deep" ? [2, 6] : levels;
  const allowedHeaders = headers.filter((header) => header.level >= high && header.level <= low);
  const result = [];
  outer: for (let i2 = 0; i2 < allowedHeaders.length; i2++) {
    const current = allowedHeaders[i2];
    if (i2 === 0) {
      result.push(current);
    } else {
      for (let j = i2 - 1; j >= 0; j--) {
        const prev = allowedHeaders[j];
        if (prev.level < current.level) {
          prev.children.push(current);
          continue outer;
        }
      }
      result.push(current);
    }
  }
  return result;
};
const serializeHeader = (h2, ignore = []) => {
  let text;
  if (ignore.length) {
    const clone = h2.cloneNode(true);
    clone.querySelectorAll(ignore.join(",")).forEach((el) => {
      el.remove();
    });
    text = clone.textContent || "";
  } else {
    text = h2.textContent || "";
  }
  return text.trim();
};
const getHeadersFromDom = (selector = DEFAULT_HEADER_SELECTOR, ignore = []) => Array.from(document.querySelectorAll(selector)).filter((el) => el.id && el.hasChildNodes()).map((el) => ({
  element: el,
  title: serializeHeader(el, ignore),
  link: `#${el.id}`,
  slug: el.id,
  level: Number(el.tagName[1]),
  children: []
}));
const getHeaders = ({ selector = DEFAULT_HEADER_SELECTOR, levels = 2, ignore = [] } = {}) => resolveHeaders(getHeadersFromDom(selector, ignore), levels);
const hasGlobalComponent = (name, app) => {
  var _a;
  const globalComponents = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.components;
  if (!globalComponents)
    return false;
  return name in globalComponents || camelize(name) in globalComponents || capitalize(camelize(name)) in globalComponents;
};
const useLocaleConfig = (localesConfig) => {
  const routeLocale = useRouteLocale();
  return computed(() => toValue(localesConfig)[routeLocale.value] ?? {});
};
const useRoutePaths = () => {
  const routes2 = useRoutes();
  return computed(() => Object.keys(routes2.value));
};
const isDef = (val) => typeof val !== "undefined";
const startsWith = (str, prefix) => isString(str) && str.startsWith(prefix);
const { keys } = Object;
const isLinkAbsolute = (test) => startsWith(test, "/") && test[1] !== "/";
const isLinkRelative = (link) => !isLinkExternal(link) && !isLinkWithProtocol(link);
var define_BACK_TO_TOP_LOCALES_default = { "/": { backToTop: "返回顶部" } };
const BackToTop = defineComponent({
  name: "BackToTop",
  setup() {
    const pageFrontmatter = usePageFrontmatter();
    const locale = useLocaleConfig(define_BACK_TO_TOP_LOCALES_default);
    const body = shallowRef();
    const { height: bodyHeight } = useElementSize(body);
    const { height: windowHeight } = useWindowSize();
    const { y } = useWindowScroll();
    const show = computed(() => (pageFrontmatter.value.backToTop ?? true) && y.value > 100);
    const progress = computed(() => y.value / (bodyHeight.value - windowHeight.value) * 100);
    onMounted(() => {
      body.value = document.body;
    });
    return () => h$1(Transition, { name: "back-to-top" }, () => show.value ? h$1("button", {
      "type": "button",
      "class": "vp-back-to-top-button",
      "aria-label": locale.value.backToTop,
      "onClick": () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, [
      h$1("span", {
        "class": "vp-scroll-progress",
        "role": "progressbar",
        "aria-labelledby": "loadinglabel",
        "aria-valuenow": progress.value
      }, h$1("svg", h$1("circle", {
        "cx": "26",
        "cy": "26",
        "r": "24",
        "fill": "none",
        "stroke": "currentColor",
        "stroke-width": "4",
        "stroke-dasharray": `${Math.PI * progress.value * 0.48} ${Math.PI * (100 - progress.value) * 0.48}`
      }))),
      h$1("div", { class: "back-to-top-icon" })
    ]) : null);
  }
});
const config$9 = defineClientConfig({
  rootComponents: [BackToTop]
});
const clientConfig1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$9
}, Symbol.toStringTag, { value: "Module" }));
const config$8 = defineClientConfig({
  setup: () => {
  }
});
const clientConfig2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$8
}, Symbol.toStringTag, { value: "Module" }));
const config$7 = defineClientConfig({
  setup() {
    useEventListener("beforeprint", () => {
      document.querySelectorAll("details").forEach((detail) => {
        detail.open = true;
      });
    });
  }
});
const clientConfig3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$7
}, Symbol.toStringTag, { value: "Module" }));
var define_GIT_OPTIONS_default = { provider: "github", pattern: { commit: ":repo/commit/:hash", issue: ":repo/issues/:issue", tag: ":repo/releases/tag/:tag" }, repo: "" };
const gitOptions = typeof define_GIT_OPTIONS_default === "undefined" ? {} : define_GIT_OPTIONS_default;
const resolveRepoLink = (link, provider) => {
  if (!link || isLinkHttp(link))
    return link;
  if (provider === "github")
    return `https://github.com/${link}`;
  if (provider === "gitee")
    return `https://gitee.com/${link}`;
  return link;
};
const RE_ISSUE = /#(\d+)/g;
const useChangelog = (enabled = true) => {
  const frontmatter = usePageFrontmatter();
  const lang = usePageLang();
  const page = usePageData();
  const { pattern = {}, provider } = gitOptions;
  const repo = resolveRepoLink(gitOptions.repo, provider);
  return computed(() => {
    var _a;
    if (frontmatter.value.changelog === false || !toValue(enabled))
      return [];
    const formatter = new Intl.DateTimeFormat(lang.value, {
      dateStyle: "short"
    });
    return (((_a = page.value.git) == null ? void 0 : _a.changelog) ?? []).map((item) => {
      const res = {
        date: formatter.format(item.time),
        ...item
      };
      if (pattern.issue && repo) {
        res.message = res.message.replace(RE_ISSUE, (matched, issue) => {
          const url = pattern.issue.replace(":issue", issue).replace(":repo", repo);
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`;
        });
      }
      if (pattern.commit && repo) {
        res.commitUrl = pattern.commit.replace(":hash", res.hash).replace(":repo", repo);
      }
      if (pattern.tag && repo && res.tag)
        res.tagUrl = pattern.tag.replace(":tag", res.tag).replace(":repo", repo);
      return res;
    });
  });
};
const useContributors = (enabled = true) => {
  const frontmatter = usePageFrontmatter();
  const page = usePageData();
  return computed(() => {
    var _a;
    if (frontmatter.value.contributors === false || !toValue(enabled))
      return [];
    return ((_a = page.value.git) == null ? void 0 : _a.contributors) ?? [];
  });
};
var define_GIT_LOCALES_default = { "/": { contributors: "贡献者", changelog: "更新日志", timeOn: "于", viewChangelog: "查看所有更新日志", latestUpdateAt: "最近更新：" } };
const locales = typeof define_GIT_LOCALES_default === "undefined" ? {} : define_GIT_LOCALES_default;
const useGitLocaleConfig = () => useLocaleConfig(locales);
const useLastUpdated = (enabled = true) => {
  const lang = usePageLang();
  const locale = useGitLocaleConfig();
  const page = usePageData();
  return computed(() => {
    var _a, _b, _c;
    if (!toValue(enabled))
      return null;
    const timeStamp = (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ((_a = page.value.git) == null ? void 0 : _a.updatedTime) ?? ((_c = (_b = page.value.git) == null ? void 0 : _b.changelog) == null ? void 0 : _c[0].time)
    );
    if (!timeStamp)
      return null;
    const date = new Date(timeStamp);
    const text = new Intl.DateTimeFormat(lang.value, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(timeStamp);
    return {
      date,
      text,
      iso: date.toISOString(),
      locale: locale.value.latestUpdateAt
    };
  });
};
const VPHeader = ({ level = 2, text, anchor }) => h$1(`h${level || 2}`, { id: anchor, tabindex: "-1" }, h$1("a", { href: `#${anchor}`, class: "header-anchor" }, h$1("span", text)));
const GitContributor = ({ name, url, avatar }) => h$1(url ? "a" : "span", {
  href: url,
  target: "_blank",
  rel: "noreferrer",
  class: "vp-contributor"
}, [
  avatar ? h$1("img", { src: avatar, alt: "", class: "vp-contributor-avatar" }) : null,
  h$1("span", { class: "vp-contributor-name" }, name)
]);
const GitContributors = defineComponent({
  name: "GitContributors",
  props: {
    /** Contributor title */
    title: String,
    /** header level of contributor title */
    headerLevel: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const contributors = useContributors();
    const locale = useGitLocaleConfig();
    return () => contributors.value.length ? [
      h$1(VPHeader, {
        level: props.headerLevel,
        anchor: "doc-contributors",
        text: props.title || locale.value.contributors
      }),
      h$1("div", { class: "vp-contributors" }, contributors.value.map((item) => h$1(GitContributor, item)))
    ] : null;
  }
});
const GitChangelog = defineComponent({
  name: "GitChangelog",
  props: {
    /** Title of changelog */
    title: String,
    /** header level of changelog */
    headerLevel: {
      type: Number,
      default: 2
    }
  },
  setup(props) {
    const changelog = useChangelog();
    const locale = useGitLocaleConfig();
    const lastUpdated = useLastUpdated();
    const [active, toggleActive] = useToggle();
    const ChangelogHeader = () => h$1("div", { class: "vp-changelog-header", onClick: () => toggleActive() }, [
      h$1("div", { class: "vp-latest-updated" }, [
        h$1("span", { class: "vp-changelog-icon" }),
        h$1("span", { "data-allow-mismatch": "" }, lastUpdated.value.text)
      ]),
      h$1("div", [
        h$1("span", { class: "vp-changelog-menu-icon" }),
        h$1("span", locale.value.viewChangelog)
      ])
    ]);
    const ReleaseTag = ({ item }) => h$1("li", { class: "vp-changelog-item-tag" }, h$1("div", [
      h$1("a", { class: "vp-changelog-tag" }, h$1("code", item.tag)),
      h$1("span", { "class": "vp-changelog-date", "data-allow-mismatch": "" }, [
        locale.value.timeOn,
        " ",
        h$1("time", { datetime: new Date(item.time).toISOString() }, item.date)
      ])
    ]));
    const Commit = ({ item }) => h$1("li", { class: "vp-changelog-item-commit" }, [
      h$1(item.commitUrl ? "a" : "span", {
        class: "vp-changelog-hash",
        href: item.commitUrl,
        target: "_blank",
        rel: "noreferrer"
      }, [h$1("code", item.hash.slice(0, 5))]),
      h$1("span", { class: "vp-changelog-divider" }, "-"),
      h$1("span", { class: "vp-changelog-message", innerHTML: item.message }),
      h$1("span", { "class": "vp-changelog-date", "data-allow-mismatch": "" }, [
        locale.value.timeOn || "on",
        " ",
        h$1("time", { datetime: new Date(item.time).toISOString() }, item.date)
      ])
    ]);
    return () => changelog.value.length ? [
      h$1(VPHeader, {
        level: props.headerLevel,
        anchor: "doc-changelog",
        text: props.title || locale.value.changelog
      }),
      h$1("div", { class: ["vp-changelog-wrapper", { active: active.value }] }, [
        h$1(ChangelogHeader),
        h$1("ul", { class: "vp-changelog-list" }, [
          changelog.value.map((item) => item.tag ? h$1(ReleaseTag, { item, key: item.tag }) : h$1(Commit, { item, key: item.hash }))
        ])
      ])
    ] : null;
  }
});
const config$6 = {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  }
};
const clientConfig4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$6
}, Symbol.toStringTag, { value: "Module" }));
const useMediumZoom = () => {
  return null;
};
const config$5 = defineClientConfig({
  enhance({ app }) {
    return;
  },
  setup() {
    const zoom = useMediumZoom();
    onContentUpdated((reason) => {
      if (reason !== "beforeUnmount")
        zoom.refresh();
    });
  }
});
const clientConfig5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$5
}, Symbol.toStringTag, { value: "Module" }));
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const addClass = (element, name) => {
  element.classList.add(name);
};
const removeClass = (element, name) => {
  element.classList.remove(name);
};
const removeElement = (element) => {
  var _a;
  (_a = element == null ? void 0 : element.parentNode) == null ? void 0 : _a.removeChild(element);
};
const clamp = (n2, min, max) => {
  if (n2 < min)
    return min;
  if (n2 > max)
    return max;
  return n2;
};
const toBarPercent = (n2) => (-1 + n2) * 100;
const queue = /* @__PURE__ */ (() => {
  const pending = [];
  const nextStep = () => {
    const fn = pending.shift();
    if (fn) {
      fn(nextStep);
    }
  };
  return (fn) => {
    pending.push(fn);
    if (pending.length === 1)
      nextStep();
  };
})();
const camelCase = (content) => content.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, (_, letter) => letter.toUpperCase());
const addStyle = /* @__PURE__ */ (() => {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  const getVendorProp = (name) => {
    const { style } = document.body;
    if (name in style)
      return name;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let index = cssPrefixes.length;
    while (index--) {
      const vendorName = `${cssPrefixes[index]}${capName}`;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  };
  const getStyleProp = (name) => {
    const finalizedName = camelCase(name);
    return cssProps[finalizedName] ?? (cssProps[finalizedName] = getVendorProp(finalizedName));
  };
  const applyCss = (element, prop, value) => {
    element.style[getStyleProp(prop)] = value;
  };
  return (element, properties) => {
    for (const prop in properties) {
      const value = properties[prop];
      if (Object.hasOwn(properties, prop) && isDef(value))
        applyCss(element, prop, value);
    }
  };
})();
const SETTINGS = {
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickleRate: 0.02,
  trickleSpeed: 800,
  barSelector: '[role="bar"]',
  parent: "body",
  template: '<div class="bar" role="bar"></div>'
};
const nprogress = {
  percent: null,
  isRendered: () => Boolean(document.getElementById("nprogress")),
  set: (progress) => {
    const { speed, easing } = SETTINGS;
    const inProgress = nprogress.isStarted();
    const newPercent = clamp(progress, SETTINGS.minimum, 1);
    nprogress.percent = newPercent === 1 ? null : newPercent;
    const nprogressElement = nprogress.render(!inProgress);
    const barElement = nprogressElement.querySelector(SETTINGS.barSelector);
    nprogressElement.offsetWidth;
    queue((next) => {
      addStyle(barElement, {
        transform: `translate3d(${toBarPercent(newPercent)}%,0,0)`,
        transition: `all ${speed}ms ${easing}`
      });
      if (newPercent === 1) {
        addStyle(nprogressElement, {
          transition: "none",
          opacity: "1"
        });
        nprogressElement.offsetWidth;
        setTimeout(() => {
          addStyle(nprogressElement, {
            transition: `all ${speed}ms linear`,
            opacity: "0"
          });
          setTimeout(() => {
            nprogress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => {
          next();
        }, speed);
      }
    });
    return nprogress;
  },
  isStarted: () => typeof nprogress.percent === "number",
  start: () => {
    if (!nprogress.percent)
      nprogress.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress.percent)
          return;
        nprogress.trickle();
        work();
      }, SETTINGS.trickleSpeed);
    };
    work();
    return nprogress;
  },
  done: (force) => {
    if (!force && !nprogress.percent)
      return nprogress;
    return nprogress.increase(0.3 + 0.5 * Math.random()).set(1);
  },
  increase: (amount) => {
    let { percent } = nprogress;
    if (!percent) {
      return nprogress.start();
    }
    percent = clamp(percent + (typeof amount === "number" ? amount : (1 - percent) * clamp(Math.random() * percent, 0.1, 0.95)), 0, 0.994);
    return nprogress.set(percent);
  },
  trickle: () => nprogress.increase(Math.random() * SETTINGS.trickleRate),
  render: (fromStart) => {
    if (nprogress.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const nprogressElement = document.createElement("div");
    nprogressElement.id = "nprogress";
    nprogressElement.innerHTML = SETTINGS.template;
    const barElement = nprogressElement.querySelector(SETTINGS.barSelector);
    const parentElement = document.querySelector(SETTINGS.parent);
    const percent = fromStart ? "-100" : toBarPercent(nprogress.percent ?? 0);
    addStyle(barElement, {
      transition: "all 0 linear",
      transform: `translate3d(${percent}%,0,0)`
    });
    if (parentElement) {
      if (parentElement !== document.body) {
        addClass(parentElement, "nprogress-custom-parent");
      }
      parentElement.appendChild(nprogressElement);
    }
    return nprogressElement;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(SETTINGS.parent), "nprogress-custom-parent");
    removeElement(document.getElementById("nprogress"));
  }
};
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress.done();
    });
  });
};
const config$4 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const clientConfig6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$4
}, Symbol.toStringTag, { value: "Module" }));
const setupCollapsedLines = ({ selector = 'div[class*="language-"].has-collapsed-lines > .collapsed-lines' } = {}) => {
  useEventListener("click", (e) => {
    const target = e.target;
    if (target.matches(selector)) {
      const parent = target.parentElement;
      if (parent == null ? void 0 : parent.classList.toggle("collapsed")) {
        parent.scrollIntoView({ block: "center", behavior: "instant" });
      }
    }
  });
};
const config$3 = {
  setup() {
    setupCollapsedLines();
  }
};
const clientConfig7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$3
}, Symbol.toStringTag, { value: "Module" }));
const A = "VUEPRESS_CODE_TAB_STORE", i = useStorage(A, {}), S = defineComponent({ name: "CodeTabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: String }, slots: Object, setup(a, { slots: r }) {
  const l = ref(a.active), o = shallowRef([]), n2 = () => {
    a.tabId && (i.value[a.tabId] = a.data[l.value].id);
  }, s = (e = l.value) => {
    l.value = e < o.value.length - 1 ? e + 1 : 0, o.value[l.value].focus();
  }, c = (e = l.value) => {
    l.value = e > 0 ? e - 1 : o.value.length - 1, o.value[l.value].focus();
  }, b = (e, t) => {
    e.key === " " || e.key === "Enter" ? (e.preventDefault(), l.value = t) : e.key === "ArrowRight" ? (e.preventDefault(), s()) : e.key === "ArrowLeft" && (e.preventDefault(), c()), a.tabId && (i.value[a.tabId] = a.data[l.value].id);
  }, p = () => {
    if (a.tabId) {
      const e = a.data.findIndex(({ id: t }) => i.value[a.tabId] === t);
      if (e !== -1) return e;
    }
    return a.active;
  };
  return onMounted(() => {
    l.value = p(), watch(() => a.tabId && i.value[a.tabId], (e, t) => {
      if (a.tabId && e !== t) {
        const d = a.data.findIndex(({ id: v }) => v === e);
        d !== -1 && (l.value = d);
      }
    });
  }), () => a.data.length ? h$1("div", { class: "vp-code-tabs" }, [h$1("div", { class: "vp-code-tabs-nav", role: "tablist" }, a.data.map(({ id: e }, t) => {
    const d = t === l.value;
    return h$1("button", { type: "button", ref: (v) => {
      v && (o.value[t] = v);
    }, class: ["vp-code-tab-nav", { active: d }], role: "tab", "aria-controls": `codetab-${a.id}-${t}`, "aria-selected": d, onClick: () => {
      l.value = t, n2();
    }, onKeydown: (v) => {
      b(v, t);
    } }, r[`title${t}`]({ value: e, isActive: d }));
  })), a.data.map(({ id: e }, t) => {
    const d = t === l.value;
    return h$1("div", { class: ["vp-code-tab", { active: d }], id: `codetab-${a.id}-${t}`, role: "tabpanel", "aria-expanded": d }, [h$1("div", { class: "vp-code-tab-title" }, r[`title${t}`]({ value: e, isActive: d })), r[`tab${t}`]({ value: e, isActive: d })]);
  })]) : null;
} });
const h = "VUEPRESS_TAB_STORE", n = useStorage(h, {}), $$1 = defineComponent({ name: "Tabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: String }, slots: Object, setup(a, { slots: d }) {
  const l = ref(a.active), v = shallowRef([]), s = () => {
    a.tabId && (n.value[a.tabId] = a.data[l.value].id);
  }, o = (t = l.value) => {
    l.value = t < v.value.length - 1 ? t + 1 : 0, v.value[l.value].focus();
  }, c = (t = l.value) => {
    l.value = t > 0 ? t - 1 : v.value.length - 1, v.value[l.value].focus();
  }, b = (t, e) => {
    t.key === " " || t.key === "Enter" ? (t.preventDefault(), l.value = e) : t.key === "ArrowRight" ? (t.preventDefault(), o()) : t.key === "ArrowLeft" && (t.preventDefault(), c()), s();
  }, p = () => {
    if (a.tabId) {
      const t = a.data.findIndex(({ id: e }) => n.value[a.tabId] === e);
      if (t !== -1) return t;
    }
    return a.active;
  };
  return onMounted(() => {
    l.value = p(), watch(() => a.tabId && n.value[a.tabId], (t, e) => {
      if (a.tabId && t !== e) {
        const i2 = a.data.findIndex(({ id: r }) => r === t);
        i2 !== -1 && (l.value = i2);
      }
    });
  }), () => a.data.length ? h$1("div", { class: "vp-tabs" }, [h$1("div", { class: "vp-tabs-nav", role: "tablist" }, a.data.map(({ id: t }, e) => {
    const i2 = e === l.value;
    return h$1("button", { type: "button", ref: (r) => {
      r && (v.value[e] = r);
    }, class: ["vp-tab-nav", { active: i2 }], role: "tab", "aria-controls": `tab-${a.id}-${e}`, "aria-selected": i2, onClick: () => {
      l.value = e, s();
    }, onKeydown: (r) => {
      b(r, e);
    } }, d[`title${e}`]({ value: t, isActive: i2 }));
  })), a.data.map(({ id: t }, e) => {
    const i2 = e === l.value;
    return h$1("div", { class: ["vp-tab", { active: i2 }], id: `tab-${a.id}-${e}`, role: "tabpanel", "aria-expanded": i2 }, [h$1("div", { class: "vp-tab-title" }, d[`title${e}`]({ value: t, isActive: i2 })), d[`tab${e}`]({ value: t, isActive: i2 })]);
  })]) : null;
} });
const config$2 = {
  enhance: ({ app }) => {
    app.component("CodeTabs", S);
    app.component("Tabs", $$1);
  }
};
const clientConfig8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$2
}, Symbol.toStringTag, { value: "Module" }));
const themeData$1 = JSON.parse(`{"locales":{"/":{"selectLanguageName":"English"}},"colorMode":"auto","colorModeSwitch":true,"navbar":[],"logo":null,"repo":null,"selectLanguageText":"Languages","selectLanguageAriaLabel":"Select language","sidebar":"heading","sidebarDepth":2,"editLink":true,"editLinkText":"Edit this page","lastUpdated":true,"contributors":true,"contributorsText":"Contributors","notFound":["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."],"backToHome":"Take me home","openInNewWindow":"open in new window","toggleColorMode":"toggle color mode","toggleSidebar":"toggle sidebar"}`);
const themeData = ref(themeData$1);
const useThemeData = () => themeData;
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  const { locales: locales2, ...baseOptions } = theme;
  return {
    ...baseOptions,
    ...locales2 == null ? void 0 : locales2[routeLocale]
  };
};
const config$1 = defineClientConfig({
  enhance({ app }) {
    const themeData2 = useThemeData();
    const clientData = app._context.provides[clientDataSymbol];
    const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, clientData.routeLocale.value));
    app.provide(themeLocaleDataSymbol, themeLocaleData);
    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData2.value;
        }
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value;
        }
      }
    });
  }
});
const clientConfig9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$1
}, Symbol.toStringTag, { value: "Module" }));
const useData = () => {
  const { pageData, pageFrontmatter, pageLang, siteData: siteData2, siteLocaleData, ...rest } = useClientData();
  return {
    ...rest,
    page: pageData,
    frontmatter: pageFrontmatter,
    lang: pageLang,
    site: siteData2,
    siteLocale: siteLocaleData,
    theme: useThemeData(),
    themeLocale: useThemeLocaleData()
  };
};
const darkModeSymbol = Symbol("");
const applyDarkModeToHTML = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const el = window.document.documentElement;
    el.dataset.theme = value ? "dark" : "light";
  };
  onMounted(() => {
    watchImmediate(isDarkMode, update);
  });
  onUnmounted(() => {
    update();
  });
};
const useDarkMode = () => {
  const isDarkMode = inject(darkModeSymbol);
  if (!isDarkMode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return isDarkMode;
};
const setupDarkMode = () => {
  const { themeLocale } = useData();
  const isDarkPreferred = usePreferredDark();
  const darkStorage = useStorage("vuepress-color-scheme", themeLocale.value.colorMode);
  const isDarkMode = computed({
    get() {
      if (!themeLocale.value.colorModeSwitch) {
        return themeLocale.value.colorMode === "dark";
      }
      if (darkStorage.value === "auto") {
        return isDarkPreferred.value;
      }
      return darkStorage.value === "dark";
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = "auto";
      } else {
        darkStorage.value = val ? "dark" : "light";
      }
    }
  });
  provide(darkModeSymbol, isDarkMode);
  applyDarkModeToHTML(isDarkMode);
};
const headersSymbol = Symbol("headers");
const useHeaders = () => {
  const headers = injectLocal(headersSymbol);
  if (!headers) {
    throw new Error("useHeaders() is called without provider.");
  }
  return headers;
};
const setupHeaders = () => {
  const { frontmatter, themeLocale } = useData();
  const headersRef = ref([]);
  const levels = computed(() => frontmatter.value.sidebarDepth ?? themeLocale.value.sidebarDepth ?? 2);
  const updateHeaders = () => {
    if (levels.value <= 0) {
      headersRef.value = [];
      return;
    }
    headersRef.value = getHeaders({
      levels: [2, levels.value + 1],
      ignore: [".vp-badge"]
    });
  };
  provideLocal(headersSymbol, headersRef);
  onContentUpdated((reason) => {
    if (reason === "beforeUnmount")
      headersRef.value = [];
    else
      updateHeaders();
  });
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => {
      promiseResolve = resolve;
    });
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const resolveAutoLink = (config2, currentPath) => {
  const { notFound, meta, path } = resolveRoute(config2, currentPath);
  return notFound ? { text: path, link: path } : {
    text: meta.title || path,
    link: path
  };
};
const resolvePrefix = (prefix = "", path = "") => isLinkAbsolute(path) || isLinkWithProtocol(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
const resolveSidebarPageHeader = (header) => ({
  text: header.title,
  link: header.link,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  children: resolveSidebarPageHeaders(header.children)
});
const resolveSidebarPageHeaders = (headers) => headers ? headers.map((header) => resolveSidebarPageHeader(header)) : [];
const resolveSidebarHeadingItem = (page, headers) => [
  {
    text: page.title,
    children: resolveSidebarPageHeaders(headers)
  }
];
const resolveArraySidebarItems = (sidebarConfig, headers, path, prefix = "") => {
  const handleChildItem = (item, pathPrefix) => {
    var _a;
    const childItem = isString(item) ? resolveAutoLink(resolvePrefix(pathPrefix, item)) : isString(item.link) ? {
      ...item,
      link: isLinkRelative(item.link) ? resolveAutoLink(resolvePrefix(pathPrefix, item.link)).link : item.link
    } : item;
    if ("children" in childItem) {
      return {
        ...childItem,
        children: childItem.children.map((child) => handleChildItem(child, resolvePrefix(pathPrefix, childItem.prefix)))
      };
    }
    if (childItem.link === path) {
      const currentHeaders = ((_a = headers[0]) == null ? void 0 : _a.level) === 1 ? headers[0].children : headers;
      return {
        ...childItem,
        children: resolveSidebarPageHeaders(currentHeaders)
      };
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item, prefix));
};
const resolveMultiSidebarItems = (sidebarConfig, page, headers, path) => {
  const sidebarRoutes = keys(sidebarConfig).sort((x, y) => y.length - x.length);
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(path), base)) {
      const matched = sidebarConfig[base];
      return matched ? matched === "heading" ? resolveSidebarHeadingItem(page, headers) : resolveArraySidebarItems(matched, headers, path, base) : [];
    }
  console.warn(`${decodeURI(path)} is missing sidebar config.`);
  return [];
};
const sidebarItemsSymbol = Symbol("sidebarItems");
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const resolveSidebarItems = (sidebarConfig, page, path, routeLocale, headers) => {
  if (sidebarConfig === false) {
    return [];
  }
  if (sidebarConfig === "heading") {
    return resolveSidebarHeadingItem(page, headers);
  }
  if (Array.isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, headers, path, routeLocale);
  }
  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, page, headers, path);
  }
  return [];
};
const setupSidebarItems = () => {
  const { frontmatter, page, routeLocale, themeLocale } = useData();
  const headers = useHeaders();
  const routePath = useRoutePath();
  const sidebarConfig = computed(() => frontmatter.value.home ? false : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "heading");
  const sidebarItems = computed(() => resolveSidebarItems(sidebarConfig.value, page.value, routePath.value, routeLocale.value, headers.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    type: { default: "tip" },
    text: { default: "" },
    vertical: { default: void 0 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["vp-badge", _ctx.type],
        style: {
          verticalAlign: _ctx.vertical
        }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(_ctx.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/global/Badge.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPFadeSlideYTransition",
  __ssrInlineRender: true,
  emits: ["beforeEnter", "beforeLeave"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPFadeSlideYTransition.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter } = useData();
    const features = computed(() => frontmatter.value.features ?? []);
    return (_ctx, _push, _parent, _attrs) => {
      if (features.value.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "vp-features" }, _attrs))}><!--[-->`);
        ssrRenderList(features.value, (feature) => {
          _push(`<div class="vp-feature"><h2>${ssrInterpolate(feature.title)}</h2><p>${ssrInterpolate(feature.details)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPHomeFeatures.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const footer = computed(() => frontmatter.value.footer);
    const footerHtml = computed(() => frontmatter.value.footerHtml);
    return (_ctx, _push, _parent, _attrs) => {
      if (footer.value) {
        _push(`<!--[-->`);
        if (footerHtml.value) {
          _push(`<div class="vp-footer" vp-footer>${footer.value ?? ""}</div>`);
        } else {
          _push(`<div class="vp-footer" vp-footer>${ssrInterpolate(footer.value)}</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPHomeFooter.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPAutoLink",
  __ssrInlineRender: true,
  props: {
    config: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AutoLink), mergeProps({ config: _ctx.config }, _attrs), createSlots({
        before: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "before", _ctx.config, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "before", _ctx.config)
            ];
          }
        }),
        after: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "after", _ctx.config, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "after", _ctx.config)
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", _ctx.config, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", _ctx.config)
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPAutoLink.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, siteLocale } = useData();
    const isDarkMode = useDarkMode();
    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) {
        return null;
      }
      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });
    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) {
        return null;
      }
      return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
    });
    const heroImage = computed(() => {
      if (isDarkMode.value && frontmatter.value.heroImageDark !== void 0) {
        return frontmatter.value.heroImageDark;
      }
      return frontmatter.value.heroImage;
    });
    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );
    const heroHeight = computed(() => frontmatter.value.heroHeight ?? 280);
    const actions = computed(() => {
      if (!Array.isArray(frontmatter.value.actions)) {
        return [];
      }
      return frontmatter.value.actions.map(({ type = "primary", ...rest }) => ({
        type,
        ...rest
      }));
    });
    const HomeHeroImage = () => {
      if (!heroImage.value) return null;
      const img = h$1("img", {
        class: "vp-hero-image",
        src: withBase(heroImage.value),
        alt: heroAlt.value,
        height: heroHeight.value
      });
      if (frontmatter.value.heroImageDark === void 0) {
        return img;
      }
      return h$1(ClientOnly, () => img);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "vp-hero" }, _attrs))}>`);
      _push(ssrRenderComponent(HomeHeroImage, null, null, _parent));
      if (heroText.value) {
        _push(`<h1 id="main-title">${ssrInterpolate(heroText.value)}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (tagline.value) {
        _push(`<p class="vp-hero-description">${ssrInterpolate(tagline.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (actions.value.length) {
        _push(`<p class="vp-hero-actions"><!--[-->`);
        ssrRenderList(actions.value, (action) => {
          _push(ssrRenderComponent(_sfc_main$k, {
            key: action.text,
            class: ["vp-hero-action-button", [action.type]],
            config: action
          }, null, _parent));
        });
        _push(`<!--]--></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPHomeHero.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "vp-home" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$j, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$m, null, null, _parent));
      _push(`<div vp-content>`);
      _push(ssrRenderComponent(unref(Content), null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$l, null, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPHome.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPNavbarBrand",
  __ssrInlineRender: true,
  setup(__props) {
    const { routeLocale, siteLocale, themeLocale } = useData();
    const isDarkMode = useDarkMode();
    const navbarBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );
    const navbarBrandTitle = computed(() => siteLocale.value.title);
    const navbarBrandLogo = computed(() => {
      if (isDarkMode.value && themeLocale.value.logoDark !== void 0) {
        return themeLocale.value.logoDark;
      }
      return themeLocale.value.logo;
    });
    const navbarBrandLogoAlt = computed(
      () => themeLocale.value.logoAlt ?? navbarBrandTitle.value
    );
    const navBarLogoAltMatchesTitle = computed(
      () => navbarBrandTitle.value.toLocaleUpperCase().trim() === navbarBrandLogoAlt.value.toLocaleUpperCase().trim()
    );
    const NavbarBrandLogo = () => {
      if (!navbarBrandLogo.value) return null;
      const img = h$1("img", {
        class: "vp-site-logo",
        src: withBase(navbarBrandLogo.value),
        alt: navbarBrandLogoAlt.value
      });
      if (themeLocale.value.logoDark === void 0) {
        return img;
      }
      return h$1(ClientOnly, () => img);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RouteLink), mergeProps({ to: navbarBrandLink.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(NavbarBrandLogo, null, null, _parent2, _scopeId));
            if (navbarBrandTitle.value) {
              _push2(`<span class="${ssrRenderClass([{ "vp-hide-mobile": navbarBrandLogo.value }, "vp-site-name"])}"${ssrRenderAttr("aria-hidden", navBarLogoAltMatchesTitle.value)}${_scopeId}>${ssrInterpolate(navbarBrandTitle.value)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(NavbarBrandLogo),
              navbarBrandTitle.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: ["vp-site-name", { "vp-hide-mobile": navbarBrandLogo.value }],
                "aria-hidden": navBarLogoAltMatchesTitle.value
              }, toDisplayString(navbarBrandTitle.value), 11, ["aria-hidden"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPNavbarBrand.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPDropdownTransition",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPDropdownTransition.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "VPNavbarDropdown",
  __ssrInlineRender: true,
  props: {
    config: {}
  },
  setup(__props) {
    const props = __props;
    const { config: config2 } = toRefs(props);
    const [open, toggleOpen] = useToggle();
    const dropdownAriaLabel = computed(
      () => config2.value.ariaLabel || config2.value.text
    );
    const isLastItemOfArray = (arrayItem, array) => array[array.length - 1] === arrayItem;
    onContentUpdated(() => {
      toggleOpen(false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["vp-navbar-dropdown-wrapper", { open: unref(open) }]
      }, _attrs))}><button class="vp-navbar-dropdown-title" type="button"${ssrRenderAttr("aria-label", dropdownAriaLabel.value)}><span class="title">${ssrInterpolate(unref(config2).text)}</span><span class="arrow down"></span></button><button class="vp-navbar-dropdown-title-mobile" type="button"${ssrRenderAttr("aria-label", dropdownAriaLabel.value)}><span class="title">${ssrInterpolate(unref(config2).text)}</span><span class="${ssrRenderClass([unref(open) ? "down" : "right", "arrow"])}"></span></button>`);
      _push(ssrRenderComponent(_sfc_main$g, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="vp-navbar-dropdown"${_scopeId}><!--[-->`);
            ssrRenderList(unref(config2).children, (child) => {
              _push2(`<li class="vp-navbar-dropdown-item"${_scopeId}>`);
              if ("children" in child) {
                _push2(`<!--[--><h4 class="vp-navbar-dropdown-subtitle"${_scopeId}>`);
                if (child.link) {
                  _push2(ssrRenderComponent(_sfc_main$k, {
                    config: child,
                    onFocusout: () => {
                      if (isLastItemOfArray(child, unref(config2).children) && child.children.length === 0) {
                        open.value = false;
                      }
                    }
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(child.text)}</span>`);
                }
                _push2(`</h4><ul class="vp-navbar-dropdown-subitem-wrapper"${_scopeId}><!--[-->`);
                ssrRenderList(child.children, (grandchild) => {
                  _push2(`<li class="vp-navbar-dropdown-subitem"${_scopeId}>`);
                  _push2(ssrRenderComponent(_sfc_main$k, {
                    config: grandchild,
                    onFocusout: () => {
                      if (isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, unref(config2).children)) {
                        unref(toggleOpen)(false);
                      }
                    }
                  }, null, _parent2, _scopeId));
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul><!--]-->`);
              } else {
                _push2(ssrRenderComponent(_sfc_main$k, {
                  config: child,
                  onFocusout: () => {
                    if (isLastItemOfArray(child, unref(config2).children)) {
                      unref(toggleOpen)(false);
                    }
                  }
                }, null, _parent2, _scopeId));
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              withDirectives(createVNode("ul", { class: "vp-navbar-dropdown" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(config2).children, (child) => {
                  return openBlock(), createBlock("li", {
                    key: child.text,
                    class: "vp-navbar-dropdown-item"
                  }, [
                    "children" in child ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("h4", { class: "vp-navbar-dropdown-subtitle" }, [
                        child.link ? (openBlock(), createBlock(_sfc_main$k, {
                          key: 0,
                          config: child,
                          onFocusout: () => {
                            if (isLastItemOfArray(child, unref(config2).children) && child.children.length === 0) {
                              open.value = false;
                            }
                          }
                        }, null, 8, ["config", "onFocusout"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(child.text), 1))
                      ]),
                      createVNode("ul", { class: "vp-navbar-dropdown-subitem-wrapper" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(child.children, (grandchild) => {
                          return openBlock(), createBlock("li", {
                            key: grandchild.link,
                            class: "vp-navbar-dropdown-subitem"
                          }, [
                            createVNode(_sfc_main$k, {
                              config: grandchild,
                              onFocusout: () => {
                                if (isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, unref(config2).children)) {
                                  unref(toggleOpen)(false);
                                }
                              }
                            }, null, 8, ["config", "onFocusout"])
                          ]);
                        }), 128))
                      ])
                    ], 64)) : (openBlock(), createBlock(_sfc_main$k, {
                      key: 1,
                      config: child,
                      onFocusout: () => {
                        if (isLastItemOfArray(child, unref(config2).children)) {
                          unref(toggleOpen)(false);
                        }
                      }
                    }, null, 8, ["config", "onFocusout"]))
                  ]);
                }), 128))
              ], 512), [
                [vShow, unref(open)]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPNavbarDropdown.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const resolveNavbarItem = (item, prefix = "") => {
  if (isString(item)) {
    return resolveAutoLink(resolvePrefix(prefix, item));
  }
  if ("children" in item) {
    return {
      ...item,
      children: item.children.map((child) => resolveNavbarItem(child, resolvePrefix(prefix, item.prefix)))
    };
  }
  return {
    ...item,
    link: isLinkRelative(item.link) ? resolveAutoLink(resolvePrefix(prefix, item.link)).link : item.link
  };
};
const useNavbarConfig = () => {
  const { themeLocale } = useData();
  return computed(() => (
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    (themeLocale.value.navbar || []).map((item) => resolveNavbarItem(item))
  ));
};
const resolveRepoType = (repo) => {
  if (!isLinkHttp(repo) || repo.includes("github.com"))
    return "GitHub";
  if (repo.includes("bitbucket.org"))
    return "Bitbucket";
  if (repo.includes("gitlab.com"))
    return "GitLab";
  if (repo.includes("gitee.com"))
    return "Gitee";
  return null;
};
const useNavbarRepo = () => {
  const { themeLocale } = useData();
  const repo = computed(() => themeLocale.value.repo);
  const repoType = computed(() => repo.value ? resolveRepoType(repo.value) : null);
  const repoLink = computed(() => {
    if (repo.value && !isLinkHttp(repo.value)) {
      return `https://github.com/${repo.value}`;
    }
    return repo.value;
  });
  const repoLabel = computed(() => {
    if (!repoLink.value)
      return null;
    if (themeLocale.value.repoLabel)
      return themeLocale.value.repoLabel;
    if (repoType.value === null)
      return "Source";
    return repoType.value;
  });
  return computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return [];
    }
    return [
      {
        text: repoLabel.value,
        link: repoLink.value
      }
    ];
  });
};
const useNavbarSelectLanguage = () => {
  const route = useRoute();
  const routePaths = useRoutePaths();
  const { routeLocale, site, siteLocale, theme, themeLocale } = useData();
  return computed(() => {
    const localePaths = Object.keys(site.value.locales);
    if (localePaths.length < 2) {
      return [];
    }
    const currentPath = route.path;
    const currentFullPath = route.fullPath;
    const languageDropdown = {
      text: `${themeLocale.value.selectLanguageText}`,
      ariaLabel: `${themeLocale.value.selectLanguageAriaLabel ?? themeLocale.value.selectLanguageText}`,
      children: localePaths.map((targetLocalePath) => {
        var _a, _b;
        const targetSiteLocale = ((_a = site.value.locales) == null ? void 0 : _a[targetLocalePath]) ?? {};
        const targetThemeLocale = ((_b = theme.value.locales) == null ? void 0 : _b[targetLocalePath]) ?? {};
        const targetLang = `${targetSiteLocale.lang}`;
        const text = targetThemeLocale.selectLanguageName ?? targetLang;
        if (targetLang === siteLocale.value.lang) {
          return {
            text,
            activeMatch: ".",
            link: route.fullPath
          };
        }
        const targetLocalePage = currentPath.replace(routeLocale.value, targetLocalePath);
        return {
          text,
          // try to keep current hash and params across languages
          link: routePaths.value.some((item) => item === targetLocalePage) ? currentFullPath.replace(currentPath, targetLocalePage) : targetThemeLocale.home ?? targetLocalePath
        };
      })
    };
    return [languageDropdown];
  });
};
const mobile = "719px";
const cssVariables = {
  mobile
};
var DeviceType;
(function(DeviceType2) {
  DeviceType2["Mobile"] = "mobile";
})(DeviceType || (DeviceType = {}));
const DeviceTypeMap = {
  [DeviceType.Mobile]: Number.parseInt(cssVariables.mobile.replace("px", ""), 10)
};
const useUpdateDeviceStatus = (deviceType, callback) => {
  const width = DeviceTypeMap[deviceType];
  if (!Number.isInteger(width)) {
    return;
  }
  useEventListener("orientationchange", () => {
    callback(width);
  }, false);
  useEventListener("resize", () => {
    callback(width);
  }, false);
  onMounted(() => {
    callback(width);
  });
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "VPNavbarItems",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeLocale } = useData();
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();
    const isMobile = ref(false);
    const navbarLabel = computed(() => {
      return themeLocale.value.navbarLabel ?? "site navigation";
    });
    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value
    ]);
    useUpdateDeviceStatus(
      DeviceType.Mobile,
      (mobileDesktopBreakpoint) => {
        isMobile.value = window.innerWidth < mobileDesktopBreakpoint;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (navbarLinks.value.length) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: "vp-navbar-items",
          "aria-label": navbarLabel.value
        }, _attrs))}><!--[-->`);
        ssrRenderList(navbarLinks.value, (item) => {
          _push(`<div class="vp-navbar-item">`);
          if ("children" in item) {
            _push(ssrRenderComponent(_sfc_main$f, {
              class: { mobile: isMobile.value },
              config: item
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_sfc_main$k, { config: item }, null, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPNavbarItems.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$d = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "dark-icon",
    viewBox: "0 0 32 32"
  }, _attrs))}><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path></svg>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPDarkIcon.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const VPDarkIcon = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$c = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "light-icon",
    viewBox: "0 0 32 32"
  }, _attrs))}><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPLightIcon.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const VPLightIcon = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "VPToggleColorModeButton",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeLocale } = useData();
    const isDarkMode = useDarkMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: "vp-toggle-color-mode-button",
        title: unref(themeLocale).toggleColorMode
      }, _attrs))}>`);
      _push(ssrRenderComponent(VPLightIcon, {
        style: !unref(isDarkMode) ? null : { display: "none" }
      }, null, _parent));
      _push(ssrRenderComponent(VPDarkIcon, {
        style: unref(isDarkMode) ? null : { display: "none" }
      }, null, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPToggleColorModeButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPToggleSidebarButton",
  __ssrInlineRender: true,
  emits: ["toggle"],
  setup(__props) {
    const { themeLocale } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "vp-toggle-sidebar-button",
        title: unref(themeLocale).toggleSidebar,
        "aria-expanded": "false",
        role: "button",
        tabindex: "0"
      }, _attrs))}><div class="icon" aria-hidden="true"><span></span><span></span><span></span></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPToggleSidebarButton.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPNavbar",
  __ssrInlineRender: true,
  emits: ["toggleSidebar"],
  setup(__props) {
    const SearchBox = hasGlobalComponent("SearchBox") ? resolveComponent("SearchBox") : () => null;
    const { themeLocale } = useData();
    const navbar = useTemplateRef("navbar");
    const navbarBrand = useTemplateRef("navbar-brand");
    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) {
        return {};
      }
      return {
        maxWidth: `${linksWrapperMaxWidth.value}px`
      };
    });
    const getCssValue = (el, property) => {
      var _a;
      const val = (_a = el == null ? void 0 : el.ownerDocument.defaultView) == null ? void 0 : _a.getComputedStyle(el, null)[property];
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? 0 : num;
    };
    useUpdateDeviceStatus(
      DeviceType.Mobile,
      (mobileDesktopBreakpoint) => {
        var _a;
        const navbarHorizontalPadding = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
        if (window.innerWidth < mobileDesktopBreakpoint) {
          linksWrapperMaxWidth.value = 0;
        } else {
          linksWrapperMaxWidth.value = navbar.value.offsetWidth - navbarHorizontalPadding - (((_a = navbarBrand.value) == null ? void 0 : _a.offsetWidth) ?? 0);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref_key: "navbar",
        ref: navbar,
        class: "vp-navbar",
        "vp-navbar": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        onToggle: ($event) => _ctx.$emit("toggleSidebar")
      }, null, _parent));
      _push(`<span>`);
      _push(ssrRenderComponent(_sfc_main$h, null, null, _parent));
      _push(`</span><div class="vp-navbar-items-wrapper" style="${ssrRenderStyle(linksWrapperStyle.value)}">`);
      ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$e, { class: "vp-hide-mobile" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
      if (unref(themeLocale).colorModeSwitch) {
        _push(ssrRenderComponent(_sfc_main$b, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(SearchBox), null, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPNavbar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    class: "edit-icon",
    viewBox: "0 0 1024 1024"
  }, _attrs))}><g fill="currentColor"><path d="M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"></path><path d="M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"></path></g></svg>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPEditIcon.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const VPEditIcon = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]);
const EDIT_LINK_PATTERNS = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLinkPatterns = ({ docsRepo, editLinkPattern }) => {
  if (editLinkPattern) {
    return editLinkPattern;
  }
  const repoType = resolveRepoType(docsRepo);
  if (repoType !== null) {
    return EDIT_LINK_PATTERNS[repoType];
  }
  return null;
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern });
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const useEditLink = () => {
  const { frontmatter, page, themeLocale } = useData();
  return computed(() => {
    const showEditLink = frontmatter.value.editLink ?? themeLocale.value.editLink ?? true;
    if (!showEditLink) {
      return null;
    }
    const { repo, docsRepo = repo, docsBranch = "main", docsDir = "", editLinkText } = themeLocale.value;
    if (!docsRepo)
      return null;
    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern
    });
    if (!editLink)
      return null;
    return {
      text: editLinkText ?? "Edit this page",
      link: editLink
    };
  });
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VPPageMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, themeLocale } = useData();
    const contributors = useContributors(
      () => frontmatter.value.contributors ?? themeLocale.value.contributors ?? true
    );
    const editLink = useEditLink();
    const lastUpdated = useLastUpdated(
      () => frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "vp-page-meta" }, _attrs))}>`);
      if (unref(editLink)) {
        _push(`<div class="vp-meta-item edit-link">`);
        _push(ssrRenderComponent(_sfc_main$k, {
          class: "label",
          config: unref(editLink)
        }, {
          before: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VPEditIcon, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(VPEditIcon)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="vp-meta-item git-info">`);
      if (unref(lastUpdated)) {
        _push(`<div class="vp-meta-item last-updated"><span class="meta-item-label">${ssrInterpolate(unref(themeLocale).lastUpdatedText ?? unref(lastUpdated).locale)}: </span><time class="meta-item-info"${ssrRenderAttr("datetime", unref(lastUpdated).iso)} data-allow-mismatch>${ssrInterpolate(unref(lastUpdated).text)}</time></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(contributors).length) {
        _push(`<div class="vp-meta-item contributors"><span class="meta-item-label">${ssrInterpolate(unref(themeLocale).contributorsText)}: </span><span class="meta-item-info"><!--[-->`);
        ssrRenderList(unref(contributors), (contributor, index) => {
          _push(`<!--[--><span class="contributor"${ssrRenderAttr("title", `email: ${contributor.email}`)}>${ssrInterpolate(contributor.name)}</span>`);
          if (index !== unref(contributors).length - 1) {
            _push(`<!--[-->, <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></footer>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPPageMeta.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const useNavigate = () => {
  const router = useRouter();
  const route = useRoute();
  return (url) => {
    if (url)
      if (isLinkAbsolute(url)) {
        if (route.fullPath !== url)
          router.push(url);
      } else if (isLinkWithProtocol(url)) {
        window.open(url);
      } else {
        router.push(encodeURI(url));
      }
  };
};
const resolveFromFrontmatterConfig = (config2, currentPath) => {
  if (config2 === false) {
    return false;
  }
  if (isString(config2)) {
    return resolveAutoLink(config2, currentPath);
  }
  if (isPlainObject(config2)) {
    return {
      ...config2,
      link: resolveAutoLink(config2.link, currentPath).link
    };
  }
  return null;
};
const resolveFromSidebarItems = (sidebarItems, currentPath, offset) => {
  const linkIndex = sidebarItems.findIndex((item) => item.link === currentPath);
  if (linkIndex !== -1) {
    const targetItem = sidebarItems[linkIndex + offset];
    if (!targetItem)
      return null;
    if (targetItem.link)
      return targetItem;
    if ("prefix" in targetItem && !resolveRoute(targetItem.prefix).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix
      };
    return null;
  }
  for (const item of sidebarItems) {
    if ("children" in item) {
      const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
      if (childResult) {
        return childResult;
      }
    }
  }
  const prefixIndex = sidebarItems.findIndex((item) => "prefix" in item && item.prefix === currentPath);
  if (prefixIndex !== -1) {
    const targetItem = sidebarItems[prefixIndex + offset];
    if (!targetItem)
      return null;
    if (targetItem.link)
      return targetItem;
    if ("prefix" in targetItem && !resolveRoute(targetItem.prefix).notFound)
      return {
        ...targetItem,
        link: targetItem.prefix
      };
    return null;
  }
  return null;
};
const useRelatedLinks = () => {
  const { frontmatter, themeLocale } = useData();
  const sidebarItems = useSidebarItems();
  const routePath = useRoutePath();
  const prevLink = computed(() => {
    const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev, routePath.value);
    return prevConfig === false ? null : prevConfig ?? (themeLocale.value.prev === false ? null : resolveFromSidebarItems(sidebarItems.value, routePath.value, -1));
  });
  const nextLink = computed(() => {
    const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next, routePath.value);
    return nextConfig === false ? null : nextConfig ?? (themeLocale.value.next === false ? null : resolveFromSidebarItems(sidebarItems.value, routePath.value, 1));
  });
  return {
    prevLink,
    nextLink
  };
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "VPPageNav",
  __ssrInlineRender: true,
  setup(__props) {
    const { themeLocale } = useData();
    const navigate = useNavigate();
    const { prevLink, nextLink } = useRelatedLinks();
    const navbarLabel = computed(
      () => themeLocale.value.pageNavbarLabel ?? "page navigation"
    );
    useEventListener("keydown", (event) => {
      if (event.altKey) {
        if (event.key === "ArrowRight") {
          if (nextLink.value) {
            navigate(nextLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevLink.value) {
            navigate(prevLink.value.link);
            event.preventDefault();
          }
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(prevLink) || unref(nextLink)) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: "vp-page-nav",
          "aria-label": navbarLabel.value
        }, _attrs))}>`);
        if (unref(prevLink)) {
          _push(ssrRenderComponent(_sfc_main$k, {
            class: "prev",
            config: unref(prevLink)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="hint"${_scopeId}><span class="arrow left"${_scopeId}></span> ${ssrInterpolate(unref(themeLocale).prev ?? "Prev")}</div><div class="link"${_scopeId}><span class="external-link"${_scopeId}>${ssrInterpolate(unref(prevLink).text)}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "hint" }, [
                    createVNode("span", { class: "arrow left" }),
                    createTextVNode(" " + toDisplayString(unref(themeLocale).prev ?? "Prev"), 1)
                  ]),
                  createVNode("div", { class: "link" }, [
                    createVNode("span", { class: "external-link" }, toDisplayString(unref(prevLink).text), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(nextLink)) {
          _push(ssrRenderComponent(_sfc_main$k, {
            class: "next",
            config: unref(nextLink)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="hint"${_scopeId}>${ssrInterpolate(unref(themeLocale).next ?? "Next")} <span class="arrow right"${_scopeId}></span></div><div class="link"${_scopeId}><span class="external-link"${_scopeId}>${ssrInterpolate(unref(nextLink).text)}</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "hint" }, [
                    createTextVNode(toDisplayString(unref(themeLocale).next ?? "Next") + " ", 1),
                    createVNode("span", { class: "arrow right" })
                  ]),
                  createVNode("div", { class: "link" }, [
                    createVNode("span", { class: "external-link" }, toDisplayString(unref(nextLink).text), 1)
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPPageNav.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "VPPage",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "vp-page" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<div vp-content>`);
      ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent);
      _push(ssrRenderComponent(unref(Content), null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$7, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPPage.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, "");
const isActiveLink = (link, route) => {
  if (route.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveSidebarItem = (item, route) => {
  if (item.link && isActiveLink(item.link, route)) {
    return true;
  }
  if ("children" in item) {
    return item.children.some((child) => isActiveSidebarItem(child, route));
  }
  return false;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    depth: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const { item, depth } = toRefs(props);
    const route = useRoute();
    const router = useRouter();
    const collapsible = computed(() => item.value.collapsible);
    const isActive = computed(() => isActiveSidebarItem(item.value, route));
    const itemClass = computed(() => ({
      "vp-sidebar-item": true,
      "vp-sidebar-heading": depth.value === 0,
      "active": isActive.value,
      "collapsible": collapsible.value
    }));
    const isOpenDefault = computed(
      () => collapsible.value ? isActive.value : true
    );
    const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value);
    const unregisterRouterHook = router.afterEach(() => {
      void nextTick(() => {
        isOpen.value = isOpenDefault.value;
      });
    });
    onBeforeUnmount(() => {
      unregisterRouterHook();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
      _push(`<li${ssrRenderAttrs(_attrs)}>`);
      if (unref(item).link) {
        _push(ssrRenderComponent(_sfc_main$k, {
          class: itemClass.value,
          config: unref(item)
        }, {
          after: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (collapsible.value) {
                _push2(`<span class="${ssrRenderClass([unref(isOpen) ? "down" : "right", "arrow"])}"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                collapsible.value ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ["arrow", unref(isOpen) ? "down" : "right"]
                }, null, 2)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<p tabindex="0" class="${ssrRenderClass(itemClass.value)}">${ssrInterpolate(unref(item).text)} `);
        if (collapsible.value) {
          _push(`<span class="${ssrRenderClass([unref(isOpen) ? "down" : "right", "arrow"])}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      }
      if ("children" in unref(item) && unref(item).children.length) {
        _push(ssrRenderComponent(_sfc_main$g, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul style="${ssrRenderStyle(unref(isOpen) ? null : { display: "none" })}" class="vp-sidebar-children"${_scopeId}><!--[-->`);
              ssrRenderList(unref(item).children, (child) => {
                _push2(ssrRenderComponent(_component_VPSidebarItem, {
                  key: `${unref(depth)}${child.text}${child.link}`,
                  item: child,
                  depth: unref(depth) + 1
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></ul>`);
            } else {
              return [
                withDirectives(createVNode("ul", { class: "vp-sidebar-children" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(item).children, (child) => {
                    return openBlock(), createBlock(_component_VPSidebarItem, {
                      key: `${unref(depth)}${child.text}${child.link}`,
                      item: child,
                      depth: unref(depth) + 1
                    }, null, 8, ["item", "depth"]);
                  }), 128))
                ], 512), [
                  [vShow, unref(isOpen)]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPSidebarItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItems",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const sidebarItems = useSidebarItems();
    onMounted(() => {
      watch(
        () => route.hash,
        (hash) => {
          const sidebar = document.querySelector(".vp-sidebar");
          if (!sidebar) return;
          const activeSidebarItem = document.querySelector(
            `.vp-sidebar .vp-sidebar-item.auto-link[href="${route.path}${hash}"]`
          );
          if (!activeSidebarItem) return;
          const { top: sidebarTop, height: sidebarHeight } = sidebar.getBoundingClientRect();
          const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
          if (activeSidebarItemTop < sidebarTop) {
            activeSidebarItem.scrollIntoView(true);
          } else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight) {
            activeSidebarItem.scrollIntoView(false);
          }
        }
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(sidebarItems).length) {
        _push(`<ul${ssrRenderAttrs(mergeProps({ class: "vp-sidebar-items" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(sidebarItems), (item) => {
          _push(ssrRenderComponent(_sfc_main$4, {
            key: `${item.text}${item.link}`,
            item
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPSidebarItems.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "vp-sidebar",
        "vp-sidebar": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$e, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/components/VPSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const { frontmatter, page, themeLocale } = useData();
    const shouldShowNavbar = computed(
      () => frontmatter.value.navbar ?? themeLocale.value.navbar ?? true
    );
    const sidebarItems = useSidebarItems();
    const isSidebarOpen = ref(false);
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };
    const enableExternalLinkIcon = computed(
      () => frontmatter.value.externalLinkIcon ?? themeLocale.value.externalLinkIcon ?? true
    );
    const containerClass = computed(() => [
      {
        "no-navbar": !shouldShowNavbar.value,
        "no-sidebar": !sidebarItems.value.length,
        "sidebar-open": isSidebarOpen.value,
        "external-link-icon": enableExternalLinkIcon.value
      },
      frontmatter.value.pageClass
    ]);
    onContentUpdated(() => {
      toggleSidebar(false);
    });
    const scrollPromise2 = useScrollPromise();
    const onBeforeEnter = scrollPromise2.resolve;
    const onBeforeLeave = scrollPromise2.pending;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["vp-theme-container", containerClass.value],
        "vp-container": ""
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "navbar", {}, () => {
        if (shouldShowNavbar.value) {
          _push(ssrRenderComponent(_sfc_main$9, { onToggleSidebar: toggleSidebar }, {
            before: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "navbar-before", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "navbar-before")
                ];
              }
            }),
            after: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "navbar-after", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "navbar-after")
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<div class="vp-sidebar-mask"></div>`);
      ssrRenderSlot(_ctx.$slots, "sidebar", {}, () => {
        _push(ssrRenderComponent(_sfc_main$2, null, {
          top: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-top")
              ];
            }
          }),
          bottom: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-bottom")
              ];
            }
          }),
          _: 3
        }, _parent));
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "page", {}, () => {
        _push(ssrRenderComponent(_sfc_main$n, {
          onBeforeEnter: unref(onBeforeEnter),
          onBeforeLeave: unref(onBeforeLeave)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(frontmatter).home) {
                _push2(ssrRenderComponent(_sfc_main$i, null, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$5, {
                  key: unref(page).path
                }, {
                  top: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "page-top")
                      ];
                    }
                  }),
                  "content-top": withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "page-content-top", {}, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "page-content-top")
                      ];
                    }
                  }),
                  "content-bottom": withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "page-content-bottom", {}, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "page-content-bottom")
                      ];
                    }
                  }),
                  bottom: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "page-bottom")
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              }
            } else {
              return [
                unref(frontmatter).home ? (openBlock(), createBlock(_sfc_main$i, { key: 0 })) : (openBlock(), createBlock(_sfc_main$5, {
                  key: unref(page).path
                }, {
                  top: withCtx(() => [
                    renderSlot(_ctx.$slots, "page-top")
                  ]),
                  "content-top": withCtx(() => [
                    renderSlot(_ctx.$slots, "page-content-top")
                  ]),
                  "content-bottom": withCtx(() => [
                    renderSlot(_ctx.$slots, "page-content-bottom")
                  ]),
                  bottom: withCtx(() => [
                    renderSlot(_ctx.$slots, "page-bottom")
                  ]),
                  _: 3
                }))
              ];
            }
          }),
          _: 3
        }, _parent));
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    const { routeLocale, themeLocale } = useData();
    const messages = computed(() => themeLocale.value.notFound ?? ["Not Found"]);
    const getMsg = () => messages.value[Math.floor(Math.random() * messages.value.length)];
    const homeLink = computed(() => themeLocale.value.home ?? routeLocale.value);
    const homeText = computed(() => themeLocale.value.backToHome ?? "Back to home");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "vp-theme-container",
        "vp-container": ""
      }, _attrs))} data-v-1d7d9aaa><main class="page" data-v-1d7d9aaa><div vp-content data-v-1d7d9aaa><h1 data-v-1d7d9aaa>404</h1><blockquote data-v-1d7d9aaa>${ssrInterpolate(getMsg())}</blockquote>`);
      _push(ssrRenderComponent(unref(RouteLink), { to: homeLink.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(homeText.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(homeText.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@vuepress+theme-default@2.0_30df6c3df5836dc8a881367169939854/node_modules/@vuepress/theme-default/lib/client/layouts/NotFound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1d7d9aaa"]]);
const config = defineClientConfig({
  enhance({ app, router }) {
    if (!hasGlobalComponent("Badge"))
      app.component("Badge", _sfc_main$o);
    const scrollBehavior = router.options.scrollBehavior;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
  },
  setup() {
    setupDarkMode();
    setupHeaders();
    setupSidebarItems();
  },
  layouts: {
    Layout: _sfc_main$1,
    NotFound
  }
});
const clientConfig10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config
}, Symbol.toStringTag, { value: "Module" }));
const B = (e) => defineAsyncComponent(
  () => import("element-plus").then((t) => t[e])
), te = {
  select: defineAsyncComponent(() => Promise.resolve().then(() => rt)),
  remoteSearchSelect: defineAsyncComponent(() => Promise.resolve().then(() => wt)),
  address: defineAsyncComponent(() => Promise.resolve().then(() => Xe)),
  checkbox: defineAsyncComponent(() => Promise.resolve().then(() => tt)),
  radio: defineAsyncComponent(() => Promise.resolve().then(() => bt)),
  popover: defineAsyncComponent(() => Promise.resolve().then(() => _t)),
  inputNumber: defineAsyncComponent(() => Promise.resolve().then(() => ut)),
  upload: defineAsyncComponent(() => Promise.resolve().then(() => Lt)),
  input: B("ElInput"),
  datePicker: B("ElDatePicker"),
  timePicker: B("ElTimePicker"),
  timeSelect: B("ElTimeSelect"),
  cascader: B("ElCascader"),
  rate: B("ElRate")
};
class Te {
  constructor() {
    __publicField(this, "customModules", {});
  }
  registerModule(t, l) {
    te[t] && console.warn(`Overriding built-in module: ${t}`), this.customModules[t] = l;
  }
  getModule(t) {
    return this.customModules[t] || te[t];
  }
  getAllModules() {
    return { ...te, ...this.customModules };
  }
}
const ne = new Te();
function ze(e, t) {
  ne.registerModule(e, t);
}
const $ = [];
for (let e = 0; e < 256; ++e)
  $.push((e + 256).toString(16).slice(1));
function De(e, t = 0) {
  return ($[e[t + 0]] + $[e[t + 1]] + $[e[t + 2]] + $[e[t + 3]] + "-" + $[e[t + 4]] + $[e[t + 5]] + "-" + $[e[t + 6]] + $[e[t + 7]] + "-" + $[e[t + 8]] + $[e[t + 9]] + "-" + $[e[t + 10]] + $[e[t + 11]] + $[e[t + 12]] + $[e[t + 13]] + $[e[t + 14]] + $[e[t + 15]]).toLowerCase();
}
let le;
const Le = new Uint8Array(16);
function Re() {
  if (!le) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    le = crypto.getRandomValues.bind(crypto);
  }
  return le(Le);
}
const Ie = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), he = { randomUUID: Ie };
function ge(e, t, l) {
  var _a;
  if (he.randomUUID && !t && !e)
    return he.randomUUID();
  e = e || {};
  const p = e.random ?? ((_a = e.rng) == null ? void 0 : _a.call(e)) ?? Re();
  if (p.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (p[6] = p[6] & 15 | 64, p[8] = p[8] & 63 | 128, t) ;
  return De(p);
}
const Be = /* @__PURE__ */ defineComponent({
  __name: "formkit",
  props: {
    modelValue: { required: true, type: Object },
    config: { type: Array, default: () => [] },
    rules: { type: Object, default: () => {
    } },
    disabled: { type: Boolean, default: false },
    labelPosition: { type: String, default: "top" },
    // Form Input Alignment Rules
    labelWidth: { type: Number, default: 120 },
    // Form item title width (only works when labelPosition is left, right)
    columns: { type: [Number, String], default: 1 },
    // How many columns per row
    size: { type: String, default: "default" },
    // Form Size
    rows: { type: Object, default: () => null }
    // Form row item settings
  },
  emits: ["update:modelValue", "update:config", "update", "enter"],
  setup(e, { expose: t, emit: l }) {
    const p = ref(ge()), s = ref(), r = reactive([]), m = l, b = reactive({}), a = e;
    onMounted(async () => {
      try {
        for (const o of a.config)
          (o == null ? void 0 : o.request) && r.push(o);
        r.length > 0 && await j();
      } catch (o) {
        console.log(`[_initComponent method]: ${o}`);
      }
    });
    const u = computed(() => {
      const o = /* @__PURE__ */ Object.create(null);
      return o.size = a.size, o.inline = Number(a.columns) > 1, a.disabled && (o.disabled = a.disabled), a.rules && Object.keys(a.rules).length > 0 && (o.rules = a.rules), o;
    }), h2 = computed(() => {
      const { gutter: o } = a.rows || {};
      return { gutter: o || 20 };
    }), S2 = computed(() => a.columns === "auto"), f = computed(() => {
      const o = a.columns;
      return isNumber(o) ? 24 / o : null;
    }), c = computed(() => a.config.filter((o) => {
      if ((o == null ? void 0 : o.visible) === void 0)
        return o;
      if (isObject(o.visible) || isArray$1(o.visible)) {
        if (d(o), isObject(o.visible) && C(o.visible))
          return o;
        if (isArray$1(o.visible)) {
          const k = o.visible;
          if (Array.isArray(k) && k.some((E) => C(E)))
            return o;
        }
      } else if (isBoolean(o.visible)) {
        if (o.visible)
          return o;
      } else
        return console.warn("visible field has been set, but it is not an [array, object, Boolean]!"), o;
    }));
    watchEffect(() => {
      a == null ? void 0 : a.config.forEach((o) => {
        o.key && (b[o.key] = b[o.key] === void 0 ? 0 : b[o.key] + 1, d(o));
      });
    });
    const P = reactive({});
    function N(o) {
      try {
        const k = ne.getModule(o);
        return k || defineAsyncComponent(async () => ({
          template: `<p>Unable to find module: ${String(o)}</p>`
        }));
      } catch (k) {
        return defineAsyncComponent(async () => ({
          template: `<h5>${String(o)} load faild!</h5><p>reson: ${k}</p>`
        }));
      }
    }
    function n2(o, k) {
      m("update", { event: o, config: k }), d(k);
    }
    function d(o) {
      var _a;
      Object.hasOwnProperty.call(o, "key") && Object.hasOwnProperty.call(o, "rules") && ((_a = s.value) == null ? void 0 : _a.clearValidate([o.key]));
    }
    function C({ value: o, key: k }) {
      if (k && o === void 0) {
        if (a.modelValue[k])
          return true;
      } else if (o === void 0 && k === void 0)
        console.warn("Key and value field not detected, U can like this: { value, key } or { key }");
      else if (a.modelValue[k] === o)
        return true;
      return false;
    }
    async function j() {
      const o = r[Symbol.iterator]();
      for (const k of o)
        try {
          const { request: M, key: E, handle: I } = k, g = Object.prototype.toString.call(M) === "[object Function]" ? await M() : await M;
          if (isFunction(I))
            P[E] = I(g);
          else {
            const { data: V = [], code: Q } = g || {};
            Q === 200 && (P[E] = V);
          }
        } catch (M) {
          console.log(`FormKit executeRequestStack failed: ${M}`);
        }
    }
    function Z(o = false) {
      return new Promise(async (k, M) => {
        var _a;
        try {
          s.value ? await ((_a = s.value) == null ? void 0 : _a.validate((E) => {
            if (E)
              k(a.modelValue);
            else
              throw "您需要将标星号的栏目填写完整后重新尝试";
          })) : console.warn("组件加载未完成");
        } catch (E) {
          o && ElMessage.error(E), M(E);
        }
      });
    }
    return t({
      validate: Z,
      clearValidate: () => {
        var _a;
        return (_a = s.value) == null ? void 0 : _a.clearValidate();
      }
    }), (o, k) => {
      const M = resolveComponent("el-form-item"), E = resolveComponent("el-col"), I = resolveComponent("el-row");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([[{ "form-label-auto": unref(S2) }], "FormKit"])
      }, [
        (openBlock(), createBlock(unref(ElForm), mergeProps({
          ref_key: "FormKitRef",
          ref: s,
          model: e.modelValue,
          key: unref(p)
        }, unref(u), { "label-position": e.labelPosition }), {
          default: withCtx(() => [
            createVNode(I, normalizeProps(guardReactiveProps(unref(h2))), {
              default: withCtx(() => [
                renderSlot(o.$slots, "prepend"),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(c), (g) => (openBlock(), createBlock(E, {
                  key: g.key,
                  span: g.span || unref(f)
                }, {
                  default: withCtx(() => [
                    createVNode(M, {
                      label: g.label,
                      "label-width": unref(S2) ? "0px" : g.labelWidth || `${e.labelWidth}px`,
                      class: normalizeClass({ [o.FormKit["auto-alignment"]]: unref(S2) }),
                      prop: g.key,
                      rules: g.rules
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Suspense, null, {
                          default: withCtx(() => [
                            g.type ? (openBlock(), createBlock(resolveDynamicComponent(N(g.type)), mergeProps({
                              key: 0,
                              ref_for: true,
                              ref: `module-${g.key}`,
                              disabled: g.disabled,
                              modelValue: e.modelValue[g.key],
                              "onUpdate:modelValue": (V) => e.modelValue[g.key] = V,
                              options: g.options || unref(P)[g.key]
                            }, toHandlers(g.events || {}), { ref_for: true }, g.props, {
                              onChange: (V) => n2(V, g),
                              key: `module-${g.key}-${unref(b)[g.key] || 0}`
                            }), null, 16, ["disabled", "modelValue", "onUpdate:modelValue", "options", "onChange"])) : createCommentVNode("", true)
                          ]),
                          fallback: withCtx(() => [
                            createElementVNode("div", {
                              class: normalizeClass(o.FormKit.isLoading)
                            }, [
                              createElementVNode("div", {
                                class: normalizeClass(o.FormKit.loader)
                              }, null, 2)
                            ], 2)
                          ]),
                          _: 2
                        }, 1024))
                      ]),
                      _: 2
                    }, 1032, ["label", "label-width", "class", "prop", "rules"])
                  ]),
                  _: 2
                }, 1032, ["span"]))), 128)),
                renderSlot(o.$slots, "append")
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        }, 16, ["model", "label-position"])),
        renderSlot(o.$slots, "content", { config: unref(c) })
      ], 2);
    };
  }
}), He = "formkit-vue-used-vue-type-style-index-0-lang-module__isLoading", qe = "formkit-vue-used-vue-type-style-index-0-lang-module__loader", We = {
  "form-kit-row": "formkit-vue-used-vue-type-style-index-0-lang-module__form-kit-row",
  "item-hint": "formkit-vue-used-vue-type-style-index-0-lang-module__item-hint",
  "formKit-list-item": "formkit-vue-used-vue-type-style-index-0-lang-module__formKit-list-item",
  "auto-alignment": "formkit-vue-used-vue-type-style-index-0-lang-module__auto-alignment",
  isLoading: He,
  loader: qe,
  "l20-1": "formkit-vue-used-vue-type-style-index-0-lang-module__l20-1",
  "l20-2": "formkit-vue-used-vue-type-style-index-0-lang-module__l20-2"
};
const L = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [p, s] of t)
    l[p] = s;
  return l;
}, Ye = {
  FormKit: We
}, ve = /* @__PURE__ */ L(Be, [["__cssModules", Ye], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/formkit.vue"]]), Je = {
  uploadUrl: ""
}, oe = ref(Je);
function be(e) {
  oe.value = { ...oe.value, ...e };
}
function G(e) {
  return oe.value[e];
}
const Qe = /* @__PURE__ */ defineComponent({
  __name: "address",
  props: {
    labelKey: { type: String, default: "name" },
    valueKey: { type: String, default: "id" },
    level: { type: Number, default: 1 },
    network: { type: Function, default: null },
    cascaderProps: { type: Object, default: () => {
    } },
    modelValue: { type: [String, Number, Array] }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const l = e, p = t, s = computed({
      get: () => l.modelValue || (l.level > 0 ? [] : null),
      set: (a) => {
        p("update:modelValue", a);
      }
    }), r = {
      lazy: true,
      lazyLoad(a, u) {
        const { level: h2 } = a, S2 = h2 == 0 ? -1 : a.value, f = [];
        b(S2, h2).then((c) => {
          const P = f.concat(c);
          u(P);
        }).catch((c) => {
          u(f);
        });
      },
      ...l.cascaderProps
    }, m = () => G("addressNetWork") ? (l.network && console.warn("You have set up addressNetWork configuration information, remove the unnecessary props.network parameter"), G("addressNetWork")) : l.network ? l.network : (console.error("The parameters for the necessary network requests are missing using address, please consult the documentation for configuration."), null), b = (a, u = 1) => new Promise(async (h2, S2) => {
      try {
        const f = m();
        if (f) {
          const c = typeof f == "function" ? await f(a, u) : null, P = [];
          Array.isArray(c) && c.length > 0 && c.map((N) => {
            const n2 = {
              value: N[l.valueKey],
              label: N[l.labelKey],
              leaf: u >= l.level
            };
            P.push(n2);
          }), h2(P);
        } else
          return S2(new Error("Network function not available"));
      } catch (f) {
        S2(f);
      }
    });
    return (a, u) => {
      const h2 = resolveComponent("el-cascader");
      return openBlock(), createBlock(h2, mergeProps({
        props: r,
        modelValue: unref(s),
        "onUpdate:modelValue": u[0] || (u[0] = (S2) => isRef(s) ? s.value = S2 : null),
        key: e.level
      }, a.$attrs), null, 16, ["modelValue"]);
    };
  }
}), re = /* @__PURE__ */ L(Qe, [["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/address.vue"]]), Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: re
}, Symbol.toStringTag, { value: "Module" })), Ge = { class: "formKit-checkbox" }, Ze = { key: 2 }, et = /* @__PURE__ */ defineComponent({
  __name: "checkbox",
  props: {
    modelValue: { type: [String, Array] },
    showAllCheck: { type: Boolean, default: false },
    options: { type: Array, default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const l = e, p = useAttrs();
    let s = ref(false), r = computed({
      get: () => (S2(l.modelValue), l.modelValue || []),
      set: (f) => {
        b("update:modelValue", f), S2(f);
      }
    }), m = ref(true);
    const b = t, a = computed(() => l.options.length > 0 && l.showAllCheck);
    computed(() => {
      let f = [], { valueKey: c = "id", labelKey: P = "name" } = p;
      return l.options.length === 0 || Array.isArray(r) && r.length > 0 && r.forEach((N) => {
        const n2 = l.options.find((d) => d[c] === N);
        (n2 == null ? void 0 : n2[P]) && f.push(n2[P]);
      }), f;
    });
    const u = computed(() => p);
    function h2(f) {
      r = f ? [...l.options].map((c) => c[p.valueKey || "id"]) : [], m.value = false;
    }
    function S2(f) {
      const c = Array.isArray(f) ? f.length : 0;
      s = c === l.options.length, m.value = c > 0 && c < l.options.length;
    }
    return (f, c) => {
      const P = resolveComponent("el-checkbox"), N = resolveComponent("el-checkbox-group");
      return openBlock(), createElementBlock("div", Ge, [
        a.value ? (openBlock(), createBlock(P, {
          key: 0,
          indeterminate: unref(m),
          modelValue: unref(s),
          "onUpdate:modelValue": c[0] || (c[0] = (n2) => isRef(s) ? s.value = n2 : s = n2),
          onChange: h2
        }, {
          default: withCtx(() => c[2] || (c[2] = [
            createTextVNode("全选")
          ])),
          _: 1,
          __: [2]
        }, 8, ["indeterminate", "modelValue"])) : createCommentVNode("", true),
        e.options.length > 0 ? (openBlock(), createBlock(N, {
          key: 1,
          indeterminate: unref(m),
          modelValue: unref(r),
          "onUpdate:modelValue": c[1] || (c[1] = (n2) => isRef(r) ? r.value = n2 : r = n2)
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.options, (n2, d) => (openBlock(), createBlock(P, {
              label: n2[u.value.valueKey || "id"],
              key: d,
              style: normalizeStyle(f.$attrs.styles)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(n2[u.value.labelKey || "name"]), 1)
              ]),
              _: 2
            }, 1032, ["label", "style"]))), 128))
          ]),
          _: 1
        }, 8, ["indeterminate", "modelValue"])) : (openBlock(), createElementBlock("p", Ze, "No available options found"))
      ]);
    };
  }
});
const se = /* @__PURE__ */ L(et, [["__scopeId", "data-v-de53f9d1"], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/checkbox.vue"]]), tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: se
}, Symbol.toStringTag, { value: "Module" })), lt = {
  name: "FormKitSelect",
  model: { prop: "value", event: "change" },
  props: {
    value: { default: null },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() {
        const { multiple: e } = this.$attrs || {};
        return this.value || (e ? [] : null);
      },
      set(e) {
        this.$emit("change", e);
      }
    }
  }
}, ot = ["innerHTML"];
function nt(e, t, l, p, s, r) {
  const m = resolveComponent("el-option"), b = resolveComponent("el-select");
  return openBlock(), createBlock(b, mergeProps({
    modelValue: r._value,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => r._value = a)
  }, e.$attrs), {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(l.options, (a) => (openBlock(), createBlock(m, {
        key: a[e.$attrs.valueKey || "id"],
        label: a[e.$attrs.labelKey || "name"],
        value: a[e.$attrs.valueKey || "id"]
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            innerHTML: a[e.$attrs.labelKey || "name"]
          }, null, 8, ot)
        ]),
        _: 2
      }, 1032, ["label", "value"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ae = /* @__PURE__ */ L(lt, [["render", nt], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/select.vue"]]), rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ae
}, Symbol.toStringTag, { value: "Module" })), st = ["innerHTML"], at = ["innerHTML"], it = /* @__PURE__ */ defineComponent({
  __name: "inputNumber",
  props: {
    prefix: { type: String, default: null },
    suffix: { type: String, default: null },
    modelValue: { type: [String, Number, Array] }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const l = e, p = t, s = computed({
      get: () => l.modelValue || null,
      set: (r) => {
        p("update:modelValue", r);
      }
    });
    return (r, m) => {
      const b = resolveComponent("el-input-number");
      return openBlock(), createBlock(b, mergeProps({
        modelValue: unref(s),
        "onUpdate:modelValue": m[0] || (m[0] = (a) => isRef(s) ? s.value = a : null)
      }, r.$attrs), createSlots({ _: 2 }, [
        e.suffix ? {
          name: "suffix",
          fn: withCtx(() => [
            createElementVNode("span", { innerHTML: e.suffix }, null, 8, st)
          ]),
          key: "0"
        } : void 0,
        e.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            createElementVNode("span", { innerHTML: e.prefix }, null, 8, at)
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["modelValue"]);
    };
  }
}), ie = /* @__PURE__ */ L(it, [["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/inputNumber.vue"]]), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ie
}, Symbol.toStringTag, { value: "Module" })), dt = "popover-vue-used-vue-type-style-index-0-lang-module__active", ct = "popover-vue-used-vue-type-style-index-0-lang-module__loading", mt = {
  active: dt,
  loading: ct
}, pt = {
  name: "FormKitPopover",
  model: { prop: "value", event: "change" },
  props: {
    value: { required: true },
    loading: { type: [Boolean, void 0], default: false },
    options: { type: [Array, void 0], default: () => [] }
  },
  computed: {
    _value: {
      get() {
        return this.value || null;
      },
      set(e) {
        this.$emit("change", e);
      }
    },
    label() {
      try {
        return Array.isArray(this.options) && this.options.length === 0 ? this.$attrs.placeholder || "请选择" : (() => {
          const t = this._value;
          if (Array.isArray(t) && t.length >= 1)
            return Array.isArray(t[0]) ? `${t[0].join("/")} +${this._value.length}` : t[0];
        })() || this.$attrs.placeholder || "请选择";
      } catch (e) {
        return console.log(e), this.$attrs.placeholder || "请选择";
      }
    }
  }
}, ft = { class: "ellipsis" };
function yt(e, t, l, p, s, r) {
  const m = resolveComponent("el-empty"), b = resolveComponent("el-cascader-panel"), a = resolveComponent("el-popover");
  return openBlock(), createBlock(a, mergeProps({
    trigger: "click",
    disabled: l.loading
  }, e.$attrs.popover), {
    default: withCtx(() => [
      createElementVNode("div", null, [
        l.options.length === 0 ? (openBlock(), createBlock(m, {
          key: 0,
          "image-size": 60
        })) : (openBlock(), createBlock(b, mergeProps({
          key: 1,
          options: l.options
        }, e.$attrs, {
          modelValue: r._value,
          "onUpdate:modelValue": t[0] || (t[0] = (u) => r._value = u)
        }), null, 16, ["options", "modelValue"]))
      ]),
      createElementVNode("span", {
        class: normalizeClass([{ [e.$style.active]: r._value }, "cursor-pointer"]),
        slot: "reference"
      }, [
        l.loading ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(e.$style.loading)
        }, t[1] || (t[1] = [
          createTextVNode(" 正在加载 "),
          createElementVNode("i", { class: "el-icon-loading" }, null, -1)
        ]), 2)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createElementVNode("span", ft, toDisplayString(r.label), 1),
          t[2] || (t[2] = createElementVNode("i", { class: "el-icon-arrow-down el-icon--right" }, null, -1))
        ], 64))
      ], 2)
    ]),
    _: 1
  }, 16, ["disabled"]);
}
const ht = {
  $style: mt
}, ue = /* @__PURE__ */ L(pt, [["render", yt], ["__cssModules", ht], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/popover.vue"]]), _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" })), gt = {
  name: "FormKitRadio",
  model: { prop: "value", event: "change" },
  props: {
    value: { default: null },
    type: { default: "default" },
    options: { type: Array, default: () => [] }
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(e) {
        this.$emit("change", e);
      }
    }
  }
};
function vt(e, t, l, p, s, r) {
  const m = resolveComponent("el-radio"), b = resolveComponent("el-radio-button"), a = resolveComponent("el-radio-group");
  return openBlock(), createBlock(a, mergeProps({
    modelValue: r._value,
    "onUpdate:modelValue": t[0] || (t[0] = (u) => r._value = u)
  }, e.$attrs), {
    default: withCtx(() => [
      l.type === "default" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(l.options, (u, h2) => (openBlock(), createBlock(m, {
        disabled: u.disabled,
        value: u[e.$attrs.valueKey || "id"],
        key: h2
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(u[e.$attrs.labelKey || "name"]), 1)
        ]),
        _: 2
      }, 1032, ["disabled", "value"]))), 128)) : createCommentVNode("", true),
      l.type === "button" ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(l.options, (u, h2) => (openBlock(), createBlock(b, {
        value: u[e.$attrs.valueKey || "id"],
        key: h2
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(u[e.$attrs.labelKey || "name"]), 1)
        ]),
        _: 2
      }, 1032, ["value"]))), 128)) : createCommentVNode("", true)
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const de = /* @__PURE__ */ L(gt, [["render", vt], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/radio.vue"]]), bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" })), kt = /* @__PURE__ */ defineComponent({
  __name: "remoteSearchSelect",
  props: {
    labelKey: { type: String, default: "name" },
    valueKey: { type: String, default: "id" },
    initialValue: { default: null },
    placeholder: { type: String, default: "请输入" },
    modelValue: { type: [String, Number, Array] },
    onChoose: { type: [Function, null], default: null },
    handler: { type: [Function, null], default: null },
    remoteMethod: { type: [Function, null], default: null }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const l = e, p = t, s = ref([]), r = ref(false), m = computed({
      get: () => l.modelValue || null,
      set: (u) => {
        p("update:modelValue", u);
      }
    }), b = async (u) => {
      if (u && l.remoteMethod) {
        r.value = true;
        const h2 = await l.remoteMethod(u);
        r.value = false, s.value = l.handler ? l.handler(h2) : Array.isArray(h2) ? h2 : [];
      } else
        s.value = [];
    }, a = (u) => {
      try {
        if (l.onChoose) {
          const h2 = s.value.find((S2) => S2[l.valueKey] === u);
          h2 && l.onChoose(h2);
        }
      } catch (h2) {
        console.warn("remoteSearchSelect module onChoose error:", h2);
      }
    };
    return watch(() => l.initialValue, (u) => {
      u && b(u);
    }, { immediate: true }), (u, h2) => {
      const S2 = resolveComponent("el-option"), f = resolveComponent("el-select");
      return openBlock(), createBlock(f, mergeProps({
        modelValue: unref(m),
        "onUpdate:modelValue": h2[0] || (h2[0] = (c) => isRef(m) ? m.value = c : null),
        filterable: "",
        remote: "",
        "reserve-keyword": "",
        placeholder: e.placeholder,
        onChange: a,
        "remote-method": b,
        loading: unref(r)
      }, u.$attrs), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(s), (c, P) => (openBlock(), createBlock(S2, {
            key: P,
            label: c[e.labelKey],
            value: c[e.valueKey]
          }, null, 8, ["label", "value"]))), 128))
        ]),
        _: 1
      }, 16, ["modelValue", "placeholder", "loading"]);
    };
  }
}), ce = /* @__PURE__ */ L(kt, [["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/remoteSearchSelect.vue"]]), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ce
}, Symbol.toStringTag, { value: "Module" }));
class xt {
  constructor(t) {
    __publicField(this, "uploadUrl");
    __publicField(this, "onProgress");
    __publicField(this, "onComplete");
    __publicField(this, "onError");
    __publicField(this, "xhr", null);
    this.uploadUrl = t || G("uploadUrl").toString(), this.onProgress = () => {
    }, this.onComplete = () => {
    }, this.onError = () => {
    };
  }
  setProgressListener(t) {
    this.onProgress = t;
  }
  setCompleteListener(t) {
    this.onComplete = t;
  }
  setErrorListener(t) {
    this.onError = t;
  }
  isValidFileType(t, l) {
    return (l.split(",") || []).some((s) => {
      const r = s.trim().replace("*", ".*");
      return new RegExp(`^${r}$`).test(t.type);
    });
  }
  async action(t, l) {
    return new Promise((p, s) => {
      this.xhr = new XMLHttpRequest();
      const r = new FormData();
      r.append("file", t), this.xhr.upload.addEventListener("progress", (m) => {
        if (m.lengthComputable) {
          const b = Math.round(m.loaded * 100 / m.total);
          this.onProgress(b);
        }
      }), this.xhr.addEventListener("load", () => {
        var _a, _b;
        if (this.xhr && this.xhr.status >= 200 && this.xhr.status < 300)
          try {
            const m = JSON.parse(this.xhr.responseText);
            this.onComplete(m), p();
          } catch {
            this.onComplete(this.xhr.responseText), p();
          }
        else
          this.handleError(((_a = this.xhr) == null ? void 0 : _a.statusText) || "Upload failed"), s(new Error(((_b = this.xhr) == null ? void 0 : _b.statusText) || "Upload failed"));
      }), this.xhr.addEventListener("error", () => {
        this.handleError("Network error"), s(new Error("Network error"));
      }), this.xhr.addEventListener("abort", () => {
        this.handleError("Upload cancelled"), s(new Error("Upload cancelled"));
      }), this.xhr.open("POST", this.uploadUrl), this.xhr.send(l ? l(t) : r);
    });
  }
  handleError(t) {
    console.error("Upload error:", t), this.onError(t);
  }
  destroy() {
    this.xhr && (this.xhr.abort(), this.xhr = null), this.onProgress = () => {
    }, this.onComplete = () => {
    }, this.onError = () => {
    };
  }
}
const St = { class: "w-full h-full cursor-pointer" }, Vt = ["onClick"], Pt = { class: "w-full text-center text-[12px] line-clamp-2 leading-[12px] mt-1 px-0.5" }, $t = ["onClick"], Ct = ["id", "disabled", "accept", "multiple"], Ut = ["for"], Kt = ["for"], At = /* @__PURE__ */ defineComponent({
  __name: "upload",
  props: {
    modelValue: { type: [String, Array] },
    limit: { type: Number, default: 1 },
    uploadUrl: { type: String, default: "" },
    autoUpload: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    beforeUpload: { type: Function, default: null },
    parameterHandler: { type: Function, default: null },
    accept: {
      type: String,
      default: "image/*"
    },
    size: { type: Number, default: 80 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    useCssVars((n2) => ({
      "b1c36011-`${size}px`": `${e.size}px`
    }));
    const l = e, p = ref(false), s = ref(ge()), r = ref([]), m = t;
    watch(() => l.modelValue, (n2) => {
      n2 ? l.limit === 1 ? r.value = [{ path: n2, status: 1, progress: 0, isImage: c(n2) }] : Array.isArray(n2) ? r.value = n2.map((d) => ({
        path: d,
        status: 1,
        progress: 0,
        isImage: c(d)
      })) : r.value = [] : r.value = [];
    }, { immediate: true });
    const b = computed(() => l.limit === -1 ? true : l.limit > 1), a = computed(() => l.limit === -1 ? false : r.value.length >= l.limit), u = (n2) => {
      const d = n2.target, C = d.files;
      C && C.length > 0 && (Array.from(C).forEach((j) => {
        r.value.push({
          file: j,
          isImage: j.type.startsWith("image/"),
          status: 0,
          progress: 0,
          temporaryPath: URL.createObjectURL(j)
        });
      }), l.autoUpload && h2(), d.value = "");
    }, h2 = async () => {
      for (const n2 of r.value || []) {
        if (n2.status === 1)
          continue;
        const d = new xt(l.uploadUrl);
        d.isValidFileType(n2.file, l.accept) ? (await l.beforeUpload(n2), d.action(n2.file, l.parameterHandler)) : (n2.progress = 0, n2.status = -2, d.destroy()), d.setProgressListener((C) => n2.progress = C), d.setCompleteListener(async (C) => {
          n2.path = C || null, n2.status = 1, d.destroy(), setTimeout(() => f(), 300);
        }), d.setErrorListener(() => {
          n2.progress = 0, n2.status = -1, d.destroy();
        });
      }
    }, S2 = (n2) => {
      r.value.splice(n2, 1), f();
      const d = document.getElementById(s.value);
      d && (d.value = "");
    }, f = () => {
      if (r.value.length === 0)
        m("update:modelValue", l.limit === 1 ? "" : []);
      else {
        const n2 = r.value.map((d) => d.path);
        m("update:modelValue", l.limit === 1 ? n2[0] : n2);
      }
    };
    function c(n2) {
      return isString$1(n2) ? /\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i.test(n2) : false;
    }
    const P = (n2) => window.open(n2, "_blank"), N = (n2) => {
      if (isString$1(n2)) {
        const d = n2.substring(n2.lastIndexOf("/") + 1), C = d.indexOf("?");
        return C !== -1 ? d.substring(0, C) : d;
      } else
        return n2 instanceof File ? n2.name : "文件";
    };
    return (n2, d) => {
      const C = resolveComponent("i-ep-warningFilled"), j = resolveComponent("el-icon"), Z = resolveComponent("i-ep-folderDelete"), o = resolveComponent("el-image"), k = resolveComponent("i-ep-folder"), M = resolveComponent("el-progress"), E = resolveComponent("i-ep-close"), I = resolveComponent("el-button"), g = resolveComponent("i-ep-plus");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(n2.formKitUpload.upload)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r), (V, Q) => (openBlock(), createElementBlock("div", {
          key: Q,
          class: normalizeClass(n2.formKitUpload.uploadPrepare)
        }, [
          V.status === -1 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(n2.formKitUpload.warning)
          }, [
            createVNode(j, {
              size: e.size / 2,
              class: "text-[#FC4870]"
            }, {
              default: withCtx(() => [
                createVNode(C)
              ]),
              _: 1
            }, 8, ["size"])
          ], 2)) : V.status === -2 ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(n2.formKitUpload.warning)
          }, [
            createVNode(j, {
              size: e.size / 2.1,
              class: "text-[#E6A23C]"
            }, {
              default: withCtx(() => [
                createVNode(Z)
              ]),
              _: 1
            }, 8, ["size"]),
            d[0] || (d[0] = createElementVNode("p", { class: "text-white text-[10px] leading-[12px] mt-1 text-center" }, "文件类型不合法", -1))
          ], 2)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createElementVNode("div", St, [
              V.isImage ? (openBlock(), createBlock(o, {
                key: 0,
                class: "w-full h-full",
                src: V.path || V.temporaryPath,
                "preview-src-list": [V.path],
                "show-progress": "",
                "initial-index": 4,
                fit: "cover"
              }, null, 8, ["src", "preview-src-list"])) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: "flex w-full h-full items-center justify-center flex-col hover:bg-[#f5f5f5]",
                onClick: (ke) => P(V.path || V.temporaryPath)
              }, [
                createVNode(j, { class: "text-[28px]" }, {
                  default: withCtx(() => [
                    createVNode(k)
                  ]),
                  _: 1
                }),
                createElementVNode("div", Pt, toDisplayString(N(V.file || V.path)), 1)
              ], 8, Vt))
            ]),
            V.status === 0 && V.progress < 100 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(n2.formKitUpload.progress)
            }, [
              createVNode(M, {
                type: "circle",
                percentage: V.progress || 0,
                width: e.size / 2,
                "stroke-width": 3
              }, null, 8, ["percentage", "width"])
            ], 2)) : createCommentVNode("", true)
          ], 64)),
          createElementVNode("div", {
            class: normalizeClass(n2.formKitUpload.close),
            onClick: (ke) => S2(Q)
          }, [
            createVNode(I, {
              circle: "",
              size: "small",
              plain: ""
            }, {
              default: withCtx(() => [
                createVNode(j, null, {
                  default: withCtx(() => [
                    createVNode(E)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ], 10, $t)
        ], 2))), 128)),
        unref(a) ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([n2.formKitUpload.uploadContanier])
        }, [
          createElementVNode("input", {
            type: "file",
            id: unref(s),
            onChange: u,
            disabled: unref(p) || unref(a),
            accept: e.accept,
            multiple: unref(b)
          }, null, 40, Ct),
          e.isCustom ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: unref(s)
          }, [
            renderSlot(n2.$slots, "default")
          ], 8, Ut)) : (openBlock(), createElementBlock("label", {
            key: 1,
            for: unref(s),
            class: normalizeClass(n2.formKitUpload.label)
          }, [
            createVNode(j, null, {
              default: withCtx(() => [
                createVNode(g)
              ]),
              _: 1
            })
          ], 10, Kt))
        ], 2))
      ], 2);
    };
  }
}), Ft = "upload-vue-used-vue-type-style-index-0-lang-module__upload", Et = "upload-vue-used-vue-type-style-index-0-lang-module__uploadPrepare", Mt = "upload-vue-used-vue-type-style-index-0-lang-module__warning", jt = "upload-vue-used-vue-type-style-index-0-lang-module__progress", Ot = "upload-vue-used-vue-type-style-index-0-lang-module__close", Nt = "upload-vue-used-vue-type-style-index-0-lang-module__uploadContanier", Tt = "upload-vue-used-vue-type-style-index-0-lang-module__label", zt = {
  upload: Ft,
  uploadPrepare: Et,
  warning: Mt,
  progress: jt,
  close: Ot,
  uploadContanier: Nt,
  label: Tt
}, Dt = {
  formKitUpload: zt
}, me = /* @__PURE__ */ L(At, [["__cssModules", Dt], ["__file", "D:/Project/formkit-component/element-plus-formkit/src/modules/upload.vue"]]), Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: me
}, Symbol.toStringTag, { value: "Module" })), Rt = (e, t) => {
  t && be(t), e.component("FormKit", ve), e.component("FormKitAddress", re), e.component("FormKitCheckbox", se), e.component("FormKitSelect", ae), e.component("FormKitInputNumber", ie), e.component("FormKitPopover", ue), e.component("FormKitRadio", de), e.component("FormKitRemoteSearchSelect", ce), e.component("FormKitUpload", me);
}, qt = {
  install: Rt,
  FormKit: ve,
  Address: re,
  Checkbox: se,
  Select: ae,
  InputNumber: ie,
  Popover: ue,
  Radio: de,
  RemoteSearchSelect: ce,
  Upload: me,
  setConfigure: be,
  getConfigure: G,
  registerModule: ze,
  getModules: () => ne
};
const vuepress_client = defineClientConfig({
  async enhance({ app }) {
    app.use(ElementPlus);
    app.use(qt);
  },
  setup() {
  },
  rootComponents: []
});
const clientConfig11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vuepress_client
}, Symbol.toStringTag, { value: "Module" }));
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  clientConfig3,
  clientConfig4,
  clientConfig5,
  clientConfig6,
  clientConfig7,
  clientConfig8,
  clientConfig9,
  clientConfig10,
  clientConfig11
].map((m) => m.default).filter(Boolean);
const siteData$1 = JSON.parse('{"base":"/","lang":"zh-CN","title":"element-plus-formkit","description":"基于 ElementPlus 实现的数据驱动表单组件","head":[],"locales":{}}');
var siteData = shallowRef(siteData$1);
var historyCreator = createMemoryHistory;
var createVueRouter = () => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash("/")),
    routes: [
      {
        name: "vuepress-route",
        path: "/:catchAll(.*)",
        components: {}
      }
    ],
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      const route = resolveRoute(to.fullPath);
      if (route.path !== to.fullPath) {
        return route.path;
      }
      const pageChunk = await route.loader();
      to.meta = {
        // attach route meta
        ...route.meta,
        // attach page chunk route meta
        _pageChunk: pageChunk
      };
    } else if (to.path === from.path) {
      to.meta = from.meta;
    }
  });
  return router;
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
  app.component("RouteLink", RouteLink);
};
var setupGlobalComputed = (app, router, clientConfigs2) => {
  const routePath = computed(() => router.currentRoute.value.path);
  const pageChunk = customRef((track, trigger) => ({
    get() {
      track();
      return router.currentRoute.value.meta._pageChunk;
    },
    set(value) {
      router.currentRoute.value.meta._pageChunk = value;
      trigger();
    }
  }));
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs2));
  const routeLocale = computed(
    () => resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  );
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageComponent = computed(() => pageChunk.value.comp);
  const pageData = computed(() => pageChunk.value.data);
  const pageFrontmatter = computed(() => pageData.value.frontmatter);
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(
    () => resolvers.resolvePageLang(pageData.value, siteLocaleData.value)
  );
  const pageLayout = computed(
    () => resolvers.resolvePageLayout(pageData.value, layouts.value)
  );
  const clientData = {
    layouts,
    pageData,
    pageComponent,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    redirects,
    routeLocale,
    routePath,
    routes,
    siteData,
    siteLocaleData
  };
  app.provide(clientDataSymbol, clientData);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return clientData;
};
var setupUpdateHead = () => {
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a;
  const app = appCreator({
    name: "Vuepress",
    setup() {
      var _a2;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a2 = clientConfig.setup) == null ? void 0 : _a2.call(clientConfig);
      }
      const clientRootComponents = clientConfigs.flatMap(
        ({ rootComponents = [] }) => rootComponents.map((component) => h$1(component))
      );
      const pageLayout = usePageLayout();
      return () => [h$1(pageLayout.value), clientRootComponents];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  setupGlobalComputed(app, router, clientConfigs);
  for (const clientConfig of clientConfigs) {
    await ((_a = clientConfig.enhance) == null ? void 0 : _a.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
export {
  _export_sfc as _,
  createVueApp
};
