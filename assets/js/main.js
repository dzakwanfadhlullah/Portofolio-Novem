(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuIcon = menuToggle?.querySelector("i");
  const mobileMenu = document.querySelector(".mobile-menu");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const savedTheme = localStorage.getItem("portfolio-theme");

  function setTheme(theme) {
    const isLight = theme === "light";
    root.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
    themeToggle?.setAttribute("aria-pressed", String(isLight));
    themeToggle?.setAttribute("aria-label", isLight ? "Gunakan tema gelap" : "Gunakan tema terang");
    themeIcon?.classList.toggle("bx-sun", !isLight);
    themeIcon?.classList.toggle("bx-moon", isLight);
    themeColor?.setAttribute("content", isLight ? "#f3f0e9" : "#171815");
  }

  setTheme(savedTheme || preferredTheme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "light" ? "dark" : "light");
  });

  function setMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    menuIcon?.classList.toggle("bx-menu-alt-right", !open);
    menuIcon?.classList.toggle("bx-x", open);
  }

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) setMenu(false);
  });

  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60%", threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeLightbox = lightbox?.querySelector(".lightbox-close");

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = trigger.dataset.lightbox;
      lightboxImage.alt = trigger.getAttribute("aria-label") || "Pratinjau gambar";
      lightbox.showModal();
    });
  });

  closeLightbox?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
})();
