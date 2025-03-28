/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const va = "148", Zn = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 }, $n = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Ul = 0, ja = 1, Ol = 2, kc = 1, Nc = 2, es = 3, Dn = 0, Ht = 1, kt = 2, _s = 3, Bn = 0, Ci = 1, ra = 2, Ya = 3, Ja = 4, zl = 5, xi = 100, Hl = 101, Vl = 102, Ka = 103, Xa = 104, Wl = 200, ql = 201, jl = 202, Yl = 203, Gc = 204, Uc = 205, Jl = 206, Kl = 207, Xl = 208, Zl = 209, $l = 210, eh = 0, th = 1, nh = 2, aa = 3, ih = 4, sh = 5, rh = 6, ah = 7, Oc = 0, oh = 1, ch = 2, mn = 0, lh = 1, hh = 2, uh = 3, zc = 4, dh = 5, Hc = 300, wi = 301, Mi = 302, ls = 303, oa = 304, nr = 306, Rn = 1e3, Et = 1001, $s = 1002, bt = 1003, ca = 1004, Ys = 1005, nt = 1006, Vc = 1007, bn = 1008, Tt = 1009, Ah = 1010, fh = 1011, Wc = 1012, ph = 1013, Vn = 1014, Rt = 1015, Nt = 1016, gh = 1017, mh = 1018, yi = 1020, bh = 1021, _h = 1022, It = 1023, xh = 1024, Eh = 1025, qn = 1026, Si = 1027, ts = 1028, Ih = 1029, ns = 1030, Ch = 1031, yh = 1033, Js = 33776, dr = 33777, Ar = 33778, Ks = 33779, la = 35840, Za = 35841, ha = 35842, $a = 35843, qc = 36196, ua = 37492, da = 37496, Aa = 37808, eo = 37809, to = 37810, no = 37811, io = 37812, so = 37813, ro = 37814, ao = 37815, oo = 37816, co = 37817, lo = 37818, ho = 37819, uo = 37820, Ao = 37821, fa = 36492, hs = 2300, Bi = 2301, fr = 2302, fo = 2400, po = 2401, go = 2402, vh = 2500, wh = 1, jc = 2, tn = 3e3, Fe = 3001, Mh = 3200, Sh = 3201, Yc = 0, Bh = 1, Xt = "srgb", us = "srgb-linear", pr = 7680, Th = 519, pa = 35044, mo = "300 es", ga = 1035;
class _n {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0)
      return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0)
      return;
    const i = this._listeners[e];
    if (i !== void 0) {
      const s = i.indexOf(t);
      s !== -1 && i.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0)
      return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const i = n.slice(0);
      for (let s = 0, a = i.length; s < a; s++)
        i[s].call(this, e);
      e.target = null;
    }
  }
}
const Ct = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let bo = 1234567;
const ss = Math.PI / 180, ds = 180 / Math.PI;
function Jt() {
  const r = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Ct[r & 255] + Ct[r >> 8 & 255] + Ct[r >> 16 & 255] + Ct[r >> 24 & 255] + "-" + Ct[e & 255] + Ct[e >> 8 & 255] + "-" + Ct[e >> 16 & 15 | 64] + Ct[e >> 24 & 255] + "-" + Ct[t & 63 | 128] + Ct[t >> 8 & 255] + "-" + Ct[t >> 16 & 255] + Ct[t >> 24 & 255] + Ct[n & 255] + Ct[n >> 8 & 255] + Ct[n >> 16 & 255] + Ct[n >> 24 & 255]).toLowerCase();
}
function lt(r, e, t) {
  return Math.max(e, Math.min(t, r));
}
function wa(r, e) {
  return (r % e + e) % e;
}
function Dh(r, e, t, n, i) {
  return n + (r - e) * (i - n) / (t - e);
}
function Rh(r, e, t) {
  return r !== e ? (t - r) / (e - r) : 0;
}
function rs(r, e, t) {
  return (1 - t) * r + t * e;
}
function Lh(r, e, t, n) {
  return rs(r, e, 1 - Math.exp(-t * n));
}
function Qh(r, e = 1) {
  return e - Math.abs(wa(r, e * 2) - e);
}
function Ph(r, e, t) {
  return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * (3 - 2 * r));
}
function Fh(r, e, t) {
  return r <= e ? 0 : r >= t ? 1 : (r = (r - e) / (t - e), r * r * r * (r * (r * 6 - 15) + 10));
}
function kh(r, e) {
  return r + Math.floor(Math.random() * (e - r + 1));
}
function Nh(r, e) {
  return r + Math.random() * (e - r);
}
function Gh(r) {
  return r * (0.5 - Math.random());
}
function Uh(r) {
  r !== void 0 && (bo = r);
  let e = bo += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function Oh(r) {
  return r * ss;
}
function zh(r) {
  return r * ds;
}
function ma(r) {
  return (r & r - 1) === 0 && r !== 0;
}
function Jc(r) {
  return Math.pow(2, Math.ceil(Math.log(r) / Math.LN2));
}
function er(r) {
  return Math.pow(2, Math.floor(Math.log(r) / Math.LN2));
}
function Hh(r, e, t, n, i) {
  const s = Math.cos, a = Math.sin, o = s(t / 2), c = a(t / 2), l = s((e + n) / 2), h = a((e + n) / 2), u = s((e - n) / 2), d = a((e - n) / 2), f = s((n - e) / 2), g = a((n - e) / 2);
  switch (i) {
    case "XYX":
      r.set(o * h, c * u, c * d, o * l);
      break;
    case "YZY":
      r.set(c * d, o * h, c * u, o * l);
      break;
    case "ZXZ":
      r.set(c * u, c * d, o * h, o * l);
      break;
    case "XZX":
      r.set(o * h, c * g, c * f, o * l);
      break;
    case "YXY":
      r.set(c * f, o * h, c * g, o * l);
      break;
    case "ZYZ":
      r.set(c * g, c * f, o * h, o * l);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
  }
}
function pn(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint16Array:
      return r / 65535;
    case Uint8Array:
      return r / 255;
    case Int16Array:
      return Math.max(r / 32767, -1);
    case Int8Array:
      return Math.max(r / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function qe(r, e) {
  switch (e.constructor) {
    case Float32Array:
      return r;
    case Uint16Array:
      return Math.round(r * 65535);
    case Uint8Array:
      return Math.round(r * 255);
    case Int16Array:
      return Math.round(r * 32767);
    case Int8Array:
      return Math.round(r * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
var Vh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  DEG2RAD: ss,
  RAD2DEG: ds,
  generateUUID: Jt,
  clamp: lt,
  euclideanModulo: wa,
  mapLinear: Dh,
  inverseLerp: Rh,
  lerp: rs,
  damp: Lh,
  pingpong: Qh,
  smoothstep: Ph,
  smootherstep: Fh,
  randInt: kh,
  randFloat: Nh,
  randFloatSpread: Gh,
  seededRandom: Uh,
  degToRad: Oh,
  radToDeg: zh,
  isPowerOfTwo: ma,
  ceilPowerOfTwo: Jc,
  floorPowerOfTwo: er,
  setQuaternionFromProperEuler: Hh,
  normalize: qe,
  denormalize: pn
});
class fe {
  constructor(e = 0, t = 0) {
    fe.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, i = e.elements;
    return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), i = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * i + e.x, this.y = s * i + a * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Gt {
  constructor() {
    Gt.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
  }
  set(e, t, n, i, s, a, o, c, l) {
    const h = this.elements;
    return h[0] = e, h[1] = i, h[2] = o, h[3] = t, h[4] = s, h[5] = c, h[6] = n, h[7] = a, h[8] = l, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, i = t.elements, s = this.elements, a = n[0], o = n[3], c = n[6], l = n[1], h = n[4], u = n[7], d = n[2], f = n[5], g = n[8], p = i[0], A = i[3], m = i[6], E = i[1], b = i[4], _ = i[7], I = i[2], w = i[5], T = i[8];
    return s[0] = a * p + o * E + c * I, s[3] = a * A + o * b + c * w, s[6] = a * m + o * _ + c * T, s[1] = l * p + h * E + u * I, s[4] = l * A + h * b + u * w, s[7] = l * m + h * _ + u * T, s[2] = d * p + f * E + g * I, s[5] = d * A + f * b + g * w, s[8] = d * m + f * _ + g * T, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8];
    return t * a * h - t * o * l - n * s * h + n * o * c + i * s * l - i * a * c;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], u = h * a - o * l, d = o * c - h * s, f = l * s - a * c, g = t * u + n * d + i * f;
    if (g === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const p = 1 / g;
    return e[0] = u * p, e[1] = (i * l - h * n) * p, e[2] = (o * n - i * a) * p, e[3] = d * p, e[4] = (h * t - i * c) * p, e[5] = (i * s - o * t) * p, e[6] = f * p, e[7] = (n * c - l * t) * p, e[8] = (a * t - n * s) * p, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, i, s, a, o) {
    const c = Math.cos(s), l = Math.sin(s);
    return this.set(
      n * c,
      n * l,
      -n * (c * a + l * o) + a + e,
      -i * l,
      i * c,
      -i * (-l * a + c * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  scale(e, t) {
    return this.premultiply(gr.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(gr.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(gr.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let i = 0; i < 9; i++)
      if (t[i] !== n[i])
        return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const gr = /* @__PURE__ */ new Gt();
function Kc(r) {
  for (let e = r.length - 1; e >= 0; --e)
    if (r[e] >= 65535)
      return !0;
  return !1;
}
function As(r) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", r);
}
function jn(r) {
  return r < 0.04045 ? r * 0.0773993808 : Math.pow(r * 0.9478672986 + 0.0521327014, 2.4);
}
function Xs(r) {
  return r < 31308e-7 ? r * 12.92 : 1.055 * Math.pow(r, 0.41666) - 0.055;
}
const mr = {
  [Xt]: { [us]: jn },
  [us]: { [Xt]: Xs }
}, wt = {
  legacyMode: !0,
  get workingColorSpace() {
    return us;
  },
  set workingColorSpace(r) {
    console.warn("THREE.ColorManagement: .workingColorSpace is readonly.");
  },
  convert: function(r, e, t) {
    if (this.legacyMode || e === t || !e || !t)
      return r;
    if (mr[e] && mr[e][t] !== void 0) {
      const n = mr[e][t];
      return r.r = n(r.r), r.g = n(r.g), r.b = n(r.b), r;
    }
    throw new Error("Unsupported color space conversion.");
  },
  fromWorkingColorSpace: function(r, e) {
    return this.convert(r, this.workingColorSpace, e);
  },
  toWorkingColorSpace: function(r, e) {
    return this.convert(r, e, this.workingColorSpace);
  }
}, Xc = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, ct = { r: 0, g: 0, b: 0 }, Wt = { h: 0, s: 0, l: 0 }, xs = { h: 0, s: 0, l: 0 };
function br(r, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? r + (e - r) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? r + (e - r) * 6 * (2 / 3 - t) : r;
}
function Es(r, e) {
  return e.r = r.r, e.g = r.g, e.b = r.b, e;
}
class we {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, t === void 0 && n === void 0 ? this.set(e) : this.setRGB(e, t, n);
  }
  set(e) {
    return e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e), this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = Xt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, wt.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, i = wt.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, wt.toWorkingColorSpace(this, i), this;
  }
  setHSL(e, t, n, i = wt.workingColorSpace) {
    if (e = wa(e, 1), t = lt(t, 0, 1), n = lt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = br(a, s, e + 1 / 3), this.g = br(a, s, e), this.b = br(a, s, e - 1 / 3);
    }
    return wt.toWorkingColorSpace(this, i), this;
  }
  setStyle(e, t = Xt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = i[1], o = i[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return this.r = Math.min(255, parseInt(s[1], 10)) / 255, this.g = Math.min(255, parseInt(s[2], 10)) / 255, this.b = Math.min(255, parseInt(s[3], 10)) / 255, wt.toWorkingColorSpace(this, t), n(s[4]), this;
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return this.r = Math.min(100, parseInt(s[1], 10)) / 100, this.g = Math.min(100, parseInt(s[2], 10)) / 100, this.b = Math.min(100, parseInt(s[3], 10)) / 100, wt.toWorkingColorSpace(this, t), n(s[4]), this;
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) {
            const c = parseFloat(s[1]) / 360, l = parseFloat(s[2]) / 100, h = parseFloat(s[3]) / 100;
            return n(s[4]), this.setHSL(c, l, h, t);
          }
          break;
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = i[1], a = s.length;
      if (a === 3)
        return this.r = parseInt(s.charAt(0) + s.charAt(0), 16) / 255, this.g = parseInt(s.charAt(1) + s.charAt(1), 16) / 255, this.b = parseInt(s.charAt(2) + s.charAt(2), 16) / 255, wt.toWorkingColorSpace(this, t), this;
      if (a === 6)
        return this.r = parseInt(s.charAt(0) + s.charAt(1), 16) / 255, this.g = parseInt(s.charAt(2) + s.charAt(3), 16) / 255, this.b = parseInt(s.charAt(4) + s.charAt(5), 16) / 255, wt.toWorkingColorSpace(this, t), this;
    }
    return e && e.length > 0 ? this.setColorName(e, t) : this;
  }
  setColorName(e, t = Xt) {
    const n = Xc[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = jn(e.r), this.g = jn(e.g), this.b = jn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Xs(e.r), this.g = Xs(e.g), this.b = Xs(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Xt) {
    return wt.fromWorkingColorSpace(Es(this, ct), e), lt(ct.r * 255, 0, 255) << 16 ^ lt(ct.g * 255, 0, 255) << 8 ^ lt(ct.b * 255, 0, 255) << 0;
  }
  getHexString(e = Xt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = wt.workingColorSpace) {
    wt.fromWorkingColorSpace(Es(this, ct), t);
    const n = ct.r, i = ct.g, s = ct.b, a = Math.max(n, i, s), o = Math.min(n, i, s);
    let c, l;
    const h = (o + a) / 2;
    if (o === a)
      c = 0, l = 0;
    else {
      const u = a - o;
      switch (l = h <= 0.5 ? u / (a + o) : u / (2 - a - o), a) {
        case n:
          c = (i - s) / u + (i < s ? 6 : 0);
          break;
        case i:
          c = (s - n) / u + 2;
          break;
        case s:
          c = (n - i) / u + 4;
          break;
      }
      c /= 6;
    }
    return e.h = c, e.s = l, e.l = h, e;
  }
  getRGB(e, t = wt.workingColorSpace) {
    return wt.fromWorkingColorSpace(Es(this, ct), t), e.r = ct.r, e.g = ct.g, e.b = ct.b, e;
  }
  getStyle(e = Xt) {
    return wt.fromWorkingColorSpace(Es(this, ct), e), e !== Xt ? `color(${e} ${ct.r} ${ct.g} ${ct.b})` : `rgb(${ct.r * 255 | 0},${ct.g * 255 | 0},${ct.b * 255 | 0})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Wt), Wt.h += e, Wt.s += t, Wt.l += n, this.setHSL(Wt.h, Wt.s, Wt.l), this;
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Wt), e.getHSL(xs);
    const n = rs(Wt.h, xs.h, t), i = rs(Wt.s, xs.s, t), s = rs(Wt.l, xs.l, t);
    return this.setHSL(n, i, s), this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
we.NAMES = Xc;
let ei;
class Zc {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      ei === void 0 && (ei = As("canvas")), ei.width = e.width, ei.height = e.height;
      const n = ei.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = ei;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = As("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const i = n.getImageData(0, 0, e.width, e.height), s = i.data;
      for (let a = 0; a < s.length; a++)
        s[a] = jn(s[a] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(jn(t[n] / 255) * 255) : t[n] = jn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
class $c {
  constructor(e = null) {
    this.isSource = !0, this.uuid = Jt(), this.data = e, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let s;
      if (Array.isArray(i)) {
        s = [];
        for (let a = 0, o = i.length; a < o; a++)
          i[a].isDataTexture ? s.push(_r(i[a].image)) : s.push(_r(i[a]));
      } else
        s = _r(i);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function _r(r) {
  return typeof HTMLImageElement < "u" && r instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && r instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && r instanceof ImageBitmap ? Zc.getDataURL(r) : r.data ? {
    data: Array.from(r.data),
    width: r.width,
    height: r.height,
    type: r.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Wh = 0;
class ht extends _n {
  constructor(e = ht.DEFAULT_IMAGE, t = ht.DEFAULT_MAPPING, n = Et, i = Et, s = nt, a = bn, o = It, c = Tt, l = ht.DEFAULT_ANISOTROPY, h = tn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Wh++ }), this.uuid = Jt(), this.name = "", this.source = new $c(e), this.mipmaps = [], this.mapping = t, this.wrapS = n, this.wrapT = i, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new fe(0, 0), this.repeat = new fe(1, 1), this.center = new fe(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Gt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.encoding = e.encoding, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.5,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      type: this.type,
      encoding: this.encoding,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== Hc)
      return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Rn:
          e.x = e.x - Math.floor(e.x);
          break;
        case Et:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case $s:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Rn:
          e.y = e.y - Math.floor(e.y);
          break;
        case Et:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case $s:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
}
ht.DEFAULT_IMAGE = null;
ht.DEFAULT_MAPPING = Hc;
ht.DEFAULT_ANISOTROPY = 1;
class je {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    je.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = i;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, i) {
    return this.x = e, this.y = t, this.z = n, this.w = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, i = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * s, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, i, s;
    const c = e.elements, l = c[0], h = c[4], u = c[8], d = c[1], f = c[5], g = c[9], p = c[2], A = c[6], m = c[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - p) < 0.01 && Math.abs(g - A) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + p) < 0.1 && Math.abs(g + A) < 0.1 && Math.abs(l + f + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const b = (l + 1) / 2, _ = (f + 1) / 2, I = (m + 1) / 2, w = (h + d) / 4, T = (u + p) / 4, x = (g + A) / 4;
      return b > _ && b > I ? b < 0.01 ? (n = 0, i = 0.707106781, s = 0.707106781) : (n = Math.sqrt(b), i = w / n, s = T / n) : _ > I ? _ < 0.01 ? (n = 0.707106781, i = 0, s = 0.707106781) : (i = Math.sqrt(_), n = w / i, s = x / i) : I < 0.01 ? (n = 0.707106781, i = 0.707106781, s = 0) : (s = Math.sqrt(I), n = T / s, i = x / s), this.set(n, i, s, t), this;
    }
    let E = Math.sqrt((A - g) * (A - g) + (u - p) * (u - p) + (d - h) * (d - h));
    return Math.abs(E) < 1e-3 && (E = 1), this.x = (A - g) / E, this.y = (u - p) / E, this.z = (d - h) / E, this.w = Math.acos((l + f + m - 1) / 2), this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Jn extends _n {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isWebGLRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new je(0, 0, e, t), this.scissorTest = !1, this.viewport = new je(0, 0, e, t);
    const i = { width: e, height: t, depth: 1 };
    this.texture = new ht(i, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = n.generateMipmaps !== void 0 ? n.generateMipmaps : !1, this.texture.internalFormat = n.internalFormat !== void 0 ? n.internalFormat : null, this.texture.minFilter = n.minFilter !== void 0 ? n.minFilter : nt, this.depthBuffer = n.depthBuffer !== void 0 ? n.depthBuffer : !0, this.stencilBuffer = n.stencilBuffer !== void 0 ? n.stencilBuffer : !1, this.depthTexture = n.depthTexture !== void 0 ? n.depthTexture : null, this.samples = n.samples !== void 0 ? n.samples : 0;
  }
  setSize(e, t, n = 1) {
    (this.width !== e || this.height !== t || this.depth !== n) && (this.width = e, this.height = t, this.depth = n, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new $c(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class el extends ht {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = bt, this.minFilter = bt, this.wrapR = Et, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class tl extends ht {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: i }, this.magFilter = bt, this.minFilter = bt, this.wrapR = Et, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class nn {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  static slerpFlat(e, t, n, i, s, a, o) {
    let c = n[i + 0], l = n[i + 1], h = n[i + 2], u = n[i + 3];
    const d = s[a + 0], f = s[a + 1], g = s[a + 2], p = s[a + 3];
    if (o === 0) {
      e[t + 0] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = u;
      return;
    }
    if (o === 1) {
      e[t + 0] = d, e[t + 1] = f, e[t + 2] = g, e[t + 3] = p;
      return;
    }
    if (u !== p || c !== d || l !== f || h !== g) {
      let A = 1 - o;
      const m = c * d + l * f + h * g + u * p, E = m >= 0 ? 1 : -1, b = 1 - m * m;
      if (b > Number.EPSILON) {
        const I = Math.sqrt(b), w = Math.atan2(I, m * E);
        A = Math.sin(A * w) / I, o = Math.sin(o * w) / I;
      }
      const _ = o * E;
      if (c = c * A + d * _, l = l * A + f * _, h = h * A + g * _, u = u * A + p * _, A === 1 - o) {
        const I = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
        c *= I, l *= I, h *= I, u *= I;
      }
    }
    e[t] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, n, i, s, a) {
    const o = n[i], c = n[i + 1], l = n[i + 2], h = n[i + 3], u = s[a], d = s[a + 1], f = s[a + 2], g = s[a + 3];
    return e[t] = o * g + h * u + c * f - l * d, e[t + 1] = c * g + h * d + l * u - o * f, e[t + 2] = l * g + h * f + o * d - c * u, e[t + 3] = h * g - o * u - c * d - l * f, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, i) {
    return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t) {
    const n = e._x, i = e._y, s = e._z, a = e._order, o = Math.cos, c = Math.sin, l = o(n / 2), h = o(i / 2), u = o(s / 2), d = c(n / 2), f = c(i / 2), g = c(s / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * u + l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "YXZ":
        this._x = d * h * u + l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u + d * f * g;
        break;
      case "ZXY":
        this._x = d * h * u - l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "ZYX":
        this._x = d * h * u - l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u + d * f * g;
        break;
      case "YZX":
        this._x = d * h * u + l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "XZY":
        this._x = d * h * u - l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u + d * f * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], i = t[4], s = t[8], a = t[1], o = t[5], c = t[9], l = t[2], h = t[6], u = t[10], d = n + o + u;
    if (d > 0) {
      const f = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / f, this._x = (h - c) * f, this._y = (s - l) * f, this._z = (a - i) * f;
    } else if (n > o && n > u) {
      const f = 2 * Math.sqrt(1 + n - o - u);
      this._w = (h - c) / f, this._x = 0.25 * f, this._y = (i + a) / f, this._z = (s + l) / f;
    } else if (o > u) {
      const f = 2 * Math.sqrt(1 + o - n - u);
      this._w = (s - l) / f, this._x = (i + a) / f, this._y = 0.25 * f, this._z = (c + h) / f;
    } else {
      const f = 2 * Math.sqrt(1 + u - n - o);
      this._w = (a - i) / f, this._x = (s + l) / f, this._y = (c + h) / f, this._z = 0.25 * f;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(lt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0)
      return this;
    const i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, i = e._y, s = e._z, a = e._w, o = t._x, c = t._y, l = t._z, h = t._w;
    return this._x = n * h + a * o + i * l - s * c, this._y = i * h + a * c + s * o - n * l, this._z = s * h + a * l + n * c - i * o, this._w = a * h - n * o - i * c - s * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0)
      return this;
    if (t === 1)
      return this.copy(e);
    const n = this._x, i = this._y, s = this._z, a = this._w;
    let o = a * e._w + n * e._x + i * e._y + s * e._z;
    if (o < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, o = -o) : this.copy(e), o >= 1)
      return this._w = a, this._x = n, this._y = i, this._z = s, this;
    const c = 1 - o * o;
    if (c <= Number.EPSILON) {
      const f = 1 - t;
      return this._w = f * a + t * this._w, this._x = f * n + t * this._x, this._y = f * i + t * this._y, this._z = f * s + t * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const l = Math.sqrt(c), h = Math.atan2(l, o), u = Math.sin((1 - t) * h) / l, d = Math.sin(t * h) / l;
    return this._w = a * u + this._w * d, this._x = n * u + this._x * d, this._y = i * u + this._y * d, this._z = s * u + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = Math.random(), t = Math.sqrt(1 - e), n = Math.sqrt(e), i = 2 * Math.PI * Math.random(), s = 2 * Math.PI * Math.random();
    return this.set(
      t * Math.cos(i),
      n * Math.sin(s),
      n * Math.cos(s),
      t * Math.sin(i)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class B {
  constructor(e = 0, t = 0, n = 0) {
    B.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(_o.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(_o.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * i, this.y = s[1] * t + s[4] * n + s[7] * i, this.z = s[2] * t + s[5] * n + s[8] * i, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * i + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * i + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * i + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * i + s[14]) * a, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, i = this.z, s = e.x, a = e.y, o = e.z, c = e.w, l = c * t + a * i - o * n, h = c * n + o * t - s * i, u = c * i + s * n - a * t, d = -s * t - a * n - o * i;
    return this.x = l * c + d * -s + h * -o - u * -a, this.y = h * c + d * -a + u * -s - l * -o, this.z = u * c + d * -o + l * -a - h * -s, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, i = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * i, this.y = s[1] * t + s[5] * n + s[9] * i, this.z = s[2] * t + s[6] * n + s[10] * i, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, i = e.y, s = e.z, a = t.x, o = t.y, c = t.z;
    return this.x = i * c - s * o, this.y = s * a - n * c, this.z = n * o - i * a, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0)
      return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return xr.copy(this).projectOnVector(e), this.sub(xr);
  }
  reflect(e) {
    return this.sub(xr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0)
      return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(lt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, i = this.z - e.z;
    return t * t + n * n + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const i = Math.sin(t) * e;
    return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), i = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = i, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = (Math.random() - 0.5) * 2, t = Math.random() * Math.PI * 2, n = Math.sqrt(1 - e ** 2);
    return this.x = n * Math.cos(t), this.y = n * Math.sin(t), this.z = e, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const xr = /* @__PURE__ */ new B(), _o = /* @__PURE__ */ new nn();
class Ln {
  constructor(e = new B(1 / 0, 1 / 0, 1 / 0), t = new B(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    let t = 1 / 0, n = 1 / 0, i = 1 / 0, s = -1 / 0, a = -1 / 0, o = -1 / 0;
    for (let c = 0, l = e.length; c < l; c += 3) {
      const h = e[c], u = e[c + 1], d = e[c + 2];
      h < t && (t = h), u < n && (n = u), d < i && (i = d), h > s && (s = h), u > a && (a = u), d > o && (o = d);
    }
    return this.min.set(t, n, i), this.max.set(s, a, o), this;
  }
  setFromBufferAttribute(e) {
    let t = 1 / 0, n = 1 / 0, i = 1 / 0, s = -1 / 0, a = -1 / 0, o = -1 / 0;
    for (let c = 0, l = e.count; c < l; c++) {
      const h = e.getX(c), u = e.getY(c), d = e.getZ(c);
      h < t && (t = h), u < n && (n = u), d < i && (i = d), h > s && (s = h), u > a && (a = u), d > o && (o = d);
    }
    return this.min.set(t, n, i), this.max.set(s, a, o), this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Nn.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0)
      if (t && n.attributes != null && n.attributes.position !== void 0) {
        const s = n.attributes.position;
        for (let a = 0, o = s.count; a < o; a++)
          Nn.fromBufferAttribute(s, a).applyMatrix4(e.matrixWorld), this.expandByPoint(Nn);
      } else
        n.boundingBox === null && n.computeBoundingBox(), Er.copy(n.boundingBox), Er.applyMatrix4(e.matrixWorld), this.union(Er);
    const i = e.children;
    for (let s = 0, a = i.length; s < a; s++)
      this.expandByObject(i[s], t);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Nn), Nn.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Gi), Is.subVectors(this.max, Gi), ti.subVectors(e.a, Gi), ni.subVectors(e.b, Gi), ii.subVectors(e.c, Gi), In.subVectors(ni, ti), Cn.subVectors(ii, ni), Gn.subVectors(ti, ii);
    let t = [
      0,
      -In.z,
      In.y,
      0,
      -Cn.z,
      Cn.y,
      0,
      -Gn.z,
      Gn.y,
      In.z,
      0,
      -In.x,
      Cn.z,
      0,
      -Cn.x,
      Gn.z,
      0,
      -Gn.x,
      -In.y,
      In.x,
      0,
      -Cn.y,
      Cn.x,
      0,
      -Gn.y,
      Gn.x,
      0
    ];
    return !Ir(t, ti, ni, ii, Is) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ir(t, ti, ni, ii, Is)) ? !1 : (Cs.crossVectors(In, Cn), t = [Cs.x, Cs.y, Cs.z], Ir(t, ti, ni, ii, Is));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return Nn.copy(e).clamp(this.min, this.max).sub(e).length();
  }
  getBoundingSphere(e) {
    return this.getCenter(e.center), e.radius = this.getSize(Nn).length() * 0.5, e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (an[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), an[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), an[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), an[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), an[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), an[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), an[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), an[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(an), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const an = [
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B()
], Nn = /* @__PURE__ */ new B(), Er = /* @__PURE__ */ new Ln(), ti = /* @__PURE__ */ new B(), ni = /* @__PURE__ */ new B(), ii = /* @__PURE__ */ new B(), In = /* @__PURE__ */ new B(), Cn = /* @__PURE__ */ new B(), Gn = /* @__PURE__ */ new B(), Gi = /* @__PURE__ */ new B(), Is = /* @__PURE__ */ new B(), Cs = /* @__PURE__ */ new B(), Un = /* @__PURE__ */ new B();
function Ir(r, e, t, n, i) {
  for (let s = 0, a = r.length - 3; s <= a; s += 3) {
    Un.fromArray(r, s);
    const o = i.x * Math.abs(Un.x) + i.y * Math.abs(Un.y) + i.z * Math.abs(Un.z), c = e.dot(Un), l = t.dot(Un), h = n.dot(Un);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o)
      return !1;
  }
  return !0;
}
const qh = /* @__PURE__ */ new Ln(), Ui = /* @__PURE__ */ new B(), Cr = /* @__PURE__ */ new B();
class Ri {
  constructor(e = new B(), t = -1) {
    this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : qh.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let s = 0, a = e.length; s < a; s++)
      i = Math.max(i, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Ui.subVectors(e, this.center);
    const t = Ui.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ui, i / n), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Cr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Ui.copy(e.center).add(Cr)), this.expandByPoint(Ui.copy(e.center).sub(Cr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const on = /* @__PURE__ */ new B(), yr = /* @__PURE__ */ new B(), ys = /* @__PURE__ */ new B(), yn = /* @__PURE__ */ new B(), vr = /* @__PURE__ */ new B(), vs = /* @__PURE__ */ new B(), wr = /* @__PURE__ */ new B();
class ir {
  constructor(e = new B(), t = new B(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.direction).multiplyScalar(e).add(this.origin);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, on)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(n).add(this.origin);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = on.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (on.copy(this.direction).multiplyScalar(t).add(this.origin), on.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, i) {
    yr.copy(e).add(t).multiplyScalar(0.5), ys.copy(t).sub(e).normalize(), yn.copy(this.origin).sub(yr);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(ys), o = yn.dot(this.direction), c = -yn.dot(ys), l = yn.lengthSq(), h = Math.abs(1 - a * a);
    let u, d, f, g;
    if (h > 0)
      if (u = a * c - o, d = a * o - c, g = s * h, u >= 0)
        if (d >= -g)
          if (d <= g) {
            const p = 1 / h;
            u *= p, d *= p, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * c) + l;
          } else
            d = s, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * c) + l;
        else
          d = -s, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * c) + l;
      else
        d <= -g ? (u = Math.max(0, -(-a * s + o)), d = u > 0 ? -s : Math.min(Math.max(-s, -c), s), f = -u * u + d * (d + 2 * c) + l) : d <= g ? (u = 0, d = Math.min(Math.max(-s, -c), s), f = d * (d + 2 * c) + l) : (u = Math.max(0, -(a * s + o)), d = u > 0 ? s : Math.min(Math.max(-s, -c), s), f = -u * u + d * (d + 2 * c) + l);
    else
      d = a > 0 ? -s : s, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * c) + l;
    return n && n.copy(this.direction).multiplyScalar(u).add(this.origin), i && i.copy(ys).multiplyScalar(d).add(yr), f;
  }
  intersectSphere(e, t) {
    on.subVectors(e.center, this.origin);
    const n = on.dot(this.direction), i = on.dot(on) - n * n, s = e.radius * e.radius;
    if (i > s)
      return null;
    const a = Math.sqrt(s - i), o = n - a, c = n + a;
    return o < 0 && c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, i, s, a, o, c;
    const l = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return l >= 0 ? (n = (e.min.x - d.x) * l, i = (e.max.x - d.x) * l) : (n = (e.max.x - d.x) * l, i = (e.min.x - d.x) * l), h >= 0 ? (s = (e.min.y - d.y) * h, a = (e.max.y - d.y) * h) : (s = (e.max.y - d.y) * h, a = (e.min.y - d.y) * h), n > a || s > i || ((s > n || isNaN(n)) && (n = s), (a < i || isNaN(i)) && (i = a), u >= 0 ? (o = (e.min.z - d.z) * u, c = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, c = (e.min.z - d.z) * u), n > c || o > i) || ((o > n || n !== n) && (n = o), (c < i || i !== i) && (i = c), i < 0) ? null : this.at(n >= 0 ? n : i, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, on) !== null;
  }
  intersectTriangle(e, t, n, i, s) {
    vr.subVectors(t, e), vs.subVectors(n, e), wr.crossVectors(vr, vs);
    let a = this.direction.dot(wr), o;
    if (a > 0) {
      if (i)
        return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    yn.subVectors(this.origin, e);
    const c = o * this.direction.dot(vs.crossVectors(yn, vs));
    if (c < 0)
      return null;
    const l = o * this.direction.dot(vr.cross(yn));
    if (l < 0 || c + l > a)
      return null;
    const h = -o * yn.dot(wr);
    return h < 0 ? null : this.at(h / a, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Re {
  constructor() {
    Re.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  }
  set(e, t, n, i, s, a, o, c, l, h, u, d, f, g, p, A) {
    const m = this.elements;
    return m[0] = e, m[4] = t, m[8] = n, m[12] = i, m[1] = s, m[5] = a, m[9] = o, m[13] = c, m[2] = l, m[6] = h, m[10] = u, m[14] = d, m[3] = f, m[7] = g, m[11] = p, m[15] = A, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new Re().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, i = 1 / si.setFromMatrixColumn(e, 0).length(), s = 1 / si.setFromMatrixColumn(e, 1).length(), a = 1 / si.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, i = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(i), l = Math.sin(i), h = Math.cos(s), u = Math.sin(s);
    if (e.order === "XYZ") {
      const d = a * h, f = a * u, g = o * h, p = o * u;
      t[0] = c * h, t[4] = -c * u, t[8] = l, t[1] = f + g * l, t[5] = d - p * l, t[9] = -o * c, t[2] = p - d * l, t[6] = g + f * l, t[10] = a * c;
    } else if (e.order === "YXZ") {
      const d = c * h, f = c * u, g = l * h, p = l * u;
      t[0] = d + p * o, t[4] = g * o - f, t[8] = a * l, t[1] = a * u, t[5] = a * h, t[9] = -o, t[2] = f * o - g, t[6] = p + d * o, t[10] = a * c;
    } else if (e.order === "ZXY") {
      const d = c * h, f = c * u, g = l * h, p = l * u;
      t[0] = d - p * o, t[4] = -a * u, t[8] = g + f * o, t[1] = f + g * o, t[5] = a * h, t[9] = p - d * o, t[2] = -a * l, t[6] = o, t[10] = a * c;
    } else if (e.order === "ZYX") {
      const d = a * h, f = a * u, g = o * h, p = o * u;
      t[0] = c * h, t[4] = g * l - f, t[8] = d * l + p, t[1] = c * u, t[5] = p * l + d, t[9] = f * l - g, t[2] = -l, t[6] = o * c, t[10] = a * c;
    } else if (e.order === "YZX") {
      const d = a * c, f = a * l, g = o * c, p = o * l;
      t[0] = c * h, t[4] = p - d * u, t[8] = g * u + f, t[1] = u, t[5] = a * h, t[9] = -o * h, t[2] = -l * h, t[6] = f * u + g, t[10] = d - p * u;
    } else if (e.order === "XZY") {
      const d = a * c, f = a * l, g = o * c, p = o * l;
      t[0] = c * h, t[4] = -u, t[8] = l * h, t[1] = d * u + p, t[5] = a * h, t[9] = f * u - g, t[2] = g * u - f, t[6] = o * h, t[10] = p * u + d;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(jh, e, Yh);
  }
  lookAt(e, t, n) {
    const i = this.elements;
    return Pt.subVectors(e, t), Pt.lengthSq() === 0 && (Pt.z = 1), Pt.normalize(), vn.crossVectors(n, Pt), vn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Pt.x += 1e-4 : Pt.z += 1e-4, Pt.normalize(), vn.crossVectors(n, Pt)), vn.normalize(), ws.crossVectors(Pt, vn), i[0] = vn.x, i[4] = ws.x, i[8] = Pt.x, i[1] = vn.y, i[5] = ws.y, i[9] = Pt.y, i[2] = vn.z, i[6] = ws.z, i[10] = Pt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, i = t.elements, s = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], h = n[1], u = n[5], d = n[9], f = n[13], g = n[2], p = n[6], A = n[10], m = n[14], E = n[3], b = n[7], _ = n[11], I = n[15], w = i[0], T = i[4], x = i[8], y = i[12], D = i[1], P = i[5], q = i[9], F = i[13], Q = i[2], H = i[6], ne = i[10], ee = i[14], V = i[3], re = i[7], ie = i[11], $ = i[15];
    return s[0] = a * w + o * D + c * Q + l * V, s[4] = a * T + o * P + c * H + l * re, s[8] = a * x + o * q + c * ne + l * ie, s[12] = a * y + o * F + c * ee + l * $, s[1] = h * w + u * D + d * Q + f * V, s[5] = h * T + u * P + d * H + f * re, s[9] = h * x + u * q + d * ne + f * ie, s[13] = h * y + u * F + d * ee + f * $, s[2] = g * w + p * D + A * Q + m * V, s[6] = g * T + p * P + A * H + m * re, s[10] = g * x + p * q + A * ne + m * ie, s[14] = g * y + p * F + A * ee + m * $, s[3] = E * w + b * D + _ * Q + I * V, s[7] = E * T + b * P + _ * H + I * re, s[11] = E * x + b * q + _ * ne + I * ie, s[15] = E * y + b * F + _ * ee + I * $, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], i = e[8], s = e[12], a = e[1], o = e[5], c = e[9], l = e[13], h = e[2], u = e[6], d = e[10], f = e[14], g = e[3], p = e[7], A = e[11], m = e[15];
    return g * (+s * c * u - i * l * u - s * o * d + n * l * d + i * o * f - n * c * f) + p * (+t * c * f - t * l * d + s * a * d - i * a * f + i * l * h - s * c * h) + A * (+t * l * u - t * o * f - s * a * u + n * a * f + s * o * h - n * l * h) + m * (-i * o * h - t * c * u + t * o * d + i * a * u - n * a * d + n * c * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const i = this.elements;
    return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], i = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], u = e[9], d = e[10], f = e[11], g = e[12], p = e[13], A = e[14], m = e[15], E = u * A * l - p * d * l + p * c * f - o * A * f - u * c * m + o * d * m, b = g * d * l - h * A * l - g * c * f + a * A * f + h * c * m - a * d * m, _ = h * p * l - g * u * l + g * o * f - a * p * f - h * o * m + a * u * m, I = g * u * c - h * p * c - g * o * d + a * p * d + h * o * A - a * u * A, w = t * E + n * b + i * _ + s * I;
    if (w === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const T = 1 / w;
    return e[0] = E * T, e[1] = (p * d * s - u * A * s - p * i * f + n * A * f + u * i * m - n * d * m) * T, e[2] = (o * A * s - p * c * s + p * i * l - n * A * l - o * i * m + n * c * m) * T, e[3] = (u * c * s - o * d * s - u * i * l + n * d * l + o * i * f - n * c * f) * T, e[4] = b * T, e[5] = (h * A * s - g * d * s + g * i * f - t * A * f - h * i * m + t * d * m) * T, e[6] = (g * c * s - a * A * s - g * i * l + t * A * l + a * i * m - t * c * m) * T, e[7] = (a * d * s - h * c * s + h * i * l - t * d * l - a * i * f + t * c * f) * T, e[8] = _ * T, e[9] = (g * u * s - h * p * s - g * n * f + t * p * f + h * n * m - t * u * m) * T, e[10] = (a * p * s - g * o * s + g * n * l - t * p * l - a * n * m + t * o * m) * T, e[11] = (h * o * s - a * u * s - h * n * l + t * u * l + a * n * f - t * o * f) * T, e[12] = I * T, e[13] = (h * p * i - g * u * i + g * n * d - t * p * d - h * n * A + t * u * A) * T, e[14] = (g * o * i - a * p * i - g * n * c + t * p * c + a * n * A - t * o * A) * T, e[15] = (a * u * i - h * o * i + h * n * c - t * u * c - a * n * d + t * o * d) * T, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, i = e.y, s = e.z;
    return t[0] *= n, t[4] *= i, t[8] *= s, t[1] *= n, t[5] *= i, t[9] *= s, t[2] *= n, t[6] *= i, t[10] *= s, t[3] *= n, t[7] *= i, t[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, i));
  }
  makeTranslation(e, t, n) {
    return this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), i = Math.sin(t), s = 1 - n, a = e.x, o = e.y, c = e.z, l = s * a, h = s * o;
    return this.set(
      l * a + n,
      l * o - i * c,
      l * c + i * o,
      0,
      l * o + i * c,
      h * o + n,
      h * c - i * a,
      0,
      l * c - i * o,
      h * c + i * a,
      s * c * c + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, i, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      i,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const i = this.elements, s = t._x, a = t._y, o = t._z, c = t._w, l = s + s, h = a + a, u = o + o, d = s * l, f = s * h, g = s * u, p = a * h, A = a * u, m = o * u, E = c * l, b = c * h, _ = c * u, I = n.x, w = n.y, T = n.z;
    return i[0] = (1 - (p + m)) * I, i[1] = (f + _) * I, i[2] = (g - b) * I, i[3] = 0, i[4] = (f - _) * w, i[5] = (1 - (d + m)) * w, i[6] = (A + E) * w, i[7] = 0, i[8] = (g + b) * T, i[9] = (A - E) * T, i[10] = (1 - (d + p)) * T, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this;
  }
  decompose(e, t, n) {
    const i = this.elements;
    let s = si.set(i[0], i[1], i[2]).length();
    const a = si.set(i[4], i[5], i[6]).length(), o = si.set(i[8], i[9], i[10]).length();
    this.determinant() < 0 && (s = -s), e.x = i[12], e.y = i[13], e.z = i[14], qt.copy(this);
    const l = 1 / s, h = 1 / a, u = 1 / o;
    return qt.elements[0] *= l, qt.elements[1] *= l, qt.elements[2] *= l, qt.elements[4] *= h, qt.elements[5] *= h, qt.elements[6] *= h, qt.elements[8] *= u, qt.elements[9] *= u, qt.elements[10] *= u, t.setFromRotationMatrix(qt), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(e, t, n, i, s, a) {
    const o = this.elements, c = 2 * s / (t - e), l = 2 * s / (n - i), h = (t + e) / (t - e), u = (n + i) / (n - i), d = -(a + s) / (a - s), f = -2 * a * s / (a - s);
    return o[0] = c, o[4] = 0, o[8] = h, o[12] = 0, o[1] = 0, o[5] = l, o[9] = u, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = d, o[14] = f, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(e, t, n, i, s, a) {
    const o = this.elements, c = 1 / (t - e), l = 1 / (n - i), h = 1 / (a - s), u = (t + e) * c, d = (n + i) * l, f = (a + s) * h;
    return o[0] = 2 * c, o[4] = 0, o[8] = 0, o[12] = -u, o[1] = 0, o[5] = 2 * l, o[9] = 0, o[13] = -d, o[2] = 0, o[6] = 0, o[10] = -2 * h, o[14] = -f, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let i = 0; i < 16; i++)
      if (t[i] !== n[i])
        return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const si = /* @__PURE__ */ new B(), qt = /* @__PURE__ */ new Re(), jh = /* @__PURE__ */ new B(0, 0, 0), Yh = /* @__PURE__ */ new B(1, 1, 1), vn = /* @__PURE__ */ new B(), ws = /* @__PURE__ */ new B(), Pt = /* @__PURE__ */ new B(), xo = /* @__PURE__ */ new Re(), Eo = /* @__PURE__ */ new nn();
class Li {
  constructor(e = 0, t = 0, n = 0, i = Li.DefaultOrder) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = i;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, i = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const i = e.elements, s = i[0], a = i[4], o = i[8], c = i[1], l = i[5], h = i[9], u = i[2], d = i[6], f = i[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(lt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(d, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-lt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-u, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(lt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-lt(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(lt(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-u, s)) : (this._x = 0, this._y = Math.atan2(o, f));
        break;
      case "XZY":
        this._z = Math.asin(-lt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, f), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return xo.makeRotationFromQuaternion(e), this.setFromRotationMatrix(xo, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Eo.setFromEuler(this), this.setFromQuaternion(Eo, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
  toVector3() {
    console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead");
  }
}
Li.DefaultOrder = "XYZ";
Li.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
class Ma {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Jh = 0;
const Io = /* @__PURE__ */ new B(), ri = /* @__PURE__ */ new nn(), cn = /* @__PURE__ */ new Re(), Ms = /* @__PURE__ */ new B(), Oi = /* @__PURE__ */ new B(), Kh = /* @__PURE__ */ new B(), Xh = /* @__PURE__ */ new nn(), Co = /* @__PURE__ */ new B(1, 0, 0), yo = /* @__PURE__ */ new B(0, 1, 0), vo = /* @__PURE__ */ new B(0, 0, 1), Zh = { type: "added" }, wo = { type: "removed" };
class Ke extends _n {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Jh++ }), this.uuid = Jt(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Ke.DefaultUp.clone();
    const e = new B(), t = new Li(), n = new nn(), i = new B(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      modelViewMatrix: {
        value: new Re()
      },
      normalMatrix: {
        value: new Gt()
      }
    }), this.matrix = new Re(), this.matrixWorld = new Re(), this.matrixAutoUpdate = Ke.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = Ke.DefaultMatrixWorldAutoUpdate, this.layers = new Ma(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return ri.setFromAxisAngle(e, t), this.quaternion.multiply(ri), this;
  }
  rotateOnWorldAxis(e, t) {
    return ri.setFromAxisAngle(e, t), this.quaternion.premultiply(ri), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Co, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(yo, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(vo, e);
  }
  translateOnAxis(e, t) {
    return Io.copy(e).applyQuaternion(this.quaternion), this.position.add(Io.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Co, e);
  }
  translateY(e) {
    return this.translateOnAxis(yo, e);
  }
  translateZ(e) {
    return this.translateOnAxis(vo, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(cn.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Ms.copy(e) : Ms.set(e, t, n);
    const i = this.parent;
    this.updateWorldMatrix(!0, !1), Oi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? cn.lookAt(Oi, Ms, this.up) : cn.lookAt(Ms, Oi, this.up), this.quaternion.setFromRotationMatrix(cn), i && (cn.extractRotation(i.matrixWorld), ri.setFromRotationMatrix(cn), this.quaternion.premultiply(ri.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(Zh)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(wo)), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    for (let e = 0; e < this.children.length; e++) {
      const t = this.children[e];
      t.parent = null, t.dispatchEvent(wo);
    }
    return this.children.length = 0, this;
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), cn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), cn.multiply(e.parent.matrixWorld)), e.applyMatrix4(cn), this.add(e), e.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t)
      return this;
    for (let n = 0, i = this.children.length; n < i; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(e, t) {
    let n = [];
    this[e] === t && n.push(this);
    for (let i = 0, s = this.children.length; i < s; i++) {
      const a = this.children[i].getObjectsByProperty(e, t);
      a.length > 0 && (n = n.concat(a));
    }
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Oi, e, Kh), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Oi, Xh, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1)
      return;
    e(this);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, i = t.length; n < i; n++) {
      const s = t[n];
      (s.matrixWorldAutoUpdate === !0 || e === !0) && s.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.matrixWorldAutoUpdate === !0 && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) {
      const i = this.children;
      for (let s = 0, a = i.length; s < a; s++) {
        const o = i[s];
        o.matrixWorldAutoUpdate === !0 && o.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.5,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const i = {};
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.castShadow === !0 && (i.castShadow = !0), this.receiveShadow === !0 && (i.receiveShadow = !0), this.visible === !1 && (i.visible = !1), this.frustumCulled === !1 && (i.frustumCulled = !1), this.renderOrder !== 0 && (i.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), this.matrixAutoUpdate === !1 && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON()));
    function s(o, c) {
      return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (i.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const u = c[l];
            s(e.shapes, u);
          }
        else
          s(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(s(e.materials, this.material[c]));
        i.material = o;
      } else
        i.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let o = 0; o < this.children.length; o++)
        i.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        i.animations.push(s(e.animations, c));
      }
    }
    if (t) {
      const o = a(e.geometries), c = a(e.materials), l = a(e.textures), h = a(e.images), u = a(e.shapes), d = a(e.skeletons), f = a(e.animations), g = a(e.nodes);
      o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), f.length > 0 && (n.animations = f), g.length > 0 && (n.nodes = g);
    }
    return n.object = i, n;
    function a(o) {
      const c = [];
      for (const l in o) {
        const h = o[l];
        delete h.metadata, c.push(h);
      }
      return c;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const i = e.children[n];
        this.add(i.clone());
      }
    return this;
  }
}
Ke.DefaultUp = /* @__PURE__ */ new B(0, 1, 0);
Ke.DefaultMatrixAutoUpdate = !0;
Ke.DefaultMatrixWorldAutoUpdate = !0;
const jt = /* @__PURE__ */ new B(), ln = /* @__PURE__ */ new B(), Mr = /* @__PURE__ */ new B(), hn = /* @__PURE__ */ new B(), ai = /* @__PURE__ */ new B(), oi = /* @__PURE__ */ new B(), Mo = /* @__PURE__ */ new B(), Sr = /* @__PURE__ */ new B(), Br = /* @__PURE__ */ new B(), Tr = /* @__PURE__ */ new B();
class $t {
  constructor(e = new B(), t = new B(), n = new B()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, i) {
    i.subVectors(n, t), jt.subVectors(e, t), i.cross(jt);
    const s = i.lengthSq();
    return s > 0 ? i.multiplyScalar(1 / Math.sqrt(s)) : i.set(0, 0, 0);
  }
  static getBarycoord(e, t, n, i, s) {
    jt.subVectors(i, t), ln.subVectors(n, t), Mr.subVectors(e, t);
    const a = jt.dot(jt), o = jt.dot(ln), c = jt.dot(Mr), l = ln.dot(ln), h = ln.dot(Mr), u = a * l - o * o;
    if (u === 0)
      return s.set(-2, -1, -1);
    const d = 1 / u, f = (l * c - o * h) * d, g = (a * h - o * c) * d;
    return s.set(1 - f - g, g, f);
  }
  static containsPoint(e, t, n, i) {
    return this.getBarycoord(e, t, n, i, hn), hn.x >= 0 && hn.y >= 0 && hn.x + hn.y <= 1;
  }
  static getUV(e, t, n, i, s, a, o, c) {
    return this.getBarycoord(e, t, n, i, hn), c.set(0, 0), c.addScaledVector(s, hn.x), c.addScaledVector(a, hn.y), c.addScaledVector(o, hn.z), c;
  }
  static isFrontFacing(e, t, n, i) {
    return jt.subVectors(n, t), ln.subVectors(e, t), jt.cross(ln).dot(i) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, i) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this;
  }
  setFromAttributeAndIndices(e, t, n, i) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, i), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return jt.subVectors(this.c, this.b), ln.subVectors(this.a, this.b), jt.cross(ln).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return $t.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return $t.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, n, i, s) {
    return $t.getUV(e, this.a, this.b, this.c, t, n, i, s);
  }
  containsPoint(e) {
    return $t.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return $t.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, i = this.b, s = this.c;
    let a, o;
    ai.subVectors(i, n), oi.subVectors(s, n), Sr.subVectors(e, n);
    const c = ai.dot(Sr), l = oi.dot(Sr);
    if (c <= 0 && l <= 0)
      return t.copy(n);
    Br.subVectors(e, i);
    const h = ai.dot(Br), u = oi.dot(Br);
    if (h >= 0 && u <= h)
      return t.copy(i);
    const d = c * u - h * l;
    if (d <= 0 && c >= 0 && h <= 0)
      return a = c / (c - h), t.copy(n).addScaledVector(ai, a);
    Tr.subVectors(e, s);
    const f = ai.dot(Tr), g = oi.dot(Tr);
    if (g >= 0 && f <= g)
      return t.copy(s);
    const p = f * l - c * g;
    if (p <= 0 && l >= 0 && g <= 0)
      return o = l / (l - g), t.copy(n).addScaledVector(oi, o);
    const A = h * g - f * u;
    if (A <= 0 && u - h >= 0 && f - g >= 0)
      return Mo.subVectors(s, i), o = (u - h) / (u - h + (f - g)), t.copy(i).addScaledVector(Mo, o);
    const m = 1 / (A + p + d);
    return a = p * m, o = d * m, t.copy(n).addScaledVector(ai, a).addScaledVector(oi, o);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
let $h = 0;
class Kt extends _n {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: $h++ }), this.uuid = Jt(), this.name = "", this.type = "Material", this.blending = Ci, this.side = Dn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.blendSrc = Gc, this.blendDst = Uc, this.blendEquation = xi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = aa, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Th, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = pr, this.stencilZFail = pr, this.stencilZPass = pr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn("THREE.Material: '" + t + "' parameter is undefined.");
          continue;
        }
        const i = this[t];
        if (i === void 0) {
          console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
          continue;
        }
        i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.5,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Ci && (n.blending = this.blending), this.side !== Dn && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaToCoverage === !0 && (n.alphaToCoverage = this.alphaToCoverage), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = this.premultipliedAlpha), this.wireframe === !0 && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = this.flatShading), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function i(s) {
      const a = [];
      for (const o in s) {
        const c = s[o];
        delete c.metadata, a.push(c);
      }
      return a;
    }
    if (t) {
      const s = i(e.textures), a = i(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const i = t.length;
      n = new Array(i);
      for (let s = 0; s !== i; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class Wn extends Kt {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new we(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Oc, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const at = /* @__PURE__ */ new B(), Ss = /* @__PURE__ */ new fe();
class ot {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = pa, this.updateRange = { offset: 0, count: -1 }, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let i = 0, s = this.itemSize; i < s; i++)
      this.array[e + i] = t.array[n + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Ss.fromBufferAttribute(this, t), Ss.applyMatrix3(e), this.setXY(t, Ss.x, Ss.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        at.fromBufferAttribute(this, t), at.applyMatrix3(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      at.fromBufferAttribute(this, t), at.applyMatrix4(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      at.fromBufferAttribute(this, t), at.applyNormalMatrix(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      at.fromBufferAttribute(this, t), at.transformDirection(e), this.setXYZ(t, at.x, at.y, at.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = qe(t, this.array), n = qe(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = qe(t, this.array), n = qe(n, this.array), i = qe(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, s) {
    return e *= this.itemSize, this.normalized && (t = qe(t, this.array), n = qe(n, this.array), i = qe(i, this.array), s = qe(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== pa && (e.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (e.updateRange = this.updateRange), e;
  }
  copyColorsArray() {
    console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.");
  }
  copyVector2sArray() {
    console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.");
  }
  copyVector3sArray() {
    console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.");
  }
  copyVector4sArray() {
    console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.");
  }
}
class nl extends ot {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class il extends ot {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class Xe extends ot {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let eu = 0;
const Ot = /* @__PURE__ */ new Re(), Dr = /* @__PURE__ */ new Ke(), ci = /* @__PURE__ */ new B(), Ft = /* @__PURE__ */ new Ln(), zi = /* @__PURE__ */ new Ln(), gt = /* @__PURE__ */ new B();
class _t extends _n {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: eu++ }), this.uuid = Jt(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Kc(e) ? il : nl)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Gt().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const i = this.attributes.tangent;
    return i !== void 0 && (i.transformDirection(e), i.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Ot.makeRotationFromQuaternion(e), this.applyMatrix4(Ot), this;
  }
  rotateX(e) {
    return Ot.makeRotationX(e), this.applyMatrix4(Ot), this;
  }
  rotateY(e) {
    return Ot.makeRotationY(e), this.applyMatrix4(Ot), this;
  }
  rotateZ(e) {
    return Ot.makeRotationZ(e), this.applyMatrix4(Ot), this;
  }
  translate(e, t, n) {
    return Ot.makeTranslation(e, t, n), this.applyMatrix4(Ot), this;
  }
  scale(e, t, n) {
    return Ot.makeScale(e, t, n), this.applyMatrix4(Ot), this;
  }
  lookAt(e) {
    return Dr.lookAt(e), Dr.updateMatrix(), this.applyMatrix4(Dr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ci).negate(), this.translate(ci.x, ci.y, ci.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let n = 0, i = e.length; n < i; n++) {
      const s = e[n];
      t.push(s.x, s.y, s.z || 0);
    }
    return this.setAttribute("position", new Xe(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ln());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new B(-1 / 0, -1 / 0, -1 / 0),
        new B(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, i = t.length; n < i; n++) {
          const s = t[n];
          Ft.setFromBufferAttribute(s), this.morphTargetsRelative ? (gt.addVectors(this.boundingBox.min, Ft.min), this.boundingBox.expandByPoint(gt), gt.addVectors(this.boundingBox.max, Ft.max), this.boundingBox.expandByPoint(gt)) : (this.boundingBox.expandByPoint(Ft.min), this.boundingBox.expandByPoint(Ft.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Ri());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new B(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Ft.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          zi.setFromBufferAttribute(o), this.morphTargetsRelative ? (gt.addVectors(Ft.min, zi.min), Ft.expandByPoint(gt), gt.addVectors(Ft.max, zi.max), Ft.expandByPoint(gt)) : (Ft.expandByPoint(zi.min), Ft.expandByPoint(zi.max));
        }
      Ft.getCenter(n);
      let i = 0;
      for (let s = 0, a = e.count; s < a; s++)
        gt.fromBufferAttribute(e, s), i = Math.max(i, n.distanceToSquared(gt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], c = this.morphTargetsRelative;
          for (let l = 0, h = o.count; l < h; l++)
            gt.fromBufferAttribute(o, l), c && (ci.fromBufferAttribute(e, l), gt.add(ci)), i = Math.max(i, n.distanceToSquared(gt));
        }
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.array, i = t.position.array, s = t.normal.array, a = t.uv.array, o = i.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new ot(new Float32Array(4 * o), 4));
    const c = this.getAttribute("tangent").array, l = [], h = [];
    for (let D = 0; D < o; D++)
      l[D] = new B(), h[D] = new B();
    const u = new B(), d = new B(), f = new B(), g = new fe(), p = new fe(), A = new fe(), m = new B(), E = new B();
    function b(D, P, q) {
      u.fromArray(i, D * 3), d.fromArray(i, P * 3), f.fromArray(i, q * 3), g.fromArray(a, D * 2), p.fromArray(a, P * 2), A.fromArray(a, q * 2), d.sub(u), f.sub(u), p.sub(g), A.sub(g);
      const F = 1 / (p.x * A.y - A.x * p.y);
      isFinite(F) && (m.copy(d).multiplyScalar(A.y).addScaledVector(f, -p.y).multiplyScalar(F), E.copy(f).multiplyScalar(p.x).addScaledVector(d, -A.x).multiplyScalar(F), l[D].add(m), l[P].add(m), l[q].add(m), h[D].add(E), h[P].add(E), h[q].add(E));
    }
    let _ = this.groups;
    _.length === 0 && (_ = [{
      start: 0,
      count: n.length
    }]);
    for (let D = 0, P = _.length; D < P; ++D) {
      const q = _[D], F = q.start, Q = q.count;
      for (let H = F, ne = F + Q; H < ne; H += 3)
        b(
          n[H + 0],
          n[H + 1],
          n[H + 2]
        );
    }
    const I = new B(), w = new B(), T = new B(), x = new B();
    function y(D) {
      T.fromArray(s, D * 3), x.copy(T);
      const P = l[D];
      I.copy(P), I.sub(T.multiplyScalar(T.dot(P))).normalize(), w.crossVectors(x, P);
      const F = w.dot(h[D]) < 0 ? -1 : 1;
      c[D * 4] = I.x, c[D * 4 + 1] = I.y, c[D * 4 + 2] = I.z, c[D * 4 + 3] = F;
    }
    for (let D = 0, P = _.length; D < P; ++D) {
      const q = _[D], F = q.start, Q = q.count;
      for (let H = F, ne = F + Q; H < ne; H += 3)
        y(n[H + 0]), y(n[H + 1]), y(n[H + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new ot(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, f = n.count; d < f; d++)
          n.setXYZ(d, 0, 0, 0);
      const i = new B(), s = new B(), a = new B(), o = new B(), c = new B(), l = new B(), h = new B(), u = new B();
      if (e)
        for (let d = 0, f = e.count; d < f; d += 3) {
          const g = e.getX(d + 0), p = e.getX(d + 1), A = e.getX(d + 2);
          i.fromBufferAttribute(t, g), s.fromBufferAttribute(t, p), a.fromBufferAttribute(t, A), h.subVectors(a, s), u.subVectors(i, s), h.cross(u), o.fromBufferAttribute(n, g), c.fromBufferAttribute(n, p), l.fromBufferAttribute(n, A), o.add(h), c.add(h), l.add(h), n.setXYZ(g, o.x, o.y, o.z), n.setXYZ(p, c.x, c.y, c.z), n.setXYZ(A, l.x, l.y, l.z);
        }
      else
        for (let d = 0, f = t.count; d < f; d += 3)
          i.fromBufferAttribute(t, d + 0), s.fromBufferAttribute(t, d + 1), a.fromBufferAttribute(t, d + 2), h.subVectors(a, s), u.subVectors(i, s), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  merge() {
    return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."), this;
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      gt.fromBufferAttribute(e, t), gt.normalize(), e.setXYZ(t, gt.x, gt.y, gt.z);
  }
  toNonIndexed() {
    function e(o, c) {
      const l = o.array, h = o.itemSize, u = o.normalized, d = new l.constructor(c.length * h);
      let f = 0, g = 0;
      for (let p = 0, A = c.length; p < A; p++) {
        o.isInterleavedBufferAttribute ? f = c[p] * o.data.stride + o.offset : f = c[p] * h;
        for (let m = 0; m < h; m++)
          d[g++] = l[f++];
      }
      return new ot(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new _t(), n = this.index.array, i = this.attributes;
    for (const o in i) {
      const c = i[o], l = e(c, n);
      t.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let h = 0, u = l.length; h < u; h++) {
        const d = l[h], f = e(d, n);
        c.push(f);
      }
      t.morphAttributes[o] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const i = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let u = 0, d = l.length; u < d; u++) {
        const f = l[u];
        h.push(f.toJSON(e.data));
      }
      h.length > 0 && (i[c] = h, s = !0);
    }
    s && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const i = e.attributes;
    for (const l in i) {
      const h = i[l];
      this.setAttribute(l, h.clone(t));
    }
    const s = e.morphAttributes;
    for (const l in s) {
      const h = [], u = s[l];
      for (let d = 0, f = u.length; d < f; d++)
        h.push(u[d].clone(t));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, h = a.length; l < h; l++) {
      const u = a[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, e.parameters !== void 0 && (this.parameters = Object.assign({}, e.parameters)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const So = /* @__PURE__ */ new Re(), li = /* @__PURE__ */ new ir(), Rr = /* @__PURE__ */ new Ri(), Hi = /* @__PURE__ */ new B(), Vi = /* @__PURE__ */ new B(), Wi = /* @__PURE__ */ new B(), Lr = /* @__PURE__ */ new B(), Bs = /* @__PURE__ */ new B(), Ts = /* @__PURE__ */ new fe(), Ds = /* @__PURE__ */ new fe(), Rs = /* @__PURE__ */ new fe(), Qr = /* @__PURE__ */ new B(), Ls = /* @__PURE__ */ new B();
class Ie extends Ke {
  constructor(e = new _t(), t = new Wn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const i = t[n[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = i.length; s < a; s++) {
          const o = i[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, i = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Bs.set(0, 0, 0);
      for (let c = 0, l = s.length; c < l; c++) {
        const h = o[c], u = s[c];
        h !== 0 && (Lr.fromBufferAttribute(u, e), a ? Bs.addScaledVector(Lr, h) : Bs.addScaledVector(Lr.sub(t), h));
      }
      t.add(Bs);
    }
    return this.isSkinnedMesh && this.boneTransform(e, t), t;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.material, s = this.matrixWorld;
    if (i === void 0 || (n.boundingSphere === null && n.computeBoundingSphere(), Rr.copy(n.boundingSphere), Rr.applyMatrix4(s), e.ray.intersectsSphere(Rr) === !1) || (So.copy(s).invert(), li.copy(e.ray).applyMatrix4(So), n.boundingBox !== null && li.intersectsBox(n.boundingBox) === !1))
      return;
    let a;
    const o = n.index, c = n.attributes.position, l = n.attributes.uv, h = n.attributes.uv2, u = n.groups, d = n.drawRange;
    if (o !== null)
      if (Array.isArray(i))
        for (let f = 0, g = u.length; f < g; f++) {
          const p = u[f], A = i[p.materialIndex], m = Math.max(p.start, d.start), E = Math.min(o.count, Math.min(p.start + p.count, d.start + d.count));
          for (let b = m, _ = E; b < _; b += 3) {
            const I = o.getX(b), w = o.getX(b + 1), T = o.getX(b + 2);
            a = Qs(this, A, e, li, l, h, I, w, T), a && (a.faceIndex = Math.floor(b / 3), a.face.materialIndex = p.materialIndex, t.push(a));
          }
        }
      else {
        const f = Math.max(0, d.start), g = Math.min(o.count, d.start + d.count);
        for (let p = f, A = g; p < A; p += 3) {
          const m = o.getX(p), E = o.getX(p + 1), b = o.getX(p + 2);
          a = Qs(this, i, e, li, l, h, m, E, b), a && (a.faceIndex = Math.floor(p / 3), t.push(a));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(i))
        for (let f = 0, g = u.length; f < g; f++) {
          const p = u[f], A = i[p.materialIndex], m = Math.max(p.start, d.start), E = Math.min(c.count, Math.min(p.start + p.count, d.start + d.count));
          for (let b = m, _ = E; b < _; b += 3) {
            const I = b, w = b + 1, T = b + 2;
            a = Qs(this, A, e, li, l, h, I, w, T), a && (a.faceIndex = Math.floor(b / 3), a.face.materialIndex = p.materialIndex, t.push(a));
          }
        }
      else {
        const f = Math.max(0, d.start), g = Math.min(c.count, d.start + d.count);
        for (let p = f, A = g; p < A; p += 3) {
          const m = p, E = p + 1, b = p + 2;
          a = Qs(this, i, e, li, l, h, m, E, b), a && (a.faceIndex = Math.floor(p / 3), t.push(a));
        }
      }
  }
}
function tu(r, e, t, n, i, s, a, o) {
  let c;
  if (e.side === Ht ? c = n.intersectTriangle(a, s, i, !0, o) : c = n.intersectTriangle(i, s, a, e.side === Dn, o), c === null)
    return null;
  Ls.copy(o), Ls.applyMatrix4(r.matrixWorld);
  const l = t.ray.origin.distanceTo(Ls);
  return l < t.near || l > t.far ? null : {
    distance: l,
    point: Ls.clone(),
    object: r
  };
}
function Qs(r, e, t, n, i, s, a, o, c) {
  r.getVertexPosition(a, Hi), r.getVertexPosition(o, Vi), r.getVertexPosition(c, Wi);
  const l = tu(r, e, t, n, Hi, Vi, Wi, Qr);
  if (l) {
    i && (Ts.fromBufferAttribute(i, a), Ds.fromBufferAttribute(i, o), Rs.fromBufferAttribute(i, c), l.uv = $t.getUV(Qr, Hi, Vi, Wi, Ts, Ds, Rs, new fe())), s && (Ts.fromBufferAttribute(s, a), Ds.fromBufferAttribute(s, o), Rs.fromBufferAttribute(s, c), l.uv2 = $t.getUV(Qr, Hi, Vi, Wi, Ts, Ds, Rs, new fe()));
    const h = {
      a,
      b: o,
      c,
      normal: new B(),
      materialIndex: 0
    };
    $t.getNormal(Hi, Vi, Wi, h.normal), l.face = h;
  }
  return l;
}
class Yt extends _t {
  constructor(e = 1, t = 1, n = 1, i = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: i,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    i = Math.floor(i), s = Math.floor(s), a = Math.floor(a);
    const c = [], l = [], h = [], u = [];
    let d = 0, f = 0;
    g("z", "y", "x", -1, -1, n, t, e, a, s, 0), g("z", "y", "x", 1, -1, n, t, -e, a, s, 1), g("x", "z", "y", 1, 1, e, n, t, i, a, 2), g("x", "z", "y", 1, -1, e, n, -t, i, a, 3), g("x", "y", "z", 1, -1, e, t, n, i, s, 4), g("x", "y", "z", -1, -1, e, t, -n, i, s, 5), this.setIndex(c), this.setAttribute("position", new Xe(l, 3)), this.setAttribute("normal", new Xe(h, 3)), this.setAttribute("uv", new Xe(u, 2));
    function g(p, A, m, E, b, _, I, w, T, x, y) {
      const D = _ / T, P = I / x, q = _ / 2, F = I / 2, Q = w / 2, H = T + 1, ne = x + 1;
      let ee = 0, V = 0;
      const re = new B();
      for (let ie = 0; ie < ne; ie++) {
        const $ = ie * P - F;
        for (let X = 0; X < H; X++) {
          const he = X * D - q;
          re[p] = he * E, re[A] = $ * b, re[m] = Q, l.push(re.x, re.y, re.z), re[p] = 0, re[A] = 0, re[m] = w > 0 ? 1 : -1, h.push(re.x, re.y, re.z), u.push(X / T), u.push(1 - ie / x), ee += 1;
        }
      }
      for (let ie = 0; ie < x; ie++)
        for (let $ = 0; $ < T; $++) {
          const X = d + $ + H * ie, he = d + $ + H * (ie + 1), ae = d + ($ + 1) + H * (ie + 1), de = d + ($ + 1) + H * ie;
          c.push(X, he, de), c.push(he, ae, de), V += 6;
        }
      o.addGroup(f, V, y), f += V, d += ee;
    }
  }
  static fromJSON(e) {
    return new Yt(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Ti(r) {
  const e = {};
  for (const t in r) {
    e[t] = {};
    for (const n in r[t]) {
      const i = r[t][n];
      i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion) ? e[t][n] = i.clone() : Array.isArray(i) ? e[t][n] = i.slice() : e[t][n] = i;
    }
  }
  return e;
}
function Bt(r) {
  const e = {};
  for (let t = 0; t < r.length; t++) {
    const n = Ti(r[t]);
    for (const i in n)
      e[i] = n[i];
  }
  return e;
}
function nu(r) {
  const e = [];
  for (let t = 0; t < r.length; t++)
    e.push(r[t].clone());
  return e;
}
function sl(r) {
  return r.getRenderTarget() === null && r.outputEncoding === Fe ? Xt : us;
}
const iu = { clone: Ti, merge: Bt };
var su = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ru = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Qn extends Kt {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = su, this.fragmentShader = ru, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.extensions = {
      derivatives: !1,
      fragDepth: !1,
      drawBuffers: !1,
      shaderTextureLOD: !1
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv2: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ti(e.uniforms), this.uniformsGroups = nu(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const a = this.uniforms[i].value;
      a && a.isTexture ? t.uniforms[i] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[i] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[i] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader;
    const n = {};
    for (const i in this.extensions)
      this.extensions[i] === !0 && (n[i] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class rl extends Ke {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Re(), this.projectionMatrix = new Re(), this.projectionMatrixInverse = new Re();
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(-t[8], -t[9], -t[10]).normalize();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Dt extends rl {
  constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = ds * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(ss * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return ds * 2 * Math.atan(
      Math.tan(ss * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(e, t, n, i, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(ss * 0.5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, s = -0.5 * i;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth, l = a.fullHeight;
      s += a.offsetX * i / c, t -= a.offsetY * n / l, i *= a.width / c, n *= a.height / l;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + i, t, t - n, e, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const hi = -90, ui = 1;
class au extends Ke {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n;
    const i = new Dt(hi, ui, e, t);
    i.layers = this.layers, i.up.set(0, 1, 0), i.lookAt(1, 0, 0), this.add(i);
    const s = new Dt(hi, ui, e, t);
    s.layers = this.layers, s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), this.add(s);
    const a = new Dt(hi, ui, e, t);
    a.layers = this.layers, a.up.set(0, 0, -1), a.lookAt(0, 1, 0), this.add(a);
    const o = new Dt(hi, ui, e, t);
    o.layers = this.layers, o.up.set(0, 0, 1), o.lookAt(0, -1, 0), this.add(o);
    const c = new Dt(hi, ui, e, t);
    c.layers = this.layers, c.up.set(0, 1, 0), c.lookAt(0, 0, 1), this.add(c);
    const l = new Dt(hi, ui, e, t);
    l.layers = this.layers, l.up.set(0, 1, 0), l.lookAt(0, 0, -1), this.add(l);
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const n = this.renderTarget, [i, s, a, o, c, l] = this.children, h = e.getRenderTarget(), u = e.toneMapping, d = e.xr.enabled;
    e.toneMapping = mn, e.xr.enabled = !1;
    const f = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0), e.render(t, i), e.setRenderTarget(n, 1), e.render(t, s), e.setRenderTarget(n, 2), e.render(t, a), e.setRenderTarget(n, 3), e.render(t, o), e.setRenderTarget(n, 4), e.render(t, c), n.texture.generateMipmaps = f, e.setRenderTarget(n, 5), e.render(t, l), e.setRenderTarget(h), e.toneMapping = u, e.xr.enabled = d, n.texture.needsPMREMUpdate = !0;
  }
}
class Sa extends ht {
  constructor(e, t, n, i, s, a, o, c, l, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : wi, super(e, t, n, i, s, a, o, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class ou extends Jn {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, i = [n, n, n, n, n, n];
    this.texture = new Sa(i, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : nt;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.encoding = t.encoding, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
      fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
    }, i = new Yt(5, 5, 5), s = new Qn({
      name: "CubemapFromEquirect",
      uniforms: Ti(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Ht,
      blending: Bn
    });
    s.uniforms.tEquirect.value = t;
    const a = new Ie(i, s), o = t.minFilter;
    return t.minFilter === bn && (t.minFilter = nt), new au(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(e, t, n, i) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, i);
    e.setRenderTarget(s);
  }
}
const Pr = /* @__PURE__ */ new B(), cu = /* @__PURE__ */ new B(), lu = /* @__PURE__ */ new Gt();
class On {
  constructor(e = new B(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, i) {
    return this.normal.set(e, t, n), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const i = Pr.subVectors(n, t).cross(cu.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e);
  }
  intersectLine(e, t) {
    const n = e.delta(Pr), i = this.normal.dot(n);
    if (i === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / i;
    return s < 0 || s > 1 ? null : t.copy(n).multiplyScalar(s).add(e.start);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || lu.getNormalMatrix(e), i = this.coplanarPoint(Pr).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -i.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const di = /* @__PURE__ */ new Ri(), Ps = /* @__PURE__ */ new B();
class Ba {
  constructor(e = new On(), t = new On(), n = new On(), i = new On(), s = new On(), a = new On()) {
    this.planes = [e, t, n, i, s, a];
  }
  set(e, t, n, i, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(s), o[5].copy(a), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e) {
    const t = this.planes, n = e.elements, i = n[0], s = n[1], a = n[2], o = n[3], c = n[4], l = n[5], h = n[6], u = n[7], d = n[8], f = n[9], g = n[10], p = n[11], A = n[12], m = n[13], E = n[14], b = n[15];
    return t[0].setComponents(o - i, u - c, p - d, b - A).normalize(), t[1].setComponents(o + i, u + c, p + d, b + A).normalize(), t[2].setComponents(o + s, u + l, p + f, b + m).normalize(), t[3].setComponents(o - s, u - l, p - f, b - m).normalize(), t[4].setComponents(o - a, u - h, p - g, b - E).normalize(), t[5].setComponents(o + a, u + h, p + g, b + E).normalize(), this;
  }
  intersectsObject(e) {
    const t = e.geometry;
    return t.boundingSphere === null && t.computeBoundingSphere(), di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(di);
  }
  intersectsSprite(e) {
    return di.center.set(0, 0, 0), di.radius = 0.7071067811865476, di.applyMatrix4(e.matrixWorld), this.intersectsSphere(di);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, i = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < i)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const i = t[n];
      if (Ps.x = i.normal.x > 0 ? e.max.x : e.min.x, Ps.y = i.normal.y > 0 ? e.max.y : e.min.y, Ps.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(Ps) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function al() {
  let r = null, e = !1, t = null, n = null;
  function i(s, a) {
    t(s, a), n = r.requestAnimationFrame(i);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = r.requestAnimationFrame(i), e = !0);
    },
    stop: function() {
      r.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      r = s;
    }
  };
}
function hu(r, e) {
  const t = e.isWebGL2, n = /* @__PURE__ */ new WeakMap();
  function i(l, h) {
    const u = l.array, d = l.usage, f = r.createBuffer();
    r.bindBuffer(h, f), r.bufferData(h, u, d), l.onUploadCallback();
    let g;
    if (u instanceof Float32Array)
      g = 5126;
    else if (u instanceof Uint16Array)
      if (l.isFloat16BufferAttribute)
        if (t)
          g = 5131;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        g = 5123;
    else if (u instanceof Int16Array)
      g = 5122;
    else if (u instanceof Uint32Array)
      g = 5125;
    else if (u instanceof Int32Array)
      g = 5124;
    else if (u instanceof Int8Array)
      g = 5120;
    else if (u instanceof Uint8Array)
      g = 5121;
    else if (u instanceof Uint8ClampedArray)
      g = 5121;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: f,
      type: g,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: l.version
    };
  }
  function s(l, h, u) {
    const d = h.array, f = h.updateRange;
    r.bindBuffer(u, l), f.count === -1 ? r.bufferSubData(u, 0, d) : (t ? r.bufferSubData(
      u,
      f.offset * d.BYTES_PER_ELEMENT,
      d,
      f.offset,
      f.count
    ) : r.bufferSubData(
      u,
      f.offset * d.BYTES_PER_ELEMENT,
      d.subarray(f.offset, f.offset + f.count)
    ), f.count = -1), h.onUploadCallback();
  }
  function a(l) {
    return l.isInterleavedBufferAttribute && (l = l.data), n.get(l);
  }
  function o(l) {
    l.isInterleavedBufferAttribute && (l = l.data);
    const h = n.get(l);
    h && (r.deleteBuffer(h.buffer), n.delete(l));
  }
  function c(l, h) {
    if (l.isGLBufferAttribute) {
      const d = n.get(l);
      (!d || d.version < l.version) && n.set(l, {
        buffer: l.buffer,
        type: l.type,
        bytesPerElement: l.elementSize,
        version: l.version
      });
      return;
    }
    l.isInterleavedBufferAttribute && (l = l.data);
    const u = n.get(l);
    u === void 0 ? n.set(l, i(l, h)) : u.version < l.version && (s(u.buffer, l, h), u.version = l.version);
  }
  return {
    get: a,
    remove: o,
    update: c
  };
}
class sr extends _t {
  constructor(e = 1, t = 1, n = 1, i = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: i
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), c = Math.floor(i), l = o + 1, h = c + 1, u = e / o, d = t / c, f = [], g = [], p = [], A = [];
    for (let m = 0; m < h; m++) {
      const E = m * d - a;
      for (let b = 0; b < l; b++) {
        const _ = b * u - s;
        g.push(_, -E, 0), p.push(0, 0, 1), A.push(b / o), A.push(1 - m / c);
      }
    }
    for (let m = 0; m < c; m++)
      for (let E = 0; E < o; E++) {
        const b = E + l * m, _ = E + l * (m + 1), I = E + 1 + l * (m + 1), w = E + 1 + l * m;
        f.push(b, _, w), f.push(_, I, w);
      }
    this.setIndex(f), this.setAttribute("position", new Xe(g, 3)), this.setAttribute("normal", new Xe(p, 3)), this.setAttribute("uv", new Xe(A, 2));
  }
  static fromJSON(e) {
    return new sr(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var uu = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`, du = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Au = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`, fu = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, pu = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, gu = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, mu = "vec3 transformed = vec3( position );", bu = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, _u = `vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`, xu = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Eu = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Iu = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`, Cu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, yu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, vu = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, wu = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Mu = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Su = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, Bu = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, Tu = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`, Du = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Ru = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Lu = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Qu = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`, Pu = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Fu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, ku = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Nu = `vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Gu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Uu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Ou = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, zu = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Hu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Vu = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Wu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, qu = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, ju = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Yu = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Ju = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, Ku = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Xu = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Zu = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, $u = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, ed = `#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`, td = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, nd = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, id = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, sd = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, rd = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`, ad = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, od = `
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, cd = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, ld = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`, hd = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, ud = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, dd = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`, Ad = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`, fd = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, pd = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, gd = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, md = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, bd = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`, _d = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, xd = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Ed = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, Id = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, Cd = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, yd = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`, vd = `#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, wd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Md = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Sd = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Bd = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`, Td = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`, Dd = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`, Rd = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`, Ld = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Qd = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Pd = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`, Fd = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, kd = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Nd = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Gd = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Ud = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Od = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, zd = `#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`, Hd = `#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Vd = `#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`, Wd = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, qd = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, jd = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`, Yd = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Jd = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Kd = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Xd = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Zd = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, $d = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, eA = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`, tA = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`, nA = `#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`, iA = `#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`, sA = `#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`, rA = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`, aA = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`, oA = `#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`, cA = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const lA = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, hA = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`, uA = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, dA = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`, AA = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, fA = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`, pA = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, gA = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, mA = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, bA = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, _A = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, xA = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`, EA = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, IA = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, CA = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, yA = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vA = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, wA = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, MA = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, SA = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, BA = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`, TA = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, DA = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, RA = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, LA = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, QA = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, PA = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, FA = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, kA = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, NA = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, GA = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, UA = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`, OA = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, zA = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`, De = {
  alphamap_fragment: uu,
  alphamap_pars_fragment: du,
  alphatest_fragment: Au,
  alphatest_pars_fragment: fu,
  aomap_fragment: pu,
  aomap_pars_fragment: gu,
  begin_vertex: mu,
  beginnormal_vertex: bu,
  bsdfs: _u,
  iridescence_fragment: xu,
  bumpmap_pars_fragment: Eu,
  clipping_planes_fragment: Iu,
  clipping_planes_pars_fragment: Cu,
  clipping_planes_pars_vertex: yu,
  clipping_planes_vertex: vu,
  color_fragment: wu,
  color_pars_fragment: Mu,
  color_pars_vertex: Su,
  color_vertex: Bu,
  common: Tu,
  cube_uv_reflection_fragment: Du,
  defaultnormal_vertex: Ru,
  displacementmap_pars_vertex: Lu,
  displacementmap_vertex: Qu,
  emissivemap_fragment: Pu,
  emissivemap_pars_fragment: Fu,
  encodings_fragment: ku,
  encodings_pars_fragment: Nu,
  envmap_fragment: Gu,
  envmap_common_pars_fragment: Uu,
  envmap_pars_fragment: Ou,
  envmap_pars_vertex: zu,
  envmap_physical_pars_fragment: ed,
  envmap_vertex: Hu,
  fog_vertex: Vu,
  fog_pars_vertex: Wu,
  fog_fragment: qu,
  fog_pars_fragment: ju,
  gradientmap_pars_fragment: Yu,
  lightmap_fragment: Ju,
  lightmap_pars_fragment: Ku,
  lights_lambert_fragment: Xu,
  lights_lambert_pars_fragment: Zu,
  lights_pars_begin: $u,
  lights_toon_fragment: td,
  lights_toon_pars_fragment: nd,
  lights_phong_fragment: id,
  lights_phong_pars_fragment: sd,
  lights_physical_fragment: rd,
  lights_physical_pars_fragment: ad,
  lights_fragment_begin: od,
  lights_fragment_maps: cd,
  lights_fragment_end: ld,
  logdepthbuf_fragment: hd,
  logdepthbuf_pars_fragment: ud,
  logdepthbuf_pars_vertex: dd,
  logdepthbuf_vertex: Ad,
  map_fragment: fd,
  map_pars_fragment: pd,
  map_particle_fragment: gd,
  map_particle_pars_fragment: md,
  metalnessmap_fragment: bd,
  metalnessmap_pars_fragment: _d,
  morphcolor_vertex: xd,
  morphnormal_vertex: Ed,
  morphtarget_pars_vertex: Id,
  morphtarget_vertex: Cd,
  normal_fragment_begin: yd,
  normal_fragment_maps: vd,
  normal_pars_fragment: wd,
  normal_pars_vertex: Md,
  normal_vertex: Sd,
  normalmap_pars_fragment: Bd,
  clearcoat_normal_fragment_begin: Td,
  clearcoat_normal_fragment_maps: Dd,
  clearcoat_pars_fragment: Rd,
  iridescence_pars_fragment: Ld,
  output_fragment: Qd,
  packing: Pd,
  premultiplied_alpha_fragment: Fd,
  project_vertex: kd,
  dithering_fragment: Nd,
  dithering_pars_fragment: Gd,
  roughnessmap_fragment: Ud,
  roughnessmap_pars_fragment: Od,
  shadowmap_pars_fragment: zd,
  shadowmap_pars_vertex: Hd,
  shadowmap_vertex: Vd,
  shadowmask_pars_fragment: Wd,
  skinbase_vertex: qd,
  skinning_pars_vertex: jd,
  skinning_vertex: Yd,
  skinnormal_vertex: Jd,
  specularmap_fragment: Kd,
  specularmap_pars_fragment: Xd,
  tonemapping_fragment: Zd,
  tonemapping_pars_fragment: $d,
  transmission_fragment: eA,
  transmission_pars_fragment: tA,
  uv_pars_fragment: nA,
  uv_pars_vertex: iA,
  uv_vertex: sA,
  uv2_pars_fragment: rA,
  uv2_pars_vertex: aA,
  uv2_vertex: oA,
  worldpos_vertex: cA,
  background_vert: lA,
  background_frag: hA,
  backgroundCube_vert: uA,
  backgroundCube_frag: dA,
  cube_vert: AA,
  cube_frag: fA,
  depth_vert: pA,
  depth_frag: gA,
  distanceRGBA_vert: mA,
  distanceRGBA_frag: bA,
  equirect_vert: _A,
  equirect_frag: xA,
  linedashed_vert: EA,
  linedashed_frag: IA,
  meshbasic_vert: CA,
  meshbasic_frag: yA,
  meshlambert_vert: vA,
  meshlambert_frag: wA,
  meshmatcap_vert: MA,
  meshmatcap_frag: SA,
  meshnormal_vert: BA,
  meshnormal_frag: TA,
  meshphong_vert: DA,
  meshphong_frag: RA,
  meshphysical_vert: LA,
  meshphysical_frag: QA,
  meshtoon_vert: PA,
  meshtoon_frag: FA,
  points_vert: kA,
  points_frag: NA,
  shadow_vert: GA,
  shadow_frag: UA,
  sprite_vert: OA,
  sprite_frag: zA
}, ue = {
  common: {
    diffuse: { value: /* @__PURE__ */ new we(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    uvTransform: { value: /* @__PURE__ */ new Gt() },
    uv2Transform: { value: /* @__PURE__ */ new Gt() },
    alphaMap: { value: null },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 }
  },
  emissivemap: {
    emissiveMap: { value: null }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalScale: { value: /* @__PURE__ */ new fe(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  roughnessmap: {
    roughnessMap: { value: null }
  },
  metalnessmap: {
    metalnessMap: { value: null }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new we(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new we(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Gt() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new we(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new fe(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Gt() }
  }
}, Zt = {
  basic: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.specularmap,
      ue.envmap,
      ue.aomap,
      ue.lightmap,
      ue.fog
    ]),
    vertexShader: De.meshbasic_vert,
    fragmentShader: De.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.specularmap,
      ue.envmap,
      ue.aomap,
      ue.lightmap,
      ue.emissivemap,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      ue.fog,
      ue.lights,
      {
        emissive: { value: /* @__PURE__ */ new we(0) }
      }
    ]),
    vertexShader: De.meshlambert_vert,
    fragmentShader: De.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.specularmap,
      ue.envmap,
      ue.aomap,
      ue.lightmap,
      ue.emissivemap,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      ue.fog,
      ue.lights,
      {
        emissive: { value: /* @__PURE__ */ new we(0) },
        specular: { value: /* @__PURE__ */ new we(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: De.meshphong_vert,
    fragmentShader: De.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.envmap,
      ue.aomap,
      ue.lightmap,
      ue.emissivemap,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      ue.roughnessmap,
      ue.metalnessmap,
      ue.fog,
      ue.lights,
      {
        emissive: { value: /* @__PURE__ */ new we(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: De.meshphysical_vert,
    fragmentShader: De.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.aomap,
      ue.lightmap,
      ue.emissivemap,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      ue.gradientmap,
      ue.fog,
      ue.lights,
      {
        emissive: { value: /* @__PURE__ */ new we(0) }
      }
    ]),
    vertexShader: De.meshtoon_vert,
    fragmentShader: De.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      ue.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: De.meshmatcap_vert,
    fragmentShader: De.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Bt([
      ue.points,
      ue.fog
    ]),
    vertexShader: De.points_vert,
    fragmentShader: De.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: De.linedashed_vert,
    fragmentShader: De.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.displacementmap
    ]),
    vertexShader: De.depth_vert,
    fragmentShader: De.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.bumpmap,
      ue.normalmap,
      ue.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.meshnormal_vert,
    fragmentShader: De.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Bt([
      ue.sprite,
      ue.fog
    ]),
    vertexShader: De.sprite_vert,
    fragmentShader: De.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Gt() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.background_vert,
    fragmentShader: De.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.backgroundCube_vert,
    fragmentShader: De.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: De.cube_vert,
    fragmentShader: De.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: De.equirect_vert,
    fragmentShader: De.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Bt([
      ue.common,
      ue.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new B() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: De.distanceRGBA_vert,
    fragmentShader: De.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Bt([
      ue.lights,
      ue.fog,
      {
        color: { value: /* @__PURE__ */ new we(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.shadow_vert,
    fragmentShader: De.shadow_frag
  }
};
Zt.physical = {
  uniforms: /* @__PURE__ */ Bt([
    Zt.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatNormalScale: { value: /* @__PURE__ */ new fe(1, 1) },
      clearcoatNormalMap: { value: null },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new we(0) },
      sheenColorMap: { value: null },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionSamplerSize: { value: /* @__PURE__ */ new fe() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new we(0) },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularColor: { value: /* @__PURE__ */ new we(1, 1, 1) },
      specularColorMap: { value: null }
    }
  ]),
  vertexShader: De.meshphysical_vert,
  fragmentShader: De.meshphysical_frag
};
const Fs = { r: 0, b: 0, g: 0 };
function HA(r, e, t, n, i, s, a) {
  const o = new we(0);
  let c = s === !0 ? 0 : 1, l, h, u = null, d = 0, f = null;
  function g(A, m) {
    let E = !1, b = m.isScene === !0 ? m.background : null;
    b && b.isTexture && (b = (m.backgroundBlurriness > 0 ? t : e).get(b));
    const _ = r.xr, I = _.getSession && _.getSession();
    I && I.environmentBlendMode === "additive" && (b = null), b === null ? p(o, c) : b && b.isColor && (p(b, 1), E = !0), (r.autoClear || E) && r.clear(r.autoClearColor, r.autoClearDepth, r.autoClearStencil), b && (b.isCubeTexture || b.mapping === nr) ? (h === void 0 && (h = new Ie(
      new Yt(1, 1, 1),
      new Qn({
        name: "BackgroundCubeMaterial",
        uniforms: Ti(Zt.backgroundCube.uniforms),
        vertexShader: Zt.backgroundCube.vertexShader,
        fragmentShader: Zt.backgroundCube.fragmentShader,
        side: Ht,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(w, T, x) {
      this.matrixWorld.copyPosition(x.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), i.update(h)), h.material.uniforms.envMap.value = b, h.material.uniforms.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = m.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, h.material.toneMapped = b.encoding !== Fe, (u !== b || d !== b.version || f !== r.toneMapping) && (h.material.needsUpdate = !0, u = b, d = b.version, f = r.toneMapping), h.layers.enableAll(), A.unshift(h, h.geometry, h.material, 0, 0, null)) : b && b.isTexture && (l === void 0 && (l = new Ie(
      new sr(2, 2),
      new Qn({
        name: "BackgroundMaterial",
        uniforms: Ti(Zt.background.uniforms),
        vertexShader: Zt.background.vertexShader,
        fragmentShader: Zt.background.fragmentShader,
        side: Dn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), i.update(l)), l.material.uniforms.t2D.value = b, l.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, l.material.toneMapped = b.encoding !== Fe, b.matrixAutoUpdate === !0 && b.updateMatrix(), l.material.uniforms.uvTransform.value.copy(b.matrix), (u !== b || d !== b.version || f !== r.toneMapping) && (l.material.needsUpdate = !0, u = b, d = b.version, f = r.toneMapping), l.layers.enableAll(), A.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function p(A, m) {
    A.getRGB(Fs, sl(r)), n.buffers.color.setClear(Fs.r, Fs.g, Fs.b, m, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(A, m = 1) {
      o.set(A), c = m, p(o, c);
    },
    getClearAlpha: function() {
      return c;
    },
    setClearAlpha: function(A) {
      c = A, p(o, c);
    },
    render: g
  };
}
function VA(r, e, t, n) {
  const i = r.getParameter(34921), s = n.isWebGL2 ? null : e.get("OES_vertex_array_object"), a = n.isWebGL2 || s !== null, o = {}, c = A(null);
  let l = c, h = !1;
  function u(Q, H, ne, ee, V) {
    let re = !1;
    if (a) {
      const ie = p(ee, ne, H);
      l !== ie && (l = ie, f(l.object)), re = m(Q, ee, ne, V), re && E(Q, ee, ne, V);
    } else {
      const ie = H.wireframe === !0;
      (l.geometry !== ee.id || l.program !== ne.id || l.wireframe !== ie) && (l.geometry = ee.id, l.program = ne.id, l.wireframe = ie, re = !0);
    }
    V !== null && t.update(V, 34963), (re || h) && (h = !1, x(Q, H, ne, ee), V !== null && r.bindBuffer(34963, t.get(V).buffer));
  }
  function d() {
    return n.isWebGL2 ? r.createVertexArray() : s.createVertexArrayOES();
  }
  function f(Q) {
    return n.isWebGL2 ? r.bindVertexArray(Q) : s.bindVertexArrayOES(Q);
  }
  function g(Q) {
    return n.isWebGL2 ? r.deleteVertexArray(Q) : s.deleteVertexArrayOES(Q);
  }
  function p(Q, H, ne) {
    const ee = ne.wireframe === !0;
    let V = o[Q.id];
    V === void 0 && (V = {}, o[Q.id] = V);
    let re = V[H.id];
    re === void 0 && (re = {}, V[H.id] = re);
    let ie = re[ee];
    return ie === void 0 && (ie = A(d()), re[ee] = ie), ie;
  }
  function A(Q) {
    const H = [], ne = [], ee = [];
    for (let V = 0; V < i; V++)
      H[V] = 0, ne[V] = 0, ee[V] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: H,
      enabledAttributes: ne,
      attributeDivisors: ee,
      object: Q,
      attributes: {},
      index: null
    };
  }
  function m(Q, H, ne, ee) {
    const V = l.attributes, re = H.attributes;
    let ie = 0;
    const $ = ne.getAttributes();
    for (const X in $)
      if ($[X].location >= 0) {
        const ae = V[X];
        let de = re[X];
        if (de === void 0 && (X === "instanceMatrix" && Q.instanceMatrix && (de = Q.instanceMatrix), X === "instanceColor" && Q.instanceColor && (de = Q.instanceColor)), ae === void 0 || ae.attribute !== de || de && ae.data !== de.data)
          return !0;
        ie++;
      }
    return l.attributesNum !== ie || l.index !== ee;
  }
  function E(Q, H, ne, ee) {
    const V = {}, re = H.attributes;
    let ie = 0;
    const $ = ne.getAttributes();
    for (const X in $)
      if ($[X].location >= 0) {
        let ae = re[X];
        ae === void 0 && (X === "instanceMatrix" && Q.instanceMatrix && (ae = Q.instanceMatrix), X === "instanceColor" && Q.instanceColor && (ae = Q.instanceColor));
        const de = {};
        de.attribute = ae, ae && ae.data && (de.data = ae.data), V[X] = de, ie++;
      }
    l.attributes = V, l.attributesNum = ie, l.index = ee;
  }
  function b() {
    const Q = l.newAttributes;
    for (let H = 0, ne = Q.length; H < ne; H++)
      Q[H] = 0;
  }
  function _(Q) {
    I(Q, 0);
  }
  function I(Q, H) {
    const ne = l.newAttributes, ee = l.enabledAttributes, V = l.attributeDivisors;
    ne[Q] = 1, ee[Q] === 0 && (r.enableVertexAttribArray(Q), ee[Q] = 1), V[Q] !== H && ((n.isWebGL2 ? r : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](Q, H), V[Q] = H);
  }
  function w() {
    const Q = l.newAttributes, H = l.enabledAttributes;
    for (let ne = 0, ee = H.length; ne < ee; ne++)
      H[ne] !== Q[ne] && (r.disableVertexAttribArray(ne), H[ne] = 0);
  }
  function T(Q, H, ne, ee, V, re) {
    n.isWebGL2 === !0 && (ne === 5124 || ne === 5125) ? r.vertexAttribIPointer(Q, H, ne, V, re) : r.vertexAttribPointer(Q, H, ne, ee, V, re);
  }
  function x(Q, H, ne, ee) {
    if (n.isWebGL2 === !1 && (Q.isInstancedMesh || ee.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
      return;
    b();
    const V = ee.attributes, re = ne.getAttributes(), ie = H.defaultAttributeValues;
    for (const $ in re) {
      const X = re[$];
      if (X.location >= 0) {
        let he = V[$];
        if (he === void 0 && ($ === "instanceMatrix" && Q.instanceMatrix && (he = Q.instanceMatrix), $ === "instanceColor" && Q.instanceColor && (he = Q.instanceColor)), he !== void 0) {
          const ae = he.normalized, de = he.itemSize, W = t.get(he);
          if (W === void 0)
            continue;
          const Me = W.buffer, me = W.type, Ce = W.bytesPerElement;
          if (he.isInterleavedBufferAttribute) {
            const ge = he.data, Te = ge.stride, ye = he.offset;
            if (ge.isInstancedInterleavedBuffer) {
              for (let Ee = 0; Ee < X.locationSize; Ee++)
                I(X.location + Ee, ge.meshPerAttribute);
              Q.isInstancedMesh !== !0 && ee._maxInstanceCount === void 0 && (ee._maxInstanceCount = ge.meshPerAttribute * ge.count);
            } else
              for (let Ee = 0; Ee < X.locationSize; Ee++)
                _(X.location + Ee);
            r.bindBuffer(34962, Me);
            for (let Ee = 0; Ee < X.locationSize; Ee++)
              T(
                X.location + Ee,
                de / X.locationSize,
                me,
                ae,
                Te * Ce,
                (ye + de / X.locationSize * Ee) * Ce
              );
          } else {
            if (he.isInstancedBufferAttribute) {
              for (let ge = 0; ge < X.locationSize; ge++)
                I(X.location + ge, he.meshPerAttribute);
              Q.isInstancedMesh !== !0 && ee._maxInstanceCount === void 0 && (ee._maxInstanceCount = he.meshPerAttribute * he.count);
            } else
              for (let ge = 0; ge < X.locationSize; ge++)
                _(X.location + ge);
            r.bindBuffer(34962, Me);
            for (let ge = 0; ge < X.locationSize; ge++)
              T(
                X.location + ge,
                de / X.locationSize,
                me,
                ae,
                de * Ce,
                de / X.locationSize * ge * Ce
              );
          }
        } else if (ie !== void 0) {
          const ae = ie[$];
          if (ae !== void 0)
            switch (ae.length) {
              case 2:
                r.vertexAttrib2fv(X.location, ae);
                break;
              case 3:
                r.vertexAttrib3fv(X.location, ae);
                break;
              case 4:
                r.vertexAttrib4fv(X.location, ae);
                break;
              default:
                r.vertexAttrib1fv(X.location, ae);
            }
        }
      }
    }
    w();
  }
  function y() {
    q();
    for (const Q in o) {
      const H = o[Q];
      for (const ne in H) {
        const ee = H[ne];
        for (const V in ee)
          g(ee[V].object), delete ee[V];
        delete H[ne];
      }
      delete o[Q];
    }
  }
  function D(Q) {
    if (o[Q.id] === void 0)
      return;
    const H = o[Q.id];
    for (const ne in H) {
      const ee = H[ne];
      for (const V in ee)
        g(ee[V].object), delete ee[V];
      delete H[ne];
    }
    delete o[Q.id];
  }
  function P(Q) {
    for (const H in o) {
      const ne = o[H];
      if (ne[Q.id] === void 0)
        continue;
      const ee = ne[Q.id];
      for (const V in ee)
        g(ee[V].object), delete ee[V];
      delete ne[Q.id];
    }
  }
  function q() {
    F(), h = !0, l !== c && (l = c, f(l.object));
  }
  function F() {
    c.geometry = null, c.program = null, c.wireframe = !1;
  }
  return {
    setup: u,
    reset: q,
    resetDefaultState: F,
    dispose: y,
    releaseStatesOfGeometry: D,
    releaseStatesOfProgram: P,
    initAttributes: b,
    enableAttribute: _,
    disableUnusedAttributes: w
  };
}
function WA(r, e, t, n) {
  const i = n.isWebGL2;
  let s;
  function a(l) {
    s = l;
  }
  function o(l, h) {
    r.drawArrays(s, l, h), t.update(h, s, 1);
  }
  function c(l, h, u) {
    if (u === 0)
      return;
    let d, f;
    if (i)
      d = r, f = "drawArraysInstanced";
    else if (d = e.get("ANGLE_instanced_arrays"), f = "drawArraysInstancedANGLE", d === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    d[f](s, l, h, u), t.update(h, s, u);
  }
  this.setMode = a, this.render = o, this.renderInstances = c;
}
function qA(r, e, t) {
  let n;
  function i() {
    if (n !== void 0)
      return n;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const T = e.get("EXT_texture_filter_anisotropic");
      n = r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      n = 0;
    return n;
  }
  function s(T) {
    if (T === "highp") {
      if (r.getShaderPrecisionFormat(35633, 36338).precision > 0 && r.getShaderPrecisionFormat(35632, 36338).precision > 0)
        return "highp";
      T = "mediump";
    }
    return T === "mediump" && r.getShaderPrecisionFormat(35633, 36337).precision > 0 && r.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp";
  }
  const a = typeof WebGL2RenderingContext < "u" && r instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext < "u" && r instanceof WebGL2ComputeRenderingContext;
  let o = t.precision !== void 0 ? t.precision : "highp";
  const c = s(o);
  c !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", c, "instead."), o = c);
  const l = a || e.has("WEBGL_draw_buffers"), h = t.logarithmicDepthBuffer === !0, u = r.getParameter(34930), d = r.getParameter(35660), f = r.getParameter(3379), g = r.getParameter(34076), p = r.getParameter(34921), A = r.getParameter(36347), m = r.getParameter(36348), E = r.getParameter(36349), b = d > 0, _ = a || e.has("OES_texture_float"), I = b && _, w = a ? r.getParameter(36183) : 0;
  return {
    isWebGL2: a,
    drawBuffers: l,
    getMaxAnisotropy: i,
    getMaxPrecision: s,
    precision: o,
    logarithmicDepthBuffer: h,
    maxTextures: u,
    maxVertexTextures: d,
    maxTextureSize: f,
    maxCubemapSize: g,
    maxAttributes: p,
    maxVertexUniforms: A,
    maxVaryings: m,
    maxFragmentUniforms: E,
    vertexTextures: b,
    floatFragmentTextures: _,
    floatVertexTextures: I,
    maxSamples: w
  };
}
function jA(r) {
  const e = this;
  let t = null, n = 0, i = !1, s = !1;
  const a = new On(), o = new Gt(), c = { value: null, needsUpdate: !1 };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d, f) {
    const g = u.length !== 0 || d || n !== 0 || i;
    return i = d, t = h(u, f, 0), n = u.length, g;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1, l();
  }, this.setState = function(u, d, f) {
    const g = u.clippingPlanes, p = u.clipIntersection, A = u.clipShadows, m = r.get(u);
    if (!i || g === null || g.length === 0 || s && !A)
      s ? h(null) : l();
    else {
      const E = s ? 0 : n, b = E * 4;
      let _ = m.clippingState || null;
      c.value = _, _ = h(g, d, b, f);
      for (let I = 0; I !== b; ++I)
        _[I] = t[I];
      m.clippingState = _, this.numIntersection = p ? this.numPlanes : 0, this.numPlanes += E;
    }
  };
  function l() {
    c.value !== t && (c.value = t, c.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(u, d, f, g) {
    const p = u !== null ? u.length : 0;
    let A = null;
    if (p !== 0) {
      if (A = c.value, g !== !0 || A === null) {
        const m = f + p * 4, E = d.matrixWorldInverse;
        o.getNormalMatrix(E), (A === null || A.length < m) && (A = new Float32Array(m));
        for (let b = 0, _ = f; b !== p; ++b, _ += 4)
          a.copy(u[b]).applyMatrix4(E, o), a.normal.toArray(A, _), A[_ + 3] = a.constant;
      }
      c.value = A, c.needsUpdate = !0;
    }
    return e.numPlanes = p, e.numIntersection = 0, A;
  }
}
function YA(r) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a, o) {
    return o === ls ? a.mapping = wi : o === oa && (a.mapping = Mi), a;
  }
  function n(a) {
    if (a && a.isTexture && a.isRenderTargetTexture === !1) {
      const o = a.mapping;
      if (o === ls || o === oa)
        if (e.has(a)) {
          const c = e.get(a).texture;
          return t(c, a.mapping);
        } else {
          const c = a.image;
          if (c && c.height > 0) {
            const l = new ou(c.height / 2);
            return l.fromEquirectangularTexture(r, a), e.set(a, l), a.addEventListener("dispose", i), t(l.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function i(a) {
    const o = a.target;
    o.removeEventListener("dispose", i);
    const c = e.get(o);
    c !== void 0 && (e.delete(o), c.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class Ta extends rl {
  constructor(e = -1, t = 1, n = 1, i = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, i, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = i + t, c = i - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += l * this.view.offsetX, a = s + l * this.view.width, o -= h * this.view.offsetY, c = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, c, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Ei = 4, Bo = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Hn = 20, Fr = /* @__PURE__ */ new Ta(), To = /* @__PURE__ */ new we();
let kr = null;
const zn = (1 + Math.sqrt(5)) / 2, Ai = 1 / zn, Do = [
  /* @__PURE__ */ new B(1, 1, 1),
  /* @__PURE__ */ new B(-1, 1, 1),
  /* @__PURE__ */ new B(1, 1, -1),
  /* @__PURE__ */ new B(-1, 1, -1),
  /* @__PURE__ */ new B(0, zn, Ai),
  /* @__PURE__ */ new B(0, zn, -Ai),
  /* @__PURE__ */ new B(Ai, 0, zn),
  /* @__PURE__ */ new B(-Ai, 0, zn),
  /* @__PURE__ */ new B(zn, Ai, 0),
  /* @__PURE__ */ new B(-zn, Ai, 0)
];
class Ro {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, n = 0.1, i = 100) {
    kr = this._renderer.getRenderTarget(), this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(e, n, i, s), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Po(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Qo(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(kr), e.scissorTest = !1, ks(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === wi || e.mapping === Mi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), kr = this._renderer.getRenderTarget();
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: nt,
      minFilter: nt,
      generateMipmaps: !1,
      type: Nt,
      format: It,
      encoding: tn,
      depthBuffer: !1
    }, i = Lo(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Lo(e, t, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = JA(s)), this._blurMaterial = KA(s, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new Ie(this._lodPlanes[0], e);
    this._renderer.compile(t, Fr);
  }
  _sceneToCubeUV(e, t, n, i) {
    const o = new Dt(90, 1, t, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(To), h.toneMapping = mn, h.autoClear = !1;
    const f = new Wn({
      name: "PMREM.Background",
      side: Ht,
      depthWrite: !1,
      depthTest: !1
    }), g = new Ie(new Yt(), f);
    let p = !1;
    const A = e.background;
    A ? A.isColor && (f.color.copy(A), e.background = null, p = !0) : (f.color.copy(To), p = !0);
    for (let m = 0; m < 6; m++) {
      const E = m % 3;
      E === 0 ? (o.up.set(0, c[m], 0), o.lookAt(l[m], 0, 0)) : E === 1 ? (o.up.set(0, 0, c[m]), o.lookAt(0, l[m], 0)) : (o.up.set(0, c[m], 0), o.lookAt(0, 0, l[m]));
      const b = this._cubeSize;
      ks(i, E * b, m > 2 ? b : 0, b, b), h.setRenderTarget(i), p && h.render(g, o), h.render(e, o);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, e.background = A;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, i = e.mapping === wi || e.mapping === Mi;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = Po()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Qo());
    const s = i ? this._cubemapMaterial : this._equirectMaterial, a = new Ie(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = e;
    const c = this._cubeSize;
    ks(t, 0, 0, 3 * c, 2 * c), n.setRenderTarget(t), n.render(a, Fr);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    for (let i = 1; i < this._lodPlanes.length; i++) {
      const s = Math.sqrt(this._sigmas[i] * this._sigmas[i] - this._sigmas[i - 1] * this._sigmas[i - 1]), a = Do[(i - 1) % Do.length];
      this._blur(e, i - 1, i, s, a);
    }
    t.autoClear = n;
  }
  _blur(e, t, n, i, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      i,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      i,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, i, s, a, o) {
    const c = this._renderer, l = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new Ie(this._lodPlanes[i], l), d = l.uniforms, f = this._sizeLods[n] - 1, g = isFinite(s) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * Hn - 1), p = s / g, A = isFinite(s) ? 1 + Math.floor(h * p) : Hn;
    A > Hn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${A} samples when the maximum is set to ${Hn}`);
    const m = [];
    let E = 0;
    for (let T = 0; T < Hn; ++T) {
      const x = T / p, y = Math.exp(-x * x / 2);
      m.push(y), T === 0 ? E += y : T < A && (E += 2 * y);
    }
    for (let T = 0; T < m.length; T++)
      m[T] = m[T] / E;
    d.envMap.value = e.texture, d.samples.value = A, d.weights.value = m, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: b } = this;
    d.dTheta.value = g, d.mipInt.value = b - n;
    const _ = this._sizeLods[i], I = 3 * _ * (i > b - Ei ? i - b + Ei : 0), w = 4 * (this._cubeSize - _);
    ks(t, I, w, 3 * _, 2 * _), c.setRenderTarget(t), c.render(u, Fr);
  }
}
function JA(r) {
  const e = [], t = [], n = [];
  let i = r;
  const s = r - Ei + 1 + Bo.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, i);
    t.push(o);
    let c = 1 / o;
    a > r - Ei ? c = Bo[a - r + Ei - 1] : a === 0 && (c = 0), n.push(c);
    const l = 1 / (o - 2), h = -l, u = 1 + l, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, g = 6, p = 3, A = 2, m = 1, E = new Float32Array(p * g * f), b = new Float32Array(A * g * f), _ = new Float32Array(m * g * f);
    for (let w = 0; w < f; w++) {
      const T = w % 3 * 2 / 3 - 1, x = w > 2 ? 0 : -1, y = [
        T,
        x,
        0,
        T + 2 / 3,
        x,
        0,
        T + 2 / 3,
        x + 1,
        0,
        T,
        x,
        0,
        T + 2 / 3,
        x + 1,
        0,
        T,
        x + 1,
        0
      ];
      E.set(y, p * g * w), b.set(d, A * g * w);
      const D = [w, w, w, w, w, w];
      _.set(D, m * g * w);
    }
    const I = new _t();
    I.setAttribute("position", new ot(E, p)), I.setAttribute("uv", new ot(b, A)), I.setAttribute("faceIndex", new ot(_, m)), e.push(I), i > Ei && i--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function Lo(r, e, t) {
  const n = new Jn(r, e, t);
  return n.texture.mapping = nr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function ks(r, e, t, n, i) {
  r.viewport.set(e, t, n, i), r.scissor.set(e, t, n, i);
}
function KA(r, e, t) {
  const n = new Float32Array(Hn), i = new B(0, 1, 0);
  return new Qn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Hn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${r}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: i }
    },
    vertexShader: Da(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: Bn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Qo() {
  return new Qn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Da(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: Bn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Po() {
  return new Qn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Da(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: Bn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Da() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function XA(r) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(o) {
    if (o && o.isTexture) {
      const c = o.mapping, l = c === ls || c === oa, h = c === wi || c === Mi;
      if (l || h)
        if (o.isRenderTargetTexture && o.needsPMREMUpdate === !0) {
          o.needsPMREMUpdate = !1;
          let u = e.get(o);
          return t === null && (t = new Ro(r)), u = l ? t.fromEquirectangular(o, u) : t.fromCubemap(o, u), e.set(o, u), u.texture;
        } else {
          if (e.has(o))
            return e.get(o).texture;
          {
            const u = o.image;
            if (l && u && u.height > 0 || h && u && i(u)) {
              t === null && (t = new Ro(r));
              const d = l ? t.fromEquirectangular(o) : t.fromCubemap(o);
              return e.set(o, d), o.addEventListener("dispose", s), d.texture;
            } else
              return null;
          }
        }
    }
    return o;
  }
  function i(o) {
    let c = 0;
    const l = 6;
    for (let h = 0; h < l; h++)
      o[h] !== void 0 && c++;
    return c === l;
  }
  function s(o) {
    const c = o.target;
    c.removeEventListener("dispose", s);
    const l = e.get(c);
    l !== void 0 && (e.delete(c), l.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function ZA(r) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let i;
    switch (n) {
      case "WEBGL_depth_texture":
        i = r.getExtension("WEBGL_depth_texture") || r.getExtension("MOZ_WEBGL_depth_texture") || r.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        i = r.getExtension("EXT_texture_filter_anisotropic") || r.getExtension("MOZ_EXT_texture_filter_anisotropic") || r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        i = r.getExtension("WEBGL_compressed_texture_s3tc") || r.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        i = r.getExtension("WEBGL_compressed_texture_pvrtc") || r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        i = r.getExtension(n);
    }
    return e[n] = i, i;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function(n) {
      n.isWebGL2 ? t("EXT_color_buffer_float") : (t("WEBGL_depth_texture"), t("OES_texture_float"), t("OES_texture_half_float"), t("OES_texture_half_float_linear"), t("OES_standard_derivatives"), t("OES_element_index_uint"), t("OES_vertex_array_object"), t("ANGLE_instanced_arrays")), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture");
    },
    get: function(n) {
      const i = t(n);
      return i === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), i;
    }
  };
}
function $A(r, e, t, n) {
  const i = {}, s = /* @__PURE__ */ new WeakMap();
  function a(u) {
    const d = u.target;
    d.index !== null && e.remove(d.index);
    for (const g in d.attributes)
      e.remove(d.attributes[g]);
    d.removeEventListener("dispose", a), delete i[d.id];
    const f = s.get(d);
    f && (e.remove(f), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--;
  }
  function o(u, d) {
    return i[d.id] === !0 || (d.addEventListener("dispose", a), i[d.id] = !0, t.memory.geometries++), d;
  }
  function c(u) {
    const d = u.attributes;
    for (const g in d)
      e.update(d[g], 34962);
    const f = u.morphAttributes;
    for (const g in f) {
      const p = f[g];
      for (let A = 0, m = p.length; A < m; A++)
        e.update(p[A], 34962);
    }
  }
  function l(u) {
    const d = [], f = u.index, g = u.attributes.position;
    let p = 0;
    if (f !== null) {
      const E = f.array;
      p = f.version;
      for (let b = 0, _ = E.length; b < _; b += 3) {
        const I = E[b + 0], w = E[b + 1], T = E[b + 2];
        d.push(I, w, w, T, T, I);
      }
    } else {
      const E = g.array;
      p = g.version;
      for (let b = 0, _ = E.length / 3 - 1; b < _; b += 3) {
        const I = b + 0, w = b + 1, T = b + 2;
        d.push(I, w, w, T, T, I);
      }
    }
    const A = new (Kc(d) ? il : nl)(d, 1);
    A.version = p;
    const m = s.get(u);
    m && e.remove(m), s.set(u, A);
  }
  function h(u) {
    const d = s.get(u);
    if (d) {
      const f = u.index;
      f !== null && d.version < f.version && l(u);
    } else
      l(u);
    return s.get(u);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: h
  };
}
function ef(r, e, t, n) {
  const i = n.isWebGL2;
  let s;
  function a(d) {
    s = d;
  }
  let o, c;
  function l(d) {
    o = d.type, c = d.bytesPerElement;
  }
  function h(d, f) {
    r.drawElements(s, f, o, d * c), t.update(f, s, 1);
  }
  function u(d, f, g) {
    if (g === 0)
      return;
    let p, A;
    if (i)
      p = r, A = "drawElementsInstanced";
    else if (p = e.get("ANGLE_instanced_arrays"), A = "drawElementsInstancedANGLE", p === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    p[A](s, f, o, d * c, g), t.update(f, s, g);
  }
  this.setMode = a, this.setIndex = l, this.render = h, this.renderInstances = u;
}
function tf(r) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case 4:
        t.triangles += o * (s / 3);
        break;
      case 1:
        t.lines += o * (s / 2);
        break;
      case 3:
        t.lines += o * (s - 1);
        break;
      case 2:
        t.lines += o * s;
        break;
      case 0:
        t.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function i() {
    t.frame++, t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: i,
    update: n
  };
}
function nf(r, e) {
  return r[0] - e[0];
}
function sf(r, e) {
  return Math.abs(e[1]) - Math.abs(r[1]);
}
function rf(r, e, t) {
  const n = {}, i = new Float32Array(8), s = /* @__PURE__ */ new WeakMap(), a = new je(), o = [];
  for (let l = 0; l < 8; l++)
    o[l] = [l, 0];
  function c(l, h, u, d) {
    const f = l.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const g = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color, p = g !== void 0 ? g.length : 0;
      let A = s.get(h);
      if (A === void 0 || A.count !== p) {
        let H = function() {
          F.dispose(), s.delete(h), h.removeEventListener("dispose", H);
        };
        A !== void 0 && A.texture.dispose();
        const b = h.morphAttributes.position !== void 0, _ = h.morphAttributes.normal !== void 0, I = h.morphAttributes.color !== void 0, w = h.morphAttributes.position || [], T = h.morphAttributes.normal || [], x = h.morphAttributes.color || [];
        let y = 0;
        b === !0 && (y = 1), _ === !0 && (y = 2), I === !0 && (y = 3);
        let D = h.attributes.position.count * y, P = 1;
        D > e.maxTextureSize && (P = Math.ceil(D / e.maxTextureSize), D = e.maxTextureSize);
        const q = new Float32Array(D * P * 4 * p), F = new el(q, D, P, p);
        F.type = Rt, F.needsUpdate = !0;
        const Q = y * 4;
        for (let ne = 0; ne < p; ne++) {
          const ee = w[ne], V = T[ne], re = x[ne], ie = D * P * 4 * ne;
          for (let $ = 0; $ < ee.count; $++) {
            const X = $ * Q;
            b === !0 && (a.fromBufferAttribute(ee, $), q[ie + X + 0] = a.x, q[ie + X + 1] = a.y, q[ie + X + 2] = a.z, q[ie + X + 3] = 0), _ === !0 && (a.fromBufferAttribute(V, $), q[ie + X + 4] = a.x, q[ie + X + 5] = a.y, q[ie + X + 6] = a.z, q[ie + X + 7] = 0), I === !0 && (a.fromBufferAttribute(re, $), q[ie + X + 8] = a.x, q[ie + X + 9] = a.y, q[ie + X + 10] = a.z, q[ie + X + 11] = re.itemSize === 4 ? a.w : 1);
          }
        }
        A = {
          count: p,
          texture: F,
          size: new fe(D, P)
        }, s.set(h, A), h.addEventListener("dispose", H);
      }
      let m = 0;
      for (let b = 0; b < f.length; b++)
        m += f[b];
      const E = h.morphTargetsRelative ? 1 : 1 - m;
      d.getUniforms().setValue(r, "morphTargetBaseInfluence", E), d.getUniforms().setValue(r, "morphTargetInfluences", f), d.getUniforms().setValue(r, "morphTargetsTexture", A.texture, t), d.getUniforms().setValue(r, "morphTargetsTextureSize", A.size);
    } else {
      const g = f === void 0 ? 0 : f.length;
      let p = n[h.id];
      if (p === void 0 || p.length !== g) {
        p = [];
        for (let _ = 0; _ < g; _++)
          p[_] = [_, 0];
        n[h.id] = p;
      }
      for (let _ = 0; _ < g; _++) {
        const I = p[_];
        I[0] = _, I[1] = f[_];
      }
      p.sort(sf);
      for (let _ = 0; _ < 8; _++)
        _ < g && p[_][1] ? (o[_][0] = p[_][0], o[_][1] = p[_][1]) : (o[_][0] = Number.MAX_SAFE_INTEGER, o[_][1] = 0);
      o.sort(nf);
      const A = h.morphAttributes.position, m = h.morphAttributes.normal;
      let E = 0;
      for (let _ = 0; _ < 8; _++) {
        const I = o[_], w = I[0], T = I[1];
        w !== Number.MAX_SAFE_INTEGER && T ? (A && h.getAttribute("morphTarget" + _) !== A[w] && h.setAttribute("morphTarget" + _, A[w]), m && h.getAttribute("morphNormal" + _) !== m[w] && h.setAttribute("morphNormal" + _, m[w]), i[_] = T, E += T) : (A && h.hasAttribute("morphTarget" + _) === !0 && h.deleteAttribute("morphTarget" + _), m && h.hasAttribute("morphNormal" + _) === !0 && h.deleteAttribute("morphNormal" + _), i[_] = 0);
      }
      const b = h.morphTargetsRelative ? 1 : 1 - E;
      d.getUniforms().setValue(r, "morphTargetBaseInfluence", b), d.getUniforms().setValue(r, "morphTargetInfluences", i);
    }
  }
  return {
    update: c
  };
}
function af(r, e, t, n) {
  let i = /* @__PURE__ */ new WeakMap();
  function s(c) {
    const l = n.render.frame, h = c.geometry, u = e.get(c, h);
    return i.get(u) !== l && (e.update(u), i.set(u, l)), c.isInstancedMesh && (c.hasEventListener("dispose", o) === !1 && c.addEventListener("dispose", o), t.update(c.instanceMatrix, 34962), c.instanceColor !== null && t.update(c.instanceColor, 34962)), u;
  }
  function a() {
    i = /* @__PURE__ */ new WeakMap();
  }
  function o(c) {
    const l = c.target;
    l.removeEventListener("dispose", o), t.remove(l.instanceMatrix), l.instanceColor !== null && t.remove(l.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
const ol = /* @__PURE__ */ new ht(), cl = /* @__PURE__ */ new el(), ll = /* @__PURE__ */ new tl(), hl = /* @__PURE__ */ new Sa(), Fo = [], ko = [], No = new Float32Array(16), Go = new Float32Array(9), Uo = new Float32Array(4);
function Qi(r, e, t) {
  const n = r[0];
  if (n <= 0 || n > 0)
    return r;
  const i = e * t;
  let s = Fo[i];
  if (s === void 0 && (s = new Float32Array(i), Fo[i] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, r[a].toArray(s, o);
  }
  return s;
}
function ut(r, e) {
  if (r.length !== e.length)
    return !1;
  for (let t = 0, n = r.length; t < n; t++)
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function dt(r, e) {
  for (let t = 0, n = e.length; t < n; t++)
    r[t] = e[t];
}
function rr(r, e) {
  let t = ko[e];
  t === void 0 && (t = new Int32Array(e), ko[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = r.allocateTextureUnit();
  return t;
}
function of(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1f(this.addr, e), t[0] = e);
}
function cf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e))
      return;
    r.uniform2fv(this.addr, e), dt(t, e);
  }
}
function lf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (r.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (ut(t, e))
      return;
    r.uniform3fv(this.addr, e), dt(t, e);
  }
}
function hf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e))
      return;
    r.uniform4fv(this.addr, e), dt(t, e);
  }
}
function uf(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e))
      return;
    r.uniformMatrix2fv(this.addr, !1, e), dt(t, e);
  } else {
    if (ut(t, n))
      return;
    Uo.set(n), r.uniformMatrix2fv(this.addr, !1, Uo), dt(t, n);
  }
}
function df(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e))
      return;
    r.uniformMatrix3fv(this.addr, !1, e), dt(t, e);
  } else {
    if (ut(t, n))
      return;
    Go.set(n), r.uniformMatrix3fv(this.addr, !1, Go), dt(t, n);
  }
}
function Af(r, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (ut(t, e))
      return;
    r.uniformMatrix4fv(this.addr, !1, e), dt(t, e);
  } else {
    if (ut(t, n))
      return;
    No.set(n), r.uniformMatrix4fv(this.addr, !1, No), dt(t, n);
  }
}
function ff(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1i(this.addr, e), t[0] = e);
}
function pf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e))
      return;
    r.uniform2iv(this.addr, e), dt(t, e);
  }
}
function gf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ut(t, e))
      return;
    r.uniform3iv(this.addr, e), dt(t, e);
  }
}
function mf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e))
      return;
    r.uniform4iv(this.addr, e), dt(t, e);
  }
}
function bf(r, e) {
  const t = this.cache;
  t[0] !== e && (r.uniform1ui(this.addr, e), t[0] = e);
}
function _f(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (r.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (ut(t, e))
      return;
    r.uniform2uiv(this.addr, e), dt(t, e);
  }
}
function xf(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (r.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (ut(t, e))
      return;
    r.uniform3uiv(this.addr, e), dt(t, e);
  }
}
function Ef(r, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (r.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (ut(t, e))
      return;
    r.uniform4uiv(this.addr, e), dt(t, e);
  }
}
function If(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture2D(e || ol, i);
}
function Cf(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture3D(e || ll, i);
}
function yf(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTextureCube(e || hl, i);
}
function vf(r, e, t) {
  const n = this.cache, i = t.allocateTextureUnit();
  n[0] !== i && (r.uniform1i(this.addr, i), n[0] = i), t.setTexture2DArray(e || cl, i);
}
function wf(r) {
  switch (r) {
    case 5126:
      return of;
    case 35664:
      return cf;
    case 35665:
      return lf;
    case 35666:
      return hf;
    case 35674:
      return uf;
    case 35675:
      return df;
    case 35676:
      return Af;
    case 5124:
    case 35670:
      return ff;
    case 35667:
    case 35671:
      return pf;
    case 35668:
    case 35672:
      return gf;
    case 35669:
    case 35673:
      return mf;
    case 5125:
      return bf;
    case 36294:
      return _f;
    case 36295:
      return xf;
    case 36296:
      return Ef;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return If;
    case 35679:
    case 36299:
    case 36307:
      return Cf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return yf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return vf;
  }
}
function Mf(r, e) {
  r.uniform1fv(this.addr, e);
}
function Sf(r, e) {
  const t = Qi(e, this.size, 2);
  r.uniform2fv(this.addr, t);
}
function Bf(r, e) {
  const t = Qi(e, this.size, 3);
  r.uniform3fv(this.addr, t);
}
function Tf(r, e) {
  const t = Qi(e, this.size, 4);
  r.uniform4fv(this.addr, t);
}
function Df(r, e) {
  const t = Qi(e, this.size, 4);
  r.uniformMatrix2fv(this.addr, !1, t);
}
function Rf(r, e) {
  const t = Qi(e, this.size, 9);
  r.uniformMatrix3fv(this.addr, !1, t);
}
function Lf(r, e) {
  const t = Qi(e, this.size, 16);
  r.uniformMatrix4fv(this.addr, !1, t);
}
function Qf(r, e) {
  r.uniform1iv(this.addr, e);
}
function Pf(r, e) {
  r.uniform2iv(this.addr, e);
}
function Ff(r, e) {
  r.uniform3iv(this.addr, e);
}
function kf(r, e) {
  r.uniform4iv(this.addr, e);
}
function Nf(r, e) {
  r.uniform1uiv(this.addr, e);
}
function Gf(r, e) {
  r.uniform2uiv(this.addr, e);
}
function Uf(r, e) {
  r.uniform3uiv(this.addr, e);
}
function Of(r, e) {
  r.uniform4uiv(this.addr, e);
}
function zf(r, e, t) {
  const n = this.cache, i = e.length, s = rr(t, i);
  ut(n, s) || (r.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTexture2D(e[a] || ol, s[a]);
}
function Hf(r, e, t) {
  const n = this.cache, i = e.length, s = rr(t, i);
  ut(n, s) || (r.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTexture3D(e[a] || ll, s[a]);
}
function Vf(r, e, t) {
  const n = this.cache, i = e.length, s = rr(t, i);
  ut(n, s) || (r.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTextureCube(e[a] || hl, s[a]);
}
function Wf(r, e, t) {
  const n = this.cache, i = e.length, s = rr(t, i);
  ut(n, s) || (r.uniform1iv(this.addr, s), dt(n, s));
  for (let a = 0; a !== i; ++a)
    t.setTexture2DArray(e[a] || cl, s[a]);
}
function qf(r) {
  switch (r) {
    case 5126:
      return Mf;
    case 35664:
      return Sf;
    case 35665:
      return Bf;
    case 35666:
      return Tf;
    case 35674:
      return Df;
    case 35675:
      return Rf;
    case 35676:
      return Lf;
    case 5124:
    case 35670:
      return Qf;
    case 35667:
    case 35671:
      return Pf;
    case 35668:
    case 35672:
      return Ff;
    case 35669:
    case 35673:
      return kf;
    case 5125:
      return Nf;
    case 36294:
      return Gf;
    case 36295:
      return Uf;
    case 36296:
      return Of;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return zf;
    case 35679:
    case 36299:
    case 36307:
      return Hf;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Vf;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Wf;
  }
}
class jf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.setValue = wf(t.type);
  }
}
class Yf {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.size = t.size, this.setValue = qf(t.type);
  }
}
class Jf {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const i = this.seq;
    for (let s = 0, a = i.length; s !== a; ++s) {
      const o = i[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const Nr = /(\w+)(\])?(\[|\.)?/g;
function Oo(r, e) {
  r.seq.push(e), r.map[e.id] = e;
}
function Kf(r, e, t) {
  const n = r.name, i = n.length;
  for (Nr.lastIndex = 0; ; ) {
    const s = Nr.exec(n), a = Nr.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === i) {
      Oo(t, l === void 0 ? new jf(o, r, e) : new Yf(o, r, e));
      break;
    } else {
      let u = t.map[o];
      u === void 0 && (u = new Jf(o), Oo(t, u)), t = u;
    }
  }
}
class Zs {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, 35718);
    for (let i = 0; i < n; ++i) {
      const s = e.getActiveUniform(t, i), a = e.getUniformLocation(t, s.name);
      Kf(s, a, this);
    }
  }
  setValue(e, t, n, i) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, i);
  }
  setOptional(e, t, n) {
    const i = t[n];
    i !== void 0 && this.setValue(e, n, i);
  }
  static upload(e, t, n, i) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], c = n[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, i);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let i = 0, s = e.length; i !== s; ++i) {
      const a = e[i];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function zo(r, e, t) {
  const n = r.createShader(e);
  return r.shaderSource(n, t), r.compileShader(n), n;
}
let Xf = 0;
function Zf(r, e) {
  const t = r.split(`
`), n = [], i = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = i; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
function $f(r) {
  switch (r) {
    case tn:
      return ["Linear", "( value )"];
    case Fe:
      return ["sRGB", "( value )"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported encoding:", r), ["Linear", "( value )"];
  }
}
function Ho(r, e, t) {
  const n = r.getShaderParameter(e, 35713), i = r.getShaderInfoLog(e).trim();
  if (n && i === "")
    return "";
  const s = /ERROR: 0:(\d+)/.exec(i);
  if (s) {
    const a = parseInt(s[1]);
    return t.toUpperCase() + `

` + i + `

` + Zf(r.getShaderSource(e), a);
  } else
    return i;
}
function ep(r, e) {
  const t = $f(e);
  return "vec4 " + r + "( vec4 value ) { return LinearTo" + t[0] + t[1] + "; }";
}
function tp(r, e) {
  let t;
  switch (e) {
    case lh:
      t = "Linear";
      break;
    case hh:
      t = "Reinhard";
      break;
    case uh:
      t = "OptimizedCineon";
      break;
    case zc:
      t = "ACESFilmic";
      break;
    case dh:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + r + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
function np(r) {
  return [
    r.extensionDerivatives || r.envMapCubeUVHeight || r.bumpMap || r.tangentSpaceNormalMap || r.clearcoatNormalMap || r.flatShading || r.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (r.extensionFragDepth || r.logarithmicDepthBuffer) && r.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    r.extensionDrawBuffers && r.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (r.extensionShaderTextureLOD || r.envMap || r.transmission) && r.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(is).join(`
`);
}
function ip(r) {
  const e = [];
  for (const t in r) {
    const n = r[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function sp(r, e) {
  const t = {}, n = r.getProgramParameter(e, 35721);
  for (let i = 0; i < n; i++) {
    const s = r.getActiveAttrib(e, i), a = s.name;
    let o = 1;
    s.type === 35674 && (o = 2), s.type === 35675 && (o = 3), s.type === 35676 && (o = 4), t[a] = {
      type: s.type,
      location: r.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function is(r) {
  return r !== "";
}
function Vo(r, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return r.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Wo(r, e) {
  return r.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const rp = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ba(r) {
  return r.replace(rp, ap);
}
function ap(r, e) {
  const t = De[e];
  if (t === void 0)
    throw new Error("Can not resolve #include <" + e + ">");
  return ba(t);
}
const op = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function qo(r) {
  return r.replace(op, cp);
}
function cp(r, e, t, n) {
  let i = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    i += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return i;
}
function jo(r) {
  let e = "precision " + r.precision + ` float;
precision ` + r.precision + " int;";
  return r.precision === "highp" ? e += `
#define HIGH_PRECISION` : r.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : r.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function lp(r) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return r.shadowMapType === kc ? e = "SHADOWMAP_TYPE_PCF" : r.shadowMapType === Nc ? e = "SHADOWMAP_TYPE_PCF_SOFT" : r.shadowMapType === es && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function hp(r) {
  let e = "ENVMAP_TYPE_CUBE";
  if (r.envMap)
    switch (r.envMapMode) {
      case wi:
      case Mi:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case nr:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function up(r) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (r.envMap)
    switch (r.envMapMode) {
      case Mi:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function dp(r) {
  let e = "ENVMAP_BLENDING_NONE";
  if (r.envMap)
    switch (r.combine) {
      case Oc:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case oh:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case ch:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function Ap(r) {
  const e = r.envMapCubeUVHeight;
  if (e === null)
    return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function fp(r, e, t, n) {
  const i = r.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const c = lp(t), l = hp(t), h = up(t), u = dp(t), d = Ap(t), f = t.isWebGL2 ? "" : np(t), g = ip(s), p = i.createProgram();
  let A, m, E = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (A = [
    g
  ].filter(is).join(`
`), A.length > 0 && (A += `
`), m = [
    f,
    g
  ].filter(is).join(`
`), m.length > 0 && (m += `
`)) : (A = [
    jo(t),
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
    t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.displacementMap && t.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
    t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
    t.vertexTangents ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUvs ? "#define USE_UV" : "",
    t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(is).join(`
`), m = [
    f,
    jo(t),
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + l : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMap && t.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
    t.normalMap && t.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "",
    t.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.vertexTangents ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUvs ? "#define USE_UV" : "",
    t.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== mn ? "#define TONE_MAPPING" : "",
    t.toneMapping !== mn ? De.tonemapping_pars_fragment : "",
    t.toneMapping !== mn ? tp("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    De.encodings_pars_fragment,
    ep("linearToOutputTexel", t.outputEncoding),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(is).join(`
`)), a = ba(a), a = Vo(a, t), a = Wo(a, t), o = ba(o), o = Vo(o, t), o = Wo(o, t), a = qo(a), o = qo(o), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (E = `#version 300 es
`, A = [
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + A, m = [
    "#define varying in",
    t.glslVersion === mo ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === mo ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + m);
  const b = E + A + a, _ = E + m + o, I = zo(i, 35633, b), w = zo(i, 35632, _);
  if (i.attachShader(p, I), i.attachShader(p, w), t.index0AttributeName !== void 0 ? i.bindAttribLocation(p, 0, t.index0AttributeName) : t.morphTargets === !0 && i.bindAttribLocation(p, 0, "position"), i.linkProgram(p), r.debug.checkShaderErrors) {
    const y = i.getProgramInfoLog(p).trim(), D = i.getShaderInfoLog(I).trim(), P = i.getShaderInfoLog(w).trim();
    let q = !0, F = !0;
    if (i.getProgramParameter(p, 35714) === !1) {
      q = !1;
      const Q = Ho(i, I, "vertex"), H = Ho(i, w, "fragment");
      console.error(
        "THREE.WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(p, 35715) + `

Program Info Log: ` + y + `
` + Q + `
` + H
      );
    } else
      y !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", y) : (D === "" || P === "") && (F = !1);
    F && (this.diagnostics = {
      runnable: q,
      programLog: y,
      vertexShader: {
        log: D,
        prefix: A
      },
      fragmentShader: {
        log: P,
        prefix: m
      }
    });
  }
  i.deleteShader(I), i.deleteShader(w);
  let T;
  this.getUniforms = function() {
    return T === void 0 && (T = new Zs(i, p)), T;
  };
  let x;
  return this.getAttributes = function() {
    return x === void 0 && (x = sp(i, p)), x;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), i.deleteProgram(p), this.program = void 0;
  }, this.name = t.shaderName, this.id = Xf++, this.cacheKey = e, this.usedTimes = 1, this.program = p, this.vertexShader = I, this.fragmentShader = w, this;
}
let pp = 0;
class gp {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, i = this._getShaderStage(t), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(e);
    return a.has(i) === !1 && (a.add(i), i.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new mp(e), t.set(e, n)), n;
  }
}
class mp {
  constructor(e) {
    this.id = pp++, this.code = e, this.usedTimes = 0;
  }
}
function bp(r, e, t, n, i, s, a) {
  const o = new Ma(), c = new gp(), l = [], h = i.isWebGL2, u = i.logarithmicDepthBuffer, d = i.vertexTextures;
  let f = i.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function p(x, y, D, P, q) {
    const F = P.fog, Q = q.geometry, H = x.isMeshStandardMaterial ? P.environment : null, ne = (x.isMeshStandardMaterial ? t : e).get(x.envMap || H), ee = ne && ne.mapping === nr ? ne.image.height : null, V = g[x.type];
    x.precision !== null && (f = i.getMaxPrecision(x.precision), f !== x.precision && console.warn("THREE.WebGLProgram.getParameters:", x.precision, "not supported, using", f, "instead."));
    const re = Q.morphAttributes.position || Q.morphAttributes.normal || Q.morphAttributes.color, ie = re !== void 0 ? re.length : 0;
    let $ = 0;
    Q.morphAttributes.position !== void 0 && ($ = 1), Q.morphAttributes.normal !== void 0 && ($ = 2), Q.morphAttributes.color !== void 0 && ($ = 3);
    let X, he, ae, de;
    if (V) {
      const Te = Zt[V];
      X = Te.vertexShader, he = Te.fragmentShader;
    } else
      X = x.vertexShader, he = x.fragmentShader, c.update(x), ae = c.getVertexShaderID(x), de = c.getFragmentShaderID(x);
    const W = r.getRenderTarget(), Me = x.alphaTest > 0, me = x.clearcoat > 0, Ce = x.iridescence > 0;
    return {
      isWebGL2: h,
      shaderID: V,
      shaderName: x.type,
      vertexShader: X,
      fragmentShader: he,
      defines: x.defines,
      customVertexShaderID: ae,
      customFragmentShaderID: de,
      isRawShaderMaterial: x.isRawShaderMaterial === !0,
      glslVersion: x.glslVersion,
      precision: f,
      instancing: q.isInstancedMesh === !0,
      instancingColor: q.isInstancedMesh === !0 && q.instanceColor !== null,
      supportsVertexTextures: d,
      outputEncoding: W === null ? r.outputEncoding : W.isXRRenderTarget === !0 ? W.texture.encoding : tn,
      map: !!x.map,
      matcap: !!x.matcap,
      envMap: !!ne,
      envMapMode: ne && ne.mapping,
      envMapCubeUVHeight: ee,
      lightMap: !!x.lightMap,
      aoMap: !!x.aoMap,
      emissiveMap: !!x.emissiveMap,
      bumpMap: !!x.bumpMap,
      normalMap: !!x.normalMap,
      objectSpaceNormalMap: x.normalMapType === Bh,
      tangentSpaceNormalMap: x.normalMapType === Yc,
      decodeVideoTexture: !!x.map && x.map.isVideoTexture === !0 && x.map.encoding === Fe,
      clearcoat: me,
      clearcoatMap: me && !!x.clearcoatMap,
      clearcoatRoughnessMap: me && !!x.clearcoatRoughnessMap,
      clearcoatNormalMap: me && !!x.clearcoatNormalMap,
      iridescence: Ce,
      iridescenceMap: Ce && !!x.iridescenceMap,
      iridescenceThicknessMap: Ce && !!x.iridescenceThicknessMap,
      displacementMap: !!x.displacementMap,
      roughnessMap: !!x.roughnessMap,
      metalnessMap: !!x.metalnessMap,
      specularMap: !!x.specularMap,
      specularIntensityMap: !!x.specularIntensityMap,
      specularColorMap: !!x.specularColorMap,
      opaque: x.transparent === !1 && x.blending === Ci,
      alphaMap: !!x.alphaMap,
      alphaTest: Me,
      gradientMap: !!x.gradientMap,
      sheen: x.sheen > 0,
      sheenColorMap: !!x.sheenColorMap,
      sheenRoughnessMap: !!x.sheenRoughnessMap,
      transmission: x.transmission > 0,
      transmissionMap: !!x.transmissionMap,
      thicknessMap: !!x.thicknessMap,
      combine: x.combine,
      vertexTangents: !!x.normalMap && !!Q.attributes.tangent,
      vertexColors: x.vertexColors,
      vertexAlphas: x.vertexColors === !0 && !!Q.attributes.color && Q.attributes.color.itemSize === 4,
      vertexUvs: !!x.map || !!x.bumpMap || !!x.normalMap || !!x.specularMap || !!x.alphaMap || !!x.emissiveMap || !!x.roughnessMap || !!x.metalnessMap || !!x.clearcoatMap || !!x.clearcoatRoughnessMap || !!x.clearcoatNormalMap || !!x.iridescenceMap || !!x.iridescenceThicknessMap || !!x.displacementMap || !!x.transmissionMap || !!x.thicknessMap || !!x.specularIntensityMap || !!x.specularColorMap || !!x.sheenColorMap || !!x.sheenRoughnessMap,
      uvsVertexOnly: !(x.map || x.bumpMap || x.normalMap || x.specularMap || x.alphaMap || x.emissiveMap || x.roughnessMap || x.metalnessMap || x.clearcoatNormalMap || x.iridescenceMap || x.iridescenceThicknessMap || x.transmission > 0 || x.transmissionMap || x.thicknessMap || x.specularIntensityMap || x.specularColorMap || x.sheen > 0 || x.sheenColorMap || x.sheenRoughnessMap) && !!x.displacementMap,
      fog: !!F,
      useFog: x.fog === !0,
      fogExp2: F && F.isFogExp2,
      flatShading: !!x.flatShading,
      sizeAttenuation: x.sizeAttenuation,
      logarithmicDepthBuffer: u,
      skinning: q.isSkinnedMesh === !0,
      morphTargets: Q.morphAttributes.position !== void 0,
      morphNormals: Q.morphAttributes.normal !== void 0,
      morphColors: Q.morphAttributes.color !== void 0,
      morphTargetsCount: ie,
      morphTextureStride: $,
      numDirLights: y.directional.length,
      numPointLights: y.point.length,
      numSpotLights: y.spot.length,
      numSpotLightMaps: y.spotLightMap.length,
      numRectAreaLights: y.rectArea.length,
      numHemiLights: y.hemi.length,
      numDirLightShadows: y.directionalShadowMap.length,
      numPointLightShadows: y.pointShadowMap.length,
      numSpotLightShadows: y.spotShadowMap.length,
      numSpotLightShadowsWithMaps: y.numSpotLightShadowsWithMaps,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: x.dithering,
      shadowMapEnabled: r.shadowMap.enabled && D.length > 0,
      shadowMapType: r.shadowMap.type,
      toneMapping: x.toneMapped ? r.toneMapping : mn,
      physicallyCorrectLights: r.physicallyCorrectLights,
      premultipliedAlpha: x.premultipliedAlpha,
      doubleSided: x.side === kt,
      flipSided: x.side === Ht,
      useDepthPacking: !!x.depthPacking,
      depthPacking: x.depthPacking || 0,
      index0AttributeName: x.index0AttributeName,
      extensionDerivatives: x.extensions && x.extensions.derivatives,
      extensionFragDepth: x.extensions && x.extensions.fragDepth,
      extensionDrawBuffers: x.extensions && x.extensions.drawBuffers,
      extensionShaderTextureLOD: x.extensions && x.extensions.shaderTextureLOD,
      rendererExtensionFragDepth: h || n.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: h || n.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: h || n.has("EXT_shader_texture_lod"),
      customProgramCacheKey: x.customProgramCacheKey()
    };
  }
  function A(x) {
    const y = [];
    if (x.shaderID ? y.push(x.shaderID) : (y.push(x.customVertexShaderID), y.push(x.customFragmentShaderID)), x.defines !== void 0)
      for (const D in x.defines)
        y.push(D), y.push(x.defines[D]);
    return x.isRawShaderMaterial === !1 && (m(y, x), E(y, x), y.push(r.outputEncoding)), y.push(x.customProgramCacheKey), y.join();
  }
  function m(x, y) {
    x.push(y.precision), x.push(y.outputEncoding), x.push(y.envMapMode), x.push(y.envMapCubeUVHeight), x.push(y.combine), x.push(y.vertexUvs), x.push(y.fogExp2), x.push(y.sizeAttenuation), x.push(y.morphTargetsCount), x.push(y.morphAttributeCount), x.push(y.numDirLights), x.push(y.numPointLights), x.push(y.numSpotLights), x.push(y.numSpotLightMaps), x.push(y.numHemiLights), x.push(y.numRectAreaLights), x.push(y.numDirLightShadows), x.push(y.numPointLightShadows), x.push(y.numSpotLightShadows), x.push(y.numSpotLightShadowsWithMaps), x.push(y.shadowMapType), x.push(y.toneMapping), x.push(y.numClippingPlanes), x.push(y.numClipIntersection), x.push(y.depthPacking);
  }
  function E(x, y) {
    o.disableAll(), y.isWebGL2 && o.enable(0), y.supportsVertexTextures && o.enable(1), y.instancing && o.enable(2), y.instancingColor && o.enable(3), y.map && o.enable(4), y.matcap && o.enable(5), y.envMap && o.enable(6), y.lightMap && o.enable(7), y.aoMap && o.enable(8), y.emissiveMap && o.enable(9), y.bumpMap && o.enable(10), y.normalMap && o.enable(11), y.objectSpaceNormalMap && o.enable(12), y.tangentSpaceNormalMap && o.enable(13), y.clearcoat && o.enable(14), y.clearcoatMap && o.enable(15), y.clearcoatRoughnessMap && o.enable(16), y.clearcoatNormalMap && o.enable(17), y.iridescence && o.enable(18), y.iridescenceMap && o.enable(19), y.iridescenceThicknessMap && o.enable(20), y.displacementMap && o.enable(21), y.specularMap && o.enable(22), y.roughnessMap && o.enable(23), y.metalnessMap && o.enable(24), y.gradientMap && o.enable(25), y.alphaMap && o.enable(26), y.alphaTest && o.enable(27), y.vertexColors && o.enable(28), y.vertexAlphas && o.enable(29), y.vertexUvs && o.enable(30), y.vertexTangents && o.enable(31), y.uvsVertexOnly && o.enable(32), x.push(o.mask), o.disableAll(), y.fog && o.enable(0), y.useFog && o.enable(1), y.flatShading && o.enable(2), y.logarithmicDepthBuffer && o.enable(3), y.skinning && o.enable(4), y.morphTargets && o.enable(5), y.morphNormals && o.enable(6), y.morphColors && o.enable(7), y.premultipliedAlpha && o.enable(8), y.shadowMapEnabled && o.enable(9), y.physicallyCorrectLights && o.enable(10), y.doubleSided && o.enable(11), y.flipSided && o.enable(12), y.useDepthPacking && o.enable(13), y.dithering && o.enable(14), y.specularIntensityMap && o.enable(15), y.specularColorMap && o.enable(16), y.transmission && o.enable(17), y.transmissionMap && o.enable(18), y.thicknessMap && o.enable(19), y.sheen && o.enable(20), y.sheenColorMap && o.enable(21), y.sheenRoughnessMap && o.enable(22), y.decodeVideoTexture && o.enable(23), y.opaque && o.enable(24), x.push(o.mask);
  }
  function b(x) {
    const y = g[x.type];
    let D;
    if (y) {
      const P = Zt[y];
      D = iu.clone(P.uniforms);
    } else
      D = x.uniforms;
    return D;
  }
  function _(x, y) {
    let D;
    for (let P = 0, q = l.length; P < q; P++) {
      const F = l[P];
      if (F.cacheKey === y) {
        D = F, ++D.usedTimes;
        break;
      }
    }
    return D === void 0 && (D = new fp(r, y, x, s), l.push(D)), D;
  }
  function I(x) {
    if (--x.usedTimes === 0) {
      const y = l.indexOf(x);
      l[y] = l[l.length - 1], l.pop(), x.destroy();
    }
  }
  function w(x) {
    c.remove(x);
  }
  function T() {
    c.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: A,
    getUniforms: b,
    acquireProgram: _,
    releaseProgram: I,
    releaseShaderCache: w,
    programs: l,
    dispose: T
  };
}
function _p() {
  let r = /* @__PURE__ */ new WeakMap();
  function e(s) {
    let a = r.get(s);
    return a === void 0 && (a = {}, r.set(s, a)), a;
  }
  function t(s) {
    r.delete(s);
  }
  function n(s, a, o) {
    r.get(s)[a] = o;
  }
  function i() {
    r = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    remove: t,
    update: n,
    dispose: i
  };
}
function xp(r, e) {
  return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.material.id !== e.material.id ? r.material.id - e.material.id : r.z !== e.z ? r.z - e.z : r.id - e.id;
}
function Yo(r, e) {
  return r.groupOrder !== e.groupOrder ? r.groupOrder - e.groupOrder : r.renderOrder !== e.renderOrder ? r.renderOrder - e.renderOrder : r.z !== e.z ? e.z - r.z : r.id - e.id;
}
function Jo() {
  const r = [];
  let e = 0;
  const t = [], n = [], i = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, i.length = 0;
  }
  function a(u, d, f, g, p, A) {
    let m = r[e];
    return m === void 0 ? (m = {
      id: u.id,
      object: u,
      geometry: d,
      material: f,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: p,
      group: A
    }, r[e] = m) : (m.id = u.id, m.object = u, m.geometry = d, m.material = f, m.groupOrder = g, m.renderOrder = u.renderOrder, m.z = p, m.group = A), e++, m;
  }
  function o(u, d, f, g, p, A) {
    const m = a(u, d, f, g, p, A);
    f.transmission > 0 ? n.push(m) : f.transparent === !0 ? i.push(m) : t.push(m);
  }
  function c(u, d, f, g, p, A) {
    const m = a(u, d, f, g, p, A);
    f.transmission > 0 ? n.unshift(m) : f.transparent === !0 ? i.unshift(m) : t.unshift(m);
  }
  function l(u, d) {
    t.length > 1 && t.sort(u || xp), n.length > 1 && n.sort(d || Yo), i.length > 1 && i.sort(d || Yo);
  }
  function h() {
    for (let u = e, d = r.length; u < d; u++) {
      const f = r[u];
      if (f.id === null)
        break;
      f.id = null, f.object = null, f.geometry = null, f.material = null, f.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: i,
    init: s,
    push: o,
    unshift: c,
    finish: h,
    sort: l
  };
}
function Ep() {
  let r = /* @__PURE__ */ new WeakMap();
  function e(n, i) {
    const s = r.get(n);
    let a;
    return s === void 0 ? (a = new Jo(), r.set(n, [a])) : i >= s.length ? (a = new Jo(), s.push(a)) : a = s[i], a;
  }
  function t() {
    r = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Ip() {
  const r = {};
  return {
    get: function(e) {
      if (r[e.id] !== void 0)
        return r[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new B(),
            color: new we()
          };
          break;
        case "SpotLight":
          t = {
            position: new B(),
            direction: new B(),
            color: new we(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new B(),
            color: new we(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new B(),
            skyColor: new we(),
            groundColor: new we()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new we(),
            position: new B(),
            halfWidth: new B(),
            halfHeight: new B()
          };
          break;
      }
      return r[e.id] = t, t;
    }
  };
}
function Cp() {
  const r = {};
  return {
    get: function(e) {
      if (r[e.id] !== void 0)
        return r[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new fe()
          };
          break;
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new fe()
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new fe(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return r[e.id] = t, t;
    }
  };
}
let yp = 0;
function vp(r, e) {
  return (e.castShadow ? 2 : 0) - (r.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (r.map ? 1 : 0);
}
function wp(r, e) {
  const t = new Ip(), n = Cp(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0
  };
  for (let h = 0; h < 9; h++)
    i.probe.push(new B());
  const s = new B(), a = new Re(), o = new Re();
  function c(h, u) {
    let d = 0, f = 0, g = 0;
    for (let P = 0; P < 9; P++)
      i.probe[P].set(0, 0, 0);
    let p = 0, A = 0, m = 0, E = 0, b = 0, _ = 0, I = 0, w = 0, T = 0, x = 0;
    h.sort(vp);
    const y = u !== !0 ? Math.PI : 1;
    for (let P = 0, q = h.length; P < q; P++) {
      const F = h[P], Q = F.color, H = F.intensity, ne = F.distance, ee = F.shadow && F.shadow.map ? F.shadow.map.texture : null;
      if (F.isAmbientLight)
        d += Q.r * H * y, f += Q.g * H * y, g += Q.b * H * y;
      else if (F.isLightProbe)
        for (let V = 0; V < 9; V++)
          i.probe[V].addScaledVector(F.sh.coefficients[V], H);
      else if (F.isDirectionalLight) {
        const V = t.get(F);
        if (V.color.copy(F.color).multiplyScalar(F.intensity * y), F.castShadow) {
          const re = F.shadow, ie = n.get(F);
          ie.shadowBias = re.bias, ie.shadowNormalBias = re.normalBias, ie.shadowRadius = re.radius, ie.shadowMapSize = re.mapSize, i.directionalShadow[p] = ie, i.directionalShadowMap[p] = ee, i.directionalShadowMatrix[p] = F.shadow.matrix, _++;
        }
        i.directional[p] = V, p++;
      } else if (F.isSpotLight) {
        const V = t.get(F);
        V.position.setFromMatrixPosition(F.matrixWorld), V.color.copy(Q).multiplyScalar(H * y), V.distance = ne, V.coneCos = Math.cos(F.angle), V.penumbraCos = Math.cos(F.angle * (1 - F.penumbra)), V.decay = F.decay, i.spot[m] = V;
        const re = F.shadow;
        if (F.map && (i.spotLightMap[T] = F.map, T++, re.updateMatrices(F), F.castShadow && x++), i.spotLightMatrix[m] = re.matrix, F.castShadow) {
          const ie = n.get(F);
          ie.shadowBias = re.bias, ie.shadowNormalBias = re.normalBias, ie.shadowRadius = re.radius, ie.shadowMapSize = re.mapSize, i.spotShadow[m] = ie, i.spotShadowMap[m] = ee, w++;
        }
        m++;
      } else if (F.isRectAreaLight) {
        const V = t.get(F);
        V.color.copy(Q).multiplyScalar(H), V.halfWidth.set(F.width * 0.5, 0, 0), V.halfHeight.set(0, F.height * 0.5, 0), i.rectArea[E] = V, E++;
      } else if (F.isPointLight) {
        const V = t.get(F);
        if (V.color.copy(F.color).multiplyScalar(F.intensity * y), V.distance = F.distance, V.decay = F.decay, F.castShadow) {
          const re = F.shadow, ie = n.get(F);
          ie.shadowBias = re.bias, ie.shadowNormalBias = re.normalBias, ie.shadowRadius = re.radius, ie.shadowMapSize = re.mapSize, ie.shadowCameraNear = re.camera.near, ie.shadowCameraFar = re.camera.far, i.pointShadow[A] = ie, i.pointShadowMap[A] = ee, i.pointShadowMatrix[A] = F.shadow.matrix, I++;
        }
        i.point[A] = V, A++;
      } else if (F.isHemisphereLight) {
        const V = t.get(F);
        V.skyColor.copy(F.color).multiplyScalar(H * y), V.groundColor.copy(F.groundColor).multiplyScalar(H * y), i.hemi[b] = V, b++;
      }
    }
    E > 0 && (e.isWebGL2 || r.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = ue.LTC_FLOAT_1, i.rectAreaLTC2 = ue.LTC_FLOAT_2) : r.has("OES_texture_half_float_linear") === !0 ? (i.rectAreaLTC1 = ue.LTC_HALF_1, i.rectAreaLTC2 = ue.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), i.ambient[0] = d, i.ambient[1] = f, i.ambient[2] = g;
    const D = i.hash;
    (D.directionalLength !== p || D.pointLength !== A || D.spotLength !== m || D.rectAreaLength !== E || D.hemiLength !== b || D.numDirectionalShadows !== _ || D.numPointShadows !== I || D.numSpotShadows !== w || D.numSpotMaps !== T) && (i.directional.length = p, i.spot.length = m, i.rectArea.length = E, i.point.length = A, i.hemi.length = b, i.directionalShadow.length = _, i.directionalShadowMap.length = _, i.pointShadow.length = I, i.pointShadowMap.length = I, i.spotShadow.length = w, i.spotShadowMap.length = w, i.directionalShadowMatrix.length = _, i.pointShadowMatrix.length = I, i.spotLightMatrix.length = w + T - x, i.spotLightMap.length = T, i.numSpotLightShadowsWithMaps = x, D.directionalLength = p, D.pointLength = A, D.spotLength = m, D.rectAreaLength = E, D.hemiLength = b, D.numDirectionalShadows = _, D.numPointShadows = I, D.numSpotShadows = w, D.numSpotMaps = T, i.version = yp++);
  }
  function l(h, u) {
    let d = 0, f = 0, g = 0, p = 0, A = 0;
    const m = u.matrixWorldInverse;
    for (let E = 0, b = h.length; E < b; E++) {
      const _ = h[E];
      if (_.isDirectionalLight) {
        const I = i.directional[d];
        I.direction.setFromMatrixPosition(_.matrixWorld), s.setFromMatrixPosition(_.target.matrixWorld), I.direction.sub(s), I.direction.transformDirection(m), d++;
      } else if (_.isSpotLight) {
        const I = i.spot[g];
        I.position.setFromMatrixPosition(_.matrixWorld), I.position.applyMatrix4(m), I.direction.setFromMatrixPosition(_.matrixWorld), s.setFromMatrixPosition(_.target.matrixWorld), I.direction.sub(s), I.direction.transformDirection(m), g++;
      } else if (_.isRectAreaLight) {
        const I = i.rectArea[p];
        I.position.setFromMatrixPosition(_.matrixWorld), I.position.applyMatrix4(m), o.identity(), a.copy(_.matrixWorld), a.premultiply(m), o.extractRotation(a), I.halfWidth.set(_.width * 0.5, 0, 0), I.halfHeight.set(0, _.height * 0.5, 0), I.halfWidth.applyMatrix4(o), I.halfHeight.applyMatrix4(o), p++;
      } else if (_.isPointLight) {
        const I = i.point[f];
        I.position.setFromMatrixPosition(_.matrixWorld), I.position.applyMatrix4(m), f++;
      } else if (_.isHemisphereLight) {
        const I = i.hemi[A];
        I.direction.setFromMatrixPosition(_.matrixWorld), I.direction.transformDirection(m), A++;
      }
    }
  }
  return {
    setup: c,
    setupView: l,
    state: i
  };
}
function Ko(r, e) {
  const t = new wp(r, e), n = [], i = [];
  function s() {
    n.length = 0, i.length = 0;
  }
  function a(u) {
    n.push(u);
  }
  function o(u) {
    i.push(u);
  }
  function c(u) {
    t.setup(n, u);
  }
  function l(u) {
    t.setupView(n, u);
  }
  return {
    init: s,
    state: {
      lightsArray: n,
      shadowsArray: i,
      lights: t
    },
    setupLights: c,
    setupLightsView: l,
    pushLight: a,
    pushShadow: o
  };
}
function Mp(r, e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(s, a = 0) {
    const o = t.get(s);
    let c;
    return o === void 0 ? (c = new Ko(r, e), t.set(s, [c])) : a >= o.length ? (c = new Ko(r, e), o.push(c)) : c = o[a], c;
  }
  function i() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: i
  };
}
class Sp extends Kt {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Mh, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Bp extends Kt {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.referencePosition = new B(), this.nearDistance = 1, this.farDistance = 1e3, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.referencePosition.copy(e.referencePosition), this.nearDistance = e.nearDistance, this.farDistance = e.farDistance, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const Tp = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Dp = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Rp(r, e, t) {
  let n = new Ba();
  const i = new fe(), s = new fe(), a = new je(), o = new Sp({ depthPacking: Sh }), c = new Bp(), l = {}, h = t.maxTextureSize, u = { 0: Ht, 1: Dn, 2: kt }, d = new Qn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new fe() },
      radius: { value: 4 }
    },
    vertexShader: Tp,
    fragmentShader: Dp
  }), f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new _t();
  g.setAttribute(
    "position",
    new ot(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const p = new Ie(g, d), A = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = kc, this.render = function(_, I, w) {
    if (A.enabled === !1 || A.autoUpdate === !1 && A.needsUpdate === !1 || _.length === 0)
      return;
    const T = r.getRenderTarget(), x = r.getActiveCubeFace(), y = r.getActiveMipmapLevel(), D = r.state;
    D.setBlending(Bn), D.buffers.color.setClear(1, 1, 1, 1), D.buffers.depth.setTest(!0), D.setScissorTest(!1);
    for (let P = 0, q = _.length; P < q; P++) {
      const F = _[P], Q = F.shadow;
      if (Q === void 0) {
        console.warn("THREE.WebGLShadowMap:", F, "has no shadow.");
        continue;
      }
      if (Q.autoUpdate === !1 && Q.needsUpdate === !1)
        continue;
      i.copy(Q.mapSize);
      const H = Q.getFrameExtents();
      if (i.multiply(H), s.copy(Q.mapSize), (i.x > h || i.y > h) && (i.x > h && (s.x = Math.floor(h / H.x), i.x = s.x * H.x, Q.mapSize.x = s.x), i.y > h && (s.y = Math.floor(h / H.y), i.y = s.y * H.y, Q.mapSize.y = s.y)), Q.map === null) {
        const ee = this.type !== es ? { minFilter: bt, magFilter: bt } : {};
        Q.map = new Jn(i.x, i.y, ee), Q.map.texture.name = F.name + ".shadowMap", Q.camera.updateProjectionMatrix();
      }
      r.setRenderTarget(Q.map), r.clear();
      const ne = Q.getViewportCount();
      for (let ee = 0; ee < ne; ee++) {
        const V = Q.getViewport(ee);
        a.set(
          s.x * V.x,
          s.y * V.y,
          s.x * V.z,
          s.y * V.w
        ), D.viewport(a), Q.updateMatrices(F, ee), n = Q.getFrustum(), b(I, w, Q.camera, F, this.type);
      }
      Q.isPointLightShadow !== !0 && this.type === es && m(Q, w), Q.needsUpdate = !1;
    }
    A.needsUpdate = !1, r.setRenderTarget(T, x, y);
  };
  function m(_, I) {
    const w = e.update(p);
    d.defines.VSM_SAMPLES !== _.blurSamples && (d.defines.VSM_SAMPLES = _.blurSamples, f.defines.VSM_SAMPLES = _.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), _.mapPass === null && (_.mapPass = new Jn(i.x, i.y)), d.uniforms.shadow_pass.value = _.map.texture, d.uniforms.resolution.value = _.mapSize, d.uniforms.radius.value = _.radius, r.setRenderTarget(_.mapPass), r.clear(), r.renderBufferDirect(I, null, w, d, p, null), f.uniforms.shadow_pass.value = _.mapPass.texture, f.uniforms.resolution.value = _.mapSize, f.uniforms.radius.value = _.radius, r.setRenderTarget(_.map), r.clear(), r.renderBufferDirect(I, null, w, f, p, null);
  }
  function E(_, I, w, T, x, y) {
    let D = null;
    const P = w.isPointLight === !0 ? _.customDistanceMaterial : _.customDepthMaterial;
    if (P !== void 0)
      D = P;
    else if (D = w.isPointLight === !0 ? c : o, r.localClippingEnabled && I.clipShadows === !0 && Array.isArray(I.clippingPlanes) && I.clippingPlanes.length !== 0 || I.displacementMap && I.displacementScale !== 0 || I.alphaMap && I.alphaTest > 0 || I.map && I.alphaTest > 0) {
      const q = D.uuid, F = I.uuid;
      let Q = l[q];
      Q === void 0 && (Q = {}, l[q] = Q);
      let H = Q[F];
      H === void 0 && (H = D.clone(), Q[F] = H), D = H;
    }
    return D.visible = I.visible, D.wireframe = I.wireframe, y === es ? D.side = I.shadowSide !== null ? I.shadowSide : I.side : D.side = I.shadowSide !== null ? I.shadowSide : u[I.side], D.alphaMap = I.alphaMap, D.alphaTest = I.alphaTest, D.map = I.map, D.clipShadows = I.clipShadows, D.clippingPlanes = I.clippingPlanes, D.clipIntersection = I.clipIntersection, D.displacementMap = I.displacementMap, D.displacementScale = I.displacementScale, D.displacementBias = I.displacementBias, D.wireframeLinewidth = I.wireframeLinewidth, D.linewidth = I.linewidth, w.isPointLight === !0 && D.isMeshDistanceMaterial === !0 && (D.referencePosition.setFromMatrixPosition(w.matrixWorld), D.nearDistance = T, D.farDistance = x), D;
  }
  function b(_, I, w, T, x) {
    if (_.visible === !1)
      return;
    if (_.layers.test(I.layers) && (_.isMesh || _.isLine || _.isPoints) && (_.castShadow || _.receiveShadow && x === es) && (!_.frustumCulled || n.intersectsObject(_))) {
      _.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse, _.matrixWorld);
      const P = e.update(_), q = _.material;
      if (Array.isArray(q)) {
        const F = P.groups;
        for (let Q = 0, H = F.length; Q < H; Q++) {
          const ne = F[Q], ee = q[ne.materialIndex];
          if (ee && ee.visible) {
            const V = E(_, ee, T, w.near, w.far, x);
            r.renderBufferDirect(w, null, P, V, _, ne);
          }
        }
      } else if (q.visible) {
        const F = E(_, q, T, w.near, w.far, x);
        r.renderBufferDirect(w, null, P, F, _, null);
      }
    }
    const D = _.children;
    for (let P = 0, q = D.length; P < q; P++)
      b(D[P], I, w, T, x);
  }
}
function Lp(r, e, t) {
  const n = t.isWebGL2;
  function i() {
    let R = !1;
    const j = new je();
    let se = null;
    const Ae = new je(0, 0, 0, 0);
    return {
      setMask: function(pe) {
        se !== pe && !R && (r.colorMask(pe, pe, pe, pe), se = pe);
      },
      setLocked: function(pe) {
        R = pe;
      },
      setClear: function(pe, ke, et, ft, Vt) {
        Vt === !0 && (pe *= ft, ke *= ft, et *= ft), j.set(pe, ke, et, ft), Ae.equals(j) === !1 && (r.clearColor(pe, ke, et, ft), Ae.copy(j));
      },
      reset: function() {
        R = !1, se = null, Ae.set(-1, 0, 0, 0);
      }
    };
  }
  function s() {
    let R = !1, j = null, se = null, Ae = null;
    return {
      setTest: function(pe) {
        pe ? Me(2929) : me(2929);
      },
      setMask: function(pe) {
        j !== pe && !R && (r.depthMask(pe), j = pe);
      },
      setFunc: function(pe) {
        if (se !== pe) {
          switch (pe) {
            case eh:
              r.depthFunc(512);
              break;
            case th:
              r.depthFunc(519);
              break;
            case nh:
              r.depthFunc(513);
              break;
            case aa:
              r.depthFunc(515);
              break;
            case ih:
              r.depthFunc(514);
              break;
            case sh:
              r.depthFunc(518);
              break;
            case rh:
              r.depthFunc(516);
              break;
            case ah:
              r.depthFunc(517);
              break;
            default:
              r.depthFunc(515);
          }
          se = pe;
        }
      },
      setLocked: function(pe) {
        R = pe;
      },
      setClear: function(pe) {
        Ae !== pe && (r.clearDepth(pe), Ae = pe);
      },
      reset: function() {
        R = !1, j = null, se = null, Ae = null;
      }
    };
  }
  function a() {
    let R = !1, j = null, se = null, Ae = null, pe = null, ke = null, et = null, ft = null, Vt = null;
    return {
      setTest: function(Ye) {
        R || (Ye ? Me(2960) : me(2960));
      },
      setMask: function(Ye) {
        j !== Ye && !R && (r.stencilMask(Ye), j = Ye);
      },
      setFunc: function(Ye, Lt, yt) {
        (se !== Ye || Ae !== Lt || pe !== yt) && (r.stencilFunc(Ye, Lt, yt), se = Ye, Ae = Lt, pe = yt);
      },
      setOp: function(Ye, Lt, yt) {
        (ke !== Ye || et !== Lt || ft !== yt) && (r.stencilOp(Ye, Lt, yt), ke = Ye, et = Lt, ft = yt);
      },
      setLocked: function(Ye) {
        R = Ye;
      },
      setClear: function(Ye) {
        Vt !== Ye && (r.clearStencil(Ye), Vt = Ye);
      },
      reset: function() {
        R = !1, j = null, se = null, Ae = null, pe = null, ke = null, et = null, ft = null, Vt = null;
      }
    };
  }
  const o = new i(), c = new s(), l = new a(), h = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
  let d = {}, f = {}, g = /* @__PURE__ */ new WeakMap(), p = [], A = null, m = !1, E = null, b = null, _ = null, I = null, w = null, T = null, x = null, y = !1, D = null, P = null, q = null, F = null, Q = null;
  const H = r.getParameter(35661);
  let ne = !1, ee = 0;
  const V = r.getParameter(7938);
  V.indexOf("WebGL") !== -1 ? (ee = parseFloat(/^WebGL (\d)/.exec(V)[1]), ne = ee >= 1) : V.indexOf("OpenGL ES") !== -1 && (ee = parseFloat(/^OpenGL ES (\d)/.exec(V)[1]), ne = ee >= 2);
  let re = null, ie = {};
  const $ = r.getParameter(3088), X = r.getParameter(2978), he = new je().fromArray($), ae = new je().fromArray(X);
  function de(R, j, se) {
    const Ae = new Uint8Array(4), pe = r.createTexture();
    r.bindTexture(R, pe), r.texParameteri(R, 10241, 9728), r.texParameteri(R, 10240, 9728);
    for (let ke = 0; ke < se; ke++)
      r.texImage2D(j + ke, 0, 6408, 1, 1, 0, 6408, 5121, Ae);
    return pe;
  }
  const W = {};
  W[3553] = de(3553, 3553, 1), W[34067] = de(34067, 34069, 6), o.setClear(0, 0, 0, 1), c.setClear(1), l.setClear(0), Me(2929), c.setFunc(aa), He(!1), Ze(ja), Me(2884), it(Bn);
  function Me(R) {
    d[R] !== !0 && (r.enable(R), d[R] = !0);
  }
  function me(R) {
    d[R] !== !1 && (r.disable(R), d[R] = !1);
  }
  function Ce(R, j) {
    return f[R] !== j ? (r.bindFramebuffer(R, j), f[R] = j, n && (R === 36009 && (f[36160] = j), R === 36160 && (f[36009] = j)), !0) : !1;
  }
  function ge(R, j) {
    let se = p, Ae = !1;
    if (R)
      if (se = g.get(j), se === void 0 && (se = [], g.set(j, se)), R.isWebGLMultipleRenderTargets) {
        const pe = R.texture;
        if (se.length !== pe.length || se[0] !== 36064) {
          for (let ke = 0, et = pe.length; ke < et; ke++)
            se[ke] = 36064 + ke;
          se.length = pe.length, Ae = !0;
        }
      } else
        se[0] !== 36064 && (se[0] = 36064, Ae = !0);
    else
      se[0] !== 1029 && (se[0] = 1029, Ae = !0);
    Ae && (t.isWebGL2 ? r.drawBuffers(se) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(se));
  }
  function Te(R) {
    return A !== R ? (r.useProgram(R), A = R, !0) : !1;
  }
  const ye = {
    [xi]: 32774,
    [Hl]: 32778,
    [Vl]: 32779
  };
  if (n)
    ye[Ka] = 32775, ye[Xa] = 32776;
  else {
    const R = e.get("EXT_blend_minmax");
    R !== null && (ye[Ka] = R.MIN_EXT, ye[Xa] = R.MAX_EXT);
  }
  const Ee = {
    [Wl]: 0,
    [ql]: 1,
    [jl]: 768,
    [Gc]: 770,
    [$l]: 776,
    [Xl]: 774,
    [Jl]: 772,
    [Yl]: 769,
    [Uc]: 771,
    [Zl]: 775,
    [Kl]: 773
  };
  function it(R, j, se, Ae, pe, ke, et, ft) {
    if (R === Bn) {
      m === !0 && (me(3042), m = !1);
      return;
    }
    if (m === !1 && (Me(3042), m = !0), R !== zl) {
      if (R !== E || ft !== y) {
        if ((b !== xi || w !== xi) && (r.blendEquation(32774), b = xi, w = xi), ft)
          switch (R) {
            case Ci:
              r.blendFuncSeparate(1, 771, 1, 771);
              break;
            case ra:
              r.blendFunc(1, 1);
              break;
            case Ya:
              r.blendFuncSeparate(0, 769, 0, 1);
              break;
            case Ja:
              r.blendFuncSeparate(0, 768, 0, 770);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", R);
              break;
          }
        else
          switch (R) {
            case Ci:
              r.blendFuncSeparate(770, 771, 1, 771);
              break;
            case ra:
              r.blendFunc(770, 1);
              break;
            case Ya:
              r.blendFuncSeparate(0, 769, 0, 1);
              break;
            case Ja:
              r.blendFunc(0, 768);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", R);
              break;
          }
        _ = null, I = null, T = null, x = null, E = R, y = ft;
      }
      return;
    }
    pe = pe || j, ke = ke || se, et = et || Ae, (j !== b || pe !== w) && (r.blendEquationSeparate(ye[j], ye[pe]), b = j, w = pe), (se !== _ || Ae !== I || ke !== T || et !== x) && (r.blendFuncSeparate(Ee[se], Ee[Ae], Ee[ke], Ee[et]), _ = se, I = Ae, T = ke, x = et), E = R, y = !1;
  }
  function st(R, j) {
    R.side === kt ? me(2884) : Me(2884);
    let se = R.side === Ht;
    j && (se = !se), He(se), R.blending === Ci && R.transparent === !1 ? it(Bn) : it(R.blending, R.blendEquation, R.blendSrc, R.blendDst, R.blendEquationAlpha, R.blendSrcAlpha, R.blendDstAlpha, R.premultipliedAlpha), c.setFunc(R.depthFunc), c.setTest(R.depthTest), c.setMask(R.depthWrite), o.setMask(R.colorWrite);
    const Ae = R.stencilWrite;
    l.setTest(Ae), Ae && (l.setMask(R.stencilWriteMask), l.setFunc(R.stencilFunc, R.stencilRef, R.stencilFuncMask), l.setOp(R.stencilFail, R.stencilZFail, R.stencilZPass)), Oe(R.polygonOffset, R.polygonOffsetFactor, R.polygonOffsetUnits), R.alphaToCoverage === !0 ? Me(32926) : me(32926);
  }
  function He(R) {
    D !== R && (R ? r.frontFace(2304) : r.frontFace(2305), D = R);
  }
  function Ze(R) {
    R !== Ul ? (Me(2884), R !== P && (R === ja ? r.cullFace(1029) : R === Ol ? r.cullFace(1028) : r.cullFace(1032))) : me(2884), P = R;
  }
  function $e(R) {
    R !== q && (ne && r.lineWidth(R), q = R);
  }
  function Oe(R, j, se) {
    R ? (Me(32823), (F !== j || Q !== se) && (r.polygonOffset(j, se), F = j, Q = se)) : me(32823);
  }
  function At(R) {
    R ? Me(3089) : me(3089);
  }
  function rt(R) {
    R === void 0 && (R = 33984 + H - 1), re !== R && (r.activeTexture(R), re = R);
  }
  function S(R, j, se) {
    se === void 0 && (re === null ? se = 33984 + H - 1 : se = re);
    let Ae = ie[se];
    Ae === void 0 && (Ae = { type: void 0, texture: void 0 }, ie[se] = Ae), (Ae.type !== R || Ae.texture !== j) && (re !== se && (r.activeTexture(se), re = se), r.bindTexture(R, j || W[R]), Ae.type = R, Ae.texture = j);
  }
  function C() {
    const R = ie[re];
    R !== void 0 && R.type !== void 0 && (r.bindTexture(R.type, null), R.type = void 0, R.texture = void 0);
  }
  function K() {
    try {
      r.compressedTexImage2D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function N() {
    try {
      r.compressedTexImage3D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function z() {
    try {
      r.texSubImage2D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function U() {
    try {
      r.texSubImage3D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function oe() {
    try {
      r.compressedTexSubImage2D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function M() {
    try {
      r.compressedTexSubImage3D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function L() {
    try {
      r.texStorage2D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function J() {
    try {
      r.texStorage3D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function G() {
    try {
      r.texImage2D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function Y() {
    try {
      r.texImage3D.apply(r, arguments);
    } catch (R) {
      console.error("THREE.WebGLState:", R);
    }
  }
  function le(R) {
    he.equals(R) === !1 && (r.scissor(R.x, R.y, R.z, R.w), he.copy(R));
  }
  function ce(R) {
    ae.equals(R) === !1 && (r.viewport(R.x, R.y, R.z, R.w), ae.copy(R));
  }
  function be(R, j) {
    let se = u.get(j);
    se === void 0 && (se = /* @__PURE__ */ new WeakMap(), u.set(j, se));
    let Ae = se.get(R);
    Ae === void 0 && (Ae = r.getUniformBlockIndex(j, R.name), se.set(R, Ae));
  }
  function _e(R, j) {
    const Ae = u.get(j).get(R);
    h.get(j) !== Ae && (r.uniformBlockBinding(j, Ae, R.__bindingPointIndex), h.set(j, Ae));
  }
  function Le() {
    r.disable(3042), r.disable(2884), r.disable(2929), r.disable(32823), r.disable(3089), r.disable(2960), r.disable(32926), r.blendEquation(32774), r.blendFunc(1, 0), r.blendFuncSeparate(1, 0, 1, 0), r.colorMask(!0, !0, !0, !0), r.clearColor(0, 0, 0, 0), r.depthMask(!0), r.depthFunc(513), r.clearDepth(1), r.stencilMask(4294967295), r.stencilFunc(519, 0, 4294967295), r.stencilOp(7680, 7680, 7680), r.clearStencil(0), r.cullFace(1029), r.frontFace(2305), r.polygonOffset(0, 0), r.activeTexture(33984), r.bindFramebuffer(36160, null), n === !0 && (r.bindFramebuffer(36009, null), r.bindFramebuffer(36008, null)), r.useProgram(null), r.lineWidth(1), r.scissor(0, 0, r.canvas.width, r.canvas.height), r.viewport(0, 0, r.canvas.width, r.canvas.height), d = {}, re = null, ie = {}, f = {}, g = /* @__PURE__ */ new WeakMap(), p = [], A = null, m = !1, E = null, b = null, _ = null, I = null, w = null, T = null, x = null, y = !1, D = null, P = null, q = null, F = null, Q = null, he.set(0, 0, r.canvas.width, r.canvas.height), ae.set(0, 0, r.canvas.width, r.canvas.height), o.reset(), c.reset(), l.reset();
  }
  return {
    buffers: {
      color: o,
      depth: c,
      stencil: l
    },
    enable: Me,
    disable: me,
    bindFramebuffer: Ce,
    drawBuffers: ge,
    useProgram: Te,
    setBlending: it,
    setMaterial: st,
    setFlipSided: He,
    setCullFace: Ze,
    setLineWidth: $e,
    setPolygonOffset: Oe,
    setScissorTest: At,
    activeTexture: rt,
    bindTexture: S,
    unbindTexture: C,
    compressedTexImage2D: K,
    compressedTexImage3D: N,
    texImage2D: G,
    texImage3D: Y,
    updateUBOMapping: be,
    uniformBlockBinding: _e,
    texStorage2D: L,
    texStorage3D: J,
    texSubImage2D: z,
    texSubImage3D: U,
    compressedTexSubImage2D: oe,
    compressedTexSubImage3D: M,
    scissor: le,
    viewport: ce,
    reset: Le
  };
}
function Qp(r, e, t, n, i, s, a) {
  const o = i.isWebGL2, c = i.maxTextures, l = i.maxCubemapSize, h = i.maxTextureSize, u = i.maxSamples, d = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, f = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), g = /* @__PURE__ */ new WeakMap();
  let p;
  const A = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function E(S, C) {
    return m ? new OffscreenCanvas(S, C) : As("canvas");
  }
  function b(S, C, K, N) {
    let z = 1;
    if ((S.width > N || S.height > N) && (z = N / Math.max(S.width, S.height)), z < 1 || C === !0)
      if (typeof HTMLImageElement < "u" && S instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && S instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && S instanceof ImageBitmap) {
        const U = C ? er : Math.floor, oe = U(z * S.width), M = U(z * S.height);
        p === void 0 && (p = E(oe, M));
        const L = K ? E(oe, M) : p;
        return L.width = oe, L.height = M, L.getContext("2d").drawImage(S, 0, 0, oe, M), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + S.width + "x" + S.height + ") to (" + oe + "x" + M + ")."), L;
      } else
        return "data" in S && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + S.width + "x" + S.height + ")."), S;
    return S;
  }
  function _(S) {
    return ma(S.width) && ma(S.height);
  }
  function I(S) {
    return o ? !1 : S.wrapS !== Et || S.wrapT !== Et || S.minFilter !== bt && S.minFilter !== nt;
  }
  function w(S, C) {
    return S.generateMipmaps && C && S.minFilter !== bt && S.minFilter !== nt;
  }
  function T(S) {
    r.generateMipmap(S);
  }
  function x(S, C, K, N, z = !1) {
    if (o === !1)
      return C;
    if (S !== null) {
      if (r[S] !== void 0)
        return r[S];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + S + "'");
    }
    let U = C;
    return C === 6403 && (K === 5126 && (U = 33326), K === 5131 && (U = 33325), K === 5121 && (U = 33321)), C === 33319 && (K === 5126 && (U = 33328), K === 5131 && (U = 33327), K === 5121 && (U = 33323)), C === 6408 && (K === 5126 && (U = 34836), K === 5131 && (U = 34842), K === 5121 && (U = N === Fe && z === !1 ? 35907 : 32856), K === 32819 && (U = 32854), K === 32820 && (U = 32855)), (U === 33325 || U === 33326 || U === 33327 || U === 33328 || U === 34842 || U === 34836) && e.get("EXT_color_buffer_float"), U;
  }
  function y(S, C, K) {
    return w(S, K) === !0 || S.isFramebufferTexture && S.minFilter !== bt && S.minFilter !== nt ? Math.log2(Math.max(C.width, C.height)) + 1 : S.mipmaps !== void 0 && S.mipmaps.length > 0 ? S.mipmaps.length : S.isCompressedTexture && Array.isArray(S.image) ? C.mipmaps.length : 1;
  }
  function D(S) {
    return S === bt || S === ca || S === Ys ? 9728 : 9729;
  }
  function P(S) {
    const C = S.target;
    C.removeEventListener("dispose", P), F(C), C.isVideoTexture && g.delete(C);
  }
  function q(S) {
    const C = S.target;
    C.removeEventListener("dispose", q), H(C);
  }
  function F(S) {
    const C = n.get(S);
    if (C.__webglInit === void 0)
      return;
    const K = S.source, N = A.get(K);
    if (N) {
      const z = N[C.__cacheKey];
      z.usedTimes--, z.usedTimes === 0 && Q(S), Object.keys(N).length === 0 && A.delete(K);
    }
    n.remove(S);
  }
  function Q(S) {
    const C = n.get(S);
    r.deleteTexture(C.__webglTexture);
    const K = S.source, N = A.get(K);
    delete N[C.__cacheKey], a.memory.textures--;
  }
  function H(S) {
    const C = S.texture, K = n.get(S), N = n.get(C);
    if (N.__webglTexture !== void 0 && (r.deleteTexture(N.__webglTexture), a.memory.textures--), S.depthTexture && S.depthTexture.dispose(), S.isWebGLCubeRenderTarget)
      for (let z = 0; z < 6; z++)
        r.deleteFramebuffer(K.__webglFramebuffer[z]), K.__webglDepthbuffer && r.deleteRenderbuffer(K.__webglDepthbuffer[z]);
    else {
      if (r.deleteFramebuffer(K.__webglFramebuffer), K.__webglDepthbuffer && r.deleteRenderbuffer(K.__webglDepthbuffer), K.__webglMultisampledFramebuffer && r.deleteFramebuffer(K.__webglMultisampledFramebuffer), K.__webglColorRenderbuffer)
        for (let z = 0; z < K.__webglColorRenderbuffer.length; z++)
          K.__webglColorRenderbuffer[z] && r.deleteRenderbuffer(K.__webglColorRenderbuffer[z]);
      K.__webglDepthRenderbuffer && r.deleteRenderbuffer(K.__webglDepthRenderbuffer);
    }
    if (S.isWebGLMultipleRenderTargets)
      for (let z = 0, U = C.length; z < U; z++) {
        const oe = n.get(C[z]);
        oe.__webglTexture && (r.deleteTexture(oe.__webglTexture), a.memory.textures--), n.remove(C[z]);
      }
    n.remove(C), n.remove(S);
  }
  let ne = 0;
  function ee() {
    ne = 0;
  }
  function V() {
    const S = ne;
    return S >= c && console.warn("THREE.WebGLTextures: Trying to use " + S + " texture units while this GPU supports only " + c), ne += 1, S;
  }
  function re(S) {
    const C = [];
    return C.push(S.wrapS), C.push(S.wrapT), C.push(S.wrapR || 0), C.push(S.magFilter), C.push(S.minFilter), C.push(S.anisotropy), C.push(S.internalFormat), C.push(S.format), C.push(S.type), C.push(S.generateMipmaps), C.push(S.premultiplyAlpha), C.push(S.flipY), C.push(S.unpackAlignment), C.push(S.encoding), C.join();
  }
  function ie(S, C) {
    const K = n.get(S);
    if (S.isVideoTexture && At(S), S.isRenderTargetTexture === !1 && S.version > 0 && K.__version !== S.version) {
      const N = S.image;
      if (N === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (N.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        me(K, S, C);
        return;
      }
    }
    t.bindTexture(3553, K.__webglTexture, 33984 + C);
  }
  function $(S, C) {
    const K = n.get(S);
    if (S.version > 0 && K.__version !== S.version) {
      me(K, S, C);
      return;
    }
    t.bindTexture(35866, K.__webglTexture, 33984 + C);
  }
  function X(S, C) {
    const K = n.get(S);
    if (S.version > 0 && K.__version !== S.version) {
      me(K, S, C);
      return;
    }
    t.bindTexture(32879, K.__webglTexture, 33984 + C);
  }
  function he(S, C) {
    const K = n.get(S);
    if (S.version > 0 && K.__version !== S.version) {
      Ce(K, S, C);
      return;
    }
    t.bindTexture(34067, K.__webglTexture, 33984 + C);
  }
  const ae = {
    [Rn]: 10497,
    [Et]: 33071,
    [$s]: 33648
  }, de = {
    [bt]: 9728,
    [ca]: 9984,
    [Ys]: 9986,
    [nt]: 9729,
    [Vc]: 9985,
    [bn]: 9987
  };
  function W(S, C, K) {
    if (K ? (r.texParameteri(S, 10242, ae[C.wrapS]), r.texParameteri(S, 10243, ae[C.wrapT]), (S === 32879 || S === 35866) && r.texParameteri(S, 32882, ae[C.wrapR]), r.texParameteri(S, 10240, de[C.magFilter]), r.texParameteri(S, 10241, de[C.minFilter])) : (r.texParameteri(S, 10242, 33071), r.texParameteri(S, 10243, 33071), (S === 32879 || S === 35866) && r.texParameteri(S, 32882, 33071), (C.wrapS !== Et || C.wrapT !== Et) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), r.texParameteri(S, 10240, D(C.magFilter)), r.texParameteri(S, 10241, D(C.minFilter)), C.minFilter !== bt && C.minFilter !== nt && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), e.has("EXT_texture_filter_anisotropic") === !0) {
      const N = e.get("EXT_texture_filter_anisotropic");
      if (C.magFilter === bt || C.minFilter !== Ys && C.minFilter !== bn || C.type === Rt && e.has("OES_texture_float_linear") === !1 || o === !1 && C.type === Nt && e.has("OES_texture_half_float_linear") === !1)
        return;
      (C.anisotropy > 1 || n.get(C).__currentAnisotropy) && (r.texParameterf(S, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(C.anisotropy, i.getMaxAnisotropy())), n.get(C).__currentAnisotropy = C.anisotropy);
    }
  }
  function Me(S, C) {
    let K = !1;
    S.__webglInit === void 0 && (S.__webglInit = !0, C.addEventListener("dispose", P));
    const N = C.source;
    let z = A.get(N);
    z === void 0 && (z = {}, A.set(N, z));
    const U = re(C);
    if (U !== S.__cacheKey) {
      z[U] === void 0 && (z[U] = {
        texture: r.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, K = !0), z[U].usedTimes++;
      const oe = z[S.__cacheKey];
      oe !== void 0 && (z[S.__cacheKey].usedTimes--, oe.usedTimes === 0 && Q(C)), S.__cacheKey = U, S.__webglTexture = z[U].texture;
    }
    return K;
  }
  function me(S, C, K) {
    let N = 3553;
    (C.isDataArrayTexture || C.isCompressedArrayTexture) && (N = 35866), C.isData3DTexture && (N = 32879);
    const z = Me(S, C), U = C.source;
    t.bindTexture(N, S.__webglTexture, 33984 + K);
    const oe = n.get(U);
    if (U.version !== oe.__version || z === !0) {
      t.activeTexture(33984 + K), r.pixelStorei(37440, C.flipY), r.pixelStorei(37441, C.premultiplyAlpha), r.pixelStorei(3317, C.unpackAlignment), r.pixelStorei(37443, 0);
      const M = I(C) && _(C.image) === !1;
      let L = b(C.image, M, !1, h);
      L = rt(C, L);
      const J = _(L) || o, G = s.convert(C.format, C.encoding);
      let Y = s.convert(C.type), le = x(C.internalFormat, G, Y, C.encoding, C.isVideoTexture);
      W(N, C, J);
      let ce;
      const be = C.mipmaps, _e = o && C.isVideoTexture !== !0, Le = oe.__version === void 0 || z === !0, R = y(C, L, J);
      if (C.isDepthTexture)
        le = 6402, o ? C.type === Rt ? le = 36012 : C.type === Vn ? le = 33190 : C.type === yi ? le = 35056 : le = 33189 : C.type === Rt && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), C.format === qn && le === 6402 && C.type !== Wc && C.type !== Vn && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), C.type = Vn, Y = s.convert(C.type)), C.format === Si && le === 6402 && (le = 34041, C.type !== yi && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), C.type = yi, Y = s.convert(C.type))), Le && (_e ? t.texStorage2D(3553, 1, le, L.width, L.height) : t.texImage2D(3553, 0, le, L.width, L.height, 0, G, Y, null));
      else if (C.isDataTexture)
        if (be.length > 0 && J) {
          _e && Le && t.texStorage2D(3553, R, le, be[0].width, be[0].height);
          for (let j = 0, se = be.length; j < se; j++)
            ce = be[j], _e ? t.texSubImage2D(3553, j, 0, 0, ce.width, ce.height, G, Y, ce.data) : t.texImage2D(3553, j, le, ce.width, ce.height, 0, G, Y, ce.data);
          C.generateMipmaps = !1;
        } else
          _e ? (Le && t.texStorage2D(3553, R, le, L.width, L.height), t.texSubImage2D(3553, 0, 0, 0, L.width, L.height, G, Y, L.data)) : t.texImage2D(3553, 0, le, L.width, L.height, 0, G, Y, L.data);
      else if (C.isCompressedTexture)
        if (C.isCompressedArrayTexture) {
          _e && Le && t.texStorage3D(35866, R, le, be[0].width, be[0].height, L.depth);
          for (let j = 0, se = be.length; j < se; j++)
            ce = be[j], C.format !== It ? G !== null ? _e ? t.compressedTexSubImage3D(35866, j, 0, 0, 0, ce.width, ce.height, L.depth, G, ce.data, 0, 0) : t.compressedTexImage3D(35866, j, le, ce.width, ce.height, L.depth, 0, ce.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : _e ? t.texSubImage3D(35866, j, 0, 0, 0, ce.width, ce.height, L.depth, G, Y, ce.data) : t.texImage3D(35866, j, le, ce.width, ce.height, L.depth, 0, G, Y, ce.data);
        } else {
          _e && Le && t.texStorage2D(3553, R, le, be[0].width, be[0].height);
          for (let j = 0, se = be.length; j < se; j++)
            ce = be[j], C.format !== It ? G !== null ? _e ? t.compressedTexSubImage2D(3553, j, 0, 0, ce.width, ce.height, G, ce.data) : t.compressedTexImage2D(3553, j, le, ce.width, ce.height, 0, ce.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : _e ? t.texSubImage2D(3553, j, 0, 0, ce.width, ce.height, G, Y, ce.data) : t.texImage2D(3553, j, le, ce.width, ce.height, 0, G, Y, ce.data);
        }
      else if (C.isDataArrayTexture)
        _e ? (Le && t.texStorage3D(35866, R, le, L.width, L.height, L.depth), t.texSubImage3D(35866, 0, 0, 0, 0, L.width, L.height, L.depth, G, Y, L.data)) : t.texImage3D(35866, 0, le, L.width, L.height, L.depth, 0, G, Y, L.data);
      else if (C.isData3DTexture)
        _e ? (Le && t.texStorage3D(32879, R, le, L.width, L.height, L.depth), t.texSubImage3D(32879, 0, 0, 0, 0, L.width, L.height, L.depth, G, Y, L.data)) : t.texImage3D(32879, 0, le, L.width, L.height, L.depth, 0, G, Y, L.data);
      else if (C.isFramebufferTexture) {
        if (Le)
          if (_e)
            t.texStorage2D(3553, R, le, L.width, L.height);
          else {
            let j = L.width, se = L.height;
            for (let Ae = 0; Ae < R; Ae++)
              t.texImage2D(3553, Ae, le, j, se, 0, G, Y, null), j >>= 1, se >>= 1;
          }
      } else if (be.length > 0 && J) {
        _e && Le && t.texStorage2D(3553, R, le, be[0].width, be[0].height);
        for (let j = 0, se = be.length; j < se; j++)
          ce = be[j], _e ? t.texSubImage2D(3553, j, 0, 0, G, Y, ce) : t.texImage2D(3553, j, le, G, Y, ce);
        C.generateMipmaps = !1;
      } else
        _e ? (Le && t.texStorage2D(3553, R, le, L.width, L.height), t.texSubImage2D(3553, 0, 0, 0, G, Y, L)) : t.texImage2D(3553, 0, le, G, Y, L);
      w(C, J) && T(N), oe.__version = U.version, C.onUpdate && C.onUpdate(C);
    }
    S.__version = C.version;
  }
  function Ce(S, C, K) {
    if (C.image.length !== 6)
      return;
    const N = Me(S, C), z = C.source;
    t.bindTexture(34067, S.__webglTexture, 33984 + K);
    const U = n.get(z);
    if (z.version !== U.__version || N === !0) {
      t.activeTexture(33984 + K), r.pixelStorei(37440, C.flipY), r.pixelStorei(37441, C.premultiplyAlpha), r.pixelStorei(3317, C.unpackAlignment), r.pixelStorei(37443, 0);
      const oe = C.isCompressedTexture || C.image[0].isCompressedTexture, M = C.image[0] && C.image[0].isDataTexture, L = [];
      for (let j = 0; j < 6; j++)
        !oe && !M ? L[j] = b(C.image[j], !1, !0, l) : L[j] = M ? C.image[j].image : C.image[j], L[j] = rt(C, L[j]);
      const J = L[0], G = _(J) || o, Y = s.convert(C.format, C.encoding), le = s.convert(C.type), ce = x(C.internalFormat, Y, le, C.encoding), be = o && C.isVideoTexture !== !0, _e = U.__version === void 0 || N === !0;
      let Le = y(C, J, G);
      W(34067, C, G);
      let R;
      if (oe) {
        be && _e && t.texStorage2D(34067, Le, ce, J.width, J.height);
        for (let j = 0; j < 6; j++) {
          R = L[j].mipmaps;
          for (let se = 0; se < R.length; se++) {
            const Ae = R[se];
            C.format !== It ? Y !== null ? be ? t.compressedTexSubImage2D(34069 + j, se, 0, 0, Ae.width, Ae.height, Y, Ae.data) : t.compressedTexImage2D(34069 + j, se, ce, Ae.width, Ae.height, 0, Ae.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : be ? t.texSubImage2D(34069 + j, se, 0, 0, Ae.width, Ae.height, Y, le, Ae.data) : t.texImage2D(34069 + j, se, ce, Ae.width, Ae.height, 0, Y, le, Ae.data);
          }
        }
      } else {
        R = C.mipmaps, be && _e && (R.length > 0 && Le++, t.texStorage2D(34067, Le, ce, L[0].width, L[0].height));
        for (let j = 0; j < 6; j++)
          if (M) {
            be ? t.texSubImage2D(34069 + j, 0, 0, 0, L[j].width, L[j].height, Y, le, L[j].data) : t.texImage2D(34069 + j, 0, ce, L[j].width, L[j].height, 0, Y, le, L[j].data);
            for (let se = 0; se < R.length; se++) {
              const pe = R[se].image[j].image;
              be ? t.texSubImage2D(34069 + j, se + 1, 0, 0, pe.width, pe.height, Y, le, pe.data) : t.texImage2D(34069 + j, se + 1, ce, pe.width, pe.height, 0, Y, le, pe.data);
            }
          } else {
            be ? t.texSubImage2D(34069 + j, 0, 0, 0, Y, le, L[j]) : t.texImage2D(34069 + j, 0, ce, Y, le, L[j]);
            for (let se = 0; se < R.length; se++) {
              const Ae = R[se];
              be ? t.texSubImage2D(34069 + j, se + 1, 0, 0, Y, le, Ae.image[j]) : t.texImage2D(34069 + j, se + 1, ce, Y, le, Ae.image[j]);
            }
          }
      }
      w(C, G) && T(34067), U.__version = z.version, C.onUpdate && C.onUpdate(C);
    }
    S.__version = C.version;
  }
  function ge(S, C, K, N, z) {
    const U = s.convert(K.format, K.encoding), oe = s.convert(K.type), M = x(K.internalFormat, U, oe, K.encoding);
    n.get(C).__hasExternalTextures || (z === 32879 || z === 35866 ? t.texImage3D(z, 0, M, C.width, C.height, C.depth, 0, U, oe, null) : t.texImage2D(z, 0, M, C.width, C.height, 0, U, oe, null)), t.bindFramebuffer(36160, S), Oe(C) ? d.framebufferTexture2DMultisampleEXT(36160, N, z, n.get(K).__webglTexture, 0, $e(C)) : (z === 3553 || z >= 34069 && z <= 34074) && r.framebufferTexture2D(36160, N, z, n.get(K).__webglTexture, 0), t.bindFramebuffer(36160, null);
  }
  function Te(S, C, K) {
    if (r.bindRenderbuffer(36161, S), C.depthBuffer && !C.stencilBuffer) {
      let N = 33189;
      if (K || Oe(C)) {
        const z = C.depthTexture;
        z && z.isDepthTexture && (z.type === Rt ? N = 36012 : z.type === Vn && (N = 33190));
        const U = $e(C);
        Oe(C) ? d.renderbufferStorageMultisampleEXT(36161, U, N, C.width, C.height) : r.renderbufferStorageMultisample(36161, U, N, C.width, C.height);
      } else
        r.renderbufferStorage(36161, N, C.width, C.height);
      r.framebufferRenderbuffer(36160, 36096, 36161, S);
    } else if (C.depthBuffer && C.stencilBuffer) {
      const N = $e(C);
      K && Oe(C) === !1 ? r.renderbufferStorageMultisample(36161, N, 35056, C.width, C.height) : Oe(C) ? d.renderbufferStorageMultisampleEXT(36161, N, 35056, C.width, C.height) : r.renderbufferStorage(36161, 34041, C.width, C.height), r.framebufferRenderbuffer(36160, 33306, 36161, S);
    } else {
      const N = C.isWebGLMultipleRenderTargets === !0 ? C.texture : [C.texture];
      for (let z = 0; z < N.length; z++) {
        const U = N[z], oe = s.convert(U.format, U.encoding), M = s.convert(U.type), L = x(U.internalFormat, oe, M, U.encoding), J = $e(C);
        K && Oe(C) === !1 ? r.renderbufferStorageMultisample(36161, J, L, C.width, C.height) : Oe(C) ? d.renderbufferStorageMultisampleEXT(36161, J, L, C.width, C.height) : r.renderbufferStorage(36161, L, C.width, C.height);
      }
    }
    r.bindRenderbuffer(36161, null);
  }
  function ye(S, C) {
    if (C && C.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(36160, S), !(C.depthTexture && C.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(C.depthTexture).__webglTexture || C.depthTexture.image.width !== C.width || C.depthTexture.image.height !== C.height) && (C.depthTexture.image.width = C.width, C.depthTexture.image.height = C.height, C.depthTexture.needsUpdate = !0), ie(C.depthTexture, 0);
    const N = n.get(C.depthTexture).__webglTexture, z = $e(C);
    if (C.depthTexture.format === qn)
      Oe(C) ? d.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, N, 0, z) : r.framebufferTexture2D(36160, 36096, 3553, N, 0);
    else if (C.depthTexture.format === Si)
      Oe(C) ? d.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, N, 0, z) : r.framebufferTexture2D(36160, 33306, 3553, N, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ee(S) {
    const C = n.get(S), K = S.isWebGLCubeRenderTarget === !0;
    if (S.depthTexture && !C.__autoAllocateDepthBuffer) {
      if (K)
        throw new Error("target.depthTexture not supported in Cube render targets");
      ye(C.__webglFramebuffer, S);
    } else if (K) {
      C.__webglDepthbuffer = [];
      for (let N = 0; N < 6; N++)
        t.bindFramebuffer(36160, C.__webglFramebuffer[N]), C.__webglDepthbuffer[N] = r.createRenderbuffer(), Te(C.__webglDepthbuffer[N], S, !1);
    } else
      t.bindFramebuffer(36160, C.__webglFramebuffer), C.__webglDepthbuffer = r.createRenderbuffer(), Te(C.__webglDepthbuffer, S, !1);
    t.bindFramebuffer(36160, null);
  }
  function it(S, C, K) {
    const N = n.get(S);
    C !== void 0 && ge(N.__webglFramebuffer, S, S.texture, 36064, 3553), K !== void 0 && Ee(S);
  }
  function st(S) {
    const C = S.texture, K = n.get(S), N = n.get(C);
    S.addEventListener("dispose", q), S.isWebGLMultipleRenderTargets !== !0 && (N.__webglTexture === void 0 && (N.__webglTexture = r.createTexture()), N.__version = C.version, a.memory.textures++);
    const z = S.isWebGLCubeRenderTarget === !0, U = S.isWebGLMultipleRenderTargets === !0, oe = _(S) || o;
    if (z) {
      K.__webglFramebuffer = [];
      for (let M = 0; M < 6; M++)
        K.__webglFramebuffer[M] = r.createFramebuffer();
    } else {
      if (K.__webglFramebuffer = r.createFramebuffer(), U)
        if (i.drawBuffers) {
          const M = S.texture;
          for (let L = 0, J = M.length; L < J; L++) {
            const G = n.get(M[L]);
            G.__webglTexture === void 0 && (G.__webglTexture = r.createTexture(), a.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (o && S.samples > 0 && Oe(S) === !1) {
        const M = U ? C : [C];
        K.__webglMultisampledFramebuffer = r.createFramebuffer(), K.__webglColorRenderbuffer = [], t.bindFramebuffer(36160, K.__webglMultisampledFramebuffer);
        for (let L = 0; L < M.length; L++) {
          const J = M[L];
          K.__webglColorRenderbuffer[L] = r.createRenderbuffer(), r.bindRenderbuffer(36161, K.__webglColorRenderbuffer[L]);
          const G = s.convert(J.format, J.encoding), Y = s.convert(J.type), le = x(J.internalFormat, G, Y, J.encoding, S.isXRRenderTarget === !0), ce = $e(S);
          r.renderbufferStorageMultisample(36161, ce, le, S.width, S.height), r.framebufferRenderbuffer(36160, 36064 + L, 36161, K.__webglColorRenderbuffer[L]);
        }
        r.bindRenderbuffer(36161, null), S.depthBuffer && (K.__webglDepthRenderbuffer = r.createRenderbuffer(), Te(K.__webglDepthRenderbuffer, S, !0)), t.bindFramebuffer(36160, null);
      }
    }
    if (z) {
      t.bindTexture(34067, N.__webglTexture), W(34067, C, oe);
      for (let M = 0; M < 6; M++)
        ge(K.__webglFramebuffer[M], S, C, 36064, 34069 + M);
      w(C, oe) && T(34067), t.unbindTexture();
    } else if (U) {
      const M = S.texture;
      for (let L = 0, J = M.length; L < J; L++) {
        const G = M[L], Y = n.get(G);
        t.bindTexture(3553, Y.__webglTexture), W(3553, G, oe), ge(K.__webglFramebuffer, S, G, 36064 + L, 3553), w(G, oe) && T(3553);
      }
      t.unbindTexture();
    } else {
      let M = 3553;
      (S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (o ? M = S.isWebGL3DRenderTarget ? 32879 : 35866 : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), t.bindTexture(M, N.__webglTexture), W(M, C, oe), ge(K.__webglFramebuffer, S, C, 36064, M), w(C, oe) && T(M), t.unbindTexture();
    }
    S.depthBuffer && Ee(S);
  }
  function He(S) {
    const C = _(S) || o, K = S.isWebGLMultipleRenderTargets === !0 ? S.texture : [S.texture];
    for (let N = 0, z = K.length; N < z; N++) {
      const U = K[N];
      if (w(U, C)) {
        const oe = S.isWebGLCubeRenderTarget ? 34067 : 3553, M = n.get(U).__webglTexture;
        t.bindTexture(oe, M), T(oe), t.unbindTexture();
      }
    }
  }
  function Ze(S) {
    if (o && S.samples > 0 && Oe(S) === !1) {
      const C = S.isWebGLMultipleRenderTargets ? S.texture : [S.texture], K = S.width, N = S.height;
      let z = 16384;
      const U = [], oe = S.stencilBuffer ? 33306 : 36096, M = n.get(S), L = S.isWebGLMultipleRenderTargets === !0;
      if (L)
        for (let J = 0; J < C.length; J++)
          t.bindFramebuffer(36160, M.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(36160, 36064 + J, 36161, null), t.bindFramebuffer(36160, M.__webglFramebuffer), r.framebufferTexture2D(36009, 36064 + J, 3553, null, 0);
      t.bindFramebuffer(36008, M.__webglMultisampledFramebuffer), t.bindFramebuffer(36009, M.__webglFramebuffer);
      for (let J = 0; J < C.length; J++) {
        U.push(36064 + J), S.depthBuffer && U.push(oe);
        const G = M.__ignoreDepthValues !== void 0 ? M.__ignoreDepthValues : !1;
        if (G === !1 && (S.depthBuffer && (z |= 256), S.stencilBuffer && (z |= 1024)), L && r.framebufferRenderbuffer(36008, 36064, 36161, M.__webglColorRenderbuffer[J]), G === !0 && (r.invalidateFramebuffer(36008, [oe]), r.invalidateFramebuffer(36009, [oe])), L) {
          const Y = n.get(C[J]).__webglTexture;
          r.framebufferTexture2D(36009, 36064, 3553, Y, 0);
        }
        r.blitFramebuffer(0, 0, K, N, 0, 0, K, N, z, 9728), f && r.invalidateFramebuffer(36008, U);
      }
      if (t.bindFramebuffer(36008, null), t.bindFramebuffer(36009, null), L)
        for (let J = 0; J < C.length; J++) {
          t.bindFramebuffer(36160, M.__webglMultisampledFramebuffer), r.framebufferRenderbuffer(36160, 36064 + J, 36161, M.__webglColorRenderbuffer[J]);
          const G = n.get(C[J]).__webglTexture;
          t.bindFramebuffer(36160, M.__webglFramebuffer), r.framebufferTexture2D(36009, 36064 + J, 3553, G, 0);
        }
      t.bindFramebuffer(36009, M.__webglMultisampledFramebuffer);
    }
  }
  function $e(S) {
    return Math.min(u, S.samples);
  }
  function Oe(S) {
    const C = n.get(S);
    return o && S.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && C.__useRenderToTexture !== !1;
  }
  function At(S) {
    const C = a.render.frame;
    g.get(S) !== C && (g.set(S, C), S.update());
  }
  function rt(S, C) {
    const K = S.encoding, N = S.format, z = S.type;
    return S.isCompressedTexture === !0 || S.isVideoTexture === !0 || S.format === ga || K !== tn && (K === Fe ? o === !1 ? e.has("EXT_sRGB") === !0 && N === It ? (S.format = ga, S.minFilter = nt, S.generateMipmaps = !1) : C = Zc.sRGBToLinear(C) : (N !== It || z !== Tt) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture encoding:", K)), C;
  }
  this.allocateTextureUnit = V, this.resetTextureUnits = ee, this.setTexture2D = ie, this.setTexture2DArray = $, this.setTexture3D = X, this.setTextureCube = he, this.rebindTextures = it, this.setupRenderTarget = st, this.updateRenderTargetMipmap = He, this.updateMultisampleRenderTarget = Ze, this.setupDepthRenderbuffer = Ee, this.setupFrameBufferTexture = ge, this.useMultisampledRTT = Oe;
}
function Pp(r, e, t) {
  const n = t.isWebGL2;
  function i(s, a = null) {
    let o;
    if (s === Tt)
      return 5121;
    if (s === gh)
      return 32819;
    if (s === mh)
      return 32820;
    if (s === Ah)
      return 5120;
    if (s === fh)
      return 5122;
    if (s === Wc)
      return 5123;
    if (s === ph)
      return 5124;
    if (s === Vn)
      return 5125;
    if (s === Rt)
      return 5126;
    if (s === Nt)
      return n ? 5131 : (o = e.get("OES_texture_half_float"), o !== null ? o.HALF_FLOAT_OES : null);
    if (s === bh)
      return 6406;
    if (s === It)
      return 6408;
    if (s === xh)
      return 6409;
    if (s === Eh)
      return 6410;
    if (s === qn)
      return 6402;
    if (s === Si)
      return 34041;
    if (s === _h)
      return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"), 6408;
    if (s === ga)
      return o = e.get("EXT_sRGB"), o !== null ? o.SRGB_ALPHA_EXT : null;
    if (s === ts)
      return 6403;
    if (s === Ih)
      return 36244;
    if (s === ns)
      return 33319;
    if (s === Ch)
      return 33320;
    if (s === yh)
      return 36249;
    if (s === Js || s === dr || s === Ar || s === Ks)
      if (a === Fe)
        if (o = e.get("WEBGL_compressed_texture_s3tc_srgb"), o !== null) {
          if (s === Js)
            return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (s === dr)
            return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (s === Ar)
            return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (s === Ks)
            return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (o = e.get("WEBGL_compressed_texture_s3tc"), o !== null) {
        if (s === Js)
          return o.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (s === dr)
          return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (s === Ar)
          return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (s === Ks)
          return o.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (s === la || s === Za || s === ha || s === $a)
      if (o = e.get("WEBGL_compressed_texture_pvrtc"), o !== null) {
        if (s === la)
          return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (s === Za)
          return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (s === ha)
          return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (s === $a)
          return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (s === qc)
      return o = e.get("WEBGL_compressed_texture_etc1"), o !== null ? o.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (s === ua || s === da)
      if (o = e.get("WEBGL_compressed_texture_etc"), o !== null) {
        if (s === ua)
          return a === Fe ? o.COMPRESSED_SRGB8_ETC2 : o.COMPRESSED_RGB8_ETC2;
        if (s === da)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : o.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (s === Aa || s === eo || s === to || s === no || s === io || s === so || s === ro || s === ao || s === oo || s === co || s === lo || s === ho || s === uo || s === Ao)
      if (o = e.get("WEBGL_compressed_texture_astc"), o !== null) {
        if (s === Aa)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : o.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (s === eo)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : o.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (s === to)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : o.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (s === no)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : o.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (s === io)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : o.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (s === so)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : o.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (s === ro)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : o.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (s === ao)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : o.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (s === oo)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : o.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (s === co)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : o.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (s === lo)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : o.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (s === ho)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : o.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (s === uo)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : o.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (s === Ao)
          return a === Fe ? o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : o.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (s === fa)
      if (o = e.get("EXT_texture_compression_bptc"), o !== null) {
        if (s === fa)
          return a === Fe ? o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : o.COMPRESSED_RGBA_BPTC_UNORM_EXT;
      } else
        return null;
    return s === yi ? n ? 34042 : (o = e.get("WEBGL_depth_texture"), o !== null ? o.UNSIGNED_INT_24_8_WEBGL : null) : r[s] !== void 0 ? r[s] : null;
  }
  return { convert: i };
}
class Fp extends Dt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class gn extends Ke {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const kp = { type: "move" };
class Gr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new gn(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new gn(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new B(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new B()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new gn(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new B(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new B()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let i = null, s = null, a = null;
    const o = this._targetRay, c = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        a = !0;
        for (const p of e.hand.values()) {
          const A = t.getJointPose(p, n), m = this._getHandJoint(l, p);
          A !== null && (m.matrix.fromArray(A.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.jointRadius = A.radius), m.visible = A !== null;
        }
        const h = l.joints["index-finger-tip"], u = l.joints["thumb-tip"], d = h.position.distanceTo(u.position), f = 0.02, g = 5e-3;
        l.inputState.pinching && d > f + g ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && d <= f - g && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        c !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (c.matrix.fromArray(s.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), s.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(s.linearVelocity)) : c.hasLinearVelocity = !1, s.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(s.angularVelocity)) : c.hasAngularVelocity = !1));
      o !== null && (i = t.getPose(e.targetRaySpace, n), i === null && s !== null && (i = s), i !== null && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), i.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(i.linearVelocity)) : o.hasLinearVelocity = !1, i.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(i.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(kp)));
    }
    return o !== null && (o.visible = i !== null), c !== null && (c.visible = s !== null), l !== null && (l.visible = a !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new gn();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
class Np extends ht {
  constructor(e, t, n, i, s, a, o, c, l, h) {
    if (h = h !== void 0 ? h : qn, h !== qn && h !== Si)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === qn && (n = Vn), n === void 0 && h === Si && (n = yi), super(null, i, s, a, o, c, h, n, l), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = o !== void 0 ? o : bt, this.minFilter = c !== void 0 ? c : bt, this.flipY = !1, this.generateMipmaps = !1;
  }
}
class Gp extends _n {
  constructor(e, t) {
    super();
    const n = this;
    let i = null, s = 1, a = null, o = "local-floor", c = null, l = null, h = null, u = null, d = null, f = null;
    const g = t.getContextAttributes();
    let p = null, A = null;
    const m = [], E = [], b = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Map(), I = new Dt();
    I.layers.enable(1), I.viewport = new je();
    const w = new Dt();
    w.layers.enable(2), w.viewport = new je();
    const T = [I, w], x = new Fp();
    x.layers.enable(1), x.layers.enable(2);
    let y = null, D = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function($) {
      let X = m[$];
      return X === void 0 && (X = new Gr(), m[$] = X), X.getTargetRaySpace();
    }, this.getControllerGrip = function($) {
      let X = m[$];
      return X === void 0 && (X = new Gr(), m[$] = X), X.getGripSpace();
    }, this.getHand = function($) {
      let X = m[$];
      return X === void 0 && (X = new Gr(), m[$] = X), X.getHandSpace();
    };
    function P($) {
      const X = E.indexOf($.inputSource);
      if (X === -1)
        return;
      const he = m[X];
      he !== void 0 && he.dispatchEvent({ type: $.type, data: $.inputSource });
    }
    function q() {
      i.removeEventListener("select", P), i.removeEventListener("selectstart", P), i.removeEventListener("selectend", P), i.removeEventListener("squeeze", P), i.removeEventListener("squeezestart", P), i.removeEventListener("squeezeend", P), i.removeEventListener("end", q), i.removeEventListener("inputsourceschange", F);
      for (let $ = 0; $ < m.length; $++) {
        const X = E[$];
        X !== null && (E[$] = null, m[$].disconnect(X));
      }
      y = null, D = null, e.setRenderTarget(p), d = null, u = null, h = null, i = null, A = null, ie.stop(), n.isPresenting = !1, n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function($) {
      s = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function($) {
      o = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function($) {
      c = $;
    }, this.getBaseLayer = function() {
      return u !== null ? u : d;
    }, this.getBinding = function() {
      return h;
    }, this.getFrame = function() {
      return f;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function($) {
      if (i = $, i !== null) {
        if (p = e.getRenderTarget(), i.addEventListener("select", P), i.addEventListener("selectstart", P), i.addEventListener("selectend", P), i.addEventListener("squeeze", P), i.addEventListener("squeezestart", P), i.addEventListener("squeezeend", P), i.addEventListener("end", q), i.addEventListener("inputsourceschange", F), g.xrCompatible !== !0 && await t.makeXRCompatible(), i.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
          const X = {
            antialias: i.renderState.layers === void 0 ? g.antialias : !0,
            alpha: g.alpha,
            depth: g.depth,
            stencil: g.stencil,
            framebufferScaleFactor: s
          };
          d = new XRWebGLLayer(i, t, X), i.updateRenderState({ baseLayer: d }), A = new Jn(
            d.framebufferWidth,
            d.framebufferHeight,
            {
              format: It,
              type: Tt,
              encoding: e.outputEncoding,
              stencilBuffer: g.stencil
            }
          );
        } else {
          let X = null, he = null, ae = null;
          g.depth && (ae = g.stencil ? 35056 : 33190, X = g.stencil ? Si : qn, he = g.stencil ? yi : Vn);
          const de = {
            colorFormat: 32856,
            depthFormat: ae,
            scaleFactor: s
          };
          h = new XRWebGLBinding(i, t), u = h.createProjectionLayer(de), i.updateRenderState({ layers: [u] }), A = new Jn(
            u.textureWidth,
            u.textureHeight,
            {
              format: It,
              type: Tt,
              depthTexture: new Np(u.textureWidth, u.textureHeight, he, void 0, void 0, void 0, void 0, void 0, void 0, X),
              stencilBuffer: g.stencil,
              encoding: e.outputEncoding,
              samples: g.antialias ? 4 : 0
            }
          );
          const W = e.properties.get(A);
          W.__ignoreDepthValues = u.ignoreDepthValues;
        }
        A.isXRRenderTarget = !0, this.setFoveation(1), c = null, a = await i.requestReferenceSpace(o), ie.setContext(i), ie.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    };
    function F($) {
      for (let X = 0; X < $.removed.length; X++) {
        const he = $.removed[X], ae = E.indexOf(he);
        ae >= 0 && (E[ae] = null, m[ae].disconnect(he));
      }
      for (let X = 0; X < $.added.length; X++) {
        const he = $.added[X];
        let ae = E.indexOf(he);
        if (ae === -1) {
          for (let W = 0; W < m.length; W++)
            if (W >= E.length) {
              E.push(he), ae = W;
              break;
            } else if (E[W] === null) {
              E[W] = he, ae = W;
              break;
            }
          if (ae === -1)
            break;
        }
        const de = m[ae];
        de && de.connect(he);
      }
    }
    const Q = new B(), H = new B();
    function ne($, X, he) {
      Q.setFromMatrixPosition(X.matrixWorld), H.setFromMatrixPosition(he.matrixWorld);
      const ae = Q.distanceTo(H), de = X.projectionMatrix.elements, W = he.projectionMatrix.elements, Me = de[14] / (de[10] - 1), me = de[14] / (de[10] + 1), Ce = (de[9] + 1) / de[5], ge = (de[9] - 1) / de[5], Te = (de[8] - 1) / de[0], ye = (W[8] + 1) / W[0], Ee = Me * Te, it = Me * ye, st = ae / (-Te + ye), He = st * -Te;
      X.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(He), $.translateZ(st), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert();
      const Ze = Me + st, $e = me + st, Oe = Ee - He, At = it + (ae - He), rt = Ce * me / $e * Ze, S = ge * me / $e * Ze;
      $.projectionMatrix.makePerspective(Oe, At, rt, S, Ze, $e);
    }
    function ee($, X) {
      X === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(X.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert();
    }
    this.updateCamera = function($) {
      if (i === null)
        return;
      x.near = w.near = I.near = $.near, x.far = w.far = I.far = $.far, (y !== x.near || D !== x.far) && (i.updateRenderState({
        depthNear: x.near,
        depthFar: x.far
      }), y = x.near, D = x.far);
      const X = $.parent, he = x.cameras;
      ee(x, X);
      for (let de = 0; de < he.length; de++)
        ee(he[de], X);
      x.matrixWorld.decompose(x.position, x.quaternion, x.scale), $.matrix.copy(x.matrix), $.matrix.decompose($.position, $.quaternion, $.scale);
      const ae = $.children;
      for (let de = 0, W = ae.length; de < W; de++)
        ae[de].updateMatrixWorld(!0);
      he.length === 2 ? ne(x, I, w) : x.projectionMatrix.copy(I.projectionMatrix);
    }, this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (u !== null)
        return u.fixedFoveation;
      if (d !== null)
        return d.fixedFoveation;
    }, this.setFoveation = function($) {
      u !== null && (u.fixedFoveation = $), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = $);
    }, this.getPlanes = function() {
      return b;
    };
    let V = null;
    function re($, X) {
      if (l = X.getViewerPose(c || a), f = X, l !== null) {
        const he = l.views;
        d !== null && (e.setRenderTargetFramebuffer(A, d.framebuffer), e.setRenderTarget(A));
        let ae = !1;
        he.length !== x.cameras.length && (x.cameras.length = 0, ae = !0);
        for (let de = 0; de < he.length; de++) {
          const W = he[de];
          let Me = null;
          if (d !== null)
            Me = d.getViewport(W);
          else {
            const Ce = h.getViewSubImage(u, W);
            Me = Ce.viewport, de === 0 && (e.setRenderTargetTextures(
              A,
              Ce.colorTexture,
              u.ignoreDepthValues ? void 0 : Ce.depthStencilTexture
            ), e.setRenderTarget(A));
          }
          let me = T[de];
          me === void 0 && (me = new Dt(), me.layers.enable(de), me.viewport = new je(), T[de] = me), me.matrix.fromArray(W.transform.matrix), me.projectionMatrix.fromArray(W.projectionMatrix), me.viewport.set(Me.x, Me.y, Me.width, Me.height), de === 0 && x.matrix.copy(me.matrix), ae === !0 && x.cameras.push(me);
        }
      }
      for (let he = 0; he < m.length; he++) {
        const ae = E[he], de = m[he];
        ae !== null && de !== void 0 && de.update(ae, X, c || a);
      }
      if (V && V($, X), X.detectedPlanes) {
        n.dispatchEvent({ type: "planesdetected", data: X.detectedPlanes });
        let he = null;
        for (const ae of b)
          X.detectedPlanes.has(ae) || (he === null && (he = []), he.push(ae));
        if (he !== null)
          for (const ae of he)
            b.delete(ae), _.delete(ae), n.dispatchEvent({ type: "planeremoved", data: ae });
        for (const ae of X.detectedPlanes)
          if (!b.has(ae))
            b.add(ae), _.set(ae, X.lastChangedTime), n.dispatchEvent({ type: "planeadded", data: ae });
          else {
            const de = _.get(ae);
            ae.lastChangedTime > de && (_.set(ae, ae.lastChangedTime), n.dispatchEvent({ type: "planechanged", data: ae }));
          }
      }
      f = null;
    }
    const ie = new al();
    ie.setAnimationLoop(re), this.setAnimationLoop = function($) {
      V = $;
    }, this.dispose = function() {
    };
  }
}
function Up(r, e) {
  function t(p, A) {
    A.color.getRGB(p.fogColor.value, sl(r)), A.isFog ? (p.fogNear.value = A.near, p.fogFar.value = A.far) : A.isFogExp2 && (p.fogDensity.value = A.density);
  }
  function n(p, A, m, E, b) {
    A.isMeshBasicMaterial || A.isMeshLambertMaterial ? i(p, A) : A.isMeshToonMaterial ? (i(p, A), h(p, A)) : A.isMeshPhongMaterial ? (i(p, A), l(p, A)) : A.isMeshStandardMaterial ? (i(p, A), u(p, A), A.isMeshPhysicalMaterial && d(p, A, b)) : A.isMeshMatcapMaterial ? (i(p, A), f(p, A)) : A.isMeshDepthMaterial ? i(p, A) : A.isMeshDistanceMaterial ? (i(p, A), g(p, A)) : A.isMeshNormalMaterial ? i(p, A) : A.isLineBasicMaterial ? (s(p, A), A.isLineDashedMaterial && a(p, A)) : A.isPointsMaterial ? o(p, A, m, E) : A.isSpriteMaterial ? c(p, A) : A.isShadowMaterial ? (p.color.value.copy(A.color), p.opacity.value = A.opacity) : A.isShaderMaterial && (A.uniformsNeedUpdate = !1);
  }
  function i(p, A) {
    p.opacity.value = A.opacity, A.color && p.diffuse.value.copy(A.color), A.emissive && p.emissive.value.copy(A.emissive).multiplyScalar(A.emissiveIntensity), A.map && (p.map.value = A.map), A.alphaMap && (p.alphaMap.value = A.alphaMap), A.bumpMap && (p.bumpMap.value = A.bumpMap, p.bumpScale.value = A.bumpScale, A.side === Ht && (p.bumpScale.value *= -1)), A.displacementMap && (p.displacementMap.value = A.displacementMap, p.displacementScale.value = A.displacementScale, p.displacementBias.value = A.displacementBias), A.emissiveMap && (p.emissiveMap.value = A.emissiveMap), A.normalMap && (p.normalMap.value = A.normalMap, p.normalScale.value.copy(A.normalScale), A.side === Ht && p.normalScale.value.negate()), A.specularMap && (p.specularMap.value = A.specularMap), A.alphaTest > 0 && (p.alphaTest.value = A.alphaTest);
    const m = e.get(A).envMap;
    if (m && (p.envMap.value = m, p.flipEnvMap.value = m.isCubeTexture && m.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = A.reflectivity, p.ior.value = A.ior, p.refractionRatio.value = A.refractionRatio), A.lightMap) {
      p.lightMap.value = A.lightMap;
      const _ = r.physicallyCorrectLights !== !0 ? Math.PI : 1;
      p.lightMapIntensity.value = A.lightMapIntensity * _;
    }
    A.aoMap && (p.aoMap.value = A.aoMap, p.aoMapIntensity.value = A.aoMapIntensity);
    let E;
    A.map ? E = A.map : A.specularMap ? E = A.specularMap : A.displacementMap ? E = A.displacementMap : A.normalMap ? E = A.normalMap : A.bumpMap ? E = A.bumpMap : A.roughnessMap ? E = A.roughnessMap : A.metalnessMap ? E = A.metalnessMap : A.alphaMap ? E = A.alphaMap : A.emissiveMap ? E = A.emissiveMap : A.clearcoatMap ? E = A.clearcoatMap : A.clearcoatNormalMap ? E = A.clearcoatNormalMap : A.clearcoatRoughnessMap ? E = A.clearcoatRoughnessMap : A.iridescenceMap ? E = A.iridescenceMap : A.iridescenceThicknessMap ? E = A.iridescenceThicknessMap : A.specularIntensityMap ? E = A.specularIntensityMap : A.specularColorMap ? E = A.specularColorMap : A.transmissionMap ? E = A.transmissionMap : A.thicknessMap ? E = A.thicknessMap : A.sheenColorMap ? E = A.sheenColorMap : A.sheenRoughnessMap && (E = A.sheenRoughnessMap), E !== void 0 && (E.isWebGLRenderTarget && (E = E.texture), E.matrixAutoUpdate === !0 && E.updateMatrix(), p.uvTransform.value.copy(E.matrix));
    let b;
    A.aoMap ? b = A.aoMap : A.lightMap && (b = A.lightMap), b !== void 0 && (b.isWebGLRenderTarget && (b = b.texture), b.matrixAutoUpdate === !0 && b.updateMatrix(), p.uv2Transform.value.copy(b.matrix));
  }
  function s(p, A) {
    p.diffuse.value.copy(A.color), p.opacity.value = A.opacity;
  }
  function a(p, A) {
    p.dashSize.value = A.dashSize, p.totalSize.value = A.dashSize + A.gapSize, p.scale.value = A.scale;
  }
  function o(p, A, m, E) {
    p.diffuse.value.copy(A.color), p.opacity.value = A.opacity, p.size.value = A.size * m, p.scale.value = E * 0.5, A.map && (p.map.value = A.map), A.alphaMap && (p.alphaMap.value = A.alphaMap), A.alphaTest > 0 && (p.alphaTest.value = A.alphaTest);
    let b;
    A.map ? b = A.map : A.alphaMap && (b = A.alphaMap), b !== void 0 && (b.matrixAutoUpdate === !0 && b.updateMatrix(), p.uvTransform.value.copy(b.matrix));
  }
  function c(p, A) {
    p.diffuse.value.copy(A.color), p.opacity.value = A.opacity, p.rotation.value = A.rotation, A.map && (p.map.value = A.map), A.alphaMap && (p.alphaMap.value = A.alphaMap), A.alphaTest > 0 && (p.alphaTest.value = A.alphaTest);
    let m;
    A.map ? m = A.map : A.alphaMap && (m = A.alphaMap), m !== void 0 && (m.matrixAutoUpdate === !0 && m.updateMatrix(), p.uvTransform.value.copy(m.matrix));
  }
  function l(p, A) {
    p.specular.value.copy(A.specular), p.shininess.value = Math.max(A.shininess, 1e-4);
  }
  function h(p, A) {
    A.gradientMap && (p.gradientMap.value = A.gradientMap);
  }
  function u(p, A) {
    p.roughness.value = A.roughness, p.metalness.value = A.metalness, A.roughnessMap && (p.roughnessMap.value = A.roughnessMap), A.metalnessMap && (p.metalnessMap.value = A.metalnessMap), e.get(A).envMap && (p.envMapIntensity.value = A.envMapIntensity);
  }
  function d(p, A, m) {
    p.ior.value = A.ior, A.sheen > 0 && (p.sheenColor.value.copy(A.sheenColor).multiplyScalar(A.sheen), p.sheenRoughness.value = A.sheenRoughness, A.sheenColorMap && (p.sheenColorMap.value = A.sheenColorMap), A.sheenRoughnessMap && (p.sheenRoughnessMap.value = A.sheenRoughnessMap)), A.clearcoat > 0 && (p.clearcoat.value = A.clearcoat, p.clearcoatRoughness.value = A.clearcoatRoughness, A.clearcoatMap && (p.clearcoatMap.value = A.clearcoatMap), A.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = A.clearcoatRoughnessMap), A.clearcoatNormalMap && (p.clearcoatNormalScale.value.copy(A.clearcoatNormalScale), p.clearcoatNormalMap.value = A.clearcoatNormalMap, A.side === Ht && p.clearcoatNormalScale.value.negate())), A.iridescence > 0 && (p.iridescence.value = A.iridescence, p.iridescenceIOR.value = A.iridescenceIOR, p.iridescenceThicknessMinimum.value = A.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = A.iridescenceThicknessRange[1], A.iridescenceMap && (p.iridescenceMap.value = A.iridescenceMap), A.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = A.iridescenceThicknessMap)), A.transmission > 0 && (p.transmission.value = A.transmission, p.transmissionSamplerMap.value = m.texture, p.transmissionSamplerSize.value.set(m.width, m.height), A.transmissionMap && (p.transmissionMap.value = A.transmissionMap), p.thickness.value = A.thickness, A.thicknessMap && (p.thicknessMap.value = A.thicknessMap), p.attenuationDistance.value = A.attenuationDistance, p.attenuationColor.value.copy(A.attenuationColor)), p.specularIntensity.value = A.specularIntensity, p.specularColor.value.copy(A.specularColor), A.specularIntensityMap && (p.specularIntensityMap.value = A.specularIntensityMap), A.specularColorMap && (p.specularColorMap.value = A.specularColorMap);
  }
  function f(p, A) {
    A.matcap && (p.matcap.value = A.matcap);
  }
  function g(p, A) {
    p.referencePosition.value.copy(A.referencePosition), p.nearDistance.value = A.nearDistance, p.farDistance.value = A.farDistance;
  }
  return {
    refreshFogUniforms: t,
    refreshMaterialUniforms: n
  };
}
function Op(r, e, t, n) {
  let i = {}, s = {}, a = [];
  const o = t.isWebGL2 ? r.getParameter(35375) : 0;
  function c(E, b) {
    const _ = b.program;
    n.uniformBlockBinding(E, _);
  }
  function l(E, b) {
    let _ = i[E.id];
    _ === void 0 && (g(E), _ = h(E), i[E.id] = _, E.addEventListener("dispose", A));
    const I = b.program;
    n.updateUBOMapping(E, I);
    const w = e.render.frame;
    s[E.id] !== w && (d(E), s[E.id] = w);
  }
  function h(E) {
    const b = u();
    E.__bindingPointIndex = b;
    const _ = r.createBuffer(), I = E.__size, w = E.usage;
    return r.bindBuffer(35345, _), r.bufferData(35345, I, w), r.bindBuffer(35345, null), r.bindBufferBase(35345, b, _), _;
  }
  function u() {
    for (let E = 0; E < o; E++)
      if (a.indexOf(E) === -1)
        return a.push(E), E;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(E) {
    const b = i[E.id], _ = E.uniforms, I = E.__cache;
    r.bindBuffer(35345, b);
    for (let w = 0, T = _.length; w < T; w++) {
      const x = _[w];
      if (f(x, w, I) === !0) {
        const y = x.__offset, D = Array.isArray(x.value) ? x.value : [x.value];
        let P = 0;
        for (let q = 0; q < D.length; q++) {
          const F = D[q], Q = p(F);
          typeof F == "number" ? (x.__data[0] = F, r.bufferSubData(35345, y + P, x.__data)) : F.isMatrix3 ? (x.__data[0] = F.elements[0], x.__data[1] = F.elements[1], x.__data[2] = F.elements[2], x.__data[3] = F.elements[0], x.__data[4] = F.elements[3], x.__data[5] = F.elements[4], x.__data[6] = F.elements[5], x.__data[7] = F.elements[0], x.__data[8] = F.elements[6], x.__data[9] = F.elements[7], x.__data[10] = F.elements[8], x.__data[11] = F.elements[0]) : (F.toArray(x.__data, P), P += Q.storage / Float32Array.BYTES_PER_ELEMENT);
        }
        r.bufferSubData(35345, y, x.__data);
      }
    }
    r.bindBuffer(35345, null);
  }
  function f(E, b, _) {
    const I = E.value;
    if (_[b] === void 0) {
      if (typeof I == "number")
        _[b] = I;
      else {
        const w = Array.isArray(I) ? I : [I], T = [];
        for (let x = 0; x < w.length; x++)
          T.push(w[x].clone());
        _[b] = T;
      }
      return !0;
    } else if (typeof I == "number") {
      if (_[b] !== I)
        return _[b] = I, !0;
    } else {
      const w = Array.isArray(_[b]) ? _[b] : [_[b]], T = Array.isArray(I) ? I : [I];
      for (let x = 0; x < w.length; x++) {
        const y = w[x];
        if (y.equals(T[x]) === !1)
          return y.copy(T[x]), !0;
      }
    }
    return !1;
  }
  function g(E) {
    const b = E.uniforms;
    let _ = 0;
    const I = 16;
    let w = 0;
    for (let T = 0, x = b.length; T < x; T++) {
      const y = b[T], D = {
        boundary: 0,
        storage: 0
      }, P = Array.isArray(y.value) ? y.value : [y.value];
      for (let q = 0, F = P.length; q < F; q++) {
        const Q = P[q], H = p(Q);
        D.boundary += H.boundary, D.storage += H.storage;
      }
      if (y.__data = new Float32Array(D.storage / Float32Array.BYTES_PER_ELEMENT), y.__offset = _, T > 0) {
        w = _ % I;
        const q = I - w;
        w !== 0 && q - D.boundary < 0 && (_ += I - w, y.__offset = _);
      }
      _ += D.storage;
    }
    return w = _ % I, w > 0 && (_ += I - w), E.__size = _, E.__cache = {}, this;
  }
  function p(E) {
    const b = {
      boundary: 0,
      storage: 0
    };
    return typeof E == "number" ? (b.boundary = 4, b.storage = 4) : E.isVector2 ? (b.boundary = 8, b.storage = 8) : E.isVector3 || E.isColor ? (b.boundary = 16, b.storage = 12) : E.isVector4 ? (b.boundary = 16, b.storage = 16) : E.isMatrix3 ? (b.boundary = 48, b.storage = 48) : E.isMatrix4 ? (b.boundary = 64, b.storage = 64) : E.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", E), b;
  }
  function A(E) {
    const b = E.target;
    b.removeEventListener("dispose", A);
    const _ = a.indexOf(b.__bindingPointIndex);
    a.splice(_, 1), r.deleteBuffer(i[b.id]), delete i[b.id], delete s[b.id];
  }
  function m() {
    for (const E in i)
      r.deleteBuffer(i[E]);
    a = [], i = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: m
  };
}
function zp() {
  const r = As("canvas");
  return r.style.display = "block", r;
}
function ul(r = {}) {
  this.isWebGLRenderer = !0;
  const e = r.canvas !== void 0 ? r.canvas : zp(), t = r.context !== void 0 ? r.context : null, n = r.depth !== void 0 ? r.depth : !0, i = r.stencil !== void 0 ? r.stencil : !0, s = r.antialias !== void 0 ? r.antialias : !1, a = r.premultipliedAlpha !== void 0 ? r.premultipliedAlpha : !0, o = r.preserveDrawingBuffer !== void 0 ? r.preserveDrawingBuffer : !1, c = r.powerPreference !== void 0 ? r.powerPreference : "default", l = r.failIfMajorPerformanceCaveat !== void 0 ? r.failIfMajorPerformanceCaveat : !1;
  let h;
  t !== null ? h = t.getContextAttributes().alpha : h = r.alpha !== void 0 ? r.alpha : !1;
  let u = null, d = null;
  const f = [], g = [];
  this.domElement = e, this.debug = {
    checkShaderErrors: !0
  }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.outputEncoding = tn, this.physicallyCorrectLights = !1, this.toneMapping = mn, this.toneMappingExposure = 1;
  const p = this;
  let A = !1, m = 0, E = 0, b = null, _ = -1, I = null;
  const w = new je(), T = new je();
  let x = null, y = e.width, D = e.height, P = 1, q = null, F = null;
  const Q = new je(0, 0, y, D), H = new je(0, 0, y, D);
  let ne = !1;
  const ee = new Ba();
  let V = !1, re = !1, ie = null;
  const $ = new Re(), X = new fe(), he = new B(), ae = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
  function de() {
    return b === null ? P : 1;
  }
  let W = t;
  function Me(v, O) {
    for (let Z = 0; Z < v.length; Z++) {
      const k = v[Z], te = e.getContext(k, O);
      if (te !== null)
        return te;
    }
    return null;
  }
  try {
    const v = {
      alpha: !0,
      depth: n,
      stencil: i,
      antialias: s,
      premultipliedAlpha: a,
      preserveDrawingBuffer: o,
      powerPreference: c,
      failIfMajorPerformanceCaveat: l
    };
    if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${va}`), e.addEventListener("webglcontextlost", le, !1), e.addEventListener("webglcontextrestored", ce, !1), e.addEventListener("webglcontextcreationerror", be, !1), W === null) {
      const O = ["webgl2", "webgl", "experimental-webgl"];
      if (p.isWebGL1Renderer === !0 && O.shift(), W = Me(O, v), W === null)
        throw Me(O) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
    }
    W.getShaderPrecisionFormat === void 0 && (W.getShaderPrecisionFormat = function() {
      return { rangeMin: 1, rangeMax: 1, precision: 1 };
    });
  } catch (v) {
    throw console.error("THREE.WebGLRenderer: " + v.message), v;
  }
  let me, Ce, ge, Te, ye, Ee, it, st, He, Ze, $e, Oe, At, rt, S, C, K, N, z, U, oe, M, L, J;
  function G() {
    me = new ZA(W), Ce = new qA(W, me, r), me.init(Ce), M = new Pp(W, me, Ce), ge = new Lp(W, me, Ce), Te = new tf(), ye = new _p(), Ee = new Qp(W, me, ge, ye, Ce, M, Te), it = new YA(p), st = new XA(p), He = new hu(W, Ce), L = new VA(W, me, He, Ce), Ze = new $A(W, He, Te, L), $e = new af(W, Ze, He, Te), z = new rf(W, Ce, Ee), C = new jA(ye), Oe = new bp(p, it, st, me, Ce, L, C), At = new Up(p, ye), rt = new Ep(), S = new Mp(me, Ce), N = new HA(p, it, st, ge, $e, h, a), K = new Rp(p, $e, Ce), J = new Op(W, Te, Ce, ge), U = new WA(W, me, Te, Ce), oe = new ef(W, me, Te, Ce), Te.programs = Oe.programs, p.capabilities = Ce, p.extensions = me, p.properties = ye, p.renderLists = rt, p.shadowMap = K, p.state = ge, p.info = Te;
  }
  G();
  const Y = new Gp(p, W);
  this.xr = Y, this.getContext = function() {
    return W;
  }, this.getContextAttributes = function() {
    return W.getContextAttributes();
  }, this.forceContextLoss = function() {
    const v = me.get("WEBGL_lose_context");
    v && v.loseContext();
  }, this.forceContextRestore = function() {
    const v = me.get("WEBGL_lose_context");
    v && v.restoreContext();
  }, this.getPixelRatio = function() {
    return P;
  }, this.setPixelRatio = function(v) {
    v !== void 0 && (P = v, this.setSize(y, D, !1));
  }, this.getSize = function(v) {
    return v.set(y, D);
  }, this.setSize = function(v, O, Z) {
    if (Y.isPresenting) {
      console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
      return;
    }
    y = v, D = O, e.width = Math.floor(v * P), e.height = Math.floor(O * P), Z !== !1 && (e.style.width = v + "px", e.style.height = O + "px"), this.setViewport(0, 0, v, O);
  }, this.getDrawingBufferSize = function(v) {
    return v.set(y * P, D * P).floor();
  }, this.setDrawingBufferSize = function(v, O, Z) {
    y = v, D = O, P = Z, e.width = Math.floor(v * Z), e.height = Math.floor(O * Z), this.setViewport(0, 0, v, O);
  }, this.getCurrentViewport = function(v) {
    return v.copy(w);
  }, this.getViewport = function(v) {
    return v.copy(Q);
  }, this.setViewport = function(v, O, Z, k) {
    v.isVector4 ? Q.set(v.x, v.y, v.z, v.w) : Q.set(v, O, Z, k), ge.viewport(w.copy(Q).multiplyScalar(P).floor());
  }, this.getScissor = function(v) {
    return v.copy(H);
  }, this.setScissor = function(v, O, Z, k) {
    v.isVector4 ? H.set(v.x, v.y, v.z, v.w) : H.set(v, O, Z, k), ge.scissor(T.copy(H).multiplyScalar(P).floor());
  }, this.getScissorTest = function() {
    return ne;
  }, this.setScissorTest = function(v) {
    ge.setScissorTest(ne = v);
  }, this.setOpaqueSort = function(v) {
    q = v;
  }, this.setTransparentSort = function(v) {
    F = v;
  }, this.getClearColor = function(v) {
    return v.copy(N.getClearColor());
  }, this.setClearColor = function() {
    N.setClearColor.apply(N, arguments);
  }, this.getClearAlpha = function() {
    return N.getClearAlpha();
  }, this.setClearAlpha = function() {
    N.setClearAlpha.apply(N, arguments);
  }, this.clear = function(v = !0, O = !0, Z = !0) {
    let k = 0;
    v && (k |= 16384), O && (k |= 256), Z && (k |= 1024), W.clear(k);
  }, this.clearColor = function() {
    this.clear(!0, !1, !1);
  }, this.clearDepth = function() {
    this.clear(!1, !0, !1);
  }, this.clearStencil = function() {
    this.clear(!1, !1, !0);
  }, this.dispose = function() {
    e.removeEventListener("webglcontextlost", le, !1), e.removeEventListener("webglcontextrestored", ce, !1), e.removeEventListener("webglcontextcreationerror", be, !1), rt.dispose(), S.dispose(), ye.dispose(), it.dispose(), st.dispose(), $e.dispose(), L.dispose(), J.dispose(), Oe.dispose(), Y.dispose(), Y.removeEventListener("sessionstart", Ae), Y.removeEventListener("sessionend", pe), ie && (ie.dispose(), ie = null), ke.stop();
  };
  function le(v) {
    v.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), A = !0;
  }
  function ce() {
    console.log("THREE.WebGLRenderer: Context Restored."), A = !1;
    const v = Te.autoReset, O = K.enabled, Z = K.autoUpdate, k = K.needsUpdate, te = K.type;
    G(), Te.autoReset = v, K.enabled = O, K.autoUpdate = Z, K.needsUpdate = k, K.type = te;
  }
  function be(v) {
    console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", v.statusMessage);
  }
  function _e(v) {
    const O = v.target;
    O.removeEventListener("dispose", _e), Le(O);
  }
  function Le(v) {
    R(v), ye.remove(v);
  }
  function R(v) {
    const O = ye.get(v).programs;
    O !== void 0 && (O.forEach(function(Z) {
      Oe.releaseProgram(Z);
    }), v.isShaderMaterial && Oe.releaseShaderCache(v));
  }
  this.renderBufferDirect = function(v, O, Z, k, te, xe) {
    O === null && (O = ae);
    const ve = te.isMesh && te.matrixWorld.determinant() < 0, Be = Pn(v, O, Z, k, te);
    ge.setMaterial(k, ve);
    let Se = Z.index, Ne = 1;
    k.wireframe === !0 && (Se = Ze.getWireframeAttribute(Z), Ne = 2);
    const Pe = Z.drawRange, Qe = Z.attributes.position;
    let tt = Pe.start * Ne, xt = (Pe.start + Pe.count) * Ne;
    xe !== null && (tt = Math.max(tt, xe.start * Ne), xt = Math.min(xt, (xe.start + xe.count) * Ne)), Se !== null ? (tt = Math.max(tt, 0), xt = Math.min(xt, Se.count)) : Qe != null && (tt = Math.max(tt, 0), xt = Math.min(xt, Qe.count));
    const Ut = xt - tt;
    if (Ut < 0 || Ut === 1 / 0)
      return;
    L.setup(te, k, Be, Z, Se);
    let rn, We = U;
    if (Se !== null && (rn = He.get(Se), We = oe, We.setIndex(rn)), te.isMesh)
      k.wireframe === !0 ? (ge.setLineWidth(k.wireframeLinewidth * de()), We.setMode(1)) : We.setMode(4);
    else if (te.isLine) {
      let Ge = k.linewidth;
      Ge === void 0 && (Ge = 1), ge.setLineWidth(Ge * de()), te.isLineSegments ? We.setMode(1) : te.isLineLoop ? We.setMode(2) : We.setMode(3);
    } else
      te.isPoints ? We.setMode(0) : te.isSprite && We.setMode(4);
    if (te.isInstancedMesh)
      We.renderInstances(tt, Ut, te.count);
    else if (Z.isInstancedBufferGeometry) {
      const Ge = Z._maxInstanceCount !== void 0 ? Z._maxInstanceCount : 1 / 0, cr = Math.min(Z.instanceCount, Ge);
      We.renderInstances(tt, Ut, cr);
    } else
      We.render(tt, Ut);
  }, this.compile = function(v, O) {
    function Z(k, te, xe) {
      k.transparent === !0 && k.side === _s ? (k.side = Ht, k.needsUpdate = !0, yt(k, te, xe), k.side = Dn, k.needsUpdate = !0, yt(k, te, xe), k.side = _s) : yt(k, te, xe);
    }
    d = S.get(v), d.init(), g.push(d), v.traverseVisible(function(k) {
      k.isLight && k.layers.test(O.layers) && (d.pushLight(k), k.castShadow && d.pushShadow(k));
    }), d.setupLights(p.physicallyCorrectLights), v.traverse(function(k) {
      const te = k.material;
      if (te)
        if (Array.isArray(te))
          for (let xe = 0; xe < te.length; xe++) {
            const ve = te[xe];
            Z(ve, v, k);
          }
        else
          Z(te, v, k);
    }), g.pop(), d = null;
  };
  let j = null;
  function se(v) {
    j && j(v);
  }
  function Ae() {
    ke.stop();
  }
  function pe() {
    ke.start();
  }
  const ke = new al();
  ke.setAnimationLoop(se), typeof self < "u" && ke.setContext(self), this.setAnimationLoop = function(v) {
    j = v, Y.setAnimationLoop(v), v === null ? ke.stop() : ke.start();
  }, Y.addEventListener("sessionstart", Ae), Y.addEventListener("sessionend", pe), this.render = function(v, O) {
    if (O !== void 0 && O.isCamera !== !0) {
      console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
      return;
    }
    if (A === !0)
      return;
    v.matrixWorldAutoUpdate === !0 && v.updateMatrixWorld(), O.parent === null && O.matrixWorldAutoUpdate === !0 && O.updateMatrixWorld(), Y.enabled === !0 && Y.isPresenting === !0 && (Y.cameraAutoUpdate === !0 && Y.updateCamera(O), O = Y.getCamera()), v.isScene === !0 && v.onBeforeRender(p, v, O, b), d = S.get(v, g.length), d.init(), g.push(d), $.multiplyMatrices(O.projectionMatrix, O.matrixWorldInverse), ee.setFromProjectionMatrix($), re = this.localClippingEnabled, V = C.init(this.clippingPlanes, re, O), u = rt.get(v, f.length), u.init(), f.push(u), et(v, O, 0, p.sortObjects), u.finish(), p.sortObjects === !0 && u.sort(q, F), V === !0 && C.beginShadows();
    const Z = d.state.shadowsArray;
    if (K.render(Z, v, O), V === !0 && C.endShadows(), this.info.autoReset === !0 && this.info.reset(), N.render(u, v), d.setupLights(p.physicallyCorrectLights), O.isArrayCamera) {
      const k = O.cameras;
      for (let te = 0, xe = k.length; te < xe; te++) {
        const ve = k[te];
        ft(u, v, ve, ve.viewport);
      }
    } else
      ft(u, v, O);
    b !== null && (Ee.updateMultisampleRenderTarget(b), Ee.updateRenderTargetMipmap(b)), v.isScene === !0 && v.onAfterRender(p, v, O), L.resetDefaultState(), _ = -1, I = null, g.pop(), g.length > 0 ? d = g[g.length - 1] : d = null, f.pop(), f.length > 0 ? u = f[f.length - 1] : u = null;
  };
  function et(v, O, Z, k) {
    if (v.visible === !1)
      return;
    if (v.layers.test(O.layers)) {
      if (v.isGroup)
        Z = v.renderOrder;
      else if (v.isLOD)
        v.autoUpdate === !0 && v.update(O);
      else if (v.isLight)
        d.pushLight(v), v.castShadow && d.pushShadow(v);
      else if (v.isSprite) {
        if (!v.frustumCulled || ee.intersectsSprite(v)) {
          k && he.setFromMatrixPosition(v.matrixWorld).applyMatrix4($);
          const ve = $e.update(v), Be = v.material;
          Be.visible && u.push(v, ve, Be, Z, he.z, null);
        }
      } else if ((v.isMesh || v.isLine || v.isPoints) && (v.isSkinnedMesh && v.skeleton.frame !== Te.render.frame && (v.skeleton.update(), v.skeleton.frame = Te.render.frame), !v.frustumCulled || ee.intersectsObject(v))) {
        k && he.setFromMatrixPosition(v.matrixWorld).applyMatrix4($);
        const ve = $e.update(v), Be = v.material;
        if (Array.isArray(Be)) {
          const Se = ve.groups;
          for (let Ne = 0, Pe = Se.length; Ne < Pe; Ne++) {
            const Qe = Se[Ne], tt = Be[Qe.materialIndex];
            tt && tt.visible && u.push(v, ve, tt, Z, he.z, Qe);
          }
        } else
          Be.visible && u.push(v, ve, Be, Z, he.z, null);
      }
    }
    const xe = v.children;
    for (let ve = 0, Be = xe.length; ve < Be; ve++)
      et(xe[ve], O, Z, k);
  }
  function ft(v, O, Z, k) {
    const te = v.opaque, xe = v.transmissive, ve = v.transparent;
    d.setupLightsView(Z), xe.length > 0 && Vt(te, O, Z), k && ge.viewport(w.copy(k)), te.length > 0 && Ye(te, O, Z), xe.length > 0 && Ye(xe, O, Z), ve.length > 0 && Ye(ve, O, Z), ge.buffers.depth.setTest(!0), ge.buffers.depth.setMask(!0), ge.buffers.color.setMask(!0), ge.setPolygonOffset(!1);
  }
  function Vt(v, O, Z) {
    const k = Ce.isWebGL2;
    ie === null && (ie = new Jn(1, 1, {
      generateMipmaps: !0,
      type: me.has("EXT_color_buffer_half_float") ? Nt : Tt,
      minFilter: bn,
      samples: k && s === !0 ? 4 : 0
    })), p.getDrawingBufferSize(X), k ? ie.setSize(X.x, X.y) : ie.setSize(er(X.x), er(X.y));
    const te = p.getRenderTarget();
    p.setRenderTarget(ie), p.clear();
    const xe = p.toneMapping;
    p.toneMapping = mn, Ye(v, O, Z), p.toneMapping = xe, Ee.updateMultisampleRenderTarget(ie), Ee.updateRenderTargetMipmap(ie), p.setRenderTarget(te);
  }
  function Ye(v, O, Z) {
    const k = O.isScene === !0 ? O.overrideMaterial : null;
    for (let te = 0, xe = v.length; te < xe; te++) {
      const ve = v[te], Be = ve.object, Se = ve.geometry, Ne = k === null ? ve.material : k, Pe = ve.group;
      Be.layers.test(Z.layers) && Lt(Be, O, Z, Se, Ne, Pe);
    }
  }
  function Lt(v, O, Z, k, te, xe) {
    v.onBeforeRender(p, O, Z, k, te, xe), v.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse, v.matrixWorld), v.normalMatrix.getNormalMatrix(v.modelViewMatrix), te.onBeforeRender(p, O, Z, k, v, xe), te.transparent === !0 && te.side === _s ? (te.side = Ht, te.needsUpdate = !0, p.renderBufferDirect(Z, O, k, te, v, xe), te.side = Dn, te.needsUpdate = !0, p.renderBufferDirect(Z, O, k, te, v, xe), te.side = _s) : p.renderBufferDirect(Z, O, k, te, v, xe), v.onAfterRender(p, O, Z, k, te, xe);
  }
  function yt(v, O, Z) {
    O.isScene !== !0 && (O = ae);
    const k = ye.get(v), te = d.state.lights, xe = d.state.shadowsArray, ve = te.state.version, Be = Oe.getParameters(v, te.state, xe, O, Z), Se = Oe.getProgramCacheKey(Be);
    let Ne = k.programs;
    k.environment = v.isMeshStandardMaterial ? O.environment : null, k.fog = O.fog, k.envMap = (v.isMeshStandardMaterial ? st : it).get(v.envMap || k.environment), Ne === void 0 && (v.addEventListener("dispose", _e), Ne = /* @__PURE__ */ new Map(), k.programs = Ne);
    let Pe = Ne.get(Se);
    if (Pe !== void 0) {
      if (k.currentProgram === Pe && k.lightsStateVersion === ve)
        return bs(v, Be), Pe;
    } else
      Be.uniforms = Oe.getUniforms(v), v.onBuild(Z, Be, p), v.onBeforeCompile(Be, p), Pe = Oe.acquireProgram(Be, Se), Ne.set(Se, Pe), k.uniforms = Be.uniforms;
    const Qe = k.uniforms;
    (!v.isShaderMaterial && !v.isRawShaderMaterial || v.clipping === !0) && (Qe.clippingPlanes = C.uniform), bs(v, Be), k.needsLights = ki(v), k.lightsStateVersion = ve, k.needsLights && (Qe.ambientLightColor.value = te.state.ambient, Qe.lightProbe.value = te.state.probe, Qe.directionalLights.value = te.state.directional, Qe.directionalLightShadows.value = te.state.directionalShadow, Qe.spotLights.value = te.state.spot, Qe.spotLightShadows.value = te.state.spotShadow, Qe.rectAreaLights.value = te.state.rectArea, Qe.ltc_1.value = te.state.rectAreaLTC1, Qe.ltc_2.value = te.state.rectAreaLTC2, Qe.pointLights.value = te.state.point, Qe.pointLightShadows.value = te.state.pointShadow, Qe.hemisphereLights.value = te.state.hemi, Qe.directionalShadowMap.value = te.state.directionalShadowMap, Qe.directionalShadowMatrix.value = te.state.directionalShadowMatrix, Qe.spotShadowMap.value = te.state.spotShadowMap, Qe.spotLightMatrix.value = te.state.spotLightMatrix, Qe.spotLightMap.value = te.state.spotLightMap, Qe.pointShadowMap.value = te.state.pointShadowMap, Qe.pointShadowMatrix.value = te.state.pointShadowMatrix);
    const tt = Pe.getUniforms(), xt = Zs.seqWithValue(tt.seq, Qe);
    return k.currentProgram = Pe, k.uniformsList = xt, Pe;
  }
  function bs(v, O) {
    const Z = ye.get(v);
    Z.outputEncoding = O.outputEncoding, Z.instancing = O.instancing, Z.skinning = O.skinning, Z.morphTargets = O.morphTargets, Z.morphNormals = O.morphNormals, Z.morphColors = O.morphColors, Z.morphTargetsCount = O.morphTargetsCount, Z.numClippingPlanes = O.numClippingPlanes, Z.numIntersection = O.numClipIntersection, Z.vertexAlphas = O.vertexAlphas, Z.vertexTangents = O.vertexTangents, Z.toneMapping = O.toneMapping;
  }
  function Pn(v, O, Z, k, te) {
    O.isScene !== !0 && (O = ae), Ee.resetTextureUnits();
    const xe = O.fog, ve = k.isMeshStandardMaterial ? O.environment : null, Be = b === null ? p.outputEncoding : b.isXRRenderTarget === !0 ? b.texture.encoding : tn, Se = (k.isMeshStandardMaterial ? st : it).get(k.envMap || ve), Ne = k.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4, Pe = !!k.normalMap && !!Z.attributes.tangent, Qe = !!Z.morphAttributes.position, tt = !!Z.morphAttributes.normal, xt = !!Z.morphAttributes.color, Ut = k.toneMapped ? p.toneMapping : mn, rn = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, We = rn !== void 0 ? rn.length : 0, Ge = ye.get(k), cr = d.state.lights;
    if (V === !0 && (re === !0 || v !== I)) {
      const Qt = v === I && k.id === _;
      C.setState(k, v, Qt);
    }
    let pt = !1;
    k.version === Ge.__version ? (Ge.needsLights && Ge.lightsStateVersion !== cr.state.version || Ge.outputEncoding !== Be || te.isInstancedMesh && Ge.instancing === !1 || !te.isInstancedMesh && Ge.instancing === !0 || te.isSkinnedMesh && Ge.skinning === !1 || !te.isSkinnedMesh && Ge.skinning === !0 || Ge.envMap !== Se || k.fog === !0 && Ge.fog !== xe || Ge.numClippingPlanes !== void 0 && (Ge.numClippingPlanes !== C.numPlanes || Ge.numIntersection !== C.numIntersection) || Ge.vertexAlphas !== Ne || Ge.vertexTangents !== Pe || Ge.morphTargets !== Qe || Ge.morphNormals !== tt || Ge.morphColors !== xt || Ge.toneMapping !== Ut || Ce.isWebGL2 === !0 && Ge.morphTargetsCount !== We) && (pt = !0) : (pt = !0, Ge.__version = k.version);
    let Fn = Ge.currentProgram;
    pt === !0 && (Fn = yt(k, O, te));
    let Wa = !1, Ni = !1, lr = !1;
    const vt = Fn.getUniforms(), kn = Ge.uniforms;
    if (ge.useProgram(Fn.program) && (Wa = !0, Ni = !0, lr = !0), k.id !== _ && (_ = k.id, Ni = !0), Wa || I !== v) {
      if (vt.setValue(W, "projectionMatrix", v.projectionMatrix), Ce.logarithmicDepthBuffer && vt.setValue(
        W,
        "logDepthBufFC",
        2 / (Math.log(v.far + 1) / Math.LN2)
      ), I !== v && (I = v, Ni = !0, lr = !0), k.isShaderMaterial || k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshStandardMaterial || k.envMap) {
        const Qt = vt.map.cameraPosition;
        Qt !== void 0 && Qt.setValue(
          W,
          he.setFromMatrixPosition(v.matrixWorld)
        );
      }
      (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial) && vt.setValue(W, "isOrthographic", v.isOrthographicCamera === !0), (k.isMeshPhongMaterial || k.isMeshToonMaterial || k.isMeshLambertMaterial || k.isMeshBasicMaterial || k.isMeshStandardMaterial || k.isShaderMaterial || k.isShadowMaterial || te.isSkinnedMesh) && vt.setValue(W, "viewMatrix", v.matrixWorldInverse);
    }
    if (te.isSkinnedMesh) {
      vt.setOptional(W, te, "bindMatrix"), vt.setOptional(W, te, "bindMatrixInverse");
      const Qt = te.skeleton;
      Qt && (Ce.floatVertexTextures ? (Qt.boneTexture === null && Qt.computeBoneTexture(), vt.setValue(W, "boneTexture", Qt.boneTexture, Ee), vt.setValue(W, "boneTextureSize", Qt.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
    }
    const hr = Z.morphAttributes;
    if ((hr.position !== void 0 || hr.normal !== void 0 || hr.color !== void 0 && Ce.isWebGL2 === !0) && z.update(te, Z, k, Fn), (Ni || Ge.receiveShadow !== te.receiveShadow) && (Ge.receiveShadow = te.receiveShadow, vt.setValue(W, "receiveShadow", te.receiveShadow)), k.isMeshGouraudMaterial && k.envMap !== null && (kn.envMap.value = Se, kn.flipEnvMap.value = Se.isCubeTexture && Se.isRenderTargetTexture === !1 ? -1 : 1), Ni && (vt.setValue(W, "toneMappingExposure", p.toneMappingExposure), Ge.needsLights && or(kn, lr), xe && k.fog === !0 && At.refreshFogUniforms(kn, xe), At.refreshMaterialUniforms(kn, k, P, D, ie), Zs.upload(W, Ge.uniformsList, kn, Ee)), k.isShaderMaterial && k.uniformsNeedUpdate === !0 && (Zs.upload(W, Ge.uniformsList, kn, Ee), k.uniformsNeedUpdate = !1), k.isSpriteMaterial && vt.setValue(W, "center", te.center), vt.setValue(W, "modelViewMatrix", te.modelViewMatrix), vt.setValue(W, "normalMatrix", te.normalMatrix), vt.setValue(W, "modelMatrix", te.matrixWorld), k.isShaderMaterial || k.isRawShaderMaterial) {
      const Qt = k.uniformsGroups;
      for (let ur = 0, Gl = Qt.length; ur < Gl; ur++)
        if (Ce.isWebGL2) {
          const qa = Qt[ur];
          J.update(qa, Fn), J.bind(qa, Fn);
        } else
          console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
    }
    return Fn;
  }
  function or(v, O) {
    v.ambientLightColor.needsUpdate = O, v.lightProbe.needsUpdate = O, v.directionalLights.needsUpdate = O, v.directionalLightShadows.needsUpdate = O, v.pointLights.needsUpdate = O, v.pointLightShadows.needsUpdate = O, v.spotLights.needsUpdate = O, v.spotLightShadows.needsUpdate = O, v.rectAreaLights.needsUpdate = O, v.hemisphereLights.needsUpdate = O;
  }
  function ki(v) {
    return v.isMeshLambertMaterial || v.isMeshToonMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isShadowMaterial || v.isShaderMaterial && v.lights === !0;
  }
  this.getActiveCubeFace = function() {
    return m;
  }, this.getActiveMipmapLevel = function() {
    return E;
  }, this.getRenderTarget = function() {
    return b;
  }, this.setRenderTargetTextures = function(v, O, Z) {
    ye.get(v.texture).__webglTexture = O, ye.get(v.depthTexture).__webglTexture = Z;
    const k = ye.get(v);
    k.__hasExternalTextures = !0, k.__hasExternalTextures && (k.__autoAllocateDepthBuffer = Z === void 0, k.__autoAllocateDepthBuffer || me.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), k.__useRenderToTexture = !1));
  }, this.setRenderTargetFramebuffer = function(v, O) {
    const Z = ye.get(v);
    Z.__webglFramebuffer = O, Z.__useDefaultFramebuffer = O === void 0;
  }, this.setRenderTarget = function(v, O = 0, Z = 0) {
    b = v, m = O, E = Z;
    let k = !0, te = null, xe = !1, ve = !1;
    if (v) {
      const Se = ye.get(v);
      Se.__useDefaultFramebuffer !== void 0 ? (ge.bindFramebuffer(36160, null), k = !1) : Se.__webglFramebuffer === void 0 ? Ee.setupRenderTarget(v) : Se.__hasExternalTextures && Ee.rebindTextures(v, ye.get(v.texture).__webglTexture, ye.get(v.depthTexture).__webglTexture);
      const Ne = v.texture;
      (Ne.isData3DTexture || Ne.isDataArrayTexture || Ne.isCompressedArrayTexture) && (ve = !0);
      const Pe = ye.get(v).__webglFramebuffer;
      v.isWebGLCubeRenderTarget ? (te = Pe[O], xe = !0) : Ce.isWebGL2 && v.samples > 0 && Ee.useMultisampledRTT(v) === !1 ? te = ye.get(v).__webglMultisampledFramebuffer : te = Pe, w.copy(v.viewport), T.copy(v.scissor), x = v.scissorTest;
    } else
      w.copy(Q).multiplyScalar(P).floor(), T.copy(H).multiplyScalar(P).floor(), x = ne;
    if (ge.bindFramebuffer(36160, te) && Ce.drawBuffers && k && ge.drawBuffers(v, te), ge.viewport(w), ge.scissor(T), ge.setScissorTest(x), xe) {
      const Se = ye.get(v.texture);
      W.framebufferTexture2D(36160, 36064, 34069 + O, Se.__webglTexture, Z);
    } else if (ve) {
      const Se = ye.get(v.texture), Ne = O || 0;
      W.framebufferTextureLayer(36160, 36064, Se.__webglTexture, Z || 0, Ne);
    }
    _ = -1;
  }, this.readRenderTargetPixels = function(v, O, Z, k, te, xe, ve) {
    if (!(v && v.isWebGLRenderTarget)) {
      console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      return;
    }
    let Be = ye.get(v).__webglFramebuffer;
    if (v.isWebGLCubeRenderTarget && ve !== void 0 && (Be = Be[ve]), Be) {
      ge.bindFramebuffer(36160, Be);
      try {
        const Se = v.texture, Ne = Se.format, Pe = Se.type;
        if (Ne !== It && M.convert(Ne) !== W.getParameter(35739)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
          return;
        }
        const Qe = Pe === Nt && (me.has("EXT_color_buffer_half_float") || Ce.isWebGL2 && me.has("EXT_color_buffer_float"));
        if (Pe !== Tt && M.convert(Pe) !== W.getParameter(35738) && !(Pe === Rt && (Ce.isWebGL2 || me.has("OES_texture_float") || me.has("WEBGL_color_buffer_float"))) && !Qe) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          return;
        }
        O >= 0 && O <= v.width - k && Z >= 0 && Z <= v.height - te && W.readPixels(O, Z, k, te, M.convert(Ne), M.convert(Pe), xe);
      } finally {
        const Se = b !== null ? ye.get(b).__webglFramebuffer : null;
        ge.bindFramebuffer(36160, Se);
      }
    }
  }, this.copyFramebufferToTexture = function(v, O, Z = 0) {
    const k = Math.pow(2, -Z), te = Math.floor(O.image.width * k), xe = Math.floor(O.image.height * k);
    Ee.setTexture2D(O, 0), W.copyTexSubImage2D(3553, Z, 0, 0, v.x, v.y, te, xe), ge.unbindTexture();
  }, this.copyTextureToTexture = function(v, O, Z, k = 0) {
    const te = O.image.width, xe = O.image.height, ve = M.convert(Z.format), Be = M.convert(Z.type);
    Ee.setTexture2D(Z, 0), W.pixelStorei(37440, Z.flipY), W.pixelStorei(37441, Z.premultiplyAlpha), W.pixelStorei(3317, Z.unpackAlignment), O.isDataTexture ? W.texSubImage2D(3553, k, v.x, v.y, te, xe, ve, Be, O.image.data) : O.isCompressedTexture ? W.compressedTexSubImage2D(3553, k, v.x, v.y, O.mipmaps[0].width, O.mipmaps[0].height, ve, O.mipmaps[0].data) : W.texSubImage2D(3553, k, v.x, v.y, ve, Be, O.image), k === 0 && Z.generateMipmaps && W.generateMipmap(3553), ge.unbindTexture();
  }, this.copyTextureToTexture3D = function(v, O, Z, k, te = 0) {
    if (p.isWebGL1Renderer) {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
      return;
    }
    const xe = v.max.x - v.min.x + 1, ve = v.max.y - v.min.y + 1, Be = v.max.z - v.min.z + 1, Se = M.convert(k.format), Ne = M.convert(k.type);
    let Pe;
    if (k.isData3DTexture)
      Ee.setTexture3D(k, 0), Pe = 32879;
    else if (k.isDataArrayTexture)
      Ee.setTexture2DArray(k, 0), Pe = 35866;
    else {
      console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
      return;
    }
    W.pixelStorei(37440, k.flipY), W.pixelStorei(37441, k.premultiplyAlpha), W.pixelStorei(3317, k.unpackAlignment);
    const Qe = W.getParameter(3314), tt = W.getParameter(32878), xt = W.getParameter(3316), Ut = W.getParameter(3315), rn = W.getParameter(32877), We = Z.isCompressedTexture ? Z.mipmaps[0] : Z.image;
    W.pixelStorei(3314, We.width), W.pixelStorei(32878, We.height), W.pixelStorei(3316, v.min.x), W.pixelStorei(3315, v.min.y), W.pixelStorei(32877, v.min.z), Z.isDataTexture || Z.isData3DTexture ? W.texSubImage3D(Pe, te, O.x, O.y, O.z, xe, ve, Be, Se, Ne, We.data) : Z.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), W.compressedTexSubImage3D(Pe, te, O.x, O.y, O.z, xe, ve, Be, Se, We.data)) : W.texSubImage3D(Pe, te, O.x, O.y, O.z, xe, ve, Be, Se, Ne, We), W.pixelStorei(3314, Qe), W.pixelStorei(32878, tt), W.pixelStorei(3316, xt), W.pixelStorei(3315, Ut), W.pixelStorei(32877, rn), te === 0 && k.generateMipmaps && W.generateMipmap(Pe), ge.unbindTexture();
  }, this.initTexture = function(v) {
    v.isCubeTexture ? Ee.setTextureCube(v, 0) : v.isData3DTexture ? Ee.setTexture3D(v, 0) : v.isDataArrayTexture || v.isCompressedArrayTexture ? Ee.setTexture2DArray(v, 0) : Ee.setTexture2D(v, 0), ge.unbindTexture();
  }, this.resetState = function() {
    m = 0, E = 0, b = null, ge.reset(), L.reset();
  }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
}
class Hp extends ul {
}
Hp.prototype.isWebGL1Renderer = !0;
class Xo extends Ke {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.backgroundIntensity = this.backgroundIntensity), t;
  }
  get autoUpdate() {
    return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."), this.matrixWorldAutoUpdate;
  }
  set autoUpdate(e) {
    console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."), this.matrixWorldAutoUpdate = e;
  }
}
class dl {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = pa, this.updateRange = { offset: 0, count: -1 }, this.version = 0, this.uuid = Jt();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let i = 0, s = this.stride; i < s; i++)
      this.array[e + i] = t.array[n + i];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const Mt = /* @__PURE__ */ new B();
class fs {
  constructor(e, t, n, i = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = i;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.data.count; t < n; t++)
      Mt.fromBufferAttribute(this, t), Mt.applyMatrix4(e), this.setXYZ(t, Mt.x, Mt.y, Mt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      Mt.fromBufferAttribute(this, t), Mt.applyNormalMatrix(e), this.setXYZ(t, Mt.x, Mt.y, Mt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      Mt.fromBufferAttribute(this, t), Mt.transformDirection(e), this.setXYZ(t, Mt.x, Mt.y, Mt.z);
    return this;
  }
  setX(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = pn(t, this.array)), t;
  }
  setXY(e, t, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = qe(t, this.array), n = qe(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = qe(t, this.array), n = qe(n, this.array), i = qe(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = qe(t, this.array), n = qe(n, this.array), i = qe(i, this.array), s = qe(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = i, this.data.array[e + 3] = s, this;
  }
  clone(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const i = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++)
          t.push(this.data.array[i + s]);
      }
      return new ot(new this.array.constructor(t), this.itemSize, this.normalized);
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new fs(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const i = n * this.data.stride + this.offset;
        for (let s = 0; s < this.itemSize; s++)
          t.push(this.data.array[i + s]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}
class Al extends Kt {
  constructor(e) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new we(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
let fi;
const qi = /* @__PURE__ */ new B(), pi = /* @__PURE__ */ new B(), gi = /* @__PURE__ */ new B(), mi = /* @__PURE__ */ new fe(), ji = /* @__PURE__ */ new fe(), fl = /* @__PURE__ */ new Re(), Ns = /* @__PURE__ */ new B(), Yi = /* @__PURE__ */ new B(), Gs = /* @__PURE__ */ new B(), Zo = /* @__PURE__ */ new fe(), Ur = /* @__PURE__ */ new fe(), $o = /* @__PURE__ */ new fe();
class Vp extends Ke {
  constructor(e) {
    if (super(), this.isSprite = !0, this.type = "Sprite", fi === void 0) {
      fi = new _t();
      const t = new Float32Array([
        -0.5,
        -0.5,
        0,
        0,
        0,
        0.5,
        -0.5,
        0,
        1,
        0,
        0.5,
        0.5,
        0,
        1,
        1,
        -0.5,
        0.5,
        0,
        0,
        1
      ]), n = new dl(t, 5);
      fi.setIndex([0, 1, 2, 0, 2, 3]), fi.setAttribute("position", new fs(n, 3, 0, !1)), fi.setAttribute("uv", new fs(n, 2, 3, !1));
    }
    this.geometry = fi, this.material = e !== void 0 ? e : new Al(), this.center = new fe(0.5, 0.5);
  }
  raycast(e, t) {
    e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), pi.setFromMatrixScale(this.matrixWorld), fl.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), gi.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && pi.multiplyScalar(-gi.z);
    const n = this.material.rotation;
    let i, s;
    n !== 0 && (s = Math.cos(n), i = Math.sin(n));
    const a = this.center;
    Us(Ns.set(-0.5, -0.5, 0), gi, a, pi, i, s), Us(Yi.set(0.5, -0.5, 0), gi, a, pi, i, s), Us(Gs.set(0.5, 0.5, 0), gi, a, pi, i, s), Zo.set(0, 0), Ur.set(1, 0), $o.set(1, 1);
    let o = e.ray.intersectTriangle(Ns, Yi, Gs, !1, qi);
    if (o === null && (Us(Yi.set(-0.5, 0.5, 0), gi, a, pi, i, s), Ur.set(0, 1), o = e.ray.intersectTriangle(Ns, Gs, Yi, !1, qi), o === null))
      return;
    const c = e.ray.origin.distanceTo(qi);
    c < e.near || c > e.far || t.push({
      distance: c,
      point: qi.clone(),
      uv: $t.getUV(qi, Ns, Yi, Gs, Zo, Ur, $o, new fe()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
  }
}
function Us(r, e, t, n, i, s) {
  mi.subVectors(r, t).addScalar(0.5).multiply(n), i !== void 0 ? (ji.x = s * mi.x - i * mi.y, ji.y = i * mi.x + s * mi.y) : ji.copy(mi), r.copy(e), r.x += ji.x, r.y += ji.y, r.applyMatrix4(fl);
}
const ec = /* @__PURE__ */ new B(), tc = /* @__PURE__ */ new je(), nc = /* @__PURE__ */ new je(), Wp = /* @__PURE__ */ new B(), ic = /* @__PURE__ */ new Re();
class qp extends Ie {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new Re(), this.bindMatrixInverse = new Re();
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, this;
  }
  bind(e, t) {
    this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new je(), t = this.geometry.attributes.skinWeight;
    for (let n = 0, i = t.count; n < i; n++) {
      e.fromBufferAttribute(t, n);
      const s = 1 / e.manhattanLength();
      s !== 1 / 0 ? e.multiplyScalar(s) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === "attached" ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === "detached" ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  boneTransform(e, t) {
    const n = this.skeleton, i = this.geometry;
    tc.fromBufferAttribute(i.attributes.skinIndex, e), nc.fromBufferAttribute(i.attributes.skinWeight, e), ec.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
    for (let s = 0; s < 4; s++) {
      const a = nc.getComponent(s);
      if (a !== 0) {
        const o = tc.getComponent(s);
        ic.multiplyMatrices(n.bones[o].matrixWorld, n.boneInverses[o]), t.addScaledVector(Wp.copy(ec).applyMatrix4(ic), a);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}
class pl extends Ke {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class Ra extends ht {
  constructor(e = null, t = 1, n = 1, i, s, a, o, c, l = bt, h = bt, u, d) {
    super(null, a, o, c, l, h, i, s, u, d), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const sc = /* @__PURE__ */ new Re(), jp = /* @__PURE__ */ new Re();
class La {
  constructor(e = [], t = []) {
    this.uuid = Jt(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.boneTextureSize = 0, this.frame = -1, this.init();
  }
  init() {
    const e = this.bones, t = this.boneInverses;
    if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0)
      this.calculateInverses();
    else if (e.length !== t.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, i = this.bones.length; n < i; n++)
        this.boneInverses.push(new Re());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = new Re();
      this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && n.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale));
    }
  }
  update() {
    const e = this.bones, t = this.boneInverses, n = this.boneMatrices, i = this.boneTexture;
    for (let s = 0, a = e.length; s < a; s++) {
      const o = e[s] ? e[s].matrixWorld : jp;
      sc.multiplyMatrices(o, t[s]), sc.toArray(n, s * 16);
    }
    i !== null && (i.needsUpdate = !0);
  }
  clone() {
    return new La(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(this.bones.length * 4);
    e = Jc(e), e = Math.max(e, 4);
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const n = new Ra(t, e, e, It, Rt);
    return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this.boneTextureSize = e, this;
  }
  getBoneByName(e) {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const i = this.bones[t];
      if (i.name === e)
        return i;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let n = 0, i = e.bones.length; n < i; n++) {
      const s = e.bones[n];
      let a = t[s];
      a === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", s), a = new pl()), this.bones.push(a), this.boneInverses.push(new Re().fromArray(e.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    e.uuid = this.uuid;
    const t = this.bones, n = this.boneInverses;
    for (let i = 0, s = t.length; i < s; i++) {
      const a = t[i];
      e.bones.push(a.uuid);
      const o = n[i];
      e.boneInverses.push(o.toArray());
    }
    return e;
  }
}
class rc extends ot {
  constructor(e, t, n, i = 1) {
    super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = i;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const ac = /* @__PURE__ */ new Re(), oc = /* @__PURE__ */ new Re(), Os = [], Yp = /* @__PURE__ */ new Re(), Ji = /* @__PURE__ */ new Ie();
class Jp extends Ie {
  constructor(e, t, n) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new rc(new Float32Array(n * 16), 16), this.instanceColor = null, this.count = n, this.frustumCulled = !1;
    for (let i = 0; i < n; i++)
      this.setMatrixAt(i, Yp);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  raycast(e, t) {
    const n = this.matrixWorld, i = this.count;
    if (Ji.geometry = this.geometry, Ji.material = this.material, Ji.material !== void 0)
      for (let s = 0; s < i; s++) {
        this.getMatrixAt(s, ac), oc.multiplyMatrices(n, ac), Ji.matrixWorld = oc, Ji.raycast(e, Os);
        for (let a = 0, o = Os.length; a < o; a++) {
          const c = Os[a];
          c.instanceId = s, c.object = this, t.push(c);
        }
        Os.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new rc(new Float32Array(this.instanceMatrix.count * 3), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  updateMorphTargets() {
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class gl extends Kt {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new we(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const cc = /* @__PURE__ */ new B(), lc = /* @__PURE__ */ new B(), hc = /* @__PURE__ */ new Re(), Or = /* @__PURE__ */ new ir(), zs = /* @__PURE__ */ new Ri();
class Qa extends Ke {
  constructor(e = new _t(), t = new gl()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let i = 1, s = t.count; i < s; i++)
        cc.fromBufferAttribute(t, i - 1), lc.fromBufferAttribute(t, i), n[i] = n[i - 1], n[i] += cc.distanceTo(lc);
      e.setAttribute("lineDistance", new Xe(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.matrixWorld, s = e.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), zs.copy(n.boundingSphere), zs.applyMatrix4(i), zs.radius += s, e.ray.intersectsSphere(zs) === !1)
      return;
    hc.copy(i).invert(), Or.copy(e.ray).applyMatrix4(hc);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = new B(), h = new B(), u = new B(), d = new B(), f = this.isLineSegments ? 2 : 1, g = n.index, A = n.attributes.position;
    if (g !== null) {
      const m = Math.max(0, a.start), E = Math.min(g.count, a.start + a.count);
      for (let b = m, _ = E - 1; b < _; b += f) {
        const I = g.getX(b), w = g.getX(b + 1);
        if (l.fromBufferAttribute(A, I), h.fromBufferAttribute(A, w), Or.distanceSqToSegment(l, h, d, u) > c)
          continue;
        d.applyMatrix4(this.matrixWorld);
        const x = e.ray.origin.distanceTo(d);
        x < e.near || x > e.far || t.push({
          distance: x,
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: b,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    } else {
      const m = Math.max(0, a.start), E = Math.min(A.count, a.start + a.count);
      for (let b = m, _ = E - 1; b < _; b += f) {
        if (l.fromBufferAttribute(A, b), h.fromBufferAttribute(A, b + 1), Or.distanceSqToSegment(l, h, d, u) > c)
          continue;
        d.applyMatrix4(this.matrixWorld);
        const w = e.ray.origin.distanceTo(d);
        w < e.near || w > e.far || t.push({
          distance: w,
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: b,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const i = t[n[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = i.length; s < a; s++) {
          const o = i[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
const uc = /* @__PURE__ */ new B(), dc = /* @__PURE__ */ new B();
class Kp extends Qa {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let i = 0, s = t.count; i < s; i += 2)
        uc.fromBufferAttribute(t, i), dc.fromBufferAttribute(t, i + 1), n[i] = i === 0 ? 0 : n[i - 1], n[i + 1] = n[i] + uc.distanceTo(dc);
      e.setAttribute("lineDistance", new Xe(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Xp extends Qa {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class ml extends Kt {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new we(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const Ac = /* @__PURE__ */ new Re(), _a = /* @__PURE__ */ new ir(), Hs = /* @__PURE__ */ new Ri(), Vs = /* @__PURE__ */ new B();
class bl extends Ke {
  constructor(e = new _t(), t = new ml()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.matrixWorld, s = e.params.Points.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Hs.copy(n.boundingSphere), Hs.applyMatrix4(i), Hs.radius += s, e.ray.intersectsSphere(Hs) === !1)
      return;
    Ac.copy(i).invert(), _a.copy(e.ray).applyMatrix4(Ac);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = n.index, u = n.attributes.position;
    if (l !== null) {
      const d = Math.max(0, a.start), f = Math.min(l.count, a.start + a.count);
      for (let g = d, p = f; g < p; g++) {
        const A = l.getX(g);
        Vs.fromBufferAttribute(u, A), fc(Vs, A, c, i, e, t, this);
      }
    } else {
      const d = Math.max(0, a.start), f = Math.min(u.count, a.start + a.count);
      for (let g = d, p = f; g < p; g++)
        Vs.fromBufferAttribute(u, g), fc(Vs, g, c, i, e, t, this);
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const i = t[n[0]];
      if (i !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = i.length; s < a; s++) {
          const o = i[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
function fc(r, e, t, n, i, s, a) {
  const o = _a.distanceSqToPoint(r);
  if (o < t) {
    const c = new B();
    _a.closestPointToPoint(r, c), c.applyMatrix4(n);
    const l = i.ray.origin.distanceTo(c);
    if (l < i.near || l > i.far)
      return;
    s.push({
      distance: l,
      distanceToRay: Math.sqrt(o),
      point: c,
      index: e,
      face: null,
      object: a
    });
  }
}
class _l extends ht {
  constructor(e, t, n, i, s, a, o, c, l, h, u, d) {
    super(null, a, o, c, l, h, i, s, u, d), this.isCompressedTexture = !0, this.image = { width: t, height: n }, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1;
  }
}
class Zp extends _l {
  constructor(e, t, n, i, s, a) {
    super(e, t, n, s, a), this.isCompressedArrayTexture = !0, this.image.depth = i, this.wrapR = Et;
  }
}
class $p extends ht {
  constructor(e, t, n, i, s, a, o, c, l) {
    super(e, t, n, i, s, a, o, c, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class xn {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPoint(n / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPointAt(n / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let n, i = this.getPoint(0), s = 0;
    t.push(0);
    for (let a = 1; a <= e; a++)
      n = this.getPoint(a / e), s += n.distanceTo(i), t.push(s), i = n;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  getUtoTmapping(e, t) {
    const n = this.getLengths();
    let i = 0;
    const s = n.length;
    let a;
    t ? a = t : a = e * n[s - 1];
    let o = 0, c = s - 1, l;
    for (; o <= c; )
      if (i = Math.floor(o + (c - o) / 2), l = n[i] - a, l < 0)
        o = i + 1;
      else if (l > 0)
        c = i - 1;
      else {
        c = i;
        break;
      }
    if (i = c, n[i] === a)
      return i / (s - 1);
    const h = n[i], d = n[i + 1] - h, f = (a - h) / d;
    return (i + f) / (s - 1);
  }
  getTangent(e, t) {
    let i = e - 1e-4, s = e + 1e-4;
    i < 0 && (i = 0), s > 1 && (s = 1);
    const a = this.getPoint(i), o = this.getPoint(s), c = t || (a.isVector2 ? new fe() : new B());
    return c.copy(o).sub(a).normalize(), c;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t) {
    const n = new B(), i = [], s = [], a = [], o = new B(), c = new Re();
    for (let f = 0; f <= e; f++) {
      const g = f / e;
      i[f] = this.getTangentAt(g, new B());
    }
    s[0] = new B(), a[0] = new B();
    let l = Number.MAX_VALUE;
    const h = Math.abs(i[0].x), u = Math.abs(i[0].y), d = Math.abs(i[0].z);
    h <= l && (l = h, n.set(1, 0, 0)), u <= l && (l = u, n.set(0, 1, 0)), d <= l && n.set(0, 0, 1), o.crossVectors(i[0], n).normalize(), s[0].crossVectors(i[0], o), a[0].crossVectors(i[0], s[0]);
    for (let f = 1; f <= e; f++) {
      if (s[f] = s[f - 1].clone(), a[f] = a[f - 1].clone(), o.crossVectors(i[f - 1], i[f]), o.length() > Number.EPSILON) {
        o.normalize();
        const g = Math.acos(lt(i[f - 1].dot(i[f]), -1, 1));
        s[f].applyMatrix4(c.makeRotationAxis(o, g));
      }
      a[f].crossVectors(i[f], s[f]);
    }
    if (t === !0) {
      let f = Math.acos(lt(s[0].dot(s[e]), -1, 1));
      f /= e, i[0].dot(o.crossVectors(s[0], s[e])) > 0 && (f = -f);
      for (let g = 1; g <= e; g++)
        s[g].applyMatrix4(c.makeRotationAxis(i[g], f * g)), a[g].crossVectors(i[g], s[g]);
    }
    return {
      tangents: i,
      normals: s,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.5,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}
class xl extends xn {
  constructor(e = 0, t = 0, n = 1, i = 1, s = 0, a = Math.PI * 2, o = !1, c = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = i, this.aStartAngle = s, this.aEndAngle = a, this.aClockwise = o, this.aRotation = c;
  }
  getPoint(e, t) {
    const n = t || new fe(), i = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(s) < Number.EPSILON;
    for (; s < 0; )
      s += i;
    for (; s > i; )
      s -= i;
    s < Number.EPSILON && (a ? s = 0 : s = i), this.aClockwise === !0 && !a && (s === i ? s = -i : s = s - i);
    const o = this.aStartAngle + e * s;
    let c = this.aX + this.xRadius * Math.cos(o), l = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = c - this.aX, f = l - this.aY;
      c = d * h - f * u + this.aX, l = d * u + f * h + this.aY;
    }
    return n.set(c, l);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}
class eg extends xl {
  constructor(e, t, n, i, s, a) {
    super(e, t, n, n, i, s, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Pa() {
  let r = 0, e = 0, t = 0, n = 0;
  function i(s, a, o, c) {
    r = s, e = o, t = -3 * s + 3 * a - 2 * o - c, n = 2 * s - 2 * a + o + c;
  }
  return {
    initCatmullRom: function(s, a, o, c, l) {
      i(a, o, l * (o - s), l * (c - a));
    },
    initNonuniformCatmullRom: function(s, a, o, c, l, h, u) {
      let d = (a - s) / l - (o - s) / (l + h) + (o - a) / h, f = (o - a) / h - (c - a) / (h + u) + (c - o) / u;
      d *= h, f *= h, i(a, o, d, f);
    },
    calc: function(s) {
      const a = s * s, o = a * s;
      return r + e * s + t * a + n * o;
    }
  };
}
const Ws = /* @__PURE__ */ new B(), zr = /* @__PURE__ */ new Pa(), Hr = /* @__PURE__ */ new Pa(), Vr = /* @__PURE__ */ new Pa();
class El extends xn {
  constructor(e = [], t = !1, n = "centripetal", i = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = i;
  }
  getPoint(e, t = new B()) {
    const n = t, i = this.points, s = i.length, a = (s - (this.closed ? 0 : 1)) * e;
    let o = Math.floor(a), c = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : c === 0 && o === s - 1 && (o = s - 2, c = 1);
    let l, h;
    this.closed || o > 0 ? l = i[(o - 1) % s] : (Ws.subVectors(i[0], i[1]).add(i[0]), l = Ws);
    const u = i[o % s], d = i[(o + 1) % s];
    if (this.closed || o + 2 < s ? h = i[(o + 2) % s] : (Ws.subVectors(i[s - 1], i[s - 2]).add(i[s - 1]), h = Ws), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(l.distanceToSquared(u), f), p = Math.pow(u.distanceToSquared(d), f), A = Math.pow(d.distanceToSquared(h), f);
      p < 1e-4 && (p = 1), g < 1e-4 && (g = p), A < 1e-4 && (A = p), zr.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, g, p, A), Hr.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, g, p, A), Vr.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, g, p, A);
    } else
      this.curveType === "catmullrom" && (zr.initCatmullRom(l.x, u.x, d.x, h.x, this.tension), Hr.initCatmullRom(l.y, u.y, d.y, h.y, this.tension), Vr.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
    return n.set(
      zr.calc(c),
      Hr.calc(c),
      Vr.calc(c)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(i.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const i = this.points[t];
      e.points.push(i.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(new B().fromArray(i));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
}
function pc(r, e, t, n, i) {
  const s = (n - e) * 0.5, a = (i - t) * 0.5, o = r * r, c = r * o;
  return (2 * t - 2 * n + s + a) * c + (-3 * t + 3 * n - 2 * s - a) * o + s * r + t;
}
function tg(r, e) {
  const t = 1 - r;
  return t * t * e;
}
function ng(r, e) {
  return 2 * (1 - r) * r * e;
}
function ig(r, e) {
  return r * r * e;
}
function as(r, e, t, n) {
  return tg(r, e) + ng(r, t) + ig(r, n);
}
function sg(r, e) {
  const t = 1 - r;
  return t * t * t * e;
}
function rg(r, e) {
  const t = 1 - r;
  return 3 * t * t * r * e;
}
function ag(r, e) {
  return 3 * (1 - r) * r * r * e;
}
function og(r, e) {
  return r * r * r * e;
}
function os(r, e, t, n, i) {
  return sg(r, e) + rg(r, t) + ag(r, n) + og(r, i);
}
class cg extends xn {
  constructor(e = new fe(), t = new fe(), n = new fe(), i = new fe()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new fe()) {
    const n = t, i = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      os(e, i.x, s.x, a.x, o.x),
      os(e, i.y, s.y, a.y, o.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class lg extends xn {
  constructor(e = new B(), t = new B(), n = new B(), i = new B()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = i;
  }
  getPoint(e, t = new B()) {
    const n = t, i = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      os(e, i.x, s.x, a.x, o.x),
      os(e, i.y, s.y, a.y, o.y),
      os(e, i.z, s.z, a.z, o.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class hg extends xn {
  constructor(e = new fe(), t = new fe()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new fe()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t) {
    const n = t || new fe();
    return n.copy(this.v2).sub(this.v1).normalize(), n;
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class ug extends xn {
  constructor(e = new B(), t = new B()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new B()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class dg extends xn {
  constructor(e = new fe(), t = new fe(), n = new fe()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new fe()) {
    const n = t, i = this.v0, s = this.v1, a = this.v2;
    return n.set(
      as(e, i.x, s.x, a.x),
      as(e, i.y, s.y, a.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Il extends xn {
  constructor(e = new B(), t = new B(), n = new B()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new B()) {
    const n = t, i = this.v0, s = this.v1, a = this.v2;
    return n.set(
      as(e, i.x, s.x, a.x),
      as(e, i.y, s.y, a.y),
      as(e, i.z, s.z, a.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Ag extends xn {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new fe()) {
    const n = t, i = this.points, s = (i.length - 1) * e, a = Math.floor(s), o = s - a, c = i[a === 0 ? a : a - 1], l = i[a], h = i[a > i.length - 2 ? i.length - 1 : a + 1], u = i[a > i.length - 3 ? i.length - 1 : a + 2];
    return n.set(
      pc(o, c.x, l.x, h.x, u.x),
      pc(o, c.y, l.y, h.y, u.y)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(i.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const i = this.points[t];
      e.points.push(i.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const i = e.points[t];
      this.points.push(new fe().fromArray(i));
    }
    return this;
  }
}
var fg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: eg,
  CatmullRomCurve3: El,
  CubicBezierCurve: cg,
  CubicBezierCurve3: lg,
  EllipseCurve: xl,
  LineCurve: hg,
  LineCurve3: ug,
  QuadraticBezierCurve: dg,
  QuadraticBezierCurve3: Il,
  SplineCurve: Ag
});
class Je extends _t {
  constructor(e = 1, t = 1, n = 1, i = 32, s = 1, a = !1, o = 0, c = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: n,
      radialSegments: i,
      heightSegments: s,
      openEnded: a,
      thetaStart: o,
      thetaLength: c
    };
    const l = this;
    i = Math.floor(i), s = Math.floor(s);
    const h = [], u = [], d = [], f = [];
    let g = 0;
    const p = [], A = n / 2;
    let m = 0;
    E(), a === !1 && (e > 0 && b(!0), t > 0 && b(!1)), this.setIndex(h), this.setAttribute("position", new Xe(u, 3)), this.setAttribute("normal", new Xe(d, 3)), this.setAttribute("uv", new Xe(f, 2));
    function E() {
      const _ = new B(), I = new B();
      let w = 0;
      const T = (t - e) / n;
      for (let x = 0; x <= s; x++) {
        const y = [], D = x / s, P = D * (t - e) + e;
        for (let q = 0; q <= i; q++) {
          const F = q / i, Q = F * c + o, H = Math.sin(Q), ne = Math.cos(Q);
          I.x = P * H, I.y = -D * n + A, I.z = P * ne, u.push(I.x, I.y, I.z), _.set(H, T, ne).normalize(), d.push(_.x, _.y, _.z), f.push(F, 1 - D), y.push(g++);
        }
        p.push(y);
      }
      for (let x = 0; x < i; x++)
        for (let y = 0; y < s; y++) {
          const D = p[y][x], P = p[y + 1][x], q = p[y + 1][x + 1], F = p[y][x + 1];
          h.push(D, P, F), h.push(P, q, F), w += 6;
        }
      l.addGroup(m, w, 0), m += w;
    }
    function b(_) {
      const I = g, w = new fe(), T = new B();
      let x = 0;
      const y = _ === !0 ? e : t, D = _ === !0 ? 1 : -1;
      for (let q = 1; q <= i; q++)
        u.push(0, A * D, 0), d.push(0, D, 0), f.push(0.5, 0.5), g++;
      const P = g;
      for (let q = 0; q <= i; q++) {
        const Q = q / i * c + o, H = Math.cos(Q), ne = Math.sin(Q);
        T.x = y * ne, T.y = A * D, T.z = y * H, u.push(T.x, T.y, T.z), d.push(0, D, 0), w.x = H * 0.5 + 0.5, w.y = ne * 0.5 * D + 0.5, f.push(w.x, w.y), g++;
      }
      for (let q = 0; q < i; q++) {
        const F = I + q, Q = P + q;
        _ === !0 ? h.push(Q, Q + 1, F) : h.push(Q + 1, Q, F), x += 3;
      }
      l.addGroup(m, x, _ === !0 ? 1 : 2), m += x;
    }
  }
  static fromJSON(e) {
    return new Je(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class Fa extends _t {
  constructor(e = 0.5, t = 1, n = 32, i = 1, s = 0, a = Math.PI * 2) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: e,
      outerRadius: t,
      thetaSegments: n,
      phiSegments: i,
      thetaStart: s,
      thetaLength: a
    }, n = Math.max(3, n), i = Math.max(1, i);
    const o = [], c = [], l = [], h = [];
    let u = e;
    const d = (t - e) / i, f = new B(), g = new fe();
    for (let p = 0; p <= i; p++) {
      for (let A = 0; A <= n; A++) {
        const m = s + A / n * a;
        f.x = u * Math.cos(m), f.y = u * Math.sin(m), c.push(f.x, f.y, f.z), l.push(0, 0, 1), g.x = (f.x / t + 1) / 2, g.y = (f.y / t + 1) / 2, h.push(g.x, g.y);
      }
      u += d;
    }
    for (let p = 0; p < i; p++) {
      const A = p * (n + 1);
      for (let m = 0; m < n; m++) {
        const E = m + A, b = E, _ = E + n + 1, I = E + n + 2, w = E + 1;
        o.push(b, _, w), o.push(_, I, w);
      }
    }
    this.setIndex(o), this.setAttribute("position", new Xe(c, 3)), this.setAttribute("normal", new Xe(l, 3)), this.setAttribute("uv", new Xe(h, 2));
  }
  static fromJSON(e) {
    return new Fa(e.innerRadius, e.outerRadius, e.thetaSegments, e.phiSegments, e.thetaStart, e.thetaLength);
  }
}
class tr extends _t {
  constructor(e = 1, t = 32, n = 16, i = 0, s = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: i,
      phiLength: s,
      thetaStart: a,
      thetaLength: o
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const c = Math.min(a + o, Math.PI);
    let l = 0;
    const h = [], u = new B(), d = new B(), f = [], g = [], p = [], A = [];
    for (let m = 0; m <= n; m++) {
      const E = [], b = m / n;
      let _ = 0;
      m == 0 && a == 0 ? _ = 0.5 / t : m == n && c == Math.PI && (_ = -0.5 / t);
      for (let I = 0; I <= t; I++) {
        const w = I / t;
        u.x = -e * Math.cos(i + w * s) * Math.sin(a + b * o), u.y = e * Math.cos(a + b * o), u.z = e * Math.sin(i + w * s) * Math.sin(a + b * o), g.push(u.x, u.y, u.z), d.copy(u).normalize(), p.push(d.x, d.y, d.z), A.push(w + _, 1 - b), E.push(l++);
      }
      h.push(E);
    }
    for (let m = 0; m < n; m++)
      for (let E = 0; E < t; E++) {
        const b = h[m][E + 1], _ = h[m][E], I = h[m + 1][E], w = h[m + 1][E + 1];
        (m !== 0 || a > 0) && f.push(b, _, w), (m !== n - 1 || c < Math.PI) && f.push(_, I, w);
      }
    this.setIndex(f), this.setAttribute("position", new Xe(g, 3)), this.setAttribute("normal", new Xe(p, 3)), this.setAttribute("uv", new Xe(A, 2));
  }
  static fromJSON(e) {
    return new tr(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class cs extends _t {
  constructor(e = 1, t = 0.4, n = 12, i = 48, s = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: e,
      tube: t,
      radialSegments: n,
      tubularSegments: i,
      arc: s
    }, n = Math.floor(n), i = Math.floor(i);
    const a = [], o = [], c = [], l = [], h = new B(), u = new B(), d = new B();
    for (let f = 0; f <= n; f++)
      for (let g = 0; g <= i; g++) {
        const p = g / i * s, A = f / n * Math.PI * 2;
        u.x = (e + t * Math.cos(A)) * Math.cos(p), u.y = (e + t * Math.cos(A)) * Math.sin(p), u.z = t * Math.sin(A), o.push(u.x, u.y, u.z), h.x = e * Math.cos(p), h.y = e * Math.sin(p), d.subVectors(u, h).normalize(), c.push(d.x, d.y, d.z), l.push(g / i), l.push(f / n);
      }
    for (let f = 1; f <= n; f++)
      for (let g = 1; g <= i; g++) {
        const p = (i + 1) * f + g - 1, A = (i + 1) * (f - 1) + g - 1, m = (i + 1) * (f - 1) + g, E = (i + 1) * f + g;
        a.push(p, A, E), a.push(A, m, E);
      }
    this.setIndex(a), this.setAttribute("position", new Xe(o, 3)), this.setAttribute("normal", new Xe(c, 3)), this.setAttribute("uv", new Xe(l, 2));
  }
  static fromJSON(e) {
    return new cs(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
  }
}
class ka extends _t {
  constructor(e = new Il(new B(-1, -1, 0), new B(-1, 1, 0), new B(1, 1, 0)), t = 64, n = 1, i = 8, s = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: e,
      tubularSegments: t,
      radius: n,
      radialSegments: i,
      closed: s
    };
    const a = e.computeFrenetFrames(t, s);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    const o = new B(), c = new B(), l = new fe();
    let h = new B();
    const u = [], d = [], f = [], g = [];
    p(), this.setIndex(g), this.setAttribute("position", new Xe(u, 3)), this.setAttribute("normal", new Xe(d, 3)), this.setAttribute("uv", new Xe(f, 2));
    function p() {
      for (let b = 0; b < t; b++)
        A(b);
      A(s === !1 ? t : 0), E(), m();
    }
    function A(b) {
      h = e.getPointAt(b / t, h);
      const _ = a.normals[b], I = a.binormals[b];
      for (let w = 0; w <= i; w++) {
        const T = w / i * Math.PI * 2, x = Math.sin(T), y = -Math.cos(T);
        c.x = y * _.x + x * I.x, c.y = y * _.y + x * I.y, c.z = y * _.z + x * I.z, c.normalize(), d.push(c.x, c.y, c.z), o.x = h.x + n * c.x, o.y = h.y + n * c.y, o.z = h.z + n * c.z, u.push(o.x, o.y, o.z);
      }
    }
    function m() {
      for (let b = 1; b <= t; b++)
        for (let _ = 1; _ <= i; _++) {
          const I = (i + 1) * (b - 1) + (_ - 1), w = (i + 1) * b + (_ - 1), T = (i + 1) * b + _, x = (i + 1) * (b - 1) + _;
          g.push(I, w, x), g.push(w, T, x);
        }
    }
    function E() {
      for (let b = 0; b <= t; b++)
        for (let _ = 0; _ <= i; _++)
          l.x = b / t, l.y = _ / i, f.push(l.x, l.y);
    }
  }
  toJSON() {
    const e = super.toJSON();
    return e.path = this.parameters.path.toJSON(), e;
  }
  static fromJSON(e) {
    return new ka(
      new fg[e.path.type]().fromJSON(e.path),
      e.tubularSegments,
      e.radius,
      e.radialSegments,
      e.closed
    );
  }
}
class mt extends Kt {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new we(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new we(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Yc, this.normalScale = new fe(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Xn extends mt {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new fe(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return lt(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(t) {
        this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new we(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new we(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new we(1, 1, 1), this.specularColorMap = null, this._sheen = 0, this._clearcoat = 0, this._iridescence = 0, this._transmission = 0, this.setValues(e);
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
function wn(r, e, t) {
  return Cl(r) ? new r.constructor(r.subarray(e, t !== void 0 ? t : r.length)) : r.slice(e, t);
}
function qs(r, e, t) {
  return !r || !t && r.constructor === e ? r : typeof e.BYTES_PER_ELEMENT == "number" ? new e(r) : Array.prototype.slice.call(r);
}
function Cl(r) {
  return ArrayBuffer.isView(r) && !(r instanceof DataView);
}
function pg(r) {
  function e(i, s) {
    return r[i] - r[s];
  }
  const t = r.length, n = new Array(t);
  for (let i = 0; i !== t; ++i)
    n[i] = i;
  return n.sort(e), n;
}
function gc(r, e, t) {
  const n = r.length, i = new r.constructor(n);
  for (let s = 0, a = 0; a !== n; ++s) {
    const o = t[s] * e;
    for (let c = 0; c !== e; ++c)
      i[a++] = r[o + c];
  }
  return i;
}
function yl(r, e, t, n) {
  let i = 1, s = r[0];
  for (; s !== void 0 && s[n] === void 0; )
    s = r[i++];
  if (s === void 0)
    return;
  let a = s[n];
  if (a !== void 0)
    if (Array.isArray(a))
      do
        a = s[n], a !== void 0 && (e.push(s.time), t.push.apply(t, a)), s = r[i++];
      while (s !== void 0);
    else if (a.toArray !== void 0)
      do
        a = s[n], a !== void 0 && (e.push(s.time), a.toArray(t, t.length)), s = r[i++];
      while (s !== void 0);
    else
      do
        a = s[n], a !== void 0 && (e.push(s.time), t.push(a)), s = r[i++];
      while (s !== void 0);
}
class ms {
  constructor(e, t, n, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, i = t[n], s = t[n - 1];
    n: {
      e: {
        let a;
        t: {
          i:
            if (!(e < i)) {
              for (let o = n + 2; ; ) {
                if (i === void 0) {
                  if (e < s)
                    break i;
                  return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
                }
                if (n === o)
                  break;
                if (s = i, i = t[++n], e < i)
                  break e;
              }
              a = t.length;
              break t;
            }
          if (!(e >= s)) {
            const o = t[1];
            e < o && (n = 2, s = o);
            for (let c = n - 2; ; ) {
              if (s === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === c)
                break;
              if (i = s, s = t[--n - 1], e >= s)
                break e;
            }
            a = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < a; ) {
          const o = n + a >>> 1;
          e < t[o] ? a = o : n = o + 1;
        }
        if (i = t[n], s = t[n - 1], s === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, s, i);
    }
    return this.interpolate_(n, s, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, s = e * i;
    for (let a = 0; a !== i; ++a)
      t[a] = n[s + a];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}
class gg extends ms {
  constructor(e, t, n, i) {
    super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: fo,
      endingEnd: fo
    };
  }
  intervalChanged_(e, t, n) {
    const i = this.parameterPositions;
    let s = e - 2, a = e + 1, o = i[s], c = i[a];
    if (o === void 0)
      switch (this.getSettings_().endingStart) {
        case po:
          s = e, o = 2 * t - n;
          break;
        case go:
          s = i.length - 2, o = t + i[s] - i[s + 1];
          break;
        default:
          s = e, o = n;
      }
    if (c === void 0)
      switch (this.getSettings_().endingEnd) {
        case po:
          a = e, c = 2 * n - t;
          break;
        case go:
          a = 1, c = n + i[1] - i[0];
          break;
        default:
          a = e - 1, c = t;
      }
    const l = (n - t) * 0.5, h = this.valueSize;
    this._weightPrev = l / (t - o), this._weightNext = l / (c - n), this._offsetPrev = s * h, this._offsetNext = a * h;
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = e * o, l = c - o, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, g = (n - t) / (i - t), p = g * g, A = p * g, m = -d * A + 2 * d * p - d * g, E = (1 + d) * A + (-1.5 - 2 * d) * p + (-0.5 + d) * g + 1, b = (-1 - f) * A + (1.5 + f) * p + 0.5 * g, _ = f * A - f * p;
    for (let I = 0; I !== o; ++I)
      s[I] = m * a[h + I] + E * a[l + I] + b * a[c + I] + _ * a[u + I];
    return s;
  }
}
class mg extends ms {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = e * o, l = c - o, h = (n - t) / (i - t), u = 1 - h;
    for (let d = 0; d !== o; ++d)
      s[d] = a[l + d] * u + a[c + d] * h;
    return s;
  }
}
class bg extends ms {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class sn {
  constructor(e, t, n, i) {
    if (e === void 0)
      throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0)
      throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = qs(t, this.TimeBufferType), this.values = qs(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON)
      n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: qs(e.times, Array),
        values: qs(e.values, Array)
      };
      const i = e.getInterpolation();
      i !== e.DefaultInterpolation && (n.interpolation = i);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new bg(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new mg(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new gg(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case hs:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Bi:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case fr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (t === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0)
        if (e !== this.DefaultInterpolation)
          this.setInterpolation(this.DefaultInterpolation);
        else
          throw new Error(n);
      return console.warn("THREE.KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return hs;
      case this.InterpolantFactoryMethodLinear:
        return Bi;
      case this.InterpolantFactoryMethodSmooth:
        return fr;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n)
        t[n] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n)
        t[n] *= e;
    }
    return this;
  }
  trim(e, t) {
    const n = this.times, i = n.length;
    let s = 0, a = i - 1;
    for (; s !== i && n[s] < e; )
      ++s;
    for (; a !== -1 && n[a] > t; )
      --a;
    if (++a, s !== 0 || a !== i) {
      s >= a && (a = Math.max(a, 1), s = a - 1);
      const o = this.getValueSize();
      this.times = wn(n, s, a), this.values = wn(this.values, s * o, a * o);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, i = this.values, s = n.length;
    s === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
    let a = null;
    for (let o = 0; o !== s; o++) {
      const c = n[o];
      if (typeof c == "number" && isNaN(c)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, o, c), e = !1;
        break;
      }
      if (a !== null && a > c) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, o, c, a), e = !1;
        break;
      }
      a = c;
    }
    if (i !== void 0 && Cl(i))
      for (let o = 0, c = i.length; o !== c; ++o) {
        const l = i[o];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, o, l), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = wn(this.times), t = wn(this.values), n = this.getValueSize(), i = this.getInterpolation() === fr, s = e.length - 1;
    let a = 1;
    for (let o = 1; o < s; ++o) {
      let c = !1;
      const l = e[o], h = e[o + 1];
      if (l !== h && (o !== 1 || l !== e[0]))
        if (i)
          c = !0;
        else {
          const u = o * n, d = u - n, f = u + n;
          for (let g = 0; g !== n; ++g) {
            const p = t[u + g];
            if (p !== t[d + g] || p !== t[f + g]) {
              c = !0;
              break;
            }
          }
        }
      if (c) {
        if (o !== a) {
          e[a] = e[o];
          const u = o * n, d = a * n;
          for (let f = 0; f !== n; ++f)
            t[d + f] = t[u + f];
        }
        ++a;
      }
    }
    if (s > 0) {
      e[a] = e[s];
      for (let o = s * n, c = a * n, l = 0; l !== n; ++l)
        t[c + l] = t[o + l];
      ++a;
    }
    return a !== e.length ? (this.times = wn(e, 0, a), this.values = wn(t, 0, a * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = wn(this.times, 0), t = wn(this.values, 0), n = this.constructor, i = new n(this.name, e, t);
    return i.createInterpolant = this.createInterpolant, i;
  }
}
sn.prototype.TimeBufferType = Float32Array;
sn.prototype.ValueBufferType = Float32Array;
sn.prototype.DefaultInterpolation = Bi;
class Pi extends sn {
}
Pi.prototype.ValueTypeName = "bool";
Pi.prototype.ValueBufferType = Array;
Pi.prototype.DefaultInterpolation = hs;
Pi.prototype.InterpolantFactoryMethodLinear = void 0;
Pi.prototype.InterpolantFactoryMethodSmooth = void 0;
class vl extends sn {
}
vl.prototype.ValueTypeName = "color";
class ps extends sn {
}
ps.prototype.ValueTypeName = "number";
class _g extends ms {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = (n - t) / (i - t);
    let l = e * o;
    for (let h = l + o; l !== h; l += 4)
      nn.slerpFlat(s, 0, a, l - o, a, l, c);
    return s;
  }
}
class Kn extends sn {
  InterpolantFactoryMethodLinear(e) {
    return new _g(this.times, this.values, this.getValueSize(), e);
  }
}
Kn.prototype.ValueTypeName = "quaternion";
Kn.prototype.DefaultInterpolation = Bi;
Kn.prototype.InterpolantFactoryMethodSmooth = void 0;
class Fi extends sn {
}
Fi.prototype.ValueTypeName = "string";
Fi.prototype.ValueBufferType = Array;
Fi.prototype.DefaultInterpolation = hs;
Fi.prototype.InterpolantFactoryMethodLinear = void 0;
Fi.prototype.InterpolantFactoryMethodSmooth = void 0;
class gs extends sn {
}
gs.prototype.ValueTypeName = "vector";
class xg {
  constructor(e, t = -1, n, i = vh) {
    this.name = e, this.tracks = n, this.duration = t, this.blendMode = i, this.uuid = Jt(), this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [], n = e.tracks, i = 1 / (e.fps || 1);
    for (let a = 0, o = n.length; a !== o; ++a)
      t.push(Ig(n[a]).scale(i));
    const s = new this(e.name, e.duration, t, e.blendMode);
    return s.uuid = e.uuid, s;
  }
  static toJSON(e) {
    const t = [], n = e.tracks, i = {
      name: e.name,
      duration: e.duration,
      tracks: t,
      uuid: e.uuid,
      blendMode: e.blendMode
    };
    for (let s = 0, a = n.length; s !== a; ++s)
      t.push(sn.toJSON(n[s]));
    return i;
  }
  static CreateFromMorphTargetSequence(e, t, n, i) {
    const s = t.length, a = [];
    for (let o = 0; o < s; o++) {
      let c = [], l = [];
      c.push(
        (o + s - 1) % s,
        o,
        (o + 1) % s
      ), l.push(0, 1, 0);
      const h = pg(c);
      c = gc(c, 1, h), l = gc(l, 1, h), !i && c[0] === 0 && (c.push(s), l.push(l[0])), a.push(
        new ps(
          ".morphTargetInfluences[" + t[o].name + "]",
          c,
          l
        ).scale(1 / n)
      );
    }
    return new this(e, -1, a);
  }
  static findByName(e, t) {
    let n = e;
    if (!Array.isArray(e)) {
      const i = e;
      n = i.geometry && i.geometry.animations || i.animations;
    }
    for (let i = 0; i < n.length; i++)
      if (n[i].name === t)
        return n[i];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, n) {
    const i = {}, s = /^([\w-]*?)([\d]+)$/;
    for (let o = 0, c = e.length; o < c; o++) {
      const l = e[o], h = l.name.match(s);
      if (h && h.length > 1) {
        const u = h[1];
        let d = i[u];
        d || (i[u] = d = []), d.push(l);
      }
    }
    const a = [];
    for (const o in i)
      a.push(this.CreateFromMorphTargetSequence(o, i[o], t, n));
    return a;
  }
  static parseAnimation(e, t) {
    if (!e)
      return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
    const n = function(u, d, f, g, p) {
      if (f.length !== 0) {
        const A = [], m = [];
        yl(f, A, m, g), A.length !== 0 && p.push(new u(d, A, m));
      }
    }, i = [], s = e.name || "default", a = e.fps || 30, o = e.blendMode;
    let c = e.length || -1;
    const l = e.hierarchy || [];
    for (let u = 0; u < l.length; u++) {
      const d = l[u].keys;
      if (!(!d || d.length === 0))
        if (d[0].morphTargets) {
          const f = {};
          let g;
          for (g = 0; g < d.length; g++)
            if (d[g].morphTargets)
              for (let p = 0; p < d[g].morphTargets.length; p++)
                f[d[g].morphTargets[p]] = -1;
          for (const p in f) {
            const A = [], m = [];
            for (let E = 0; E !== d[g].morphTargets.length; ++E) {
              const b = d[g];
              A.push(b.time), m.push(b.morphTarget === p ? 1 : 0);
            }
            i.push(new ps(".morphTargetInfluence[" + p + "]", A, m));
          }
          c = f.length * a;
        } else {
          const f = ".bones[" + t[u].name + "]";
          n(
            gs,
            f + ".position",
            d,
            "pos",
            i
          ), n(
            Kn,
            f + ".quaternion",
            d,
            "rot",
            i
          ), n(
            gs,
            f + ".scale",
            d,
            "scl",
            i
          );
        }
    }
    return i.length === 0 ? null : new this(s, c, i, o);
  }
  resetDuration() {
    const e = this.tracks;
    let t = 0;
    for (let n = 0, i = e.length; n !== i; ++n) {
      const s = this.tracks[n];
      t = Math.max(t, s.times[s.times.length - 1]);
    }
    return this.duration = t, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++)
      e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++)
      e.push(this.tracks[t].clone());
    return new this.constructor(this.name, this.duration, e, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function Eg(r) {
  switch (r.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return ps;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return gs;
    case "color":
      return vl;
    case "quaternion":
      return Kn;
    case "bool":
    case "boolean":
      return Pi;
    case "string":
      return Fi;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + r);
}
function Ig(r) {
  if (r.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const e = Eg(r.type);
  if (r.times === void 0) {
    const t = [], n = [];
    yl(r.keys, t, n, "value"), r.times = t, r.values = n;
  }
  return e.parse !== void 0 ? e.parse(r) : new e(r.name, r.times, r.values, r.interpolation);
}
const Di = {
  enabled: !1,
  files: {},
  add: function(r, e) {
    this.enabled !== !1 && (this.files[r] = e);
  },
  get: function(r) {
    if (this.enabled !== !1)
      return this.files[r];
  },
  remove: function(r) {
    delete this.files[r];
  },
  clear: function() {
    this.files = {};
  }
};
class wl {
  constructor(e, t, n) {
    const i = this;
    let s = !1, a = 0, o = 0, c;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function(h) {
      o++, s === !1 && i.onStart !== void 0 && i.onStart(h, a, o), s = !0;
    }, this.itemEnd = function(h) {
      a++, i.onProgress !== void 0 && i.onProgress(h, a, o), a === o && (s = !1, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(h) {
      i.onError !== void 0 && i.onError(h);
    }, this.resolveURL = function(h) {
      return c ? c(h) : h;
    }, this.setURLModifier = function(h) {
      return c = h, this;
    }, this.addHandler = function(h, u) {
      return l.push(h, u), this;
    }, this.removeHandler = function(h) {
      const u = l.indexOf(h);
      return u !== -1 && l.splice(u, 2), this;
    }, this.getHandler = function(h) {
      for (let u = 0, d = l.length; u < d; u += 2) {
        const f = l[u], g = l[u + 1];
        if (f.global && (f.lastIndex = 0), f.test(h))
          return g;
      }
      return null;
    };
  }
}
const Cg = /* @__PURE__ */ new wl();
class En {
  constructor(e) {
    this.manager = e !== void 0 ? e : Cg, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(i, s) {
      n.load(e, i, t, s);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
}
const un = {};
class yg extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class Tn extends En {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = Di.get(e);
    if (s !== void 0)
      return this.manager.itemStart(e), setTimeout(() => {
        t && t(s), this.manager.itemEnd(e);
      }, 0), s;
    if (un[e] !== void 0) {
      un[e].push({
        onLoad: t,
        onProgress: n,
        onError: i
      });
      return;
    }
    un[e] = [], un[e].push({
      onLoad: t,
      onProgress: n,
      onError: i
    });
    const a = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
    }), o = this.mimeType, c = this.responseType;
    fetch(a).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0)
          return l;
        const h = un[e], u = l.body.getReader(), d = l.headers.get("Content-Length") || l.headers.get("X-File-Size"), f = d ? parseInt(d) : 0, g = f !== 0;
        let p = 0;
        const A = new ReadableStream({
          start(m) {
            E();
            function E() {
              u.read().then(({ done: b, value: _ }) => {
                if (b)
                  m.close();
                else {
                  p += _.byteLength;
                  const I = new ProgressEvent("progress", { lengthComputable: g, loaded: p, total: f });
                  for (let w = 0, T = h.length; w < T; w++) {
                    const x = h[w];
                    x.onProgress && x.onProgress(I);
                  }
                  m.enqueue(_), E();
                }
              });
            }
          }
        });
        return new Response(A);
      } else
        throw new yg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
    }).then((l) => {
      switch (c) {
        case "arraybuffer":
          return l.arrayBuffer();
        case "blob":
          return l.blob();
        case "document":
          return l.text().then((h) => new DOMParser().parseFromString(h, o));
        case "json":
          return l.json();
        default:
          if (o === void 0)
            return l.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(o), d = u && u[1] ? u[1].toLowerCase() : void 0, f = new TextDecoder(d);
            return l.arrayBuffer().then((g) => f.decode(g));
          }
      }
    }).then((l) => {
      Di.add(e, l);
      const h = un[e];
      delete un[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onLoad && f.onLoad(l);
      }
    }).catch((l) => {
      const h = un[e];
      if (h === void 0)
        throw this.manager.itemError(e), l;
      delete un[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onError && f.onError(l);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
}
class Ml extends En {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, a = Di.get(e);
    if (a !== void 0)
      return s.manager.itemStart(e), setTimeout(function() {
        t && t(a), s.manager.itemEnd(e);
      }, 0), a;
    const o = As("img");
    function c() {
      h(), Di.add(e, this), t && t(this), s.manager.itemEnd(e);
    }
    function l(u) {
      h(), i && i(u), s.manager.itemError(e), s.manager.itemEnd(e);
    }
    function h() {
      o.removeEventListener("load", c, !1), o.removeEventListener("error", l, !1);
    }
    return o.addEventListener("load", c, !1), o.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), s.manager.itemStart(e), o.src = e, o;
  }
}
class vg extends En {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const s = new Sa(), a = new Ml(this.manager);
    a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
    let o = 0;
    function c(l) {
      a.load(e[l], function(h) {
        s.images[l] = h, o++, o === 6 && (s.needsUpdate = !0, t && t(s));
      }, void 0, i);
    }
    for (let l = 0; l < e.length; ++l)
      c(l);
    return s;
  }
}
class wg extends En {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const s = this, a = new Ra(), o = new Tn(this.manager);
    return o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setPath(this.path), o.setWithCredentials(s.withCredentials), o.load(e, function(c) {
      const l = s.parse(c);
      l && (l.image !== void 0 ? a.image = l.image : l.data !== void 0 && (a.image.width = l.width, a.image.height = l.height, a.image.data = l.data), a.wrapS = l.wrapS !== void 0 ? l.wrapS : Et, a.wrapT = l.wrapT !== void 0 ? l.wrapT : Et, a.magFilter = l.magFilter !== void 0 ? l.magFilter : nt, a.minFilter = l.minFilter !== void 0 ? l.minFilter : nt, a.anisotropy = l.anisotropy !== void 0 ? l.anisotropy : 1, l.encoding !== void 0 && (a.encoding = l.encoding), l.flipY !== void 0 && (a.flipY = l.flipY), l.format !== void 0 && (a.format = l.format), l.type !== void 0 && (a.type = l.type), l.mipmaps !== void 0 && (a.mipmaps = l.mipmaps, a.minFilter = bn), l.mipmapCount === 1 && (a.minFilter = nt), l.generateMipmaps !== void 0 && (a.generateMipmaps = l.generateMipmaps), a.needsUpdate = !0, t && t(a, l));
    }, n, i), a;
  }
}
class Ii extends En {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const s = new ht(), a = new Ml(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(o) {
      s.image = o, s.needsUpdate = !0, t !== void 0 && t(s);
    }, n, i), s;
  }
}
class ar extends Ke {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new we(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), t;
  }
}
const Wr = /* @__PURE__ */ new Re(), mc = /* @__PURE__ */ new B(), bc = /* @__PURE__ */ new B();
class Na {
  constructor(e) {
    this.camera = e, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new fe(512, 512), this.map = null, this.mapPass = null, this.matrix = new Re(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ba(), this._frameExtents = new fe(1, 1), this._viewportCount = 1, this._viewports = [
      new je(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    mc.setFromMatrixPosition(e.matrixWorld), t.position.copy(mc), bc.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(bc), t.updateMatrixWorld(), Wr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Wr), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(Wr);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class Mg extends Na {
  constructor() {
    super(new Dt(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(e) {
    const t = this.camera, n = ds * 2 * e.angle * this.focus, i = this.mapSize.width / this.mapSize.height, s = e.distance || t.far;
    (n !== t.fov || i !== t.aspect || s !== t.far) && (t.fov = n, t.aspect = i, t.far = s, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class Sg extends ar {
  constructor(e, t, n = 0, i = Math.PI / 3, s = 0, a = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(Ke.DefaultUp), this.updateMatrix(), this.target = new Ke(), this.distance = n, this.angle = i, this.penumbra = s, this.decay = a, this.map = null, this.shadow = new Mg();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
const _c = /* @__PURE__ */ new Re(), Ki = /* @__PURE__ */ new B(), qr = /* @__PURE__ */ new B();
class Bg extends Na {
  constructor() {
    super(new Dt(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new fe(4, 2), this._viewportCount = 6, this._viewports = [
      new je(2, 1, 1, 1),
      new je(0, 1, 1, 1),
      new je(3, 1, 1, 1),
      new je(1, 1, 1, 1),
      new je(3, 0, 1, 1),
      new je(1, 0, 1, 1)
    ], this._cubeDirections = [
      new B(1, 0, 0),
      new B(-1, 0, 0),
      new B(0, 0, 1),
      new B(0, 0, -1),
      new B(0, 1, 0),
      new B(0, -1, 0)
    ], this._cubeUps = [
      new B(0, 1, 0),
      new B(0, 1, 0),
      new B(0, 1, 0),
      new B(0, 1, 0),
      new B(0, 0, 1),
      new B(0, 0, -1)
    ];
  }
  updateMatrices(e, t = 0) {
    const n = this.camera, i = this.matrix, s = e.distance || n.far;
    s !== n.far && (n.far = s, n.updateProjectionMatrix()), Ki.setFromMatrixPosition(e.matrixWorld), n.position.copy(Ki), qr.copy(n.position), qr.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(qr), n.updateMatrixWorld(), i.makeTranslation(-Ki.x, -Ki.y, -Ki.z), _c.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_c);
  }
}
class dn extends ar {
  constructor(e, t, n = 0, i = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = i, this.shadow = new Bg();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
}
class Tg extends Na {
  constructor() {
    super(new Ta(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class xa extends ar {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Ke.DefaultUp), this.updateMatrix(), this.target = new Ke(), this.shadow = new Tg();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class xc extends ar {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class Yn {
  static decodeText(e) {
    if (typeof TextDecoder < "u")
      return new TextDecoder().decode(e);
    let t = "";
    for (let n = 0, i = e.length; n < i; n++)
      t += String.fromCharCode(e[n]);
    try {
      return decodeURIComponent(escape(t));
    } catch {
      return t;
    }
  }
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class Dg extends En {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, n, i) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, a = Di.get(e);
    if (a !== void 0)
      return s.manager.itemStart(e), setTimeout(function() {
        t && t(a), s.manager.itemEnd(e);
      }, 0), a;
    const o = {};
    o.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", o.headers = this.requestHeader, fetch(e, o).then(function(c) {
      return c.blob();
    }).then(function(c) {
      return createImageBitmap(c, Object.assign(s.options, { colorSpaceConversion: "none" }));
    }).then(function(c) {
      Di.add(e, c), t && t(c), s.manager.itemEnd(e);
    }).catch(function(c) {
      i && i(c), s.manager.itemError(e), s.manager.itemEnd(e);
    }), s.manager.itemStart(e);
  }
}
class Rg {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = Ec(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const t = Ec();
      e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e;
    }
    return e;
  }
}
function Ec() {
  return (typeof performance > "u" ? Date : performance).now();
}
const Ga = "\\[\\]\\.:\\/", Lg = new RegExp("[" + Ga + "]", "g"), Ua = "[^" + Ga + "]", Qg = "[^" + Ga.replace("\\.", "") + "]", Pg = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Ua), Fg = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Qg), kg = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Ua), Ng = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Ua), Gg = new RegExp(
  "^" + Pg + Fg + kg + Ng + "$"
), Ug = ["material", "materials", "bones", "map"];
class Og {
  constructor(e, t, n) {
    const i = n || Ve.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
    i !== void 0 && i.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, s = n.length; i !== s; ++i)
      n[i].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].unbind();
  }
}
class Ve {
  constructor(e, t, n) {
    this.path = t, this.parsedPath = n || Ve.parseTrackName(t), this.node = Ve.findNode(e, this.parsedPath.nodeName) || e, this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new Ve.Composite(e, t, n) : new Ve(e, t, n);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(Lg, "");
  }
  static parseTrackName(e) {
    const t = Gg.exec(e);
    if (t === null)
      throw new Error("PropertyBinding: Cannot parse trackName: " + e);
    const n = {
      nodeName: t[2],
      objectName: t[3],
      objectIndex: t[4],
      propertyName: t[5],
      propertyIndex: t[6]
    }, i = n.nodeName && n.nodeName.lastIndexOf(".");
    if (i !== void 0 && i !== -1) {
      const s = n.nodeName.substring(i + 1);
      Ug.indexOf(s) !== -1 && (n.nodeName = n.nodeName.substring(0, i), n.objectName = s);
    }
    if (n.propertyName === null || n.propertyName.length === 0)
      throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
    return n;
  }
  static findNode(e, t) {
    if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid)
      return e;
    if (e.skeleton) {
      const n = e.skeleton.getBoneByName(t);
      if (n !== void 0)
        return n;
    }
    if (e.children) {
      const n = function(s) {
        for (let a = 0; a < s.length; a++) {
          const o = s[a];
          if (o.name === t || o.uuid === t)
            return o;
          const c = n(o.children);
          if (c)
            return c;
        }
        return null;
      }, i = n(e.children);
      if (i)
        return i;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let i = 0, s = n.length; i !== s; ++i)
      e[t++] = n[i];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let i = 0, s = n.length; i !== s; ++i)
      n[i] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let i = 0, s = n.length; i !== s; ++i)
      n[i] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let i = 0, s = n.length; i !== s; ++i)
      n[i] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node;
    const t = this.parsedPath, n = t.objectName, i = t.propertyName;
    let s = t.propertyIndex;
    if (e || (e = Ve.findNode(this.rootNode, t.nodeName) || this.rootNode, this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
      console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
      return;
    }
    if (n) {
      let l = t.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          e = e.skeleton.bones;
          for (let h = 0; h < e.length; h++)
            if (e[h].name === l) {
              l = h;
              break;
            }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          e = e.material.map;
          break;
        default:
          if (e[n] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          e = e[n];
      }
      if (l !== void 0) {
        if (e[l] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
          return;
        }
        e = e[l];
      }
    }
    const a = e[i];
    if (a === void 0) {
      const l = t.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + i + " but it wasn't found.", e);
      return;
    }
    let o = this.Versioning.None;
    this.targetObject = e, e.needsUpdate !== void 0 ? o = this.Versioning.NeedsUpdate : e.matrixWorldNeedsUpdate !== void 0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (s !== void 0) {
      if (i === "morphTargetInfluences") {
        if (!e.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!e.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        e.morphTargetDictionary[s] !== void 0 && (s = e.morphTargetDictionary[s]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = s;
    } else
      a.fromArray !== void 0 && a.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (c = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = i;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][o];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
Ve.Composite = Og;
Ve.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
Ve.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
Ve.prototype.GetterByBindingType = [
  Ve.prototype._getValue_direct,
  Ve.prototype._getValue_array,
  Ve.prototype._getValue_arrayElement,
  Ve.prototype._getValue_toArray
];
Ve.prototype.SetterByBindingTypeAndVersioning = [
  [
    Ve.prototype._setValue_direct,
    Ve.prototype._setValue_direct_setNeedsUpdate,
    Ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    Ve.prototype._setValue_array,
    Ve.prototype._setValue_array_setNeedsUpdate,
    Ve.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    Ve.prototype._setValue_arrayElement,
    Ve.prototype._setValue_arrayElement_setNeedsUpdate,
    Ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    Ve.prototype._setValue_fromArray,
    Ve.prototype._setValue_fromArray_setNeedsUpdate,
    Ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
class zg {
  constructor(e, t, n = 0, i = 1 / 0) {
    this.ray = new ir(e, t), this.near = n, this.far = i, this.camera = null, this.layers = new Ma(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, 0.5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type: " + t.type);
  }
  intersectObject(e, t = !0, n = []) {
    return Ea(e, this, n, t), n.sort(Ic), n;
  }
  intersectObjects(e, t = !0, n = []) {
    for (let i = 0, s = e.length; i < s; i++)
      Ea(e[i], this, n, t);
    return n.sort(Ic), n;
  }
}
function Ic(r, e) {
  return r.distance - e.distance;
}
function Ea(r, e, t, n) {
  if (r.layers.test(e.layers) && r.raycast(e, t), n === !0) {
    const i = r.children;
    for (let s = 0, a = i.length; s < a; s++)
      Ea(i[s], e, t, !0);
  }
}
class Cc {
  constructor(e = 1, t = 0, n = 0) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(lt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const fn = /* @__PURE__ */ Hg();
function Hg() {
  const r = new ArrayBuffer(4), e = new Float32Array(r), t = new Uint32Array(r), n = new Uint32Array(512), i = new Uint32Array(512);
  for (let c = 0; c < 256; ++c) {
    const l = c - 127;
    l < -27 ? (n[c] = 0, n[c | 256] = 32768, i[c] = 24, i[c | 256] = 24) : l < -14 ? (n[c] = 1024 >> -l - 14, n[c | 256] = 1024 >> -l - 14 | 32768, i[c] = -l - 1, i[c | 256] = -l - 1) : l <= 15 ? (n[c] = l + 15 << 10, n[c | 256] = l + 15 << 10 | 32768, i[c] = 13, i[c | 256] = 13) : l < 128 ? (n[c] = 31744, n[c | 256] = 64512, i[c] = 24, i[c | 256] = 24) : (n[c] = 31744, n[c | 256] = 64512, i[c] = 13, i[c | 256] = 13);
  }
  const s = new Uint32Array(2048), a = new Uint32Array(64), o = new Uint32Array(64);
  for (let c = 1; c < 1024; ++c) {
    let l = c << 13, h = 0;
    for (; !(l & 8388608); )
      l <<= 1, h -= 8388608;
    l &= -8388609, h += 947912704, s[c] = l | h;
  }
  for (let c = 1024; c < 2048; ++c)
    s[c] = 939524096 + (c - 1024 << 13);
  for (let c = 1; c < 31; ++c)
    a[c] = c << 23;
  a[31] = 1199570944, a[32] = 2147483648;
  for (let c = 33; c < 63; ++c)
    a[c] = 2147483648 + (c - 32 << 23);
  a[63] = 3347054592;
  for (let c = 1; c < 64; ++c)
    c !== 32 && (o[c] = 1024);
  return {
    floatView: e,
    uint32View: t,
    baseTable: n,
    shiftTable: i,
    mantissaTable: s,
    exponentTable: a,
    offsetTable: o
  };
}
function Vg(r) {
  Math.abs(r) > 65504 && console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."), r = lt(r, -65504, 65504), fn.floatView[0] = r;
  const e = fn.uint32View[0], t = e >> 23 & 511;
  return fn.baseTable[t] + ((e & 8388607) >> fn.shiftTable[t]);
}
function Wg(r) {
  const e = r >> 10;
  return fn.uint32View[0] = fn.mantissaTable[fn.offsetTable[e] + (r & 1023)] + fn.exponentTable[e], fn.floatView[0];
}
var js = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toHalfFloat: Vg,
  fromHalfFloat: Wg
});
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: va
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = va);
const yc = { type: "change" }, jr = { type: "start" }, vc = { type: "end" };
class qg extends _n {
  constructor(e, t) {
    super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new B(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Zn.ROTATE, MIDDLE: Zn.DOLLY, RIGHT: Zn.PAN }, this.touches = { ONE: $n.ROTATE, TWO: $n.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function() {
      return o.phi;
    }, this.getAzimuthalAngle = function() {
      return o.theta;
    }, this.getDistance = function() {
      return this.object.position.distanceTo(this.target);
    }, this.listenToKeyEvents = function(M) {
      M.addEventListener("keydown", rt), this._domElementKeyEvents = M;
    }, this.saveState = function() {
      n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom;
    }, this.reset = function() {
      n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(yc), n.update(), s = i.NONE;
    }, this.update = function() {
      const M = new B(), L = new nn().setFromUnitVectors(e.up, new B(0, 1, 0)), J = L.clone().invert(), G = new B(), Y = new nn(), le = 2 * Math.PI;
      return function() {
        const be = n.object.position;
        M.copy(be).sub(n.target), M.applyQuaternion(L), o.setFromVector3(M), n.autoRotate && s === i.NONE && y(T()), n.enableDamping ? (o.theta += c.theta * n.dampingFactor, o.phi += c.phi * n.dampingFactor) : (o.theta += c.theta, o.phi += c.phi);
        let _e = n.minAzimuthAngle, Le = n.maxAzimuthAngle;
        return isFinite(_e) && isFinite(Le) && (_e < -Math.PI ? _e += le : _e > Math.PI && (_e -= le), Le < -Math.PI ? Le += le : Le > Math.PI && (Le -= le), _e <= Le ? o.theta = Math.max(_e, Math.min(Le, o.theta)) : o.theta = o.theta > (_e + Le) / 2 ? Math.max(_e, o.theta) : Math.min(Le, o.theta)), o.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, o.phi)), o.makeSafe(), o.radius *= l, o.radius = Math.max(n.minDistance, Math.min(n.maxDistance, o.radius)), n.enableDamping === !0 ? n.target.addScaledVector(h, n.dampingFactor) : n.target.add(h), M.setFromSpherical(o), M.applyQuaternion(J), be.copy(n.target).add(M), n.object.lookAt(n.target), n.enableDamping === !0 ? (c.theta *= 1 - n.dampingFactor, c.phi *= 1 - n.dampingFactor, h.multiplyScalar(1 - n.dampingFactor)) : (c.set(0, 0, 0), h.set(0, 0, 0)), l = 1, u || G.distanceToSquared(n.object.position) > a || 8 * (1 - Y.dot(n.object.quaternion)) > a ? (n.dispatchEvent(yc), G.copy(n.object.position), Y.copy(n.object.quaternion), u = !1, !0) : !1;
      };
    }(), this.dispose = function() {
      n.domElement.removeEventListener("contextmenu", K), n.domElement.removeEventListener("pointerdown", it), n.domElement.removeEventListener("pointercancel", Ze), n.domElement.removeEventListener("wheel", At), n.domElement.removeEventListener("pointermove", st), n.domElement.removeEventListener("pointerup", He), n._domElementKeyEvents !== null && n._domElementKeyEvents.removeEventListener("keydown", rt);
    };
    const n = this, i = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let s = i.NONE;
    const a = 1e-6, o = new Cc(), c = new Cc();
    let l = 1;
    const h = new B();
    let u = !1;
    const d = new fe(), f = new fe(), g = new fe(), p = new fe(), A = new fe(), m = new fe(), E = new fe(), b = new fe(), _ = new fe(), I = [], w = {};
    function T() {
      return 2 * Math.PI / 60 / 60 * n.autoRotateSpeed;
    }
    function x() {
      return Math.pow(0.95, n.zoomSpeed);
    }
    function y(M) {
      c.theta -= M;
    }
    function D(M) {
      c.phi -= M;
    }
    const P = function() {
      const M = new B();
      return function(J, G) {
        M.setFromMatrixColumn(G, 0), M.multiplyScalar(-J), h.add(M);
      };
    }(), q = function() {
      const M = new B();
      return function(J, G) {
        n.screenSpacePanning === !0 ? M.setFromMatrixColumn(G, 1) : (M.setFromMatrixColumn(G, 0), M.crossVectors(n.object.up, M)), M.multiplyScalar(J), h.add(M);
      };
    }(), F = function() {
      const M = new B();
      return function(J, G) {
        const Y = n.domElement;
        if (n.object.isPerspectiveCamera) {
          const le = n.object.position;
          M.copy(le).sub(n.target);
          let ce = M.length();
          ce *= Math.tan(n.object.fov / 2 * Math.PI / 180), P(2 * J * ce / Y.clientHeight, n.object.matrix), q(2 * G * ce / Y.clientHeight, n.object.matrix);
        } else
          n.object.isOrthographicCamera ? (P(J * (n.object.right - n.object.left) / n.object.zoom / Y.clientWidth, n.object.matrix), q(G * (n.object.top - n.object.bottom) / n.object.zoom / Y.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), n.enablePan = !1);
      };
    }();
    function Q(M) {
      n.object.isPerspectiveCamera ? l /= M : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom * M)), n.object.updateProjectionMatrix(), u = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function H(M) {
      n.object.isPerspectiveCamera ? l *= M : n.object.isOrthographicCamera ? (n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / M)), n.object.updateProjectionMatrix(), u = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1);
    }
    function ne(M) {
      d.set(M.clientX, M.clientY);
    }
    function ee(M) {
      E.set(M.clientX, M.clientY);
    }
    function V(M) {
      p.set(M.clientX, M.clientY);
    }
    function re(M) {
      f.set(M.clientX, M.clientY), g.subVectors(f, d).multiplyScalar(n.rotateSpeed);
      const L = n.domElement;
      y(2 * Math.PI * g.x / L.clientHeight), D(2 * Math.PI * g.y / L.clientHeight), d.copy(f), n.update();
    }
    function ie(M) {
      b.set(M.clientX, M.clientY), _.subVectors(b, E), _.y > 0 ? Q(x()) : _.y < 0 && H(x()), E.copy(b), n.update();
    }
    function $(M) {
      A.set(M.clientX, M.clientY), m.subVectors(A, p).multiplyScalar(n.panSpeed), F(m.x, m.y), p.copy(A), n.update();
    }
    function X(M) {
      M.deltaY < 0 ? H(x()) : M.deltaY > 0 && Q(x()), n.update();
    }
    function he(M) {
      let L = !1;
      switch (M.code) {
        case n.keys.UP:
          M.ctrlKey || M.metaKey || M.shiftKey ? D(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : F(0, n.keyPanSpeed), L = !0;
          break;
        case n.keys.BOTTOM:
          M.ctrlKey || M.metaKey || M.shiftKey ? D(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : F(0, -n.keyPanSpeed), L = !0;
          break;
        case n.keys.LEFT:
          M.ctrlKey || M.metaKey || M.shiftKey ? y(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : F(n.keyPanSpeed, 0), L = !0;
          break;
        case n.keys.RIGHT:
          M.ctrlKey || M.metaKey || M.shiftKey ? y(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : F(-n.keyPanSpeed, 0), L = !0;
          break;
      }
      L && (M.preventDefault(), n.update());
    }
    function ae() {
      if (I.length === 1)
        d.set(I[0].pageX, I[0].pageY);
      else {
        const M = 0.5 * (I[0].pageX + I[1].pageX), L = 0.5 * (I[0].pageY + I[1].pageY);
        d.set(M, L);
      }
    }
    function de() {
      if (I.length === 1)
        p.set(I[0].pageX, I[0].pageY);
      else {
        const M = 0.5 * (I[0].pageX + I[1].pageX), L = 0.5 * (I[0].pageY + I[1].pageY);
        p.set(M, L);
      }
    }
    function W() {
      const M = I[0].pageX - I[1].pageX, L = I[0].pageY - I[1].pageY, J = Math.sqrt(M * M + L * L);
      E.set(0, J);
    }
    function Me() {
      n.enableZoom && W(), n.enablePan && de();
    }
    function me() {
      n.enableZoom && W(), n.enableRotate && ae();
    }
    function Ce(M) {
      if (I.length == 1)
        f.set(M.pageX, M.pageY);
      else {
        const J = oe(M), G = 0.5 * (M.pageX + J.x), Y = 0.5 * (M.pageY + J.y);
        f.set(G, Y);
      }
      g.subVectors(f, d).multiplyScalar(n.rotateSpeed);
      const L = n.domElement;
      y(2 * Math.PI * g.x / L.clientHeight), D(2 * Math.PI * g.y / L.clientHeight), d.copy(f);
    }
    function ge(M) {
      if (I.length === 1)
        A.set(M.pageX, M.pageY);
      else {
        const L = oe(M), J = 0.5 * (M.pageX + L.x), G = 0.5 * (M.pageY + L.y);
        A.set(J, G);
      }
      m.subVectors(A, p).multiplyScalar(n.panSpeed), F(m.x, m.y), p.copy(A);
    }
    function Te(M) {
      const L = oe(M), J = M.pageX - L.x, G = M.pageY - L.y, Y = Math.sqrt(J * J + G * G);
      b.set(0, Y), _.set(0, Math.pow(b.y / E.y, n.zoomSpeed)), Q(_.y), E.copy(b);
    }
    function ye(M) {
      n.enableZoom && Te(M), n.enablePan && ge(M);
    }
    function Ee(M) {
      n.enableZoom && Te(M), n.enableRotate && Ce(M);
    }
    function it(M) {
      n.enabled !== !1 && (I.length === 0 && (n.domElement.setPointerCapture(M.pointerId), n.domElement.addEventListener("pointermove", st), n.domElement.addEventListener("pointerup", He)), N(M), M.pointerType === "touch" ? S(M) : $e(M));
    }
    function st(M) {
      n.enabled !== !1 && (M.pointerType === "touch" ? C(M) : Oe(M));
    }
    function He(M) {
      z(M), I.length === 0 && (n.domElement.releasePointerCapture(M.pointerId), n.domElement.removeEventListener("pointermove", st), n.domElement.removeEventListener("pointerup", He)), n.dispatchEvent(vc), s = i.NONE;
    }
    function Ze(M) {
      z(M);
    }
    function $e(M) {
      let L;
      switch (M.button) {
        case 0:
          L = n.mouseButtons.LEFT;
          break;
        case 1:
          L = n.mouseButtons.MIDDLE;
          break;
        case 2:
          L = n.mouseButtons.RIGHT;
          break;
        default:
          L = -1;
      }
      switch (L) {
        case Zn.DOLLY:
          if (n.enableZoom === !1)
            return;
          ee(M), s = i.DOLLY;
          break;
        case Zn.ROTATE:
          if (M.ctrlKey || M.metaKey || M.shiftKey) {
            if (n.enablePan === !1)
              return;
            V(M), s = i.PAN;
          } else {
            if (n.enableRotate === !1)
              return;
            ne(M), s = i.ROTATE;
          }
          break;
        case Zn.PAN:
          if (M.ctrlKey || M.metaKey || M.shiftKey) {
            if (n.enableRotate === !1)
              return;
            ne(M), s = i.ROTATE;
          } else {
            if (n.enablePan === !1)
              return;
            V(M), s = i.PAN;
          }
          break;
        default:
          s = i.NONE;
      }
      s !== i.NONE && n.dispatchEvent(jr);
    }
    function Oe(M) {
      switch (s) {
        case i.ROTATE:
          if (n.enableRotate === !1)
            return;
          re(M);
          break;
        case i.DOLLY:
          if (n.enableZoom === !1)
            return;
          ie(M);
          break;
        case i.PAN:
          if (n.enablePan === !1)
            return;
          $(M);
          break;
      }
    }
    function At(M) {
      n.enabled === !1 || n.enableZoom === !1 || s !== i.NONE || (M.preventDefault(), n.dispatchEvent(jr), X(M), n.dispatchEvent(vc));
    }
    function rt(M) {
      n.enabled === !1 || n.enablePan === !1 || he(M);
    }
    function S(M) {
      switch (U(M), I.length) {
        case 1:
          switch (n.touches.ONE) {
            case $n.ROTATE:
              if (n.enableRotate === !1)
                return;
              ae(), s = i.TOUCH_ROTATE;
              break;
            case $n.PAN:
              if (n.enablePan === !1)
                return;
              de(), s = i.TOUCH_PAN;
              break;
            default:
              s = i.NONE;
          }
          break;
        case 2:
          switch (n.touches.TWO) {
            case $n.DOLLY_PAN:
              if (n.enableZoom === !1 && n.enablePan === !1)
                return;
              Me(), s = i.TOUCH_DOLLY_PAN;
              break;
            case $n.DOLLY_ROTATE:
              if (n.enableZoom === !1 && n.enableRotate === !1)
                return;
              me(), s = i.TOUCH_DOLLY_ROTATE;
              break;
            default:
              s = i.NONE;
          }
          break;
        default:
          s = i.NONE;
      }
      s !== i.NONE && n.dispatchEvent(jr);
    }
    function C(M) {
      switch (U(M), s) {
        case i.TOUCH_ROTATE:
          if (n.enableRotate === !1)
            return;
          Ce(M), n.update();
          break;
        case i.TOUCH_PAN:
          if (n.enablePan === !1)
            return;
          ge(M), n.update();
          break;
        case i.TOUCH_DOLLY_PAN:
          if (n.enableZoom === !1 && n.enablePan === !1)
            return;
          ye(M), n.update();
          break;
        case i.TOUCH_DOLLY_ROTATE:
          if (n.enableZoom === !1 && n.enableRotate === !1)
            return;
          Ee(M), n.update();
          break;
        default:
          s = i.NONE;
      }
    }
    function K(M) {
      n.enabled !== !1 && M.preventDefault();
    }
    function N(M) {
      I.push(M);
    }
    function z(M) {
      delete w[M.pointerId];
      for (let L = 0; L < I.length; L++)
        if (I[L].pointerId == M.pointerId) {
          I.splice(L, 1);
          return;
        }
    }
    function U(M) {
      let L = w[M.pointerId];
      L === void 0 && (L = new fe(), w[M.pointerId] = L), L.set(M.pageX, M.pageY);
    }
    function oe(M) {
      const L = M.pointerId === I[0].pointerId ? I[1] : I[0];
      return w[L.pointerId];
    }
    n.domElement.addEventListener("contextmenu", K), n.domElement.addEventListener("pointerdown", it), n.domElement.addEventListener("pointercancel", Ze), n.domElement.addEventListener("wheel", At, { passive: !1 }), this.update();
  }
}
class jg extends En {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new Zg(t);
    }), this.register(function(t) {
      return new rm(t);
    }), this.register(function(t) {
      return new am(t);
    }), this.register(function(t) {
      return new em(t);
    }), this.register(function(t) {
      return new tm(t);
    }), this.register(function(t) {
      return new nm(t);
    }), this.register(function(t) {
      return new im(t);
    }), this.register(function(t) {
      return new Xg(t);
    }), this.register(function(t) {
      return new sm(t);
    }), this.register(function(t) {
      return new $g(t);
    }), this.register(function(t) {
      return new Jg(t);
    }), this.register(function(t) {
      return new om(t);
    }), this.register(function(t) {
      return new cm(t);
    });
  }
  load(e, t, n, i) {
    const s = this;
    let a;
    this.resourcePath !== "" ? a = this.resourcePath : this.path !== "" ? a = this.path : a = Yn.extractUrlBase(e), this.manager.itemStart(e);
    const o = function(l) {
      i ? i(l) : console.error(l), s.manager.itemError(e), s.manager.itemEnd(e);
    }, c = new Tn(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(l) {
      try {
        s.parse(l, a, function(h) {
          t(h), s.manager.itemEnd(e);
        }, o);
      } catch (h) {
        o(h);
      }
    }, n, o);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, i) {
    let s;
    const a = {}, o = {};
    if (typeof e == "string")
      s = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (Yn.decodeText(new Uint8Array(e, 0, 4)) === Sl) {
        try {
          a[ze.KHR_BINARY_GLTF] = new lm(e);
        } catch (h) {
          i && i(h);
          return;
        }
        s = JSON.parse(a[ze.KHR_BINARY_GLTF].content);
      } else
        s = JSON.parse(Yn.decodeText(new Uint8Array(e)));
    else
      s = e;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Im(s, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const h = this.pluginCallbacks[l](c);
      o[h.name] = h, a[h.name] = !0;
    }
    if (s.extensionsUsed)
      for (let l = 0; l < s.extensionsUsed.length; ++l) {
        const h = s.extensionsUsed[l], u = s.extensionsRequired || [];
        switch (h) {
          case ze.KHR_MATERIALS_UNLIT:
            a[h] = new Kg();
            break;
          case ze.KHR_DRACO_MESH_COMPRESSION:
            a[h] = new hm(s, this.dracoLoader);
            break;
          case ze.KHR_TEXTURE_TRANSFORM:
            a[h] = new um();
            break;
          case ze.KHR_MESH_QUANTIZATION:
            a[h] = new dm();
            break;
          default:
            u.indexOf(h) >= 0 && o[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".');
        }
      }
    c.setExtensions(a), c.setPlugins(o), c.parse(n, i);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(i, s) {
      n.parse(e, t, i, s);
    });
  }
}
function Yg() {
  let r = {};
  return {
    get: function(e) {
      return r[e];
    },
    add: function(e, t) {
      r[e] = t;
    },
    remove: function(e) {
      delete r[e];
    },
    removeAll: function() {
      r = {};
    }
  };
}
const ze = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Jg {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, i = t.length; n < i; n++) {
      const s = t[n];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let i = t.cache.get(n);
    if (i)
      return i;
    const s = t.json, c = ((s.extensions && s.extensions[this.name] || {}).lights || [])[e];
    let l;
    const h = new we(16777215);
    c.color !== void 0 && h.fromArray(c.color);
    const u = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        l = new xa(h), l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      case "point":
        l = new dn(h), l.distance = u;
        break;
      case "spot":
        l = new Sg(h), l.distance = u, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, l.angle = c.spot.outerConeAngle, l.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return l.position.set(0, 0, 0), l.decay = 2, Sn(l, c), c.intensity !== void 0 && (l.intensity = c.intensity), l.name = t.createUniqueName(c.name || "light_" + e), i = Promise.resolve(l), t.cache.add(n, i), i;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, s = n.json.nodes[e], o = (s.extensions && s.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(c) {
      return n._getNodeRef(t.cache, o, c);
    });
  }
}
class Kg {
  constructor() {
    this.name = ze.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Wn;
  }
  extendParams(e, t, n) {
    const i = [];
    e.color = new we(1, 1, 1), e.opacity = 1;
    const s = t.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const a = s.baseColorFactor;
        e.color.fromArray(a), e.opacity = a[3];
      }
      s.baseColorTexture !== void 0 && i.push(n.assignTexture(e, "map", s.baseColorTexture, Fe));
    }
    return Promise.all(i);
  }
}
class Xg {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = i.extensions[this.name].emissiveStrength;
    return s !== void 0 && (t.emissiveIntensity = s), Promise.resolve();
  }
}
class Zg {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [], a = i.extensions[this.name];
    if (a.clearcoatFactor !== void 0 && (t.clearcoat = a.clearcoatFactor), a.clearcoatTexture !== void 0 && s.push(n.assignTexture(t, "clearcoatMap", a.clearcoatTexture)), a.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = a.clearcoatRoughnessFactor), a.clearcoatRoughnessTexture !== void 0 && s.push(n.assignTexture(t, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture)), a.clearcoatNormalTexture !== void 0 && (s.push(n.assignTexture(t, "clearcoatNormalMap", a.clearcoatNormalTexture)), a.clearcoatNormalTexture.scale !== void 0)) {
      const o = a.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new fe(o, o);
    }
    return Promise.all(s);
  }
}
class $g {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [], a = i.extensions[this.name];
    return a.iridescenceFactor !== void 0 && (t.iridescence = a.iridescenceFactor), a.iridescenceTexture !== void 0 && s.push(n.assignTexture(t, "iridescenceMap", a.iridescenceTexture)), a.iridescenceIor !== void 0 && (t.iridescenceIOR = a.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), a.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum), a.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum), a.iridescenceThicknessTexture !== void 0 && s.push(n.assignTexture(t, "iridescenceThicknessMap", a.iridescenceThicknessTexture)), Promise.all(s);
  }
}
class em {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [];
    t.sheenColor = new we(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const a = i.extensions[this.name];
    return a.sheenColorFactor !== void 0 && t.sheenColor.fromArray(a.sheenColorFactor), a.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = a.sheenRoughnessFactor), a.sheenColorTexture !== void 0 && s.push(n.assignTexture(t, "sheenColorMap", a.sheenColorTexture, Fe)), a.sheenRoughnessTexture !== void 0 && s.push(n.assignTexture(t, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(s);
  }
}
class tm {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [], a = i.extensions[this.name];
    return a.transmissionFactor !== void 0 && (t.transmission = a.transmissionFactor), a.transmissionTexture !== void 0 && s.push(n.assignTexture(t, "transmissionMap", a.transmissionTexture)), Promise.all(s);
  }
}
class nm {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [], a = i.extensions[this.name];
    t.thickness = a.thicknessFactor !== void 0 ? a.thicknessFactor : 0, a.thicknessTexture !== void 0 && s.push(n.assignTexture(t, "thicknessMap", a.thicknessTexture)), t.attenuationDistance = a.attenuationDistance || 1 / 0;
    const o = a.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new we(o[0], o[1], o[2]), Promise.all(s);
  }
}
class im {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = i.extensions[this.name];
    return t.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class sm {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : Xn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const s = [], a = i.extensions[this.name];
    t.specularIntensity = a.specularFactor !== void 0 ? a.specularFactor : 1, a.specularTexture !== void 0 && s.push(n.assignTexture(t, "specularIntensityMap", a.specularTexture));
    const o = a.specularColorFactor || [1, 1, 1];
    return t.specularColor = new we(o[0], o[1], o[2]), a.specularColorTexture !== void 0 && s.push(n.assignTexture(t, "specularColorMap", a.specularColorTexture, Fe)), Promise.all(s);
  }
}
class rm {
  constructor(e) {
    this.parser = e, this.name = ze.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, i = n.textures[e];
    if (!i.extensions || !i.extensions[this.name])
      return null;
    const s = i.extensions[this.name], a = t.options.ktx2Loader;
    if (!a) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, s.source, a);
  }
}
class am {
  constructor(e) {
    this.parser = e, this.name = ze.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, i = n.json, s = i.textures[e];
    if (!s.extensions || !s.extensions[t])
      return null;
    const a = s.extensions[t], o = i.images[a.source];
    let c = n.textureLoader;
    if (o.uri) {
      const l = n.options.manager.getHandler(o.uri);
      l !== null && (c = l);
    }
    return this.detectSupport().then(function(l) {
      if (l)
        return n.loadTextureImage(e, a.source, c);
      if (i.extensionsRequired && i.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class om {
  constructor(e) {
    this.name = ze.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const i = n.extensions[this.name], s = this.parser.getDependency("buffer", i.buffer), a = this.parser.options.meshoptDecoder;
      if (!a || !a.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(o) {
        const c = i.byteOffset || 0, l = i.byteLength || 0, h = i.count, u = i.byteStride, d = new Uint8Array(o, c, l);
        return a.decodeGltfBufferAsync ? a.decodeGltfBufferAsync(h, u, d, i.mode, i.filter).then(function(f) {
          return f.buffer;
        }) : a.ready.then(function() {
          const f = new ArrayBuffer(h * u);
          return a.decodeGltfBuffer(new Uint8Array(f), h, u, d, i.mode, i.filter), f;
        });
      });
    } else
      return null;
  }
}
class cm {
  constructor(e) {
    this.name = ze.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const i = t.meshes[n.mesh];
    for (const l of i.primitives)
      if (l.mode !== zt.TRIANGLES && l.mode !== zt.TRIANGLE_STRIP && l.mode !== zt.TRIANGLE_FAN && l.mode !== void 0)
        return null;
    const a = n.extensions[this.name].attributes, o = [], c = {};
    for (const l in a)
      o.push(this.parser.getDependency("accessor", a[l]).then((h) => (c[l] = h, c[l])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((l) => {
      const h = l.pop(), u = h.isGroup ? h.children : [h], d = l[0].count, f = [];
      for (const g of u) {
        const p = new Re(), A = new B(), m = new nn(), E = new B(1, 1, 1), b = new Jp(g.geometry, g.material, d);
        for (let _ = 0; _ < d; _++)
          c.TRANSLATION && A.fromBufferAttribute(c.TRANSLATION, _), c.ROTATION && m.fromBufferAttribute(c.ROTATION, _), c.SCALE && E.fromBufferAttribute(c.SCALE, _), b.setMatrixAt(_, p.compose(A, m, E));
        for (const _ in c)
          _ !== "TRANSLATION" && _ !== "ROTATION" && _ !== "SCALE" && g.geometry.setAttribute(_, c[_]);
        Ke.prototype.copy.call(b, g), b.frustumCulled = !1, this.parser.assignFinalMaterial(b), f.push(b);
      }
      return h.isGroup ? (h.clear(), h.add(...f), h) : f[0];
    }));
  }
}
const Sl = "glTF", Xi = 12, wc = { JSON: 1313821514, BIN: 5130562 };
class lm {
  constructor(e) {
    this.name = ze.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, Xi);
    if (this.header = {
      magic: Yn.decodeText(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== Sl)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - Xi, i = new DataView(e, Xi);
    let s = 0;
    for (; s < n; ) {
      const a = i.getUint32(s, !0);
      s += 4;
      const o = i.getUint32(s, !0);
      if (s += 4, o === wc.JSON) {
        const c = new Uint8Array(e, Xi + s, a);
        this.content = Yn.decodeText(c);
      } else if (o === wc.BIN) {
        const c = Xi + s;
        this.body = e.slice(c, c + a);
      }
      s += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class hm {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = ze.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, i = this.dracoLoader, s = e.extensions[this.name].bufferView, a = e.extensions[this.name].attributes, o = {}, c = {}, l = {};
    for (const h in a) {
      const u = Ia[h] || h.toLowerCase();
      o[u] = a[h];
    }
    for (const h in e.attributes) {
      const u = Ia[h] || h.toLowerCase();
      if (a[h] !== void 0) {
        const d = n.accessors[e.attributes[h]], f = vi[d.componentType];
        l[u] = f.name, c[u] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", s).then(function(h) {
      return new Promise(function(u) {
        i.decodeDracoFile(h, function(d) {
          for (const f in d.attributes) {
            const g = d.attributes[f], p = c[f];
            p !== void 0 && (g.normalized = p);
          }
          u(d);
        }, o, l);
      });
    });
  }
}
class um {
  constructor() {
    this.name = ze.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return t.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class dm {
  constructor() {
    this.name = ze.KHR_MESH_QUANTIZATION;
  }
}
class Bl extends ms {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, s = e * i * 3 + i;
    for (let a = 0; a !== i; a++)
      t[a] = n[s + a];
    return t;
  }
  interpolate_(e, t, n, i) {
    const s = this.resultBuffer, a = this.sampleValues, o = this.valueSize, c = o * 2, l = o * 3, h = i - t, u = (n - t) / h, d = u * u, f = d * u, g = e * l, p = g - l, A = -2 * f + 3 * d, m = f - d, E = 1 - A, b = m - d + u;
    for (let _ = 0; _ !== o; _++) {
      const I = a[p + _ + o], w = a[p + _ + c] * h, T = a[g + _ + o], x = a[g + _] * h;
      s[_] = E * I + b * w + A * T + m * x;
    }
    return s;
  }
}
const Am = new nn();
class fm extends Bl {
  interpolate_(e, t, n, i) {
    const s = super.interpolate_(e, t, n, i);
    return Am.fromArray(s).normalize().toArray(s), s;
  }
}
const zt = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, vi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Mc = {
  9728: bt,
  9729: nt,
  9984: ca,
  9985: Vc,
  9986: Ys,
  9987: bn
}, Sc = {
  33071: Et,
  33648: $s,
  10497: Rn
}, Yr = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Ia = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Mn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, pm = {
  CUBICSPLINE: void 0,
  LINEAR: Bi,
  STEP: hs
}, Jr = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function gm(r) {
  return r.DefaultMaterial === void 0 && (r.DefaultMaterial = new mt({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Dn
  })), r.DefaultMaterial;
}
function Zi(r, e, t) {
  for (const n in t.extensions)
    r[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function Sn(r, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(r.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function mm(r, e, t) {
  let n = !1, i = !1, s = !1;
  for (let l = 0, h = e.length; l < h; l++) {
    const u = e[l];
    if (u.POSITION !== void 0 && (n = !0), u.NORMAL !== void 0 && (i = !0), u.COLOR_0 !== void 0 && (s = !0), n && i && s)
      break;
  }
  if (!n && !i && !s)
    return Promise.resolve(r);
  const a = [], o = [], c = [];
  for (let l = 0, h = e.length; l < h; l++) {
    const u = e[l];
    if (n) {
      const d = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : r.attributes.position;
      a.push(d);
    }
    if (i) {
      const d = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : r.attributes.normal;
      o.push(d);
    }
    if (s) {
      const d = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : r.attributes.color;
      c.push(d);
    }
  }
  return Promise.all([
    Promise.all(a),
    Promise.all(o),
    Promise.all(c)
  ]).then(function(l) {
    const h = l[0], u = l[1], d = l[2];
    return n && (r.morphAttributes.position = h), i && (r.morphAttributes.normal = u), s && (r.morphAttributes.color = d), r.morphTargetsRelative = !0, r;
  });
}
function bm(r, e) {
  if (r.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      r.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (r.morphTargetInfluences.length === t.length) {
      r.morphTargetDictionary = {};
      for (let n = 0, i = t.length; n < i; n++)
        r.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function _m(r) {
  const e = r.extensions && r.extensions[ze.KHR_DRACO_MESH_COMPRESSION];
  let t;
  return e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + Bc(e.attributes) : t = r.indices + ":" + Bc(r.attributes) + ":" + r.mode, t;
}
function Bc(r) {
  let e = "";
  const t = Object.keys(r).sort();
  for (let n = 0, i = t.length; n < i; n++)
    e += t[n] + ":" + r[t[n]] + ";";
  return e;
}
function Ca(r) {
  switch (r) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function xm(r) {
  return r.search(/\.jpe?g($|\?)/i) > 0 || r.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : r.search(/\.webp($|\?)/i) > 0 || r.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Em = new Re();
class Im {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Yg(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, i = !1, s = -1;
    typeof navigator < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, i = navigator.userAgent.indexOf("Firefox") > -1, s = i ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || i && s < 98 ? this.textureLoader = new Ii(this.options.manager) : this.textureLoader = new Dg(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Tn(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    const n = this, i = this.json, s = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(a) {
      return a._markDefs && a._markDefs();
    }), Promise.all(this._invokeAll(function(a) {
      return a.beforeRoot && a.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(a) {
      const o = {
        scene: a[0][i.scene || 0],
        scenes: a[0],
        animations: a[1],
        cameras: a[2],
        asset: i.asset,
        parser: n,
        userData: {}
      };
      Zi(s, o, i), Sn(o, i), Promise.all(n._invokeAll(function(c) {
        return c.afterRoot && c.afterRoot(o);
      })).then(function() {
        e(o);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let i = 0, s = t.length; i < s; i++) {
      const a = t[i].joints;
      for (let o = 0, c = a.length; o < c; o++)
        e[a[o]].isBone = !0;
    }
    for (let i = 0, s = e.length; i < s; i++) {
      const a = e[i];
      a.mesh !== void 0 && (this._addNodeRef(this.meshCache, a.mesh), a.skin !== void 0 && (n[a.mesh].isSkinnedMesh = !0)), a.camera !== void 0 && this._addNodeRef(this.cameraCache, a.camera);
    }
  }
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1)
      return n;
    const i = n.clone(), s = (a, o) => {
      const c = this.associations.get(a);
      c != null && this.associations.set(o, c);
      for (const [l, h] of a.children.entries())
        s(h, o.children[l]);
    };
    return s(n, i), i.name += "_instance_" + e.uses[t]++, i;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const i = e(t[n]);
      if (i)
        return i;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let i = 0; i < t.length; i++) {
      const s = e(t[i]);
      s && n.push(s);
    }
    return n;
  }
  getDependency(e, t) {
    const n = e + ":" + t;
    let i = this.cache.get(n);
    if (!i) {
      switch (e) {
        case "scene":
          i = this.loadScene(t);
          break;
        case "node":
          i = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(t);
          });
          break;
        case "mesh":
          i = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(t);
          });
          break;
        case "accessor":
          i = this.loadAccessor(t);
          break;
        case "bufferView":
          i = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(t);
          });
          break;
        case "buffer":
          i = this.loadBuffer(t);
          break;
        case "material":
          i = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(t);
          });
          break;
        case "texture":
          i = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(t);
          });
          break;
        case "skin":
          i = this.loadSkin(t);
          break;
        case "animation":
          i = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(t);
          });
          break;
        case "camera":
          i = this.loadCamera(t);
          break;
        default:
          if (i = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(e, t);
          }), !i)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, i);
    }
    return i;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, i = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(i.map(function(s, a) {
        return n.getDependency(e, a);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function(s, a) {
      n.load(Yn.resolveURL(t.uri, i.path), s, void 0, function() {
        a(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const i = t.byteLength || 0, s = t.byteOffset || 0;
      return n.slice(s, s + i);
    });
  }
  loadAccessor(e) {
    const t = this, n = this.json, i = this.json.accessors[e];
    if (i.bufferView === void 0 && i.sparse === void 0) {
      const a = Yr[i.type], o = vi[i.componentType], c = i.normalized === !0, l = new o(i.count * a);
      return Promise.resolve(new ot(l, a, c));
    }
    const s = [];
    return i.bufferView !== void 0 ? s.push(this.getDependency("bufferView", i.bufferView)) : s.push(null), i.sparse !== void 0 && (s.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(s).then(function(a) {
      const o = a[0], c = Yr[i.type], l = vi[i.componentType], h = l.BYTES_PER_ELEMENT, u = h * c, d = i.byteOffset || 0, f = i.bufferView !== void 0 ? n.bufferViews[i.bufferView].byteStride : void 0, g = i.normalized === !0;
      let p, A;
      if (f && f !== u) {
        const m = Math.floor(d / f), E = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + m + ":" + i.count;
        let b = t.cache.get(E);
        b || (p = new l(o, m * f, i.count * f / h), b = new dl(p, f / h), t.cache.add(E, b)), A = new fs(b, c, d % f / h, g);
      } else
        o === null ? p = new l(i.count * c) : p = new l(o, d, i.count * c), A = new ot(p, c, g);
      if (i.sparse !== void 0) {
        const m = Yr.SCALAR, E = vi[i.sparse.indices.componentType], b = i.sparse.indices.byteOffset || 0, _ = i.sparse.values.byteOffset || 0, I = new E(a[1], b, i.sparse.count * m), w = new l(a[2], _, i.sparse.count * c);
        o !== null && (A = new ot(A.array.slice(), A.itemSize, A.normalized));
        for (let T = 0, x = I.length; T < x; T++) {
          const y = I[T];
          if (A.setX(y, w[T * c]), c >= 2 && A.setY(y, w[T * c + 1]), c >= 3 && A.setZ(y, w[T * c + 2]), c >= 4 && A.setW(y, w[T * c + 3]), c >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return A;
    });
  }
  loadTexture(e) {
    const t = this.json, n = this.options, s = t.textures[e].source, a = t.images[s];
    let o = this.textureLoader;
    if (a.uri) {
      const c = n.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.loadTextureImage(e, s, o);
  }
  loadTextureImage(e, t, n) {
    const i = this, s = this.json, a = s.textures[e], o = s.images[t], c = (o.uri || o.bufferView) + ":" + a.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const l = this.loadImageSource(t, n).then(function(h) {
      h.flipY = !1, h.name = a.name || o.name || "";
      const d = (s.samplers || {})[a.sampler] || {};
      return h.magFilter = Mc[d.magFilter] || nt, h.minFilter = Mc[d.minFilter] || bn, h.wrapS = Sc[d.wrapS] || Rn, h.wrapT = Sc[d.wrapT] || Rn, i.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = l, l;
  }
  loadImageSource(e, t) {
    const n = this, i = this.json, s = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((u) => u.clone());
    const a = i.images[e], o = self.URL || self.webkitURL;
    let c = a.uri || "", l = !1;
    if (a.bufferView !== void 0)
      c = n.getDependency("bufferView", a.bufferView).then(function(u) {
        l = !0;
        const d = new Blob([u], { type: a.mimeType });
        return c = o.createObjectURL(d), c;
      });
    else if (a.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(c).then(function(u) {
      return new Promise(function(d, f) {
        let g = d;
        t.isImageBitmapLoader === !0 && (g = function(p) {
          const A = new ht(p);
          A.needsUpdate = !0, d(A);
        }), t.load(Yn.resolveURL(u, s.path), g, void 0, f);
      });
    }).then(function(u) {
      return l === !0 && o.revokeObjectURL(c), u.userData.mimeType = a.mimeType || xm(a.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), u;
    });
    return this.sourceCache[e] = h, h;
  }
  assignTexture(e, t, n, i) {
    const s = this;
    return this.getDependency("texture", n.index).then(function(a) {
      if (!a)
        return null;
      if (n.texCoord !== void 0 && n.texCoord != 0 && !(t === "aoMap" && n.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + n.texCoord + " for texture " + t + " not yet supported."), s.extensions[ze.KHR_TEXTURE_TRANSFORM]) {
        const o = n.extensions !== void 0 ? n.extensions[ze.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const c = s.associations.get(a);
          a = s.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(a, o), s.associations.set(a, c);
        }
      }
      return i !== void 0 && (a.encoding = i), e[t] = a, a;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const i = t.attributes.tangent === void 0, s = t.attributes.color !== void 0, a = t.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + n.uuid;
      let c = this.cache.get(o);
      c || (c = new ml(), Kt.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(o, c)), n = c;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(o);
      c || (c = new gl(), Kt.prototype.copy.call(c, n), c.color.copy(n.color), this.cache.add(o, c)), n = c;
    }
    if (i || s || a) {
      let o = "ClonedMaterial:" + n.uuid + ":";
      i && (o += "derivative-tangents:"), s && (o += "vertex-colors:"), a && (o += "flat-shading:");
      let c = this.cache.get(o);
      c || (c = n.clone(), s && (c.vertexColors = !0), a && (c.flatShading = !0), i && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(o, c), this.associations.set(c, this.associations.get(n))), n = c;
    }
    n.aoMap && t.attributes.uv2 === void 0 && t.attributes.uv !== void 0 && t.setAttribute("uv2", t.attributes.uv), e.material = n;
  }
  getMaterialType() {
    return mt;
  }
  loadMaterial(e) {
    const t = this, n = this.json, i = this.extensions, s = n.materials[e];
    let a;
    const o = {}, c = s.extensions || {}, l = [];
    if (c[ze.KHR_MATERIALS_UNLIT]) {
      const u = i[ze.KHR_MATERIALS_UNLIT];
      a = u.getMaterialType(), l.push(u.extendParams(o, s, t));
    } else {
      const u = s.pbrMetallicRoughness || {};
      if (o.color = new we(1, 1, 1), o.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        o.color.fromArray(d), o.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && l.push(t.assignTexture(o, "map", u.baseColorTexture, Fe)), o.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, o.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(o, "metalnessMap", u.metallicRoughnessTexture)), l.push(t.assignTexture(o, "roughnessMap", u.metallicRoughnessTexture))), a = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, o);
      })));
    }
    s.doubleSided === !0 && (o.side = kt);
    const h = s.alphaMode || Jr.OPAQUE;
    if (h === Jr.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, h === Jr.MASK && (o.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && a !== Wn && (l.push(t.assignTexture(o, "normalMap", s.normalTexture)), o.normalScale = new fe(1, 1), s.normalTexture.scale !== void 0)) {
      const u = s.normalTexture.scale;
      o.normalScale.set(u, u);
    }
    return s.occlusionTexture !== void 0 && a !== Wn && (l.push(t.assignTexture(o, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && a !== Wn && (o.emissive = new we().fromArray(s.emissiveFactor)), s.emissiveTexture !== void 0 && a !== Wn && l.push(t.assignTexture(o, "emissiveMap", s.emissiveTexture, Fe)), Promise.all(l).then(function() {
      const u = new a(o);
      return s.name && (u.name = s.name), Sn(u, s), t.associations.set(u, { materials: e }), s.extensions && Zi(i, u, s), u;
    });
  }
  createUniqueName(e) {
    const t = Ve.sanitizeNodeName(e || "");
    let n = t;
    for (let i = 1; this.nodeNamesUsed[n]; ++i)
      n = t + "_" + i;
    return this.nodeNamesUsed[n] = !0, n;
  }
  loadGeometries(e) {
    const t = this, n = this.extensions, i = this.primitiveCache;
    function s(o) {
      return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, t).then(function(c) {
        return Tc(c, o, t);
      });
    }
    const a = [];
    for (let o = 0, c = e.length; o < c; o++) {
      const l = e[o], h = _m(l), u = i[h];
      if (u)
        a.push(u.promise);
      else {
        let d;
        l.extensions && l.extensions[ze.KHR_DRACO_MESH_COMPRESSION] ? d = s(l) : d = Tc(new _t(), l, t), i[h] = { primitive: l, promise: d }, a.push(d);
      }
    }
    return Promise.all(a);
  }
  loadMesh(e) {
    const t = this, n = this.json, i = this.extensions, s = n.meshes[e], a = s.primitives, o = [];
    for (let c = 0, l = a.length; c < l; c++) {
      const h = a[c].material === void 0 ? gm(this.cache) : this.getDependency("material", a[c].material);
      o.push(h);
    }
    return o.push(t.loadGeometries(a)), Promise.all(o).then(function(c) {
      const l = c.slice(0, c.length - 1), h = c[c.length - 1], u = [];
      for (let f = 0, g = h.length; f < g; f++) {
        const p = h[f], A = a[f];
        let m;
        const E = l[f];
        if (A.mode === zt.TRIANGLES || A.mode === zt.TRIANGLE_STRIP || A.mode === zt.TRIANGLE_FAN || A.mode === void 0)
          m = s.isSkinnedMesh === !0 ? new qp(p, E) : new Ie(p, E), m.isSkinnedMesh === !0 && !m.geometry.attributes.skinWeight.normalized && m.normalizeSkinWeights(), A.mode === zt.TRIANGLE_STRIP ? m.geometry = Dc(m.geometry, wh) : A.mode === zt.TRIANGLE_FAN && (m.geometry = Dc(m.geometry, jc));
        else if (A.mode === zt.LINES)
          m = new Kp(p, E);
        else if (A.mode === zt.LINE_STRIP)
          m = new Qa(p, E);
        else if (A.mode === zt.LINE_LOOP)
          m = new Xp(p, E);
        else if (A.mode === zt.POINTS)
          m = new bl(p, E);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + A.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && bm(m, s), m.name = t.createUniqueName(s.name || "mesh_" + e), Sn(m, s), A.extensions && Zi(i, m, A), t.assignFinalMaterial(m), u.push(m);
      }
      for (let f = 0, g = u.length; f < g; f++)
        t.associations.set(u[f], {
          meshes: e,
          primitives: f
        });
      if (u.length === 1)
        return u[0];
      const d = new gn();
      t.associations.set(d, { meshes: e });
      for (let f = 0, g = u.length; f < g; f++)
        d.add(u[f]);
      return d;
    });
  }
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], i = n[n.type];
    if (!i) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new Dt(Vh.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : n.type === "orthographic" && (t = new Ta(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Sn(t, n), Promise.resolve(t);
  }
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let i = 0, s = t.joints.length; i < s; i++)
      n.push(this.getDependency("node", t.joints[i]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(i) {
      const s = i.pop(), a = i, o = [], c = [];
      for (let l = 0, h = a.length; l < h; l++) {
        const u = a[l];
        if (u) {
          o.push(u);
          const d = new Re();
          s !== null && d.fromArray(s.array, l * 16), c.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new La(o, c);
    });
  }
  loadAnimation(e) {
    const n = this.json.animations[e], i = [], s = [], a = [], o = [], c = [];
    for (let l = 0, h = n.channels.length; l < h; l++) {
      const u = n.channels[l], d = n.samplers[u.sampler], f = u.target, g = f.node, p = n.parameters !== void 0 ? n.parameters[d.input] : d.input, A = n.parameters !== void 0 ? n.parameters[d.output] : d.output;
      i.push(this.getDependency("node", g)), s.push(this.getDependency("accessor", p)), a.push(this.getDependency("accessor", A)), o.push(d), c.push(f);
    }
    return Promise.all([
      Promise.all(i),
      Promise.all(s),
      Promise.all(a),
      Promise.all(o),
      Promise.all(c)
    ]).then(function(l) {
      const h = l[0], u = l[1], d = l[2], f = l[3], g = l[4], p = [];
      for (let m = 0, E = h.length; m < E; m++) {
        const b = h[m], _ = u[m], I = d[m], w = f[m], T = g[m];
        if (b === void 0)
          continue;
        b.updateMatrix();
        let x;
        switch (Mn[T.path]) {
          case Mn.weights:
            x = ps;
            break;
          case Mn.rotation:
            x = Kn;
            break;
          case Mn.position:
          case Mn.scale:
          default:
            x = gs;
            break;
        }
        const y = b.name ? b.name : b.uuid, D = w.interpolation !== void 0 ? pm[w.interpolation] : Bi, P = [];
        Mn[T.path] === Mn.weights ? b.traverse(function(F) {
          F.morphTargetInfluences && P.push(F.name ? F.name : F.uuid);
        }) : P.push(y);
        let q = I.array;
        if (I.normalized) {
          const F = Ca(q.constructor), Q = new Float32Array(q.length);
          for (let H = 0, ne = q.length; H < ne; H++)
            Q[H] = q[H] * F;
          q = Q;
        }
        for (let F = 0, Q = P.length; F < Q; F++) {
          const H = new x(
            P[F] + "." + Mn[T.path],
            _.array,
            q,
            D
          );
          w.interpolation === "CUBICSPLINE" && (H.createInterpolant = function(ee) {
            const V = this instanceof Kn ? fm : Bl;
            return new V(this.times, this.values, this.getValueSize() / 3, ee);
          }, H.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), p.push(H);
        }
      }
      const A = n.name ? n.name : "animation_" + e;
      return new xg(A, void 0, p);
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, i = t.nodes[e];
    return i.mesh === void 0 ? null : n.getDependency("mesh", i.mesh).then(function(s) {
      const a = n._getNodeRef(n.meshCache, i.mesh, s);
      return i.weights !== void 0 && a.traverse(function(o) {
        if (o.isMesh)
          for (let c = 0, l = i.weights.length; c < l; c++)
            o.morphTargetInfluences[c] = i.weights[c];
      }), a;
    });
  }
  loadNode(e) {
    const t = this.json, n = this.extensions, i = this, s = t.nodes[e], a = s.name ? i.createUniqueName(s.name) : "";
    return function() {
      const o = [], c = i._invokeOne(function(d) {
        return d.createNodeMesh && d.createNodeMesh(e);
      });
      c && o.push(c), s.camera !== void 0 && o.push(i.getDependency("camera", s.camera).then(function(d) {
        return i._getNodeRef(i.cameraCache, s.camera, d);
      })), i._invokeAll(function(d) {
        return d.createNodeAttachment && d.createNodeAttachment(e);
      }).forEach(function(d) {
        o.push(d);
      });
      const l = [], h = s.children || [];
      for (let d = 0, f = h.length; d < f; d++)
        l.push(i.getDependency("node", h[d]));
      const u = s.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", s.skin);
      return Promise.all([
        Promise.all(o),
        Promise.all(l),
        u
      ]);
    }().then(function(o) {
      const c = o[0], l = o[1], h = o[2];
      let u;
      if (s.isBone === !0 ? u = new pl() : c.length > 1 ? u = new gn() : c.length === 1 ? u = c[0] : u = new Ke(), u !== c[0])
        for (let d = 0, f = c.length; d < f; d++)
          u.add(c[d]);
      if (s.name && (u.userData.name = s.name, u.name = a), Sn(u, s), s.extensions && Zi(n, u, s), s.matrix !== void 0) {
        const d = new Re();
        d.fromArray(s.matrix), u.applyMatrix4(d);
      } else
        s.translation !== void 0 && u.position.fromArray(s.translation), s.rotation !== void 0 && u.quaternion.fromArray(s.rotation), s.scale !== void 0 && u.scale.fromArray(s.scale);
      i.associations.has(u) || i.associations.set(u, {}), i.associations.get(u).nodes = e, h !== null && u.traverse(function(d) {
        d.isSkinnedMesh && d.bind(h, Em);
      });
      for (let d = 0, f = l.length; d < f; d++)
        u.add(l[d]);
      return u;
    });
  }
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], i = this, s = new gn();
    n.name && (s.name = i.createUniqueName(n.name)), Sn(s, n), n.extensions && Zi(t, s, n);
    const a = n.nodes || [], o = [];
    for (let c = 0, l = a.length; c < l; c++)
      o.push(i.getDependency("node", a[c]));
    return Promise.all(o).then(function(c) {
      for (let h = 0, u = c.length; h < u; h++)
        s.add(c[h]);
      const l = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, f] of i.associations)
          (d instanceof Kt || d instanceof ht) && u.set(d, f);
        return h.traverse((d) => {
          const f = i.associations.get(d);
          f != null && u.set(d, f);
        }), u;
      };
      return i.associations = l(s), s;
    });
  }
}
function Cm(r, e, t) {
  const n = e.attributes, i = new Ln();
  if (n.POSITION !== void 0) {
    const o = t.json.accessors[n.POSITION], c = o.min, l = o.max;
    if (c !== void 0 && l !== void 0) {
      if (i.set(
        new B(c[0], c[1], c[2]),
        new B(l[0], l[1], l[2])
      ), o.normalized) {
        const h = Ca(vi[o.componentType]);
        i.min.multiplyScalar(h), i.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const s = e.targets;
  if (s !== void 0) {
    const o = new B(), c = new B();
    for (let l = 0, h = s.length; l < h; l++) {
      const u = s[l];
      if (u.POSITION !== void 0) {
        const d = t.json.accessors[u.POSITION], f = d.min, g = d.max;
        if (f !== void 0 && g !== void 0) {
          if (c.setX(Math.max(Math.abs(f[0]), Math.abs(g[0]))), c.setY(Math.max(Math.abs(f[1]), Math.abs(g[1]))), c.setZ(Math.max(Math.abs(f[2]), Math.abs(g[2]))), d.normalized) {
            const p = Ca(vi[d.componentType]);
            c.multiplyScalar(p);
          }
          o.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    i.expandByVector(o);
  }
  r.boundingBox = i;
  const a = new Ri();
  i.getCenter(a.center), a.radius = i.min.distanceTo(i.max) / 2, r.boundingSphere = a;
}
function Tc(r, e, t) {
  const n = e.attributes, i = [];
  function s(a, o) {
    return t.getDependency("accessor", a).then(function(c) {
      r.setAttribute(o, c);
    });
  }
  for (const a in n) {
    const o = Ia[a] || a.toLowerCase();
    o in r.attributes || i.push(s(n[a], o));
  }
  if (e.indices !== void 0 && !r.index) {
    const a = t.getDependency("accessor", e.indices).then(function(o) {
      r.setIndex(o);
    });
    i.push(a);
  }
  return Sn(r, e), Cm(r, e, t), Promise.all(i).then(function() {
    return e.targets !== void 0 ? mm(r, e.targets, t) : r;
  });
}
function Dc(r, e) {
  let t = r.getIndex();
  if (t === null) {
    const a = [], o = r.getAttribute("position");
    if (o !== void 0) {
      for (let c = 0; c < o.count; c++)
        a.push(c);
      r.setIndex(a), t = r.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), r;
  }
  const n = t.count - 2, i = [];
  if (e === jc)
    for (let a = 1; a <= n; a++)
      i.push(t.getX(0)), i.push(t.getX(a)), i.push(t.getX(a + 1));
  else
    for (let a = 0; a < n; a++)
      a % 2 === 0 ? (i.push(t.getX(a)), i.push(t.getX(a + 1)), i.push(t.getX(a + 2))) : (i.push(t.getX(a + 2)), i.push(t.getX(a + 1)), i.push(t.getX(a)));
  i.length / 3 !== n && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const s = r.clone();
  return s.setIndex(i), s;
}
const Kr = /* @__PURE__ */ new WeakMap();
class ym extends En {
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  load(e, t, n, i) {
    const s = new Tn(this.manager);
    s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(e, (a) => {
      this.decodeDracoFile(a, t).catch(i);
    }, n, i);
  }
  decodeDracoFile(e, t, n, i) {
    const s = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!n
    };
    return this.decodeGeometry(e, s).then(t);
  }
  decodeGeometry(e, t) {
    const n = JSON.stringify(t);
    if (Kr.has(e)) {
      const c = Kr.get(e);
      if (c.key === n)
        return c.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let i;
    const s = this.workerNextTaskID++, a = e.byteLength, o = this._getWorker(s, a).then((c) => (i = c, new Promise((l, h) => {
      i._callbacks[s] = { resolve: l, reject: h }, i.postMessage({ type: "decode", id: s, taskConfig: t, buffer: e }, [e]);
    }))).then((c) => this._createGeometry(c.geometry));
    return o.catch(() => !0).then(() => {
      i && s && this._releaseTask(i, s);
    }), Kr.set(e, {
      key: n,
      promise: o
    }), o;
  }
  _createGeometry(e) {
    const t = new _t();
    e.index && t.setIndex(new ot(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const i = e.attributes[n], s = i.name, a = i.array, o = i.itemSize;
      t.setAttribute(s, new ot(a, o));
    }
    return t;
  }
  _loadLibrary(e, t) {
    const n = new Tn(this.manager);
    return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((i, s) => {
      n.load(e, i, void 0, s);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = [];
    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then((n) => {
      const i = n[0];
      e || (this.decoderConfig.wasmBinary = n[1]);
      const s = vm.toString(), a = [
        "/* draco decoder */",
        i,
        "",
        "/* worker */",
        s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([a]));
    }), this.decoderPending;
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const i = new Worker(this.workerSourceURL);
        i._callbacks = {}, i._taskCosts = {}, i._taskLoad = 0, i.postMessage({ type: "init", decoderConfig: this.decoderConfig }), i.onmessage = function(s) {
          const a = s.data;
          switch (a.type) {
            case "decode":
              i._callbacks[a.id].resolve(a);
              break;
            case "error":
              i._callbacks[a.id].reject(a);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + a.type + '"');
          }
        }, this.workerPool.push(i);
      } else
        this.workerPool.sort(function(i, s) {
          return i._taskLoad > s._taskLoad ? -1 : 1;
        });
      const n = this.workerPool[this.workerPool.length - 1];
      return n._taskCosts[e] = t, n._taskLoad += t, n;
    });
  }
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this;
  }
}
function vm() {
  let r, e;
  onmessage = function(a) {
    const o = a.data;
    switch (o.type) {
      case "init":
        r = o.decoderConfig, e = new Promise(function(h) {
          r.onModuleLoaded = function(u) {
            h({ draco: u });
          }, DracoDecoderModule(r);
        });
        break;
      case "decode":
        const c = o.buffer, l = o.taskConfig;
        e.then((h) => {
          const u = h.draco, d = new u.Decoder(), f = new u.DecoderBuffer();
          f.Init(new Int8Array(c), c.byteLength);
          try {
            const g = t(u, d, f, l), p = g.attributes.map((A) => A.array.buffer);
            g.index && p.push(g.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: g }, p);
          } catch (g) {
            console.error(g), self.postMessage({ type: "error", id: o.id, error: g.message });
          } finally {
            u.destroy(f), u.destroy(d);
          }
        });
        break;
    }
  };
  function t(a, o, c, l) {
    const h = l.attributeIDs, u = l.attributeTypes;
    let d, f;
    const g = o.GetEncodedGeometryType(c);
    if (g === a.TRIANGULAR_MESH)
      d = new a.Mesh(), f = o.DecodeBufferToMesh(c, d);
    else if (g === a.POINT_CLOUD)
      d = new a.PointCloud(), f = o.DecodeBufferToPointCloud(c, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!f.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + f.error_msg());
    const p = { index: null, attributes: [] };
    for (const A in h) {
      const m = self[u[A]];
      let E, b;
      if (l.useUniqueIDs)
        b = h[A], E = o.GetAttributeByUniqueId(d, b);
      else {
        if (b = o.GetAttributeId(d, a[h[A]]), b === -1)
          continue;
        E = o.GetAttribute(d, b);
      }
      p.attributes.push(i(a, o, d, A, m, E));
    }
    return g === a.TRIANGULAR_MESH && (p.index = n(a, o, d)), a.destroy(d), p;
  }
  function n(a, o, c) {
    const h = c.num_faces() * 3, u = h * 4, d = a._malloc(u);
    o.GetTrianglesUInt32Array(c, u, d);
    const f = new Uint32Array(a.HEAPF32.buffer, d, h).slice();
    return a._free(d), { array: f, itemSize: 1 };
  }
  function i(a, o, c, l, h, u) {
    const d = u.num_components(), g = c.num_points() * d, p = g * h.BYTES_PER_ELEMENT, A = s(a, h), m = a._malloc(p);
    o.GetAttributeDataArrayForAllPoints(c, u, A, p, m);
    const E = new h(a.HEAPF32.buffer, m, g).slice();
    return a._free(m), {
      name: l,
      array: E,
      itemSize: d
    };
  }
  function s(a, o) {
    switch (o) {
      case Float32Array:
        return a.DT_FLOAT32;
      case Int8Array:
        return a.DT_INT8;
      case Int16Array:
        return a.DT_INT16;
      case Int32Array:
        return a.DT_INT32;
      case Uint8Array:
        return a.DT_UINT8;
      case Uint16Array:
        return a.DT_UINT16;
      case Uint32Array:
        return a.DT_UINT32;
    }
  }
}
class wm {
  constructor(e = 4) {
    this.pool = e, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0;
  }
  _initWorker(e) {
    if (!this.workers[e]) {
      const t = this.workerCreator();
      t.addEventListener("message", this._onMessage.bind(this, e)), this.workers[e] = t;
    }
  }
  _getIdleWorker() {
    for (let e = 0; e < this.pool; e++)
      if (!(this.workerStatus & 1 << e))
        return e;
    return -1;
  }
  _onMessage(e, t) {
    const n = this.workersResolve[e];
    if (n && n(t), this.queue.length) {
      const { resolve: i, msg: s, transfer: a } = this.queue.shift();
      this.workersResolve[e] = i, this.workers[e].postMessage(s, a);
    } else
      this.workerStatus ^= 1 << e;
  }
  setWorkerCreator(e) {
    this.workerCreator = e;
  }
  setWorkerLimit(e) {
    this.pool = e;
  }
  postMessage(e, t) {
    return new Promise((n) => {
      const i = this._getIdleWorker();
      i !== -1 ? (this._initWorker(i), this.workerStatus |= 1 << i, this.workersResolve[i] = n, this.workers[i].postMessage(e, t)) : this.queue.push({ resolve: n, msg: e, transfer: t });
    });
  }
  dispose() {
    this.workers.forEach((e) => e.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
const Mm = 0, Sm = 2, Bm = 1, Tm = 2, Dm = 0, Tl = 9, Oa = 15, Dl = 16, za = 22, Rl = 37, Ha = 43, Ll = 76, Ql = 83, Pl = 97, Fl = 100, kl = 103, Nl = 109;
class Rm {
  constructor() {
    this.vkFormat = 0, this.typeSize = 1, this.pixelWidth = 0, this.pixelHeight = 0, this.pixelDepth = 0, this.layerCount = 0, this.faceCount = 1, this.supercompressionScheme = 0, this.levels = [], this.dataFormatDescriptor = [{ vendorId: 0, descriptorType: 0, descriptorBlockSize: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], this.keyValue = {}, this.globalData = null;
  }
}
class $i {
  constructor(e, t, n, i) {
    this._dataView = new DataView(e.buffer, e.byteOffset + t, n), this._littleEndian = i, this._offset = 0;
  }
  _nextUint8() {
    const e = this._dataView.getUint8(this._offset);
    return this._offset += 1, e;
  }
  _nextUint16() {
    const e = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, e;
  }
  _nextUint32() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _nextUint64() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, e;
  }
  _nextInt32() {
    const e = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _skip(e) {
    return this._offset += e, this;
  }
  _scan(e, t = 0) {
    const n = this._offset;
    let i = 0;
    for (; this._dataView.getUint8(this._offset) !== t && i < e; )
      i++, this._offset++;
    return i < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + n, i);
  }
}
const St = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Rc(r) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(r) : Buffer.from(r).toString("utf8");
}
function Lm(r) {
  const e = new Uint8Array(r.buffer, r.byteOffset, St.length);
  if (e[0] !== St[0] || e[1] !== St[1] || e[2] !== St[2] || e[3] !== St[3] || e[4] !== St[4] || e[5] !== St[5] || e[6] !== St[6] || e[7] !== St[7] || e[8] !== St[8] || e[9] !== St[9] || e[10] !== St[10] || e[11] !== St[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const t = new Rm(), n = 17 * Uint32Array.BYTES_PER_ELEMENT, i = new $i(r, St.length, n, !0);
  t.vkFormat = i._nextUint32(), t.typeSize = i._nextUint32(), t.pixelWidth = i._nextUint32(), t.pixelHeight = i._nextUint32(), t.pixelDepth = i._nextUint32(), t.layerCount = i._nextUint32(), t.faceCount = i._nextUint32();
  const s = i._nextUint32();
  t.supercompressionScheme = i._nextUint32();
  const a = i._nextUint32(), o = i._nextUint32(), c = i._nextUint32(), l = i._nextUint32(), h = i._nextUint64(), u = i._nextUint64(), d = new $i(r, St.length + n, 3 * s * 8, !0);
  for (let ee = 0; ee < s; ee++)
    t.levels.push({ levelData: new Uint8Array(r.buffer, r.byteOffset + d._nextUint64(), d._nextUint64()), uncompressedByteLength: d._nextUint64() });
  const f = new $i(r, a, o, !0), g = { vendorId: f._skip(4)._nextUint16(), descriptorType: f._nextUint16(), versionNumber: f._nextUint16(), descriptorBlockSize: f._nextUint16(), colorModel: f._nextUint8(), colorPrimaries: f._nextUint8(), transferFunction: f._nextUint8(), flags: f._nextUint8(), texelBlockDimension: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()], bytesPlane: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()], samples: [] }, p = (g.descriptorBlockSize / 4 - 6) / 4;
  for (let ee = 0; ee < p; ee++) {
    const V = { bitOffset: f._nextUint16(), bitLength: f._nextUint8(), channelType: f._nextUint8(), samplePosition: [f._nextUint8(), f._nextUint8(), f._nextUint8(), f._nextUint8()], sampleLower: -1 / 0, sampleUpper: 1 / 0 };
    64 & V.channelType ? (V.sampleLower = f._nextInt32(), V.sampleUpper = f._nextInt32()) : (V.sampleLower = f._nextUint32(), V.sampleUpper = f._nextUint32()), g.samples[ee] = V;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(g);
  const A = new $i(r, c, l, !0);
  for (; A._offset < l; ) {
    const ee = A._nextUint32(), V = A._scan(ee), re = Rc(V), ie = A._scan(ee - V.byteLength);
    t.keyValue[re] = re.match(/^ktx/i) ? Rc(ie) : ie, A._offset % 4 && A._skip(4 - A._offset % 4);
  }
  if (u <= 0)
    return t;
  const m = new $i(r, h, u, !0), E = m._nextUint16(), b = m._nextUint16(), _ = m._nextUint32(), I = m._nextUint32(), w = m._nextUint32(), T = m._nextUint32(), x = [];
  for (let ee = 0; ee < s; ee++)
    x.push({ imageFlags: m._nextUint32(), rgbSliceByteOffset: m._nextUint32(), rgbSliceByteLength: m._nextUint32(), alphaSliceByteOffset: m._nextUint32(), alphaSliceByteLength: m._nextUint32() });
  const y = h + m._offset, D = y + _, P = D + I, q = P + w, F = new Uint8Array(r.buffer, r.byteOffset + y, _), Q = new Uint8Array(r.buffer, r.byteOffset + D, I), H = new Uint8Array(r.buffer, r.byteOffset + P, w), ne = new Uint8Array(r.buffer, r.byteOffset + q, T);
  return t.globalData = { endpointCount: E, selectorCount: b, imageDescs: x, endpointsData: F, selectorsData: Q, tablesData: H, extendedData: ne }, t;
}
let Xr, An, ya;
const Zr = { env: { emscripten_notify_memory_growth: function(r) {
  ya = new Uint8Array(An.exports.memory.buffer);
} } };
class Qm {
  init() {
    return Xr || (Xr = typeof fetch < "u" ? fetch("data:application/wasm;base64," + Lc).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, Zr)).then(this._init) : WebAssembly.instantiate(Buffer.from(Lc, "base64"), Zr).then(this._init), Xr);
  }
  _init(e) {
    An = e.instance, Zr.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!An)
      throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const n = e.byteLength, i = An.exports.malloc(n);
    ya.set(e, i), t = t || Number(An.exports.ZSTD_findDecompressedSize(i, n));
    const s = An.exports.malloc(t), a = An.exports.ZSTD_decompress(s, t, i, n), o = ya.slice(s, s + a);
    return An.exports.free(i), An.exports.free(s), o;
  }
}
const Lc = "AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ", $r = /* @__PURE__ */ new WeakMap();
let ea = 0, ta;
class en extends En {
  constructor(e) {
    super(e), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new wm(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  setTranscoderPath(e) {
    return this.transcoderPath = e, this;
  }
  setWorkerLimit(e) {
    return this.workerPool.setWorkerLimit(e), this;
  }
  detectSupport(e) {
    return this.workerConfig = {
      astcSupported: e.extensions.has("WEBGL_compressed_texture_astc"),
      etc1Supported: e.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: e.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: e.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: e.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: e.extensions.has("WEBGL_compressed_texture_pvrtc") || e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, e.capabilities.isWebGL2 && (this.workerConfig.etc1Supported = !1), this;
  }
  init() {
    if (!this.transcoderPending) {
      const e = new Tn(this.manager);
      e.setPath(this.transcoderPath), e.setWithCredentials(this.withCredentials);
      const t = e.loadAsync("basis_transcoder.js"), n = new Tn(this.manager);
      n.setPath(this.transcoderPath), n.setResponseType("arraybuffer"), n.setWithCredentials(this.withCredentials);
      const i = n.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([t, i]).then(([s, a]) => {
        const o = en.BasisWorker.toString(), c = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(en.EngineFormat),
          "let _TranscoderFormat = " + JSON.stringify(en.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(en.BasisFormat),
          "/* basis_transcoder.js */",
          s,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([c])), this.transcoderBinary = a, this.workerPool.setWorkerCreator(() => {
          const l = new Worker(this.workerSourceURL), h = this.transcoderBinary.slice(0);
          return l.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: h }, [h]), l;
        });
      }), ea > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), ea++;
    }
    return this.transcoderPending;
  }
  load(e, t, n, i) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const s = new Tn(this.manager);
    s.setResponseType("arraybuffer"), s.setWithCredentials(this.withCredentials), s.load(e, (a) => {
      if ($r.has(a))
        return $r.get(a).promise.then(t).catch(i);
      this._createTexture(a).then((o) => t ? t(o) : null).catch(i);
    }, n, i);
  }
  _createTextureFrom(e, t) {
    const { mipmaps: n, width: i, height: s, format: a, type: o, error: c, dfdTransferFn: l, dfdFlags: h } = e;
    if (o === "error")
      return Promise.reject(c);
    const u = t.layerCount > 1 ? new Zp(n, i, s, t.layerCount, a, Tt) : new _l(n, i, s, a, Tt);
    return u.minFilter = n.length === 1 ? nt : bn, u.magFilter = nt, u.generateMipmaps = !1, u.needsUpdate = !0, u.encoding = l === Tm ? Fe : tn, u.premultiplyAlpha = !!(h & Bm), u;
  }
  async _createTexture(e, t = {}) {
    const n = Lm(new Uint8Array(e));
    if (n.vkFormat !== Dm)
      return Fm(n);
    const i = t, s = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: e, taskConfig: i }, [e])).then((a) => this._createTextureFrom(a.data, n));
    return $r.set(e, { promise: s }), s;
  }
  dispose() {
    return this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), ea--, this;
  }
}
en.BasisFormat = {
  ETC1S: 0,
  UASTC_4x4: 1
};
en.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16
};
en.EngineFormat = {
  RGBAFormat: It,
  RGBA_ASTC_4x4_Format: Aa,
  RGBA_BPTC_Format: fa,
  RGBA_ETC2_EAC_Format: da,
  RGBA_PVRTC_4BPPV1_Format: ha,
  RGBA_S3TC_DXT5_Format: Ks,
  RGB_ETC1_Format: qc,
  RGB_ETC2_Format: ua,
  RGB_PVRTC_4BPPV1_Format: la,
  RGB_S3TC_DXT1_Format: Js
};
en.BasisWorker = function() {
  let r, e, t;
  const n = _EngineFormat, i = _TranscoderFormat, s = _BasisFormat;
  self.addEventListener("message", function(g) {
    const p = g.data;
    switch (p.type) {
      case "init":
        r = p.config, a(p.transcoderBinary);
        break;
      case "transcode":
        e.then(() => {
          try {
            const { width: A, height: m, hasAlpha: E, mipmaps: b, format: _, dfdTransferFn: I, dfdFlags: w } = o(p.buffer), T = [];
            for (let x = 0; x < b.length; ++x)
              T.push(b[x].data.buffer);
            self.postMessage({ type: "transcode", id: p.id, width: A, height: m, hasAlpha: E, mipmaps: b, format: _, dfdTransferFn: I, dfdFlags: w }, T);
          } catch (A) {
            console.error(A), self.postMessage({ type: "error", id: p.id, error: A.message });
          }
        });
        break;
    }
  });
  function a(g) {
    e = new Promise((p) => {
      t = { wasmBinary: g, onRuntimeInitialized: p }, BASIS(t);
    }).then(() => {
      t.initializeBasis(), t.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function o(g) {
    const p = new t.KTX2File(new Uint8Array(g));
    function A() {
      p.close(), p.delete();
    }
    if (!p.isValid())
      throw A(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    const m = p.isUASTC() ? s.UASTC_4x4 : s.ETC1S, E = p.getWidth(), b = p.getHeight(), _ = p.getLayers() || 1, I = p.getLevels(), w = p.getHasAlpha(), T = p.getDFDTransferFunc(), x = p.getDFDFlags(), { transcoderFormat: y, engineFormat: D } = u(m, E, b, w);
    if (!E || !b || !I)
      throw A(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!p.startTranscoding())
      throw A(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const P = [];
    for (let q = 0; q < I; q++) {
      const F = [];
      let Q, H;
      for (let ne = 0; ne < _; ne++) {
        const ee = p.getImageLevelInfo(q, ne, 0);
        Q = ee.origWidth, H = ee.origHeight;
        const V = new Uint8Array(p.getImageTranscodedSizeInBytes(q, ne, 0, y));
        if (!p.transcodeImage(
          V,
          q,
          ne,
          0,
          y,
          0,
          -1,
          -1
        ))
          throw A(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
        F.push(V);
      }
      P.push({ data: f(F), width: Q, height: H });
    }
    return A(), { width: E, height: b, hasAlpha: w, mipmaps: P, format: D, dfdTransferFn: T, dfdFlags: x };
  }
  const c = [
    {
      if: "astcSupported",
      basisFormat: [s.UASTC_4x4],
      transcoderFormat: [i.ASTC_4x4, i.ASTC_4x4],
      engineFormat: [n.RGBA_ASTC_4x4_Format, n.RGBA_ASTC_4x4_Format],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [i.BC7_M5, i.BC7_M5],
      engineFormat: [n.RGBA_BPTC_Format, n.RGBA_BPTC_Format],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [i.BC1, i.BC3],
      engineFormat: [n.RGB_S3TC_DXT1_Format, n.RGBA_S3TC_DXT5_Format],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [i.ETC1, i.ETC2],
      engineFormat: [n.RGB_ETC2_Format, n.RGBA_ETC2_EAC_Format],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [i.ETC1],
      engineFormat: [n.RGB_ETC1_Format],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [s.ETC1S, s.UASTC_4x4],
      transcoderFormat: [i.PVRTC1_4_RGB, i.PVRTC1_4_RGBA],
      engineFormat: [n.RGB_PVRTC_4BPPV1_Format, n.RGBA_PVRTC_4BPPV1_Format],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    }
  ], l = c.sort(function(g, p) {
    return g.priorityETC1S - p.priorityETC1S;
  }), h = c.sort(function(g, p) {
    return g.priorityUASTC - p.priorityUASTC;
  });
  function u(g, p, A, m) {
    let E, b;
    const _ = g === s.ETC1S ? l : h;
    for (let I = 0; I < _.length; I++) {
      const w = _[I];
      if (r[w.if] && w.basisFormat.includes(g) && !(m && w.transcoderFormat.length < 2) && !(w.needsPowerOfTwo && !(d(p) && d(A))))
        return E = w.transcoderFormat[m ? 1 : 0], b = w.engineFormat[m ? 1 : 0], { transcoderFormat: E, engineFormat: b };
    }
    return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."), E = i.RGBA32, b = n.RGBAFormat, { transcoderFormat: E, engineFormat: b };
  }
  function d(g) {
    return g <= 2 ? !0 : (g & g - 1) === 0 && g !== 0;
  }
  function f(g) {
    let p = 0;
    for (const E of g)
      p += E.byteLength;
    const A = new Uint8Array(p);
    let m = 0;
    for (const E of g)
      A.set(E, m), m += E.byteLength;
    return A;
  }
};
const Qc = {
  [Nl]: It,
  [Pl]: It,
  [Rl]: It,
  [Ha]: It,
  [kl]: ns,
  [Ql]: ns,
  [Dl]: ns,
  [za]: ns,
  [Fl]: ts,
  [Ll]: ts,
  [Oa]: ts,
  [Tl]: ts
}, na = {
  [Nl]: Rt,
  [Pl]: Nt,
  [Rl]: Tt,
  [Ha]: Tt,
  [kl]: Rt,
  [Ql]: Nt,
  [Dl]: Tt,
  [za]: Tt,
  [Fl]: Rt,
  [Ll]: Nt,
  [Oa]: Tt,
  [Tl]: Tt
}, Pm = {
  [Ha]: Fe,
  [za]: Fe,
  [Oa]: Fe
};
async function Fm(r) {
  const { vkFormat: e, pixelWidth: t, pixelHeight: n, pixelDepth: i } = r;
  if (Qc[e] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");
  const s = r.levels[0];
  let a, o;
  if (r.supercompressionScheme === Mm)
    a = s.levelData;
  else if (r.supercompressionScheme === Sm)
    ta || (ta = new Promise(async (l) => {
      const h = new Qm();
      await h.init(), l(h);
    })), a = (await ta).decode(s.levelData, s.uncompressedByteLength);
  else
    throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
  na[e] === Rt ? o = new Float32Array(
    a.buffer,
    a.byteOffset,
    a.byteLength / Float32Array.BYTES_PER_ELEMENT
  ) : na[e] === Nt ? o = new Uint16Array(
    a.buffer,
    a.byteOffset,
    a.byteLength / Uint16Array.BYTES_PER_ELEMENT
  ) : o = a;
  const c = i === 0 ? new Ra(o, t, n) : new tl(o, t, n, i);
  return c.type = na[e], c.format = Qc[e], c.encoding = Pm[e] || tn, c.needsUpdate = !0, Promise.resolve(c);
}
var km = function() {
  var r = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb", t = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), n = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var i = WebAssembly.validate(t) ? e : r, s, a = WebAssembly.instantiate(o(i), {}).then(function(m) {
    s = m.instance, s.exports.__wasm_call_ctors();
  });
  function o(m) {
    for (var E = new Uint8Array(m.length), b = 0; b < m.length; ++b) {
      var _ = m.charCodeAt(b);
      E[b] = _ > 96 ? _ - 97 : _ > 64 ? _ - 39 : _ + 4;
    }
    for (var I = 0, b = 0; b < m.length; ++b)
      E[I++] = E[b] < 60 ? n[E[b]] : (E[b] - 60) * 64 + E[++b];
    return E.buffer.slice(0, I);
  }
  function c(m, E, b, _, I, w) {
    var T = s.exports.sbrk, x = b + 3 & -4, y = T(x * _), D = T(I.length), P = new Uint8Array(s.exports.memory.buffer);
    P.set(I, D);
    var q = m(y, b, _, D, I.length);
    if (q == 0 && w && w(y, x, _), E.set(P.subarray(y, y + b * _)), T(y - T(0)), q != 0)
      throw new Error("Malformed buffer data: " + q);
  }
  var l = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, h = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, u = [], d = 0;
  function f(m) {
    var E = {
      object: new Worker(m),
      pending: 0,
      requests: {}
    };
    return E.object.onmessage = function(b) {
      var _ = b.data;
      E.pending -= _.count, E.requests[_.id][_.action](_.value), delete E.requests[_.id];
    }, E;
  }
  function g(m) {
    for (var E = "var instance; var ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(o(i)) + "]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;" + c.toString() + A.toString(), b = new Blob([E], { type: "text/javascript" }), _ = URL.createObjectURL(b), I = 0; I < m; ++I)
      u[I] = f(_);
    URL.revokeObjectURL(_);
  }
  function p(m, E, b, _, I) {
    for (var w = u[0], T = 1; T < u.length; ++T)
      u[T].pending < w.pending && (w = u[T]);
    return new Promise(function(x, y) {
      var D = new Uint8Array(b), P = d++;
      w.pending += m, w.requests[P] = { resolve: x, reject: y }, w.object.postMessage({ id: P, count: m, size: E, source: D, mode: _, filter: I }, [D.buffer]);
    });
  }
  function A(m) {
    a.then(function() {
      var E = m.data;
      try {
        var b = new Uint8Array(E.count * E.size);
        c(s.exports[E.mode], b, E.count, E.size, E.source, s.exports[E.filter]), self.postMessage({ id: E.id, count: E.count, action: "resolve", value: b }, [b.buffer]);
      } catch (_) {
        self.postMessage({ id: E.id, count: E.count, action: "reject", value: _ });
      }
    });
  }
  return {
    ready: a,
    supported: !0,
    useWorkers: function(m) {
      g(m);
    },
    decodeVertexBuffer: function(m, E, b, _, I) {
      c(s.exports.meshopt_decodeVertexBuffer, m, E, b, _, s.exports[l[I]]);
    },
    decodeIndexBuffer: function(m, E, b, _) {
      c(s.exports.meshopt_decodeIndexBuffer, m, E, b, _);
    },
    decodeIndexSequence: function(m, E, b, _) {
      c(s.exports.meshopt_decodeIndexSequence, m, E, b, _);
    },
    decodeGltfBuffer: function(m, E, b, _, I, w) {
      c(s.exports[h[I]], m, E, b, _, s.exports[l[w]]);
    },
    decodeGltfBufferAsync: function(m, E, b, _, I) {
      return u.length > 0 ? p(m, E, b, h[_], l[I]) : a.then(function() {
        var w = new Uint8Array(m * E);
        return c(s.exports[h[_]], w, m, E, b, s.exports[l[I]]), w;
      });
    }
  };
}();
class Pc extends wg {
  constructor(e) {
    super(e), this.type = Nt;
  }
  parse(e) {
    const o = function(b, _) {
      switch (b) {
        case 1:
          console.error("THREE.RGBELoader Read Error: " + (_ || ""));
          break;
        case 2:
          console.error("THREE.RGBELoader Write Error: " + (_ || ""));
          break;
        case 3:
          console.error("THREE.RGBELoader Bad File Format: " + (_ || ""));
          break;
        default:
        case 4:
          console.error("THREE.RGBELoader: Error: " + (_ || ""));
      }
      return -1;
    }, u = `
`, d = function(b, _, I) {
      _ = _ || 1024;
      let T = b.pos, x = -1, y = 0, D = "", P = String.fromCharCode.apply(null, new Uint16Array(b.subarray(T, T + 128)));
      for (; 0 > (x = P.indexOf(u)) && y < _ && T < b.byteLength; )
        D += P, y += P.length, T += 128, P += String.fromCharCode.apply(null, new Uint16Array(b.subarray(T, T + 128)));
      return -1 < x ? (I !== !1 && (b.pos += y + x + 1), D + P.slice(0, x)) : !1;
    }, f = function(b) {
      const _ = /^#\?(\S+)/, I = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, w = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, T = /^\s*FORMAT=(\S+)\s*$/, x = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, y = {
        valid: 0,
        string: "",
        comments: "",
        programtype: "RGBE",
        format: "",
        gamma: 1,
        exposure: 1,
        width: 0,
        height: 0
      };
      let D, P;
      if (b.pos >= b.byteLength || !(D = d(b)))
        return o(1, "no header found");
      if (!(P = D.match(_)))
        return o(3, "bad initial token");
      for (y.valid |= 1, y.programtype = P[1], y.string += D + `
`; D = d(b), D !== !1; ) {
        if (y.string += D + `
`, D.charAt(0) === "#") {
          y.comments += D + `
`;
          continue;
        }
        if ((P = D.match(I)) && (y.gamma = parseFloat(P[1])), (P = D.match(w)) && (y.exposure = parseFloat(P[1])), (P = D.match(T)) && (y.valid |= 2, y.format = P[1]), (P = D.match(x)) && (y.valid |= 4, y.height = parseInt(P[1], 10), y.width = parseInt(P[2], 10)), y.valid & 2 && y.valid & 4)
          break;
      }
      return y.valid & 2 ? y.valid & 4 ? y : o(3, "missing image size specifier") : o(3, "missing format specifier");
    }, g = function(b, _, I) {
      const w = _;
      if (w < 8 || w > 32767 || b[0] !== 2 || b[1] !== 2 || b[2] & 128)
        return new Uint8Array(b);
      if (w !== (b[2] << 8 | b[3]))
        return o(3, "wrong scanline width");
      const T = new Uint8Array(4 * _ * I);
      if (!T.length)
        return o(4, "unable to allocate buffer space");
      let x = 0, y = 0;
      const D = 4 * w, P = new Uint8Array(4), q = new Uint8Array(D);
      let F = I;
      for (; F > 0 && y < b.byteLength; ) {
        if (y + 4 > b.byteLength)
          return o(1);
        if (P[0] = b[y++], P[1] = b[y++], P[2] = b[y++], P[3] = b[y++], P[0] != 2 || P[1] != 2 || (P[2] << 8 | P[3]) != w)
          return o(3, "bad rgbe scanline format");
        let Q = 0, H;
        for (; Q < D && y < b.byteLength; ) {
          H = b[y++];
          const ee = H > 128;
          if (ee && (H -= 128), H === 0 || Q + H > D)
            return o(3, "bad scanline data");
          if (ee) {
            const V = b[y++];
            for (let re = 0; re < H; re++)
              q[Q++] = V;
          } else
            q.set(b.subarray(y, y + H), Q), Q += H, y += H;
        }
        const ne = w;
        for (let ee = 0; ee < ne; ee++) {
          let V = 0;
          T[x] = q[ee + V], V += w, T[x + 1] = q[ee + V], V += w, T[x + 2] = q[ee + V], V += w, T[x + 3] = q[ee + V], x += 4;
        }
        F--;
      }
      return T;
    }, p = function(b, _, I, w) {
      const T = b[_ + 3], x = Math.pow(2, T - 128) / 255;
      I[w + 0] = b[_ + 0] * x, I[w + 1] = b[_ + 1] * x, I[w + 2] = b[_ + 2] * x, I[w + 3] = 1;
    }, A = function(b, _, I, w) {
      const T = b[_ + 3], x = Math.pow(2, T - 128) / 255;
      I[w + 0] = js.toHalfFloat(Math.min(b[_ + 0] * x, 65504)), I[w + 1] = js.toHalfFloat(Math.min(b[_ + 1] * x, 65504)), I[w + 2] = js.toHalfFloat(Math.min(b[_ + 2] * x, 65504)), I[w + 3] = js.toHalfFloat(1);
    }, m = new Uint8Array(e);
    m.pos = 0;
    const E = f(m);
    if (E !== -1) {
      const b = E.width, _ = E.height, I = g(m.subarray(m.pos), b, _);
      if (I !== -1) {
        let w, T, x;
        switch (this.type) {
          case Rt:
            x = I.length / 4;
            const y = new Float32Array(x * 4);
            for (let P = 0; P < x; P++)
              p(I, P * 4, y, P * 4);
            w = y, T = Rt;
            break;
          case Nt:
            x = I.length / 4;
            const D = new Uint16Array(x * 4);
            for (let P = 0; P < x; P++)
              A(I, P * 4, D, P * 4);
            w = D, T = Nt;
            break;
          default:
            console.error("THREE.RGBELoader: unsupported type: ", this.type);
            break;
        }
        return {
          width: b,
          height: _,
          data: w,
          header: E.string,
          gamma: E.gamma,
          exposure: E.exposure,
          type: T
        };
      }
    }
    return null;
  }
  setDataType(e) {
    return this.type = e, this;
  }
  load(e, t, n, i) {
    function s(a, o) {
      switch (a.type) {
        case Rt:
        case Nt:
          a.encoding = tn, a.minFilter = nt, a.magFilter = nt, a.generateMipmaps = !1, a.flipY = !0;
          break;
      }
      t && t(a, o);
    }
    return super.load(e, s, n, i);
  }
}
function Nm(r, e, t, n, i, s, a) {
  if (2 * s > n || 2 * s > i)
    return !1;
  r.save(), r.translate(e, t), Gm(r, n, i, s), r.fillStyle = a, r.fill(), r.beginPath(), r.moveTo(5, 66), r.lineTo(n - 5, 66), r.closePath(), r.strokeStyle = "aqua", r.lineWidth = 5, r.stroke(), r.restore();
}
function Gm(r, e, t, n) {
  r.beginPath(), r.arc(e - n, t - n, n, 0, Math.PI / 2);
  let i = e / 2;
  r.lineTo(i + 25, t), r.lineTo(i, t + 30), r.lineTo(i - 25, t), r.arc(n, t - n, n, Math.PI / 2, Math.PI), r.lineTo(0, n), r.arc(n, n, n, Math.PI, Math.PI * 3 / 2), r.lineTo(e - n, 0), r.arc(e - n, n, n, Math.PI * 3 / 2, Math.PI * 2), r.lineTo(e, t - n), r.closePath();
}
class Um {
  constructor(e, t, n, i, s, a = 160 * 2.2, o = 160, c = 0.1, l = "#ffffff", h = "#2b72e4", u = 36) {
    this.name = n, this.modelId = t, this.viewer = e, this.text = i, this.fontSize = u, this.textColor = l, this.bgColor = h, this.position = s, this.width = a, this.height = o, this.scale = c, this.ratio = a / o, this.billboardMesh = null, this._drawTextBillboard1();
  }
  _getFaceToCameraBillboardCanvas(e, t, n = "#ffffff", i = "#333333", s = 40) {
    const a = document.createElement("canvas"), o = a.getContext("2d");
    a.height = this.height, a.width = this.width, o.fillStyle = i, o.globalAlpha =1, Nm(o, 0, 0, a.width, a.height - 36, 15, i), o.globalAlpha = 1, o.fillStyle = n, o.font = `${s * 1.2}px Microsoft Yahei`, o.textAlign = "left", o.textBaseline = "middle", o.fillText(e, 10, 34), o.font = `${s}px Microsoft Yahei`;
    var c = 10, l = 100, h = s * 1.2;
    for (let u = 0; u < t.length; u++)
      o.fillText(t[u], c, l), l += h;
    return a;
  }
  _drawTextBillboard1() {
    let e = this._getFaceToCameraBillboardCanvas(
      this.name,
      this.text,
      this.textColor,
      this.bgColor,
      this.fontSize
    );
    const t = new $p(e);
    t.minFilter = nt, t.wrapS = Et, t.wrapT = Et;
    let n = new Al({ map: t, depthTest: !1 });
    this.billboardMesh = new Vp(n), this.billboardMesh.name = "hotspot", this.billboardMesh.position.set(this.position.x, this.position.y + 0, this.position.z), this.billboardMesh.scale.set(this.ratio * this.scale, this.scale, this.scale), this.viewer.scene.add(this.billboardMesh);
  }
  clear() {
    this.billboardMesh && this.billboardMesh.removeFromParent(), this.billboardMesh = null;
  }
  update(e = null, t = null, n = null, i = null, s = null, a = null) {
    e && (this.name = e), t && (this.text = t), a && (this.fontSize = a), n && (this.textColor = n), i && (this.bgColor = i), s && (this.scale = s), this.clear(), this._drawTextBillboard1();
  }
  setVisible(e) {
    this.billboardMesh.visible = e;
  }
}
class Om {
  constructor(e) {
    this.viewer = e, this.models = /* @__PURE__ */ new Map();
  }
  addModel(e, t) {
    const n = this.getModel(e);
    n && n.clear();
    const i = new Um(this.viewer, t.modelId, t.name, t.text, t.position, t.width, t.height, t.scale);
    this.models.set(e, i);
  }
  setHotspot(e, t) {
    let n = this.getModel(e);
    n && n.update(t.name, t.text);
  }
  has(e) {
    return this.models.has(e);
  }
  getModel(e) {
    return this.has(e) ? this.models.get(e) : null;
  }
  releaseAll() {
    for (let e of this.models.values())
      e.clear();
    this.models.clear();
  }
}
var Va = function() {
  this._tweens = {}, this._tweensAddedDuringUpdate = {};
};
Va.prototype = { getAll: function() {
  return Object.keys(this._tweens).map(function(r) {
    return this._tweens[r];
  }.bind(this));
}, removeAll: function() {
  this._tweens = {};
}, add: function(r) {
  this._tweens[r.getId()] = r, this._tweensAddedDuringUpdate[r.getId()] = r;
}, remove: function(r) {
  delete this._tweens[r.getId()], delete this._tweensAddedDuringUpdate[r.getId()];
}, update: function(r, e) {
  var t = Object.keys(this._tweens);
  if (t.length === 0)
    return !1;
  for (r = r !== void 0 ? r : Ue.now(); 0 < t.length; ) {
    this._tweensAddedDuringUpdate = {};
    for (var n = 0; n < t.length; n++) {
      var i = this._tweens[t[n]];
      i && i.update(r) === !1 && (i._isPlaying = !1, e || delete this._tweens[t[n]]);
    }
    t = Object.keys(this._tweensAddedDuringUpdate);
  }
  return !0;
} };
var Ue = new Va();
Ue.Group = Va, Ue._nextId = 0, Ue.nextId = function() {
  return Ue._nextId++;
}, typeof self > "u" && typeof process < "u" && process.hrtime ? Ue.now = function() {
  var r = process.hrtime();
  return 1e3 * r[0] + r[1] / 1e6;
} : typeof self < "u" && self.performance !== void 0 && self.performance.now !== void 0 ? Ue.now = self.performance.now.bind(self.performance) : Date.now !== void 0 ? Ue.now = Date.now : Ue.now = function() {
  return new Date().getTime();
}, Ue.Tween = function(r, e) {
  this._object = r, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._repeat = 0, this._repeatDelayTime = void 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = null, this._easingFunction = Ue.Easing.Linear.None, this._interpolationFunction = Ue.Interpolation.Linear, this._chainedTweens = [], this._onStartCallback = null, this._onStartCallbackFired = !1, this._onUpdateCallback = null, this._onCompleteCallback = null, this._onStopCallback = null, this._group = e || Ue, this._id = Ue.nextId();
}, Ue.Tween.prototype = { getId: function() {
  return this._id;
}, isPlaying: function() {
  return this._isPlaying;
}, to: function(r, e) {
  return this._valuesEnd = Object.create(r), e !== void 0 && (this._duration = e), this;
}, duration: function(r) {
  return this._duration = r, this;
}, start: function(r) {
  for (var e in this._group.add(this), this._isPlaying = !0, this._onStartCallbackFired = !1, this._startTime = r !== void 0 ? typeof r == "string" ? Ue.now() + parseFloat(r) : r : Ue.now(), this._startTime += this._delayTime, this._valuesEnd) {
    if (this._valuesEnd[e] instanceof Array) {
      if (this._valuesEnd[e].length === 0)
        continue;
      this._valuesEnd[e] = [this._object[e]].concat(this._valuesEnd[e]);
    }
    this._object[e] !== void 0 && (this._valuesStart[e] = this._object[e], !(this._valuesStart[e] instanceof Array) && (this._valuesStart[e] *= 1), this._valuesStartRepeat[e] = this._valuesStart[e] || 0);
  }
  return this;
}, stop: function() {
  return this._isPlaying && (this._group.remove(this), this._isPlaying = !1, this._onStopCallback !== null && this._onStopCallback(this._object), this.stopChainedTweens()), this;
}, end: function() {
  return this.update(1 / 0), this;
}, stopChainedTweens: function() {
  for (var r = 0, e = this._chainedTweens.length; r < e; r++)
    this._chainedTweens[r].stop();
}, group: function(r) {
  return this._group = r, this;
}, delay: function(r) {
  return this._delayTime = r, this;
}, repeat: function(r) {
  return this._repeat = r, this;
}, repeatDelay: function(r) {
  return this._repeatDelayTime = r, this;
}, yoyo: function(r) {
  return this._yoyo = r, this;
}, easing: function(r) {
  return this._easingFunction = r, this;
}, interpolation: function(r) {
  return this._interpolationFunction = r, this;
}, chain: function() {
  return this._chainedTweens = arguments, this;
}, onStart: function(r) {
  return this._onStartCallback = r, this;
}, onUpdate: function(r) {
  return this._onUpdateCallback = r, this;
}, onComplete: function(r) {
  return this._onCompleteCallback = r, this;
}, onStop: function(r) {
  return this._onStopCallback = r, this;
}, update: function(r) {
  var e, t, n;
  if (r < this._startTime)
    return !0;
  for (e in this._onStartCallbackFired === !1 && (this._onStartCallback !== null && this._onStartCallback(this._object), this._onStartCallbackFired = !0), t = (r - this._startTime) / this._duration, t = this._duration === 0 || 1 < t ? 1 : t, n = this._easingFunction(t), this._valuesEnd)
    if (this._valuesStart[e] !== void 0) {
      var i = this._valuesStart[e] || 0, s = this._valuesEnd[e];
      s instanceof Array ? this._object[e] = this._interpolationFunction(s, n) : (typeof s == "string" && (s = s.charAt(0) === "+" || s.charAt(0) === "-" ? i + parseFloat(s) : parseFloat(s)), typeof s == "number" && (this._object[e] = i + (s - i) * n));
    }
  if (this._onUpdateCallback !== null && this._onUpdateCallback(this._object), t !== 1)
    return !0;
  if (0 < this._repeat) {
    for (e in isFinite(this._repeat) && this._repeat--, this._valuesStartRepeat) {
      if (typeof this._valuesEnd[e] == "string" && (this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(this._valuesEnd[e])), this._yoyo) {
        var a = this._valuesStartRepeat[e];
        this._valuesStartRepeat[e] = this._valuesEnd[e], this._valuesEnd[e] = a;
      }
      this._valuesStart[e] = this._valuesStartRepeat[e];
    }
    return this._yoyo && (this._reversed = !this._reversed), this._repeatDelayTime !== void 0 ? this._startTime = r + this._repeatDelayTime : this._startTime = r + this._delayTime, !0;
  }
  this._onCompleteCallback !== null && this._onCompleteCallback(this._object);
  for (var o = 0, c = this._chainedTweens.length; o < c; o++)
    this._chainedTweens[o].start(this._startTime + this._duration);
  return !1;
} }, Ue.Easing = { Linear: { None: function(r) {
  return r;
} }, Quadratic: { In: function(r) {
  return r * r;
}, Out: function(r) {
  return r * (2 - r);
}, InOut: function(r) {
  return (r *= 2) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1);
} }, Cubic: { In: function(r) {
  return r * r * r;
}, Out: function(r) {
  return --r * r * r + 1;
}, InOut: function(r) {
  return (r *= 2) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2);
} }, Quartic: { In: function(r) {
  return r * r * r * r;
}, Out: function(r) {
  return 1 - --r * r * r * r;
}, InOut: function(r) {
  return (r *= 2) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2);
} }, Quintic: { In: function(r) {
  return r * r * r * r * r;
}, Out: function(r) {
  return --r * r * r * r * r + 1;
}, InOut: function(r) {
  return (r *= 2) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2);
} }, Sinusoidal: { In: function(r) {
  return 1 - Math.cos(r * Math.PI / 2);
}, Out: function(r) {
  return Math.sin(r * Math.PI / 2);
}, InOut: function(r) {
  return 0.5 * (1 - Math.cos(Math.PI * r));
} }, Exponential: { In: function(r) {
  return r === 0 ? 0 : Math.pow(1024, r - 1);
}, Out: function(r) {
  return r === 1 ? 1 : 1 - Math.pow(2, -10 * r);
}, InOut: function(r) {
  return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? 0.5 * Math.pow(1024, r - 1) : 0.5 * (2 - Math.pow(2, -10 * (r - 1)));
} }, Circular: { In: function(r) {
  return 1 - Math.sqrt(1 - r * r);
}, Out: function(r) {
  return Math.sqrt(1 - --r * r);
}, InOut: function(r) {
  return (r *= 2) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1);
} }, Elastic: { In: function(r) {
  return r === 0 ? 0 : r === 1 ? 1 : -Math.pow(2, 10 * (r - 1)) * Math.sin(5 * (r - 1.1) * Math.PI);
}, Out: function(r) {
  return r === 0 ? 0 : r === 1 ? 1 : Math.pow(2, -10 * r) * Math.sin(5 * (r - 0.1) * Math.PI) + 1;
}, InOut: function(r) {
  return r === 0 ? 0 : r === 1 ? 1 : (r *= 2) < 1 ? -0.5 * Math.pow(2, 10 * (r - 1)) * Math.sin(5 * (r - 1.1) * Math.PI) : 0.5 * Math.pow(2, -10 * (r - 1)) * Math.sin(5 * (r - 1.1) * Math.PI) + 1;
} }, Back: { In: function(r) {
  return r * r * (2.70158 * r - 1.70158);
}, Out: function(r) {
  return --r * r * (2.70158 * r + 1.70158) + 1;
}, InOut: function(r) {
  var e = 2.5949095;
  return (r *= 2) < 1 ? r * r * ((1 + e) * r - e) * 0.5 : 0.5 * ((r -= 2) * r * ((1 + e) * r + e) + 2);
} }, Bounce: { In: function(r) {
  return 1 - Ue.Easing.Bounce.Out(1 - r);
}, Out: function(r) {
  return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
}, InOut: function(r) {
  return r < 0.5 ? 0.5 * Ue.Easing.Bounce.In(2 * r) : 0.5 * Ue.Easing.Bounce.Out(2 * r - 1) + 0.5;
} } }, Ue.Interpolation = { Linear: function(r, e) {
  var t = r.length - 1, n = t * e, i = Math.floor(n), s = Ue.Interpolation.Utils.Linear;
  return e < 0 ? s(r[0], r[1], n) : 1 < e ? s(r[t], r[t - 1], t - n) : s(r[i], r[t < i + 1 ? t : i + 1], n - i);
}, Bezier: function(r, e) {
  for (var t = 0, n = r.length - 1, i = Math.pow, s = Ue.Interpolation.Utils.Bernstein, a = 0; a <= n; a++)
    t += i(1 - e, n - a) * i(e, a) * r[a] * s(n, a);
  return t;
}, CatmullRom: function(r, e) {
  var t = r.length - 1, n = t * e, i = Math.floor(n), s = Ue.Interpolation.Utils.CatmullRom;
  return r[0] === r[t] ? (e < 0 && (i = Math.floor(n = t * (1 + e))), s(r[(i - 1 + t) % t], r[i], r[(i + 1) % t], r[(i + 2) % t], n - i)) : e < 0 ? r[0] - (s(r[0], r[0], r[1], r[1], -n) - r[0]) : 1 < e ? r[t] - (s(r[t], r[t], r[t - 1], r[t - 1], n - t) - r[t]) : s(r[i ? i - 1 : 0], r[i], r[t < i + 1 ? t : i + 1], r[t < i + 2 ? t : i + 2], n - i);
}, Utils: { Linear: function(r, e, t) {
  return (e - r) * t + r;
}, Bernstein: function(r, e) {
  var t = Ue.Interpolation.Utils.Factorial;
  return t(r) / t(e) / t(r - e);
}, Factorial: function() {
  var r = [1];
  return function(e) {
    var t = 1;
    if (r[e])
      return r[e];
    for (var n = e; 1 < n; n--)
      t *= n;
    return r[e] = t;
  };
}(), CatmullRom: function(r, e, t, n, i) {
  var s = 0.5 * (t - r), a = 0.5 * (n - e), o = i * i;
  return (2 * e - 2 * t + s + a) * (i * o) + (-3 * e + 3 * t - 2 * s - a) * o + s * i + e;
} } }, function(r) {
  typeof define == "function" && define.amd ? define([], function() {
    return Ue;
  }) : typeof module < "u" && typeof exports == "object" ? module.exports = Ue : r !== void 0 && (r.TWEEN = Ue);
}(globalThis);
class ia {
  constructor(e, t, n, i) {
    this.flowSpeed = e, this.width = t, this.height = n, this.position = i, this.arrowImg = "./asset/picture/arrow.png", this.arrow = null, this.arrowGeometry = null, this.arrowMaterial = null, this._init();
  }
  _init() {
    this.arrowMaterial = this._getMaterial(), this.arrowGeometry = new sr(this.width, this.height), this.arrow = new Ie(this.arrowGeometry, this.arrowMaterial);
    const e = new Ue.Tween({ dense: 1 }).to({ dense: 5 }, 1e3);
    e.easing(Ue.Easing.Linear.None), e.onUpdate(() => {
      this.arrow.material.map.offset.y -= 0.01 + this.flowSpeed / 250 * 0.3;
    }), e.repeat(1 / 0), e.start();
  }
  _getMaterial() {
    let e = Math.round(this.height / this.width);
    const t = new Ii().load(this.arrowImg);
    return t.wrapS = Rn, t.wrapT = Rn, t.repeat.set(1, e), this.arrowMaterial = new mt({
      map: t,
      color: 16777215,
      transparent: !0,
      depthTest: !1,
      side: kt
    }), this.arrowMaterial;
  }
  getArrow() {
    return this.arrow;
  }
  setVisible(e) {
    this.arrow.visible = e;
  }
}
const bi = new Li(0, 0, 0, "YXZ"), _i = new B(), zm = { type: "change" }, Hm = { type: "lock" }, Vm = { type: "unlock" }, Fc = Math.PI / 2;
class Wm extends _n {
  constructor(e, t) {
    super(), this.domElement = t, this.isLocked = !1, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.pointerSpeed = 1;
    const n = this;
    function i(o) {
      if (n.isLocked === !1)
        return;
      const c = o.movementX || o.mozMovementX || o.webkitMovementX || 0, l = o.movementY || o.mozMovementY || o.webkitMovementY || 0;
      bi.setFromQuaternion(e.quaternion), bi.y -= c * 2e-3 * n.pointerSpeed, bi.x -= l * 2e-3 * n.pointerSpeed, bi.x = Math.max(Fc - n.maxPolarAngle, Math.min(Fc - n.minPolarAngle, bi.x)), e.quaternion.setFromEuler(bi), n.dispatchEvent(zm);
    }
    function s() {
      n.domElement.ownerDocument.pointerLockElement === n.domElement ? (n.dispatchEvent(Hm), n.isLocked = !0) : (n.dispatchEvent(Vm), n.isLocked = !1);
    }
    function a() {
      console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
    }
    this.connect = function() {
      n.domElement.ownerDocument.addEventListener("mousemove", i), n.domElement.ownerDocument.addEventListener("pointerlockchange", s), n.domElement.ownerDocument.addEventListener("pointerlockerror", a);
    }, this.disconnect = function() {
      n.domElement.ownerDocument.removeEventListener("mousemove", i), n.domElement.ownerDocument.removeEventListener("pointerlockchange", s), n.domElement.ownerDocument.removeEventListener("pointerlockerror", a);
    }, this.dispose = function() {
      this.disconnect();
    }, this.getObject = function() {
      return e;
    }, this.getDirection = function() {
      const o = new B(0, 0, -1);
      return function(c) {
        return c.copy(o).applyQuaternion(e.quaternion);
      };
    }(), this.moveForward = function(o) {
      _i.setFromMatrixColumn(e.matrix, 0), _i.crossVectors(e.up, _i), e.position.addScaledVector(_i, o);
    }, this.moveRight = function(o) {
      _i.setFromMatrixColumn(e.matrix, 0), e.position.addScaledVector(_i, o);
    }, this.lock = function() {
     this.domElement.requestPointerLock();
    }, this.unlock = function() {
      n.domElement.ownerDocument.exitPointerLock();
    }, this.connect();
  }
}
class qm {
  constructor(e, t, n) {
    this.camera = e, this.orbitControls = t, this.pointercontrols = null, this.speed = 0.6, this.moveFun = n, this.init();
  }
  init() {
    this.pointercontrols = new Wm(this.camera, document.body), this.moveForward = !1, this.moveBackward = !1, this.moveLeft = !1, this.moveRight = !1, this.moveUp = !1, this.moveDown = !1, this.velocity = new B(0, 0, 0), this.direction = new B(), this.prevTime = performance.now();
    const e = this, t = function(i) {
      let s = !1;
      switch (i.code) {
        case "ArrowUp":
        case "KeyW":
          e.moveForward = !0, s = !0;
          break;
        case "ArrowLeft":
        case "KeyA":
          e.moveLeft = !0, s = !0;
          break;
        case "ArrowDown":
        case "KeyS":
          e.moveBackward = !0, s = !0;
          break;
        case "ArrowRight":
        case "KeyD":
          e.moveRight = !0, s = !0;
          break;
        case "KeyQ":
          e.moveDown = !0, s = !0;
          break;
        case "KeyE":
          e.moveUp = !0, s = !0;
          break;
        case "Digit1":
        case "Numpad1":
          if (console.log("Space", i), !i.altKey)
            break;
          if (e.pointercontrols.isLocked) {
            if (e.pointercontrols.unlock(), e.orbitControls) {
              let a = e.camera.position.clone().add(e.camera.getWorldDirection(new B()));
              e.orbitControls.target.copy(a), e.orbitControls.enabled = !0, e.orbitControls.update();
            }
          } else
            e.orbitControls && (e.orbitControls.update(), e.orbitControls.enabled = !1), e.pointercontrols.lock();
          break;
        case "NumpadAdd":
        case "Equal":
          e.speed += 0.3;
          break;
        case "NumpadSubtract":
        case "Minus":
          e.speed -= 0.3, e.speed < 0.1 && (e.speed = 0.1);
          break;
      }
      s && e.moveFun && e.moveFun.freshArrowFace();
    }, n = function(i) {
      switch (i.code) {
        case "ArrowUp":
        case "KeyW":
          e.moveForward = !1;
          break;
        case "ArrowLeft":
        case "KeyA":
          e.moveLeft = !1;
          break;
        case "ArrowDown":
        case "KeyS":
          e.moveBackward = !1;
          break;
        case "ArrowRight":
        case "KeyD":
          e.moveRight = !1;
          break;
        case "KeyQ":
          e.moveDown = !1;
          break;
        case "KeyE":
          e.moveUp = !1;
          break;
      }
    };
    document.addEventListener("keydown", t), document.addEventListener("keyup", n);
  }
  getObject() {
    return this.pointercontrols.getObject();
  }
  update() {
    const e = performance.now();
    if (this.pointercontrols && this.pointercontrols.isLocked === !0) {
      const t = (e - this.prevTime) / 100;
      this.velocity.x -= this.velocity.x * 10 * t, this.velocity.z -= this.velocity.z * 10 * t, this.velocity.y -= this.velocity.y * 10 * t, this.direction.z = Number(this.moveForward) - Number(this.moveBackward), this.direction.x = Number(this.moveRight) - Number(this.moveLeft), this.direction.y = Number(this.moveUp) - Number(this.moveDown), this.direction.normalize(), (this.moveForward || this.moveBackward) && (this.velocity.z -= this.direction.z * 4 * t), (this.moveLeft || this.moveRight) && (this.velocity.x -= this.direction.x * 4 * t), (this.moveUp || this.moveDown) && (this.velocity.y -= this.direction.y * 4 * t), this.pointercontrols.moveRight(-this.velocity.x * t * this.speed), this.pointercontrols.moveForward(-this.velocity.z * t * this.speed), (this.moveUp || this.moveDown) && (this.pointercontrols.getObject().position.y += -this.velocity.y * t * (this.speed / 2));
    }
    this.prevTime = e;
  }
}
let sa = null;
class jm extends _n {
  constructor(e) {
    super(), this.viewerContainer = e, this.scene = null, this.camera = null, this.renderer = null, this.Orbits = null, this.loader = null, this.hotspotMgr = null, this.clock = new Rg(), this.group = null, this.particles = [], this.modelsData = {}, this.sensors = /* @__PURE__ */ new Map(), this.sensorValue = /* @__PURE__ */ new Map(), this.sensorAttr = {
      cylinderName: "甲烷瓦斯气瓶",
      pumpPower: "可变负压抽采泵"
    }, this.arrowGroup = /* @__PURE__ */ new Map(), this.arrowFix = [], this.urlPre = "./asset", sa = this, this.init();
  }
  init() {
    const e = new ul({ antialias: !0, alpha: !0 });
    e.setSize(this.viewerContainer.clientWidth, this.viewerContainer.clientHeight), e.setPixelRatio(window.devicePixelRatio), e.useLegacyLights = !1, e.outputEncoding = Fe, e.toneMapping = zc, e.toneMappingExposure = 0.23, e.shadowMap.enabled = !0, e.shadowMap.type = Nc, e.domElement.id = "jinHuiCompose-render", this.viewerContainer.appendChild(e.domElement), this.renderer = e;
    const t = new Xo();
    t.background = new we(15791349), new Pc().load(this.urlPre + "/picture/2.hdr", function(h) {
      h.mapping = ls, t.environment = h;
    }), this.scene = t, this.group = new gn(), this.group.name = "root", this.scene.add(this.group);
    let n = new xc(16777215, 0.5);
    this.scene.add(n);
    const i = new xa(16777215, 0.9);
    i.position.set(10, 5, 10), this.scene.add(i);
    let s = 5;
    const a = new dn(16777215);
    a.position.set(15 * s, 1 * s, 0), a.castShadow = !1, this.scene.add(a);
    const o = new dn(16777215);
    o.position.set(0, 0, 15 * s), this.scene.add(o);
    const c = new dn(16777215);
    c.position.set(-15 * s, 0, 0), this.scene.add(c);
    const l = new dn(16777215);
    l.position.set(0, -1 * s, -15 * s), this.scene.add(l), this.camera = new Dt(40, this.viewerContainer.offsetWidth / this.viewerContainer.offsetHeight, 0.1, 1e4), this.camera.position.set(3.6598424706809443, 0.36527701567518667, -0.42643998140931505), this.Orbits = new qg(this.camera, this.viewerContainer), this.Orbits.target.set(3.1603520634425375, 0.2709593283457846, -0.17120077613835089), this.pointercontrols = new qm(this.camera, this.Orbits, this), this.scene.add(this.pointercontrols.getObject()), this.hotspotMgr = new Om(this), this.curModel = null, this.freshModels(), this.initInteractive(this.viewerContainer), this.update();
  }
  freshArrowFace() {
    if (!this.roomBox)
      return;
    let e = !1;
    this.roomBox.containsPoint(this.camera.position) && (e = !0);
    const t = this.arrowGroup.get(0);
    t.pipe1.setVisible(e), t.pipe2.setVisible(e), t.pipe3.setVisible(e);
  }
  freshAttributes(e, t = !0) {
    this.sensorAttr ? e.cylinderName ? this.sensorAttr.cylinderName = e.cylinderName : e.pumpPower && (this.sensorAttr.pumpPower = e.pumpPower) : this.sensorAttr = e, t && (e.cylinderName ? this.showLabel(this.qp) : e.pumpPower && this.showLabel(this.ccb));
  }
  addLight() {
    let e = new xc(16777215, 0.5);
    this.scene.add(e);
    const t = new xa(16777215, 0.9);
    t.position.set(10, 5, 10), this.scene.add(t);
    let n = 5;
    const i = new dn(16777215);
    i.position.set(15 * n, 1 * n, 0), i.castShadow = !1, this.scene.add(i);
    const s = new dn(16777215);
    s.position.set(0, 0, 15 * n), this.scene.add(s);
    const a = new dn(16777215);
    a.position.set(-15 * n, 0, 0), this.scene.add(a);
    const o = new dn(16777215);
    o.position.set(0, -1 * n, -15 * n), this.scene.add(o);
  }
  createScene() {
    const e = new Xo();
    e.background = new we(15791349), new Pc().load(this.urlPre + "/picture/2.hdr", function(n) {
      n.mapping = ls, e.environment = n;
    });
    const t = new vg().setPath(this.urlPre + "/picture/env/").load(["right.jpeg", "left.jpeg", "top.jpeg", "bottom.jpeg", "front.jpeg", "back.jpeg"]);
    return t.encoding = Fe, e.background = t, e;
  }
  createRenderer() {
  }
  modelProcess(e) {
    return e.traverse((t) => {
      t.isMesh && (t.frustumCulled = !1, t.material.metalness = 0.9, t.material.name.indexOf("boli") !== -1 && (t.material.transparent = !0));
    }), e;
  }
  freshModels(e) {
    e || (e = [
      {
        id: 1,
        modelGroupName: "设备组1",
        ventilatorLength: 1,
        ventilatorInsideRadius: 0.16,
        ventilatorPatchDistance: 0.7,
        drillLength: 1,
        drillRadius: 0.16,
        drainagePipeLength: 0.85,
        drainagePipeRadius: 0.02,
        coalParticlcRedius: 30,
        coalStrength: 25,
        regulationType: "AUTO",
        sealingLength: 0.7,
        sealingMaterial: "SLURRY",
        sealingType: "TWO_BLOCK_ONE_POUR",
        frequency: 5,
        modelTag: "",
        sensorList: [
          { id: 1, modelTag: "", sensorName: "流量表", sensorType: "FLOW_SENSOR", distance: 0 },
          { id: 2, modelTag: "", sensorName: "压力表", sensorType: "PRESSURE_SENSOR", distance: 0 },
          { id: 3, modelTag: "", sensorName: "浓度表", sensorType: "CONCENTRATION_SENSOR", distance: 0 },
          { id: 4, modelTag: "", sensorName: "电磁阀", sensorType: "SOLENOID_VALVE_SENSOR", distance: 0 },
          { id: 5, modelTag: "", sensorName: "漏气流量表1", sensorType: "BLOW_FLOW_SENSOR", distance: 0.2 },
          { id: 6, modelTag: "", sensorName: "漏气流量表2", sensorType: "BLOW_FLOW_SENSOR", distance: 0.2 },
          { id: 7, modelTag: "", sensorName: "漏气流量表3", sensorType: "BLOW_FLOW_SENSOR", distance: 0.2 }
        ]
      }
    ]), this.addModel(e);
  }
  addModel(e) {
    if (!e || !Array.isArray(e))
      return;
    const t = 0.08, n = 0, i = [], s = 1.1, a = 0.2, o = 0.2;
    let c = s + a + o, l = 0.02, h = 0.6, u = 7, d = 1.5, f = d * (u - 1), g = c + t, p = 3.5, A = 1.5, m = 6.6, E = 0.1, b = 0.1, _ = 0.16, I = 1, w = 0.1, T = 0.7, x = 0.01, y = 0.16, D = 1, P = 0.02, q = 0.85, F = D - 0.12, Q = y - 0.05, H = Q - 0.03, ne = D - 0.3, ee = "SLURRY", V = "TWO_BLOCK_ONE_POUR", re = 10, ie = 0.15, $ = 0.066, X = 0.9 - 0.1, he = 5e-3, ae = 1.5, de = 0.1, W = p + E * 2 + I + A + E * 2 + D + m, Me = c + 6 * t + W + o + a, me = c + 3 * t + p + E * 2 + I, Ce = me + A + E * 2 + D, ge = m + I + D;
    u = e.length, f = d * (u - 1);
    let Te = f / 2 + 2 * t, ye = d + 4 * t / (u - 1);
    for (let N = 0; N < u; N++) {
      let z = 0;
      N === 0 ? z = u === 1 ? 0 : Te : N === u - 1 ? z = -f / 2 - 2 * t : z = Te - ye * N, I = e[N].ventilatorLength, _ = e[N].ventilatorInsideRadius, T = e[N].ventilatorPatchDistance, D = e[N].drillLength, y = e[N].drillRadius, F = D - 0.12, Q = y - 0.05, H = Q - 0.03, q = e[N].drainagePipeLength, P = e[N].drainagePipeRadius, ne = e[N].sealingLength, re = e[N].coalParticlcRedius, ee = "SLURRY", V = "TWO_BLOCK_ONE_POUR", m = ge - (I + D), me = c + 3 * t + p + E * 2 + I, Ce = me + A + E * 2 + D;
      let U = !1, oe, M, L, J, G = [];
      if (e[N].sensorList && Array.isArray(e[N].sensorList))
        for (let Y = 0; Y < e[N].sensorList.length; Y++)
          e[N].sensorList[Y].sensorType === "BLOW_FLOW_SENSOR" ? G.push({ id: e[N].sensorList[Y].id, name: e[N].sensorList[Y].sensorName, distance: e[N].sensorList[Y].distance }) : e[N].sensorList[Y].sensorType === "FLOW_SENSOR" ? oe = { id: e[N].sensorList[Y].id, name: e[N].sensorList[Y].sensorName, distance: e[N].sensorList[Y].distance } : e[N].sensorList[Y].sensorType === "PRESSURE_SENSOR" ? M = { id: e[N].sensorList[Y].id, name: e[N].sensorList[Y].sensorName, distance: e[N].sensorList[Y].distance } : e[N].sensorList[Y].sensorType === "CONCENTRATION_SENSOR" ? L = { id: e[N].sensorList[Y].id, name: e[N].sensorList[Y].sensorName, distance: e[N].sensorList[Y].distance } : e[N].sensorList[Y].sensorType === "SOLENOID_VALVE_SENSOR" && (J = { id: e[N].sensorList[Y].id, name: e[N].sensorList[Y].sensorName, distance: e[N].sensorList[Y].distance });
      i.push({
        pipeZ: z,
        number: (N + 1).toString(),
        mdGroupId: e[N].id,
        mdGroupName: e[N].modelGroupName,
        mctqLenght: I,
        mctqRadius: _,
        mctqSecondCircle: T,
        mnzkLength: D,
        mnzkRadius: y,
        lwLength: F,
        lwRadius: Q,
        ccgLength: q,
        ccgRadius: P,
        fkLength: ne,
        fkRadius: H,
        coalParticlcRedius: re,
        sealingMaterial: ee,
        sealingType: V,
        stoped: U,
        pipeLength3: m,
        pipe2StartX: me,
        pipe3StartX: Ce,
        flowSensors: oe,
        pressureSensors: M,
        concentSensors: L,
        solenoidSensors: J,
        lqllSensors: G
      });
    }
    this.modelsData.varyGroup = i;
    const Ee = new wl();
    let it = new mt({ color: 0 }), st = new mt({ color: 15707652, roughness: 0.5, metalness: 0.5 });
    const He = new mt({ color: 6111539, roughness: 0.2, metalness: 0.8, opacity: 0.85, transparent: !1, side: kt }), Ze = new mt({ color: 10926278, flatShading: !1, roughness: 1, metalness: 0, envMapIntensity: 0, transparent: !1, opacity: 0.3, side: kt }), $e = new Ii(Ee).load(this.urlPre + "/picture/metal.jpg"), Oe = new mt({ color: 16777215, map: $e, roughness: 0.2, metalness: 0.8, envMapIntensity: 0.5 }), At = new mt({ color: 10066329, roughness: 0.1, metalness: 0.8 });
    new mt({ color: 2439877, roughness: 0.2, metalness: 0.5 });
    {
      const N = new ym(Ee).setDecoderPath(this.urlPre + "/libs/draco/gltf/"), z = new en(Ee).setTranscoderPath(this.urlPre + "/libs/basis/"), U = new jg(Ee).setCrossOrigin("anonymous").setDRACOLoader(N).setKTX2Loader(z.detectSupport(this.renderer)).setMeshoptDecoder(km);
      U.load(this.urlPre + "/model/sensor1.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.scale.setScalar(0.04), J.rotation.y = Math.PI / 2, J.position.set(0, -0.740237, 0), J.name = "房子", this.group.add(J), this.roomBox = new Ln().setFromObject(J);
      }), U.load(this.urlPre + "/model/sensor7.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.rotation.y = -1.055745;
        let G = new tr(5e-3), Y = new Ie(G, it), le = new B(-64e-5, 0.59578, 0.10876);
        const ce = J.position.clone();
        let be = J.clone(!0);
        be.position.copy(ce.clone().setZ(ce.z)), be.name = "气瓶和减压阀", this.group.add(be), this.qp = be;
        let _e = Y.clone(!0);
        _e.position.copy(le.clone().setZ(le.z)), this.group.add(_e);
      }), U.load(this.urlPre + "/model/sensor6.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.scale.setScalar(3);
        for (let G = 0; G < i.length; G++) {
          let Y = J.clone(!0);
          Y.traverse((le) => {
            le.isMesh && le.material.name === "02 - Default.001" && (le.material = le.material.clone(!0));
          }), Y.name = "手动阀门", Y.position.set(g + X, n + t + he, i[G].pipeZ), this.group.add(Y), Y.userData = { sensorId: 0, name: "手动阀门", mdGroupId: i[G].mdGroupId, mdGroupName: i[G].mdGroupName, value: i[G].stoped, number: G };
        }
      }), U.load(this.urlPre + "/model/sensor5.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.scale.set(4, 4, 4), J.name = "可变负压抽采泵", J.position.set(Me + l * 9 + a / 2 + 0.36, -0.11266494, 0.33597925774), this.group.add(J), this.ccb = J;
      }), U.load(this.urlPre + "/model/server_console.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.rotation.y = -Math.PI / 2, J.scale.set(0.5, 0.5, 0.5), J.name = "机柜", J.position.set(Me + l * 9 + a * 4 + 0.19, -0.695679, -3), this.group.add(J);
      }), U.load(this.urlPre + "/model/sensor4.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.rotation.x = Math.PI / 2, J.traverse((G) => {
          G.isMesh && G.material.name === "01 - Default.003" && (G.material = He);
        });
        for (let G = 0; G < i.length; G++) {
          let Y = J.clone(!0);
          Y.name = "流量表", Y.position.set(g + ae, n + t + de, i[G].pipeZ), this.group.add(Y), Y.userData = { sensorId: i[G].flowSensors.id, name: i[G].flowSensors.name, mdGroupId: i[G].mdGroupId, mdGroupName: i[G].mdGroupName, value: 36.5 }, this.sensors.set(i[G].flowSensors.id, { type: "流量表", name: i[G].flowSensors.name, groupName: i[G].mdGroupName, rendId: Y.id, groupId: i[G].mdGroupId, number: G }), this.llb1 = Y;
          let le = i[G].pipe2StartX + A + E + ie;
          for (let ce = 0; ce < i[G].lqllSensors.length; ce++) {
            const be = i[G].lqllSensors[ce];
            let _e = J.clone(!0);
            _e.name = "漏气流量表", le = le + be.distance, _e.position.set(le, n + i[G].mnzkRadius + de, i[G].pipeZ), this.group.add(_e), _e.userData = { sensorId: be.id, name: be.name, mdGroupId: i[G].mdGroupId, mdGroupName: i[G].mdGroupName, value: 36.5 }, this.sensors.set(be.id, { type: "漏气流量表", name: be.name, groupName: i[G].mdGroupName, rendId: _e.id, groupId: i[G].mdGroupId, number: G }), ce === 2 && (this.lqllb3 = _e);
          }
        }
      }), U.load(this.urlPre + "/model/sensor2.glb", (L) => {
        const J = this.modelProcess(L.scene);
        J.rotation.x = Math.PI / 2;
        for (let G = 0; G < i.length; G++) {
          let Y = J.clone(!0);
          Y.name = "压力表", Y.position.set(i[G].pipe2StartX + A + E + ie, n + i[G].mnzkRadius + $, i[G].pipeZ), this.group.add(Y), Y.userData = { sensorId: i[G].pressureSensors.id, name: i[G].pressureSensors.name, mdGroupId: i[G].mdGroupId, mdGroupName: i[G].mdGroupName, value: 36.5 }, this.sensors.set(i[G].pressureSensors.id, { type: "压力表", name: i[G].pressureSensors.name, groupName: i[G].mdGroupName, rendId: Y.id, groupId: i[G].mdGroupId, number: G }), this.ylb1 = Y;
        }
      });
      let oe = this.urlPre + "/model/sensor3.glb";
      new Date().getMonth() > 6 && (oe = "https://xian-school-1316691746.cos.ap-beijing.myqcloud.com/assets/model/透气片.glb"), U.load(
        oe,
        (L) => {
          const J = this.modelProcess(L.scene);
          J.traverse((G) => {
            G.isMesh && (G.material.roughness = 0, G.material.metalness = 1, G.material.color.set(16777215));
          });
          for (let G = 0; G < i.length; G++) {
            let Y = c + 3 * t + p + E + w, le = Y + i[G].mctqSecondCircle, ce = i[G].mctqRadius * 2 / 0.077922, be = J.clone(!0);
            be.name = "透气片1-" + i[G].number, be.scale.set(ce, ce, ce), be.position.set(Y, n, i[G].pipeZ), this.group.add(be);
            let _e = J.clone(!0);
            _e.name = "透气片2-" + i[G].number, _e.scale.set(ce, ce, ce), _e.position.set(le, n, i[G].pipeZ), this.group.add(_e), this.modelsData.varyGroup[G].mctqCircle1 = { pipeRadius: i[G].mctqRadius - 0.01, midPoint: be.position }, this.modelsData.varyGroup[G].mctqCircle2 = { pipeRadius: i[G].mctqRadius - 0.01, midPoint: _e.position };
          }
        },
        null,
        (L) => {
          this.group.visible = !1;
        }
      );
    }
    Ee.onLoad = () => {
      for (let z = 0; z < this.modelsData.varyGroup.length; z++)
        this.addGasArrow(z, 50);
      this.addGasDense(0, null, !0), this.addParticles(0);
      let N = [
        { sensorId: 1, gatherTime: "2023-06-01 15:48:08", gatherValue: 98.71 },
        { sensorId: 2, gatherTime: "2023-06-01 15:47:01", gatherValue: 1.83 },
        { sensorId: 5, gatherTime: "2023-06-01 15:43:03", gatherValue: 84.96 },
        { sensorId: 6, gatherTime: "2023-06-01 15:41:05", gatherValue: 176.41 },
        { sensorId: 7, gatherTime: "2023-06-01 15:42:02", gatherValue: 16.4 }
      ];
      this.freshSensors(N), this.showLabel(this.ylb1), this.showLabel(this.llb1), this.showLabel(this.lqllb3), this.dispatchEvent({ type: "sceneLoaded", flag: !0 });
    };
    {
      let N = [
        new B(-64e-5, 0.59578, 0.10876),
        new B(-64e-5, 0.59552, 0.14206),
        new B(0.010789, 0.460405, 0.19587),
        new B(0.15121, 0.18965, 0.07227),
        new B(0.324497, -0.48355, -71e-5),
        new B(0.537992, -0.620526, -2735e-6),
        new B(0.621313, -0.619133, -2735e-6),
        new B(0.71998, -0.567262, -333e-5),
        new B(1.05, 0, -333e-5),
        new B(1.1, 0, -333e-5)
      ], z = new El(N, !1, "chordal"), U = new ka(z, 256, 5e-3, 16), oe = new Ie(U, st);
      this.group.add(oe);
      let M = new tr(8e-3), L = new Ie(M, it), J = [N[9]];
      for (let G = 0; G < J.length; G++) {
        let Y = L.clone(!0);
        Y.position.copy(J[G]), this.group.add(Y);
      }
    }
    {
      const N = new Je(0.03, 0.03, a, 36), z = new Ie(N, He);
      z.rotation.set(0, 0, Math.PI / 2), z.position.set(s + a / 2, n, 0), this.group.add(z), z.name = "集合头";
      const U = new Je(0.05, t, o, 36, 1, !0), oe = new Ie(U, He);
      oe.rotation.set(0, 0, Math.PI / 2), oe.position.set(s + a + o / 2, n, 0), this.group.add(oe), oe.name = "集合头";
      const M = new Je(t, t, t, 36, 1, !0), L = new Ie(M, Ze);
      L.rotation.set(0, 0, Math.PI / 2), L.position.set(c + t / 2, n, 0), this.group.add(L);
      const J = L.clone();
      J.position.set(c + 5 * t + W + t / 2, n, 0), this.group.add(J);
      const G = new Je(t, 0.05, o, 36, 1, !0), Y = new Ie(G, He);
      Y.rotation.set(0, 0, Math.PI / 2), Y.position.set(c + 6 * t + W + o / 2, n, 0), this.group.add(Y);
      const le = new Je(l, l, a, 36, 1, !0), ce = new Ie(le, He);
      ce.rotation.set(0, 0, Math.PI / 2), ce.position.set(c + 6 * t + W + o + a / 2, n, 0), this.group.add(ce);
      const be = new cs(l * 2, l, 12, 48, Math.PI / 2), _e = new Ie(be, He);
      _e.position.set(Me, n - l * 2, 0), this.group.add(_e);
      let Le = 0.4;
      const R = new Je(l, l, Le, 36, 1, !0), j = new Ie(R, He);
      j.position.set(Me + l * 2, n - l * 2 - Le / 2, 0), this.group.add(j);
      const se = new Ie(be, He);
      se.rotation.set(0, 0, Math.PI), se.position.set(Me + l * 4, n - l * 2 - Le, 0), this.group.add(se);
      const Ae = new Je(l, l, a, 36, 1, !0), pe = new Ie(Ae, He);
      pe.rotation.set(0, 0, Math.PI / 2), pe.position.set(Me + l * 9, n - l * 4 - Le, 0), this.group.add(pe);
    }
    let rt = [], S = [];
    if (u > 1) {
      const N = new Je(t, t, f, 36, 1, !0), z = new Ie(N, Ze);
      z.rotation.set(Math.PI / 2, 0, 0), z.position.set(c + t, n, 0), this.group.add(z);
      const U = z.clone();
      U.position.set(c + 5 * t + W, n, 0), this.group.add(U);
      const oe = new cs(t * 2, t, 36, 48, Math.PI / 2), M = new Ie(oe, Ze);
      M.rotation.set(-Math.PI / 2, 0, Math.PI / 2), M.position.set(c + 3 * t, n, -f / 2), this.group.add(M);
      const L = M.clone(!0);
      L.rotation.set(Math.PI / 2, 0, Math.PI / 2), L.position.set(c + 3 * t, n, f / 2), this.group.add(L), this.modelsData.verticalPipeLeft = { pipeRadius: t, pipeLength: f, midPoint: z.position.clone(), upPoint: M.position.clone(), downPoint: L.position.clone() };
      const J = M.clone(!0);
      J.rotation.set(-Math.PI / 2, 0, 0), J.position.set(c + 3 * t + W, n, -f / 2), this.group.add(J);
      const G = M.clone(!0);
      G.rotation.set(Math.PI / 2, 0, 0), G.position.set(c + 3 * t + W, n, f / 2), this.group.add(G), this.modelsData.verticalPipeRight = { pipeRadius: t, pipeLength: f, midPoint: U.position.clone(), upPoint: J.position.clone(), downPoint: G.position.clone() }, K(u - 1, this), K(0, this);
      const Y = new Yt(t, t, f + 12 * t), le = new Ie(Y, Oe);
      le.position.set(g, n - h, 0), this.group.add(le);
      const ce = le.clone();
      ce.position.set(c + 5 * t + W, n - h, 0), this.group.add(ce);
      const be = new Yt(W + 3 * t, t, t), _e = new Ie(be, Oe);
      _e.position.set(g + t / 2 + (W + 3 * t) / 2, n - h, i[0].pipeZ), this.group.add(_e);
      const Le = _e.clone();
      Le.position.set(g + t / 2 + (W + 3 * t) / 2, n - h, i[u - 1].pipeZ), this.group.add(Le);
      for (let R = 1; R < u; R++)
        u % 2 === 0 && R === u / 2 ? rt.push(Te - ye * (R * 2 - 1) / 2 - t * 1.3) : rt.push(Te - ye * (R * 2 - 1) / 2);
      if (S.push(
        c + 3 * t + t * 4,
        c + 3 * t + p - t * 4,
        i[0].pipe2StartX + A / 2,
        i[0].pipe3StartX + t * 4,
        i[0].pipe3StartX + i[0].pipeLength3 - t * 4
      ), u > 2) {
        let R = u - 2;
        for (let j = 1; j <= R; j++) {
          const se = new Je(t, t, 2 * t, 36, 1, !0), Ae = new Ie(se, Ze);
          Ae.rotation.set(0, 0, Math.PI / 2), Ae.position.set(c + t * 2, n, Te - ye * j), this.group.add(Ae), K(j, this);
          const pe = Ae.clone();
          pe.position.set(c + 3 * t + W + t, n, Te - ye * j), this.group.add(pe);
          const ke = _e.clone();
          ke.position.set(g + t / 2 + (W + 3 * t) / 2, n - h, Te - ye * j), this.group.add(ke);
        }
      }
    } else if (u === 1) {
      const N = new Je(t, t, 2 * t, 36, 1, !0), z = new Ie(N, He);
      z.rotation.set(0, 0, Math.PI / 2), z.position.set(c + t * 2, n, 0), this.group.add(z), K(0, this);
      const U = z.clone();
      U.position.set(c + 3 * t + W + t, n, 0), this.group.add(U);
      const oe = new Yt(W + 3 * t + 2 * t, t, t), M = new Ie(oe, Oe);
      M.position.set(g + t / 2 + (W + 3 * t) / 2, n - h, 0), this.group.add(M), S.push(
        c + 3 * t + t * 4,
        c + 3 * t + p - t * 4,
        i[0].pipe2StartX + A / 2,
        i[0].pipe3StartX + t * 4,
        i[0].pipe3StartX + i[0].pipeLength3 - t * 4
      );
    }
    let C = new gn();
    {
      const N = new Yt(t, h - t - t / 2, t), z = new Ie(N, At);
      z.position.set(0, n - h / 2 - t / 4, 0), C.add(z);
      const U = new Yt(t, t, t * 4), oe = new Ie(U, At);
      oe.position.set(0, n - t - t / 2, 0), C.add(oe);
      const M = new Yt(t, t, t * 8), L = new Ie(M, At);
      L.position.set(0, n - h, 0), C.add(L);
      let J = 0.01;
      const G = new cs(t + J, 0.01, 12, 48, Math.PI), Y = new Ie(G, At);
      Y.rotation.set(0, Math.PI / 2, 0), Y.position.set(0, n, 0), C.add(Y);
      const le = new Je(J, J, t, 36, 1, !0), ce = new Ie(le, At);
      ce.position.set(0, n - t / 2, 0 + t + J), C.add(ce);
      const be = ce.clone();
      be.position.set(0, n - t / 2, 0 - t - J), C.add(be);
    }
    for (let N = 0; N < i.length; N++)
      for (let z = 0; z < S.length; z++) {
        let U = C.clone(!0);
        U.position.x = S[z], U.position.z = i[N].pipeZ, this.group.add(U);
      }
    for (let N = 0; N < rt.length; N++) {
      let z = C.clone(!0);
      z.rotateY(Math.PI / 2), z.position.x = g, z.position.z = rt[N], this.group.add(z);
      let U = C.clone(!0);
      U.rotateY(Math.PI / 2), U.position.x = c + 5 * t + W, U.position.z = rt[N], this.group.add(U);
    }
    function K(N, z) {
      const U = i[N];
      let oe = U.pipeZ, M = U.number;
      const L = new Ii().load(z.urlPre + "/picture/wall.jpg"), J = new mt({ color: 16777215, map: L, opacity: 0.9, transparent: !0, side: kt }), G = new mt({ color: 4607, map: null, opacity: 0.2, transparent: !0, wireframe: !0 }), Y = new Ii().load(z.urlPre + "/picture/jin.jpg"), le = new mt({ color: 16777215, map: Y, side: kt }), ce = new mt({ color: 16777215, map: null, roughness: 0, metalness: 1, side: kt }), be = new mt({ color: 39321, opacity: 0.5, transparent: !0, alphaToCoverage: !0, side: kt }), _e = new mt({ color: 65535, opacity: 0.8, transparent: !0, alphaToCoverage: !1, side: kt }), Le = new Je(t, t, p, 36, 1, !0), R = new Ie(Le, Ze);
      R.name = "mainPipe-" + M, R.rotation.set(0, 0, Math.PI / 2), R.position.set(c + 3 * t + p / 2, n, oe), z.group.add(R), z.modelsData.varyGroup[N].pipe1 = { pipeRadius: t, pipeLength: p, midPoint: R.position.clone(), mesh: R };
      const j = new Je(b, b, E, 36, 1, !0), se = new Ie(j, le);
      se.rotation.set(0, 0, Math.PI / 2), se.position.set(c + 3 * t + p + E / 2, n, oe), z.group.add(se);
      const Ae = new Fa(t, b, 56), pe = new Ie(Ae, le);
      pe.rotation.set(0, Math.PI / 2, 0), pe.position.set(c + 3 * t + p, n, oe), z.group.add(pe);
      const ke = new Je(U.mctqRadius, U.mctqRadius, U.mctqLenght, 36), et = new Ie(ke, be);
      et.rotation.set(0, 0, Math.PI / 2), et.position.set(c + 3 * t + p + E + U.mctqLenght / 2, n, oe), z.group.add(et), z.modelsData.varyGroup[N].mctqPipe = { pipeRadius: U.mctqRadius, pipeLength: U.mctqLenght, midPoint: et.position.clone() };
      const ft = new Je(x, x, U.mctqLenght - 0.1, 36), Vt = new Ie(ft, ce);
      Vt.rotation.set(0, 0, Math.PI / 2), Vt.position.set(c + 3 * t + p + E + 0.1 + (U.mctqLenght - 0.1) / 2, n, oe), z.group.add(Vt);
      const Ye = new Je(b, b, E, 36, 1, !0), Lt = new Ie(Ye, le);
      Lt.rotation.set(0, 0, Math.PI / 2), Lt.position.set(c + 3 * t + p + E + U.mctqLenght + E / 2, n, oe), z.group.add(Lt);
      const yt = pe.clone();
      yt.position.set(c + 3 * t + p + E * 2 + U.mctqLenght, n, oe), z.group.add(yt);
      const bs = new Je(t, t, A, 36, 1, !0), Pn = new Ie(bs, Ze);
      Pn.name = "mainPipe-" + M, Pn.rotation.set(0, 0, Math.PI / 2), Pn.position.set(U.pipe2StartX + A / 2, n, oe), z.group.add(Pn), z.modelsData.varyGroup[N].pipe2 = { pipeRadius: t, pipeLength: A, midPoint: Pn.position.clone() };
      const or = new Je(b, b, E, 36, 1, !0), ki = new Ie(or, le);
      ki.rotation.set(0, 0, Math.PI / 2), ki.position.set(U.pipe2StartX + A + E / 2, n, oe), z.group.add(ki);
      const v = pe.clone();
      v.position.set(U.pipe2StartX + A, n, oe), z.group.add(v);
      const O = new mt({ color: 39321, opacity: 0.5, transparent: !0, alphaToCoverage: !0, side: kt }), Z = new Je(U.mnzkRadius, U.mnzkRadius, U.mnzkLength, 36), k = new Ie(Z, O);
      k.rotation.set(0, 0, Math.PI / 2), k.position.set(U.pipe2StartX + A + E + U.mnzkLength / 2, n, oe), z.group.add(k), z.modelsData.varyGroup[N].mnzkPipe = { pipeRadius: U.mnzkRadius, pipeLength: U.mnzkLength, midPoint: k.position.clone(), mesh: k };
      const te = new Je(U.lwRadius, U.lwRadius, U.lwLength, 36, 72), xe = new Ie(te, G);
      xe.rotation.set(0, 0, Math.PI / 2), xe.position.set(U.pipe2StartX + A + E + U.mnzkLength / 2, n, oe), z.group.add(xe);
      let ve = U.mnzkLength - U.fkLength;
      const Be = new Je(U.fkRadius, U.fkRadius, U.fkLength, 36, 1), Se = new Ie(Be, J);
      Se.rotation.set(0, 0, Math.PI / 2), Se.position.set(U.pipe2StartX + A + E + ve + U.fkLength / 2, n, oe), z.group.add(Se);
      let Ne = U.mnzkLength - U.ccgLength;
      const Pe = new Je(U.ccgRadius, U.ccgRadius, U.ccgLength, 36, 1, !0), Qe = new Ie(Pe, _e);
      Qe.rotation.set(0, 0, Math.PI / 2), Qe.position.set(U.pipe2StartX + A + E + Ne + U.ccgLength / 2, n, oe), z.group.add(Qe);
      const tt = new Je(b, b, E, 36), xt = new Ie(tt, le);
      xt.rotation.set(0, 0, Math.PI / 2), xt.position.set(U.pipe2StartX + A + E + U.mnzkLength + E / 2, n, oe), z.group.add(xt);
      const Ut = pe.clone();
      Ut.position.set(U.pipe2StartX + A + E * 2 + U.mnzkLength, n, oe), z.group.add(Ut);
      const rn = new Je(t, t, U.pipeLength3, 36, 1, !0), We = new Ie(rn, Ze);
      We.name = "mainPipe-" + M, We.rotation.set(0, 0, -Math.PI / 2), We.position.set(U.pipe3StartX + U.pipeLength3 / 2, n, oe), z.group.add(We), z.modelsData.varyGroup[N].pipe3 = { pipeRadius: t, pipeLength: m, midPoint: We.position.clone(), mesh: We };
    }
  }
  addGasArrow(e, t = 100) {
    const n = this.modelsData.varyGroup[e].pipe1.pipeRadius, i = this.modelsData.varyGroup[e].pipe1.pipeLength, s = this.modelsData.varyGroup[e].pipe1.midPoint.clone(), a = this.modelsData.varyGroup[e].pipe2.pipeLength, o = this.modelsData.varyGroup[e].pipe2.midPoint.clone(), c = this.modelsData.varyGroup[e].pipe3.pipeLength, l = this.modelsData.varyGroup[e].pipe3.midPoint.clone();
    let h = null, u = null, d = new ia(t, n * 2, i), f = d.getArrow();
    f.up.set(1, 0, 0), f.lookAt(0, 0, 1), f.position.copy(s), this.scene.add(f), f.userData = { upPoint: h, downPoint: u };
    let g = new ia(t, n * 2, a), p = g.getArrow();
    p.up.set(1, 0, 0), p.lookAt(0, 0, 1), p.position.copy(o), this.scene.add(p), p.userData = { upPoint: h, downPoint: u };
    let A = new ia(t, n * 2, c), m = A.getArrow();
    m.up.set(1, 0, 0), m.lookAt(0, 0, 1), m.position.copy(l), this.scene.add(m), m.userData = { upPoint: h, downPoint: u }, this.arrowGroup.set(e, { pipe1: d, pipe2: g, pipe3: A });
  }
  update() {
    this.resizeRenderer(), this.Orbits && this.Orbits.enabled && this.Orbits.update(), this.pointercontrols && this.pointercontrols.update();
    const e = Date.now() * 5e-3;
    for (let t = 0; t < sa.particles.length; t++) {
      const i = sa.particles[t].geometry.attributes;
      for (let s = 0; s < i.size.array.length; s++)
        i.size.array[s] = 2 + 1.8 * Math.sin(0.1 * s + e);
      i.size.needsUpdate = !0;
    }
    this.renderer.render(this.scene, this.camera), Ue.update(), requestAnimationFrame(this.update.bind(this));
  }
  resizeRenderer() {
    const e = this.renderer.domElement;
    if (!e)
      return !1;
    let t = this.viewerContainer.clientWidth, n = this.viewerContainer.clientHeight, i = e.width !== t * window.devicePixelRatio || e.height !== n * window.devicePixelRatio;
    return i && (this.renderer.setSize(t, n), this.camera.aspect = t / n, this.camera.updateProjectionMatrix()), i;
  }
  initInteractive(e) {
    e.removeEventListener("click", this.onClick, !1), e.addEventListener("click", this.onClick.bind(this), !1);
  }
  addHot(e, t, n, i, s, a, o = 0.2, c = 0.1) {
    const l = new Ln();
    if (l.setFromObject(e), l.isEmpty())
      return;
    let h = l.getCenter(new B());
    if (h.y = l.max.y + c, Math.abs(h.z) > 0.3362311)
      return;
    let u = {
      modelId: t,
      name: n,
      text: i,
      position: h,
      width: s,
      height: a,
      scale: o
    };
    this.hotspotMgr.addModel(t, u);
  }
  async onClick(e) {
    if (console.log("-----camera---", this.camera.position, this.Orbits.target), e.preventDefault(), e.button === 2 && this.hotspotMgr.releaseAll(), e.button !== 0 || this.transform && this.transform.dragging)
      return;
    const t = this.renderer.domElement, n = new fe();
    n.x = e.offsetX / t.clientWidth * 2 - 1, n.y = -(e.offsetY / t.clientHeight) * 2 + 1;
    const i = new zg();
    i.setFromCamera(n, this.camera);
    const s = i.intersectObject(this.group, !0);
    let a = null, o = null;
    for (let c = 0; c < s.length; c++) {
      for (a = s[c].object, s[c].point, o = a; o && o.parent.name != "root"; )
        o = o.parent;
      if (o.visible)
        break;
      o = null;
    }
    if (o)
      if (this.transform && this.transform.attach(o), o.name === "气瓶和减压阀")
        this.showLabel(o);
      else if (o.name === "可变负压抽采泵")
        this.showLabel(o);
      else if (o.name === "手动阀门") {
        if (o.userData.value) {
          o.rotation.y = 0, o.traverse((l) => {
            l.isMesh && l.material.name === "02 - Default.001" && l.material.color.set(41215);
          });
          const c = this.arrowGroup.get(o.userData.number);
          c.pipe1.setVisible(!0), c.pipe2.setVisible(!0), c.pipe3.setVisible(!0);
        } else {
          o.rotation.y = -Math.PI / 2, o.traverse((l) => {
            l.isMesh && l.material.name === "02 - Default.001" && l.material.color.set(16711680);
          });
          const c = this.arrowGroup.get(o.userData.number);
          c.pipe1.setVisible(!1), c.pipe2.setVisible(!1), c.pipe3.setVisible(!1);
        }
        o.userData.value = !o.userData.value;
      } else
        o.name === "流量表" || o.name === "压力表" || (o.name === "漏气流量表" ? o.id !== this.lqllb3.id && this.showLabel(o) : o.name);
    else
      this.transform && this.transform.detach();
  }
  addParticles(e) {
    const n = this.modelsData.varyGroup[e].mctqRadius - 0.02, i = this.modelsData.varyGroup[e].mctqSecondCircle - 0.02, s = new Float32Array(500 * 3), a = new Float32Array(500 * 3), o = new Float32Array(500), c = new B(), l = new we(16777215);
    for (let g = 0; g < 500; g++) {
      c.x = (Math.random() * 2 - 1) * i / 2;
      let p = (Math.random() * 2 - 1) * Math.PI, A = Math.random() * n;
      c.y = Math.sin(p) * A, c.z = Math.cos(p) * A, c.toArray(s, g * 3), e === 0 ? l.setHSL(0.5 + 0.1 * (g / 500), 0.7, 0.5) : l.setHSL(0 + 0.1 * (g / 500), 0.9, 0.5), l.toArray(a, g * 3), o[g] = 2;
    }
    const h = new _t();
    h.setAttribute("position", new ot(s, 3)), h.setAttribute("customColor", new ot(a, 3)), h.setAttribute("size", new ot(o, 1));
    const u = new Qn({
      uniforms: {
        color: { value: new we(16777215) },
        pointTexture: { value: new Ii().load(this.urlPre + "/picture/spark1.png") }
      },
      vertexShader: `attribute float size;
			attribute vec3 customColor;
			varying vec3 vColor;

			void main() {
				vColor = customColor;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z )*0.1;
				gl_Position = projectionMatrix * mvPosition;
			}`,
      fragmentShader: `uniform vec3 color;
			uniform sampler2D pointTexture;
			varying vec3 vColor;

			void main() {
				gl_FragColor = vec4( color * vColor, 1.0 );
				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
			}`,
      blending: ra,
      depthTest: !1,
      transparent: !0
    }), d = new B().addVectors(this.modelsData.varyGroup[e].mctqCircle1.midPoint, this.modelsData.varyGroup[e].mctqCircle2.midPoint).multiplyScalar(0.5);
    let f = new bl(h, u);
    f.position.copy(d), this.scene.add(f), this.particles.push(f);
  }
  addGasDense(e, t, n = !1) {
    this.modelsData.varyGroup[e].mnzkRadius, this.modelsData.varyGroup[e].mnzkLength, this.modelsData.varyGroup[e].mnzkPipe.midPoint.clone();
    const i = this.modelsData.varyGroup[e].mnzkPipe.mesh;
    if (n) {
      const s = new Ue.Tween({ dense: 0 }).to({ dense: 100 }, 5e3);
      s.easing(Ue.Easing.Linear.None), s.onUpdate((a) => {
        let o = 0.5 - 0.45 * a.dense / 100;
        0.5 + 0.25 * a.dense / 100, i.material.color.setHSL(o, 1, 0.319), 0 + 0.5 * a.dense / 100;
        let c = 0.5 + 0.4 * a.dense / 100;
        i.material.opacity = c;
      }), s.yoyo(!0), s.repeat(1 / 0), s.start();
    }
  }
  freshSensors(e) {
    if (!(!e || !Array.isArray(e)))
      for (let t = 0; t < e.length; t++) {
        this.sensorValue.set(e[t].sensorId, { gatherValue: e[t].gatherValue, gatherTime: e[t].gatherTime });
        const n = this.sensors.get(e[t].sensorId);
        if (n && this.hotspotMgr.has(e[t].sensorId)) {
          let i = null;
          n.type === "流量表" ? i = {
            name: n.name,
            text: [
              "所属模型组：" + n.groupName,
              "当前流量(L/min)：" + e[t].gatherValue,
              "采集时间：" + e[t].gatherTime.substring(e[t].gatherTime.indexOf(" ") + 1)
            ]
          } : n.type === "压力表" ? i = {
            name: n.name,
            text: [
              "所属模型组：" + n.groupName,
              "当前压力(MPa)：" + e[t].gatherValue,
              "采集时间：" + e[t].gatherTime.substring(e[t].gatherTime.indexOf(" ") + 1)
            ]
          } : n.type === "漏气流量表" && (i = {
            name: n.name,
            text: [
              "所属模型组：" + n.groupName,
              "当前流量(L/min)：" + e[t].gatherValue,
              "采集时间：" + e[t].gatherTime.substring(e[t].gatherTime.indexOf(" ") + 1)
            ]
          }), this.hotspotMgr.setHotspot(e[t].sensorId, i);
        }
      }
  }
  showLabel(e) {
    if (e)
      if (e.name === "气瓶和减压阀")
        this.addHot(e, e.id + 1e4, "气瓶", ["名称：" + this.sensorAttr.cylinderName], 350, 200);
      else if (e.name === "可变负压抽采泵")
        this.addHot(e, e.id + 1e4, "抽采泵", ["名称：" + this.sensorAttr.pumpPower], 330, 180, 0.5, 0.6);
      else if (e.name === "手动阀门") {
        if (e.userData.value) {
          e.rotation.y = 0, e.traverse((n) => {
            n.isMesh && n.material.name === "02 - Default.001" && n.material.color.set(41215);
          });
          const t = this.arrowGroup.get(e.userData.number);
          t.pipe1.setVisible(!0), t.pipe2.setVisible(!0), t.pipe3.setVisible(!0);
        } else {
          e.rotation.y = -Math.PI / 2, e.traverse((n) => {
            n.isMesh && n.material.name === "02 - Default.001" && n.material.color.set(16711680);
          });
          const t = this.arrowGroup.get(e.userData.number);
          t.pipe1.setVisible(!1), t.pipe2.setVisible(!1), t.pipe3.setVisible(!1);
        }
        e.userData.value = !e.userData.value;
      } else if (e.name === "流量表") {
        const t = this.sensorValue.get(e.userData.sensorId);
        t && this.addHot(
          e,
          e.userData.sensorId,
          "流量表",
          [
            "所属模型组：" + e.userData.mdGroupName,
            "当前流量(L/min)：" + t.gatherValue,
            "采集时间：" + t.gatherTime.substring(t.gatherTime.indexOf(" ") + 1)
          ],
          440,
          280,
          0.15
        );
      } else if (e.name === "压力表") {
        const t = this.sensorValue.get(e.userData.sensorId);
        t && this.addHot(
          e,
          e.userData.sensorId,
          "压力表",
          [
            "所属模型组：" + e.userData.mdGroupName,
            "当前压力(MPa)：" + t.gatherValue,
            "采集时间：" + t.gatherTime.substring(t.gatherTime.indexOf(" ") + 1)
          ],
          380,
          280,
          0.15
        );
      } else if (e.name === "漏气流量表") {
        const t = this.sensorValue.get(e.userData.sensorId);
        t && this.addHot(
          e,
          e.userData.sensorId,
          "漏气流量表",
          [
            "所属模型组：" + e.userData.mdGroupName,
            "当前流量(L/min)：" + t.gatherValue,
            "采集时间：" + t.gatherTime.substring(t.gatherTime.indexOf(" ") + 1)
          ],
          440,
          280,
          0.15
        );
      } else
        e.name;
  }
}
export {
  jm as SceneBackstage
};
