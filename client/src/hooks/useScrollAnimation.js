import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    triggerOnce = false,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export function useStaggerAnimation(itemCount, options = {}) {
  const { baseDelay = 0, staggerDelay = 100 } = options;
  const [ref, isVisible] = useScrollAnimation(options);

  const getDelay = (index) => baseDelay + index * staggerDelay;

  return { ref, isVisible, getDelay };
}
