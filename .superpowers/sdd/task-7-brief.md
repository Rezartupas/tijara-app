### Task 7: Success Page & Final Polish

**Files:**
- Create: `src/app/pengajuan/success/page.tsx`
- Modify: `src/app/layout.tsx` (add missing `@/lib/constants` import adjustments if needed)

**Interfaces:**
- Consumes: nothing
- Produces: Success confirmation page with submission ID display and CTA to start over

- [ ] **Step 1: Write success page**

Create `src/app/pengajuan/success/page.tsx`:

```typescript
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="rounded-full bg-green-100 p-4 inline-block">
        <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-gray-900">Pengajuan Terkirim!</h1>
      <p className="mt-2 text-gray-600">
        Pengajuan pembiayaan Anda sedang diproses. Tim Tijara akan menghubungi Anda melalui
        kontak yang didaftarkan.
      </p>
      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-left text-sm text-yellow-800">
        <p className="font-medium">Peringatan Syariah</p>
        <p className="mt-1">
          Harga jual dan angsuran bersifat tetap. Tidak ada bunga berbunga (riba).
          Keterlambatan pembayaran akan dikenakan ta&apos;zir (denda sosial) yang disalurkan
          sebagai dana kebajikan.
        </p>
      </div>
      <Link
        href="/"
        className="mt-6 inline-block w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
      >
        Ajukan Lagi
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Run full build to verify no errors**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Run tests**

```bash
npm test
```
Expected: All calculator and scraper tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add success page and finalize Tijara MVP flow"
```

---
