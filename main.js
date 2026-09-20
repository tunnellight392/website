/* Alex Therakathu — portfolio behaviour.
   Three small things: theme persistence, a platform filter over the work grid,
   and a lightbox for the screenshots. */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */

  var toggle = document.getElementById("theme-toggle");

  function effectiveTheme() {
    var stamped = root.getAttribute("data-theme");
    if (stamped === "dark" || stamped === "light") return stamped;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* Private browsing or blocked site data — the choice just won't persist. */
      }
    });
  }

  /* ---------- Screenshot lightbox ---------- */

  var box = document.getElementById("lightbox");
  var boxImg = document.getElementById("lightbox-img");
  var boxCap = document.getElementById("lightbox-cap");
  var boxClose = document.getElementById("lightbox-close");

  /* <dialog> carries focus handling, Escape and the backdrop for free.
     Without it, the buttons still link nowhere harmful — they just do nothing. */
  if (box && typeof box.showModal === "function") {
    document.querySelectorAll(".shot-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        var full = button.querySelector("img");
        boxImg.src = button.dataset.src;
        boxImg.alt = full ? full.alt : "";
        boxCap.innerHTML = button.dataset.caption || "";
        box.showModal();
      });
    });

    if (boxClose) boxClose.addEventListener("click", function () { box.close(); });

    /* Clicking outside the image closes it. */
    box.addEventListener("click", function (event) {
      if (event.target === box) box.close();
    });

    /* Drop the source on close so a reopen never flashes the previous shot. */
    box.addEventListener("close", function () {
      boxImg.removeAttribute("src");
      boxImg.alt = "";
    });
  }

  /* ---------- Platform filter ---------- */

  var grid = document.getElementById("grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".chip-btn"));
  var empty = document.getElementById("empty");

  function apply(platform) {
    var visible = 0;

    cards.forEach(function (card) {
      var matches = platform === "all" || card.dataset.platform === platform;
      card.hidden = !matches;
      if (matches) visible++;
    });

    if (empty) empty.hidden = visible !== 0;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (other) {
        var on = other === button;
        other.classList.toggle("is-on", on);
        other.setAttribute("aria-pressed", on ? "true" : "false");
      });
      apply(button.dataset.filter);
    });
  });

  apply("all");
})();
