export type etag = string;
export type date = string;
export type datetime = string;
export type integer = number;

export type OverrideProperties<T, PR> = {
  [key in keyof T]: PR;
};

export type RequiredProperties<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
