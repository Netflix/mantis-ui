import style from './Login.module.css';
import { Button, Card, Form, Input } from 'antd';
import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';
import { useAuth } from '@/hooks/useAuth';
import { useSearch, useNavigate } from 'react-location';
import { Helmet } from 'react-helmet-async';
import { LocationGenerics } from '@/components/Router/Router';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect = '/' } = useSearch<LocationGenerics>();

  const onFinish = (user: { name: string; email: string }) => {
    login({ ...user, isAdmin: true }, () => navigate({ to: redirect, replace: true }));
  };

  const title = <img src={mantisImage} alt="Mantis Logo" className="h-20 w-24" />;

  return (
    <>
      <Helmet>
        <title>Mantis - Login</title>
      </Helmet>
      <div className="flex items-center justify-center h-full">
        <Card title={title} className={`${style.card} max-w-2xl`}>
          <Form name="login-form" labelCol={{ span: 3 }} autoComplete="off" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className={style.footer}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;
