# Vercel Deployment + Cloudinary Photo Upload

## Problem

The Tijara App uses Next.js 14 (App Router) with local filesystem storage for KTP and selfie photo uploads (`data/submissions/`). When deployed to Vercel's serverless platform, files written to disk are **ephemeral** — they disappear after the function cold starts or scales. This breaks both the upload flow and the admin photo viewing flow.

## Solution: Cloudinary for Image Storage

### Cloudinary Setup

- Add `cloudinary` npm package for server-side uploads
- Create `src/lib/cloudinary.ts` with SDK configuration using env vars
- Add env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Upload Flow Changes (`POST /api/submission/route.ts`)

- Accept FormData (unchanged)
- Save submission metadata JSON to `data/submissions/` (unchanged)
- Upload KTP and selfie files to **Cloudinary** instead of `fs.writeFile`
- Store Cloudinary URLs in JSON metadata:
  ```json
  {
    "id": "uuid",
    "...": "...",
    "ktpUrl": "https://res.cloudinary.com/.../ktp.jpg",
    "selfieUrl": "https://res.cloudinary.com/.../selfie.jpg"
  }
  ```
- Remove all `fs.writeFile` calls for image files

### File Serving Changes

- **Remove** `src/app/api/admin/files/[...path]/route.ts` (no longer needed)
- **Admin detail page** (`src/app/admin/[id]/page.tsx`): read Cloudinary URLs from JSON metadata and render `<img>` directly

### Image Optimization

- Add `remotePatterns` for Cloudinary in `next.config.js`:
  ```js
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  }
  ```

### Vercel Deployment

- Build command: `next build` (default)
- Environment variables to set in Vercel Dashboard:
  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_WA_NUMBER`
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Data JSON Persistence (Known Limitation)

Submission metadata (`data/submissions/*.json`) remains on the local filesystem. This is **acceptable for MVP** — data persists within a single deployment but is lost on redeploy. Future work should migrate to a database (Supabase/Neon).

### Files to Change

| File | Action |
|---|---|
| `package.json` | Add `cloudinary` dependency |
| `src/lib/cloudinary.ts` | **Create** — Cloudinary SDK config |
| `src/app/api/submission/route.ts` | Upload to Cloudinary, save URLs to JSON |
| `src/app/api/admin/files/[...path]/route.ts` | **Delete** — no longer needed |
| `src/app/admin/[id]/page.tsx` | Use Cloudinary URLs from JSON |
| `next.config.js` | Add Cloudinary remote patterns |
| `.env.local` | Add Cloudinary env vars (documentation) |
| `src/lib/types.ts` | Add optional `ktpUrl`/`selfieUrl` fields |

### Files Unchanged

- `src/components/submission/KYCForm.tsx` — client-side upload UI stays the same
- All other API routes, components, and pages
