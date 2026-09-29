/* Language toggle */
document.querySelector("#language").addEventListener("click", (e) => {
  const btn = e.currentTarget;
  const toBangla = btn.textContent.includes("EN");
  btn.innerHTML = toBangla ? "বাংলা <small>/</small> EN" : "EN <small>/</small> বাংলা";
  btn.setAttribute("aria-label", toBangla ? "Switch to English" : "বাংলায় পরিবর্তন করুন");
});

/* Mobile menu */
const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  };
  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  };
  menuToggle.addEventListener("click", () => {
    menuToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  addEventListener("resize", () => {
    if (innerWidth > 700) closeMenu();
  });
}

/* Hero search bar: scrolls to the network section instead of submitting anywhere */
const heroSearch = document.querySelector("#hero-search");
if (heroSearch) {
  heroSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#network").scrollIntoView({ behavior: "smooth" });
  });
}

/* Footer newsletter form: no backend wired up yet, just confirms visually */
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterNote = document.querySelector("#newsletter-note");
if (newsletterForm && newsletterNote) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newsletterNote.textContent = "Thanks — you're on the list.";
    newsletterForm.reset();
  });
}

/* Scroll reveal */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
const revealGroupCounts = new Map();
document
  .querySelectorAll(".section-head,.preview,.standard-card,.about-text,.metrics>div")
  .forEach((e) => {
    e.classList.add("reveal");
    const group = e.parentElement;
    const i = revealGroupCounts.get(group) || 0;
    revealGroupCounts.set(group, i + 1);
    e.style.setProperty("--reveal-delay", Math.min(i * 90, 450) + "ms");
    io.observe(e);
  });

/* Graceful fallback if a platform logo image fails to load: swap it
   for a brand-tinted tile with the platform's initial instead of a
   broken-image icon. */
document.querySelectorAll(".fan-card>img,.preview-body>img").forEach((img) => {
  img.addEventListener(
    "error",
    () => {
      const label = (img.alt || "?").trim().charAt(0) || "T";
      const span = document.createElement("span");
      span.className = "img-fallback";
      span.textContent = label;
      span.setAttribute("aria-hidden", "true");
      span.style.cssText =
        "display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#1c1c1e;color:#fff;font-family:'Instrument Serif',serif;font-size:1.6rem;";
      img.replaceWith(span);
    },
    { once: true },
  );
});