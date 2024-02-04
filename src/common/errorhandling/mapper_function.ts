export const mapDbFieldNameToSnakeCase = (dbFieldName) => {
  // Split the input string at capital letters and join them with underscores
  const snakeCaseFieldName = dbFieldName
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase();

  // If the field name starts with an underscore, remove it
  if (snakeCaseFieldName.startsWith('_')) {
    return snakeCaseFieldName.substring(1);
  }

  return snakeCaseFieldName;
};

// Example usage:
