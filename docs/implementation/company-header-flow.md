# Company Header Flow

## Overview

The company profile is the identity source for all invoices. This document describes how company data flows into invoice headers and PDF exports.

---

## Data Flow

```
User updates CompanyProfileForm
  → useUpdateCompany() mutation → PUT /api/companies/me
    → UpdateCompanyProfileUseCase saves to DB
      → React Query invalidates useCurrentCompany() query
        → All components using useCurrentCompany() re-render with fresh data
          → Next invoice created uses updated company data
          → Next PDF export uses updated company data
```

---

## Company Header Data Sources

| Invoice Field | Source |
|--------------|--------|
| Company name | `Company.name` |
| Company address | `Company.address` |
| Company logo | `Company.logo_url` (Cloudinary) |
| Contact number | `Company.contact_number` |
| Signatory name | `Company.signatory_name` |
| Signatory title | `Company.signatory_title` |

---

## Logo Upload Flow

```
User selects logo file
  → CloudinaryUploadService.uploadImage(file, 'company-logos')
    → Returns { url, public_id }
      → url is stored in Company.logo_url
        → Old logo: public_id should be deleted from Cloudinary (cleanup)
```

---

## Invoice Snapshot vs Live Data

**Decision required** (record in decisions.md):
- Option A: Invoice stores a snapshot of company data at creation time
- Option B: Invoice always references live company data

Current default assumption: **Option B (live reference)** until a decision is recorded.
