import { Button, Card, Image, TextInput } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { TbAt } from 'react-icons/tb';
import { useNavigate, useSearchParams } from 'react-router-dom';

import mantisImage from '@/assets/images/mantis-logo-full-transparent.png';
import { useAuth } from '@/hooks/useAuth';

type UserData = {
  email: string;
  name: string;
};

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<UserData>({ mode: 'onBlur' });

  const onLogin = async () => {
    const isValid = await trigger(undefined, { shouldFocus: true });
    const user = getValues();
    if (isValid) {
      login({ ...user, isAdmin: true }, navigate(redirect));
    }
  };

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <>
      <Helmet>
        <title>Mantis - Login</title>
      </Helmet>
      <div className="flex h-full items-center justify-center">
        <Card shadow="sm" radius="md" withBorder className="w-1/2">
          <Card.Section inheritPadding py="xs" className="flex justify-center">
            <Image src={mantisImage} alt="Mantis Logo" width={100} fit="contain" />
          </Card.Section>

          <Card.Section inheritPadding py="xs">
            <form className="flex flex-col gap-2">
              <TextInput
                label="Name"
                placeholder="Enter your name"
                withAsterisk
                {...register('name', { required: 'Name required' })}
                error={errors.name?.message}
              />

              <TextInput
                label="Email"
                placeholder="Enter your email"
                icon={<TbAt size={14} />}
                withAsterisk
                {...register('email', {
                  required: 'Email required',
                  pattern: {
                    value: emailPattern,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message}
              />
              <Button mt="md" onClick={onLogin}>
                Login
              </Button>
            </form>
          </Card.Section>
        </Card>
      </div>
    </>
  );
}

export default Login;
