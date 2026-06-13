# Invoice PDF Flow

## Overview

The PDF export feature generates a PDF document from an invoice record, using the company profile as the document header.

---

## Flow

```
User clicks "Export PDF"
  → React Query mutation: POST /api/invoices/{id}/pdf
    → Route Handler validates session + company ownership
      → ExportInvoicePdfUseCase.execute({ company_id, invoice_id })
        → GetInvoiceDetailUseCase (fetches invoice + line items)
        → GetCurrentCompanyUseCase (fetches company profile including logo)
        → InvoicePdfService.generate(invoice, company) → Buffer
      → Route Handler returns Buffer as application/pdf response
    → Browser triggers file download
```

---

## PDF Template Sections

1. **Header**: Company logo, company name, address, contact number
2. **Invoice metadata**: Invoice number, issue date, due date, status
3. **Client info**: Client name, client address
4. **Line items table**: Description, quantity, unit price, total per line
5. **Totals**: Subtotal, tax (if applicable), total amount
6. **Footer**: Signatory name, signatory title, signature placeholder, notes

---

## Technical Decisions (TBD)

- PDF library choice: `@react-pdf/renderer` vs `puppeteer` vs `pdfkit`
  - Decision must be recorded in `specs/0003-invoice-management/decisions.md`
- Logo in PDF: Cloudinary URL (must be publicly accessible)

---

## Error Cases

- Invoice not found → 404
- Company mismatch → 403
- PDF generation failure → 500 with `INTERNAL_ERROR`
