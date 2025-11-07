import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollHandler() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    //ALWAYS START AT TOP
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
    //RESTORE EXACT SCROLL POSITION
    else {
      const savedPosition = sessionStorage.getItem(`scroll-${key}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    }
  }, [pathname, key, navigationType]);

  // SAVE SCROLL POSITION BEFORE LEAVING PAGE
  useEffect(() => {
    const savePosition = () => {
      sessionStorage.setItem(`scroll-${key}`, window.scrollY.toString());
    };

    window.addEventListener("scroll", savePosition);
    return () => window.removeEventListener("scroll", savePosition);
  }, [key]);

  return null;
}
