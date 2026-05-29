# 🚀 Quick Start Guide - Deploy in 5 Minutes

## Fastest Way: Vercel (Recommended)

### 1. One-Command Deploy
```bash
npx vercel --prod
```

Follow the prompts:
- Login/Signup to Vercel
- Link to your project
- Deploy!

### 2. Add Your Domain
1. Go to your project on [vercel.com](https://vercel.com)
2. Settings → Domains → Add
3. Enter your domain (e.g., `weather.yourdomain.com`)
4. Add DNS record at your domain provider:
   ```
   Type: CNAME
   Name: weather (or your subdomain)
   Value: cname.vercel-dns.com
   ```

**Done!** Your site will be live at your custom domain in ~5 minutes.

---

## Alternative: Netlify

### 1. Deploy
```bash
# Install CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### 2. Add Domain
In Netlify dashboard:
- Domain Settings → Add custom domain
- Add CNAME record:
  ```
  Type: CNAME
  Name: weather
  Value: your-site.netlify.app
  ```

---

## Alternative: GitHub Pages (Free)

### 1. Update CNAME
Edit `public/CNAME` with your domain:
```
weather.yourdomain.com
```

### 2. Deploy
```bash
npm install -g gh-pages
npm run deploy:gh-pages
```

### 3. Enable in GitHub
- Repo Settings → Pages
- Enable Pages
- Add custom domain

### 4. Add DNS Record
```
Type: CNAME
Name: weather
Value: yourusername.github.io
```

---

## Environment Variables

Before deploying, set these in your hosting provider:

### Required
```
VITE_OPENWEATHER_API_KEY=your_key_from_openweathermap.org
```

### Optional
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Where to Add:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **GitHub**: Repo Settings → Secrets and Variables → Actions

---

## DNS Provider Examples

### Cloudflare
1. DNS → Add Record
2. Type: CNAME, Name: weather, Target: cname.vercel-dns.com
3. Proxy Status: DNS only (gray cloud)

### Namecheap
1. Advanced DNS → Add New Record
2. Type: CNAME Record, Host: weather, Value: cname.vercel-dns.com

### GoDaddy
1. DNS Management → Add
2. Type: CNAME, Name: weather, Value: cname.vercel-dns.com

### Google Domains
1. DNS → Custom Records → Manage
2. Type: CNAME, Name: weather, Data: cname.vercel-dns.com

---

## Verification

After setup:
1. Wait 5-15 minutes for DNS propagation
2. Visit your domain
3. Check for padlock (HTTPS)
4. Test on mobile

---

## Troubleshooting

### Domain not working?
- Wait up to 48 hours for DNS
- Clear browser cache
- Try incognito mode
- Check DNS: `nslookup weather.yourdomain.com`

### SSL certificate error?
- Wait 24 hours for auto-provisioning
- Ensure DNS is correct
- Try redeploy

### 404 on refresh?
- Check `_redirects` file exists in public/
- Ensure SPA mode enabled in platform

---

## Support

See full guide: [DOMAIN_SETUP.md](./DOMAIN_SETUP.md)
