import { Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/jobs', { replace: true });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Title order={3}>Well this is sad..</Title>
      <Text>
        Sorry about that. Please try again later, or contact support to help troubleshoot. Error
        code for reference: 404
      </Text>
      <Button className="my-4" onClick={handleButtonClick}>
        Go Back
      </Button>
      <Button className="my-4" onClick={handleButtonClick}>
        Go Home
      </Button>
    </div>
  );
}

export default NotFound;
