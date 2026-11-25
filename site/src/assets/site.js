(function () {
  // Theme toggle: light / dark / system, remembered in localStorage.
  var root = document.documentElement, btn = document.getElementById('theme-toggle');
  function current() { return root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  function label() { if (btn) { var next = current() === 'dark' ? 'light' : 'dark'; btn.textContent = next === 'dark' ? 'Dark theme' : 'Light theme'; btn.setAttribute('aria-label', 'Switch to ' + next + ' theme'); } }
  if (btn) { btn.hidden = false; label(); btn.addEventListener('click', function () { var n = current() === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', n); try { localStorage.setItem('theme', n); } catch (e) {} label(); }); }

  // Guide search: filters the server-rendered list by name, title and description.
  var input = document.getElementById('guide-search');
  if (!input) return;
  var form = input.closest('form'); if (form) form.hidden = false;
  var items = [].slice.call(document.querySelectorAll('[data-guide]'));
  var cats = [].slice.call(document.querySelectorAll('[data-category]'));
  var status = document.getElementById('search-status');
  function run() {
    var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean), shown = 0;
    items.forEach(function (li) {
      var hay = li.getAttribute('data-search'), ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      li.hidden = !ok; if (ok) shown++;
    });
    cats.forEach(function (c) { c.hidden = !c.querySelector('[data-guide]:not([hidden])'); });
    status.textContent = terms.length ? shown + (shown === 1 ? ' guide matches' : ' guides match') : '';
  }
  input.addEventListener('input', run);
  var q = new URLSearchParams(location.search).get('q'); if (q) { input.value = q; run(); }
})();
