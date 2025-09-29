// Cecconi's Restaurant Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Toggle hamburger icon
      const icon = mobileMenuBtn.querySelector("svg path");
      if (mobileMenu.classList.contains("hidden")) {
        icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      } else {
        icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenuBtn.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("svg path");
        icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    });
  }

  // Gallery Slider Functionality
  const gallerySlider = document.getElementById("gallery-slider");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (gallerySlider && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = gallerySlider.children.length;

    function updateSlider() {
      const translateX = -currentSlide * 100;
      gallerySlider.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    // Event listeners for slider buttons
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySlider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    gallerySlider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
      }
    }
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Basic validation
      if (!firstName || !lastName || !email || !subject || !message) {
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      // Phone validation (if provided)
      if (phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
          showMessage("Please enter a valid phone number.", "error");
          return;
        }
      }

      // Simulate form submission
      showMessage(
        "Thank you for your message! We will get back to you soon.",
        "success"
      );
      contactForm.reset();

      // In a real application, you would send the data to a server
      console.log("Form submitted:", {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      });
    });
  }

  // Function to show messages
  function showMessage(text, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement("div");
    messageEl.className = `form-message p-4 rounded-lg mb-4 ${
      type === "success"
        ? "bg-green-100 text-green-700 border border-green-200"
        : "bg-red-100 text-red-700 border border-red-200"
    }`;
    messageEl.textContent = text;

    // Insert message at the top of the form
    contactForm.insertBefore(messageEl, contactForm.firstChild);

    // Scroll to message
    messageEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // Remove message after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".bg-white, .grid > div").forEach((el) => {
    observer.observe(el);
  });

  // Image loading animations removed to prevent pulsing

  // Dynamic year in footer
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll("footer p");
  copyrightElements.forEach((el) => {
    if (el.textContent.includes("2025")) {
      el.textContent = el.textContent.replace("2025", currentYear);
    }
  });

  // Add hover effects to cards
  document.querySelectorAll(".bg-white").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Initialize tooltips for social media links
  document.querySelectorAll('footer a[href*="facebook"]').forEach((link) => {
    link.title = "Follow us on Facebook";
  });

  document.querySelectorAll('footer a[href*="instagram"]').forEach((link) => {
    link.title = "Follow us on Instagram";
  });

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Escape key closes mobile menu
    if (
      e.key === "Escape" &&
      mobileMenu &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuBtn.querySelector("svg path");
      icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }

    // Arrow keys for gallery navigation
    if (gallerySlider) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    }
  });

  // Lazy loading removed to prevent image pulsing issues
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth page transitions
window.addEventListener("beforeunload", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";
});

// Add CSS classes for animations
const style = document.createElement("style");
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Image loading styles removed to prevent pulsing */
`;
document.head.appendChild(style);
