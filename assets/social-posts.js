(() => {
  const posts = document.getElementById("anti-social");
  if (!posts) return;

  // Load the native X widgets only near their section, so late embeds do not
  // shift visitors who opened a link to Media or Legal Tech further down.
  const loadWidgets = () => {
    if (document.querySelector("script[data-x-embeds]")) return;
    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    script.dataset.xEmbeds = "true";
    document.head.append(script);
  };

  if (!("IntersectionObserver" in window)) {
    loadWidgets();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    loadWidgets();
  }, { rootMargin: "300px 0px" });
  observer.observe(posts);
})();
