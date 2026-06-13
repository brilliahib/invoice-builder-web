# DTO Contracts

## Purpose

DTOs (Data Transfer Objects) define the shape of data flowing between layers (API → Use Case, Use Case → Repository, etc.).

---

## Auth DTOs

```typescript
// LoginDto
interface LoginDto {
  email: string;
  password: string;
}

// RegisterDto
interface RegisterDto {
  email: string;
  password: string;
}
```

---

## Company DTOs

```typescript
// CompanyDto (read)
interface CompanyDto {
  id: string;
  name: string;
  address: string;
  contact_number: string | null;
  logo_url: string | null;
  signatory_name: string | null;
  signatory_title: string | null;
  created_at: string;
  updated_at: string;
}

// CompanyUpdateDto (write)
interface CompanyUpdateDto {
  name?: string;
  address?: string;
  contact_number?: string;
  logo_url?: string;
  signatory_name?: string;
  signatory_title?: string;
}
```

---

## Invoice DTOs

```typescript
// InvoiceListItemDto
interface InvoiceListItemDto {
  id: string;
  invoice_number: string;
  client_name: string;
  status: 'DRAFT' | 'PUBLISHED';
  total_amount: number;
  due_date: string;
  created_at: string;
}

// InvoiceDetailDto
interface InvoiceDetailDto extends InvoiceListItemDto {
  client_address: string | null;
  notes: string | null;
  line_items: LineItemDto[];
  company: CompanyDto;
}

// LineItemDto
interface LineItemDto {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

// InvoiceCreateDto
interface InvoiceCreateDto {
  invoice_number?: string;
  status: 'DRAFT' | 'PUBLISHED';
  due_date: string;
  client_name: string;
  client_address?: string;
  notes?: string;
  line_items: LineItemCreateDto[];
}

// LineItemCreateDto
interface LineItemCreateDto {
  description: string;
  quantity: number;
  unit_price: number;
}
```

---

## Account DTOs

```typescript
// AccountDto
interface AccountDto {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  company_id: string | null;
}

// AccountUpdateDto
interface AccountUpdateDto {
  display_name?: string;
  avatar_url?: string;
}
```

---

## Dashboard DTOs

```typescript
// InvoiceSummaryDto
interface InvoiceSummaryDto {
  total: number;
  draft: number;
  published: number;
  this_month_total: number;
}
```
