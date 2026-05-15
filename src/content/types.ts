export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type ContentManifest = {
  version: string;
  defaultLocale: string;
  locales: string[];
  files: Record<string, string>;
};

