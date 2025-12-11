document.addEventListener('DOMContentLoaded', () => {
  // HEADER LETTER ANIMATION
  const textWrapper = document.querySelector('.title');
  if (textWrapper) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({ loop: false })
      .add({
        targets: '.title .letter',
        translateY: [40, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 700,
        delay: (el, i) => 40 * i
      });
  }

  // NAV LINK SMOOTH SCROLL + trigger animation
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetID = link.getAttribute('href');
      const targetEl = document.querySelector(targetID);
      if (!targetEl) return;

      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        const square = targetEl.querySelector('.square') || targetEl;
        anime({
          targets: square,
          translateX: [-100, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'easeOutExpo'
        });
      }, 250);
    });
  });

  const topBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    topBtn.style.opacity = "1";
    topBtn.style.pointerEvents = "all";
  } else {
    topBtn.style.opacity = "0";
    topBtn.style.pointerEvents = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


  // SCROLL REVEAL: slide in from left, slide out when leaving viewport
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target.querySelector('.square') || entry.target;

      if (entry.isIntersecting) {
        anime({
          targets: el,
          translateX: [-100, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutExpo'
        });
      } else {
        anime({
          targets: el,
          translateX: [-100],
          opacity: [0],
          duration: 600,
          easing: 'easeInExpo'
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-block').forEach(s => io.observe(s));
});
