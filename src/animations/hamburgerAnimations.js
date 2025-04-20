import { useEffect } from "react";

export const animateMenuOpen = () => {
  const menu = document.querySelector(".menu-overlay");
  const body = document.body;
  if (menu) {
    menu.style.display = "flex";

    setTimeout(() => {
      menu.classList.add("open");
      body.classList.add("noscroll2");
    }, 10);
  }
};

export const animateMenuClose = () => {
  const menu = document.querySelector(".menu-overlay");
  const body = document.body;
  if (menu) {
    menu.classList.remove("open");

    setTimeout(() => {
      menu.style.display = "none";
      body.classList.remove("noscroll2");
    }, 50);
  }
};

// export const useHamburgerAnimations = (isOpen) => {
//   useEffect(() => {
//     if (isOpen) {
//       animateMenuOpen();
//     } else {
//       animateMenuClose();
//     }
//   }, [isOpen]);
// };
