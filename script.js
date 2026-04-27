const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${index * 90}ms`;
  revealObserver.observe(item);
});

const linkMap = new Map(
  Array.from(navLinks).map((link) => [link.getAttribute("href").slice(1), link])
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linkMap.get(entry.target.id);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-10% 0px -45% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));
