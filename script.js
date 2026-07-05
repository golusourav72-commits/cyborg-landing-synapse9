// SYNAPSE-9 — interaction layer

document.addEventListener('DOMContentLoaded', () => {

  // Smooth-scroll for internal nav links (native CSS already handles this,
  // this adds a small offset correction for the fixed nav bar)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Button press feedback ("Begin Assessment")
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('clicked');
      const original = btn.textContent;
      btn.textContent = 'Assessment Queued';
      setTimeout(() => {
        btn.classList.remove('clicked');
        btn.textContent = original;
      }, 1600);
    });
  });

  // Reveal module cards as they scroll into view
  const modules = document.querySelectorAll('.module');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.4 });

  modules.forEach(mod => observer.observe(mod));

});
