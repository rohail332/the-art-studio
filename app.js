const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".navLinks");
const navBtn = document.querySelector(".navbar-btn");

menu.addEventListener("click", () => {
  menu.classList.toggle("close");
  navLinks.classList.toggle("show");
  navBtn.classList.toggle("show");


});


const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);

          let count = document.querySelectorAll(".value");
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