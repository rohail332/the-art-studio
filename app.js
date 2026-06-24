const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

const filterButtons = document.querySelectorAll(".unknow-links .unknow-btn");
const portfolioItems = document.querySelectorAll(".box-po .pro-div");

if (filterButtons.length && portfolioItems.length) {
  const map = { post: "p", art: "v", logo: "l", sms: "s", yt: "t" };

  function showAll() {
    portfolioItems.forEach((i) => (i.style.display = "block"));
  }

  function filterBy(key) {
    const targetClass = map[key];
    if (!targetClass) return showAll();
    portfolioItems.forEach((item) => {
      if (item.classList.contains(targetClass)) item.style.display = "block";
      else item.style.display = "none";
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.classList.contains("all")) {
        showAll();
        return;
      }

      const keys = Object.keys(map);
      for (let k of keys) {
        if (btn.classList.contains(k)) {
          filterBy(k);
          return;
        }
      }

      showAll();
    });
  });

  showAll();
  const first =
    document.querySelector(".unknow-links .unknow-btn.all") || filterButtons[0];
  if (first) first.classList.add("active");
}

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);

          let count = document.querySelectorAll(".num");
          let duration = 2000;
          count.forEach((item) => {
            let start = 0;
            let end = parseInt(item.getAttribute("data-val"));
            let suffix = item.getAttribute("data-suffix");
            let time = Math.floor(duration / end);

            let counter = setInterval(() => {
              start++;
              item.textContent = start + suffix;

              if (start >= end) {
                clearInterval(counter);
              }
            }, time);
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const glow = document.createElement("div");
glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%);
    pointer-events: none; z-index: 0; transition: transform .15s ease;
    transform: translate(-50%, -50%);
  `;
document.body.appendChild(glow);
document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
