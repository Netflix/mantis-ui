import { Alert, Button } from 'antd';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col h-full gap-4 mx-auto mt-8">
      <Alert message="Something went wrong:" description={error.message} type="error" showIcon />
      <Button type="primary" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

export default ErrorFallback;
