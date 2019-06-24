import { parseParameters } from '@/utils/parameters';

export function transformFormToClusterPayload(jobDefinition, owner, availableParameters, defaultParameters, shouldOverrideJobParameters, shouldOverrideSystemParameters) {
  const jobCluster = {
    jobDefinition: jobDefinition,
    owner: owner,
  };
  const clusterId = jobCluster.jobDefinition.name;
  jobCluster.jobDefinition.name = clusterId;
  jobCluster.jobDefinition.slaMin = jobCluster.jobDefinition.sla.min;
  jobCluster.jobDefinition.slaMax = jobCluster.jobDefinition.sla.max;
  jobCluster.jobDefinition.jobJarFileLocation = `http://${
    jobCluster.jobDefinition.jobJarFileLocation
  }`;

  jobCluster.jobDefinition.parameters = parseParameters(
    availableParameters,
    defaultParameters,
    shouldOverrideJobParameters,
    shouldOverrideSystemParameters,
  );

  return jobCluster;
};
