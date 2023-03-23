import { Loader } from '@mantine/core';

import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';

function LoadingFallback() {
  return (
    <div className="flex h-full animate-fade-in flex-col items-center justify-center gap-4">
      <img src={mantisImage} className="h-74 w-80" alt="Mantis Logo" />
      <Loader variant="bars" />
    </div>
  );
}

export default LoadingFallback;
