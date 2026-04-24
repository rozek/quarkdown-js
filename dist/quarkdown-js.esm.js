function Rn(e) {
  if (e)
    throw e;
}
function ml(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var wt = Object.prototype.hasOwnProperty, Hr = Object.prototype.toString, Bn = Object.defineProperty, $n = Object.getOwnPropertyDescriptor, jn = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Hr.call(n) === "[object Array]";
}, Un = function(n) {
  if (!n || Hr.call(n) !== "[object Object]")
    return !1;
  var t = wt.call(n, "constructor"), r = n.constructor && n.constructor.prototype && wt.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || wt.call(n, i);
}, Hn = function(n, t) {
  Bn && t.name === "__proto__" ? Bn(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, Vn = function(n, t) {
  if (t === "__proto__")
    if (wt.call(n, t)) {
      if ($n)
        return $n(n, t).value;
    } else return;
  return n[t];
}, gl = function e() {
  var n, t, r, i, l, a, o = arguments[0], s = 1, u = arguments.length, f = !1;
  for (typeof o == "boolean" && (f = o, o = arguments[1] || {}, s = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); s < u; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = Vn(o, t), i = Vn(n, t), o !== i && (f && i && (Un(i) || (l = jn(i))) ? (l ? (l = !1, a = r && jn(r) ? r : []) : a = r && Un(r) ? r : {}, Hn(o, { name: t, newValue: e(f, a, i) })) : typeof i < "u" && Hn(o, { name: t, newValue: i }));
  return o;
};
const qt = /* @__PURE__ */ ml(gl);
function nn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function yl() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const a = i.pop();
    if (typeof a != "function")
      throw new TypeError("Expected function as last argument, not " + a);
    o(null, ...i);
    function o(s, ...u) {
      const f = e[++l];
      let c = -1;
      if (s) {
        a(s);
        return;
      }
      for (; ++c < i.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = i[c]);
      i = u, f ? kl(f, o)(...u) : a(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function kl(e, n) {
  let t;
  return r;
  function r(...a) {
    const o = e.length > a.length;
    let s;
    o && a.push(i);
    try {
      s = e.apply(this, a);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (o && t)
        throw f;
      return i(f);
    }
    o || (s && s.then && typeof s.then == "function" ? s.then(l, i) : s instanceof Error ? i(s) : l(s));
  }
  function i(a, ...o) {
    t || (t = !0, n(a, ...o));
  }
  function l(a) {
    i(null, a);
  }
}
function it(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Wn(e.position) : "start" in e || "end" in e ? Wn(e) : "line" in e || "column" in e ? rn(e) : "";
}
function rn(e) {
  return Zn(e && e.line) + ":" + Zn(e && e.column);
}
function Wn(e) {
  return rn(e && e.start) + "-" + rn(e && e.end);
}
function Zn(e) {
  return e && typeof e == "number" ? e : 1;
}
class ie extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, a = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (a = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? l.ruleId = r : (l.source = r.slice(0, s), l.ruleId = r.slice(s + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const o = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = it(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = a && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ie.prototype.file = "";
ie.prototype.name = "";
ie.prototype.reason = "";
ie.prototype.message = "";
ie.prototype.stack = "";
ie.prototype.column = void 0;
ie.prototype.line = void 0;
ie.prototype.ancestors = void 0;
ie.prototype.cause = void 0;
ie.prototype.fatal = void 0;
ie.prototype.place = void 0;
ie.prototype.ruleId = void 0;
ie.prototype.source = void 0;
const ke = { basename: bl, dirname: xl, extname: wl, join: Sl, sep: "/" };
function bl(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  ct(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let a = -1, o = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      a < 0 && (l = !0, a = i + 1), o > -1 && (e.codePointAt(i) === n.codePointAt(o--) ? o < 0 && (r = i) : (o = -1, r = a));
  return t === r ? r = a : r < 0 && (r = e.length), e.slice(t, r);
}
function xl(e) {
  if (ct(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function wl(e) {
  ct(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, a;
  for (; n--; ) {
    const o = e.codePointAt(n);
    if (o === 47) {
      if (a) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (a = !0, t = n + 1), o === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function Sl(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    ct(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Cl(t);
}
function Cl(e) {
  ct(e);
  const n = e.codePointAt(0) === 47;
  let t = vl(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function vl(e, n) {
  let t = "", r = 0, i = -1, l = 0, a = -1, o, s;
  for (; ++a <= e.length; ) {
    if (a < e.length)
      o = e.codePointAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === a - 1 || l === 1)) if (i !== a - 1 && l === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = a, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = a, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, a) : t = e.slice(i + 1, a), r = a - i - 1;
      i = a, l = 0;
    } else o === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function ct(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Al = { cwd: El };
function El() {
  return "/";
}
function ln(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Il(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!ln(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Tl(e);
}
function Tl(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const Ot = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class zl {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? ln(n) ? t = { path: n } : typeof n == "string" || Fl(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Al.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Ot.length; ) {
      const l = Ot[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      Ot.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ke.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    Bt(n, "basename"), Rt(n, "basename"), this.path = ke.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ke.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    Qn(this.basename, "dirname"), this.path = ke.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ke.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (Rt(n, "extname"), Qn(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ke.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    ln(n) && (n = Il(n)), Bt(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ke.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    Bt(n, "stem"), Rt(n, "stem"), this.path = ke.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const i = new ie(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function Rt(e, n) {
  if (e && e.includes(ke.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + ke.sep + "`"
    );
}
function Bt(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Qn(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Fl(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Pl = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), Nl = {}.hasOwnProperty;
class gn extends Pl {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = yl();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new gn()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(qt(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (Ut("data", this.frozen), this.namespace[n] = t, this) : Nl.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Ut("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = dt(n), r = this.parser || this.Parser;
    return $t("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), $t("process", this.parser || this.Parser), jt("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, a) {
      const o = dt(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(s, o, function(f, c, p) {
        if (f || !c || !p)
          return u(f);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), g = r.stringify(h, p);
        Dl(g) ? p.value = g : p.result = g, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          p
        );
      });
      function u(f, c) {
        f || !c ? a(f) : l ? l(c) : t(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), $t("processSync", this.parser || this.Parser), jt("processSync", this.compiler || this.Compiler), this.process(n, i), Gn("processSync", "process", t), r;
    function i(l, a) {
      t = !0, Rn(l), r = a;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    Yn(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(a, o) {
      const s = dt(t);
      i.run(n, s, u);
      function u(f, c, p) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        f ? o(f) : a ? a(h) : r(void 0, h, p);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), Gn("runSync", "run", r), i;
    function l(a, o) {
      Rn(a), i = o, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = dt(t), i = this.compiler || this.Compiler;
    return jt("stringify", i), Yn(n), i(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (Ut("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? o(n) : a(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(f, c);
        } else
          a(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function a(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (i.settings = qt(!0, i.settings, u.settings));
    }
    function o(u) {
      let f = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++f < u.length; ) {
          const c = u[f];
          l(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, f) {
      let c = -1, p = -1;
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          p = c;
          break;
        }
      if (p === -1)
        r.push([u, ...f]);
      else if (f.length > 0) {
        let [h, ...g] = f;
        const k = r[p][1];
        nn(k) && nn(h) && (h = qt(!0, k, h)), r[p] = [u, h, ...g];
      }
    }
  }
}
const yn = new gn().freeze();
function $t(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function jt(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Ut(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Yn(e) {
  if (!nn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Gn(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function dt(e) {
  return _l(e) ? e : new zl(e);
}
function _l(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Dl(e) {
  return typeof e == "string" || Ll(e);
}
function Ll(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  unified: yn
}, Symbol.toStringTag, { value: "Module" })), ql = {};
function kn(e, n) {
  const t = ql, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return Vr(e, r, i);
}
function Vr(e, n, t) {
  if (Ol(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Kn(e.children, n, t);
  }
  return Array.isArray(e) ? Kn(e, n, t) : "";
}
function Kn(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Vr(e[i], n, t);
  return r.join("");
}
function Ol(e) {
  return !!(e && typeof e == "object");
}
const Xn = document.createElement("i");
function bn(e) {
  const n = "&" + e + ";";
  Xn.innerHTML = n;
  const t = Xn.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function se(e, n, t, r) {
  const i = e.length;
  let l = 0, a;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    a = Array.from(r), a.unshift(n, t), e.splice(...a);
  else
    for (t && e.splice(n, t); l < r.length; )
      a = r.slice(l, l + 1e4), a.unshift(n, 0), e.splice(...a), l += 1e4, n += 1e4;
}
function fe(e, n) {
  return e.length > 0 ? (se(e, e.length, 0, n), e) : n;
}
const Jn = {}.hasOwnProperty;
function Wr(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Rl(n, e[t]);
  return n;
}
function Rl(e, n) {
  let t;
  for (t in n) {
    const i = (Jn.call(e, t) ? e[t] : void 0) || (e[t] = {}), l = n[t];
    let a;
    if (l)
      for (a in l) {
        Jn.call(i, a) || (i[a] = []);
        const o = l[a];
        Bl(
          // @ts-expect-error Looks like a list.
          i[a],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Bl(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  se(e, 0, 0, r);
}
function Zr(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function ye(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ne = De(/[A-Za-z]/), te = De(/[\dA-Za-z]/), $l = De(/[#-'*+\--9=?A-Z^-~]/);
function vt(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const an = De(/\d/), jl = De(/[\dA-Fa-f]/), Ul = De(/[!-/:-@[-`{-~]/);
function T(e) {
  return e !== null && e < -2;
}
function H(e) {
  return e !== null && (e < 0 || e === 32);
}
function q(e) {
  return e === -2 || e === -1 || e === 32;
}
const Nt = De(new RegExp("\\p{P}|\\p{S}", "u")), Oe = De(/\s/);
function De(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Qe(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let a = "";
    if (l === 37 && te(e.charCodeAt(t + 1)) && te(e.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (a = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const o = e.charCodeAt(t + 1);
      l < 56320 && o > 56319 && o < 57344 ? (a = String.fromCharCode(l, o), i = 1) : a = "�";
    } else
      a = String.fromCharCode(l);
    a && (n.push(e.slice(r, t), encodeURIComponent(a)), r = t + i + 1, a = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function M(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return a;
  function a(s) {
    return q(s) ? (e.enter(t), o(s)) : n(s);
  }
  function o(s) {
    return q(s) && l++ < i ? (e.consume(s), o) : (e.exit(t), n(s));
  }
}
const Hl = {
  tokenize: Vl
};
function Vl(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), M(e, n, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), l(o);
  }
  function l(o) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, a(o);
  }
  function a(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return T(o) ? (e.consume(o), e.exit("chunkText"), l) : (e.consume(o), a);
  }
}
const Wl = {
  tokenize: Zl
}, er = {
  tokenize: Ql
};
function Zl(e) {
  const n = this, t = [];
  let r = 0, i, l, a;
  return o;
  function o(v) {
    if (r < t.length) {
      const N = t[r];
      return n.containerState = N[1], e.attempt(N[0].continuation, s, u)(v);
    }
    return u(v);
  }
  function s(v) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && b();
      const N = n.events.length;
      let _ = N, S;
      for (; _--; )
        if (n.events[_][0] === "exit" && n.events[_][1].type === "chunkFlow") {
          S = n.events[_][1].end;
          break;
        }
      y(r);
      let O = N;
      for (; O < n.events.length; )
        n.events[O][1].end = {
          ...S
        }, O++;
      return se(n.events, _ + 1, 0, n.events.slice(N)), n.events.length = O, u(v);
    }
    return o(v);
  }
  function u(v) {
    if (r === t.length) {
      if (!i)
        return p(v);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return g(v);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(er, f, c)(v);
  }
  function f(v) {
    return i && b(), y(r), p(v);
  }
  function c(v) {
    return n.parser.lazy[n.now().line] = r !== t.length, a = n.now().offset, g(v);
  }
  function p(v) {
    return n.containerState = {}, e.attempt(er, h, g)(v);
  }
  function h(v) {
    return r++, t.push([n.currentConstruct, n.containerState]), p(v);
  }
  function g(v) {
    if (v === null) {
      i && b(), y(0), e.consume(v);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), k(v);
  }
  function k(v) {
    if (v === null) {
      A(e.exit("chunkFlow"), !0), y(0), e.consume(v);
      return;
    }
    return T(v) ? (e.consume(v), A(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, o) : (e.consume(v), k);
  }
  function A(v, N) {
    const _ = n.sliceStream(v);
    if (N && _.push(null), v.previous = l, l && (l.next = v), l = v, i.defineSkip(v.start), i.write(_), n.parser.lazy[v.start.line]) {
      let S = i.events.length;
      for (; S--; )
        if (
          // The token starts before the line ending…
          i.events[S][1].start.offset < a && // …and either is not ended yet…
          (!i.events[S][1].end || // …or ends after it.
          i.events[S][1].end.offset > a)
        )
          return;
      const O = n.events.length;
      let $ = O, D, x;
      for (; $--; )
        if (n.events[$][0] === "exit" && n.events[$][1].type === "chunkFlow") {
          if (D) {
            x = n.events[$][1].end;
            break;
          }
          D = !0;
        }
      for (y(r), S = O; S < n.events.length; )
        n.events[S][1].end = {
          ...x
        }, S++;
      se(n.events, $ + 1, 0, n.events.slice(O)), n.events.length = S;
    }
  }
  function y(v) {
    let N = t.length;
    for (; N-- > v; ) {
      const _ = t[N];
      n.containerState = _[1], _[0].exit.call(n, e);
    }
    t.length = v;
  }
  function b() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function Ql(e, n, t) {
  return M(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Ze(e) {
  if (e === null || H(e) || Oe(e))
    return 1;
  if (Nt(e))
    return 2;
}
function _t(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && (n = l(n, t), r.push(l));
  }
  return n;
}
const on = {
  name: "attention",
  resolveAll: Yl,
  tokenize: Gl
};
function Yl(e, n) {
  let t = -1, r, i, l, a, o, s, u, f;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, p = {
            ...e[t][1].start
          };
          tr(c, -s), tr(p, s), a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, o = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: p
          }, l = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...a.start
            },
            end: {
              ...o.end
            }
          }, e[r][1].end = {
            ...a.start
          }, e[t][1].start = {
            ...o.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = fe(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = fe(u, [["enter", i, n], ["enter", a, n], ["exit", a, n], ["enter", l, n]]), u = fe(u, _t(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = fe(u, [["exit", l, n], ["enter", o, n], ["exit", o, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (f = 2, u = fe(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : f = 0, se(e, r - 1, t - r + 3, u), t = r + u.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Gl(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Ze(r);
  let l;
  return a;
  function a(s) {
    return l = s, e.enter("attentionSequence"), o(s);
  }
  function o(s) {
    if (s === l)
      return e.consume(s), o;
    const u = e.exit("attentionSequence"), f = Ze(s), c = !f || f === 2 && i || t.includes(s), p = !i || i === 2 && f || t.includes(r);
    return u._open = !!(l === 42 ? c : c && (i || !p)), u._close = !!(l === 42 ? p : p && (f || !c)), n(s);
  }
}
function tr(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Kl = {
  name: "autolink",
  tokenize: Xl
};
function Xl(e, n, t) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(h) {
    return ne(h) ? (e.consume(h), a) : h === 64 ? t(h) : u(h);
  }
  function a(h) {
    return h === 43 || h === 45 || h === 46 || te(h) ? (r = 1, o(h)) : u(h);
  }
  function o(h) {
    return h === 58 ? (e.consume(h), r = 0, s) : (h === 43 || h === 45 || h === 46 || te(h)) && r++ < 32 ? (e.consume(h), o) : (r = 0, u(h));
  }
  function s(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : h === null || h === 32 || h === 60 || vt(h) ? t(h) : (e.consume(h), s);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), f) : $l(h) ? (e.consume(h), u) : t(h);
  }
  function f(h) {
    return te(h) ? c(h) : t(h);
  }
  function c(h) {
    return h === 46 ? (e.consume(h), r = 0, f) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), n) : p(h);
  }
  function p(h) {
    if ((h === 45 || te(h)) && r++ < 63) {
      const g = h === 45 ? p : c;
      return e.consume(h), g;
    }
    return t(h);
  }
}
const ft = {
  partial: !0,
  tokenize: Jl
};
function Jl(e, n, t) {
  return r;
  function r(l) {
    return q(l) ? M(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || T(l) ? n(l) : t(l);
  }
}
const Qr = {
  continuation: {
    tokenize: ta
  },
  exit: na,
  name: "blockQuote",
  tokenize: ea
};
function ea(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    if (a === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), l;
    }
    return t(a);
  }
  function l(a) {
    return q(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(a));
  }
}
function ta(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return q(a) ? M(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a) : l(a);
  }
  function l(a) {
    return e.attempt(Qr, n, t)(a);
  }
}
function na(e) {
  e.exit("blockQuote");
}
const Yr = {
  name: "characterEscape",
  tokenize: ra
};
function ra(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Ul(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const Gr = {
  name: "characterReference",
  tokenize: ia
};
function ia(e, n, t) {
  const r = this;
  let i = 0, l, a;
  return o;
  function o(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, a = te, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, a = jl, f) : (e.enter("characterReferenceValue"), l = 7, a = an, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const p = e.exit("characterReferenceValue");
      return a === te && !bn(r.sliceSerialize(p)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return a(c) && i++ < l ? (e.consume(c), f) : t(c);
  }
}
const nr = {
  partial: !0,
  tokenize: aa
}, rr = {
  concrete: !0,
  name: "codeFenced",
  tokenize: la
};
function la(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: _
  };
  let l = 0, a = 0, o;
  return s;
  function s(S) {
    return u(S);
  }
  function u(S) {
    const O = r.events[r.events.length - 1];
    return l = O && O[1].type === "linePrefix" ? O[2].sliceSerialize(O[1], !0).length : 0, o = S, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(S);
  }
  function f(S) {
    return S === o ? (a++, e.consume(S), f) : a < 3 ? t(S) : (e.exit("codeFencedFenceSequence"), q(S) ? M(e, c, "whitespace")(S) : c(S));
  }
  function c(S) {
    return S === null || T(S) ? (e.exit("codeFencedFence"), r.interrupt ? n(S) : e.check(nr, k, N)(S)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(S));
  }
  function p(S) {
    return S === null || T(S) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(S)) : q(S) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), M(e, h, "whitespace")(S)) : S === 96 && S === o ? t(S) : (e.consume(S), p);
  }
  function h(S) {
    return S === null || T(S) ? c(S) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(S));
  }
  function g(S) {
    return S === null || T(S) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(S)) : S === 96 && S === o ? t(S) : (e.consume(S), g);
  }
  function k(S) {
    return e.attempt(i, N, A)(S);
  }
  function A(S) {
    return e.enter("lineEnding"), e.consume(S), e.exit("lineEnding"), y;
  }
  function y(S) {
    return l > 0 && q(S) ? M(e, b, "linePrefix", l + 1)(S) : b(S);
  }
  function b(S) {
    return S === null || T(S) ? e.check(nr, k, N)(S) : (e.enter("codeFlowValue"), v(S));
  }
  function v(S) {
    return S === null || T(S) ? (e.exit("codeFlowValue"), b(S)) : (e.consume(S), v);
  }
  function N(S) {
    return e.exit("codeFenced"), n(S);
  }
  function _(S, O, $) {
    let D = 0;
    return x;
    function x(B) {
      return S.enter("lineEnding"), S.consume(B), S.exit("lineEnding"), z;
    }
    function z(B) {
      return S.enter("codeFencedFence"), q(B) ? M(S, F, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(B) : F(B);
    }
    function F(B) {
      return B === o ? (S.enter("codeFencedFenceSequence"), j(B)) : $(B);
    }
    function j(B) {
      return B === o ? (D++, S.consume(B), j) : D >= a ? (S.exit("codeFencedFenceSequence"), q(B) ? M(S, Z, "whitespace")(B) : Z(B)) : $(B);
    }
    function Z(B) {
      return B === null || T(B) ? (S.exit("codeFencedFence"), O(B)) : $(B);
    }
  }
}
function aa(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return a === null ? t(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), l);
  }
  function l(a) {
    return r.parser.lazy[r.now().line] ? t(a) : n(a);
  }
}
const Ht = {
  name: "codeIndented",
  tokenize: sa
}, oa = {
  partial: !0,
  tokenize: ua
};
function sa(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), M(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? a(u) : t(u);
  }
  function a(u) {
    return u === null ? s(u) : T(u) ? e.attempt(oa, a, s)(u) : (e.enter("codeFlowValue"), o(u));
  }
  function o(u) {
    return u === null || T(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), o);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function ua(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return r.parser.lazy[r.now().line] ? t(a) : T(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), i) : M(e, l, "linePrefix", 5)(a);
  }
  function l(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? n(a) : T(a) ? i(a) : t(a);
  }
}
const ca = {
  name: "codeText",
  previous: ha,
  resolve: fa,
  tokenize: pa
};
function fa(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function ha(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function pa(e, n, t) {
  let r = 0, i, l;
  return a;
  function a(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(c);
  }
  function o(c) {
    return c === 96 ? (e.consume(c), r++, o) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (l = e.enter("codeTextSequence"), i = 0, f(c)) : T(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || T(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (l.type = "codeTextData", u(c));
  }
}
class da {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Je(this.left, r), l.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), Je(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), Je(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        Je(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Je(this.left, t.reverse());
      }
  }
}
function Je(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function Kr(e) {
  const n = {};
  let t = -1, r, i, l, a, o, s, u;
  const f = new da(e);
  for (; ++t < f.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = f.get(t), t && r[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, l = 0, l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2), l < s.length && s[l][1].type === "content"))
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" && (s[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, ma(f, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (a = f.get(l), a[1].type === "lineEnding" || a[1].type === "lineEndingBlank")
          a[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", i = l);
        else if (!(a[1].type === "linePrefix" || a[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, o = f.slice(i, t), o.unshift(r), f.splice(i, t - i + 1, o));
    }
  }
  return se(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function ma(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let a = t._tokenizer;
  a || (a = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (a._contentTypeTextTrailing = !0));
  const o = a.events, s = [], u = {};
  let f, c, p = -1, h = t, g = 0, k = 0;
  const A = [k];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    l.push(i), h._tokenizer || (f = r.sliceStream(h), h.next || f.push(null), c && a.defineSkip(h.start), h._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(f), h._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = t; ++p < o.length; )
    // Find a void token that includes a break.
    o[p][0] === "exit" && o[p - 1][0] === "enter" && o[p][1].type === o[p - 1][1].type && o[p][1].start.line !== o[p][1].end.line && (k = p + 1, A.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (a.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : A.pop(), p = A.length; p--; ) {
    const y = o.slice(A[p], A[p + 1]), b = l.pop();
    s.push([b, b + y.length - 1]), e.splice(b, 2, y);
  }
  for (s.reverse(), p = -1; ++p < s.length; )
    u[g + s[p][0]] = g + s[p][1], g += s[p][1] - s[p][0] - 1;
  return u;
}
const ga = {
  resolve: ka,
  tokenize: ba
}, ya = {
  partial: !0,
  tokenize: xa
};
function ka(e) {
  return Kr(e), e;
}
function ba(e, n) {
  let t;
  return r;
  function r(o) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? l(o) : T(o) ? e.check(ya, a, l)(o) : (e.consume(o), i);
  }
  function l(o) {
    return e.exit("chunkContent"), e.exit("content"), n(o);
  }
  function a(o) {
    return e.consume(o), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function xa(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), M(e, l, "linePrefix");
  }
  function l(a) {
    if (a === null || T(a))
      return t(a);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? n(a) : e.interrupt(r.parser.constructs.flow, t, n)(a);
  }
}
function Xr(e, n, t, r, i, l, a, o, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(y), e.exit(l), p) : y === null || y === 32 || y === 41 || vt(y) ? t(y) : (e.enter(r), e.enter(a), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), k(y));
  }
  function p(y) {
    return y === 62 ? (e.enter(l), e.consume(y), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), h(y));
  }
  function h(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(o), p(y)) : y === null || y === 60 || T(y) ? t(y) : (e.consume(y), y === 92 ? g : h);
  }
  function g(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), h) : h(y);
  }
  function k(y) {
    return !f && (y === null || y === 41 || H(y)) ? (e.exit("chunkString"), e.exit(o), e.exit(a), e.exit(r), n(y)) : f < u && y === 40 ? (e.consume(y), f++, k) : y === 41 ? (e.consume(y), f--, k) : y === null || y === 32 || y === 40 || vt(y) ? t(y) : (e.consume(y), y === 92 ? A : k);
  }
  function A(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), k) : k(y);
  }
}
function Jr(e, n, t, r, i, l) {
  const a = this;
  let o = 0, s;
  return u;
  function u(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(l), f;
  }
  function f(h) {
    return o > 999 || h === null || h === 91 || h === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !o && "_hiddenFootnoteSupport" in a.parser.constructs ? t(h) : h === 93 ? (e.exit(l), e.enter(i), e.consume(h), e.exit(i), e.exit(r), n) : T(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || T(h) || o++ > 999 ? (e.exit("chunkString"), f(h)) : (e.consume(h), s || (s = !q(h)), h === 92 ? p : c);
  }
  function p(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), o++, c) : c(h);
  }
}
function ei(e, n, t, r, i, l) {
  let a;
  return o;
  function o(p) {
    return p === 34 || p === 39 || p === 40 ? (e.enter(r), e.enter(i), e.consume(p), e.exit(i), a = p === 40 ? 41 : p, s) : t(p);
  }
  function s(p) {
    return p === a ? (e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : (e.enter(l), u(p));
  }
  function u(p) {
    return p === a ? (e.exit(l), s(a)) : p === null ? t(p) : T(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), M(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(p));
  }
  function f(p) {
    return p === a || p === null || T(p) ? (e.exit("chunkString"), u(p)) : (e.consume(p), p === 92 ? c : f);
  }
  function c(p) {
    return p === a || p === 92 ? (e.consume(p), f) : f(p);
  }
}
function lt(e, n) {
  let t;
  return r;
  function r(i) {
    return T(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : q(i) ? M(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const wa = {
  name: "definition",
  tokenize: Ca
}, Sa = {
  partial: !0,
  tokenize: va
};
function Ca(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(h) {
    return e.enter("definition"), a(h);
  }
  function a(h) {
    return Jr.call(
      r,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function o(h) {
    return i = ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), s) : t(h);
  }
  function s(h) {
    return H(h) ? lt(e, u)(h) : u(h);
  }
  function u(h) {
    return Xr(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function f(h) {
    return e.attempt(Sa, c, c)(h);
  }
  function c(h) {
    return q(h) ? M(e, p, "whitespace")(h) : p(h);
  }
  function p(h) {
    return h === null || T(h) ? (e.exit("definition"), r.parser.defined.push(i), n(h)) : t(h);
  }
}
function va(e, n, t) {
  return r;
  function r(o) {
    return H(o) ? lt(e, i)(o) : t(o);
  }
  function i(o) {
    return ei(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function l(o) {
    return q(o) ? M(e, a, "whitespace")(o) : a(o);
  }
  function a(o) {
    return o === null || T(o) ? n(o) : t(o);
  }
}
const Aa = {
  name: "hardBreakEscape",
  tokenize: Ea
};
function Ea(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return T(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const Ia = {
  name: "headingAtx",
  resolve: Ta,
  tokenize: za
};
function Ta(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, se(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function za(e, n, t) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), l(f);
  }
  function l(f) {
    return e.enter("atxHeadingSequence"), a(f);
  }
  function a(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), a) : f === null || H(f) ? (e.exit("atxHeadingSequence"), o(f)) : t(f);
  }
  function o(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || T(f) ? (e.exit("atxHeading"), n(f)) : q(f) ? M(e, o, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), o(f));
  }
  function u(f) {
    return f === null || f === 35 || H(f) ? (e.exit("atxHeadingText"), o(f)) : (e.consume(f), u);
  }
}
const Fa = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], ir = ["pre", "script", "style", "textarea"], Pa = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Da,
  tokenize: La
}, Na = {
  partial: !0,
  tokenize: qa
}, _a = {
  partial: !0,
  tokenize: Ma
};
function Da(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function La(e, n, t) {
  const r = this;
  let i, l, a, o, s;
  return u;
  function u(m) {
    return f(m);
  }
  function f(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), c;
  }
  function c(m) {
    return m === 33 ? (e.consume(m), p) : m === 47 ? (e.consume(m), l = !0, k) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? n : d) : ne(m) ? (e.consume(m), a = String.fromCharCode(m), A) : t(m);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), i = 2, h) : m === 91 ? (e.consume(m), i = 5, o = 0, g) : ne(m) ? (e.consume(m), i = 4, r.interrupt ? n : d) : t(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? n : d) : t(m);
  }
  function g(m) {
    const de = "CDATA[";
    return m === de.charCodeAt(o++) ? (e.consume(m), o === de.length ? r.interrupt ? n : F : g) : t(m);
  }
  function k(m) {
    return ne(m) ? (e.consume(m), a = String.fromCharCode(m), A) : t(m);
  }
  function A(m) {
    if (m === null || m === 47 || m === 62 || H(m)) {
      const de = m === 47, Le = a.toLowerCase();
      return !de && !l && ir.includes(Le) ? (i = 1, r.interrupt ? n(m) : F(m)) : Fa.includes(a.toLowerCase()) ? (i = 6, de ? (e.consume(m), y) : r.interrupt ? n(m) : F(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : l ? b(m) : v(m));
    }
    return m === 45 || te(m) ? (e.consume(m), a += String.fromCharCode(m), A) : t(m);
  }
  function y(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? n : F) : t(m);
  }
  function b(m) {
    return q(m) ? (e.consume(m), b) : x(m);
  }
  function v(m) {
    return m === 47 ? (e.consume(m), x) : m === 58 || m === 95 || ne(m) ? (e.consume(m), N) : q(m) ? (e.consume(m), v) : x(m);
  }
  function N(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || te(m) ? (e.consume(m), N) : _(m);
  }
  function _(m) {
    return m === 61 ? (e.consume(m), S) : q(m) ? (e.consume(m), _) : v(m);
  }
  function S(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), s = m, O) : q(m) ? (e.consume(m), S) : $(m);
  }
  function O(m) {
    return m === s ? (e.consume(m), s = null, D) : m === null || T(m) ? t(m) : (e.consume(m), O);
  }
  function $(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || H(m) ? _(m) : (e.consume(m), $);
  }
  function D(m) {
    return m === 47 || m === 62 || q(m) ? v(m) : t(m);
  }
  function x(m) {
    return m === 62 ? (e.consume(m), z) : t(m);
  }
  function z(m) {
    return m === null || T(m) ? F(m) : q(m) ? (e.consume(m), z) : t(m);
  }
  function F(m) {
    return m === 45 && i === 2 ? (e.consume(m), J) : m === 60 && i === 1 ? (e.consume(m), K) : m === 62 && i === 4 ? (e.consume(m), pe) : m === 63 && i === 3 ? (e.consume(m), d) : m === 93 && i === 5 ? (e.consume(m), we) : T(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Na, Se, j)(m)) : m === null || T(m) ? (e.exit("htmlFlowData"), j(m)) : (e.consume(m), F);
  }
  function j(m) {
    return e.check(_a, Z, Se)(m);
  }
  function Z(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), B;
  }
  function B(m) {
    return m === null || T(m) ? j(m) : (e.enter("htmlFlowData"), F(m));
  }
  function J(m) {
    return m === 45 ? (e.consume(m), d) : F(m);
  }
  function K(m) {
    return m === 47 ? (e.consume(m), a = "", he) : F(m);
  }
  function he(m) {
    if (m === 62) {
      const de = a.toLowerCase();
      return ir.includes(de) ? (e.consume(m), pe) : F(m);
    }
    return ne(m) && a.length < 8 ? (e.consume(m), a += String.fromCharCode(m), he) : F(m);
  }
  function we(m) {
    return m === 93 ? (e.consume(m), d) : F(m);
  }
  function d(m) {
    return m === 62 ? (e.consume(m), pe) : m === 45 && i === 2 ? (e.consume(m), d) : F(m);
  }
  function pe(m) {
    return m === null || T(m) ? (e.exit("htmlFlowData"), Se(m)) : (e.consume(m), pe);
  }
  function Se(m) {
    return e.exit("htmlFlow"), n(m);
  }
}
function Ma(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return T(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), l) : t(a);
  }
  function l(a) {
    return r.parser.lazy[r.now().line] ? t(a) : n(a);
  }
}
function qa(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(ft, n, t);
  }
}
const Oa = {
  name: "htmlText",
  tokenize: Ra
};
function Ra(e, n, t) {
  const r = this;
  let i, l, a;
  return o;
  function o(d) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(d), s;
  }
  function s(d) {
    return d === 33 ? (e.consume(d), u) : d === 47 ? (e.consume(d), _) : d === 63 ? (e.consume(d), v) : ne(d) ? (e.consume(d), $) : t(d);
  }
  function u(d) {
    return d === 45 ? (e.consume(d), f) : d === 91 ? (e.consume(d), l = 0, g) : ne(d) ? (e.consume(d), b) : t(d);
  }
  function f(d) {
    return d === 45 ? (e.consume(d), h) : t(d);
  }
  function c(d) {
    return d === null ? t(d) : d === 45 ? (e.consume(d), p) : T(d) ? (a = c, K(d)) : (e.consume(d), c);
  }
  function p(d) {
    return d === 45 ? (e.consume(d), h) : c(d);
  }
  function h(d) {
    return d === 62 ? J(d) : d === 45 ? p(d) : c(d);
  }
  function g(d) {
    const pe = "CDATA[";
    return d === pe.charCodeAt(l++) ? (e.consume(d), l === pe.length ? k : g) : t(d);
  }
  function k(d) {
    return d === null ? t(d) : d === 93 ? (e.consume(d), A) : T(d) ? (a = k, K(d)) : (e.consume(d), k);
  }
  function A(d) {
    return d === 93 ? (e.consume(d), y) : k(d);
  }
  function y(d) {
    return d === 62 ? J(d) : d === 93 ? (e.consume(d), y) : k(d);
  }
  function b(d) {
    return d === null || d === 62 ? J(d) : T(d) ? (a = b, K(d)) : (e.consume(d), b);
  }
  function v(d) {
    return d === null ? t(d) : d === 63 ? (e.consume(d), N) : T(d) ? (a = v, K(d)) : (e.consume(d), v);
  }
  function N(d) {
    return d === 62 ? J(d) : v(d);
  }
  function _(d) {
    return ne(d) ? (e.consume(d), S) : t(d);
  }
  function S(d) {
    return d === 45 || te(d) ? (e.consume(d), S) : O(d);
  }
  function O(d) {
    return T(d) ? (a = O, K(d)) : q(d) ? (e.consume(d), O) : J(d);
  }
  function $(d) {
    return d === 45 || te(d) ? (e.consume(d), $) : d === 47 || d === 62 || H(d) ? D(d) : t(d);
  }
  function D(d) {
    return d === 47 ? (e.consume(d), J) : d === 58 || d === 95 || ne(d) ? (e.consume(d), x) : T(d) ? (a = D, K(d)) : q(d) ? (e.consume(d), D) : J(d);
  }
  function x(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || te(d) ? (e.consume(d), x) : z(d);
  }
  function z(d) {
    return d === 61 ? (e.consume(d), F) : T(d) ? (a = z, K(d)) : q(d) ? (e.consume(d), z) : D(d);
  }
  function F(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), i = d, j) : T(d) ? (a = F, K(d)) : q(d) ? (e.consume(d), F) : (e.consume(d), Z);
  }
  function j(d) {
    return d === i ? (e.consume(d), i = void 0, B) : d === null ? t(d) : T(d) ? (a = j, K(d)) : (e.consume(d), j);
  }
  function Z(d) {
    return d === null || d === 34 || d === 39 || d === 60 || d === 61 || d === 96 ? t(d) : d === 47 || d === 62 || H(d) ? D(d) : (e.consume(d), Z);
  }
  function B(d) {
    return d === 47 || d === 62 || H(d) ? D(d) : t(d);
  }
  function J(d) {
    return d === 62 ? (e.consume(d), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(d);
  }
  function K(d) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), he;
  }
  function he(d) {
    return q(d) ? M(e, we, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : we(d);
  }
  function we(d) {
    return e.enter("htmlTextData"), a(d);
  }
}
const xn = {
  name: "labelEnd",
  resolveAll: Ua,
  resolveTo: Ha,
  tokenize: Va
}, Ba = {
  tokenize: Wa
}, $a = {
  tokenize: Za
}, ja = {
  tokenize: Qa
};
function Ua(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && se(e, 0, e.length, t), e;
}
function Ha(e, n) {
  let t = e.length, r = 0, i, l, a, o;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (a) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (a = t);
  const s = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[a][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[a - 2][1].start
    }
  };
  return o = [["enter", s, n], ["enter", u, n]], o = fe(o, e.slice(l + 1, l + r + 3)), o = fe(o, [["enter", f, n]]), o = fe(o, _t(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, a - 3), n)), o = fe(o, [["exit", f, n], e[a - 2], e[a - 1], ["exit", u, n]]), o = fe(o, e.slice(a + 1)), o = fe(o, [["exit", s, n]]), se(e, l, e.length, o), e;
}
function Va(e, n, t) {
  const r = this;
  let i = r.events.length, l, a;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return o;
  function o(p) {
    return l ? l._inactive ? c(p) : (a = r.parser.defined.includes(ye(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(p), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(p);
  }
  function s(p) {
    return p === 40 ? e.attempt(Ba, f, a ? f : c)(p) : p === 91 ? e.attempt($a, f, a ? u : c)(p) : a ? f(p) : c(p);
  }
  function u(p) {
    return e.attempt(ja, f, c)(p);
  }
  function f(p) {
    return n(p);
  }
  function c(p) {
    return l._balanced = !0, t(p);
  }
}
function Wa(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return H(c) ? lt(e, l)(c) : l(c);
  }
  function l(c) {
    return c === 41 ? f(c) : Xr(e, a, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function a(c) {
    return H(c) ? lt(e, s)(c) : f(c);
  }
  function o(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? ei(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return H(c) ? lt(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function Za(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return Jr.call(r, e, l, a, "reference", "referenceMarker", "referenceString")(o);
  }
  function l(o) {
    return r.parser.defined.includes(ye(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(o) : t(o);
  }
  function a(o) {
    return t(o);
  }
}
function Qa(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const Ya = {
  name: "labelStartImage",
  resolveAll: xn.resolveAll,
  tokenize: Ga
};
function Ga(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), l;
  }
  function l(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), a) : t(o);
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const Ka = {
  name: "labelStartLink",
  resolveAll: xn.resolveAll,
  tokenize: Xa
};
function Xa(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const Vt = {
  name: "lineEnding",
  tokenize: Ja
};
function Ja(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), M(e, n, "linePrefix");
  }
}
const St = {
  name: "thematicBreak",
  tokenize: eo
};
function eo(e, n, t) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), a(u);
  }
  function a(u) {
    return i = u, o(u);
  }
  function o(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || T(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), q(u) ? M(e, o, "whitespace")(u) : o(u));
  }
}
const re = {
  continuation: {
    tokenize: io
  },
  exit: ao,
  name: "list",
  tokenize: ro
}, to = {
  partial: !0,
  tokenize: oo
}, no = {
  partial: !0,
  tokenize: lo
};
function ro(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, a = 0;
  return o;
  function o(h) {
    const g = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : an(h)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(St, t, u)(h) : u(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(h);
    }
    return t(h);
  }
  function s(h) {
    return an(h) && ++a < 10 ? (e.consume(h), s) : (!r.interrupt || a < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : t(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      ft,
      // Can’t be empty when interrupting.
      r.interrupt ? t : f,
      e.attempt(to, p, c)
    );
  }
  function f(h) {
    return r.containerState.initialBlankLine = !0, l++, p(h);
  }
  function c(h) {
    return q(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), p) : t(h);
  }
  function p(h) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(h);
  }
}
function io(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(ft, i, l);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, M(e, n, "listItemIndent", r.containerState.size + 1)(o);
  }
  function l(o) {
    return r.containerState.furtherBlankLines || !q(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, a(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(no, n, a)(o));
  }
  function a(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, M(e, e.attempt(re, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function lo(e, n, t) {
  const r = this;
  return M(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function ao(e) {
  e.exit(this.containerState.type);
}
function oo(e, n, t) {
  const r = this;
  return M(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return !q(l) && a && a[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const lr = {
  name: "setextUnderline",
  resolveTo: so,
  tokenize: uo
};
function so(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const a = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", a, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = a, e.push(["exit", a, n]), e;
}
function uo(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = u, a(u)) : t(u);
  }
  function a(u) {
    return e.enter("setextHeadingLineSequence"), o(u);
  }
  function o(u) {
    return u === i ? (e.consume(u), o) : (e.exit("setextHeadingLineSequence"), q(u) ? M(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || T(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const co = {
  tokenize: fo
};
function fo(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    ft,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, M(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ga, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const ho = {
  resolveAll: ni()
}, po = ti("string"), mo = ti("text");
function ti(e) {
  return {
    resolveAll: ni(e === "text" ? go : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, a, o);
    return a;
    function a(f) {
      return u(f) ? l(f) : o(f);
    }
    function o(f) {
      if (f === null) {
        t.consume(f);
        return;
      }
      return t.enter("data"), t.consume(f), s;
    }
    function s(f) {
      return u(f) ? (t.exit("data"), l(f)) : (t.consume(f), s);
    }
    function u(f) {
      if (f === null)
        return !0;
      const c = i[f];
      let p = -1;
      if (c)
        for (; ++p < c.length; ) {
          const h = c[p];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ni(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function go(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, a = -1, o = 0, s;
      for (; l--; ) {
        const u = i[l];
        if (typeof u == "string") {
          for (a = u.length; u.charCodeAt(a - 1) === 32; )
            o++, a--;
          if (a) break;
          a = -1;
        } else if (u === -2)
          s = !0, o++;
        else if (u !== -1) {
          l++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (o = 0), o) {
        const u = {
          type: t === e.length || s || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? a : r.start._bufferIndex + a,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const yo = {
  42: re,
  43: re,
  45: re,
  48: re,
  49: re,
  50: re,
  51: re,
  52: re,
  53: re,
  54: re,
  55: re,
  56: re,
  57: re,
  62: Qr
}, ko = {
  91: wa
}, bo = {
  [-2]: Ht,
  [-1]: Ht,
  32: Ht
}, xo = {
  35: Ia,
  42: St,
  45: [lr, St],
  60: Pa,
  61: lr,
  95: St,
  96: rr,
  126: rr
}, wo = {
  38: Gr,
  92: Yr
}, So = {
  [-5]: Vt,
  [-4]: Vt,
  [-3]: Vt,
  33: Ya,
  38: Gr,
  42: on,
  60: [Kl, Oa],
  91: Ka,
  92: [Aa, Yr],
  93: xn,
  95: on,
  96: ca
}, Co = {
  null: [on, ho]
}, vo = {
  null: [42, 95]
}, Ao = {
  null: []
}, Eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: vo,
  contentInitial: ko,
  disable: Ao,
  document: yo,
  flow: xo,
  flowInitial: bo,
  insideSpan: Co,
  string: wo,
  text: So
}, Symbol.toStringTag, { value: "Module" }));
function Io(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let a = [], o = [];
  const s = {
    attempt: O(_),
    check: O(S),
    consume: b,
    enter: v,
    exit: N,
    interrupt: O(S, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: k,
    events: [],
    now: g,
    parser: e,
    previous: null,
    sliceSerialize: p,
    sliceStream: h,
    write: c
  };
  let f = n.tokenize.call(u, s);
  return n.resolveAll && l.push(n), u;
  function c(z) {
    return a = fe(a, z), A(), a[a.length - 1] !== null ? [] : ($(n, 0), u.events = _t(l, u.events, u), u.events);
  }
  function p(z, F) {
    return zo(h(z), F);
  }
  function h(z) {
    return To(a, z);
  }
  function g() {
    const {
      _bufferIndex: z,
      _index: F,
      line: j,
      column: Z,
      offset: B
    } = r;
    return {
      _bufferIndex: z,
      _index: F,
      line: j,
      column: Z,
      offset: B
    };
  }
  function k(z) {
    i[z.line] = z.column, x();
  }
  function A() {
    let z;
    for (; r._index < a.length; ) {
      const F = a[r._index];
      if (typeof F == "string")
        for (z = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === z && r._bufferIndex < F.length; )
          y(F.charCodeAt(r._bufferIndex));
      else
        y(F);
    }
  }
  function y(z) {
    f = f(z);
  }
  function b(z) {
    T(z) ? (r.line++, r.column = 1, r.offset += z === -3 ? 2 : 1, x()) : z !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    a[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = z;
  }
  function v(z, F) {
    const j = F || {};
    return j.type = z, j.start = g(), u.events.push(["enter", j, u]), o.push(j), j;
  }
  function N(z) {
    const F = o.pop();
    return F.end = g(), u.events.push(["exit", F, u]), F;
  }
  function _(z, F) {
    $(z, F.from);
  }
  function S(z, F) {
    F.restore();
  }
  function O(z, F) {
    return j;
    function j(Z, B, J) {
      let K, he, we, d;
      return Array.isArray(Z) ? (
        /* c8 ignore next 1 */
        Se(Z)
      ) : "tokenize" in Z ? (
        // Looks like a construct.
        Se([
          /** @type {Construct} */
          Z
        ])
      ) : pe(Z);
      function pe(X) {
        return Ge;
        function Ge(ze) {
          const Be = ze !== null && X[ze], $e = ze !== null && X.null, pt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Be) ? Be : Be ? [Be] : [],
            ...Array.isArray($e) ? $e : $e ? [$e] : []
          ];
          return Se(pt)(ze);
        }
      }
      function Se(X) {
        return K = X, he = 0, X.length === 0 ? J : m(X[he]);
      }
      function m(X) {
        return Ge;
        function Ge(ze) {
          return d = D(), we = X, X.partial || (u.currentConstruct = X), X.name && u.parser.constructs.disable.null.includes(X.name) ? Le() : X.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            F ? Object.assign(Object.create(u), F) : u,
            s,
            de,
            Le
          )(ze);
        }
      }
      function de(X) {
        return z(we, d), B;
      }
      function Le(X) {
        return d.restore(), ++he < K.length ? m(K[he]) : J;
      }
    }
  }
  function $(z, F) {
    z.resolveAll && !l.includes(z) && l.push(z), z.resolve && se(u.events, F, u.events.length - F, z.resolve(u.events.slice(F), u)), z.resolveTo && (u.events = z.resolveTo(u.events, u));
  }
  function D() {
    const z = g(), F = u.previous, j = u.currentConstruct, Z = u.events.length, B = Array.from(o);
    return {
      from: Z,
      restore: J
    };
    function J() {
      r = z, u.previous = F, u.currentConstruct = j, u.events.length = Z, o = B, x();
    }
  }
  function x() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function To(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let a;
  if (t === i)
    a = [e[t].slice(r, l)];
  else {
    if (a = e.slice(t, i), r > -1) {
      const o = a[0];
      typeof o == "string" ? a[0] = o.slice(r) : a.shift();
    }
    l > 0 && a.push(e[i].slice(0, l));
  }
  return a;
}
function zo(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let a;
    if (typeof l == "string")
      a = l;
    else switch (l) {
      case -5: {
        a = "\r";
        break;
      }
      case -4: {
        a = `
`;
        break;
      }
      case -3: {
        a = `\r
`;
        break;
      }
      case -2: {
        a = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        a = " ";
        break;
      }
      default:
        a = String.fromCharCode(l);
    }
    i = l === -2, r.push(a);
  }
  return r.join("");
}
function Fo(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Wr([Eo, ...(e || {}).extensions || []])
    ),
    content: i(Hl),
    defined: [],
    document: i(Wl),
    flow: i(co),
    lazy: {},
    string: i(po),
    text: i(mo)
  };
  return r;
  function i(l) {
    return a;
    function a(o) {
      return Io(r, l, o);
    }
  }
}
function Po(e) {
  for (; !Kr(e); )
    ;
  return e;
}
const ar = /[\0\t\n\r]/g;
function No() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, a, o) {
    const s = [];
    let u, f, c, p, h;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(a || void 0).decode(l)), c = 0, n = "", t && (l.charCodeAt(0) === 65279 && c++, t = void 0); c < l.length; ) {
      if (ar.lastIndex = c, u = ar.exec(l), p = u && u.index !== void 0 ? u.index : l.length, h = l.charCodeAt(p), !u) {
        n = l.slice(c);
        break;
      }
      if (h === 10 && c === p && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), c < p && (s.push(l.slice(c, p)), e += p - c), h) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, s.push(-2); e++ < f; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = p + 1;
    }
    return o && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const _o = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Do(e) {
  return e.replace(_o, Lo);
}
function Lo(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return Zr(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return bn(t) || e;
}
const ri = {}.hasOwnProperty;
function Mo(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), qo(t)(Po(Fo(t).document().write(No()(e, n, !0))));
}
function qo(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(qn),
      autolinkProtocol: D,
      autolinkEmail: D,
      atxHeading: l(Dn),
      blockQuote: l($e),
      characterEscape: D,
      characterReference: D,
      codeFenced: l(pt),
      codeFencedFenceInfo: a,
      codeFencedFenceMeta: a,
      codeIndented: l(pt, a),
      codeText: l(al, a),
      codeTextData: D,
      data: D,
      codeFlowValue: D,
      definition: l(ol),
      definitionDestinationString: a,
      definitionLabelString: a,
      definitionTitleString: a,
      emphasis: l(sl),
      hardBreakEscape: l(Ln),
      hardBreakTrailing: l(Ln),
      htmlFlow: l(Mn, a),
      htmlFlowData: D,
      htmlText: l(Mn, a),
      htmlTextData: D,
      image: l(ul),
      label: a,
      link: l(qn),
      listItem: l(cl),
      listItemValue: p,
      listOrdered: l(On, c),
      listUnordered: l(On),
      paragraph: l(fl),
      reference: m,
      referenceString: a,
      resourceDestinationString: a,
      resourceTitleString: a,
      setextHeading: l(Dn),
      strong: l(hl),
      thematicBreak: l(dl)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: _,
      autolink: s(),
      autolinkEmail: Be,
      autolinkProtocol: ze,
      blockQuote: s(),
      characterEscapeValue: x,
      characterReferenceMarkerHexadecimal: Le,
      characterReferenceMarkerNumeric: Le,
      characterReferenceValue: X,
      characterReference: Ge,
      codeFenced: s(A),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: g,
      codeFlowValue: x,
      codeIndented: s(y),
      codeText: s(B),
      codeTextData: x,
      data: x,
      definition: s(),
      definitionDestinationString: N,
      definitionLabelString: b,
      definitionTitleString: v,
      emphasis: s(),
      hardBreakEscape: s(F),
      hardBreakTrailing: s(F),
      htmlFlow: s(j),
      htmlFlowData: x,
      htmlText: s(Z),
      htmlTextData: x,
      image: s(K),
      label: we,
      labelText: he,
      lineEnding: z,
      link: s(J),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: de,
      resourceDestinationString: d,
      resourceTitleString: pe,
      resource: Se,
      setextHeading: s($),
      setextHeadingLineSequence: O,
      setextHeadingText: S,
      strong: s(),
      thematicBreak: s()
    }
  };
  ii(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(w) {
    let E = {
      type: "root",
      children: []
    };
    const P = {
      stack: [E],
      tokenStack: [],
      config: n,
      enter: o,
      exit: u,
      buffer: a,
      resume: f,
      data: t
    }, R = [];
    let U = -1;
    for (; ++U < w.length; )
      if (w[U][1].type === "listOrdered" || w[U][1].type === "listUnordered")
        if (w[U][0] === "enter")
          R.push(U);
        else {
          const me = R.pop();
          U = i(w, me, U);
        }
    for (U = -1; ++U < w.length; ) {
      const me = n[w[U][0]];
      ri.call(me, w[U][1].type) && me[w[U][1].type].call(Object.assign({
        sliceSerialize: w[U][2].sliceSerialize
      }, P), w[U][1]);
    }
    if (P.tokenStack.length > 0) {
      const me = P.tokenStack[P.tokenStack.length - 1];
      (me[1] || or).call(P, void 0, me[0]);
    }
    for (E.position = {
      start: Fe(w.length > 0 ? w[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Fe(w.length > 0 ? w[w.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, U = -1; ++U < n.transforms.length; )
      E = n.transforms[U](E) || E;
    return E;
  }
  function i(w, E, P) {
    let R = E - 1, U = -1, me = !1, Me, Ce, Ke, Xe;
    for (; ++R <= P; ) {
      const ae = w[R];
      switch (ae[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          ae[0] === "enter" ? U++ : U--, Xe = void 0;
          break;
        }
        case "lineEndingBlank": {
          ae[0] === "enter" && (Me && !Xe && !U && !Ke && (Ke = R), Xe = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Xe = void 0;
      }
      if (!U && ae[0] === "enter" && ae[1].type === "listItemPrefix" || U === -1 && ae[0] === "exit" && (ae[1].type === "listUnordered" || ae[1].type === "listOrdered")) {
        if (Me) {
          let je = R;
          for (Ce = void 0; je--; ) {
            const ve = w[je];
            if (ve[1].type === "lineEnding" || ve[1].type === "lineEndingBlank") {
              if (ve[0] === "exit") continue;
              Ce && (w[Ce][1].type = "lineEndingBlank", me = !0), ve[1].type = "lineEnding", Ce = je;
            } else if (!(ve[1].type === "linePrefix" || ve[1].type === "blockQuotePrefix" || ve[1].type === "blockQuotePrefixWhitespace" || ve[1].type === "blockQuoteMarker" || ve[1].type === "listItemIndent")) break;
          }
          Ke && (!Ce || Ke < Ce) && (Me._spread = !0), Me.end = Object.assign({}, Ce ? w[Ce][1].start : ae[1].end), w.splice(Ce || R, 0, ["exit", Me, ae[2]]), R++, P++;
        }
        if (ae[1].type === "listItemPrefix") {
          const je = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, ae[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Me = je, w.splice(R, 0, ["enter", je, ae[2]]), R++, P++, Ke = void 0, Xe = !0;
        }
      }
    }
    return w[E][1]._spread = me, P;
  }
  function l(w, E) {
    return P;
    function P(R) {
      o.call(this, w(R), R), E && E.call(this, R);
    }
  }
  function a() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(w, E, P) {
    this.stack[this.stack.length - 1].children.push(w), this.stack.push(w), this.tokenStack.push([E, P || void 0]), w.position = {
      start: Fe(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(w) {
    return E;
    function E(P) {
      w && w.call(this, P), u.call(this, P);
    }
  }
  function u(w, E) {
    const P = this.stack.pop(), R = this.tokenStack.pop();
    if (R)
      R[0].type !== w.type && (E ? E.call(this, w, R[0]) : (R[1] || or).call(this, w, R[0]));
    else throw new Error("Cannot close `" + w.type + "` (" + it({
      start: w.start,
      end: w.end
    }) + "): it’s not open");
    P.position.end = Fe(w.end);
  }
  function f() {
    return kn(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function p(w) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      E.start = Number.parseInt(this.sliceSerialize(w), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.lang = w;
  }
  function g() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.meta = w;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w.replace(/(\r?\n|\r)$/g, "");
  }
  function b(w) {
    const E = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = E, P.identifier = ye(this.sliceSerialize(w)).toLowerCase();
  }
  function v() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = w;
  }
  function N() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = w;
  }
  function _(w) {
    const E = this.stack[this.stack.length - 1];
    if (!E.depth) {
      const P = this.sliceSerialize(w).length;
      E.depth = P;
    }
  }
  function S() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function O(w) {
    const E = this.stack[this.stack.length - 1];
    E.depth = this.sliceSerialize(w).codePointAt(0) === 61 ? 1 : 2;
  }
  function $() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function D(w) {
    const P = this.stack[this.stack.length - 1].children;
    let R = P[P.length - 1];
    (!R || R.type !== "text") && (R = pl(), R.position = {
      start: Fe(w.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, P.push(R)), this.stack.push(R);
  }
  function x(w) {
    const E = this.stack.pop();
    E.value += this.sliceSerialize(w), E.position.end = Fe(w.end);
  }
  function z(w) {
    const E = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const P = E.children[E.children.length - 1];
      P.position.end = Fe(w.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(E.type) && (D.call(this, w), x.call(this, w));
  }
  function F() {
    this.data.atHardBreak = !0;
  }
  function j() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function Z() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function B() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.value = w;
  }
  function J() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = E, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function K() {
    const w = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      w.type += "Reference", w.referenceType = E, delete w.url, delete w.title;
    } else
      delete w.identifier, delete w.label;
    this.data.referenceType = void 0;
  }
  function he(w) {
    const E = this.sliceSerialize(w), P = this.stack[this.stack.length - 2];
    P.label = Do(E), P.identifier = ye(E).toLowerCase();
  }
  function we() {
    const w = this.stack[this.stack.length - 1], E = this.resume(), P = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, P.type === "link") {
      const R = w.children;
      P.children = R;
    } else
      P.alt = E;
  }
  function d() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.url = w;
  }
  function pe() {
    const w = this.resume(), E = this.stack[this.stack.length - 1];
    E.title = w;
  }
  function Se() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function de(w) {
    const E = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = E, P.identifier = ye(this.sliceSerialize(w)).toLowerCase(), this.data.referenceType = "full";
  }
  function Le(w) {
    this.data.characterReferenceType = w.type;
  }
  function X(w) {
    const E = this.sliceSerialize(w), P = this.data.characterReferenceType;
    let R;
    P ? (R = Zr(E, P === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : R = bn(E);
    const U = this.stack[this.stack.length - 1];
    U.value += R;
  }
  function Ge(w) {
    const E = this.stack.pop();
    E.position.end = Fe(w.end);
  }
  function ze(w) {
    x.call(this, w);
    const E = this.stack[this.stack.length - 1];
    E.url = this.sliceSerialize(w);
  }
  function Be(w) {
    x.call(this, w);
    const E = this.stack[this.stack.length - 1];
    E.url = "mailto:" + this.sliceSerialize(w);
  }
  function $e() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function pt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function al() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function ol() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function sl() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Dn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ln() {
    return {
      type: "break"
    };
  }
  function Mn() {
    return {
      type: "html",
      value: ""
    };
  }
  function ul() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function qn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function On(w) {
    return {
      type: "list",
      ordered: w.type === "listOrdered",
      start: null,
      spread: w._spread,
      children: []
    };
  }
  function cl(w) {
    return {
      type: "listItem",
      spread: w._spread,
      checked: null,
      children: []
    };
  }
  function fl() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function hl() {
    return {
      type: "strong",
      children: []
    };
  }
  function pl() {
    return {
      type: "text",
      value: ""
    };
  }
  function dl() {
    return {
      type: "thematicBreak"
    };
  }
}
function Fe(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ii(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? ii(e, r) : Oo(e, r);
  }
}
function Oo(e, n) {
  let t;
  for (t in n)
    if (ri.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function or(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + it({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + it({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + it({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function li(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return Mo(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
const Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: li
}, Symbol.toStringTag, { value: "Module" }));
function At(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, i = t.indexOf(n);
  for (; i !== -1; )
    r++, i = t.indexOf(n, i + n.length);
  return r;
}
function Bo(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
const Dt = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return Ho;
    if (typeof e == "function")
      return Lt(e);
    if (typeof e == "object")
      return Array.isArray(e) ? $o(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        jo(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Uo(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function $o(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Dt(e[t]);
  return Lt(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; )
      if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function jo(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Lt(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let l;
    for (l in e)
      if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function Uo(e) {
  return Lt(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Lt(e) {
  return n;
  function n(t, r, i) {
    return !!(Vo(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Ho() {
  return !0;
}
function Vo(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ai = [], Wo = !0, sn = !1, Ct = "skip";
function oi(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const l = Dt(i), a = r ? -1 : 1;
  o(e, void 0, [])();
  function o(s, u, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof c.type == "string") {
      const h = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(p, "name", {
        value: "node (" + (s.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return p;
    function p() {
      let h = ai, g, k, A;
      if ((!n || l(s, u, f[f.length - 1] || void 0)) && (h = Zo(t(s, f)), h[0] === sn))
        return h;
      if ("children" in s && s.children) {
        const y = (
          /** @type {UnistParent} */
          s
        );
        if (y.children && h[0] !== Ct)
          for (k = (r ? y.children.length : -1) + a, A = f.concat(y); k > -1 && k < y.children.length; ) {
            const b = y.children[k];
            if (g = o(b, k, A)(), g[0] === sn)
              return g;
            k = typeof g[1] == "number" ? g[1] : k + a;
          }
      }
      return h;
    }
  }
}
function Zo(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Wo, e] : e == null ? ai : [e];
}
function Qo(e, n, t) {
  const i = Dt((t || {}).ignore || []), l = Yo(n);
  let a = -1;
  for (; ++a < l.length; )
    oi(e, "text", o);
  function o(u, f) {
    let c = -1, p;
    for (; ++c < f.length; ) {
      const h = f[c], g = p ? p.children : void 0;
      if (i(
        h,
        g ? g.indexOf(h) : void 0,
        p
      ))
        return;
      p = h;
    }
    if (p)
      return s(u, f);
  }
  function s(u, f) {
    const c = f[f.length - 1], p = l[a][0], h = l[a][1];
    let g = 0;
    const A = c.children.indexOf(u);
    let y = !1, b = [];
    p.lastIndex = 0;
    let v = p.exec(u.value);
    for (; v; ) {
      const N = v.index, _ = {
        index: v.index,
        input: v.input,
        stack: [...f, u]
      };
      let S = h(...v, _);
      if (typeof S == "string" && (S = S.length > 0 ? { type: "text", value: S } : void 0), S === !1 ? p.lastIndex = N + 1 : (g !== N && b.push({
        type: "text",
        value: u.value.slice(g, N)
      }), Array.isArray(S) ? b.push(...S) : S && b.push(S), g = N + v[0].length, y = !0), !p.global)
        break;
      v = p.exec(u.value);
    }
    return y ? (g < u.value.length && b.push({ type: "text", value: u.value.slice(g) }), c.children.splice(A, 1, ...b)) : b = [u], A + b.length;
  }
}
function Yo(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([Go(i[0]), Ko(i[1])]);
  }
  return n;
}
function Go(e) {
  return typeof e == "string" ? new RegExp(Bo(e), "g") : e;
}
function Ko(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Wt = "phrasing", Zt = ["autolink", "link", "image", "label"];
function Xo() {
  return {
    transforms: [ls],
    enter: {
      literalAutolink: es,
      literalAutolinkEmail: Qt,
      literalAutolinkHttp: Qt,
      literalAutolinkWww: Qt
    },
    exit: {
      literalAutolink: is,
      literalAutolinkEmail: rs,
      literalAutolinkHttp: ts,
      literalAutolinkWww: ns
    }
  };
}
function Jo() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Wt,
        notInConstruct: Zt
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Wt,
        notInConstruct: Zt
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Wt,
        notInConstruct: Zt
      }
    ]
  };
}
function es(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Qt(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function ts(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function ns(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function rs(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function is(e) {
  this.exit(e);
}
function ls(e) {
  Qo(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, as],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), os]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function as(e, n, t, r, i) {
  let l = "";
  if (!si(i) || (/^w/i.test(n) && (t = n + t, n = "", l = "http://"), !ss(t)))
    return !1;
  const a = us(t + r);
  if (!a[0]) return !1;
  const o = {
    type: "link",
    title: null,
    url: l + n + a[0],
    children: [{ type: "text", value: n + a[0] }]
  };
  return a[1] ? [o, { type: "text", value: a[1] }] : o;
}
function os(e, n, t, r) {
  return (
    // Not an expected previous character.
    !si(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function ss(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function us(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const i = At(e, "(");
  let l = At(e, ")");
  for (; r !== -1 && i > l; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), l++;
  return [e, t];
}
function si(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Oe(t) || Nt(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
ui.peek = ks;
function cs() {
  this.buffer();
}
function fs(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function hs() {
  this.buffer();
}
function ps(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function ds(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function ms(e) {
  this.exit(e);
}
function gs(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = ye(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function ys(e) {
  this.exit(e);
}
function ks() {
  return "[";
}
function ui(e, n, t, r) {
  const i = t.createTracker(r);
  let l = i.move("[^");
  const a = t.enter("footnoteReference"), o = t.enter("reference");
  return l += i.move(
    t.safe(t.associationId(e), { after: "]", before: l })
  ), o(), a(), l += i.move("]"), l;
}
function bs() {
  return {
    enter: {
      gfmFootnoteCallString: cs,
      gfmFootnoteCall: fs,
      gfmFootnoteDefinitionLabelString: hs,
      gfmFootnoteDefinition: ps
    },
    exit: {
      gfmFootnoteCallString: ds,
      gfmFootnoteCall: ms,
      gfmFootnoteDefinitionLabelString: gs,
      gfmFootnoteDefinition: ys
    }
  };
}
function xs(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: ui },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, i, l, a) {
    const o = l.createTracker(a);
    let s = o.move("[^");
    const u = l.enter("footnoteDefinition"), f = l.enter("label");
    return s += o.move(
      l.safe(l.associationId(r), { before: s, after: "]" })
    ), f(), s += o.move("]:"), r.children && r.children.length > 0 && (o.shift(4), s += o.move(
      (n ? `
` : " ") + l.indentLines(
        l.containerFlow(r, o.current()),
        n ? ci : ws
      )
    )), u(), s;
  }
}
function ws(e, n, t) {
  return n === 0 ? e : ci(e, n, t);
}
function ci(e, n, t) {
  return (t ? "" : "    ") + e;
}
const Ss = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
fi.peek = Is;
function Cs() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: As },
    exit: { strikethrough: Es }
  };
}
function vs() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Ss
      }
    ],
    handlers: { delete: fi }
  };
}
function As(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Es(e) {
  this.exit(e);
}
function fi(e, n, t, r) {
  const i = t.createTracker(r), l = t.enter("strikethrough");
  let a = i.move("~~");
  return a += t.containerPhrasing(e, {
    ...i.current(),
    before: a,
    after: "~"
  }), a += i.move("~~"), l(), a;
}
function Is() {
  return "~";
}
function Ts(e) {
  return e.length;
}
function zs(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || Ts, l = [], a = [], o = [], s = [];
  let u = 0, f = -1;
  for (; ++f < e.length; ) {
    const k = [], A = [];
    let y = -1;
    for (e[f].length > u && (u = e[f].length); ++y < e[f].length; ) {
      const b = Fs(e[f][y]);
      if (t.alignDelimiters !== !1) {
        const v = i(b);
        A[y] = v, (s[y] === void 0 || v > s[y]) && (s[y] = v);
      }
      k.push(b);
    }
    a[f] = k, o[f] = A;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      l[c] = sr(r[c]);
  else {
    const k = sr(r);
    for (; ++c < u; )
      l[c] = k;
  }
  c = -1;
  const p = [], h = [];
  for (; ++c < u; ) {
    const k = l[c];
    let A = "", y = "";
    k === 99 ? (A = ":", y = ":") : k === 108 ? A = ":" : k === 114 && (y = ":");
    let b = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - A.length - y.length
    );
    const v = A + "-".repeat(b) + y;
    t.alignDelimiters !== !1 && (b = A.length + b + y.length, b > s[c] && (s[c] = b), h[c] = b), p[c] = v;
  }
  a.splice(1, 0, p), o.splice(1, 0, h), f = -1;
  const g = [];
  for (; ++f < a.length; ) {
    const k = a[f], A = o[f];
    c = -1;
    const y = [];
    for (; ++c < u; ) {
      const b = k[c] || "";
      let v = "", N = "";
      if (t.alignDelimiters !== !1) {
        const _ = s[c] - (A[c] || 0), S = l[c];
        S === 114 ? v = " ".repeat(_) : S === 99 ? _ % 2 ? (v = " ".repeat(_ / 2 + 0.5), N = " ".repeat(_ / 2 - 0.5)) : (v = " ".repeat(_ / 2), N = v) : N = " ".repeat(_);
      }
      t.delimiterStart !== !1 && !c && y.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && b === "") && (t.delimiterStart !== !1 || c) && y.push(" "), t.alignDelimiters !== !1 && y.push(v), y.push(b), t.alignDelimiters !== !1 && y.push(N), t.padding !== !1 && y.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && y.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? y.join("").replace(/ +$/, "") : y.join("")
    );
  }
  return g.join(`
`);
}
function Fs(e) {
  return e == null ? "" : String(e);
}
function sr(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
const ur = {}.hasOwnProperty;
function Ps(e, n) {
  const t = n || {};
  function r(i, ...l) {
    let a = r.invalid;
    const o = r.handlers;
    if (i && ur.call(i, e)) {
      const s = String(i[e]);
      a = ur.call(o, s) ? o[s] : r.unknown;
    }
    if (a)
      return a.call(this, i, ...l);
  }
  return r.handlers = t.handlers || {}, r.invalid = t.invalid, r.unknown = t.unknown, r;
}
function Ns(e, n, t, r) {
  const i = t.enter("blockquote"), l = t.createTracker(r);
  l.move("> "), l.shift(2);
  const a = t.indentLines(
    t.containerFlow(e, l.current()),
    _s
  );
  return i(), a;
}
function _s(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function Ds(e, n) {
  return cr(e, n.inConstruct, !0) && !cr(e, n.notInConstruct, !1);
}
function cr(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function fr(e, n, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && Ds(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function hi(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, l = 0, a = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++l > a && (a = l) : l = 1, i = r + n.length, r = t.indexOf(n, i);
  return a;
}
function Ls(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Ms(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function qs(e, n, t, r) {
  const i = Ms(t), l = e.value || "", a = i === "`" ? "GraveAccent" : "Tilde";
  if (Ls(e, t)) {
    const c = t.enter("codeIndented"), p = t.indentLines(l, Os);
    return c(), p;
  }
  const o = t.createTracker(r), s = i.repeat(Math.max(hi(l, i) + 1, 3)), u = t.enter("codeFenced");
  let f = o.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${a}`);
    f += o.move(
      t.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...o.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = t.enter(`codeFencedMeta${a}`);
    f += o.move(" "), f += o.move(
      t.safe(e.meta, {
        before: f,
        after: `
`,
        encode: ["`"],
        ...o.current()
      })
    ), c();
  }
  return f += o.move(`
`), l && (f += o.move(l + `
`)), f += o.move(s), u(), f;
}
function Os(e, n, t) {
  return (t ? "" : "    ") + e;
}
function wn(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Rs(e, n, t, r) {
  const i = wn(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.enter("definition");
  let o = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("[");
  return u += s.move(
    t.safe(t.associationId(e), {
      before: u,
      after: "]",
      ...s.current()
    })
  ), u += s.move("]: "), o(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (o = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (o = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : `
`,
      ...s.current()
    })
  )), o(), e.title && (o = t.enter(`title${l}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), o()), a(), u;
}
function Bs(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function ut(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function Et(e, n, t) {
  const r = Ze(e), i = Ze(n);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
pi.peek = $s;
function pi(e, n, t, r) {
  const i = Bs(t), l = t.enter("emphasis"), a = t.createTracker(r), o = a.move(i);
  let s = a.move(
    t.containerPhrasing(e, {
      after: i,
      before: o,
      ...a.current()
    })
  );
  const u = s.charCodeAt(0), f = Et(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = ut(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = Et(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + ut(c));
  const h = a.move(i);
  return l(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, o + s + h;
}
function $s(e, n, t) {
  return t.options.emphasis || "*";
}
function It(e, n, t, r) {
  let i, l, a;
  typeof n == "function" && typeof t != "function" ? (l = void 0, a = n, i = t) : (l = n, a = t, i = r), oi(e, l, o, i);
  function o(s, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(s) : void 0;
    return a(s, c, f);
  }
}
function js(e, n) {
  let t = !1;
  return It(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, sn;
  }), !!((!e.depth || e.depth < 3) && kn(e) && (n.options.setext || t));
}
function Us(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), l = t.createTracker(r);
  if (js(e, t)) {
    const f = t.enter("headingSetext"), c = t.enter("phrasing"), p = t.containerPhrasing(e, {
      ...l.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), p + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      p.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(p.lastIndexOf("\r"), p.lastIndexOf(`
`)) + 1)
    );
  }
  const a = "#".repeat(i), o = t.enter("headingAtx"), s = t.enter("phrasing");
  l.move(a + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...l.current()
  });
  return /^[\t ]/.test(u) && (u = ut(u.charCodeAt(0)) + u.slice(1)), u = u ? a + " " + u : a, t.options.closeAtx && (u += " " + a), s(), o(), u;
}
di.peek = Hs;
function di(e) {
  return e.value || "";
}
function Hs() {
  return "<";
}
mi.peek = Vs;
function mi(e, n, t, r) {
  const i = wn(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.enter("image");
  let o = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("![");
  return u += s.move(
    t.safe(e.alt, { before: u, after: "]", ...s.current() })
  ), u += s.move("]("), o(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (o = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (o = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), o(), e.title && (o = t.enter(`title${l}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), o()), u += s.move(")"), a(), u;
}
function Vs() {
  return "!";
}
gi.peek = Ws;
function gi(e, n, t, r) {
  const i = e.referenceType, l = t.enter("imageReference");
  let a = t.enter("label");
  const o = t.createTracker(r);
  let s = o.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...o.current()
  });
  s += o.move(u + "]["), a();
  const f = t.stack;
  t.stack = [], a = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...o.current()
  });
  return a(), t.stack = f, l(), i === "full" || !u || u !== c ? s += o.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += o.move("]"), s;
}
function Ws() {
  return "!";
}
yi.peek = Zs;
function yi(e, n, t) {
  let r = e.value || "", i = "`", l = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++l < t.unsafe.length; ) {
    const a = t.unsafe[l], o = t.compilePattern(a);
    let s;
    if (a.atBreak)
      for (; s = o.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return i + r + i;
}
function Zs() {
  return "`";
}
function ki(e, n) {
  const t = kn(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
bi.peek = Qs;
function bi(e, n, t, r) {
  const i = wn(t), l = i === '"' ? "Quote" : "Apostrophe", a = t.createTracker(r);
  let o, s;
  if (ki(e, t)) {
    const f = t.stack;
    t.stack = [], o = t.enter("autolink");
    let c = a.move("<");
    return c += a.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...a.current()
      })
    ), c += a.move(">"), o(), t.stack = f, c;
  }
  o = t.enter("link"), s = t.enter("label");
  let u = a.move("[");
  return u += a.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...a.current()
    })
  ), u += a.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += a.move("<"), u += a.move(
    t.safe(e.url, { before: u, after: ">", ...a.current() })
  ), u += a.move(">")) : (s = t.enter("destinationRaw"), u += a.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...a.current()
    })
  )), s(), e.title && (s = t.enter(`title${l}`), u += a.move(" " + i), u += a.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...a.current()
    })
  ), u += a.move(i), s()), u += a.move(")"), o(), u;
}
function Qs(e, n, t) {
  return ki(e, t) ? "<" : "[";
}
xi.peek = Ys;
function xi(e, n, t, r) {
  const i = e.referenceType, l = t.enter("linkReference");
  let a = t.enter("label");
  const o = t.createTracker(r);
  let s = o.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...o.current()
  });
  s += o.move(u + "]["), a();
  const f = t.stack;
  t.stack = [], a = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...o.current()
  });
  return a(), t.stack = f, l(), i === "full" || !u || u !== c ? s += o.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += o.move("]"), s;
}
function Ys() {
  return "[";
}
function Sn(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Gs(e) {
  const n = Sn(e), t = e.options.bulletOther;
  if (!t)
    return n === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === n)
    throw new Error(
      "Expected `bullet` (`" + n + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function Ks(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function wi(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Xs(e, n, t, r) {
  const i = t.enter("list"), l = t.bulletCurrent;
  let a = e.ordered ? Ks(t) : Sn(t);
  const o = e.ordered ? a === "." ? ")" : "." : Gs(t);
  let s = n && t.bulletLastUsed ? a === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (a === "*" || a === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), wi(t) === a && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const p = e.children[c];
        if (p && p.type === "listItem" && p.children && p.children[0] && p.children[0].type === "thematicBreak") {
          s = !0;
          break;
        }
      }
    }
  }
  s && (a = o), t.bulletCurrent = a;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = a, t.bulletCurrent = l, i(), u;
}
function Js(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function eu(e, n, t, r) {
  const i = Js(t);
  let l = t.bulletCurrent || Sn(t);
  n && n.type === "list" && n.ordered && (l = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + l);
  let a = l.length + 1;
  (i === "tab" || i === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (a = Math.ceil(a / 4) * 4);
  const o = t.createTracker(r);
  o.move(l + " ".repeat(a - l.length)), o.shift(a);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, o.current()),
    f
  );
  return s(), u;
  function f(c, p, h) {
    return p ? (h ? "" : " ".repeat(a)) + c : (h ? l : l + " ".repeat(a - l.length)) + c;
  }
}
function tu(e, n, t, r) {
  const i = t.enter("paragraph"), l = t.enter("phrasing"), a = t.containerPhrasing(e, r);
  return l(), i(), a;
}
const nu = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Dt([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function ru(e, n, t, r) {
  return (e.children.some(function(a) {
    return nu(a);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function iu(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
Si.peek = lu;
function Si(e, n, t, r) {
  const i = iu(t), l = t.enter("strong"), a = t.createTracker(r), o = a.move(i + i);
  let s = a.move(
    t.containerPhrasing(e, {
      after: i,
      before: o,
      ...a.current()
    })
  );
  const u = s.charCodeAt(0), f = Et(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = ut(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), p = Et(r.after.charCodeAt(0), c, i);
  p.inside && (s = s.slice(0, -1) + ut(c));
  const h = a.move(i + i);
  return l(), t.attentionEncodeSurroundingInfo = {
    after: p.outside,
    before: f.outside
  }, o + s + h;
}
function lu(e, n, t) {
  return t.options.strong || "*";
}
function au(e, n, t, r) {
  return t.safe(e.value, r);
}
function ou(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function su(e, n, t) {
  const r = (wi(t) + (t.options.ruleSpaces ? " " : "")).repeat(ou(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Ci = {
  blockquote: Ns,
  break: fr,
  code: qs,
  definition: Rs,
  emphasis: pi,
  hardBreak: fr,
  heading: Us,
  html: di,
  image: mi,
  imageReference: gi,
  inlineCode: yi,
  link: bi,
  linkReference: xi,
  list: Xs,
  listItem: eu,
  paragraph: tu,
  root: ru,
  strong: Si,
  text: au,
  thematicBreak: su
};
function uu() {
  return {
    enter: {
      table: cu,
      tableData: hr,
      tableHeader: hr,
      tableRow: hu
    },
    exit: {
      codeText: pu,
      table: fu,
      tableData: Yt,
      tableHeader: Yt,
      tableRow: Yt
    }
  };
}
function cu(e) {
  const n = e._align;
  this.enter(
    {
      type: "table",
      align: n.map(function(t) {
        return t === "none" ? null : t;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function fu(e) {
  this.exit(e), this.data.inTable = void 0;
}
function hu(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function Yt(e) {
  this.exit(e);
}
function hr(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function pu(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, du));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function du(e, n) {
  return n === "|" ? n : e;
}
function mu(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, i = n.stringLength, l = t ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: p,
      table: a,
      tableCell: s,
      tableRow: o
    }
  };
  function a(h, g, k, A) {
    return u(f(h, k, A), h.align);
  }
  function o(h, g, k, A) {
    const y = c(h, k, A), b = u([y]);
    return b.slice(0, b.indexOf(`
`));
  }
  function s(h, g, k, A) {
    const y = k.enter("tableCell"), b = k.enter("phrasing"), v = k.containerPhrasing(h, {
      ...A,
      before: l,
      after: l
    });
    return b(), y(), v;
  }
  function u(h, g) {
    return zs(h, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(h, g, k) {
    const A = h.children;
    let y = -1;
    const b = [], v = g.enter("table");
    for (; ++y < A.length; )
      b[y] = c(A[y], g, k);
    return v(), b;
  }
  function c(h, g, k) {
    const A = h.children;
    let y = -1;
    const b = [], v = g.enter("tableRow");
    for (; ++y < A.length; )
      b[y] = s(A[y], h, g, k);
    return v(), b;
  }
  function p(h, g, k) {
    let A = Ci.inlineCode(h, g, k);
    return k.stack.includes("tableCell") && (A = A.replace(/\|/g, "\\$&")), A;
  }
}
function gu() {
  return {
    exit: {
      taskListCheckValueChecked: pr,
      taskListCheckValueUnchecked: pr,
      paragraph: ku
    }
  };
}
function yu() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: bu }
  };
}
function pr(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function ku(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const i = n.children;
      let l = -1, a;
      for (; ++l < i.length; ) {
        const o = i[l];
        if (o.type === "paragraph") {
          a = o;
          break;
        }
      }
      a === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function bu(e, n, t, r) {
  const i = e.children[0], l = typeof e.checked == "boolean" && i && i.type === "paragraph", a = "[" + (e.checked ? "x" : " ") + "] ", o = t.createTracker(r);
  l && o.move(a);
  let s = Ci.listItem(e, n, t, {
    ...r,
    ...o.current()
  });
  return l && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(f) {
    return f + a;
  }
}
function xu() {
  return [
    Xo(),
    bs(),
    Cs(),
    uu(),
    gu()
  ];
}
function wu(e) {
  return {
    extensions: [
      Jo(),
      xs(e),
      vs(),
      mu(e),
      yu()
    ]
  };
}
const Su = {
  tokenize: Tu,
  partial: !0
}, vi = {
  tokenize: zu,
  partial: !0
}, Ai = {
  tokenize: Fu,
  partial: !0
}, Ei = {
  tokenize: Pu,
  partial: !0
}, Cu = {
  tokenize: Nu,
  partial: !0
}, Ii = {
  name: "wwwAutolink",
  tokenize: Eu,
  previous: zi
}, Ti = {
  name: "protocolAutolink",
  tokenize: Iu,
  previous: Fi
}, Te = {
  name: "emailAutolink",
  tokenize: Au,
  previous: Pi
}, xe = {};
function vu() {
  return {
    text: xe
  };
}
let qe = 48;
for (; qe < 123; )
  xe[qe] = Te, qe++, qe === 58 ? qe = 65 : qe === 91 && (qe = 97);
xe[43] = Te;
xe[45] = Te;
xe[46] = Te;
xe[95] = Te;
xe[72] = [Te, Ti];
xe[104] = [Te, Ti];
xe[87] = [Te, Ii];
xe[119] = [Te, Ii];
function Au(e, n, t) {
  const r = this;
  let i, l;
  return a;
  function a(c) {
    return !un(c) || !Pi.call(r, r.previous) || Cn(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), o(c));
  }
  function o(c) {
    return un(c) ? (e.consume(c), o) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(Cu, f, u)(c) : c === 45 || c === 95 || te(c) ? (l = !0, e.consume(c), s) : f(c);
  }
  function u(c) {
    return e.consume(c), i = !0, s;
  }
  function f(c) {
    return l && i && ne(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function Eu(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return a !== 87 && a !== 119 || !zi.call(r, r.previous) || Cn(r.events) ? t(a) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Su, e.attempt(vi, e.attempt(Ai, l), t), t)(a));
  }
  function l(a) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(a);
  }
}
function Iu(e, n, t) {
  const r = this;
  let i = "", l = !1;
  return a;
  function a(c) {
    return (c === 72 || c === 104) && Fi.call(r, r.previous) && !Cn(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), o) : t(c);
  }
  function o(c) {
    if (ne(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), o;
    if (c === 58) {
      const p = i.toLowerCase();
      if (p === "http" || p === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), l ? u : (l = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || vt(c) || H(c) || Oe(c) || Nt(c) ? t(c) : e.attempt(vi, e.attempt(Ai, f), t)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function Tu(e, n, t) {
  let r = 0;
  return i;
  function i(a) {
    return (a === 87 || a === 119) && r < 3 ? (r++, e.consume(a), i) : a === 46 && r === 3 ? (e.consume(a), l) : t(a);
  }
  function l(a) {
    return a === null ? t(a) : n(a);
  }
}
function zu(e, n, t) {
  let r, i, l;
  return a;
  function a(u) {
    return u === 46 || u === 95 ? e.check(Ei, s, o)(u) : u === null || H(u) || Oe(u) || u !== 45 && Nt(u) ? s(u) : (l = !0, e.consume(u), a);
  }
  function o(u) {
    return u === 95 ? r = !0 : (i = r, r = void 0), e.consume(u), a;
  }
  function s(u) {
    return i || r || !l ? t(u) : n(u);
  }
}
function Fu(e, n) {
  let t = 0, r = 0;
  return i;
  function i(a) {
    return a === 40 ? (t++, e.consume(a), i) : a === 41 && r < t ? l(a) : a === 33 || a === 34 || a === 38 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 60 || a === 63 || a === 93 || a === 95 || a === 126 ? e.check(Ei, n, l)(a) : a === null || H(a) || Oe(a) ? n(a) : (e.consume(a), i);
  }
  function l(a) {
    return a === 41 && r++, e.consume(a), i;
  }
}
function Pu(e, n, t) {
  return r;
  function r(o) {
    return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), l) : o === 93 ? (e.consume(o), i) : (
      // `<` is an end.
      o === 60 || // So is whitespace.
      o === null || H(o) || Oe(o) ? n(o) : t(o)
    );
  }
  function i(o) {
    return o === null || o === 40 || o === 91 || H(o) || Oe(o) ? n(o) : r(o);
  }
  function l(o) {
    return ne(o) ? a(o) : t(o);
  }
  function a(o) {
    return o === 59 ? (e.consume(o), r) : ne(o) ? (e.consume(o), a) : t(o);
  }
}
function Nu(e, n, t) {
  return r;
  function r(l) {
    return e.consume(l), i;
  }
  function i(l) {
    return te(l) ? t(l) : n(l);
  }
}
function zi(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || H(e);
}
function Fi(e) {
  return !ne(e);
}
function Pi(e) {
  return !(e === 47 || un(e));
}
function un(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || te(e);
}
function Cn(e) {
  let n = e.length, t = !1;
  for (; n--; ) {
    const r = e[n][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      t = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
const _u = {
  tokenize: $u,
  partial: !0
};
function Du() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Ou,
        continuation: {
          tokenize: Ru
        },
        exit: Bu
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: qu
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: Lu,
        resolveTo: Mu
      }
    }
  };
}
function Lu(e, n, t) {
  const r = this;
  let i = r.events.length;
  const l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let a;
  for (; i--; ) {
    const s = r.events[i][1];
    if (s.type === "labelImage") {
      a = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return o;
  function o(s) {
    if (!a || !a._balanced)
      return t(s);
    const u = ye(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !l.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function Mu(e, n) {
  let t = e.length;
  for (; t--; )
    if (e[t][1].type === "labelImage" && e[t][0] === "enter") {
      e[t][1];
      break;
    }
  e[t + 1][1].type = "data", e[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[t + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const l = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, a = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, l.start),
    end: Object.assign({}, l.end)
  }, o = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", i, n],
    ["exit", i, n],
    // Everything in between.
    ["enter", l, n],
    ["enter", a, n],
    ["exit", a, n],
    ["exit", l, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...o), e;
}
function qu(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l = 0, a;
  return o;
  function o(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), s;
  }
  function s(c) {
    return c !== 94 ? t(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u);
  }
  function u(c) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      c === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || H(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const p = e.exit("gfmFootnoteCallString");
      return i.includes(ye(r.sliceSerialize(p))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return H(c) || (a = !0), l++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), l++, u) : u(c);
  }
}
function Ou(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l, a = 0, o;
  return s;
  function s(g) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(g) {
    return g === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : t(g);
  }
  function f(g) {
    if (
      // Too long.
      a > 999 || // Closing brace with nothing.
      g === 93 && !o || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || H(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const k = e.exit("gfmFootnoteDefinitionLabelString");
      return l = ye(r.sliceSerialize(k)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), p;
    }
    return H(g) || (o = !0), a++, e.consume(g), g === 92 ? c : f;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), a++, f) : f(g);
  }
  function p(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), i.includes(l) || i.push(l), M(e, h, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function h(g) {
    return n(g);
  }
}
function Ru(e, n, t) {
  return e.check(ft, n, e.attempt(_u, n, t));
}
function Bu(e) {
  e.exit("gfmFootnoteDefinition");
}
function $u(e, n, t) {
  const r = this;
  return M(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "gfmFootnoteDefinitionIndent" && a[2].sliceSerialize(a[1], !0).length === 4 ? n(l) : t(l);
  }
}
function ju(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: l,
    resolveAll: i
  };
  return t == null && (t = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function i(a, o) {
    let s = -1;
    for (; ++s < a.length; )
      if (a[s][0] === "enter" && a[s][1].type === "strikethroughSequenceTemporary" && a[s][1]._close) {
        let u = s;
        for (; u--; )
          if (a[u][0] === "exit" && a[u][1].type === "strikethroughSequenceTemporary" && a[u][1]._open && // If the sizes are the same:
          a[s][1].end.offset - a[s][1].start.offset === a[u][1].end.offset - a[u][1].start.offset) {
            a[s][1].type = "strikethroughSequence", a[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, a[u][1].start),
              end: Object.assign({}, a[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, a[u][1].end),
              end: Object.assign({}, a[s][1].start)
            }, p = [["enter", f, o], ["enter", a[u][1], o], ["exit", a[u][1], o], ["enter", c, o]], h = o.parser.constructs.insideSpan.null;
            h && se(p, p.length, 0, _t(h, a.slice(u + 1, s), o)), se(p, p.length, 0, [["exit", c, o], ["enter", a[s][1], o], ["exit", a[s][1], o], ["exit", f, o]]), se(a, u - 1, s - u + 3, p), s = u + p.length - 2;
            break;
          }
      }
    for (s = -1; ++s < a.length; )
      a[s][1].type === "strikethroughSequenceTemporary" && (a[s][1].type = "data");
    return a;
  }
  function l(a, o, s) {
    const u = this.previous, f = this.events;
    let c = 0;
    return p;
    function p(g) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(g) : (a.enter("strikethroughSequenceTemporary"), h(g));
    }
    function h(g) {
      const k = Ze(u);
      if (g === 126)
        return c > 1 ? s(g) : (a.consume(g), c++, h);
      if (c < 2 && !t) return s(g);
      const A = a.exit("strikethroughSequenceTemporary"), y = Ze(g);
      return A._open = !y || y === 2 && !!k, A._close = !k || k === 2 && !!y, o(g);
    }
  }
}
class Uu {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(n, t, r) {
    Hu(this, n, t, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(n) {
    if (this.map.sort(function(l, a) {
      return l[0] - a[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const l of i)
        n.push(l);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function Hu(e, n, t, r) {
  let i = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        e.map[i][1] += t, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Vu(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const i = e[n];
    if (t) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const l = r.length - 1;
          r[l] = r[l] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function Wu() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Zu,
        resolveAll: Qu
      }
    }
  };
}
function Zu(e, n, t) {
  const r = this;
  let i = 0, l = 0, a;
  return o;
  function o(x) {
    let z = r.events.length - 1;
    for (; z > -1; ) {
      const Z = r.events[z][1].type;
      if (Z === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      Z === "linePrefix") z--;
      else break;
    }
    const F = z > -1 ? r.events[z][1].type : null, j = F === "tableHead" || F === "tableRow" ? S : s;
    return j === S && r.parser.lazy[r.now().line] ? t(x) : j(x);
  }
  function s(x) {
    return e.enter("tableHead"), e.enter("tableRow"), u(x);
  }
  function u(x) {
    return x === 124 || (a = !0, l += 1), f(x);
  }
  function f(x) {
    return x === null ? t(x) : T(x) ? l > 1 ? (l = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), h) : t(x) : q(x) ? M(e, f, "whitespace")(x) : (l += 1, a && (a = !1, i += 1), x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), a = !0, f) : (e.enter("data"), c(x)));
  }
  function c(x) {
    return x === null || x === 124 || H(x) ? (e.exit("data"), f(x)) : (e.consume(x), x === 92 ? p : c);
  }
  function p(x) {
    return x === 92 || x === 124 ? (e.consume(x), c) : c(x);
  }
  function h(x) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(x) : (e.enter("tableDelimiterRow"), a = !1, q(x) ? M(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(x) : g(x));
  }
  function g(x) {
    return x === 45 || x === 58 ? A(x) : x === 124 ? (a = !0, e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), k) : _(x);
  }
  function k(x) {
    return q(x) ? M(e, A, "whitespace")(x) : A(x);
  }
  function A(x) {
    return x === 58 ? (l += 1, a = !0, e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), y) : x === 45 ? (l += 1, y(x)) : x === null || T(x) ? N(x) : _(x);
  }
  function y(x) {
    return x === 45 ? (e.enter("tableDelimiterFiller"), b(x)) : _(x);
  }
  function b(x) {
    return x === 45 ? (e.consume(x), b) : x === 58 ? (a = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(x), e.exit("tableDelimiterMarker"), v) : (e.exit("tableDelimiterFiller"), v(x));
  }
  function v(x) {
    return q(x) ? M(e, N, "whitespace")(x) : N(x);
  }
  function N(x) {
    return x === 124 ? g(x) : x === null || T(x) ? !a || i !== l ? _(x) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(x)) : _(x);
  }
  function _(x) {
    return t(x);
  }
  function S(x) {
    return e.enter("tableRow"), O(x);
  }
  function O(x) {
    return x === 124 ? (e.enter("tableCellDivider"), e.consume(x), e.exit("tableCellDivider"), O) : x === null || T(x) ? (e.exit("tableRow"), n(x)) : q(x) ? M(e, O, "whitespace")(x) : (e.enter("data"), $(x));
  }
  function $(x) {
    return x === null || x === 124 || H(x) ? (e.exit("data"), O(x)) : (e.consume(x), x === 92 ? D : $);
  }
  function D(x) {
    return x === 92 || x === 124 ? (e.consume(x), $) : $(x);
  }
}
function Qu(e, n) {
  let t = -1, r = !0, i = 0, l = [0, 0, 0, 0], a = [0, 0, 0, 0], o = !1, s = 0, u, f, c;
  const p = new Uu();
  for (; ++t < e.length; ) {
    const h = e[t], g = h[1];
    h[0] === "enter" ? g.type === "tableHead" ? (o = !1, s !== 0 && (dr(p, n, s, u, f), f = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", u, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, c = void 0, l = [0, 0, 0, 0], a = [0, t + 1, 0, 0], o && (o = !1, f = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, p.add(t, 0, [["enter", f, n]])), i = g.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, a[2] === 0 && (l[1] !== 0 && (a[0] = a[1], c = mt(p, n, l, i, void 0, c), l = [0, 0, 0, 0]), a[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (l[1] !== 0 && (a[0] = a[1], c = mt(p, n, l, i, void 0, c)), l = a, a = [l[1], t, 0, 0])) : g.type === "tableHead" ? (o = !0, s = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (s = t, l[1] !== 0 ? (a[0] = a[1], c = mt(p, n, l, i, t, c)) : a[1] !== 0 && (c = mt(p, n, a, i, t, c)), i = 0) : i && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (a[3] = t);
  }
  for (s !== 0 && dr(p, n, s, u, f), p.consume(n.events), t = -1; ++t < n.events.length; ) {
    const h = n.events[t];
    h[0] === "enter" && h[1].type === "table" && (h[1]._align = Vu(n.events, t));
  }
  return e;
}
function mt(e, n, t, r, i, l) {
  const a = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", o = "tableContent";
  t[0] !== 0 && (l.end = Object.assign({}, He(n.events, t[0])), e.add(t[0], 0, [["exit", l, n]]));
  const s = He(n.events, t[1]);
  if (l = {
    type: a,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", l, n]]), t[2] !== 0) {
    const u = He(n.events, t[2]), f = He(n.events, t[3]), c = {
      type: o,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const p = n.events[t[2]], h = n.events[t[3]];
      if (p[1].end = Object.assign({}, h[1].end), p[1].type = "chunkText", p[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, k = t[3] - t[2] - 1;
        e.add(g, k, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return i !== void 0 && (l.end = Object.assign({}, He(n.events, i)), e.add(i, 0, [["exit", l, n]]), l = void 0), l;
}
function dr(e, n, t, r, i) {
  const l = [], a = He(n.events, t);
  i && (i.end = Object.assign({}, a), l.push(["exit", i, n])), r.end = Object.assign({}, a), l.push(["exit", r, n]), e.add(t + 1, 0, l);
}
function He(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Yu = {
  name: "tasklistCheck",
  tokenize: Ku
};
function Gu() {
  return {
    text: {
      91: Yu
    }
  };
}
function Ku(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), l)
    );
  }
  function l(s) {
    return H(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), a) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), a) : t(s);
  }
  function a(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), o) : t(s);
  }
  function o(s) {
    return T(s) ? n(s) : q(s) ? e.check({
      tokenize: Xu
    }, n, t)(s) : t(s);
  }
}
function Xu(e, n, t) {
  return M(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function Ju(e) {
  return Wr([
    vu(),
    Du(),
    ju(e),
    Wu(),
    Gu()
  ]);
}
const ec = {};
function Ni(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || ec, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), a = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(Ju(t)), l.push(xu()), a.push(wu(t));
}
const tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ni
}, Symbol.toStringTag, { value: "Module" }));
function nc() {
  return {
    enter: {
      mathFlow: e,
      mathFlowFenceMeta: n,
      mathText: l
    },
    exit: {
      mathFlow: i,
      mathFlowFence: r,
      mathFlowFenceMeta: t,
      mathFlowValue: o,
      mathText: a,
      mathTextData: o
    }
  };
  function e(s) {
    const u = {
      type: "element",
      tagName: "code",
      properties: { className: ["language-math", "math-display"] },
      children: []
    };
    this.enter(
      {
        type: "math",
        meta: null,
        value: "",
        data: { hName: "pre", hChildren: [u] }
      },
      s
    );
  }
  function n() {
    this.buffer();
  }
  function t() {
    const s = this.resume(), u = this.stack[this.stack.length - 1];
    u.type, u.meta = s;
  }
  function r() {
    this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
  }
  function i(s) {
    const u = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), f = this.stack[this.stack.length - 1];
    f.type, this.exit(s), f.value = u;
    const c = (
      /** @type {HastElement} */
      f.data.hChildren[0]
    );
    c.type, c.tagName, c.children.push({ type: "text", value: u }), this.data.mathFlowInside = void 0;
  }
  function l(s) {
    this.enter(
      {
        type: "inlineMath",
        value: "",
        data: {
          hName: "code",
          hProperties: { className: ["language-math", "math-inline"] },
          hChildren: []
        }
      },
      s
    ), this.buffer();
  }
  function a(s) {
    const u = this.resume(), f = this.stack[this.stack.length - 1];
    f.type, this.exit(s), f.value = u, /** @type {Array<HastElementContent>} */
    // @ts-expect-error: we defined it in `enterMathFlow`.
    f.data.hChildren.push({ type: "text", value: u });
  }
  function o(s) {
    this.config.enter.data.call(this, s), this.config.exit.data.call(this, s);
  }
}
function rc(e) {
  let n = (e || {}).singleDollarTextMath;
  return n == null && (n = !0), r.peek = i, {
    unsafe: [
      { character: "\r", inConstruct: "mathFlowMeta" },
      { character: `
`, inConstruct: "mathFlowMeta" },
      {
        character: "$",
        after: n ? void 0 : "\\$",
        inConstruct: "phrasing"
      },
      { character: "$", inConstruct: "mathFlowMeta" },
      { atBreak: !0, character: "$", after: "\\$" }
    ],
    handlers: { math: t, inlineMath: r }
  };
  function t(l, a, o, s) {
    const u = l.value || "", f = o.createTracker(s), c = "$".repeat(Math.max(hi(u, "$") + 1, 2)), p = o.enter("mathFlow");
    let h = f.move(c);
    if (l.meta) {
      const g = o.enter("mathFlowMeta");
      h += f.move(
        o.safe(l.meta, {
          after: `
`,
          before: h,
          encode: ["$"],
          ...f.current()
        })
      ), g();
    }
    return h += f.move(`
`), u && (h += f.move(u + `
`)), h += f.move(c), p(), h;
  }
  function r(l, a, o) {
    let s = l.value || "", u = 1;
    for (n || u++; new RegExp("(^|[^$])" + "\\$".repeat(u) + "([^$]|$)").test(s); )
      u++;
    const f = "$".repeat(u);
    // Contains non-space.
    /[^ \r\n]/.test(s) && // Starts with space and ends with space.
    (/^[ \r\n]/.test(s) && /[ \r\n]$/.test(s) || // Starts or ends with dollar.
    /^\$|\$$/.test(s)) && (s = " " + s + " ");
    let c = -1;
    for (; ++c < o.unsafe.length; ) {
      const p = o.unsafe[c];
      if (!p.atBreak) continue;
      const h = o.compilePattern(p);
      let g;
      for (; g = h.exec(s); ) {
        let k = g.index;
        s.codePointAt(k) === 10 && s.codePointAt(k - 1) === 13 && k--, s = s.slice(0, k) + " " + s.slice(g.index + 1);
      }
    }
    return f + s + f;
  }
  function i() {
    return "$";
  }
}
const ic = {
  tokenize: lc,
  concrete: !0,
  name: "mathFlow"
}, mr = {
  tokenize: ac,
  partial: !0
};
function lc(e, n, t) {
  const r = this, i = r.events[r.events.length - 1], l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0;
  let a = 0;
  return o;
  function o(b) {
    return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), s(b);
  }
  function s(b) {
    return b === 36 ? (e.consume(b), a++, s) : a < 2 ? t(b) : (e.exit("mathFlowFenceSequence"), M(e, u, "whitespace")(b));
  }
  function u(b) {
    return b === null || T(b) ? c(b) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), f(b));
  }
  function f(b) {
    return b === null || T(b) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), c(b)) : b === 36 ? t(b) : (e.consume(b), f);
  }
  function c(b) {
    return e.exit("mathFlowFence"), r.interrupt ? n(b) : e.attempt(mr, p, A)(b);
  }
  function p(b) {
    return e.attempt({
      tokenize: y,
      partial: !0
    }, A, h)(b);
  }
  function h(b) {
    return (l ? M(e, g, "linePrefix", l + 1) : g)(b);
  }
  function g(b) {
    return b === null ? A(b) : T(b) ? e.attempt(mr, p, A)(b) : (e.enter("mathFlowValue"), k(b));
  }
  function k(b) {
    return b === null || T(b) ? (e.exit("mathFlowValue"), g(b)) : (e.consume(b), k);
  }
  function A(b) {
    return e.exit("mathFlow"), n(b);
  }
  function y(b, v, N) {
    let _ = 0;
    return M(b, S, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
    function S(D) {
      return b.enter("mathFlowFence"), b.enter("mathFlowFenceSequence"), O(D);
    }
    function O(D) {
      return D === 36 ? (_++, b.consume(D), O) : _ < a ? N(D) : (b.exit("mathFlowFenceSequence"), M(b, $, "whitespace")(D));
    }
    function $(D) {
      return D === null || T(D) ? (b.exit("mathFlowFence"), v(D)) : N(D);
    }
  }
}
function ac(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return a === null ? n(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), l);
  }
  function l(a) {
    return r.parser.lazy[r.now().line] ? t(a) : n(a);
  }
}
function oc(e) {
  let t = (e || {}).singleDollarTextMath;
  return t == null && (t = !0), {
    tokenize: r,
    resolve: sc,
    previous: uc,
    name: "mathText"
  };
  function r(i, l, a) {
    let o = 0, s, u;
    return f;
    function f(k) {
      return i.enter("mathText"), i.enter("mathTextSequence"), c(k);
    }
    function c(k) {
      return k === 36 ? (i.consume(k), o++, c) : o < 2 && !t ? a(k) : (i.exit("mathTextSequence"), p(k));
    }
    function p(k) {
      return k === null ? a(k) : k === 36 ? (u = i.enter("mathTextSequence"), s = 0, g(k)) : k === 32 ? (i.enter("space"), i.consume(k), i.exit("space"), p) : T(k) ? (i.enter("lineEnding"), i.consume(k), i.exit("lineEnding"), p) : (i.enter("mathTextData"), h(k));
    }
    function h(k) {
      return k === null || k === 32 || k === 36 || T(k) ? (i.exit("mathTextData"), p(k)) : (i.consume(k), h);
    }
    function g(k) {
      return k === 36 ? (i.consume(k), s++, g) : s === o ? (i.exit("mathTextSequence"), i.exit("mathText"), l(k)) : (u.type = "mathTextData", h(k));
    }
  }
}
function sc(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "mathTextData") {
        e[n][1].type = "mathTextPadding", e[t][1].type = "mathTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "mathTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function uc(e) {
  return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function cc(e) {
  return {
    flow: {
      36: ic
    },
    text: {
      36: oc(e)
    }
  };
}
const fc = {};
function hc(e) {
  const n = (
    /** @type {Processor} */
    this
  ), t = e || fc, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), l = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), a = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(cc(t)), l.push(nc()), a.push(rc(t));
}
const _i = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/, at = "::", pc = /^([a-zA-Z_][a-zA-Z0-9_]*):\{/;
function gr(e, n) {
  if (e[n] !== "{") return null;
  let t = 1;
  const r = n + 1;
  for (n++; n < e.length && t > 0 && (e[n] === "{" ? t++ : e[n] === "}" && t--, t > 0); )
    n++;
  return t !== 0 ? null : { content: e.slice(r, n), endPos: n + 1 };
}
function Tt(e, n) {
  const t = [];
  let r = n;
  for (; r < e.length; ) {
    for (; r < e.length && /[ \t\r\n]/.test(e[r]); ) r++;
    if (r >= e.length) break;
    const i = e.slice(r).match(pc);
    if (i) {
      const l = i[1].length, a = r + l + 1, o = gr(e, a);
      if (o === null) return null;
      t.push(i[1] + ":" + o.content), r = o.endPos;
      continue;
    }
    if (e[r] === "{") {
      const l = gr(e, r);
      if (l === null) return null;
      t.push(l.content), r = l.endPos;
      continue;
    }
    break;
  }
  return { args: t, endPos: r };
}
function yr(e) {
  const n = e.trim();
  if (n.startsWith(".")) {
    const t = vn(n, !1);
    if (t !== null)
      return t.type === "qdChain" ? { tag: "chain", nodes: t } : { tag: "call", node: t };
  }
  return { tag: "literal", text: n };
}
function kr(e) {
  const n = e.trim(), t = n.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(?!\/\/)(.*)$/s);
  return t ? {
    name: t[1],
    value: yr(t[2])
  } : { name: void 0, value: yr(n) };
}
function vn(e, n) {
  if (!e.startsWith(".")) return null;
  const t = e.match(_i);
  if (!t) return null;
  let r = t[0].length;
  const i = t[1], l = [], a = Tt(e, r);
  if (a === null) return null;
  for (l.push({ name: i, args: a.args.map(kr) }), r = a.endPos; e.startsWith(at, r); ) {
    r += at.length;
    const o = e.slice(r).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!o) break;
    r += o[0].length;
    const s = Tt(e, r);
    if (s === null) break;
    l.push({ name: o[0], args: s.args.map(kr) }), r = s.endPos;
  }
  return l.length === 1 ? {
    type: "qdFunctionCall",
    name: l[0].name,
    args: l[0].args,
    inline: n
  } : {
    type: "qdChain",
    steps: l
  };
}
function dc(e) {
  const n = e.trimStart();
  if (!n.startsWith(".")) return null;
  const t = n.indexOf(`
`), r = t >= 0 ? n.slice(0, t) : n, i = t >= 0 ? n.slice(t + 1) : "", l = vn(r, !1);
  return l ? { node: l, bodyText: i } : null;
}
function mc(e, n) {
  let t = n.length + 1;
  const r = [];
  let i = !1;
  for (const l of e) {
    if (i) {
      r.push(l);
      continue;
    }
    if (l.type === "text") {
      const a = l.value ?? "";
      if (t > 0)
        if (t >= a.length)
          t -= a.length;
        else {
          const o = a.slice(t);
          t = 0, i = !0, o && r.push({ type: "text", value: o });
        }
      else
        r.push(l);
    } else
      t <= 0, i = !0, r.push(l);
  }
  return r;
}
function gc(e) {
  let n = "";
  for (const t of e.children)
    (t.type === "text" || t.type === "inlineCode") && (n += t.value);
  return n;
}
const Di = () => (e) => {
  It(e, "paragraph", (r, i, l) => {
    var f;
    if (typeof i != "number" || !l) return;
    const a = gc(r);
    if (!a.trimStart().startsWith(".")) return;
    const o = dc(a);
    if (!o) return;
    const { node: s, bodyText: u } = o;
    if (s.type === "qdFunctionCall") {
      const c = s, p = a.trimStart(), h = p.indexOf(`
`), g = h >= 0 ? p.slice(0, h) : p;
      if (u.startsWith(".")) {
        const y = {
          type: "paragraph",
          children: [{ type: "text", value: u }]
        };
        return l.children.splice(i, 1, s, y), [Ct, i];
      }
      const k = mc(r.children, g);
      if (k.filter(
        (y) => y.type !== "text" || (y.value ?? "").trim() !== ""
      ).length > 0) {
        const y = { type: "paragraph", children: k };
        c.args.push({
          name: void 0,
          value: { tag: "block", nodes: [y] }
        });
      } else if (u.trim()) {
        const y = {
          type: "paragraph",
          children: [{ type: "text", value: u }]
        };
        c.args.push({
          name: void 0,
          value: { tag: "block", nodes: [y] }
        });
      } else if (
        // No inline body — try to absorb the next sibling paragraph as body.
        // Applies when no positional (unnamed) arg exists yet (covers both
        // zero-arg calls and named-arg-only calls like .alert type:{info}).
        !c.args.some((y) => y.name === void 0) && l.children && ((f = l.children[i + 1]) == null ? void 0 : f.type) === "paragraph"
      ) {
        const y = l.children[i + 1];
        c.args.push({
          name: void 0,
          value: { tag: "block", nodes: [y] }
        }), l.children.splice(i + 1, 1);
      }
    }
    return l.children[i] = s, [Ct, i];
  });
  const n = e.children;
  let t = 0;
  for (; t < n.length; ) {
    const r = n[t], i = r.type === "qdFunctionCall" && r.args.some((l) => l.name === void 0);
    if (r.type === "qdFunctionCall" && !i) {
      const l = [];
      let a = t + 1;
      for (; a < n.length && n[a].type !== "qdFunctionCall"; )
        l.push(n[a]), a++;
      l.length > 0 && (r.args.push({
        name: void 0,
        value: { tag: "block", nodes: l }
      }), n.splice(t + 1, l.length));
    }
    t++;
  }
  It(e, "text", (r, i, l) => {
    if (typeof i != "number" || !l) return;
    const a = r.value, o = yc(a);
    if (o === null || o.length === 1 && o[0].type === "text")
      return;
    const s = [];
    for (const u of o)
      if (u.type === "text")
        u.text && s.push({ type: "text", value: u.text });
      else {
        const f = vn(u.text, !0);
        f ? s.push(f) : u.text && s.push({ type: "text", value: u.text });
      }
    if (s.length !== 0)
      return l.children.splice(i, 1, ...s), [Ct, i + s.length];
  });
};
function yc(e) {
  const n = [];
  let t = 0, r = !1;
  for (; t < e.length; ) {
    let i = -1, l = !1;
    for (let a = t; a < e.length; a++) {
      if (e[a] === "{" && a + 1 < e.length && e[a + 1] === ".") {
        i = a, l = !0;
        break;
      }
      if (e[a] === "." && a + 1 < e.length && /[a-zA-Z_]/.test(e[a + 1])) {
        i = a, l = !1;
        break;
      }
    }
    if (i === -1) {
      t < e.length && n.push({ type: "text", text: e.slice(t) });
      break;
    }
    if (i > t && n.push({ type: "text", text: e.slice(t, i) }), l) {
      const a = Tt(e, i);
      if (a === null || a.args.length === 0) {
        n.push({ type: "text", text: e[i] }), t = i + 1;
        continue;
      }
      const o = a.args[0];
      n.push({ type: "call", text: o }), t = a.endPos, r = !0;
    } else {
      const a = kc(e, i);
      if (a === null) {
        n.push({ type: "text", text: "." }), t = i + 1;
        continue;
      }
      n.push({ type: "call", text: a.text }), t = a.endPos, r = !0;
    }
  }
  return r ? n : null;
}
function kc(e, n) {
  let t = n;
  const r = e.slice(t).match(_i);
  if (!r) return null;
  for (t += r[0].length; ; ) {
    const i = Tt(e, t);
    if (i !== null && (t = i.endPos), !e.startsWith(at, t)) break;
    const l = e.slice(t + at.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!l) break;
    t += at.length + l[0].length;
  }
  return { text: e.slice(n, t), endPos: t };
}
const bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  walkPlugin: Di
}, Symbol.toStringTag, { value: "Module" })), xc = /^([a-zA-Z_][a-zA-Z0-9_]*):\{/;
function br(e, n) {
  if (e[n] !== "{") return null;
  let t = 1;
  const r = n + 1;
  for (n++; n < e.length && t > 0 && (e[n] === "{" ? t++ : e[n] === "}" && t--, t > 0); )
    n++;
  return t !== 0 ? null : { content: e.slice(r, n), endPos: n + 1 };
}
function xr(e, n) {
  const t = [];
  let r = n;
  for (; r < e.length; ) {
    for (; r < e.length && /[ \t\r\n]/.test(e[r]); ) r++;
    if (r >= e.length) break;
    const i = e.slice(r).match(xc);
    if (i) {
      const l = i[1].length, a = r + l + 1, o = br(e, a);
      if (o === null) return null;
      t.push(i[1] + ":" + o.content), r = o.endPos;
      continue;
    }
    if (e[r] === "{") {
      const l = br(e, r);
      if (l === null) return null;
      t.push(l.content), r = l.endPos;
      continue;
    }
    break;
  }
  return { args: t, endPos: r };
}
const wc = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/, wr = "::";
function Li(e, n) {
  if (!e.startsWith(".")) return null;
  const t = e.match(wc);
  if (!t) return null;
  let r = t[0].length;
  const i = t[1], l = [], a = xr(e, r);
  if (a === null) return null;
  for (l.push({ name: i, args: a.args.map(Cr) }), r = a.endPos; e.startsWith(wr, r); ) {
    r += wr.length;
    const o = e.slice(r).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!o) break;
    r += o[0].length;
    const s = xr(e, r);
    if (s === null) break;
    l.push({ name: o[0], args: s.args.map(Cr) }), r = s.endPos;
  }
  return l.length > 1 ? { type: "qdChain", steps: l } : { type: "qdFunctionCall", name: i, args: l[0].args, inline: n };
}
function Sr(e) {
  const n = e.trim();
  if (n.startsWith(".")) {
    const t = Li(n, !1);
    if (t !== null)
      return t.type === "qdChain" ? { tag: "chain", nodes: t } : { tag: "call", node: t };
  }
  return { tag: "literal", text: n };
}
function Cr(e) {
  const n = e.trim(), t = n.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(?!\/\/)(.*)$/s);
  return t ? { name: t[1], value: Sr(t[2]) } : { name: void 0, value: Sr(n) };
}
function Sc(e) {
  const n = e.steps;
  let t = {
    type: "qdFunctionCall",
    name: n[0].name,
    args: n[0].args ?? [],
    inline: !1
  };
  for (let r = 1; r < n.length; r++) {
    const i = n[r], a = [{
      name: void 0,
      value: { tag: "call", node: t }
    }, ...i.args ?? []];
    t = {
      type: "qdFunctionCall",
      name: i.name,
      args: a,
      inline: !1
    };
  }
  return t;
}
function Cc(e) {
  return e.map((n) => {
    if (n.value.tag === "literal" && n.value.text.startsWith(".")) {
      const t = Li(n.value.text, !1);
      if (t !== null)
        return t.type === "qdChain" ? { ...n, value: { tag: "chain", nodes: t } } : { ...n, value: { tag: "call", node: t } };
    }
    return n;
  });
}
function Ae(e, n = 0) {
  const r = e.filter((i) => i.name === void 0)[n];
  return r && r.value.tag === "literal" ? r.value.text : "";
}
function Pe(e, n) {
  var r;
  return (r = e.filter((i) => i.name === void 0)[n]) == null ? void 0 : r.value;
}
function Gt(e) {
  if (!e || e.length === 0) return { params: [], bodyNodes: [] };
  const n = e[0];
  if (!n || n.type !== "paragraph" || !Array.isArray(n.children))
    return { params: [], bodyNodes: e };
  const t = [], r = [];
  let i = !1;
  for (const a of n.children)
    if (!i && a.type === "text") {
      const o = (a.value ?? "").split(`
`), s = [];
      let u = !1;
      for (const c of o) {
        if (!u) {
          const p = c.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)(\?)?:$/);
          if (p) {
            t.push({ name: p[1], optional: p[2] === "?", isBody: !1 });
            continue;
          } else
            u = !0;
        }
        s.push(c);
      }
      const f = s.join(`
`).replace(/^\n/, "");
      f && r.push({ type: "text", value: f }), t.length > 0 && (i = !0);
    } else
      r.push(a);
  t.length > 0 && (t[t.length - 1].isBody = !0);
  const l = [];
  return r.length > 0 && l.push({ ...n, children: r }), l.push(...e.slice(1)), { params: t, bodyNodes: l };
}
function vc(e) {
  const n = e.split(`
`), t = [], r = [];
  let i = !1;
  for (const l of n) {
    if (!i) {
      const a = l.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)(\?)?:$/);
      if (a) {
        t.push({
          name: a[1],
          optional: a[2] === "?",
          isBody: !1
        });
        continue;
      } else
        i = !0;
    }
    r.push(l);
  }
  return t.length > 0 && (t[t.length - 1].isBody = !0), { params: t, remaining: r.join(`
`) };
}
function Ac(e) {
  const { name: n, args: t } = e;
  switch (n) {
    case "function": {
      const r = Ae(t, 0), i = Pe(t, 1);
      let l = [], a = [];
      if (i) {
        if (i.tag === "literal") {
          const s = vc(i.text);
          l = s.params, a = s.remaining ? [{ type: "paragraph", children: [{ type: "text", value: s.remaining }] }] : [];
        } else if (i.tag === "block") {
          const s = i.nodes ?? [], u = Gt(s);
          return l = u.params, a = u.bodyNodes, {
            type: "qdFunctionDef",
            name: r,
            params: l,
            body: a
          };
        }
      }
      const o = t.find((s) => s.value.tag === "block");
      if (o && o.value.tag === "block") {
        const s = o.value.nodes ?? [], u = Gt(s);
        return l = u.params, a = u.bodyNodes, {
          type: "qdFunctionDef",
          name: r,
          params: l,
          body: a
        };
      }
      return {
        type: "qdFunctionDef",
        name: r,
        params: l,
        body: a
      };
    }
    case "var": {
      const r = Ae(t, 0), i = Pe(t, 1) ?? { tag: "literal", text: "" };
      return {
        type: "qdVariableDef",
        name: r,
        initializer: i
      };
    }
    case "let": {
      const r = Ae(t, 0), i = Pe(t, 1) ?? { tag: "literal", text: "" }, l = t.find((o) => o.value.tag === "block"), a = l && l.value.tag === "block" ? l.value.nodes ?? [] : [];
      return {
        type: "qdLet",
        name: r,
        initializer: i,
        body: a
      };
    }
    case "if":
    case "ifnot": {
      const r = Pe(t, 0) ?? { tag: "literal", text: "" }, i = Pe(t, 1), l = t.find((o) => o.value.tag === "block"), a = l && l.value.tag === "block" ? l.value.nodes ?? [] : i && i.tag === "literal" ? [{ type: "paragraph", children: [{ type: "text", value: i.text }] }] : [];
      return {
        type: "qdConditional",
        negate: n === "ifnot",
        condition: r,
        consequent: a
      };
    }
    case "foreach": {
      const r = Pe(t, 0) ?? { tag: "literal", text: "" }, i = t.find((s) => s.name !== void 0);
      let l = "_";
      const a = t.find((s) => s.value.tag === "block");
      let o = a && a.value.tag === "block" ? a.value.nodes ?? [] : [];
      if (i)
        l = i.name;
      else if (o.length > 0) {
        const s = Gt(o);
        if (s.params.length > 0)
          l = s.params[0].name, o = s.bodyNodes;
        else {
          const u = Pe(t, 1);
          u && u.tag === "literal" && (l = u.text || "_");
        }
      }
      return {
        type: "qdLoop",
        iterable: r,
        param: l,
        body: o
      };
    }
    case "repeat": {
      const r = Pe(t, 0) ?? { tag: "literal", text: "0" }, i = t.find((a) => a.value.tag === "block"), l = i && i.value.tag === "block" ? i.value.nodes ?? [] : [];
      return {
        type: "qdLoop",
        iterable: r,
        param: "_",
        body: l
      };
    }
    case "doctype":
      return {
        type: "qdMetadata",
        key: "type",
        value: Ae(t, 0)
      };
    case "docname":
      return {
        type: "qdMetadata",
        key: "name",
        value: Ae(t, 0)
      };
    case "author":
      return {
        type: "qdMetadata",
        key: "author",
        value: Ae(t, 0)
      };
    case "lang":
      return {
        type: "qdMetadata",
        key: "lang",
        value: Ae(t, 0)
      };
    case "theme": {
      const r = Ae(t, 0), i = Ae(t, 1);
      return {
        type: "qdMetadata",
        key: "theme",
        value: i ? `${r} ${i}` : r
      };
    }
    default:
      return e;
  }
}
function ot(e) {
  const n = [];
  for (const t of e)
    n.push(An(t));
  return n;
}
function Ec(e) {
  return e.map((n) => {
    if (n.value.tag === "call") {
      const t = An(n.value.node);
      return { ...n, value: { tag: "call", node: t } };
    }
    return n.value.tag === "block" ? {
      ...n,
      value: { tag: "block", nodes: ot(n.value.nodes ?? []) }
    } : n;
  });
}
function An(e) {
  if (!e || typeof e != "object") return e;
  if (e.type === "qdChain") {
    const n = Sc(e);
    return An(n);
  }
  if (e.type === "qdFunctionCall") {
    const n = e, t = Cc(n.args), r = { ...n, args: t }, i = Ac(r);
    return vr(i);
  }
  return vr(e);
}
function vr(e) {
  const n = { ...e };
  return Array.isArray(n.children) && (n.children = ot(n.children)), Array.isArray(n.args) && (n.args = Ec(n.args)), Array.isArray(n.body) && (n.body = ot(n.body)), Array.isArray(n.consequent) && (n.consequent = ot(n.consequent)), n;
}
const Mi = () => (e) => {
  const n = e;
  Array.isArray(n.children) && (n.children = ot(n.children));
}, Ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  refinePlugin: Mi
}, Symbol.toStringTag, { value: "Module" })), cn = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/, Ee = "::";
function Ar(e, n) {
  if (e[n] !== "{") return null;
  let t = 1;
  const r = n + 1;
  for (n++; n < e.length && t > 0 && (e[n] === "{" ? t++ : e[n] === "}" && t--, t > 0); )
    n++;
  return t !== 0 ? null : { content: e.slice(r, n), end: n + 1 };
}
function rt(e, n) {
  const t = [];
  let r = n;
  for (; r < e.length; ) {
    for (; r < e.length && /[ \t]/.test(e[r]); ) r++;
    if (r >= e.length) break;
    const i = e.slice(r).match(/^([a-zA-Z_][a-zA-Z0-9_]*):\{/);
    if (i) {
      const l = i[1].length, a = Ar(e, r + l + 1);
      if (a === null) break;
      t.push({ name: i[1], value: { tag: "literal", text: a.content.trim() } }), r = a.end;
      continue;
    }
    if (e[r] === "{") {
      const l = Ar(e, r);
      if (l === null) break;
      const a = l.content.trim();
      if (a.startsWith(".")) {
        const o = Tc(a);
        if (o) {
          t.push({ name: void 0, value: o.tag === "chain" ? { tag: "chain", nodes: o.nodes } : { tag: "call", node: o.node } }), r = l.end;
          continue;
        }
      }
      t.push({ name: void 0, value: { tag: "literal", text: a } }), r = l.end;
      continue;
    }
    break;
  }
  return { args: t, end: r };
}
function Tc(e) {
  if (!e.startsWith(".")) return null;
  const n = e.match(cn);
  if (!n) return null;
  let t = n[0].length;
  const r = n[1], i = [{ name: r }];
  for (; e.startsWith(Ee, t); ) {
    const a = e.slice(t + Ee.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!a) break;
    i.push({ name: a[0] }), t += Ee.length + a[0].length;
  }
  const { args: l } = rt(e, t);
  if (i.length > 1) {
    let a = {
      type: "qdFunctionCall",
      name: i[0].name,
      args: [],
      inline: !0
    };
    for (let o = 1; o < i.length; o++) {
      const s = o === i.length - 1 ? l : [];
      a = {
        type: "qdFunctionCall",
        name: i[o].name,
        args: [{ name: void 0, value: { tag: "call", node: a } }, ...s],
        inline: !0
      };
    }
    return { tag: "call", node: a };
  }
  return { tag: "call", node: { type: "qdFunctionCall", name: r, args: l, inline: !0 } };
}
function zc(e) {
  const n = [];
  let t = 0;
  for (; t < e.length; ) {
    let r = -1, i = !1;
    for (let l = t; l < e.length; l++) {
      if (e[l] === "{" && l + 1 < e.length && e[l + 1] === "." && l + 2 < e.length && /[a-zA-Z_]/.test(e[l + 2])) {
        r = l, i = !0;
        break;
      }
      if (e[l] === "." && l + 1 < e.length && /[a-zA-Z_]/.test(e[l + 1])) {
        r = l, i = !1;
        break;
      }
    }
    if (r === -1) {
      n.push({ type: "text", value: e.slice(t) });
      break;
    }
    if (i) {
      r > t && n.push({ type: "text", value: e.slice(t, r) });
      let l = 1, a = r + 1, o = a;
      for (; o < e.length && l > 0 && (e[o] === "{" ? l++ : e[o] === "}" && l--, l > 0); )
        o++;
      if (l !== 0) {
        n.push({ type: "text", value: "{" }), t = r + 1;
        continue;
      }
      const s = e.slice(a, o), u = s.match(cn);
      if (!u) {
        n.push({ type: "text", value: e.slice(r, o + 1) }), t = o + 1;
        continue;
      }
      let f = u[0].length;
      const c = [], { args: p, end: h } = rt(s, f);
      for (c.push({ name: u[1], args: p }), f = h; s.startsWith(Ee, f); ) {
        const g = s.slice(f + Ee.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (!g) break;
        f = f + Ee.length + g[0].length;
        const { args: A, end: y } = rt(s, f);
        c.push({ name: g[0], args: A }), f = y;
      }
      n.push({ type: "call", callText: s, start: r, chainSteps: c }), t = o + 1;
    } else {
      const l = r;
      l > t && n.push({ type: "text", value: e.slice(t, l) });
      const a = e.slice(l).match(cn);
      if (!a) {
        n.push({ type: "text", value: "." }), t = l + 1;
        continue;
      }
      let o = l + a[0].length;
      const s = [], { args: u, end: f } = rt(e, o);
      for (s.push({ name: a[1], args: u }), o = f; e.startsWith(Ee, o); ) {
        const c = e.slice(o + Ee.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (!c) break;
        o = o + Ee.length + c[0].length;
        const { args: h, end: g } = rt(e, o);
        s.push({ name: c[0], args: h }), o = g;
      }
      n.push({ type: "call", callText: e.slice(l, o), start: l, chainSteps: s }), t = o;
    }
  }
  return n;
}
function Fc(e) {
  let n = {
    type: "qdFunctionCall",
    name: e[0].name,
    args: e[0].args,
    inline: !0
  };
  for (let t = 1; t < e.length; t++)
    n = {
      type: "qdFunctionCall",
      name: e[t].name,
      args: [
        { name: void 0, value: { tag: "call", node: n } },
        ...e[t].args
      ],
      inline: !0
    };
  return n;
}
async function Pc(e, n) {
  const t = zc(e);
  if (!t.some((l) => l.type === "call")) return [{ type: "text", value: e }];
  const i = [];
  for (const l of t)
    if (l.type === "text")
      l.value && i.push({ type: "text", value: l.value });
    else {
      const o = Fc(l.chainSteps), s = await Ie(o, n);
      Array.isArray(s) ? i.push(...s) : s != null && i.push(s);
    }
  return i;
}
async function qi(e, n) {
  return await Ie(e, n);
}
async function Ie(e, n) {
  switch (e.type) {
    case "qdMetadata":
      return Nc(e, n);
    case "qdVariableDef":
      return _c(e, n);
    case "qdFunctionDef":
      return Dc(e, n);
    case "qdLet":
      return Lc(e, n);
    case "qdConditional":
      return Mc(e, n);
    case "qdLoop":
      return qc(e, n);
    case "qdFunctionCall":
      return Oc(e, n);
    case "qdChain":
      return n.addDiagnostic({ severity: "warning", message: "Unexpected qdChain node in expander — skipping" }), null;
    case "text":
      return Pc(e.value ?? "", n);
    default: {
      if (e.children) {
        const t = [];
        for (const r of e.children) {
          const i = await Ie(r, n);
          Array.isArray(i) ? t.push(...i) : i != null && t.push(i);
        }
        return { ...e, children: t };
      }
      return e;
    }
  }
}
async function Nc(e, n) {
  const t = n.metadata;
  switch (e.key) {
    case "author":
      t.authors || (t.authors = []), t.authors.push(e.value);
      break;
    case "theme": {
      const r = e.value.trim().split(/\s+/);
      t.theme = r[0], r[1] && (t.layoutTheme = r[1]);
      break;
    }
    case "type":
      t.type = e.value;
      break;
    case "name":
      t.name = e.value;
      break;
    case "lang":
      t.lang = e.value;
      break;
    default:
      t[e.key] = e.value;
  }
  return null;
}
async function _c(e, n) {
  const t = await I(e.initializer, n);
  return n.define(e.name, { kind: "variable", value: t }), null;
}
async function Dc(e, n) {
  return n.define(e.name, { kind: "user", def: e, closure: n }), null;
}
async function Lc(e, n) {
  const t = await I(e.initializer, n), r = n.fork({ [e.name]: { kind: "variable", value: t } }), i = [];
  for (const l of e.body) {
    const a = await Ie(l, r);
    Array.isArray(a) ? i.push(...a) : a != null && i.push(a);
  }
  return i;
}
async function Mc(e, n) {
  const t = await I(e.condition, n);
  let r = Oi(t);
  if (e.negate && (r = !r), !r) return [];
  const i = [];
  for (const l of e.consequent) {
    const a = await Ie(l, n);
    Array.isArray(a) ? i.push(...a) : a != null && i.push(a);
  }
  return i;
}
async function qc(e, n) {
  const t = await I(e.iterable, n), r = be(t), i = [];
  for (let l = 0; l < r.length; l++) {
    const a = r[l], o = {
      [e.param]: { kind: "variable", value: a },
      1: { kind: "variable", value: a }
    }, s = n.fork(o);
    for (const u of e.body) {
      const f = await Ie(u, s);
      Array.isArray(f) ? i.push(...f) : f != null && i.push(f);
    }
  }
  return i;
}
async function Oc(e, n) {
  const t = n.resolve(e.name);
  if (!t)
    return n.addDiagnostic({ severity: "warning", message: `Undefined function or variable: .${e.name}` }), [];
  switch (t.kind) {
    case "variable": {
      const r = zt(t.value);
      return r.length === 0 ? null : r.length === 1 ? r[0] : r;
    }
    case "builtin": {
      const r = e.args.map((a) => {
        const o = { ...a.value };
        return a.name && (o._name = a.name), o;
      }), i = await t.fn(r, n), l = zt(i);
      return l.length === 0 ? null : l.length === 1 ? l[0] : l;
    }
    case "user":
      return Rc(e, t);
  }
}
async function Rc(e, n, t) {
  const { def: r, closure: i } = n, l = {}, a = e.args.filter((f) => f.name === void 0), o = e.args.filter((f) => f.name !== void 0);
  for (let f = 0; f < r.params.length; f++) {
    const c = r.params[f], p = o.find((h) => h.name === c.name);
    if (p) {
      const h = await I(p.value, i);
      l[c.name] = { kind: "variable", value: h };
    } else if (f < a.length) {
      const h = await I(a[f].value, i);
      l[c.name] = { kind: "variable", value: h };
    }
  }
  const s = i.fork(l), u = [];
  for (const f of r.body) {
    const c = await Ie(f, s);
    Array.isArray(c) ? u.push(...c) : c != null && u.push(c);
  }
  return u;
}
async function I(e, n) {
  switch (e.tag) {
    case "literal":
      return Bc(e.text);
    case "call": {
      const t = await Ie(e.node, n);
      return Er(t);
    }
    case "block":
      return { kind: "markdown", nodes: e.nodes };
    case "chain": {
      const t = e.nodes.steps;
      if (t.length === 0) return { kind: "none" };
      let r = {
        type: "qdFunctionCall",
        name: t[0].name,
        args: t[0].args ?? [],
        inline: !1
      };
      for (let l = 1; l < t.length; l++) {
        const a = t[l], o = {
          name: void 0,
          value: { tag: "call", node: r }
        };
        r = {
          type: "qdFunctionCall",
          name: a.name,
          args: [o, ...a.args ?? []],
          inline: !1
        };
      }
      const i = await Ie(r, n);
      return Er(i);
    }
  }
}
function Bc(e) {
  if (e === "true") return { kind: "boolean", value: !0 };
  if (e === "false") return { kind: "boolean", value: !1 };
  if (/^-?\d+(\.\d+)?$/.test(e)) return { kind: "number", value: parseFloat(e) };
  const n = e.match(/^(-?\d+)\.\.(-?\d+)$/);
  if (n) return { kind: "range", from: parseInt(n[1]), to: parseInt(n[2]) };
  const t = e.match(/^(-?\d+(?:\.\d+)?)(px|em|rem|pt|cm|mm|in|vh|vw|%)$/);
  return t ? { kind: "size", value: parseFloat(t[1]), unit: t[2] } : { kind: "string", value: e };
}
function Er(e) {
  return e == null ? { kind: "none" } : Array.isArray(e) ? e.length === 0 ? { kind: "none" } : e.every((n) => n.type === "text") ? { kind: "string", value: e.map((n) => n.value).join("") } : { kind: "markdown", nodes: e } : e.type === "text" ? { kind: "string", value: e.value } : { kind: "markdown", nodes: [e] };
}
function zt(e) {
  switch (e.kind) {
    case "string":
      return [{ type: "text", value: e.value }];
    case "number":
      return [{ type: "text", value: String(e.value) }];
    case "boolean":
      return [{ type: "text", value: String(e.value) }];
    case "none":
      return [];
    case "markdown":
      return e.nodes;
    case "iterable":
      return e.items.flatMap(zt);
    case "range": {
      const n = [];
      for (let t = e.from; t <= e.to; t++)
        n.push({ type: "text", value: String(t) });
      return n;
    }
    default:
      return [{ type: "text", value: String(e.value ?? "") }];
  }
}
function be(e) {
  if (e.kind === "iterable") return e.items;
  if (e.kind === "range") {
    const n = [];
    for (let t = e.from; t <= e.to; t++)
      n.push({ kind: "number", value: t });
    return n;
  }
  if (e.kind === "number") {
    const n = [];
    for (let t = 1; t <= e.value; t++)
      n.push({ kind: "number", value: t });
    return n;
  }
  return [e];
}
function Oi(e) {
  return e.kind === "boolean" ? e.value : e.kind === "string" ? e.value === "true" : e.kind === "number" ? e.value !== 0 : e.kind !== "none";
}
const $c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  evalArg: I,
  expand: qi,
  iterateValue: be,
  toBool: Oi,
  valueToNodes: zt
}, Symbol.toStringTag, { value: "Module" }));
async function ge(e, n) {
  const t = await I(e, n);
  if (t.kind === "number") return t.value;
  if (t.kind === "string") return parseFloat(t.value);
  throw new Error(`Expected number, got ${t.kind}`);
}
async function et(e, n) {
  const t = await I(e, n);
  return t.kind === "boolean" ? t.value : t.kind === "string" ? t.value === "true" : t.kind === "number" ? t.value !== 0 : !1;
}
function Ir(e, n) {
  return e.kind !== n.kind ? String(e.value) === String(n.value) : e.value === n.value;
}
const jc = {
  // Structural — handled by expander as typed nodes; noops here for registry completeness
  if: async () => ({ kind: "none" }),
  ifnot: async () => ({ kind: "none" }),
  foreach: async () => ({ kind: "none" }),
  repeat: async () => ({ kind: "none" }),
  let: async () => ({ kind: "none" }),
  var: async () => ({ kind: "none" }),
  function: async () => ({ kind: "none" }),
  // Comparison
  equals: async ([e, n], t) => {
    const r = await I(e, t), i = await I(n, t);
    return { kind: "boolean", value: Ir(r, i) };
  },
  notEquals: async ([e, n], t) => {
    const r = await I(e, t), i = await I(n, t);
    return { kind: "boolean", value: !Ir(r, i) };
  },
  gt: async ([e, n], t) => ({ kind: "boolean", value: await ge(e, t) > await ge(n, t) }),
  lt: async ([e, n], t) => ({ kind: "boolean", value: await ge(e, t) < await ge(n, t) }),
  gte: async ([e, n], t) => ({ kind: "boolean", value: await ge(e, t) >= await ge(n, t) }),
  lte: async ([e, n], t) => ({ kind: "boolean", value: await ge(e, t) <= await ge(n, t) }),
  // Boolean
  and: async ([e, n], t) => ({ kind: "boolean", value: await et(e, t) && await et(n, t) }),
  or: async ([e, n], t) => ({ kind: "boolean", value: await et(e, t) || await et(n, t) }),
  not: async ([e], n) => ({ kind: "boolean", value: !await et(e, n) }),
  otherwise: async ([e, n], t) => {
    const r = await I(e, t);
    return r.kind === "none" ? I(n, t) : r;
  },
  // Range
  range: async ([e, n], t) => ({
    kind: "range",
    from: await ge(e, t),
    to: await ge(n, t)
  }),
  // Iterable helpers
  count: async ([e], n) => {
    const t = await I(e, n);
    return { kind: "number", value: be(t).length };
  },
  first: async ([e], n) => be(await I(e, n))[0] ?? { kind: "none" },
  last: async ([e], n) => {
    const t = be(await I(e, n));
    return t[t.length - 1] ?? { kind: "none" };
  },
  item: async ([e, n], t) => {
    const r = be(await I(e, t)), i = await ge(n, t);
    return r[i - 1] ?? { kind: "none" };
  },
  join: async ([e, n], t) => {
    const r = be(await I(e, t)), i = n ? String((await I(n, t)).value ?? "") : "";
    return { kind: "string", value: r.map((a) => String(a.value ?? "")).join(i) };
  },
  filter: async ([e], n) => ({ kind: "iterable", items: be(await I(e, n)) }),
  map: async ([e], n) => ({ kind: "iterable", items: be(await I(e, n)) }),
  sort: async ([e], n) => ({ kind: "iterable", items: [...be(await I(e, n))] })
};
async function W(e, n) {
  const t = await I(e, n);
  if (t.kind === "number") return t.value;
  if (t.kind === "string") return parseFloat(t.value);
  throw new Error(`Expected number, got ${t.kind}`);
}
const ee = (e) => ({ kind: "number", value: e }), Uc = {
  sum: async (e, n) => {
    if (e.length < 2) {
      const t = await I(e[0], n);
      if (t.kind === "iterable") {
        const r = t.items.reduce((i, l) => i + (l.value ?? 0), 0);
        return ee(r);
      }
      return t;
    }
    return ee(await W(e[0], n) + await W(e[1], n));
  },
  subtract: async ([e, n], t) => ee(await W(e, t) - await W(n, t)),
  multiply: async ([e, n], t) => ee(await W(e, t) * await W(n, t)),
  divide: async ([e, n], t) => {
    const r = await W(n, t);
    return ee(r === 0 ? NaN : await W(e, t) / r);
  },
  pow: async (e, n) => {
    const t = e.find((i) => i.name === void 0) ?? e[0], r = e.find((i) => i.name === "to") ?? e.find((i, l) => l === 1 && e[l].name === void 0);
    return ee(!t || !r ? Math.pow(await W(e[0], n), await W(e[1] ?? e[0], n)) : Math.pow(await W(t, n), await W(r, n)));
  },
  sqrt: async ([e], n) => ee(Math.sqrt(await W(e, n))),
  abs: async ([e], n) => ee(Math.abs(await W(e, n))),
  mod: async ([e, n], t) => ee(await W(e, t) % await W(n, t)),
  truncate: async ([e, n], t) => {
    const r = await W(e, t), i = n ? await W(n, t) : 0, l = Math.pow(10, i);
    return ee(Math.round(r * l) / l);
  },
  floor: async ([e], n) => ee(Math.floor(await W(e, n))),
  ceil: async ([e], n) => ee(Math.ceil(await W(e, n))),
  min: async ([e, n], t) => ee(Math.min(await W(e, t), await W(n, t))),
  max: async ([e, n], t) => ee(Math.max(await W(e, t), await W(n, t))),
  pi: async () => ({ kind: "number", value: Math.PI }),
  e: async () => ({ kind: "number", value: Math.E })
};
async function ue(e, n) {
  const t = await I(e, n);
  return t.kind === "string" ? t.value : t.kind === "number" || t.kind === "boolean" ? String(t.value) : String(t.value ?? "");
}
const Ne = (e) => ({ kind: "string", value: e }), Hc = {
  uppercase: async ([e], n) => Ne((await ue(e, n)).toUpperCase()),
  lowercase: async ([e], n) => Ne((await ue(e, n)).toLowerCase()),
  capitalize: async ([e], n) => {
    const t = await ue(e, n);
    return Ne(t.charAt(0).toUpperCase() + t.slice(1));
  },
  trim: async ([e], n) => Ne((await ue(e, n)).trim()),
  length: async ([e], n) => {
    const t = await I(e, n);
    return t.kind === "iterable" ? { kind: "number", value: t.items.length } : { kind: "number", value: (t.kind === "string" ? t.value : String(t.value ?? "")).length };
  },
  substring: async (e, n) => {
    const t = e.find((s) => s.name === void 0) ?? e[0], r = e.find((s) => s.name === "from"), i = e.find((s) => s.name === "to"), l = await ue(t, n), a = r ? parseInt(String((await I(r, n)).value ?? "0")) : 0, o = i ? parseInt(String((await I(i, n)).value ?? String(l.length))) : void 0;
    return Ne(l.substring(a, o));
  },
  replace: async ([e, n, t], r) => Ne((await ue(e, r)).replaceAll(await ue(n, r), await ue(t, r))),
  concat: async ([e, n], t) => Ne(await ue(e, t) + await ue(n, t)),
  tostring: async ([e], n) => {
    const t = await I(e, n);
    return Ne(String(t.value ?? ""));
  },
  tonumber: async ([e], n) => ({ kind: "number", value: parseFloat(await ue(e, n)) }),
  toboolean: async ([e], n) => ({ kind: "boolean", value: await ue(e, n) === "true" })
};
function Q(e, n = {}, t = []) {
  return { type: "qdLayout", layoutType: e, attrs: n, children: t };
}
function ce(e) {
  return e.kind === "markdown" ? e.nodes : e.kind === "string" ? [{ type: "paragraph", children: [{ type: "text", value: e.value }] }] : e.kind === "none" ? [] : [];
}
function tt(e, n) {
  return e.find((t) => t._name === n);
}
function gt(e) {
  return e.filter((n) => !n._name);
}
const Vc = {
  center: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("center")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("center", {}, ce(t))] };
  },
  row: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("row")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("row", {}, ce(t))] };
  },
  column: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("column")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("column", {}, ce(t))] };
  },
  grid: async (e, n) => {
    const t = tt(e, "cols") ?? e[0], r = gt(e)[0] ?? e[e.length - 1], i = t ? String((await I(t, n)).value ?? "2") : "2", l = r ? await I(r, n) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("grid", { cols: i }, ce(l))] };
  },
  stack: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("stack")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("stack", {}, ce(t))] };
  },
  box: async (e, n) => {
    const t = tt(e, "title"), r = gt(e)[0] ?? e[e.length - 1], i = t ? String((await I(t, n)).value ?? "") : "", l = r ? await I(r, n) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("box", { title: i }, ce(l))] };
  },
  alert: async (e, n) => {
    const t = tt(e, "type"), r = gt(e)[0] ?? e[e.length - 1], i = t ? String((await I(t, n)).value ?? "info") : "info", l = r ? await I(r, n) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("alert", { alertType: i }, ce(l))] };
  },
  collapsible: async ([e, n], t) => {
    const r = e ? String((await I(e, t)).value ?? "") : "", i = n ? await I(n, t) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("collapsible", { title: r }, ce(i))] };
  },
  tab: async ([e, n], t) => {
    const r = e ? String((await I(e, t)).value ?? "") : "", i = n ? await I(n, t) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("tab", { title: r }, ce(i))] };
  },
  tabs: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("tabs")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("tabs", {}, ce(t))] };
  },
  pagebreak: async () => ({ kind: "markdown", nodes: [Q("pagebreak")] }),
  space: async (e, n) => {
    const t = e[0] ? String((await I(e[0], n)).value ?? "1em") : "1em";
    return { kind: "markdown", nodes: [Q("space", { size: t })] };
  },
  hrule: async () => ({ kind: "markdown", nodes: [{ type: "thematicBreak" }] }),
  figure: async ([e], n) => {
    if (!e) return { kind: "markdown", nodes: [Q("figure")] };
    const t = await I(e, n);
    return { kind: "markdown", nodes: [Q("figure", {}, ce(t))] };
  },
  caption: async ([e], n) => {
    const t = e ? String((await I(e, n)).value ?? "") : "";
    return { kind: "markdown", nodes: [Q("caption", { text: t })] };
  },
  imagesize: async (e, n) => {
    const t = tt(e, "width"), r = tt(e, "height"), i = gt(e)[0] ?? e[e.length - 1], l = t ? String((await I(t, n)).value ?? "") : "", a = r ? String((await I(r, n)).value ?? "") : "", o = i ? await I(i, n) : { kind: "none" };
    return { kind: "markdown", nodes: [Q("imagesize", { width: l, height: a }, ce(o))] };
  }
};
function _e(e, n = {}, t = []) {
  return { type: "qdLayout", layoutType: e, attrs: n, children: t };
}
function Kt(e, n) {
  return e.find((t) => t._name === n);
}
function Xt(e) {
  return e.filter((n) => !n._name);
}
const Wc = {
  // Metadata — handled by expander as qdMetadata nodes; noops here
  doctype: async () => ({ kind: "none" }),
  docname: async () => ({ kind: "none" }),
  author: async () => ({ kind: "none" }),
  lang: async () => ({ kind: "none" }),
  theme: async () => ({ kind: "none" }),
  toc: async () => ({ kind: "markdown", nodes: [_e("toc")] }),
  id: async (e, n) => {
    const t = Xt(e)[0] ?? e[0], r = Xt(e)[1] ?? e[1], i = t ? String((await I(t, n)).value ?? "") : "", l = r ? await I(r, n) : { kind: "none" }, a = l.kind === "markdown" ? l.nodes : [];
    return { kind: "markdown", nodes: [_e("id", { name: i }, a)] };
  },
  ref: async ([e], n) => {
    const t = e ? String((await I(e, n)).value ?? "") : "";
    return { kind: "markdown", nodes: [_e("ref", { name: t })] };
  },
  footnote: async ([e], n) => {
    const t = e ? String((await I(e, n)).value ?? "") : "";
    return { kind: "markdown", nodes: [_e("footnote", { text: t })] };
  },
  numbering: async ([e], n) => {
    const t = e ? String((await I(e, n)).value ?? "") : "";
    return { kind: "markdown", nodes: [_e("numbering", { numberingType: t })] };
  },
  counter: async ([e], n) => {
    const t = e ? String((await I(e, n)).value ?? "") : "";
    return { kind: "markdown", nodes: [_e("counter", { name: t })] };
  },
  code: async (e, n) => {
    const t = Kt(e, "lang"), r = Kt(e, "linenumbers"), i = Kt(e, "focus"), l = Xt(e)[0] ?? e[e.length - 1], a = t ? String((await I(t, n)).value ?? "") : "", o = r ? (await I(r, n)).value !== !1 : !0, s = i ? String((await I(i, n)).value ?? "") : "", f = (l ? await I(l, n) : { value: "" }).value ?? "";
    return { kind: "markdown", nodes: [{ type: "code", lang: a, value: f, data: { lineNumbers: o, focus: s } }] };
  },
  codespan: async ([e], n) => ({ kind: "markdown", nodes: [{ type: "inlineCode", value: e ? String((await I(e, n)).value ?? "") : "" }] }),
  // Slides
  slide: async () => ({ kind: "markdown", nodes: [_e("slide")] }),
  speakernotes: async ([e], n) => {
    const t = e ? await I(e, n) : { kind: "none" }, r = t.kind === "markdown" ? t.nodes : [];
    return { kind: "markdown", nodes: [_e("speakernotes", {}, r)] };
  },
  slidetheme: async ([e], n) => (e && (n.metadata.slideTheme = String((await I(e, n)).value ?? "")), { kind: "none" }),
  slidetransition: async ([e], n) => (e && (n.metadata.slideTransition = String((await I(e, n)).value ?? "")), { kind: "none" }),
  // Page format
  pageformat: async ([e], n) => (e && (n.metadata.pageFormat = String((await I(e, n)).value ?? "A4")), { kind: "none" }),
  pageorientation: async ([e], n) => (e && (n.metadata.pageOrientation = String((await I(e, n)).value ?? "portrait")), { kind: "none" })
}, Zc = {
  /**
   * .include {path}
   * Fetches the file at `path`, runs stages 1–4 on it using the same context,
   * and splices the resulting mdast nodes in place.
   */
  include: async ([e], n) => {
    if (!e) return { kind: "none" };
    const t = String((await I(e, n)).value ?? "");
    try {
      const r = await n.fetch(t), { unified: i } = await Promise.resolve().then(() => Ml), { default: l } = await Promise.resolve().then(() => Ro), { default: a } = await Promise.resolve().then(() => tc), { walkPlugin: o } = await Promise.resolve().then(() => bc), { refinePlugin: s } = await Promise.resolve().then(() => Ic), { expand: u } = await Promise.resolve().then(() => $c), f = i().use(l).use(a).use(o).use(s), c = f.parse(r), p = await f.run(c);
      return { kind: "markdown", nodes: (await u(p, n)).children };
    } catch (r) {
      return n.addDiagnostic({ severity: "error", message: `Failed to include ${t}: ${r}` }), { kind: "none" };
    }
  },
  /**
   * .read {path}
   * Returns the content of a file as a raw string value.
   */
  read: async ([e], n) => {
    if (!e) return { kind: "none" };
    const t = String((await I(e, n)).value ?? "");
    try {
      return { kind: "string", value: await n.fetch(t) };
    } catch (r) {
      return n.addDiagnostic({ severity: "error", message: `Failed to read ${t}: ${r}` }), { kind: "none" };
    }
  },
  /**
   * .csv {path}
   * Reads a CSV file and returns an iterable of dicts.
   */
  csv: async ([e], n) => {
    if (!e) return { kind: "none" };
    const t = String((await I(e, n)).value ?? "");
    try {
      const i = (await n.fetch(t)).trim().split(`
`);
      if (i.length === 0) return { kind: "iterable", items: [] };
      const l = i[0].split(",").map((o) => o.trim());
      return { kind: "iterable", items: i.slice(1).map((o) => {
        const s = o.split(",").map((f) => f.trim()), u = {};
        return l.forEach((f, c) => {
          u[f] = { kind: "string", value: s[c] ?? "" };
        }), { kind: "dict", entries: u };
      }) };
    } catch (r) {
      return n.addDiagnostic({ severity: "error", message: `Failed to read CSV ${t}: ${r}` }), { kind: "none" };
    }
  }
};
function Qc(e) {
  const n = {
    ...jc,
    ...Uc,
    ...Hc,
    ...Vc,
    ...Wc,
    ...Zc
  };
  for (const [t, r] of Object.entries(n))
    e.define(t, { kind: "builtin", fn: r });
}
class En {
  constructor(n, t, r, i, l, a = null, o = {}) {
    this._metadata = n, this._diagnostics = t, this._fetch = r, this._plugins = i, this._baseUrl = l, this.parent = a, this.symbols = new Map(Object.entries(o));
  }
  resolve(n) {
    var t;
    return this.symbols.get(n) ?? ((t = this.parent) == null ? void 0 : t.resolve(n));
  }
  define(n, t) {
    this.symbols.set(n, t);
  }
  fork(n = {}) {
    return new En(
      this._metadata,
      this._diagnostics,
      this._fetch,
      this._plugins,
      this._baseUrl,
      this,
      n
    );
  }
  get metadata() {
    return this._metadata;
  }
  get diagnostics() {
    return this._diagnostics;
  }
  get fetch() {
    return this._fetch;
  }
  get plugins() {
    return this._plugins;
  }
  get baseUrl() {
    return this._baseUrl;
  }
  addDiagnostic(n) {
    this._diagnostics.push(n);
  }
}
function Yc(e = {}) {
  var l;
  const n = {};
  e.theme && (n.theme = e.theme), e.type && (n.type = e.type);
  const t = [], r = e.fetch ?? Gc(e.baseUrl ?? ""), i = new En(n, t, r, e.plugins ?? [], e.baseUrl ?? "");
  Qc(i);
  for (const a of e.plugins ?? []) {
    (l = a.setup) == null || l.call(a, i);
    for (const o of a.functions ?? [])
      i.define(o.name, { kind: "builtin", fn: o.fn });
  }
  return i;
}
function Gc(e) {
  return async (n) => {
    const t = e ? new URL(n, e).href : n, r = await fetch(t);
    if (!r.ok) throw new Error(`fetch failed: ${r.status} ${t}`);
    return r.text();
  };
}
function Kc(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Xc(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function Jc(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, i = n.lang ? n.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let l = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (l.data = { meta: n.meta }), e.patch(n, l), l = e.applyData(n, l), l = { type: "element", tagName: "pre", properties: {}, children: [l] }, e.patch(n, l), l;
}
function ef(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function tf(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function nf(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = Qe(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let a, o = e.footnoteCounts.get(r);
  o === void 0 ? (o = 0, e.footnoteOrder.push(r), a = e.footnoteOrder.length) : a = l + 1, o += 1, e.footnoteCounts.set(r, o);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(a) }]
  };
  e.patch(n, s);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(n, u), e.applyData(n, u);
}
function rf(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function lf(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function Ri(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const a = i[i.length - 1];
  return a && a.type === "text" ? a.value += r : i.push({ type: "text", value: r }), i;
}
function af(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Ri(e, n);
  const i = { src: Qe(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function of(e, n) {
  const t = { src: Qe(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function sf(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function uf(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return Ri(e, n);
  const i = { href: Qe(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function cf(e, n) {
  const t = { href: Qe(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function ff(e, n, t) {
  const r = e.all(n), i = t ? hf(t) : Bi(n), l = {}, a = [];
  if (typeof n.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const f = r[o];
    (i || o !== 0 || f.type !== "element" || f.tagName !== "p") && a.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? a.push(...f.children) : a.push(f);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && a.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: l, children: a };
  return e.patch(n, u), e.applyData(n, u);
}
function hf(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = Bi(t[r]);
  }
  return n;
}
function Bi(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function pf(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const a = r[i];
    if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function df(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function mf(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function gf(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const $i = Ui("end"), ji = Ui("start");
function Ui(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function yf(e) {
  const n = ji(e), t = $i(e);
  if (n && t)
    return { start: n, end: t };
}
function kf(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const a = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], a), i.push(a);
  }
  if (t.length > 0) {
    const a = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, o = ji(n.children[1]), s = $i(n.children[n.children.length - 1]);
    o && s && (a.position = { start: o, end: s }), i.push(a);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function bf(e, n, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", a = t && t.type === "table" ? t.align : void 0, o = a ? a.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < o; ) {
    const c = n.children[s], p = {}, h = a ? a[s] : void 0;
    h && (p.align = h);
    let g = { type: "element", tagName: l, properties: p, children: [] };
    c && (g.children = e.all(c), e.patch(c, g), g = e.applyData(c, g)), u.push(g);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, f), e.applyData(n, f);
}
function xf(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Tr = 9, zr = 32;
function wf(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      Fr(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(Fr(n.slice(i), i > 0, !1)), l.join("");
}
function Fr(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === Tr || l === zr; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === Tr || l === zr; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Sf(e, n) {
  const t = { type: "text", value: wf(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Cf(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const vf = {
  blockquote: Kc,
  break: Xc,
  code: Jc,
  delete: ef,
  emphasis: tf,
  footnoteReference: nf,
  heading: rf,
  html: lf,
  imageReference: af,
  image: of,
  inlineCode: sf,
  linkReference: uf,
  link: cf,
  listItem: ff,
  list: pf,
  paragraph: df,
  // @ts-expect-error: root is different, but hard to type.
  root: mf,
  strong: gf,
  table: kf,
  tableCell: xf,
  tableRow: bf,
  text: Sf,
  thematicBreak: Cf,
  toml: yt,
  yaml: yt,
  definition: yt,
  footnoteDefinition: yt
};
function yt() {
}
const Hi = -1, Mt = 0, st = 1, Ft = 2, In = 3, Tn = 4, zn = 5, Fn = 6, Vi = 7, Wi = 8, Pr = typeof self == "object" ? self : globalThis, Af = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, a] = n[i];
    switch (l) {
      case Mt:
      case Hi:
        return t(a, i);
      case st: {
        const o = t([], i);
        for (const s of a)
          o.push(r(s));
        return o;
      }
      case Ft: {
        const o = t({}, i);
        for (const [s, u] of a)
          o[r(s)] = r(u);
        return o;
      }
      case In:
        return t(new Date(a), i);
      case Tn: {
        const { source: o, flags: s } = a;
        return t(new RegExp(o, s), i);
      }
      case zn: {
        const o = t(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of a)
          o.set(r(s), r(u));
        return o;
      }
      case Fn: {
        const o = t(/* @__PURE__ */ new Set(), i);
        for (const s of a)
          o.add(r(s));
        return o;
      }
      case Vi: {
        const { name: o, message: s } = a;
        return t(new Pr[o](s), i);
      }
      case Wi:
        return t(BigInt(a), i);
      case "BigInt":
        return t(Object(BigInt(a)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(a).buffer, a);
      case "DataView": {
        const { buffer: o } = new Uint8Array(a);
        return t(new DataView(o), a);
      }
    }
    return t(new Pr[l](a), i);
  };
  return r;
}, Nr = (e) => Af(/* @__PURE__ */ new Map(), e)(0), Ue = "", { toString: Ef } = {}, { keys: If } = Object, nt = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [Mt, n];
  const t = Ef.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [st, Ue];
    case "Object":
      return [Ft, Ue];
    case "Date":
      return [In, Ue];
    case "RegExp":
      return [Tn, Ue];
    case "Map":
      return [zn, Ue];
    case "Set":
      return [Fn, Ue];
    case "DataView":
      return [st, t];
  }
  return t.includes("Array") ? [st, t] : t.includes("Error") ? [Vi, t] : [Ft, t];
}, kt = ([e, n]) => e === Mt && (n === "function" || n === "symbol"), Tf = (e, n, t, r) => {
  const i = (a, o) => {
    const s = r.push(a) - 1;
    return t.set(o, s), s;
  }, l = (a) => {
    if (t.has(a))
      return t.get(a);
    let [o, s] = nt(a);
    switch (o) {
      case Mt: {
        let f = a;
        switch (s) {
          case "bigint":
            o = Wi, f = a.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            f = null;
            break;
          case "undefined":
            return i([Hi], a);
        }
        return i([o, f], a);
      }
      case st: {
        if (s) {
          let p = a;
          return s === "DataView" ? p = new Uint8Array(a.buffer) : s === "ArrayBuffer" && (p = new Uint8Array(a)), i([s, [...p]], a);
        }
        const f = [], c = i([o, f], a);
        for (const p of a)
          f.push(l(p));
        return c;
      }
      case Ft: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, a.toString()], a);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, a.valueOf()], a);
          }
        if (n && "toJSON" in a)
          return l(a.toJSON());
        const f = [], c = i([o, f], a);
        for (const p of If(a))
          (e || !kt(nt(a[p]))) && f.push([l(p), l(a[p])]);
        return c;
      }
      case In:
        return i([o, a.toISOString()], a);
      case Tn: {
        const { source: f, flags: c } = a;
        return i([o, { source: f, flags: c }], a);
      }
      case zn: {
        const f = [], c = i([o, f], a);
        for (const [p, h] of a)
          (e || !(kt(nt(p)) || kt(nt(h)))) && f.push([l(p), l(h)]);
        return c;
      }
      case Fn: {
        const f = [], c = i([o, f], a);
        for (const p of a)
          (e || !kt(nt(p))) && f.push(l(p));
        return c;
      }
    }
    const { message: u } = a;
    return i([o, { name: s, message: u }], a);
  };
  return l;
}, _r = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Tf(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, Pt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? Nr(_r(e, n)) : structuredClone(e)
) : (e, n) => Nr(_r(e, n));
function zf(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function Ff(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function Pf(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || zf, r = e.options.footnoteBackLabel || Ff, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", a = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const f = e.all(u), c = String(u.identifier).toUpperCase(), p = Qe(c.toLowerCase());
    let h = 0;
    const g = [], k = e.footnoteCounts.get(c);
    for (; k !== void 0 && ++h <= k; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let b = typeof t == "string" ? t : t(s, h);
      typeof b == "string" && (b = { type: "text", value: b }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + p + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(b) ? b : [b]
      });
    }
    const A = f[f.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const b = A.children[A.children.length - 1];
      b && b.type === "text" ? b.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...g);
    } else
      f.push(...g);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + p },
      children: e.wrap(f, !0)
    };
    e.patch(u, y), o.push(y);
  }
  if (o.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...Pt(a),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const fn = {}.hasOwnProperty, Nf = {};
function _f(e, n) {
  const t = n || Nf, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), a = { ...vf, ...t.handlers }, o = {
    all: u,
    applyData: Lf,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: a,
    one: s,
    options: t,
    patch: Df,
    wrap: qf
  };
  return It(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, p = String(f.identifier).toUpperCase();
      c.has(p) || c.set(p, f);
    }
  }), o;
  function s(f, c) {
    const p = f.type, h = o.handlers[p];
    if (fn.call(o.handlers, p) && h)
      return h(o, f, c);
    if (o.options.passThrough && o.options.passThrough.includes(p)) {
      if ("children" in f) {
        const { children: k, ...A } = f, y = Pt(A);
        return y.children = o.all(f), y;
      }
      return Pt(f);
    }
    return (o.options.unknownHandler || Mf)(o, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const p = f.children;
      let h = -1;
      for (; ++h < p.length; ) {
        const g = o.one(p[h], f);
        if (g) {
          if (h && p[h - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = Dr(g.value)), !Array.isArray(g) && g.type === "element")) {
            const k = g.children[0];
            k && k.type === "text" && (k.value = Dr(k.value));
          }
          Array.isArray(g) ? c.push(...g) : c.push(g);
        }
      }
    }
    return c;
  }
}
function Df(e, n) {
  e.position && (n.position = yf(e));
}
function Lf(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const a = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: a };
      }
    t.type === "element" && l && Object.assign(t.properties, Pt(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function Mf(e, n) {
  const t = n.data || {}, r = "value" in n && !(fn.call(t, "hProperties") || fn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function qf(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function Dr(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function Lr(e, n) {
  const t = _f(e, n), r = t.one(e, void 0), i = Pf(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Of(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      Lr(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      Lr(t, { file: r, ...e || n })
    );
  };
}
const Rf = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
class ht {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
ht.prototype.normal = {};
ht.prototype.property = {};
ht.prototype.space = void 0;
function Zi(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new ht(t, r, n);
}
function hn(e) {
  return e.toLowerCase();
}
class le {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
le.prototype.attribute = "";
le.prototype.booleanish = !1;
le.prototype.boolean = !1;
le.prototype.commaOrSpaceSeparated = !1;
le.prototype.commaSeparated = !1;
le.prototype.defined = !1;
le.prototype.mustUseProperty = !1;
le.prototype.number = !1;
le.prototype.overloadedBoolean = !1;
le.prototype.property = "";
le.prototype.spaceSeparated = !1;
le.prototype.space = void 0;
let Bf = 0;
const L = Re(), Y = Re(), pn = Re(), C = Re(), V = Re(), Ve = Re(), oe = Re();
function Re() {
  return 2 ** ++Bf;
}
const dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: L,
  booleanish: Y,
  commaOrSpaceSeparated: oe,
  commaSeparated: Ve,
  number: C,
  overloadedBoolean: pn,
  spaceSeparated: V
}, Symbol.toStringTag, { value: "Module" })), Jt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(dn)
);
class Pn extends le {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(n, t, r, i) {
    let l = -1;
    if (super(n, t), Mr(this, "space", i), typeof r == "number")
      for (; ++l < Jt.length; ) {
        const a = Jt[l];
        Mr(this, Jt[l], (r & dn[a]) === dn[a]);
      }
  }
}
Pn.prototype.defined = !0;
function Mr(e, n, t) {
  t && (e[n] = t);
}
function Ye(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Pn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[hn(r)] = r, t[hn(l.attribute)] = r;
  }
  return new ht(n, t, e.space);
}
const Qi = Ye({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Y,
    ariaAutoComplete: null,
    ariaBusy: Y,
    ariaChecked: Y,
    ariaColCount: C,
    ariaColIndex: C,
    ariaColSpan: C,
    ariaControls: V,
    ariaCurrent: null,
    ariaDescribedBy: V,
    ariaDetails: null,
    ariaDisabled: Y,
    ariaDropEffect: V,
    ariaErrorMessage: null,
    ariaExpanded: Y,
    ariaFlowTo: V,
    ariaGrabbed: Y,
    ariaHasPopup: null,
    ariaHidden: Y,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: V,
    ariaLevel: C,
    ariaLive: null,
    ariaModal: Y,
    ariaMultiLine: Y,
    ariaMultiSelectable: Y,
    ariaOrientation: null,
    ariaOwns: V,
    ariaPlaceholder: null,
    ariaPosInSet: C,
    ariaPressed: Y,
    ariaReadOnly: Y,
    ariaRelevant: null,
    ariaRequired: Y,
    ariaRoleDescription: V,
    ariaRowCount: C,
    ariaRowIndex: C,
    ariaRowSpan: C,
    ariaSelected: Y,
    ariaSetSize: C,
    ariaSort: null,
    ariaValueMax: C,
    ariaValueMin: C,
    ariaValueNow: C,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Yi(e, n) {
  return n in e ? e[n] : n;
}
function Gi(e, n) {
  return Yi(e, n.toLowerCase());
}
const $f = Ye({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Ve,
    acceptCharset: V,
    accessKey: V,
    action: null,
    allow: null,
    allowFullScreen: L,
    allowPaymentRequest: L,
    allowUserMedia: L,
    alt: null,
    as: null,
    async: L,
    autoCapitalize: null,
    autoComplete: V,
    autoFocus: L,
    autoPlay: L,
    blocking: V,
    capture: null,
    charSet: null,
    checked: L,
    cite: null,
    className: V,
    cols: C,
    colSpan: null,
    content: null,
    contentEditable: Y,
    controls: L,
    controlsList: V,
    coords: C | Ve,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: L,
    defer: L,
    dir: null,
    dirName: null,
    disabled: L,
    download: pn,
    draggable: Y,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: L,
    formTarget: null,
    headers: V,
    height: C,
    hidden: pn,
    high: C,
    href: null,
    hrefLang: null,
    htmlFor: V,
    httpEquiv: V,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: L,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: L,
    itemId: null,
    itemProp: V,
    itemRef: V,
    itemScope: L,
    itemType: V,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: L,
    low: C,
    manifest: null,
    max: null,
    maxLength: C,
    media: null,
    method: null,
    min: null,
    minLength: C,
    multiple: L,
    muted: L,
    name: null,
    nonce: null,
    noModule: L,
    noValidate: L,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: L,
    optimum: C,
    pattern: null,
    ping: V,
    placeholder: null,
    playsInline: L,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: L,
    referrerPolicy: null,
    rel: V,
    required: L,
    reversed: L,
    rows: C,
    rowSpan: C,
    sandbox: V,
    scope: null,
    scoped: L,
    seamless: L,
    selected: L,
    shadowRootClonable: L,
    shadowRootDelegatesFocus: L,
    shadowRootMode: null,
    shape: null,
    size: C,
    sizes: null,
    slot: null,
    span: C,
    spellCheck: Y,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: C,
    step: null,
    style: null,
    tabIndex: C,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: L,
    useMap: null,
    value: Y,
    width: C,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: V,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: C,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: C,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: L,
    // Lists. Use CSS to reduce space between items instead
    declare: L,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: C,
    // `<img>` and `<object>`
    leftMargin: C,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: C,
    // `<body>`
    marginWidth: C,
    // `<body>`
    noResize: L,
    // `<frame>`
    noHref: L,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: L,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: L,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: C,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Y,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: C,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: C,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: L,
    disableRemotePlayback: L,
    prefix: null,
    property: null,
    results: C,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Gi
}), jf = Ye({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: oe,
    accentHeight: C,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: C,
    amplitude: C,
    arabicForm: null,
    ascent: C,
    attributeName: null,
    attributeType: null,
    azimuth: C,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: C,
    by: null,
    calcMode: null,
    capHeight: C,
    className: V,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: C,
    diffuseConstant: C,
    direction: null,
    display: null,
    dur: null,
    divisor: C,
    dominantBaseline: null,
    download: L,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: C,
    enableBackground: null,
    end: null,
    event: null,
    exponent: C,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: C,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Ve,
    g2: Ve,
    glyphName: Ve,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: C,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: C,
    horizOriginX: C,
    horizOriginY: C,
    id: null,
    ideographic: C,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: C,
    k: C,
    k1: C,
    k2: C,
    k3: C,
    k4: C,
    kernelMatrix: oe,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: C,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: C,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: C,
    overlineThickness: C,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: C,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: V,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: C,
    pointsAtY: C,
    pointsAtZ: C,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: oe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: oe,
    rev: oe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: oe,
    requiredFeatures: oe,
    requiredFonts: oe,
    requiredFormats: oe,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: C,
    specularExponent: C,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: C,
    strikethroughThickness: C,
    string: null,
    stroke: null,
    strokeDashArray: oe,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: C,
    strokeOpacity: C,
    strokeWidth: null,
    style: null,
    surfaceScale: C,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: oe,
    tabIndex: C,
    tableValues: null,
    target: null,
    targetX: C,
    targetY: C,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: oe,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: C,
    underlineThickness: C,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: C,
    values: null,
    vAlphabetic: C,
    vMathematical: C,
    vectorEffect: null,
    vHanging: C,
    vIdeographic: C,
    version: null,
    vertAdvY: C,
    vertOriginX: C,
    vertOriginY: C,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: C,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Yi
}), Ki = Ye({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), Xi = Ye({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Gi
}), Ji = Ye({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), Uf = /[A-Z]/g, qr = /-[a-z]/g, Hf = /^data[-\w.:]+$/i;
function Vf(e, n) {
  const t = hn(n);
  let r = n, i = le;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Hf.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(qr, Zf);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!qr.test(l)) {
        let a = l.replace(Uf, Wf);
        a.charAt(0) !== "-" && (a = "-" + a), n = "data" + a;
      }
    }
    i = Pn;
  }
  return new i(r, n);
}
function Wf(e) {
  return "-" + e.toLowerCase();
}
function Zf(e) {
  return e.charAt(1).toUpperCase();
}
const Qf = Zi([Qi, $f, Ki, Xi, Ji], "html"), el = Zi([Qi, jf, Ki, Xi, Ji], "svg"), Yf = /["&'<>`]/g, Gf = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Kf = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), Xf = /[|\\{}()[\]^$+*?.]/g, Or = /* @__PURE__ */ new WeakMap();
function Jf(e, n) {
  if (e = e.replace(
    n.subset ? eh(n.subset) : Yf,
    r
  ), n.subset || n.escapeOnly)
    return e;
  return e.replace(Gf, t).replace(Kf, r);
  function t(i, l, a) {
    return n.format(
      (i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) - 56320 + 65536,
      a.charCodeAt(l + 2),
      n
    );
  }
  function r(i, l, a) {
    return n.format(
      i.charCodeAt(0),
      a.charCodeAt(l + 1),
      n
    );
  }
}
function eh(e) {
  let n = Or.get(e);
  return n || (n = th(e), Or.set(e, n)), n;
}
function th(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n.push(e[t].replace(Xf, "\\$&"));
  return new RegExp("(?:" + n.join("|") + ")", "g");
}
const nh = /[\dA-Fa-f]/;
function rh(e, n, t) {
  const r = "&#x" + e.toString(16).toUpperCase();
  return t && n && !nh.test(String.fromCharCode(n)) ? r : r + ";";
}
const ih = /\d/;
function lh(e, n, t) {
  const r = "&#" + String(e);
  return t && n && !ih.test(String.fromCharCode(n)) ? r : r + ";";
}
const ah = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], en = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
}, oh = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], tl = {}.hasOwnProperty, mn = {};
let bt;
for (bt in en)
  tl.call(en, bt) && (mn[en[bt]] = bt);
const sh = /[^\dA-Za-z]/;
function uh(e, n, t, r) {
  const i = String.fromCharCode(e);
  if (tl.call(mn, i)) {
    const l = mn[i], a = "&" + l;
    return t && ah.includes(l) && !oh.includes(l) && (!r || n && n !== 61 && sh.test(String.fromCharCode(n))) ? a : a + ";";
  }
  return "";
}
function ch(e, n, t) {
  let r = rh(e, n, t.omitOptionalSemicolons), i;
  if ((t.useNamedReferences || t.useShortestReferences) && (i = uh(
    e,
    n,
    t.omitOptionalSemicolons,
    t.attribute
  )), (t.useShortestReferences || !i) && t.useShortestReferences) {
    const l = lh(e, n, t.omitOptionalSemicolons);
    l.length < r.length && (r = l);
  }
  return i && (!t.useShortestReferences || i.length < r.length) ? i : r;
}
function We(e, n) {
  return Jf(e, Object.assign({ format: ch }, n));
}
const fh = /^>|^->|<!--|-->|--!>|<!-$/g, hh = [">"], ph = ["<", ">"];
function dh(e, n, t, r) {
  return r.settings.bogusComments ? "<?" + We(
    e.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: hh
    })
  ) + ">" : "<!--" + e.value.replace(fh, i) + "-->";
  function i(l) {
    return We(
      l,
      Object.assign({}, r.settings.characterReferences, {
        subset: ph
      })
    );
  }
}
function mh(e, n, t, r) {
  return "<!" + (r.settings.upperDoctype ? "DOCTYPE" : "doctype") + (r.settings.tightDoctype ? "" : " ") + "html>";
}
function gh(e, n) {
  const t = n || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
function yh(e) {
  return e.join(" ").trim();
}
const kh = /[ \t\n\f\r]/g;
function Nn(e) {
  return typeof e == "object" ? e.type === "text" ? Rr(e.value) : !1 : Rr(e);
}
function Rr(e) {
  return e.replace(kh, "") === "";
}
const G = rl(1), nl = rl(-1), bh = [];
function rl(e) {
  return n;
  function n(t, r, i) {
    const l = t ? t.children : bh;
    let a = (r || 0) + e, o = l[a];
    if (!i)
      for (; o && Nn(o); )
        a += e, o = l[a];
    return o;
  }
}
const xh = {}.hasOwnProperty;
function il(e) {
  return n;
  function n(t, r, i) {
    return xh.call(e, t.tagName) && e[t.tagName](t, r, i);
  }
}
const _n = il({
  body: Sh,
  caption: tn,
  colgroup: tn,
  dd: Eh,
  dt: Ah,
  head: tn,
  html: wh,
  li: vh,
  optgroup: Ih,
  option: Th,
  p: Ch,
  rp: Br,
  rt: Br,
  tbody: Fh,
  td: $r,
  tfoot: Ph,
  th: $r,
  thead: zh,
  tr: Nh
});
function tn(e, n, t) {
  const r = G(t, n, !0);
  return !r || r.type !== "comment" && !(r.type === "text" && Nn(r.value.charAt(0)));
}
function wh(e, n, t) {
  const r = G(t, n);
  return !r || r.type !== "comment";
}
function Sh(e, n, t) {
  const r = G(t, n);
  return !r || r.type !== "comment";
}
function Ch(e, n, t) {
  const r = G(t, n);
  return r ? r.type === "element" && (r.tagName === "address" || r.tagName === "article" || r.tagName === "aside" || r.tagName === "blockquote" || r.tagName === "details" || r.tagName === "div" || r.tagName === "dl" || r.tagName === "fieldset" || r.tagName === "figcaption" || r.tagName === "figure" || r.tagName === "footer" || r.tagName === "form" || r.tagName === "h1" || r.tagName === "h2" || r.tagName === "h3" || r.tagName === "h4" || r.tagName === "h5" || r.tagName === "h6" || r.tagName === "header" || r.tagName === "hgroup" || r.tagName === "hr" || r.tagName === "main" || r.tagName === "menu" || r.tagName === "nav" || r.tagName === "ol" || r.tagName === "p" || r.tagName === "pre" || r.tagName === "section" || r.tagName === "table" || r.tagName === "ul") : !t || // Confusing parent.
  !(t.type === "element" && (t.tagName === "a" || t.tagName === "audio" || t.tagName === "del" || t.tagName === "ins" || t.tagName === "map" || t.tagName === "noscript" || t.tagName === "video"));
}
function vh(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && r.tagName === "li";
}
function Ah(e, n, t) {
  const r = G(t, n);
  return !!(r && r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"));
}
function Eh(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && (r.tagName === "dt" || r.tagName === "dd");
}
function Br(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && (r.tagName === "rp" || r.tagName === "rt");
}
function Ih(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && r.tagName === "optgroup";
}
function Th(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && (r.tagName === "option" || r.tagName === "optgroup");
}
function zh(e, n, t) {
  const r = G(t, n);
  return !!(r && r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot"));
}
function Fh(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && (r.tagName === "tbody" || r.tagName === "tfoot");
}
function Ph(e, n, t) {
  return !G(t, n);
}
function Nh(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && r.tagName === "tr";
}
function $r(e, n, t) {
  const r = G(t, n);
  return !r || r.type === "element" && (r.tagName === "td" || r.tagName === "th");
}
const _h = il({
  body: Mh,
  colgroup: qh,
  head: Lh,
  html: Dh,
  tbody: Oh
});
function Dh(e) {
  const n = G(e, -1);
  return !n || n.type !== "comment";
}
function Lh(e) {
  const n = /* @__PURE__ */ new Set();
  for (const r of e.children)
    if (r.type === "element" && (r.tagName === "base" || r.tagName === "title")) {
      if (n.has(r.tagName)) return !1;
      n.add(r.tagName);
    }
  const t = e.children[0];
  return !t || t.type === "element";
}
function Mh(e) {
  const n = G(e, -1, !0);
  return !n || n.type !== "comment" && !(n.type === "text" && Nn(n.value.charAt(0))) && !(n.type === "element" && (n.tagName === "meta" || n.tagName === "link" || n.tagName === "script" || n.tagName === "style" || n.tagName === "template"));
}
function qh(e, n, t) {
  const r = nl(t, n), i = G(e, -1, !0);
  return t && r && r.type === "element" && r.tagName === "colgroup" && _n(r, t.children.indexOf(r), t) ? !1 : !!(i && i.type === "element" && i.tagName === "col");
}
function Oh(e, n, t) {
  const r = nl(t, n), i = G(e, -1);
  return t && r && r.type === "element" && (r.tagName === "thead" || r.tagName === "tbody") && _n(r, t.children.indexOf(r), t) ? !1 : !!(i && i.type === "element" && i.tagName === "tr");
}
const xt = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function Rh(e, n, t, r) {
  const i = r.schema, l = i.space === "svg" ? !1 : r.settings.omitOptionalTags;
  let a = i.space === "svg" ? r.settings.closeEmptyElements : r.settings.voids.includes(e.tagName.toLowerCase());
  const o = [];
  let s;
  i.space === "html" && e.tagName === "svg" && (r.schema = el);
  const u = Bh(r, e.properties), f = r.all(
    i.space === "html" && e.tagName === "template" ? e.content : e
  );
  return r.schema = i, f && (a = !1), (u || !l || !_h(e, n, t)) && (o.push("<", e.tagName, u ? " " + u : ""), a && (i.space === "svg" || r.settings.closeSelfClosing) && (s = u.charAt(u.length - 1), (!r.settings.tightSelfClosing || s === "/" || s && s !== '"' && s !== "'") && o.push(" "), o.push("/")), o.push(">")), o.push(f), !a && (!l || !_n(e, n, t)) && o.push("</" + e.tagName + ">"), o.join("");
}
function Bh(e, n) {
  const t = [];
  let r = -1, i;
  if (n) {
    for (i in n)
      if (n[i] !== null && n[i] !== void 0) {
        const l = $h(e, i, n[i]);
        l && t.push(l);
      }
  }
  for (; ++r < t.length; ) {
    const l = e.settings.tightAttributes ? t[r].charAt(t[r].length - 1) : void 0;
    r !== t.length - 1 && l !== '"' && l !== "'" && (t[r] += " ");
  }
  return t.join("");
}
function $h(e, n, t) {
  const r = Vf(e.schema, n), i = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1, l = e.settings.allowDangerousCharacters ? 0 : 1;
  let a = e.quote, o;
  if (r.overloadedBoolean && (t === r.attribute || t === "") ? t = !0 : (r.boolean || r.overloadedBoolean) && (typeof t != "string" || t === r.attribute || t === "") && (t = !!t), t == null || t === !1 || typeof t == "number" && Number.isNaN(t))
    return "";
  const s = We(
    r.attribute,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: xt.name[i][l]
    })
  );
  return t === !0 || (t = Array.isArray(t) ? (r.commaSeparated ? gh : yh)(t, {
    padLeft: !e.settings.tightCommaSeparatedLists
  }) : String(t), e.settings.collapseEmptyAttributes && !t) ? s : (e.settings.preferUnquoted && (o = We(
    t,
    Object.assign({}, e.settings.characterReferences, {
      attribute: !0,
      subset: xt.unquoted[i][l]
    })
  )), o !== t && (e.settings.quoteSmart && At(t, a) > At(t, e.alternative) && (a = e.alternative), o = a + We(
    t,
    Object.assign({}, e.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: (a === "'" ? xt.single : xt.double)[i][l],
      attribute: !0
    })
  ) + a), s + (o && "=" + o));
}
const jh = ["<", "&"];
function ll(e, n, t, r) {
  return t && t.type === "element" && (t.tagName === "script" || t.tagName === "style") ? e.value : We(
    e.value,
    Object.assign({}, r.settings.characterReferences, {
      subset: jh
    })
  );
}
function Uh(e, n, t, r) {
  return r.settings.allowDangerousHtml ? e.value : ll(e, n, t, r);
}
function Hh(e, n, t, r) {
  return r.all(e);
}
const Vh = Ps("type", {
  invalid: Wh,
  unknown: Zh,
  handlers: { comment: dh, doctype: mh, element: Rh, raw: Uh, root: Hh, text: ll }
});
function Wh(e) {
  throw new Error("Expected node, not `" + e + "`");
}
function Zh(e) {
  const n = (
    /** @type {Nodes} */
    e
  );
  throw new Error("Cannot compile unknown node `" + n.type + "`");
}
const Qh = {}, Yh = {}, Gh = [];
function Kh(e, n) {
  const t = n || Qh, r = t.quote || '"', i = r === '"' ? "'" : '"';
  if (r !== '"' && r !== "'")
    throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
  return {
    one: Xh,
    all: Jh,
    settings: {
      omitOptionalTags: t.omitOptionalTags || !1,
      allowParseErrors: t.allowParseErrors || !1,
      allowDangerousCharacters: t.allowDangerousCharacters || !1,
      quoteSmart: t.quoteSmart || !1,
      preferUnquoted: t.preferUnquoted || !1,
      tightAttributes: t.tightAttributes || !1,
      upperDoctype: t.upperDoctype || !1,
      tightDoctype: t.tightDoctype || !1,
      bogusComments: t.bogusComments || !1,
      tightCommaSeparatedLists: t.tightCommaSeparatedLists || !1,
      tightSelfClosing: t.tightSelfClosing || !1,
      collapseEmptyAttributes: t.collapseEmptyAttributes || !1,
      allowDangerousHtml: t.allowDangerousHtml || !1,
      voids: t.voids || Rf,
      characterReferences: t.characterReferences || Yh,
      closeSelfClosing: t.closeSelfClosing || !1,
      closeEmptyElements: t.closeEmptyElements || !1
    },
    schema: t.space === "svg" ? el : Qf,
    quote: r,
    alternative: i
  }.one(
    Array.isArray(e) ? { type: "root", children: e } : e,
    void 0,
    void 0
  );
}
function Xh(e, n, t) {
  return Vh(e, n, t, this);
}
function Jh(e) {
  const n = [], t = e && e.children || Gh;
  let r = -1;
  for (; ++r < t.length; )
    n[r] = this.one(t[r], r, e);
  return n.join("");
}
function ep(e) {
  const n = this, t = { ...n.data("settings"), ...e };
  n.compiler = r;
  function r(i) {
    return Kh(i, t);
  }
}
const jr = {
  default: {
    "--qd-color-bg": "#ffffff",
    "--qd-color-text": "#1a1a1a",
    "--qd-color-primary": "#0066cc",
    "--qd-color-border": "#e0e0e0",
    "--qd-color-surface": "#f5f5f5",
    "--qd-font-body": "system-ui, sans-serif",
    "--qd-font-mono": "monospace",
    "--qd-font-size-base": "16px",
    "--qd-line-height": "1.6",
    "--qd-space": "1rem"
  },
  paperwhite: {
    "--qd-color-bg": "#faf9f7",
    "--qd-color-text": "#2c2c2c",
    "--qd-color-primary": "#1a5276",
    "--qd-color-border": "#d5c9b8",
    "--qd-color-surface": "#f0ece6",
    "--qd-font-body": 'Georgia, "Times New Roman", serif',
    "--qd-font-mono": '"Courier New", monospace',
    "--qd-font-size-base": "17px",
    "--qd-line-height": "1.7",
    "--qd-space": "1.2rem"
  },
  galactic: {
    "--qd-color-bg": "#0d1117",
    "--qd-color-text": "#e6edf3",
    "--qd-color-primary": "#58a6ff",
    "--qd-color-border": "#30363d",
    "--qd-color-surface": "#161b22",
    "--qd-font-body": '"Segoe UI", system-ui, sans-serif',
    "--qd-font-mono": '"Fira Code", monospace',
    "--qd-font-size-base": "16px",
    "--qd-line-height": "1.6",
    "--qd-space": "1rem"
  },
  dark: {
    "--qd-color-bg": "#1e1e1e",
    "--qd-color-text": "#d4d4d4",
    "--qd-color-primary": "#4ec9b0",
    "--qd-color-border": "#3c3c3c",
    "--qd-color-surface": "#252526",
    "--qd-font-body": '"Segoe UI", system-ui, sans-serif',
    "--qd-font-mono": '"Cascadia Code", monospace',
    "--qd-font-size-base": "15px",
    "--qd-line-height": "1.65",
    "--qd-space": "1rem"
  }
}, tp = {
  default: {},
  latex: {
    "--qd-font-body": '"Computer Modern", "Latin Modern", Georgia, serif',
    "--qd-font-size-base": "12pt",
    "--qd-line-height": "1.5",
    "--qd-space": "1.5em"
  }
};
function np(e = "default", n = "default") {
  const t = jr[e] ?? jr.default, r = tp[n] ?? {}, i = { ...t, ...r };
  return `:root {
${Object.entries(i).map(([a, o]) => `  ${a}: ${o};`).join(`
`)}
}`;
}
const rp = `
.qd-document { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: var(--qd-font-body); font-size: var(--qd-font-size-base); line-height: var(--qd-line-height); color: var(--qd-color-text); background: var(--qd-color-bg); }
.qd-center { display: flex; justify-content: center; text-align: center; }
.qd-row { display: flex; flex-direction: row; gap: var(--qd-space); align-items: flex-start; }
.qd-column { display: flex; flex-direction: column; gap: var(--qd-space); }
.qd-grid { display: grid; gap: var(--qd-space); grid-template-columns: repeat(var(--qd-grid-cols, 2), 1fr); }
.qd-stack { display: flex; flex-direction: column; gap: var(--qd-space); }
.qd-box { border: 1px solid var(--qd-color-border); border-radius: 4px; padding: var(--qd-space); background: var(--qd-color-surface); }
.qd-alert { border-left: 4px solid; padding: 0.75rem 1rem; border-radius: 0 4px 4px 0; margin: 1rem 0; }
.qd-alert--info { border-color: #0066cc; background: #e8f0fe; }
.qd-alert--warning { border-color: #f59e0b; background: #fef3c7; }
.qd-alert--error { border-color: #dc2626; background: #fee2e2; }
.qd-alert--success { border-color: #16a34a; background: #dcfce7; }
.qd-collapsible summary { cursor: pointer; font-weight: bold; }
.qd-tabs { border: 1px solid var(--qd-color-border); border-radius: 4px; overflow: hidden; }
.qd-pagebreak { page-break-after: always; break-after: page; }
.qd-space { height: var(--qd-space); }
.qd-figure { margin: 1.5rem auto; text-align: center; }
.qd-toc { margin: 1.5rem 0; padding: 1rem; background: var(--qd-color-surface); border-radius: 4px; }
.qd-toc ol { padding-left: 1.5rem; }
`, ip = {
  center: { tag: "div", className: "qd-center" },
  row: { tag: "div", className: "qd-row" },
  column: { tag: "div", className: "qd-column" },
  grid: { tag: "div", className: "qd-grid" },
  stack: { tag: "div", className: "qd-stack" },
  box: { tag: "div", className: "qd-box" },
  alert: { tag: "aside", className: "qd-alert" },
  collapsible: { tag: "details", className: "qd-collapsible" },
  tabs: { tag: "div", className: "qd-tabs" },
  tab: { tag: "div", className: "qd-tab" },
  pagebreak: { tag: "div", className: "qd-pagebreak" },
  space: { tag: "div", className: "qd-space" },
  figure: { tag: "figure", className: "qd-figure" },
  caption: { tag: "figcaption", className: "" },
  imagesize: { tag: "div", className: "qd-imagesize" },
  mermaid: { tag: "div", className: "mermaid" }
}, lp = {
  qdLayout(e, n) {
    const t = n.layoutType ?? "center", r = n.attrs ?? {}, i = ip[t] ?? { tag: "div", className: `qd-${t}` };
    if (t === "collapsible") {
      const a = r.title ?? "", o = {
        type: "element",
        tagName: "summary",
        properties: {},
        children: [{ type: "text", value: a }]
      }, s = e.all(n);
      return {
        type: "element",
        tagName: "details",
        properties: { className: ["qd-collapsible"] },
        children: [o, ...s]
      };
    }
    if (t === "alert")
      return {
        type: "element",
        tagName: "aside",
        properties: { className: ["qd-alert", `qd-alert--${r.alertType ?? "info"}`] },
        children: e.all(n)
      };
    if (t === "grid") {
      const a = r.cols ?? "2";
      return {
        type: "element",
        tagName: "div",
        properties: {
          className: ["qd-grid"],
          style: `--qd-grid-cols: ${a}`
        },
        children: e.all(n)
      };
    }
    if (t === "space") {
      const a = r.size ?? "1em";
      return {
        type: "element",
        tagName: "div",
        properties: {
          className: ["qd-space"],
          style: `height: ${a}`
        },
        children: []
      };
    }
    if (t === "caption") {
      const a = r.text ?? "";
      return {
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: [{ type: "text", value: a }]
      };
    }
    const l = {};
    return i.className && (l.className = [i.className]), {
      type: "element",
      tagName: i.tag,
      properties: l,
      children: e.all(n)
    };
  },
  qdToc(e, n) {
    return {
      type: "element",
      tagName: "nav",
      properties: { className: ["qd-toc"] },
      children: [{ type: "text", value: "[Table of Contents]" }]
    };
  },
  mermaid(e, n) {
    return {
      type: "element",
      tagName: "div",
      properties: { className: ["mermaid"] },
      children: e.all(n)
    };
  }
};
async function ap(e, n) {
  const t = {};
  for (const b of n.plugins)
    Object.assign(t, b.handlers ?? {});
  const r = { ...lp, ...t }, i = yn().use(Of, {
    allowDangerousHtml: !0,
    handlers: r
  }).use(ep, { allowDangerousHtml: !0 }), l = await i.run(e), a = i.stringify(l), o = [], s = [];
  for (const b of n.plugins)
    for (const v of b.clientScripts ?? [])
      v.position === "head" ? o.push(v) : s.push(v);
  const u = String(n.metadata.theme ?? "default"), f = String(n.metadata.layoutTheme ?? "default"), c = np(u, f), p = String(n.metadata.type ?? "plain"), h = `qd-document qd-${p}`, g = o.map(
    (b) => b.src ? `<link rel="stylesheet" href="${b.src}">` : `<style>${b.content}</style>`
  ).join(`
`), k = s.map(
    (b) => b.content ? `<script>${b.content}<\/script>` : `<script src="${b.src}"><\/script>`
  ).join(`
`), A = `<style>${c}
${rp}</style>`;
  let y;
  return p === "slides" ? y = `${A}
${g}
<div class="reveal"><div class="slides">
${a}
</div></div>
${k}` : y = `${A}
${g}
<div class="${h}">
${a}
</div>
${k}`, y.trim();
}
async function kp(e, n = {}) {
  const t = Yc(n), r = yn().use(li).use(Ni).use(hc).use(Di).use(Mi), i = r.parse(e), l = await r.run(i), a = await qi(l, t);
  return { html: await ap(a, t), metadata: t.metadata, diagnostics: t.diagnostics };
}
const op = {
  id: "katex-css",
  src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
  position: "head"
}, sp = {
  id: "katex-js",
  src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js",
  position: "body-end"
}, up = {
  id: "katex-autorender",
  src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js",
  position: "body-end"
}, cp = {
  id: "katex-init",
  content: `document.addEventListener('DOMContentLoaded', () => {
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ],
    throwOnError: false
  });
});`,
  position: "body-end"
};
function Ur(e, n) {
  try {
    return require("katex").renderToString(e, { throwOnError: !1, displayMode: n });
  } catch {
    return n ? `<pre>$$${e}$$</pre>` : `<code>$${e}$</code>`;
  }
}
const fp = {
  name: "math",
  handlers: {
    // Handle inline math: $ … $ (remark-math produces 'inlineMath' nodes)
    inlineMath(e, n) {
      return {
        type: "element",
        tagName: "span",
        properties: { className: ["qd-math-inline"] },
        children: [{ type: "raw", value: Ur(n.value, !1) }]
      };
    },
    // Handle block math: $$ … $$
    math(e, n) {
      return {
        type: "element",
        tagName: "div",
        properties: { className: ["qd-math-block"] },
        children: [{ type: "raw", value: Ur(n.value, !0) }]
      };
    }
  },
  clientScripts: [op, sp, up, cp]
};
function hp(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function pp(e, n) {
  try {
    const t = require("highlight.js");
    return n && t.getLanguage(n) ? t.highlight(e, { language: n, ignoreIllegals: !0 }).value : t.highlightAuto(e).value;
  } catch {
    return hp(e);
  }
}
function dp(e = "github") {
  return {
    name: "code",
    handlers: {
      code(n, t) {
        const r = t.lang ?? "", i = t.value ?? "", l = pp(i, r);
        return {
          type: "element",
          tagName: "pre",
          properties: {},
          children: [{
            type: "element",
            tagName: "code",
            properties: { className: r ? [`language-${r}`, "hljs"] : ["hljs"] },
            children: [{ type: "raw", value: l }]
          }]
        };
      }
    },
    clientScripts: [
      {
        id: "hljs-css",
        src: `https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/styles/${e}.min.css`,
        position: "head"
      },
      {
        id: "hljs-js",
        src: "https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/highlight.min.js",
        position: "body-end"
      },
      {
        id: "hljs-init",
        content: "if (typeof hljs !== 'undefined') hljs.highlightAll();",
        position: "body-end"
      }
    ]
  };
}
const mp = dp();
function gp(e) {
  return e.kind === "string" ? e.value : e.kind === "number" || e.kind === "boolean" ? String(e.value) : String(e.value ?? "");
}
const yp = {
  name: "diagrams",
  functions: [
    {
      name: "mermaid",
      params: [{ name: "body", optional: !1, isBody: !0 }],
      async fn([e], n) {
        const t = await I(e, n), r = gp(t);
        return {
          kind: "markdown",
          nodes: [{
            type: "qdLayout",
            layoutType: "mermaid",
            attrs: {},
            children: [{ type: "text", value: r }]
          }]
        };
      }
    }
  ],
  clientScripts: [
    {
      id: "mermaid-js",
      src: "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js",
      position: "body-end"
    },
    {
      id: "mermaid-init",
      content: "if (typeof mermaid !== 'undefined') mermaid.initialize({ startOnLoad: true });",
      position: "body-end"
    }
  ]
};
function bp(e = {}) {
  const { theme: n = "white", transition: t = "slide" } = e;
  return {
    name: "slides",
    clientScripts: [
      {
        id: "reveal-css",
        src: "https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css",
        position: "head"
      },
      {
        id: "reveal-theme-css",
        src: `https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/${n}.css`,
        position: "head"
      },
      {
        id: "reveal-js",
        src: "https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.esm.js",
        position: "body-end"
      },
      {
        id: "reveal-init",
        content: `import Reveal from 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.esm.js';
Reveal.initialize({ transition: '${t}', hash: true });`,
        position: "body-end"
      }
    ]
  };
}
const xp = {
  name: "paged",
  clientScripts: [
    {
      id: "paged-js",
      src: "https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.js",
      position: "body-end"
    }
  ]
}, wp = {
  name: "citations",
  functions: [
    {
      name: "bibliography",
      params: [{ name: "path", optional: !1, isBody: !1 }],
      async fn(e, n) {
        return n.addDiagnostic({ severity: "warning", message: "citations plugin: citeproc-js integration pending" }), { kind: "none" };
      }
    },
    {
      name: "cite",
      params: [{ name: "key", optional: !1, isBody: !1 }],
      async fn(e, n) {
        return { kind: "none" };
      }
    },
    {
      name: "references",
      params: [],
      async fn(e, n) {
        return { kind: "none" };
      }
    }
  ]
}, Sp = [fp, mp, yp];
export {
  wp as citationsPlugin,
  dp as codePlugin,
  kp as compile,
  mp as defaultCodePlugin,
  Sp as defaultPlugins,
  yp as diagramPlugin,
  fp as mathPlugin,
  xp as pagedPlugin,
  bp as slidesPlugin
};
