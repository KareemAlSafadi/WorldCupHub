import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, { duration = 1200, enabled = true } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));

    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isNaN(numericTarget) ? target : Math.round(eased * numericTarget);
      setValue(current);
      if (progress < 1 && !isNaN(numericTarget)) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return value;
}
