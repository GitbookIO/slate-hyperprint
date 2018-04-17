# Release notes
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

# Unreleased

# 2.2.3 - 17/04/2018

- Escape newlines for text in tags

# 2.2.2 - 07/04/2018

- Robust string escaping and value printing

# 2.2.1 - 26/03/2018

- Support slate 0.33.x (renamed `kind` to `object`)

# 2.2.0 - 13/02/2018

- Add `strict` option to preserve empty texts and other things that the
  formatting would otherwise omit

# 2.1.3 - 13/02/2018

- Use older version of prettier, that still works in the browser

# 2.1.2 - 09/02/2018

- Sort tag attributes, for deterministic output

# 2.1.1 - 08/02/2018

- Add `hyperprint.log` util

# 2.1.0 - 08/02/2018

- Add option 'preserveKeys'

# 2.0.1 - 07/02/2018

- Increase CLI retro-compatibility

# 2.0.0 - 03/01/2018

- Add CLI tool
- Replace `indent` option with a `prettier` config option.
  Prettier is now used to format output.
- Improve rendering of void nodes

# 1.1.1

- Fix rendering of nodes containing whitespaces only

# 1.1.0

- Added support for empty nodes to be rendered as `<something />`

# 1.0.0

- Initial release
