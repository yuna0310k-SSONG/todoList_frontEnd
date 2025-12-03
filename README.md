# Yuna's Todo Frontend

This folder contains a minimal Next.js App Router scaffold for the Todo UI.

Local setup (run in `front`):

```powershell
npm install
npm run dev
```

Notes:

- I could not run `npx create-next-app` in this environment because PowerShell's script execution policy prevented `npx`.
- The files here include `app/layout.tsx` (metadata updated), `app/page.js` (the UI you provided), Tailwind/PostCSS config and `app/globals.css`.

If you want me to re-run a full `create-next-app` instead of this manual scaffold, you can either:

- Temporarily allow scripts in PowerShell (run as admin):

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser; npx create-next-app@latest . --app --tailwind
```

- Or run the `npx` command locally on your machine (recommended).
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
