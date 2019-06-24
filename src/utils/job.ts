import { Label } from '@/types/machine';

export interface LabelTag {
  labelType: string;
  name: string;
  labelName: string;
}

export function getJobTagDefinitions(labels: Label[]) {
  const specialTags = [] as LabelTag[];
  const isSourceJob = labels.some((label) => {
    return label.name === '_mantis.jobType' && label.value === 'source';
  });
  if (isSourceJob) {
    specialTags.push({
      labelType: 'default',
      name: 'Source Job',
      labelName: '_mantis.jobType',
    });
  }
  const isCriticalityMedium = labels.some((label) => {
    return label.name === '_mantis.criticality' && label.value === 'medium';
  });
  if (isCriticalityMedium) {
    specialTags.push({
      labelType: 'warning',
      name: 'Crit: Medium',
      labelName: '_mantis.criticality',
    });
  }

  const isCriticalityHigh = labels.some((label) => {
    return label.name === '_mantis.criticality' && label.value === 'high';
  });
  if (isCriticalityHigh) {
    specialTags.push({
      labelType: 'danger',
      name: 'Crit: High',
      labelName: '_mantis.criticality',
    });
  }
  return specialTags;
}

export function getJobClusterId(jobId: string) {
  if (typeof jobId === 'undefined') {
    return jobId;
  }
  return jobId.substring(0, jobId.lastIndexOf('-'));
}
