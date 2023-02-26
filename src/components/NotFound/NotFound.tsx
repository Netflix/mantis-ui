import { Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-location';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Title order={3}>404</Title>
      <Text>Page not found!</Text>
      <Button className="my-4" onClick={() => navigate({ to: '/', replace: true })}>
        Back Home
      </Button>
    </div>
  );
}

export default NotFound;
