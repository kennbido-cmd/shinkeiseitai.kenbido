document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  var menuTabs = document.querySelectorAll(".menu-tab");
  var menuPanels = document.querySelectorAll(".menu-panel");

  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var targetId = tab.getAttribute("data-target");

      menuTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      menuPanels.forEach(function (panel) {
        var isTarget = panel.id === targetId;
        panel.classList.toggle("active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  var FONT_SCALE_KEY = "seitai-font-scale";
  var fontSizeButtons = document.querySelectorAll(".font-size-btn");

  function markActiveButton(scale) {
    fontSizeButtons.forEach(function (btn) {
      var isActive = parseFloat(btn.getAttribute("data-font-scale")) === scale;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyScale(scale) {
    document.documentElement.style.fontSize = scale + "%";
    markActiveButton(scale);
    try {
      localStorage.setItem(FONT_SCALE_KEY, scale);
    } catch (e) {}
  }

  if (fontSizeButtons.length) {
    var savedScale = parseFloat(localStorage.getItem(FONT_SCALE_KEY)) || 100;
    markActiveButton(savedScale);

    fontSizeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyScale(parseFloat(btn.getAttribute("data-font-scale")));
      });
    });
  }

  var flowRows = document.querySelectorAll(".flow-row");

  if (flowRows.length && "IntersectionObserver" in window) {
    var flowObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var index = Array.prototype.indexOf.call(flowRows, entry.target);
            entry.target.style.transitionDelay = (index * 0.15) + "s";
            entry.target.classList.add("is-visible");
            flowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    flowRows.forEach(function (row) {
      flowObserver.observe(row);
    });
  } else {
    flowRows.forEach(function (row) {
      row.classList.add("is-visible");
    });
  }
});
