# Builder.io Type Extensions

This package is meant to be a set of helpful TypeScript definitions for writing powerful well structured TypeScript codebases in Builder.io's CMS. The current library contains support for input field extraction.

## Component Input Type Helper

This utility infers types based on Builder input field array [Builder.io's Component Input Types](https://www.builder.io/c/docs/custom-components-input-types). The `BuilderFields` and `GenerateItems` are used together to infer the input array into a properly structured list of properties for your component.

Here's some sample input:

```ts
const inputs = [
  {
    name: "name",
    type: "string",
    required: true,
  },
  {
    name: "favouriteColours",
    type: "list",
    subFields: [
      {
        name: "name",
        type: "string",
        defaultValue: "",
      },
      {
        name: "hex",
        type: "color",
      },
    ],
  },
] as const;

type InputProps = BuilderFields<GenerateItems<typeof inputs>>;
```

> **Note**
> The input must be cast as const or the inference will not work as expected.

The above fields would result into the following type:

```ts
type InputProps = {
  name: string;
  favouriteColours?: {
    name?: string;
    hex?: string;
  }[];
};
```

In your framework of choice you should be able to cast input properties with the resulting type:

```ts
function MyComponent(props: InputProps) => {
  console.log(props.name);
  console.log(props.favouriteColors);
};
```

### Change Log

`1.0.0` - Initial release
`1.0.1` - Fixed packaging module issues
`1.1.0` - Improved formatting, adding required fields, added string enums

### Acknowledgments

Thank you to a number of individuals such as trusktr (Joe Pea) and individuals in the SolidJS community. I'm not a TypeScript wizard in the slightest but I learned a _lot_ from pulling these types together.
