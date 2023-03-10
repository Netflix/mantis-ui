import { showNotification } from '@mantine/notifications';
import { AiOutlineInfo } from 'react-icons/ai';
import { TbCheck, TbX } from 'react-icons/tb';

const autoClose = 5000;

export function showInfoNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <AiOutlineInfo />,
    color: 'gray',
  });
}

export function showSuccessNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <TbCheck />,
    color: 'green',
  });
}

export function showErrorNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <TbX />,
    color: 'red',
  });
}
