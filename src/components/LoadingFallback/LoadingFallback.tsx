import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';
import { Spin } from 'antd';

function LoadingFallback() {
  return (
    <div className="flex flex-col h-full gap-4 justify-center items-center animate-fade-in">
      <img src={mantisImage} className="h-74 w-80" alt="Mantis Logo" />
      <Spin />
    </div>
  );
}

export default LoadingFallback;
