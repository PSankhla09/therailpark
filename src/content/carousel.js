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
  const [initialAnimation, setInitialAnimation] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (initialAnimation) {
      const timeout = setTimeout(() => {
        setInitialAnimation(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [initialAnimation]);

  useEffect(() => {
    if (transitioning) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [transitioning]);

  useEffect(() => {
    console.log("Transitioning State:", transitioning);
    console.log("Previous Index:", previousIndex);
    console.log("Current Index:", currentIndex);
  }, [transitioning, previousIndex, currentIndex]);

  const nextSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setPreviousIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setPreviousIndex(currentIndex);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
      );
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 30;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      const swipeDistance = touchStartX - touchEndX;
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    if (carousel) {
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
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

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
              !transitioning && !initialAnimation ? "active" : ""
            } ${initialAnimation ? "initial-animation" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
