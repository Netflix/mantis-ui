export function flattenEnvObject(envObject: { [env: string]: string[] }) {
  return Object.keys(envObject).flatMap((env) => {
    const regions = envObject[env];
    if (Array.isArray(regions)) {
      return regions.map((region) => ({ env, region }));
    }
    return [];
  });
}
