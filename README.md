# testware-core

A lightweight API testing template built with Playwright and TypeScript.

The goal is to provide a reusable foundation for API tests while keeping test code clean and focused on business rules.

## Project Structure

```text
src/
├── config/
├── ContractValidator.ts
├── HttpClient.ts
├── PlaywrightHttpClient.ts
└── RequestOptions.ts

tests/
└── example.spec.ts
```

## Core Components

### HttpClient

Defines a simple HTTP abstraction (`GET`, `POST`, `PUT`, `DELETE`).

Depending on an interface instead of a concrete implementation makes it easy to replace the underlying HTTP client in the future.

### PlaywrightHttpClient

Implements `HttpClient` using Playwright's `APIRequestContext`.

It centralizes:

- HTTP requests
- Authorization token handling
- Headers and query parameters
- Response parsing
- Error handling

### ContractValidator

Uses AJV to validate API responses against JSON Schemas.

```ts
ContractValidator.validate(schema, response);
```

If the response doesn't match the schema, an exception is thrown with validation details.

## Benefits

- Reusable HTTP layer
- Less duplicated code
- Centralized authentication
- Simple contract validation
- Easy to extend for new projects
