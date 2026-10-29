# 08 – Backend and Payments (Future Reference)

Do not implement anything in this document during Phase 1. It exists so the frontend is built with the right seams for later.

## 1. Frontend seams to keep in mind now
- Pricing comes from `src/config/plans.ts`. Later it will come from the database through a server function. Keep the `PLANS` shape stable.
- Dashboard data comes from `src/config/mock-dashboard.ts`. Later it will come from a server function. Keep the shape: `{ usedBytes, quotaBytes, trialEndsAt, recentFiles[] }`.
- Forms (signup, contact) should call a server action or route handler later. In Phase 1 they only validate and show success.

## 2. API surface (planned)

| Method | Route | Auth | Purpose |
|--------|-------|------|---------|
| POST | `/api/auth/signup` | public | Create account, send verification email |
| POST | `/api/auth/verify` | public | Verify email token |
| POST | `/api/auth/login` | public | Login |
| POST | `/api/auth/logout` | user | Logout |
| GET | `/api/me` | user | Profile, trial status, subscription |
| GET | `/api/folders?parentId=` | user | List folders |
| POST | `/api/folders` | user | Create folder |
| GET | `/api/files?folderId=` | user | List files |
| POST | `/api/files/upload-url` | user | Quota check, return presigned URL |
| POST | `/api/files/complete` | user | Confirm upload, update usage |
| GET | `/api/files/[id]/download-url` | user | Signed download URL |
| DELETE | `/api/files/[id]` | user | Soft delete, free quota after purge |
| GET | `/api/plans` | public | Active plans for pricing page |
| POST | `/api/billing/checkout` | user | Create Razorpay subscription, return checkout data |
| POST | `/api/billing/change-plan` | user | Upgrade or downgrade |
| POST | `/api/billing/cancel` | user | Cancel at period end |
| POST | `/api/webhooks/razorpay` | Razorpay signature | Payment and subscription events |

Response format for all JSON APIs:
```json
{ "ok": true, "data": {} }
```
or
```json
{ "ok": false, "error": { "code": "QUOTA_EXCEEDED", "message": "Storage limit reached." } }
```

## 3. Authentication rules (Phase 2)
- Passwords: argon2id or bcrypt (cost 12). Never store plain text.
- Sessions: HTTP-only, Secure, SameSite=Lax cookies.
- Email verification required before trial activation.
- Lock account for 15 minutes after 5 failed logins.
- Password reset via single-use token valid 30 minutes.

## 4. Storage rules
- Bucket is private. No public read.
- Object key: `users/{userId}/files/{fileId}`.
- Upload: server creates a file record with status `pending`, returns presigned PUT URL (valid 10 minutes), client uploads, client calls `/complete`, server verifies size and checksum, marks `ready`, increments usage.
- Quota check happens before the presigned URL is issued and again on complete.
- Deletion: soft delete immediately (hidden). Hard delete from storage after 30 days.

## 5. Razorpay integration

### Objects used
- **Plans** in Razorpay: one per (tier × billing cycle). Example IDs: `plan_starter_monthly`, `plan_starter_yearly`. Store Razorpay plan IDs in the database, not in frontend code.
- **Subscriptions**: created server-side with `total_count` set to the number of cycles (for example, 120 for monthly, 10 for yearly, to cover long-term renewals) and `customer_notify: 1`.
- **Customers**: created on first checkout, store `razorpay_customer_id` on the user.

### Checkout flow
1. User clicks "Choose Plus, Yearly" on `/pricing` (logged in).
2. Client calls `POST /api/billing/checkout` with `{ planId, billingCycle }`.
3. Server validates the plan, creates a Razorpay subscription, stores it with status `created`, and returns `{ subscriptionId, keyId }`.
4. Client opens Razorpay Checkout with the `subscription_id`.
5. On success, the client receives `razorpay_payment_id`, `razorpay_subscription_id`, `razorpay_signature`. The client does not grant access based on this alone.
6. Server verifies the signature with HMAC SHA256 using the key secret.
7. Webhook `subscription.activated` or `payment.captured` (authoritative) updates the database to `active`.

### Webhook handler rules
- Verify `X-Razorpay-Signature` using the webhook secret over the raw request body.
- Read the raw body with `await request.text()` before parsing JSON.
- Make handlers idempotent. Store processed event IDs.
- Return HTTP 200 quickly. Do heavy work asynchronously.
- Events to handle: `subscription.activated`, `subscription.charged`, `subscription.halted`, `subscription.cancelled`, `subscription.completed`, `payment.failed`, `refund.processed`.

### Money handling
- Store amounts in paise (integer). ₹99 = 9900 paise.
- Never use floating point for money.
- Use the Razorpay amount in paise when creating orders.

### Invoices (GST)
- Business GSTIN [PLACEHOLDER] and state place of supply must be on every invoice.
- Invoice number sequence is gapless per financial year.
- Store invoice PDF in object storage; email a link.

## 6. Testing payments
- Use Razorpay test mode and test cards/UPI IDs from Razorpay docs.
- Test cases: successful payment, failed payment, halted subscription after retries, upgrade mid-cycle, cancel at period end, duplicate webhook delivery, invalid signature.

## 7. Go-live checklist (Razorpay)
- [ ] Business KYC approved
- [ ] Legal pages live (privacy, terms, refund, shipping)
- [ ] Website shows business name, address, contact, and GST status in footer
- [ ] Live keys in production environment variables only
- [ ] Webhook URL set to production domain with secret
- [ ] Test refund and cancellation end-to-end
