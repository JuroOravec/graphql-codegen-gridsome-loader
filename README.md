# GraphQL Codegen Gridsome Loader

[NPM](https://www.npmjs.com/package/graphql-codegen-gridsome-loader)

Custom loader for `.vue` files with Gridsome custom blocks (`<static-query>`, `<page-query>`).

Works with glob patterns.

## Installation

```
npm run -D graphql-codegen-gridsome-loader
```

## Usage

1. Add the custom loader for `.vue` files

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

2. Define the page or static queries in you `.vue` files:

   > **Important:** Each query MUST have a unique name (e.g. the query below is named `getAppMetadata`).

    ```html
    <template>
      ...
    </template>

    <static-query>
    query getAppMetadata {
      metadata {
        siteName
        siteDescription
      }
    }
    </static-query>

    <script>
      ...
    </script>
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
