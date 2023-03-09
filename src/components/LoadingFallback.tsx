import { Loader } from '@mantine/core';

import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';

function LoadingFallback() {
  return (
    <div className="flex flex-col h-full gap-4 justify-center items-center animate-fade-in">
      <img src={mantisImage} className="h-74 w-80" alt="Mantis Logo" />
      <Loader variant="bars" />
    </div>
  );
}

export default LoadingFallback;
