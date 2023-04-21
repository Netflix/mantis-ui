import { showNotification } from '@mantine/notifications';
import { MdClose, MdDone, MdInfoOutline } from 'react-icons/md';

const autoClose = 5000;

export function showInfoNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <MdInfoOutline />,
    color: 'gray',
  });
}

export function showSuccessNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <MdDone />,
    color: 'green',
  });
}

export function showErrorNotification(message: string, title?: string) {
  showNotification({
    title,
    message,
    autoClose,
    icon: <MdClose />,
    color: 'red',
  });
}
