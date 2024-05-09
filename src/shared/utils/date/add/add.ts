export enum AddDateType {
  hour = 60 * 60 * 1000,
  day = 24 * 60 * 60 * 1000,
}

export const add = (date: Date, value: number, type: AddDateType = AddDateType.hour) => {
  const hoursToAdd = value * type;
  date.setTime(date.getTime() + hoursToAdd);

  return date;
};
