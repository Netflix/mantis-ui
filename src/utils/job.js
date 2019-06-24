export function getJobClusterIdFromJobId(jobId) {
  if (typeof jobId === 'undefined') {
    return jobId;
  }
  return jobId.substring(0, jobId.lastIndexOf('-'));
}

