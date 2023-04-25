import { Alert, Button } from '@mantine/core';
import { MdCancel } from 'react-icons/md';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="mx-auto mt-8 flex h-full flex-col gap-4">
      <Alert icon={<MdCancel size={16} />} title="Something went wrong" color="red">
        {error.message}
      </Alert>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default ErrorFallback;
