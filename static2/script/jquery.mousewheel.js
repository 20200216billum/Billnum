(function(b) { if (typeof define === "function" && define.amd) { define(["jquery"], b) } else { if (typeof exports === "object") { module.exports = b } else { b(jQuery) } } }(function(c) { var h = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    m = ("onwheel" in document || document.documentMode >= 9) ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    k = Array.prototype.slice,
    l, b; if (c.event.fixHooks) { for (var d = h.length; d;) { c.event.fixHooks[h[--d]] = c.event.mouseHooks } } var e = c.event.special.mousewheel = { version: "3.1.12", setup: function() { if (this.addEventListener) { for (var f = m.length; f;) { this.addEventListener(m[--f], n, false) } } else { this.onmousewheel = n } c.data(this, "mousewheel-line-height", e.getLineHeight(this));
      c.data(this, "mousewheel-page-height", e.getPageHeight(this)) }, teardown: function() { if (this.removeEventListener) { for (var f = m.length; f;) { this.removeEventListener(m[--f], n, false) } } else { this.onmousewheel = null } c.removeData(this, "mousewheel-line-height");
      c.removeData(this, "mousewheel-page-height") }, getLineHeight: function(g) { var f = c(g),
        i = f["offsetParent" in c.fn ? "offsetParent" : "parent"](); if (!i.length) { i = c("body") } return parseInt(i.css("fontSize"), 10) || parseInt(f.css("fontSize"), 10) || 16 }, getPageHeight: function(f) { return c(f).height() }, settings: { adjustOldDeltas: true, normalizeOffset: true } };
  c.fn.extend({ mousewheel: function(f) { return f ? this.bind("mousewheel", f) : this.trigger("mousewheel") }, unmousewheel: function(f) { return this.unbind("mousewheel", f) } });

  function n(v) { var u = v || window.event,
      s = k.call(arguments, 1),
      w = 0,
      g = 0,
      f = 0,
      q = 0,
      o = 0,
      i = 0;
    v = c.event.fix(u);
    v.type = "mousewheel"; if ("detail" in u) { f = u.detail * -1 } if ("wheelDelta" in u) { f = u.wheelDelta } if ("wheelDeltaY" in u) { f = u.wheelDeltaY } if ("wheelDeltaX" in u) { g = u.wheelDeltaX * -1 } if ("axis" in u && u.axis === u.HORIZONTAL_AXIS) { g = f * -1;
      f = 0 } w = f === 0 ? g : f; if ("deltaY" in u) { f = u.deltaY * -1;
      w = f } if ("deltaX" in u) { g = u.deltaX; if (f === 0) { w = g * -1 } } if (f === 0 && g === 0) { return } if (u.deltaMode === 1) { var t = c.data(this, "mousewheel-line-height");
      w *= t;
      f *= t;
      g *= t } else { if (u.deltaMode === 2) { var r = c.data(this, "mousewheel-page-height");
        w *= r;
        f *= r;
        g *= r } } q = Math.max(Math.abs(f), Math.abs(g)); if (!b || q < b) { b = q; if (a(u, q)) { b /= 40 } } if (a(u, q)) { w /= 40;
      g /= 40;
      f /= 40 } w = Math[w >= 1 ? "floor" : "ceil"](w / b);
    g = Math[g >= 1 ? "floor" : "ceil"](g / b);
    f = Math[f >= 1 ? "floor" : "ceil"](f / b); if (e.settings.normalizeOffset && this.getBoundingClientRect) { var p = this.getBoundingClientRect();
      o = v.clientX - p.left;
      i = v.clientY - p.top } v.deltaX = g;
    v.deltaY = f;
    v.deltaFactor = b;
    v.offsetX = o;
    v.offsetY = i;
    v.deltaMode = 0;
    s.unshift(v, w, g, f); if (l) { clearTimeout(l) } l = setTimeout(j, 200); return (c.event.dispatch || c.event.handle).apply(this, s) }

  function j() { b = null }

  function a(g, f) { return e.settings.adjustOldDeltas && g.type === "mousewheel" && f % 120 === 0 } }));
