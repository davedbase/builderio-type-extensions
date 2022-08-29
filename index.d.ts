// Type definitions for builder-type-extensions 2.10
// Project: https://github.com/davedbase/builderio-field-types#readme
// Definitions by: David Di Biase <https://github.com/davedbase>
// TypeScript Version: 3.0

/**
 * Builder Type Extensions is a set of helpful extension definitions for writing
 * powerful well structured TypeScript codebases. The current library contains
 * support for input field extraction.
 */

declare type BuilderFields<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: BuilderFields<O[K]> } : never
  : T;
declare type GenerateItems<T extends readonly any[]> = {
  [K in keyof T & `${bigint}` as T[K] extends { name: infer N extends string } 
    ? N 
    : never
  ]: 
    T[K] extends { subFields: infer S extends readonly any[] } 
      ? GenerateItems<S>[]
      : T[K] extends { type: infer Type extends string } 
        ? Type extends "string" | "reference" | "richText" | "color" | "email" | "longText" | "url"
          ? string 
          : Type extends "file"
            ? T[K] extends { allowedFileTypes: infer FT extends readonly string[] }
              ? FT[number]
              : never
            : Type extends "boolean"
              ? boolean
              : Type extends "date"
                ? Date
                : never
        : never
}
