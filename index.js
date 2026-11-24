/**
 * Mohammed Rafique - Portfolio Scripts
 * Minimalist Theme Controller, Scrollspy & Accessible Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Theme Controller
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      htmlRoot.classList.add("dark");
    } else {
      htmlRoot.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  };

  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = htmlRoot.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("portfolio-theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  // --------------------------------------------------------------------------
  // 2. Scroll Progress Fallback
  // --------------------------------------------------------------------------
  if (!CSS.supports("animation-timeline", "scroll()")) {
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      window.addEventListener(
        "scroll",
        () => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          progressBar.style.transform = `scaleX(${progress})`;
        },
        { passive: true }
      );
    }
  }

  // --------------------------------------------------------------------------
  // 3. Scrollspy Navigation Observer
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll("main section[id]");
  const desktopNavLinks = document.querySelectorAll(".site-nav .nav-link, #nav-menu .nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const activeDesktopClasses = ["text-blue-600", "dark:text-blue-400", "font-semibold"];
  const inactiveDesktopClasses = ["text-slate-600", "dark:text-slate-300", "font-medium"];

  const updateActiveNavLink = (activeId) => {
    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isMatch = href === `#${activeId}`;

      if (isMatch) {
        link.classList.add(...activeDesktopClasses);
        link.classList.remove(...inactiveDesktopClasses);
        link.setAttribute("aria-current", "true");
      } else {
        link.classList.remove(...activeDesktopClasses);
        link.classList.add(...inactiveDesktopClasses);
        link.setAttribute("aria-current", "false");
      }
    });

    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isMatch = href === `#${activeId}`;
      link.classList.toggle("text-blue-600", isMatch);
      link.classList.toggle("dark:text-blue-400", isMatch);
      link.classList.toggle("font-semibold", isMatch);
      link.setAttribute("aria-current", isMatch ? "true" : "false");
    });
  };

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            updateActiveNavLink(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // --------------------------------------------------------------------------
  // 4. Typing Text (Clean & Subtle)
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const roles = [
      "Full Stack MERN Developer",
      "Software Engineer at Schoollog",
      "2.5+ Years Experience",
      "React & Node.js Specialist",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    const typeLoop = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2400;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 500);
  }

  // --------------------------------------------------------------------------
  // 5. Projects Category Filter
  // --------------------------------------------------------------------------
  const projectFilterBtns = document.querySelectorAll(".projects-filter-nav .filter-btn");
  const projectCards = document.querySelectorAll(".projects-grid .project-card");

  const activeBtnClasses = ["bg-blue-600", "text-white", "font-semibold"];
  const inactiveBtnClasses = ["border", "border-slate-200", "dark:border-slate-800", "text-slate-600", "dark:text-slate-300", "font-medium"];

  if (projectFilterBtns.length > 0 && projectCards.length > 0) {
    projectFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        projectFilterBtns.forEach((b) => {
          b.classList.remove(...activeBtnClasses);
          b.classList.add(...inactiveBtnClasses);
          b.setAttribute("aria-selected", "false");
        });

        btn.classList.remove(...inactiveBtnClasses);
        btn.classList.add(...activeBtnClasses);
        btn.setAttribute("aria-selected", "true");

        const filter = btn.getAttribute("data-project-filter") || "all";

        projectCards.forEach((card) => {
          const cat = card.getAttribute("data-project-cat");
          if (filter === "all" || cat === filter) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Mobile Drawer Auto-Close
  // --------------------------------------------------------------------------
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileDrawer) {
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (typeof mobileDrawer.hidePopover === "function") {
          mobileDrawer.hidePopover();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Handling (modern-web-guidance)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm && formStatus && submitBtn) {
    const syncFieldAria = (field) => {
      if (!field.validity) return;
      const isValid = field.validity.valid;
      field.setAttribute("aria-invalid", isValid ? "false" : "true");
    };

    contactForm.querySelectorAll("input, textarea").forEach((field) => {
      field.setAttribute("aria-invalid", "false");
      field.addEventListener("blur", () => syncFieldAria(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          syncFieldAria(field);
        }
      });
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        const firstInvalid = contactForm.querySelector(":invalid");
        if (firstInvalid) {
          firstInvalid.focus();
          syncFieldAria(firstInvalid);
        }
        return;
      }

      // Honeypot anti-spam
      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== "") {
        return;
      }

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.replaceChildren();

      const sendingSpan = document.createElement("span");
      sendingSpan.textContent = "Sending...";
      submitBtn.append(sendingSpan);

      formStatus.className = "hidden p-3 rounded-lg text-xs font-medium text-center";
      formStatus.replaceChildren();

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.className =
            "block p-3 rounded-lg text-xs font-medium text-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
          formStatus.textContent =
            "Thank you. Your message has been sent successfully.";
          contactForm.reset();

          contactForm.querySelectorAll("input, textarea").forEach((f) => {
            f.setAttribute("aria-invalid", "false");
          });

          setTimeout(() => {
            formStatus.className = "hidden";
            formStatus.replaceChildren();
          }, 6000);
        } else {
          throw new Error("Form submission error.");
        }
      } catch (err) {
        console.error("Submission error:", err);
        formStatus.className =
          "block p-3 rounded-lg text-xs font-medium text-center bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800";
        formStatus.textContent =
          "Unable to send message right now. Please email Kota.mohdrafiq@gmail.com directly.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. 1-Click Copy Email
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById("copy-email-btn");
  const copyEmailText = document.getElementById("copy-email-text");
  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = copyEmailBtn.getAttribute("data-email") || "Kota.mohdrafiq@gmail.com";
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        copyEmailText.textContent = "Copied!";
        copyEmailBtn.classList.add("text-blue-600", "dark:text-blue-400", "border-blue-500");
        setTimeout(() => {
          copyEmailText.textContent = "Copy";
          copyEmailBtn.classList.remove("text-blue-600", "dark:text-blue-400", "border-blue-500");
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Back To Top
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Dynamic Year
  // --------------------------------------------------------------------------
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
