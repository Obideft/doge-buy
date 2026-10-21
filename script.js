/* ============================================================
   DOGE BUY — demo calculator + interface logic
   100% client-side. No network calls, no payments, no crypto.
   ============================================================ */
(function () {
  "use strict";

  var DEFAULT_PRICE = 0.22;      // clearly labelled DEMO price, not a market quote
  var MIN_USD = 1;
  var MAX_USD = 100000;

  /* ---------------- element refs ---------------- */
  var amountInput = document.getElementById("usdAmount");
  var amountError = document.getElementById("amountError");
  var quickBtns   = [].slice.call(document.querySelectorAll(".quick"));
  var priceRange  = document.getElementById("demoPrice");
  var priceLabel  = document.getElementById("priceLabel");
  var priceEcho   = document.getElementById("priceEcho");
  var resetPrice  = document.getElementById("resetPrice");
  var dogeOut     = document.getElementById("dogeOut");
  var payOptions  = [].slice.call(document.querySelectorAll(".pay-option"));
  var form        = document.getElementById("buyForm");
  var receipt     = document.getElementById("receipt");

  /* ---------------- helpers ---------------- */
  function money(n, d) {
    return "$" + Number(n).toLocaleString("en-US", {
      minimumFractionDigits: d, maximumFractionDigits: d
    });
  }
  function fmtDoge(n) {
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function currentPrice() {
    var p = parseFloat(priceRange.value);
    return (isFinite(p) && p > 0) ? p : DEFAULT_PRICE;
  }
  function currentAmount() {
    var v = parseFloat(amountInput.value);
    return isFinite(v) ? v : 0;
  }
  function selectedMethod() {
    var c = document.querySelector('input[name="pay"]:checked');
    return c ? c.value : "PayPal (demo)";
  }

  /* ---------------- core calculation ---------------- */
  function recalc() {
    var usd   = currentAmount();
    var price = currentPrice();
    var valid = usd >= MIN_USD && usd <= MAX_USD;

    amountError.hidden = valid || amountInput.value === "";
    amountInput.setAttribute("aria-invalid", valid ? "false" : "true");

    priceLabel.textContent = money(price, 4);
    priceEcho.textContent  = money(price, 4);

    dogeOut.textContent = "~ " + fmtDoge(valid ? usd / price : 0) + " DOGE";

    quickBtns.forEach(function (b) {
      b.classList.toggle("is-active", parseFloat(b.dataset.amount) === usd);
    });

    return { usd: usd, price: price, doge: valid ? usd / price : 0, valid: valid };
  }

  /* ---------------- amount events ---------------- */
  amountInput.addEventListener("input", function () {
    receipt.hidden = true;
    recalc();
  });

  quickBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      amountInput.value = btn.dataset.amount;
      receipt.hidden = true;
      recalc();
      amountInput.focus();
    });
  });

  /* ---------------- demo price events ---------------- */
  priceRange.addEventListener("input", recalc);
  resetPrice.addEventListener("click", function () {
    priceRange.value = DEFAULT_PRICE;
    recalc();
  });

  /* ---------------- payment method ---------------- */
  function syncPay() {
    payOptions.forEach(function (o) {
      o.classList.toggle("is-selected", o.querySelector("input").checked);
    });
  }
  payOptions.forEach(function (opt) {
    opt.querySelector('input[type="radio"]').addEventListener("change", function () {
      syncPay();
      receipt.hidden = true;
    });
  });

  /* ---------------- BUY NOW — demo only ---------------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = recalc();

    receipt.hidden = false;

    if (!s.valid) {
      amountInput.focus();
      receipt.innerHTML =
        '<h4>⚠ Check your amount</h4>' +
        '<p>Please enter a USD amount between ' + money(MIN_USD, 0) + ' and ' + money(MAX_USD, 0) + '.</p>';
      return;
    }

    receipt.innerHTML =
      '<h4>DEMO ONLY — NOTHING WAS PURCHASED</h4>' +
      '<p>Preview of a summary screen. No payment provider was contacted, no funds moved, and no Dogecoin was sent or received.</p>' +
      '<ul>' +
        '<li>Amount entered: <b>' + money(s.usd, 2) + '</b></li>' +
        '<li>Demo price: <b>' + money(s.price, 4) + ' / DOGE</b> (slider value, not a market quote)</li>' +
        '<li>Estimated DOGE: <b>' + fmtDoge(s.doge) + ' DOGE</b></li>' +
        '<li>Selected method: <b>' + selectedMethod() + '</b> — payment processing is disabled</li>' +
      '</ul>' +
      '<p class="warn">Never enter card details or a wallet seed phrase anywhere. This page never asks for them. 🐕</p>';
  });

  /* ---------------- nav: mobile toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav   = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mainNav.addEventListener("click", function (e) {
    if (e.target.closest("a,button")) {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------------- nav: active link ---------------- */
  var navLinks = [].slice.call(document.querySelectorAll(".nav-link"));
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (l) { l.classList.remove("is-active"); });
      link.classList.add("is-active");
    });
  });

  /* ---------------- "TO THE MOON!" -> focus the amount field ---------------- */
  document.getElementById("moonBtn").addEventListener("click", function () {
    amountInput.focus();
    amountInput.select();
  });

  /* ---------------- About / FAQ modal (no page scrolling needed) ---------------- */
  var modal      = document.getElementById("modal");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody  = document.getElementById("modalBody");
  var templates  = {
    about: { title: "About This Very Serious Project", id: "tpl-about" },
    faq:   { title: "Frequently Asked Questions", id: "tpl-faq" }
  };

  function openModal(key) {
    var t = templates[key];
    if (!t) return;
    modalTitle.textContent = t.title;
    modalBody.innerHTML = "";
    modalBody.appendChild(document.getElementById(t.id).content.cloneNode(true));
    modal.hidden = false;
    modal.querySelector(".modal-close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = "";
  }
  document.querySelectorAll("[data-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () { openModal(btn.dataset.modal); });
  });
  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ---------------- new PNG assets: path fallback ----------------
     The site expects assets/Background.png and assets/LOGO.png.
     If the files were placed in the project root instead, fall back
     to ./Background.png and ./LOGO.png automatically.            */
  var brandLogo = document.getElementById("brandLogo");
  if (brandLogo) {
    brandLogo.addEventListener("error", function onErr() {
      brandLogo.removeEventListener("error", onErr);
      brandLogo.src = "LOGO.png";
    });
  }
  (function checkBg() {
    var probe = new Image();
    probe.onerror = function () {
      var alt = new Image();
      alt.onload = function () {
        document.querySelector(".stage").style.backgroundImage =
          'url("Background.png"), linear-gradient(180deg,#ffa343 0%,#f8811f 46%,#f4761f 100%)';
      };
      alt.src = "Background.png";
    };
    probe.src = "assets/Background.png";
  })();

  /* ---------------- init ---------------- */
  syncPay();
  recalc();
})();
