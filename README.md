# GraphQL Codegen Gridsome Loader

Custom loader for `.vue` files with Gridsome custom blocks (`<static-query>`, `<page-query>`).

Works with glob patterns.

## Installation

```
npm run -D graphql-codegen-gridsome-loader
```

## Usage

```yml
# codegen.yml
overwrite: true
schema: src/graphql.schema.json
documents:
  - src/**/*.vue:
      loader: graphql-codegen-gridsome-loader
generates:
  src/__generated__/graphql.ts:
    plugins:
      - typescript
      - typescript-operations

```

## Demo

1. Download this repo

2. Install dependencies at the root of this repo

```
npm install
```

3. Navigate to `example` directory

```
cd example
```

4. Run codegen

```
npm run gql:gen
```

This will generate a new file in `example/src/__generated__/graphql.ts`.
The generated file will contain queries extracted from `App.vue` and `Bar.vue`.
