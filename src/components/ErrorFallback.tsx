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
    <div className="mx-auto mt-8 flex h-full flex-col gap-4">
      <Alert icon={<FaTimesCircle size={16} />} title="Something went wrong" color="red">
        {error.message}
      </Alert>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default ErrorFallback;
