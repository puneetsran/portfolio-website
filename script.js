// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 700,
    easing: "ease-out",
    once: true,
    offset: 80,
  });

  initSmoothScrolling();
  initActiveNav();
  initEmailCopy();
  initThemeToggle();
  initScrollProgress();
  initStatsCounter();
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetSection = document.querySelector(this.getAttribute("href"));
      if (!targetSection) return;
      e.preventDefault();

      const offsetPosition = targetSection.offsetTop - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
  });
}

// ===== ACTIVE NAV ON SCROLL =====
function initActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ===== COPY EMAIL ON CLICK =====
function initEmailCopy() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const email = this.getAttribute("href").replace("mailto:", "");

      navigator.clipboard
        .writeText(email)
        .then(() => {
          showNotification("Email copied to clipboard");
          setTimeout(() => {
            window.location.href = this.getAttribute("href");
          }, 500);
        })
        .catch(() => {
          window.location.href = this.getAttribute("href");
        });
    });
  });
}

// ===== THEME TOGGLE (DARK/LIGHT MODE) =====
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const applyIcon = (isDark) => {
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };

  const isDarkInit = localStorage.getItem("theme") === "dark";
  if (isDarkInit) document.body.classList.add("dark-theme");
  applyIcon(isDarkInit);

  themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-theme");
    applyIcon(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Press 'T' to toggle theme
  document.addEventListener("keydown", function (e) {
    if (
      e.key.toLowerCase() === "t" &&
      !e.ctrlKey &&
      !e.metaKey &&
      document.activeElement.tagName !== "INPUT"
    ) {
      themeToggle.click();
    }
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
  });
}

// ===== NOTIFICATION =====
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  if (!document.querySelector("style[data-notifications]")) {
    const style = document.createElement("style");
    style.setAttribute("data-notifications", "true");
    style.textContent = `
      .notification {
        position: fixed;
        top: 64px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        border-radius: 8px;
        background: var(--accent);
        color: var(--accent-contrast);
        font-weight: 500;
        font-size: 0.875rem;
        z-index: 1001;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2500);
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const stat = entry.target;
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ""));
      observer.unobserve(stat);

      if (isNaN(numericValue) || numericValue === 0) return;

      const suffix = finalValue.replace(/[\d,]/g, "");
      let currentValue = 0;
      const increment = Math.max(1, numericValue / 40);

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          stat.textContent = finalValue;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(currentValue) + suffix;
        }
      }, 40);
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}
