/* ============================================================
   Peon "Work work" easter egg.
   Trigger: the Konami code (up up down down left right left right B A)
   or type one of: workwork / zugzug / peon.  Click or ESC to close.
   The flashy styles are scoped to #peon-egg so they never touch the
   clean site theme.
   ============================================================ */
(function () {
  var css = ''
    + '#peon-egg{position:fixed;inset:0;z-index:99999;display:none;'
    + 'background:#000018;background-image:'
    + 'radial-gradient(1.5px 1.5px at 25px 15px,#fff,transparent),'
    + 'radial-gradient(1.5px 1.5px at 75px 55px,#fff7cc,transparent),'
    + 'radial-gradient(1px 1px at 120px 30px,#cfe8ff,transparent),'
    + 'radial-gradient(1.5px 1.5px at 210px 40px,#fff,transparent);'
    + 'background-size:250px 160px;color:#fff;'
    + 'font-family:"Comic Sans MS","Comic Sans",cursive;text-align:center;cursor:pointer;}'
    + '#peon-egg.show{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;}'
    + '#peon-egg .egg-marquee{position:absolute;top:0;left:0;width:100%;overflow:hidden;white-space:nowrap;'
    + 'color:#33ff66;font-weight:bold;font-size:1.2rem;padding:8px 0;}'
    + '#peon-egg .egg-marquee span{display:inline-block;padding-left:100%;animation:peon-scroll 14s linear infinite;}'
    + '#peon-egg img{width:220px;max-width:70vw;border:6px ridge #ffcc00;box-shadow:0 0 24px #00ffff;background:#000;}'
    + '#peon-egg .egg-title{font-family:"Press Start 2P",system-ui,cursive;font-size:clamp(1.5rem,6.5vw,3.6rem);line-height:1.35;margin:0;'
    + 'background:linear-gradient(90deg,#f00,#f90,#ff0,#3f3,#0ff,#36f,#c3f,#f00);background-size:200% auto;'
    + '-webkit-background-clip:text;background-clip:text;color:transparent;animation:peon-hue 3s linear infinite;}'
    + '#peon-egg .egg-blink{animation:peon-blink 1s steps(1) infinite;color:#ffff33;font-size:1.05rem;}'
    + '#peon-egg .egg-hint{color:#8aa;font-size:.85rem;font-family:sans-serif;}'
    + '@keyframes peon-hue{to{background-position:200% center;}}'
    + '@keyframes peon-blink{50%{opacity:0;}}'
    + '@keyframes peon-scroll{to{transform:translateX(-100%);}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // stylized arcade font for the "WORK WORK" title
  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
  document.head.appendChild(font);

  // Resolve /images/ path from this script's own URL (works from / and /posts/).
  var tag = document.querySelector('script[src$="easteregg.js"]');
  var base = (tag ? tag.src : '').replace(/js\/easteregg\.js.*$/, '');
  var peon = base + 'images/peon.gif';
  var fallback = base + 'images/avatar.svg';

  var egg = document.createElement('div');
  egg.id = 'peon-egg';
  egg.innerHTML =
      '<div class="egg-marquee"><span>&#9733; Zug zug! &#9733; Ready to work! &#9733; Something need doing? &#9733; Work work! &#9733; Me not that kind of orc! &#9733;</span></div>'
    + '<img alt="Peon" data-src="' + peon + '" onerror="this.onerror=null;this.src=\'' + fallback + '\'">'
    + '<h1 class="egg-title">WORK WORK</h1>'
    + '<div class="egg-blink">&#9654; click anywhere / press ESC to get back to work &#9668;</div>'
    + '<div class="egg-hint">you found the easter egg</div>';

  function mount() { document.body.appendChild(egg); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  function open() {
    var im = egg.querySelector('img');
    if (im && !im.getAttribute('src')) { im.setAttribute('src', im.getAttribute('data-src')); }
    egg.classList.add('show');
  }
  function close() { egg.classList.remove('show'); }
  egg.addEventListener('click', close);

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var kpos = 0;
  var buf = '';
  var words = ['workwork', 'zugzug', 'peon'];

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); return; }
    kpos = (e.keyCode === konami[kpos]) ? kpos + 1 : (e.keyCode === konami[0] ? 1 : 0);
    if (kpos === konami.length) { kpos = 0; open(); }
    if (e.key && e.key.length === 1) {
      buf = (buf + e.key.toLowerCase()).slice(-10);
      if (words.some(function (w) { return buf.endsWith(w); })) { open(); }
    }
  });
})();
