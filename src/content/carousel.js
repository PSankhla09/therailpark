import { useState, useEffect, useRef } from "react";
import "./carousel.css";
import slide1 from "./0f55920f-6808-48d2-a89a-b99a5ca72ca0_the-cut.avif";
import slide2 from "./b75ee5d3-664e-44d8-975a-b739140bf61d_landing-page-header-phase-1.avif";

const slides = [
  { text: "Turning historic tracks into an unparalleled park.", image: slide1 },
  {
    text: "A place where nature, history, and community connect.",
    image: slide2,
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true); // Added for initial animation
  const carouselRef = useRef(null);

  // Handle the initial image animation
  useEffect(() => {
    if (initialAnimation) {
      const timeout = setTimeout(() => {
        setInitialAnimation(false); // End the initial animation
      }, 800); // Match CSS animation duration (0.8s)
      return () => clearTimeout(timeout);
    }
  }, [initialAnimation]);

  // Reset transitioning after animation
  useEffect(() => {
    if (transitioning) {
      const timeout = setTimeout(() => {
        setTransitioning(false); // End transition after animation
      }, 800); // Match CSS animation duration (0.8s)

      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [transitioning]);

  useEffect(() => {
    console.log("Transitioning State:", transitioning);
    console.log("Previous Index:", previousIndex);
    console.log("Current Index:", currentIndex);
  }, [transitioning, previousIndex, currentIndex]);

  const nextSlide = () => {
    if (!transitioning) {
      setTransitioning(true); // Start transition
      setPreviousIndex(currentIndex); // Current becomes previous
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Move to next
    }
  };

  const prevSlide = () => {
    if (!transitioning) {
      setTransitioning(true); // Start transition
      setPreviousIndex(currentIndex); // Current becomes previous
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
      ); // Move to previous
    }
  };

  // Swipe detection
  useEffect(() => {
    const carousel = carouselRef.current;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 30; // Minimum distance to register a swipe

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX; // Record the starting touch position
      console.log("Touch Start X:", touchStartX);
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX; // Update the current touch position
      console.log("Touch Move X:", touchEndX);
      e.preventDefault(); // Prevent browser default actions like scrolling
    };

    const handleTouchEnd = (e) => {
      const swipeDistance = touchStartX - touchEndX; // Calculate the swipe distance
      console.log("Touch End X:", touchEndX);
      console.log("Swipe Distance:", swipeDistance);

      // Trigger actions based on swipe distance
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          console.log("Swiped Left → Next Slide");
          nextSlide();
        } else {
          console.log("Swiped Right → Previous Slide");
          prevSlide();
        }
      } else {
        console.log("Swipe too short, no action taken.");
      }
    };

    if (carousel) {
      console.log("Adding touch event listeners...");
      carousel.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      carousel.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      carousel.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      if (carousel) {
        console.log("Removing touch event listeners...");
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []); // Ensure listeners are added only once
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      console.log("Carousel Width:", carousel.offsetWidth);
      console.log("Carousel Height:", carousel.offsetHeight);
    }
  }, []);

  return (
    <div className="c">
      <div className="title">
        <h1 className="title">The Rail Park</h1>
      </div>
      <br />
      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-content">
          <p
            className={`slide-text ${!transitioning ? "fade-transition" : ""}`}
          >
            {slides[currentIndex].text}
          </p>
          <button className="prev-btn" onClick={prevSlide}>
            &#8592;
          </button>
          <button className="next-btn" onClick={nextSlide}>
            &#8594;
          </button>
        </div>
        <div className="carousel-image-container">
          {transitioning && (
            <img
              key={previousIndex}
              src={slides[previousIndex]?.image}
              alt="outgoing slide"
              className="carousel-image outgoing"
            />
          )}
          <img
            key={currentIndex}
            src={slides[currentIndex]?.image}
            alt="incoming slide"
            className={`carousel-image incoming ${
              !transitioning && !initialAnimation ? "active" : "" // Ensure active only after initial animation
            } ${initialAnimation ? "initial-animation" : ""}`} // Add initial animation class
          />
        </div>
      </div>
    </div>
  );
}
