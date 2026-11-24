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
  // 9. Project Details Modal Controller
  // --------------------------------------------------------------------------
  const PROJECTS_DATA = {
    "chatbot-flow": {
      title: "Chatbot Flow Builder",
      subtitle: "Visual node-based conversational workflow designer built with React Flow",
      image: "assets/chatbot_flow_homepage.png",
      alt: "Chatbot Flow Builder interface showing node connections",
      problem:
        "Building complex conversational trees and chatbot branching logic in static code or nested JSON files is error-prone, difficult to visualize, and inaccessible to non-technical stakeholders.",
      solution:
        "Engineered an interactive infinite canvas with React Flow where users can visually create, configure, and connect conversational message nodes, choice branches, and triggers with real-time validation.",
      features: [
        "Interactive drag-and-drop node canvas with smooth zoom, pan, and viewport controls",
        "Custom input and output connection handles ensuring valid one-way flow execution",
        "Real-time validation engine flagging orphan or disconnected conversational nodes",
        "Single-click JSON schema export and import for seamless bot deployment and backend execution"
      ],
      architecture:
        "React.js single-page application with Vite bundling. Implements custom React Flow node renderers, unidirectional edge state management, and schema-validated JSON serialization.",
      stack: ["React.js", "React Flow", "Vite", "Tailwind CSS", "JavaScript (ES6+)"],
      demo: "https://chatbot-flow-builder-seven-eta.vercel.app/",
      github: "https://github.com/Mohammmedrafique/Chatbot-flow-builder"
    },
    "blog-platform": {
      title: "Full-Stack Blog Platform",
      subtitle: "Production-style MERN publishing and community application with JWT authentication",
      image: "assets/masai_homepage.png",
      alt: "Full-Stack Blog Platform homepage screenshot",
      problem:
        "Content publishing platforms require scalable user authorization, secure credential storage, low-latency article querying, and frictionless reading experiences across devices.",
      solution:
        "Designed and built an end-to-end MERN blogging platform featuring JWT-secured user sessions, rich article authoring, category filtering, and threaded user interactions.",
      features: [
        "Secure user signup and login with bcrypt password hashing and JWT sessions",
        "Complete CRUD lifecycle for blog articles with category tagging and markdown previews",
        "Interactive reader engagement including post likes and threaded comment conversations",
        "Optimized MongoDB indexing and pagination queries for high-speed article retrieval"
      ],
      architecture:
        "Decoupled MERN architecture with an Express.js REST API layer, MongoDB persistence via Mongoose schemas, and a responsive React client.",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Authentication", "REST APIs"],
      demo: "https://blog-web-app-qbvk.vercel.app/",
      github: "https://github.com/Mohammmedrafique/Blog_web_app"
    },
    "task-manager": {
      title: "Full Stack Task Manager",
      subtitle: "Agile workflow productivity and sprint management system",
      image: "assets/task_homepage.png",
      alt: "Task Manager dashboard screenshot",
      problem:
        "Distributed teams and developers struggle to maintain real-time visibility into sprint backlogs, task lifecycles, and priority assignments with zero state drift.",
      solution:
        "Constructed a responsive task tracking dashboard with status columns (Backlog, In Progress, Completed), multi-level priority sorting, and personal user dashboards backed by MongoDB.",
      features: [
        "Dynamic task lifecycle management with instant status transitions",
        "Multi-attribute filtering by priority (High, Medium, Low), status, and keyword search",
        "Protected user-scoped data access ensuring private, isolated project task boards",
        "RESTful CRUD API endpoints with structured request validation and error middleware"
      ],
      architecture:
        "MERN stack tool utilizing Express router controllers, Mongoose schemas with indexed user references, and React state hooks for responsive updates.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
      demo: "https://task-manager-srex.vercel.app/",
      github: "https://github.com/Mohammmedrafique/task_manager"
    },
    "furniturecraft": {
      title: "FurnitureCraft Online Store",
      subtitle: "E-Commerce store with real-time cart state, filtering, and TypeScript types",
      image: "assets/projectpic/furniturecraft.png",
      alt: "FurnitureCraft online store screenshot",
      problem:
        "E-commerce shoppers need instantaneous product filtering by category and price range without slow page reloads or cart state loss.",
      solution:
        "Built a typed e-commerce platform in TypeScript and React featuring multi-facet filtering, responsive price range sliders, and persistent shopping cart state.",
      features: [
        "Real-time category filtering and dynamic price range selection",
        "Shopping cart state management with quantity adjustment and checkout calculation",
        "Strict TypeScript interfaces preventing runtime type errors across product models",
        "Responsive e-commerce layout optimized for mobile and desktop browsing"
      ],
      architecture:
        "TypeScript frontend with React component state, modular product cards, and Express/MongoDB backend catalog integration.",
      stack: ["TypeScript", "React.js", "Express.js", "MongoDB", "Tailwind CSS"],
      demo: "https://shoppage.vercel.app/",
      github: "https://github.com/Mohammmedrafique"
    },
    "ai-interview": {
      title: "AI Virtual Interview Assistant",
      subtitle: "Technical interview simulation and evaluation platform powered by OpenAI API",
      image: "assets/Student.png",
      alt: "AI Virtual Interview Assistant screenshot",
      problem:
        "Software engineering candidates lack realistic, on-demand mock interview practice with actionable, constructive feedback on their technical answers.",
      solution:
        "Created an interactive interview simulator that generates domain-specific technical questions, evaluates candidate responses via OpenAI API, and delivers scores and suggestions.",
      features: [
        "Dynamic question generation tailored to software engineering topics",
        "Natural language evaluation of candidate technical answers via OpenAI API",
        "Structured feedback reports highlighting conceptual accuracy and areas for improvement",
        "Clean interactive UI for distraction-free technical practice"
      ],
      architecture:
        "Node.js backend proxying OpenAI API requests with secure credential management, coupled with a React user interface.",
      stack: ["React.js", "Node.js", "OpenAI API", "REST APIs"],
      demo: "https://github.com/Mohammmedrafique",
      github: "https://github.com/Mohammmedrafique"
    },
    "fitquest": {
      title: "FitQuest - Gamify Fitness",
      subtitle: "Fitness gamification and social challenge platform built in an Agile team",
      image: "assets/projectpic/280637609-37cae2d2-ba2d-49ac-b3fc-1dac772c29d4.png",
      alt: "FitQuest gamify fitness application screenshot",
      problem:
        "Fitness habits are difficult to sustain without social accountability, milestone incentives, and tangible progress feedback.",
      solution:
        "Collaborated in a 4-person Agile sprint to develop FitQuest, an app that transforms workout logging into gamified challenges with points, streaks, and leaderboards.",
      features: [
        "Gamified workout activity tracking with daily challenge goal milestones",
        "Global and peer leaderboards fostering accountability and friendly competition",
        "Social activity feed with real-time updates and community motivation",
        "Cross-functional team sprint development following Git branching and PR reviews"
      ],
      architecture:
        "Full-stack MERN application developed collaboratively with team branch management, Express routing, and MongoDB aggregations.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Agile/Scrum"],
      demo: "https://posh-division-4370.vercel.app/",
      github: "https://github.com/audacity07/posh-division-4370.git"
    }
  };

  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("close-modal-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalImage = document.getElementById("modal-image");
  const modalProblem = document.getElementById("modal-problem");
  const modalSolution = document.getElementById("modal-solution");
  const modalFeatures = document.getElementById("modal-features");
  const modalArchitecture = document.getElementById("modal-architecture");
  const modalStack = document.getElementById("modal-stack");
  const modalDemo = document.getElementById("modal-demo");
  const modalGithub = document.getElementById("modal-github");

  const openProjectModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data || !projectModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = data.alt;
    }
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalSolution) modalSolution.textContent = data.solution;
    if (modalArchitecture) modalArchitecture.textContent = data.architecture;

    if (modalFeatures) {
      modalFeatures.replaceChildren();
      data.features.forEach((feat) => {
        const li = document.createElement("li");
        li.className = "flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300";
        const bullet = document.createElement("span");
        bullet.className = "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0";
        const text = document.createElement("span");
        text.textContent = feat;
        li.append(bullet, text);
        modalFeatures.appendChild(li);
      });
    }

    if (modalStack) {
      modalStack.replaceChildren();
      data.stack.forEach((tech) => {
        const badge = document.createElement("span");
        badge.className =
          "px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
        badge.textContent = tech;
        modalStack.appendChild(badge);
      });
    }

    if (modalDemo) {
      modalDemo.href = data.demo;
      modalDemo.style.display = data.demo ? "inline-flex" : "none";
    }
    if (modalGithub) {
      modalGithub.href = data.github;
      modalGithub.style.display = data.github ? "inline-flex" : "none";
    }

    if (typeof projectModal.showModal === "function") {
      projectModal.showModal();
    }
  };

  document.querySelectorAll("[data-project-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-modal");
      if (projectId) openProjectModal(projectId);
    });
  });

  if (modalCloseBtn && projectModal) {
    modalCloseBtn.addEventListener("click", () => {
      projectModal.close();
    });
  }

  if (projectModal && !("closedBy" in HTMLDialogElement.prototype)) {
    projectModal.addEventListener("click", (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        projectModal.close();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Hero Code Window Tab Switcher
  // --------------------------------------------------------------------------
  const codeTabBtns = document.querySelectorAll(".hero-code-tab");
  const codeTabPanes = document.querySelectorAll(".hero-code-pane");
  if (codeTabBtns.length > 0 && codeTabPanes.length > 0) {
    codeTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        codeTabBtns.forEach((b) => {
          const isActive = b.getAttribute("data-tab") === targetTab;
          b.classList.toggle("text-slate-200", isActive);
          b.classList.toggle("bg-slate-800", isActive);
          b.classList.toggle("text-slate-400", !isActive);
        });
        codeTabPanes.forEach((pane) => {
          const isTarget = pane.getAttribute("data-pane") === targetTab;
          pane.classList.toggle("hidden", !isTarget);
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11. Back To Top
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
