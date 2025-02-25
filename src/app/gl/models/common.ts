export type etag = string;
export type date = string;
export type datetime = string;
export type integer = number;

export type OverrideProperties<T extends object, PR> = {
  [key in keyof T]: PR;
};
