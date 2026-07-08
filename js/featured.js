/* Home page "Featured projects" and "Latest posts".
   Pulls the top entries straight from projects.html and blog.html, so the home
   page never has to be maintained separately — you only ever edit those pages.

   To tweak: change COUNT for how many to show. To feature the *bottom* entries
   instead of the top, swap the loop for items.slice(-COUNT). */
(function () {
  var COUNT = 2;

  function fill(url, selector, targetId) {
    var target = document.getElementById(targetId);
    if (!target) return;
    fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var items = doc.querySelectorAll(selector);
        for (var i = 0; i < items.length && i < COUNT; i++) {
          target.appendChild(document.importNode(items[i], true));
        }
      })
      .catch(function () { /* on failure, the "See all →" link is the fallback */ });
  }

  fill('projects.html', 'main .card', 'home-projects');
  fill('blog.html', 'main .post-list-item', 'home-posts');
})();
