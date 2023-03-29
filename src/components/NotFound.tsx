import { Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/jobs', { replace: true });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title order={3}>What are you doing here !</Title>
      <Text>Well this is sad the page that you were looking for is not here</Text>
      <Button className="my-4" onClick={handleButtonClick}>
        Get Yourself Home
      </Button>
    </div>
  );
}

export default NotFound;
