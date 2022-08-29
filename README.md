# BuilderIO Field Types

Builder Type Extensions is a set of helpful extension definitions for writing powerful well structured TypeScript codebases. The current library contains support for input field extraction.

## Component Input Type Helper

This package exports types that make inferring [Builder's Component Input Types](https://www.builder.io/c/docs/custom-components-input-types). The `BuilderFields` and `GenerateItems` are used together to infer the input array into a properly structured list of properties for your component.

Here's a sample input:

```ts
const inputs = [
  {
    name: "name",
    type: "string",
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

The above structured input fields would translate into the following type:

```ts
type InputProps = {
  name: string;
  favouriteColours: {
    name: string;
    hex: string;
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
