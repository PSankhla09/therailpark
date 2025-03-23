import { useEffect } from "react";

export const animateMenuOpen = () => {
  const menu = document.querySelector(".menu-overlay");
  if (menu) {
    menu.style.display = "flex";

    setTimeout(() => {
      menu.classList.add("open");
    }, 10);
  }
};

export const animateMenuClose = () => {
  const menu = document.querySelector(".menu-overlay");
  if (menu) {
    menu.classList.remove("open");

    setTimeout(() => {
      menu.style.display = "none";
    }, 500);
  }
};

export const useHamburgerAnimations = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      animateMenuOpen();
    } else {
      animateMenuClose();
    }
  }, [isOpen]);
};
