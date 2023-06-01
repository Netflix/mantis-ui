import { Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title order={3}>404</Title>
      <Text>Page not found!</Text>
      <Button className="my-4" onClick={() => navigate(',', { replace: true })}>
        Back Home Testing some changes
      </Button>
    </div>
  );
}

export default NotFound;
