---
applyTo: '**'
---
# General Instructions

## Code Organization Rules & Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

- One component per file
- Export components as named exports
- Group imports: React → third-party → local (separated by blank lines)
- Use absolute imports with path aliases (@components, @utils, etc.)
- Maximum file length: 300 lines (refactor if exceeded)

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information