if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
/* Navigation Bar */
const icon = document.querySelector(".icon--box");
const closeIcon = document.querySelector(".close--icon");
const menuIcon = document.querySelector(".menu--icon");
const nav = document.querySelector(".nav--items");

icon.addEventListener("click", function () {
  nav.classList.toggle("show--menu");
  menuIcon.classList.toggle("hide--icon");
  closeIcon.classList.toggle("hide--icon");
});

/* Service Animation */
const heroSection = document.querySelector(".hero");
const navBar = document.querySelector(".nav--bar");
const services = document.querySelector(".services");

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
};

const navBarObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: `${-navBar.getBoundingClientRect().height}px`,
});
navBarObserver.observe(heroSection);

/* Testimonial Slider */

const slider = function () {
  const slides = document.querySelectorAll(".center--testimonial");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;

  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });

  const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  gotoSlide(0);

  // Create Dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button`
      );
    });
  };
  createDots();
  /* Active Dots */
  const activateDots = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  activateDots(0);

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    gotoSlide(curSlide);
    activateDots(curSlide);
  };
  btnRight.addEventListener("click", nextSlide);

  // Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activateDots(curSlide);
  };
  btnLeft.addEventListener("click", prevSlide);

  // Slide on key press

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  // Using dots to Navigate

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDots(slide);
    }
  });

  // SWIPE SLIDE
  const allSlider = document.querySelectorAll(".single--testimonial");
  let initialX = null;
  let initialY = null;
  const startTouch = function (e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };

  const touchMove = function (e) {
    if (initialX === null) {
      return;
    }
    if (initialY === null) {
      return;
    }

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      return;
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
  };

  allSlider.forEach((slide) => {
    slide.addEventListener("touchstart", startTouch, false);

    slide.addEventListener("touchmove", touchMove, false);
  });
};

slider();

/* Reveal On scroll */

const allSection = document.querySelectorAll(".section--animate");
console.log(allSection);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hide");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hide");
});
