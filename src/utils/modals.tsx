import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { RiErrorWarningFill } from 'react-icons/ri';

import type { CompactJob } from '@/types/job';

export function enableModal(clusterName: string, setEnabled: (enabled: boolean) => void) {
  modals.openConfirmModal({
    title: <>{<RiErrorWarningFill color="Orange" />} Enable Cluster </>,
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
    title: <>{<RiErrorWarningFill color="Orange" />} Disable Cluster </>,
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
    title: <>{<RiErrorWarningFill color="red" />} Kill Job </>,
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
