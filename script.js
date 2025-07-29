  // Update time
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      document.getElementById('currentTime').textContent = timeString;
    }

    // Typewriter effect
    const phrases = [
      "Full Stack Developer",
      "React Enthusiast",
      "Node.js Expert", 
      "TypeScript Advocate",
      "Open Source Contributor",
      "Problem Solver",
      "Code Architect"
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

    // Animate stats numbers
    function animateNumber(element, target, duration = 1000) {
      const start = 0;
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        
        element.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
        }
      }
      
      requestAnimationFrame(update);
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          // Add visual feedback
          this.style.background = 'rgba(78, 205, 196, 0.2)';
          this.style.borderColor = '#4ecdc4';
          
          setTimeout(() => {
            this.style.background = 'rgba(255, 255, 255, 0.08)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            console.log('Searching for:', query);
          }, 300);
        }
      }
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      updateTime();
      setInterval(updateTime, 1000);
      
      setTimeout(() => {
        typeWriter();
      }, 500);
      
      // Animate stats after a delay
      setTimeout(() => {
        animateNumber(document.getElementById('commitsToday'), 12, 800);
        animateNumber(document.getElementById('hoursToday'), 6, 1000);
        animateNumber(document.getElementById('linesWritten'), 847, 1200);
      }, 1000);
    });

    // Greeting based on time
    function updateGreeting() {
      const hour = new Date().getHours();
      const greetingElement = document.querySelector('.greeting');
      
      if (hour < 12) {
        greetingElement.textContent = 'Good morning, Ashish!';
      } else if (hour < 17) {
        greetingElement.textContent = 'Good afternoon, Ashish!';
      } else {
        greetingElement.textContent = 'Good evening, Ashish!';
      }
    }

    updateGreeting();