/* =====================================================
   FUTURISTIC AI/ML PORTFOLIO — ENHANCED JAVASCRIPT
   ===================================================== */

// ─── Wait for DOM ───
document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // 1. PARTICLE / NEURAL NETWORK CANVAS
  // =====================================================
  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  const PARTICLE_COUNT = 70;
  const CONNECT_DISTANCE = 140;
  let mouse = { x: null, y: null };
  let animFrame;

  // Dynamic colors (updated by theme toggle)
  let particleColor = { r: 0, g: 240, b: 255 };
  let connectionColor = { r: 0, g: 240, b: 255 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.8 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x += dx * 0.002;
          this.y += dy * 0.002;
        }
      }

      // Wrap edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${connectionColor.r}, ${connectionColor.g}, ${connectionColor.b}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawConnections();
    animFrame = requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // =====================================================
  // 1b. ANIMATED BACKGROUND BLOBS (whole page)
  // =====================================================
  ["bg-blob-1", "bg-blob-2", "bg-blob-3"].forEach((id) => {
    if (!document.getElementById(id)) {
      const blob = document.createElement("div");
      blob.id = id;
      document.body.appendChild(blob);
    }
  });

  // =====================================================
  // 2. FLOATING AI THEME ICONS
  // =====================================================
  const aiIcons = ["⚡", "🧠", "🤖", "📊", "💡", "🔬", "🌐", "⚙️", "📡", "🧬"];

  function createFloatingIcon() {
    const icon = document.createElement("span");
    icon.className = "floating-icon";
    icon.textContent = aiIcons[Math.floor(Math.random() * aiIcons.length)];
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.animationDuration = (Math.random() * 15 + 20) + "s";
    icon.style.fontSize = (Math.random() * 0.8 + 0.8) + "rem";
    icon.style.opacity = 0;
    document.body.appendChild(icon);

    setTimeout(() => icon.remove(), 35000);
  }

  // Spawn icons periodically
  setInterval(createFloatingIcon, 4000);
  // Initial burst
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingIcon, i * 800);
  }

  // =====================================================
  // 3. AOS INIT — Enhanced
  // =====================================================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }

  // =====================================================
  // 4. SCROLL-REVEAL ANIMATIONS (Custom IntersectionObserver)
  // =====================================================
  function applyRevealClasses() {
    // Section titles
    document.querySelectorAll("section h2").forEach((el) => {
      if (!el.classList.contains("reveal-up")) {
        el.classList.add("reveal-up");
      }
    });

    // Project cards
    document.querySelectorAll("#projects .grid > div").forEach((el, i) => {
      el.classList.add("reveal-scale", `stagger-${(i % 3) + 1}`);
    });

    // Skill category cards
    document.querySelectorAll("#skills .grid > div").forEach((el, i) => {
      el.classList.add("reveal-up", `stagger-${(i % 3) + 1}`);
    });

    // Timeline items left/right
    document.querySelectorAll("#experience .flex.justify-start .text-right").forEach((el) => {
      el.classList.add("reveal-left");
    });
    document.querySelectorAll("#experience .flex.justify-end .text-left").forEach((el) => {
      el.classList.add("reveal-right");
    });

    // Achievement cards
    document.querySelectorAll("#achievements .grid > div").forEach((el, i) => {
      el.classList.add("reveal-scale", `stagger-${(i % 2) + 1}`);
    });

    // EduHunt flags
    document.querySelectorAll("#eduhunt .transform.transition").forEach((el, i) => {
      el.classList.add("reveal-scale", `stagger-${(i % 6) + 1}`);
    });

    // About section content
    document.querySelectorAll("#about p, #about .bg-gradient-to-r").forEach((el) => {
      el.classList.add("reveal-up");
    });

    // Contact form
    document.querySelectorAll("#contact .bg-white").forEach((el) => {
      el.classList.add("reveal-up");
    });
  }

  applyRevealClasses();

  // Intersection Observer for reveals
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
    revealObserver.observe(el);
  });

  // =====================================================
  // 5. NAVBAR — Scroll Effect + Style
  // =====================================================
  const nav = document.querySelector("nav.fixed");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // =====================================================
  // 6. MOBILE MENU TOGGLE (preserve existing)
  // =====================================================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // =====================================================
  // 7. TYPED.JS — Enhanced Initialization
  // =====================================================
  if (typeof Typed !== "undefined") {
    new Typed("#typing-text", {
      strings: [
        "AI Engineer",
        "Study Consultant",
        "Machine Learning Developer",
        "FastAPI Backend Developer",
        "Computer Vision Enthusiast",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "▮",
    });
  }

  // =====================================================
  // 8. THEME TOGGLE — Dark default, Light mode switch
  // =====================================================
  let isLightMode = localStorage.getItem("theme") === "light";
  const themeBtn = document.getElementById("theme-toggle");

  function applyTheme() {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      if (themeBtn) themeBtn.textContent = "☀️";
    } else {
      document.body.classList.remove("light-mode");
      if (themeBtn) themeBtn.textContent = "🌙";
    }
    // Update particle colors
    updateParticleColors();
  }

  function updateParticleColors() {
    const light = document.body.classList.contains("light-mode");
    particleColor = light
      ? { r: 0, g: 150, b: 170 }
      : { r: 0, g: 240, b: 255 };
    connectionColor = light
      ? { r: 0, g: 150, b: 170 }
      : { r: 0, g: 240, b: 255 };
  }

  // Apply saved theme on load
  applyTheme();

  window.toggleDarkMode = function () {
    isLightMode = !isLightMode;
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    applyTheme();
  };

  // =====================================================
  // 9. LIGHTBOX
  // =====================================================
  window.openLightbox = function (imageSrc) {
    const lb = document.getElementById("certificateLightbox");
    const img = document.getElementById("lightboxImage");
    if (lb && img) {
      img.src = imageSrc;
      lb.classList.remove("hidden");
      lb.style.display = "flex";
    }
  };

  window.closeLightbox = function () {
    const lb = document.getElementById("certificateLightbox");
    const img = document.getElementById("lightboxImage");
    if (lb) {
      lb.classList.add("hidden");
      lb.style.display = "none";
    }
    if (img) img.src = "";
  };

  const lbEl = document.getElementById("certificateLightbox");
  if (lbEl) {
    lbEl.addEventListener("click", function (e) {
      if (e.target === this) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // =====================================================
  // 10. TESTIMONIALS — Enhanced Carousel
  // =====================================================
  const testimonials = [
    {
      text: "Manav is a quick learner and shows great potential in ML projects.",
      name: "Ronak N Patel",
      role: "Professor, Charusat University",
    },
    {
      text: "Great work on the Node.js project during his internship.",
      name: "Mr. Shah",
      role: "Upstair Technologies LLP",
    },
    {
      text: "Delivered excellent results in Computer Vision tasks.",
      name: "Ajay Bhatt",
      role: "Techno Smart Diamond Solutions",
    },
  ];

  let tIndex = 0;
  const tBox = document.getElementById("testimonial-box");

  function renderTestimonial() {
    if (!tBox) return;

    tBox.style.opacity = "0";
    tBox.style.transform = "translateX(-20px) scale(0.97)";

    setTimeout(() => {
      tBox.innerHTML = `
        <p class="text-lg italic text-gray-700 mb-6">"${testimonials[tIndex].text}"</p>
        <h4 class="font-semibold">${testimonials[tIndex].name}</h4>
        <p class="text-sm text-gray-500">${testimonials[tIndex].role}</p>
      `;

      tBox.style.opacity = "1";
      tBox.style.transform = "translateX(0) scale(1)";
    }, 400);
  }

  window.prevTestimonial = function () {
    tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  };

  window.nextTestimonial = function () {
    tIndex = (tIndex + 1) % testimonials.length;
    renderTestimonial();
  };

  setInterval(() => nextTestimonial(), 6000);

  // =====================================================
  // 11. SCROLL PROGRESS BAR
  // =====================================================
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  });

  // =====================================================
  // 12. VANILLA TILT — Apply to Cards
  // =====================================================
  if (typeof VanillaTilt !== "undefined") {
    // Project cards
    VanillaTilt.init(document.querySelectorAll("#projects .grid > div"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.12,
      scale: 1.02,
    });

    // Skill category cards
    VanillaTilt.init(document.querySelectorAll("#skills .grid > div.bg-white"), {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.08,
    });

    // Achievement cards
    VanillaTilt.init(document.querySelectorAll("#achievements .grid > div"), {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
    });
  }

  // =====================================================
  // 13. RIPPLE CLICK EFFECT
  // =====================================================
  document.querySelectorAll("a, button").forEach((el) => {
    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";

    el.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // =====================================================
  // 14. SMOOTH SECTION LINKS — Active State
  // =====================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "#00f0ff";
      }
    });
  });

  // 15. PROFILE IMAGE — kept as normal (no spinning ring)

  // =====================================================
  // 16. CURSOR GLOW FOLLOWER (Desktop only)
  // =====================================================
  if (window.innerWidth > 768) {
    const cursor = document.createElement("div");
    cursor.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(circle, rgba(0,240,255,0.04), transparent 70%);
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  // =====================================================
  // CONSOLE LOG 🚀
  // =====================================================
  console.log(
    "%c🚀 Futuristic Portfolio Loaded",
    "color: #00f0ff; font-size: 14px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;"
  );

});
