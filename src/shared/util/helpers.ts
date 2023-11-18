export const generateDaysOfWeek = () => {
  return {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  };
};

export const reverseObjectAndKeys = (ojb: object) => {
  return Object.fromEntries(
    Object.entries(ojb).map(([key, value]) => [value, key])
  );
};
