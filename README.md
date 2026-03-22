This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## LinkedIn Sign-In setup

1. Install dependencies and run locally:

```bash
npm install
npm run dev
```

2. Use a single env file: `.env`

3. Fill these values in `.env`:
   - `AUTH_SECRET`
   - `AUTH_URL` (for local dev use `http://localhost:3000`)
   - `LINKEDIN_CLIENT_ID`
   - `LINKEDIN_CLIENT_SECRET`

4. In your LinkedIn Developer app, set this OAuth redirect URI:
   - `http://localhost:3000/api/auth/callback/linkedin`

5. Open the homepage and click `Sign in with LinkedIn`.

## MongoDB (partner form & data)

The [Partner with us](/partner) page submits to **`POST /api/partner-inquiry`**. Submissions are stored in MongoDB:

| Collection            | Purpose                                      |
| --------------------- | -------------------------------------------- |
| **`partner_inquiries`** | Name, email, organization, message, `createdAt` |

Set in `.env` (required for the API route to persist data):

- `MONGO_URI` — connection string
- `MONGO_DB_NAME` — optional, defaults to `matchtech`

Ensure indexes (optional; first insert also creates the collection):

```bash
npm run db:partner-inquiries
```

Company swipe data uses the **`companies`** collection — see `npm run db:companies`.
