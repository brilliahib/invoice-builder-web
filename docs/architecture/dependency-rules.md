# Dependency Rules

## Layer Dependency Rules

These rules are **enforced by convention** and must be respected by all contributors and AI agents.

---

## Allowed Dependencies

| From | Can depend on |
|------|--------------|
| `src/app` (pages/routes) | `src/features`, `src/components`, `src/lib` |
| `src/features` | `src/server/application` (use cases), `src/components`, `src/lib`, `src/types` |
| `src/components` | `src/lib`, `src/types` |
| `src/server/application` | `src/server/domain`, `src/server/shared` |
| `src/server/domain` | `src/server/shared` only |
| `src/server/infrastructure` | `src/server/domain`, `src/server/shared`, `prisma`, `supabase`, `cloudinary` |

---

## Forbidden Dependencies

| From | Must NOT depend on |
|------|-------------------|
| `src/server/domain` | `src/server/application`, `src/server/infrastructure`, any framework |
| `src/server/application` | `src/server/infrastructure` directly |
| `src/components` | `src/server/*` directly |
| `src/app` pages | `prisma` or `src/server/infrastructure` directly |

---

## Principle

> The domain layer is the innermost circle — it must never know about the outside world.

- Domain entities and repository interfaces are defined in `domain/`.
- Infrastructure implements domain repository interfaces, not the other way around.
- Use Cases orchestrate domain logic; they don't know about HTTP, databases, or UI.
