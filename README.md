The `tsc` compiler seems to report errors differently when using globals from different module systems (es or commonjs).

This example uses `__dirname` and `meta.import.dirname` but only the latter is reported when targeting commonjs via the `"type"` field in package.json. The `__dirname` silently passes when targeting es modules, but both produce runtime errors in node.

- `npm i`
- `npm run esm` (note no compile error but the output causes a runtime error)
- `npm run cjs` (note there _is_ a compile error)
