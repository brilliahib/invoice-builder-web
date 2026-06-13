# Error Contracts

## Error Philosophy

All application errors follow a consistent structure. Errors are classified by domain.

---

## Error Response Shape

```typescript
interface AppError {
  code: string;       // Machine-readable error code
  message: string;    // Human-readable message
  status: number;     // HTTP status code
  details?: unknown;  // Optional extra context
}
```

---

## Error Code Registry

### Auth Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `USER_NOT_VERIFIED` | 403 | Email not verified |
| `SESSION_EXPIRED` | 401 | JWT expired |
| `UNAUTHENTICATED` | 401 | No session found |

### Authorization Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `FORBIDDEN` | 403 | Resource does not belong to user's company |
| `COMPANY_MISMATCH` | 403 | Invoice/resource company_id does not match user |

### Company Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `COMPANY_NOT_FOUND` | 404 | No company linked to user |
| `COMPANY_ALREADY_EXISTS` | 409 | User already has a company |

### Invoice Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVOICE_NOT_FOUND` | 404 | Invoice does not exist or not accessible |
| `DUPLICATE_INVOICE_NUMBER` | 409 | Invoice number already used in this company |
| `INVOICE_LOCKED` | 422 | Published invoice cannot be edited |

### Account Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `ACCOUNT_NOT_FOUND` | 404 | User account not found |
| `WRONG_PASSWORD` | 400 | Current password is incorrect |

### General Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input failed schema validation |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
| `NOT_FOUND` | 404 | Generic resource not found |

---

## Error Handling Rules

1. Never expose raw database errors to the client.
2. All errors must use the `AppError` shape.
3. `INTERNAL_ERROR` must log the original error server-side.
4. Use cases must throw typed errors; route handlers must convert them to HTTP responses.
