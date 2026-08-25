# codemirror-lang-ada

[Ada](https://www.adaic.org/) language support for [CodeMirror 6](https://codemirror.net/).

This is a community package that provides syntax highlighting, basic indentation, and folding for the Ada programming language.

## Features

- Syntax highlighting for Ada 95/2005/2012 keywords, identifiers, numbers, strings, characters, attributes, operators, and comments.
- Case-insensitive keyword recognition.
- Line comment support (`--`).
- Basic indentation and folding.

## Install

```bash
npm install codemirror-lang-ada
```

## Usage

```javascript
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { ada } from "codemirror-lang-ada"

const state = EditorState.create({
  doc: `procedure Hello is
begin
   Put_Line ("Hello, Ada!");
end Hello;`,
  extensions: [basicSetup, ada()]
})

const view = new EditorView({
  state,
  parent: document.body
})
```

## Development

```bash
# Install dependencies
npm install

# Build the parser and bundle
npm run build

# Run tests
npm test
```

The parser is generated from `src/ada.grammar` using the [`@lezer/generator`](https://lezer.codemirror.net/) toolchain.

## Contributing

Contributions are welcome! If you find a bug or want to improve Ada support, please open an issue or pull request on the [GitHub repository](https://github.com/yourusername/codemirror-lang-ada).

## License

[MIT](./LICENSE)
