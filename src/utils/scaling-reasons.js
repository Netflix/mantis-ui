export function getScalingReasons(configs = []) {
  const scalingReasonsItem = configs.find(
    config => config.name === 'ScalingReason',
  );
  if (scalingReasonsItem && scalingReasonsItem.value) {
    try {
      return JSON.parse(scalingReasonsItem.value);
    } catch (e) {
      console.debug(
        'ClusterCreatePage: Unable to parse master config JSON for scaling reasons.',
      );
      return [];
    }
  }
  return [];
}

