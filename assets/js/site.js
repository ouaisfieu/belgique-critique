/* Belgique critique — comportements progressifs (le site fonctionne sans JS). */
(function () {
  "use strict";
  var root = document.documentElement;

  /* Thème : sombre par défaut, choix mémorisé */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    var sync = function () {
      var dark = root.getAttribute("data-theme") !== "light";
      toggle.setAttribute("aria-pressed", dark ? "false" : "true");
      toggle.setAttribute("aria-label", dark ? "Passer au mode clair" : "Passer au mode sombre");
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0f1114" : "#faf9fc");
    };
    sync();
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("bc-theme", next); } catch (e) {}
      sync();
    });
  }

  /* Menu mobile */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Sommaire actif + barre de progression */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var progress = document.querySelector(".progress");
  var backTop = document.querySelector(".back-top");
  var heads = tocLinks.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); }).filter(Boolean);
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
    }
    if (backTop) backTop.classList.toggle("is-on", y > 900);
    if (heads.length) {
      var current = heads[0];
      for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top < 140) current = heads[i]; }
      tocLinks.forEach(function (a) {
        var on = decodeURIComponent(a.hash.slice(1)) === current.id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* Infobulles des graphiques (le tableau de données reste la source accessible) */
  var tip = document.createElement("div");
  tip.className = "tooltip"; tip.setAttribute("role", "status"); tip.setAttribute("aria-live", "polite");
  document.body.appendChild(tip);
  function showTip(el, x, y) {
    var parts = (el.getAttribute("data-tip") || "").split("|");
    tip.textContent = "";
    var s = document.createElement("strong"); s.textContent = parts[0] || "";
    tip.appendChild(s);
    if (parts[1]) tip.appendChild(document.createTextNode(parts[1]));
    tip.classList.add("is-on");
    var r = tip.getBoundingClientRect();
    var left = Math.min(window.innerWidth - r.width - 8, Math.max(8, x + 14));
    var top = y - r.height - 12; if (top < 8) top = y + 16;
    tip.style.left = left + "px"; tip.style.top = top + "px";
  }
  function hideTip() { tip.classList.remove("is-on"); }
  document.querySelectorAll(".chart [data-tip]").forEach(function (el) {
    el.addEventListener("pointermove", function (e) { showTip(el, e.clientX, e.clientY); });
    el.addEventListener("pointerleave", hideTip);
    el.addEventListener("focus", function () { var b = el.getBoundingClientRect(); showTip(el, b.left + b.width / 2, b.top); });
    el.addEventListener("blur", hideTip);
  });

  /* Recherche plein texte (page /recherche/) */
  var form = document.getElementById("search-form");
  if (form) {
    var input = document.getElementById("q");
    var list = document.getElementById("results");
    var status = document.getElementById("search-status");
    var base = form.getAttribute("data-root") || "../";
    var index = null;
    var norm = function (s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    var run = function () {
      var q = norm(input.value.trim());
      list.textContent = "";
      if (!q || !index) { status.textContent = q ? "Chargement…" : ""; return; }
      var terms = q.split(/\s+/).filter(Boolean);
      var hits = index.map(function (d) {
        var hay = norm(d.t + " " + d.d + " " + d.h + " " + d.x);
        var score = 0;
        for (var i = 0; i < terms.length; i++) {
          if (hay.indexOf(terms[i]) === -1) return null;
          if (norm(d.t).indexOf(terms[i]) !== -1) score += 12;
          if (norm(d.d).indexOf(terms[i]) !== -1) score += 6;
          if (norm(d.h).indexOf(terms[i]) !== -1) score += 4;
          score += Math.min(15, norm(d.x).split(terms[i]).length - 1);
        }
        return { d: d, s: score };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; });
      status.textContent = hits.length + (hits.length > 1 ? " résultats" : " résultat");
      hits.slice(0, 40).forEach(function (h) {
        var li = document.createElement("li");
        var a = document.createElement("a"); a.href = base + h.d.u; a.textContent = h.d.t;
        var p = document.createElement("p"); p.textContent = h.d.d;
        li.appendChild(a); li.appendChild(p); list.appendChild(li);
      });
    };
    fetch(base + "search-index.json").then(function (r) { return r.json(); }).then(function (j) { index = j; run(); }).catch(function () { status.textContent = "Index indisponible."; });
    var params = new URLSearchParams(location.search);
    if (params.get("q")) input.value = params.get("q");
    input.addEventListener("input", run);
    form.addEventListener("submit", function (e) { e.preventDefault(); run(); history.replaceState(null, "", "?q=" + encodeURIComponent(input.value)); });
  }
})();
