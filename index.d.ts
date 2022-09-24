// Type definitions for builderio-type-extensions
// Project: https://github.com/davedbase/builderio-field-types#readme
// Definitions by: David Di Biase <https://github.com/davedbase>
// TypeScript Version: 4.0

/**
 * Builder Type Extensions is a set of helpful extension definitions for writing
 * powerful well structured TypeScript codebases. The current library contains
 * support for input field extraction.
 */

declare type BuilderFields<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: BuilderFields<O[K]> }
    : never
  : T;

declare type GenerateItem<T> = T extends {
  subFields: infer S extends readonly any[];
}
  ? GenerateItems<S>[]
  : T extends { type: infer Type extends string }
  ? Type extends "string"
    ? T extends { enum: infer SE extends readonly string[] }
      ? SE[number]
      : string
    : Type extends
        | "file"
        | "date"
        | "richText"
        | "color"
        | "email"
        | "longText"
        | "url"
    ? string
    : Type extends "boolean"
    ? boolean
    : Type extends "number"
    ? number
    : Type extends "reference" | "object"
    ? object
    : never
  : never;

declare type GenerateItems<T extends readonly any[]> = {
  [K in keyof T & `${bigint}` as T[K] extends {
    name: infer N extends string;
    required?: false;
  }
    ? N
    : never]?: GenerateItem<T[K]>;
} & {
  [K in keyof T & `${bigint}` as T[K] extends {
    name: infer N extends string;
    required: true;
  }
    ? N
    : never]: GenerateItem<T[K]>;
};
