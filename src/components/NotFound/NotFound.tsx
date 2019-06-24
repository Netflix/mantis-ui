import { Button, Result } from 'antd';
import { useNavigate } from 'react-location';
import { AppRoutePaths } from '@/router/routes';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate({ to: AppRoutePaths.ROOT, replace: true })}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFound;
