// ============================================
// TACOS NATIVITAS — script global
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  initMenuToggle();
  initArcText();
  initYear();
});

/* ---------- Menú hamburguesa: dropdown simple ---------- */
function initMenuToggle() {
  var toggle = document.querySelector(".menu-toggle");
  var dropdown = document.querySelector(".nav-dropdown");
  if (!toggle || !dropdown) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }

  function openMenu() {
    toggle.classList.add("is-open");
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var isOpen = toggle.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  dropdown.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar al hacer click fuera del menú
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
}

/* ---------- Efecto de texto en arco/onda ----------
   Envuelve cada letra de .arc-link en un <span>,
   y aplica una curva (seno) para que el texto
   forme un arco, como en el menú de Atarantados.
   data-curve="up" | "down" controla la dirección.
------------------------------------------------- */
function initArcText() {
  var links = document.querySelectorAll(".arc-link");

  links.forEach(function (link) {
    var text = link.textContent;
    var direction = link.getAttribute("data-curve") || "up";
    var amplitude = parseFloat(link.getAttribute("data-amplitude") || "14");

    link.textContent = "";
    link.setAttribute("aria-label", text);

    var chars = text.split("");
    var n = chars.length;
    var mid = (n - 1) / 2;

    chars.forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "arc-char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch === " " ? "\u00A0" : ch;

      // curva tipo arco: máxima en los extremos, mínima al centro (o invertido)
      var t = (i - mid) / (mid || 1); // -1 a 1
      var curveVal = direction === "up" ? -(1 - t * t) : (1 - t * t);
      var offset = curveVal * amplitude;

      span.style.transform = "translateY(" + offset.toFixed(2) + "px) rotate(" + (t * (direction === "up" ? -6 : 6)).toFixed(1) + "deg)";
      link.appendChild(span);
    });
  });
}

/* ---------- Año dinámico en footer ---------- */
function initYear() {
  var els = document.querySelectorAll("[data-year]");
  els.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}
