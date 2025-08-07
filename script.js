// ===== MODERN PORTFOLIO WEBSITE JAVASCRIPT =====

// Initialize AOS (Animate On Scroll) library
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Initialize all interactive features
  initSmoothScrolling();
  initTypingAnimation();
  initSkillAnimations();
  initContactForm();
  initThemeToggle();
  initScrollProgress();
  initLazyLoading();
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 100;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Add active state to clicked nav item
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });
}

// ===== TYPING ANIMATION FOR HERO SUBTITLE =====
function initTypingAnimation() {
  const subtitle = document.querySelector(".hero .subtitle");
  if (!subtitle) return;

  const roles = [
    "Data Engineering Professional",
    "Python & SQL Expert",
    "GCP Cloud Specialist",
    "Machine Learning Enthusiast",
    "Business Intelligence Developer",
  ];

  let currentRole = 0;
  let currentChar = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[currentRole];

    if (isDeleting) {
      subtitle.textContent = current.substring(0, currentChar - 1);
      currentChar--;
    } else {
      subtitle.textContent = current.substring(0, currentChar + 1);
      currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === current.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
      typeSpeed = 500; // Pause before next role
    }

    setTimeout(typeRole, typeSpeed);
  }

  // Start typing animation after a short delay
  setTimeout(typeRole, 1000);
}

// ===== SKILL TAG ANIMATIONS =====
function initSkillAnimations() {
  const skillTags = document.querySelectorAll(".skill-tag");

  skillTags.forEach((tag, index) => {
    // Add staggered animation delay
    tag.style.animationDelay = `${index * 0.1}s`;

    // Add hover sound effect (visual feedback)
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// ===== CONTACT FORM ENHANCEMENT =====
function initContactForm() {
  // Add copy email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const email = this.getAttribute("href").replace("mailto:", "");

      // Copy email to clipboard
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showNotification("Email copied to clipboard!", "success");

          // Still open email client after a short delay
          setTimeout(() => {
            window.location.href = this.getAttribute("href");
          }, 500);
        })
        .catch(() => {
          // Fallback: just open email client
          window.location.href = this.getAttribute("href");
        });
    });
  });
}

// ===== THEME TOGGLE (DARK/LIGHT MODE) =====
function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = "theme-toggle";
  themeToggle.setAttribute("aria-label", "Toggle dark mode");

  // Add styles for theme toggle
  const style = document.createElement("style");
  style.textContent = `
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-color);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        body.dark-theme {
            --gray-50: #1e293b;
            --gray-100: #334155;
            --gray-200: #475569;
            --white: #0f172a;
            --gray-800: #f1f5f9;
            --gray-900: #ffffff;
        }
    `;
  document.head.appendChild(style);
  document.body.appendChild(themeToggle);

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");

    this.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");

    showNotification(`Switched to ${isDark ? "dark" : "light"} mode`, "info");
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";

  const style = document.createElement("style");
  style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 1000;
            transition: width 0.1s ease;
        }
    `;
  document.head.appendChild(style);
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            animation: slideInDown 0.3s ease, slideOutUp 0.3s ease 2.7s;
        }
        
        .notification-success { background: var(--success-color); }
        .notification-info { background: var(--primary-color); }
        .notification-warning { background: var(--warning-color); }
        .notification-error { background: var(--error-color); }
        
        @keyframes slideInDown {
            from { transform: translateX(-50%) translateY(-100%); }
            to { transform: translateX(-50%) translateY(0); }
        }
        
        @keyframes slideOutUp {
            from { transform: translateX(-50%) translateY(0); }
            to { transform: translateX(-50%) translateY(-100%); }
        }
    `;

  if (!document.querySelector("style[data-notifications]")) {
    style.setAttribute("data-notifications", "true");
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ===== STATS COUNTER ANIMATION =====
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));

        // Skip animation for non-numeric values like "High Impact"
        if (isNaN(numericValue) || numericValue === 0) {
          observer.unobserve(stat);
          return;
        }

        const suffix = finalValue.replace(/[\d,]/g, "");

        let currentValue = 0;
        const increment = numericValue / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            stat.textContent = finalValue;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(currentValue) + suffix;
          }
        }, 50);

        observer.unobserve(stat);
      }
    });
  });

  stats.forEach((stat) => observer.observe(stat));
}

// Initialize stats animation
document.addEventListener("DOMContentLoaded", animateStats);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", function (e) {
  // Press 'T' to toggle theme
  if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey) {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle && document.activeElement.tagName !== "INPUT") {
      themeToggle.click();
    }
  }

  // Press 'Escape' to close any open modals or notifications
  if (e.key === "Escape") {
    const notifications = document.querySelectorAll(".notification");
    notifications.forEach((notification) => notification.remove());
  }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener("load", function () {
  // Log performance metrics
  const perfData = performance.getEntriesByType("navigation")[0];
  console.log(
    "🚀 Portfolio loaded in:",
    Math.round(perfData.loadEventEnd - perfData.fetchStart),
    "ms"
  );

  // Show loading complete notification
  setTimeout(() => {
    showNotification("Portfolio loaded successfully!", "success");
  }, 500);
});

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    showNotification(
      "🎉 Konami Code activated! You found the easter egg!",
      "success"
    );
    document.body.style.animation = "rainbow 2s infinite";

    const style = document.createElement("style");
    style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.style.animation = "";
    }, 4000);

    konamiCode = [];
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initSmoothScrolling,
    initTypingAnimation,
    showNotification,
    animateStats,
  };
}
