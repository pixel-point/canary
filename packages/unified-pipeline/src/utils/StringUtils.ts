export const getIdFromName = (name: string): string => {
  return name.replace(/ /g, "_");
};

export const isValidPositiveInteger = (value: any): boolean => {
  // Check if the value is a number or a string that represents a number
  if (typeof value === "number" || typeof value === "string") {
    // Convert to number and check if it's a finite number
    const numberValue = Number(value);
    return Number.isInteger(numberValue) && numberValue > 0;
  }
  return false;
};
