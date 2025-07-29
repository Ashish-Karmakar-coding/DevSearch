  // Typewriter effect
    const phrases = [
      "Search the web like a pro",
      "Find code solutions instantly",
      "Explore development resources",
      "Discover new technologies",
      "Learn and grow as a developer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const element = document.getElementById("typewriter");
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && charIndex < currentPhrase.length) {
        element.textContent += currentPhrase.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, Math.random() * 100 + 50);
      } else if (isDeleting && charIndex > 0) {
        element.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 25);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 200);
      }
    }

    // Create floating particles
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      const colors = ['#00d4ff', '#06ffa5', '#ffffff', '#ff6b6b'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
      
      document.querySelector('.bg-animation').appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 20000);
    }

    // Search functionality
    function performSearch(query) {
      if (!query.trim()) return;
      
      // Show loading
      document.getElementById('loading').classList.add('active');
      
      // Simulate search delay for better UX
      setTimeout(() => {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
        document.getElementById('loading').classList.remove('active');
      }, 500);
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      const suggestions = document.querySelectorAll('.suggestion-tag');

      // Start typewriter effect
      setTimeout(typeWriter, 1000);

      // Create particles periodically
      setInterval(createParticle, 2000);
      
      // Create initial particles
      for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
      }

      // Search button click
      searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
      });

      // Enter key search
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          performSearch(searchInput.value);
        }
      });

      // Search input animations
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transform = 'scale(1.02)';
      });

      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.transform = 'scale(1)';
      });

      // Suggestion tags
      suggestions.forEach(tag => {
        tag.addEventListener('click', () => {
          const query = tag.getAttribute('data-query');
          searchInput.value = query;
          performSearch(query);
        });
      });

      // Add search suggestions on input
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 2) {
          // You could add real-time search suggestions here
          console.log('Searching for:', query);
        }
      });
    });

    // Add some interactive hover effects
    document.querySelectorAll('.action-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
      });
    });

    // Random particle colors
    function getRandomColor() {
      const colors = ['#00d4ff', '#06ffa5', '#ff6b6b', '#ffd93d', '#a8e6cf'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Enhanced particle creation with random properties
    function createEnhancedParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position and properties
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = getRandomColor();
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      document.querySelector('.bg-animation').appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 20000);
    }

    // Create enhanced particles
    setInterval(createEnhancedParticle, 1500);