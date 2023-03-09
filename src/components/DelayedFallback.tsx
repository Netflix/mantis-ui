import { useEffect, useState } from 'react';

function DelayedFallback({ children, delay = 300 }: { children: React.ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{show && children}</>;
}

export default DelayedFallback;
