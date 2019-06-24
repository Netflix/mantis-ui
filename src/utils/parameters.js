export function isSystemParameter(parameter) {
  return parameter.key.toLowerCase().indexOf('mantis') === 0;
}

export function parseParameters(
  availableParameters,
  defaultParameters,
  shouldOverrideJobParameters,
  shouldOverrideSystemParameters,
) {
  const jobParams = availableParameters.filter(
    parameter => !isSystemParameter(parameter),
  );
  const systemParameters = availableParameters.filter(
    parameter => isSystemParameter(parameter),
  );
  const defaultJobParams = defaultParameters.filter(
    parameter => !isSystemParameter(parameter),
  );
  const defaultSystemParams = defaultParameters.filter(
    parameter => isSystemParameter(parameter),
  );
  const filterOverridenProps = parameters =>
    parameters.filter(parameter => {
      return parameter.override;
    });
  const parametersMapper = (parameters, valueProp) =>
    parameters.map(parameter => ({
      name: parameter.key,
      value: parameter[valueProp],
    }));

  let params = [];
  const OVERRIDE_PROP = 'override';
  const VALUE_PROP = 'value';

  if (shouldOverrideJobParameters) {
    params = [...params, ...parametersMapper(
      filterOverridenProps(jobParams),
      OVERRIDE_PROP,
    )];
  } else if (defaultJobParams.length) {
    params = [...params, ...parametersMapper(defaultJobParams, VALUE_PROP)];
  }

  if (shouldOverrideSystemParameters) {
    params = [...params, ...parametersMapper(
      filterOverridenProps(systemParameters),
      OVERRIDE_PROP,
    )];
  } else if (defaultSystemParams.length) {
    params = [...params, ...parametersMapper(defaultSystemParams), VALUE_PROP];
  }

  return params;
}
