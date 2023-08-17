// JavaScript code to handle sidebar toggle
document.addEventListener("DOMContentLoaded", function () {
    setupSidebarToggle();
    setupImageSlider();
  });
  
  function setupSidebarToggle() {
    const sidebarToggle = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
  
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  
    document.addEventListener("click", function (event) {
      if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        sidebar.classList.remove("active");
      }
    });
  }
  
  
  
  function setupImageSlider() {
    const postImage = document.querySelector('.post-image');
    const sliderContainer = document.querySelector('.post-content-media');
    const paginationDots = document.querySelectorAll('.dot');
  
    let currentIndex = 0;
    const numImages = postImage.childElementCount;
  
    let touchStartX = 0;
    let touchEndX = 0;
  
    let autoSlideInterval = setInterval(nextSlide, 4000);
  
    sliderContainer.addEventListener('touchstart', handleTouchStart);
    sliderContainer.addEventListener('touchmove', handleTouchMove);
    sliderContainer.addEventListener('touchend', handleTouchEnd);
  
    sliderContainer.addEventListener('mousedown', handleMouseDown);
    sliderContainer.addEventListener('mousemove', handleMouseMove);
    sliderContainer.addEventListener('mouseup', handleMouseUp);
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % numImages;
      updateSlider();
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + numImages) % numImages;
      updateSlider();
    }
  
    function updateSlider() {
      const translateXValue = -currentIndex * 100;
      postImage.style.transform = `translateX(${translateXValue}%)`;
      updatePagination();
    }
  
    function updatePagination() {
      paginationDots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active-dot');
        } else {
          dot.classList.remove('active-dot');
        }
      });
    }
  
    function handleTouchStart(event) {
      touchStartX = event.touches[0].clientX;
    }
  
    function handleTouchMove(event) {
      touchEndX = event.touches[0].clientX;
    }
  
    function handleTouchEnd() {
      if (touchEndX < touchStartX) {
        nextSlide();
      } else if (touchEndX > touchStartX) {
        prevSlide();
      }
  
      touchStartX = touchEndX = 0;
    }
  
    function handleMouseDown(event) {
      touchStartX = event.clientX;
    }
  
    function handleMouseMove(event) {
      if (touchStartX === 0) return;
  
      touchEndX = event.clientX;
    }
  
    function handleMouseUp() {
      if (touchEndX < touchStartX) {
        nextSlide();
      } else if (touchEndX > touchStartX) {
        prevSlide();
      }
  
      touchStartX = touchEndX = 0;
    }
  
    // Clear the auto slide interval when user interacts
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    sliderContainer.addEventListener('touchstart', stopAutoSlide);
    sliderContainer.addEventListener('mousedown', stopAutoSlide);
  
    updateSlider();
  }
  
  