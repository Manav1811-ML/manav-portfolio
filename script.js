// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out"
});

// Mobile Menu Toggle
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Typing Animation
new Typed("#typing-text", {
  strings: [
    "AI Engineer",
    "Study Consultant",
    "Machine Learning Developer",
    "FastAPI Backend Developer"
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Lightbox
function openLightbox(imageSrc) {
  document.getElementById("lightboxImage").src = imageSrc;
  document.getElementById("certificateLightbox").classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("certificateLightbox").classList.add("hidden");
  document.getElementById("lightboxImage").src = "";
}

document.getElementById("certificateLightbox")?.addEventListener("click", function(e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeLightbox();
});

// Testimonials
let testimonials = [
  {
    text: "Manav is a quick learner and shows great potential in ML projects.",
    name: "Ronak N Patel",
    role: "Professor, Charusat University"
  },
  {
    text: "Great work on the Node.js project during his internship.",
    name: "Mr. Shah",
    role: "Upstair Technologies LLP"
  },
  {
    text: "Delivered excellent results in Computer Vision tasks.",
    name: "Ajay Bhatt",
    role: "Techno Smart Diamond Solutions"
  }
];

let tIndex = 0;
const tBox = document.getElementById("testimonial-box");

function renderTestimonial() {
  tBox.classList.remove("opacity-100", "translate-x-0");
  tBox.classList.add("opacity-0", "-translate-x-6");

  setTimeout(() => {
    tBox.innerHTML = `
      <p class="text-lg italic text-gray-700 mb-6">"${testimonials[tIndex].text}"</p>
      <h4 class="font-semibold">${testimonials[tIndex].name}</h4>
      <p class="text-sm text-gray-500">${testimonials[tIndex].role}</p>
    `;

    tBox.classList.remove("opacity-0", "-translate-x-6");
    tBox.classList.add("opacity-100", "translate-x-0");
  }, 400);
}

function prevTestimonial() {
  tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
}

function nextTestimonial() {
  tIndex = (tIndex + 1) % testimonials.length;
  renderTestimonial();
}

setInterval(() => nextTestimonial(), 6000);

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-progress").style.width =
    progress + "%";
});
