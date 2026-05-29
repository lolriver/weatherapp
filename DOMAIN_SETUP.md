# Custom Domain Setup Guide

This guide will help you set up a custom domain for your WeatherPro application.

## Prerequisites

- A registered domain name (e.g., from Namecheap, GoDaddy, Google Domains, Cloudflare)
- Deployed application on one of the supported platforms

---

## Option 1: Netlify Deployment

### 1. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

Or connect your Git repository through the Netlify dashboard.

### 2. Add Custom Domain

1. Go to your Netlify site dashboard
2. Navigate to **Domain Settings**
3. Click **Add custom domain**
4. Enter your domain (e.g., `weatherpro.yourdomain.com`)
5. Follow the DNS configuration instructions

### 3. Configure DNS (For Root Domain)

Add these records to your DNS provider:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 75.2.60.5               |
| CNAME | www  | your-site.netlify.app   |

### 4. Configure DNS (For Subdomain)

| Type  | Name        | Value                    |
|-------|-------------|--------------------------|
| CNAME | weatherpro  | your-site.netlify.app   |

### 5. Enable HTTPS

Netlify automatically provisions SSL certificates via Let's Encrypt.

---

## Option 2: Vercel Deployment

### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Or import your Git repository through the Vercel dashboard.

### 2. Add Custom Domain

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Add your domain
4. Follow the DNS configuration instructions

### 3. Configure DNS

For root domain:
| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21             |
| CNAME | www  | cname.vercel-dns.com    |

For subdomain:
| Type  | Name        | Value                    |
|-------|-------------|--------------------------|
| CNAME | weatherpro  | cname.vercel-dns.com    |

### 4. SSL Certificate

Vercel automatically provisions SSL certificates.

---

## Option 3: GitHub Pages (Free)

### 1. Update CNAME File

Edit `public/CNAME` and replace with your domain:
```
weatherpro.yourdomain.com
```

### 2. Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages**
3. Set source to `gh-pages` branch (or main with `/dist` folder)
4. Add your custom domain

### 3. Configure DNS

| Type  | Name        | Value                        |
|-------|-------------|------------------------------|
| CNAME | weatherpro  | yourusername.github.io      |

Or for apex domain:
| Type | Name | Value             |
|------|------|-------------------|
| A    | @    | 185.199.108.153   |
| A    | @    | 185.199.109.153   |
| A    | @    | 185.199.110.153   |
| A    | @    | 185.199.111.153   |

### 4. Deploy Script

Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

Deploy:
```bash
npm run deploy
```

---

## Option 4: Cloudflare Pages

### 1. Deploy to Cloudflare Pages

1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages**
3. Create a new project
4. Connect your Git repository
5. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### 2. Add Custom Domain

1. Go to your Pages project
2. Click **Custom domains**
3. Add your domain
4. Cloudflare automatically configures DNS if domain is on Cloudflare

### 3. Configure DNS (if needed)

| Type  | Name        | Value                           |
|-------|-------------|---------------------------------|
| CNAME | weatherpro  | your-project.pages.dev         |

---

## Option 5: Firebase Hosting

### 1. Initialize Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting
```

Configuration:
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No` (or `Yes` for GitHub integration)

### 2. Deploy

```bash
npm run build
firebase deploy --only hosting
```

### 3. Add Custom Domain

```bash
firebase hosting:channel:deploy live --expires 30d
```

Then in Firebase Console:
1. Go to **Hosting**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

### 4. Configure DNS

| Type  | Name        | Value                    |
|-------|-------------|--------------------------|
| A     | @           | (provided by Firebase)   |
| TXT   | @           | (verification record)    |

---

## DNS Propagation

After configuring DNS records:
- DNS changes can take **15 minutes to 48 hours** to propagate
- Use [DNS Checker](https://dnschecker.org/) to verify propagation
- Clear your browser cache if the old site still appears

---

## SSL/HTTPS Setup

All recommended platforms provide free SSL certificates:
- **Netlify**: Automatic via Let's Encrypt
- **Vercel**: Automatic via Let's Encrypt
- **Cloudflare**: Automatic with Cloudflare SSL
- **GitHub Pages**: Automatic via Let's Encrypt
- **Firebase**: Automatic managed certificates

---

## Recommended Setup

For best performance and ease:

1. **Cloudflare Pages** or **Netlify** (easiest with auto SSL)
2. Use a subdomain initially (e.g., `weather.yourdomain.com`)
3. Enable HTTPS redirect
4. Configure caching headers (already done in config files)

---

## Testing Your Domain

After setup, verify:
1. Domain resolves: `nslookup weatherpro.yourdomain.com`
2. SSL certificate: Check padlock in browser
3. HTTP → HTTPS redirect works
4. All routes work (thanks to SPA redirects)

---

## Troubleshooting

### Domain not resolving
- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo killall -HUP mDNSResponder` (Mac)

### SSL certificate issues
- Wait 24 hours for auto-provisioning
- Ensure DNS points to correct host
- Check CAA records aren't blocking certificate issuance

### 404 errors on page refresh
- Ensure `_redirects` or platform config is present
- Check build output includes redirect rules
- Verify SPA routing is configured

---

## Quick Start Recommendation

**Easiest Setup (2 minutes):**

1. Deploy to Vercel:
   ```bash
   npx vercel --prod
   ```

2. Add domain in Vercel dashboard

3. Add CNAME record at your DNS provider:
   ```
   CNAME weatherpro cname.vercel-dns.com
   ```

Done! ✨

---

## Need Help?

- Netlify: https://docs.netlify.com/domains-https/custom-domains/
- Vercel: https://vercel.com/docs/concepts/projects/domains
- Cloudflare: https://developers.cloudflare.com/pages/platform/custom-domains/
- GitHub Pages: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
