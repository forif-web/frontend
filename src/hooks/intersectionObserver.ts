import { useEffect, useState } from "react";

function handleObserver(id: string) {
  const [visiblePct, setVisiblePct] = useState<number>(0);
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const visiblePct = entry.intersectionRatio;
      setVisiblePct(visiblePct);
    });
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector(`${id}`);
    if (target) {
      observer.observe(target);
    } else {
      console.log("Target not existed");
    }
  }, [callback]);
  return visiblePct;
}

export default handleObserver;
