export const validateId = (id: number, idType: string) => {
  if (!id || isNaN(id)) {
    throw new Error(`Invalid ${idType} ID`);
  }
};
