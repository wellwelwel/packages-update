const operatorRegex = /^(\^|(>|<)(=)?|=|~)/;

export const getOperator = (version: string): string =>
  operatorRegex.exec(version)?.[0] || '';

export const removeOperator = (version: string): string =>
  version.replace(operatorRegex, '') || '';
