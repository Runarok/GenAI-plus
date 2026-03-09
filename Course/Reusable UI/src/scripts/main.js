// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Loading button functionality
  const loadingButtons = [
    'btn-loading-primary',
    'btn-loading-secondary',
    'btn-loading-outline',
    'btn-loading-ghost',
    'btn-loading-demo'
  ];

  loadingButtons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', function(e) {
        // Prevent default behavior
        e.preventDefault();
        
        // Add loading state
        this.classList.add('loading');
        this.disabled = true;

        // Remove loading state after 2 seconds
        setTimeout(() => {
          this.classList.remove('loading');
          this.disabled = false;
        }, 2000);
      });
    }
  });

  // Password toggle functionality
  const passwordToggles = document.querySelectorAll('.password-toggle');

  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const container = this.closest('.input-container');
      const input = container.querySelector('.password-input');
      const eyeIcon = this.querySelector('.eye-icon');
      const eyeOffIcon = this.querySelector('.eye-off-icon');

      if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
      } else {
        input.type = 'password';
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
      }
    });
  });

  // Input focus animation - update label color
  const inputs = document.querySelectorAll('.input');

  inputs.forEach(input => {
    const wrapper = input.closest('.input-wrapper');
    if (!wrapper) return;

    const label = wrapper.querySelector('.input-label');
    if (!label) return;

    input.addEventListener('focus', function() {
      if (this.classList.contains('input-error')) {
        label.style.color = '#dc2626';
      } else if (this.classList.contains('input-success')) {
        label.style.color = '#16a34a';
      } else {
        label.style.color = '#2563eb';
      }
    });

    input.addEventListener('blur', function() {
      if (this.classList.contains('input-error')) {
        label.style.color = '#dc2626';
      } else if (this.classList.contains('input-success')) {
        label.style.color = '#16a34a';
      } else {
        label.style.color = '#6b7280';
      }
    });
  });

  // Add ripple effect to buttons on click
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.disabled || this.classList.contains('loading')) return;

      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      from {
        transform: scale(0);
        opacity: 1;
      }
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Scroll reveal animation for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    observer.observe(card);
  });

  // Form validation simulation
  const inputs_with_validation = document.querySelectorAll('.input-error, .input-success');

  inputs_with_validation.forEach(input => {
    input.addEventListener('input', function() {
      const wrapper = this.closest('.input-wrapper');
      const helperText = wrapper.querySelector('.input-helper');
      
      if (this.value.length > 5) {
        // Simulate success
        this.classList.remove('input-error');
        this.classList.add('input-success');
        
        const label = wrapper.querySelector('.input-label');
        if (label) {
          label.classList.remove('input-label-error');
          label.classList.add('input-label-success');
        }
        
        if (helperText) {
          helperText.classList.remove('input-helper-error');
          helperText.classList.add('input-helper-success');
          helperText.textContent = 'Looks good!';
        }

        // Update icon if exists
        const iconContainer = wrapper.querySelector('.input-icon');
        if (iconContainer) {
          iconContainer.classList.remove('input-icon-error');
          iconContainer.classList.add('input-icon-success');
          iconContainer.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        }
      } else if (this.value.length > 0) {
        // Keep error state
        this.classList.add('input-error');
        this.classList.remove('input-success');
      }
    });
  });

  console.log('Component System loaded successfully!');
  
});
