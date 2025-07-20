document.addEventListener('DOMContentLoaded', () => {

  // --- SMOOTH SCROLL FOR NAVIGATION LINKS ---
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Prevent default anchor click behavior
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- DARK MODE TOGGLE ---
  const toggleBtn = document.getElementById('toggle-dark');

  // Function to apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Event listener for the button
  toggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });

  // Load saved theme from localStorage on page load
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
  applyTheme(savedTheme);


  // --- ANIMATE ELEMENTS ON SCROLL (using Intersection Observer) ---
  const animatedElements = document.querySelectorAll('.animate');

  const observerOptions = {
    root: null, // observes intersections relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If the element is intersecting (visible)
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing the element once it has become visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach the observer to each animated element
  animatedElements.forEach(el => {
    observer.observe(el);
  });

});