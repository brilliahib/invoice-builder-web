# Error Handling Architecture

## Philosophy

1. Never expose internal errors to the client.
2. All errors bubble up through layers using typed error classes.
3. Route Handlers are the only place that converts errors to HTTP responses.
4. Log all unexpected errors server-side.

---

## Error Propagation Flow

```
Use Case throws AppError
  → Route Handler catches it
    → converts to HTTP response using error-contracts
      → Client receives structured error JSON
```

---

## Error Class Hierarchy

```
AppError (base)
├── AuthError
├── ForbiddenError
├── NotFoundError
├── ConflictError
├── ValidationError
└── InternalError
```

---

## Route Handler Error Handler Pattern

```typescript
// Pattern — implement in src/server/shared/errors/
try {
  const result = await useCase.execute(input);
  return NextResponse.json(result, { status: 200 });
} catch (error) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { code: error.code, message: error.message },
      { status: error.status }
    );
  }
  // Log unexpected errors
  console.error('[INTERNAL_ERROR]', error);
  return NextResponse.json(
    { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
    { status: 500 }
  );
}
```

---

## Client-Side Error Handling (React Query)

- Use `onError` callback in `useMutation` for toast notifications
- Display field-level validation errors from `400 VALIDATION_ERROR` responses
- Show generic error state UI for `500` responses
