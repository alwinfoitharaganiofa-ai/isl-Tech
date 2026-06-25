/* ========================================
   isl-Tech - Main JavaScript
   Theme toggle, mobile nav, animations
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // THEME MANAGEMENT
  // ========================================

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle?.querySelector(".theme-icon");
  const html = document.documentElement;

  // Get stored theme or use system preference
  function getPreferredTheme() {
    const stored = localStorage.getItem("isl-tech-theme");
    if (stored) return stored;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("isl-tech-theme", theme);

    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  }

  // Apply theme on load
  setTheme(getPreferredTheme());

  // Toggle on button click
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system color scheme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem("isl-tech-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // ========================================
  // MOBILE NAV TOGGLE
  // ========================================

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      }
    });
  }

  // ========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ========================================

  const animateElements = document.querySelectorAll(".animate-on-scroll");

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    animateElements.forEach((el) => observer.observe(el));
  }

  // ========================================
  // ACTIVE NAV LINK
  // ========================================

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinksAll = document.querySelectorAll(".nav-links a");

  navLinksAll.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });

  // ========================================
  // CONTACT FORM (simple handler)
  // ========================================

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "📨 Sending...";
      submitBtn.disabled = true;

      // Simulate sending (replace with actual form service)
      setTimeout(() => {
        submitBtn.textContent = "✅ Message Sent!";
        submitBtn.style.background = "#22c55e";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// ========================================
// APP DOWNLOAD TOGGLE (used on apps.html)
// ========================================
function toggleAppDownloads(appId) {
  const downloadsDiv = document.getElementById("downloads-" + appId);

  if (!downloadsDiv) return;

  const isOpen = downloadsDiv.classList.contains("open");

  // Close all other open download panels
  document.querySelectorAll(".app-downloads.open").forEach((panel) => {
    panel.classList.remove("open");
  });

  // Deactivate all download icon buttons
  document.querySelectorAll(".download-icon-btn.active").forEach((btn) => {
    btn.classList.remove("active");
  });

  // If it wasn't open, open it and show the download options
  if (!isOpen) {
    downloadsDiv.classList.add("open");
    const card = downloadsDiv.closest(".app-card");
    if (card) {
      const btn = card.querySelector(".download-icon-btn");
      if (btn) btn.classList.add("active");
      // Smooth scroll so user sees the download links
      setTimeout(() => {
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }
}
