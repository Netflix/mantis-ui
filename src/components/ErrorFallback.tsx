import { Alert, Button } from '@mantine/core';
import { FaTimesCircle } from 'react-icons/fa';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col h-full gap-4 mx-auto mt-8">
      <Alert icon={<FaTimesCircle size={16} />} title="Something went wrong" color="red">
        {error.message}
      </Alert>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default ErrorFallback;
