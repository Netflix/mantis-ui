import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { MdError } from 'react-icons/md';

import type { CompactJob } from '@/types/job';

export function enableModal(clusterName: string, setEnabled: (enabled: boolean) => void) {
  modals.openConfirmModal({
    title: <>{<MdError color="Orange" size={18} />} Enable Cluster </>,
    centered: true,
    children: (
      <Text size="sm">
        This will enable cluster <strong>{clusterName}</strong>. Continue?
      </Text>
    ),
    labels: { confirm: 'OK', cancel: 'Cancel' },
    confirmProps: { color: 'blue' },
    onConfirm: () => setEnabled(true),
  });
}

export function disableModal(clusterName: string, setEnabled: (enabled: boolean) => void) {
  modals.openConfirmModal({
    title: <>{<MdError color="Orange" size={18} />} Disable Cluster </>,
    centered: true,
    children: (
      <Text size="sm">
        This will disable cluster <strong>{clusterName}</strong>. Continue?
      </Text>
    ),
    labels: { confirm: 'OK', cancel: 'Cancel' },
    confirmProps: { color: 'blue' },
    onConfirm: () => setEnabled(false),
  });
}

export function killJobModal(jobToKill: CompactJob, clusterName: string, mock: () => void) {
  modals.openConfirmModal({
    title: <>{<MdError color="red" size={18} />} Kill Job </>,
    centered: true,
    children: (
      <Text size="sm">
        This will kill job <strong>{jobToKill.jobId}</strong> on cluster{' '}
        <strong>{clusterName}</strong>. Continue?
      </Text>
    ),
    labels: { confirm: 'OK', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => mock(),
  });
}
