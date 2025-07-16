# Development Domain Setup Tutorial

## Overview
This tutorial shows you how to set up a **private development domain** while keeping your **main site public for SEO**. You'll have:

- **Production Site**: `behorsesavvy.online` (public, good for SEO)
- **Development Site**: `dev.behorsesavvy.online` (private, password protected)

## Part 1: Environment Variables Setup

### 1. Create Environment Files

Create these files in your project root:

**`.env.development`** (for development):
```bash
VITE_COMING_SOON=true
VITE_ENVIRONMENT=development
```

**`.env.production`** (for production):
```bash
VITE_COMING_SOON=false
VITE_ENVIRONMENT=production
```

**`.env.staging`** (for staging/dev domain):
```bash
VITE_COMING_SOON=false
VITE_ENVIRONMENT=staging
```

### 2. Update .gitignore

Add to your `.gitignore` file:
```
.env.local
.env.development.local
.env.production.local
.env.staging.local
```

## Part 2: Vercel Deployment Setup

### Step 1: Create Development Project

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New..." → "Project"
3. **Import the same GitHub repo**
4. **Change project name** to `behorsesavvy-dev`
5. **Add custom domain**: `dev.behorsesavvy.online`

### Step 2: Configure Environment Variables

In your **development project settings**:

1. **Go to**: Project Settings → Environment Variables
2. **Add these variables**:
   ```
   VITE_COMING_SOON = false
   VITE_ENVIRONMENT = development
   ```

### Step 3: Set Up Password Protection

1. **Go to**: Project Settings → Password Protection
2. **Enable password protection**
3. **Set password**: Choose a strong password
4. **Share with collaborators**: Give them the URL + password

### Step 4: Configure Git Branch

1. **Go to**: Project Settings → Git
2. **Production Branch**: Set to `development` (create this branch)
3. **This means**: 
   - `main` branch → `behorsesavvy.online` (public)
   - `development` branch → `dev.behorsesavvy.online` (private)

## Part 3: DNS Configuration

### Configure Your Domain (GoDaddy/Cloudflare)

Add these DNS records:

**For main domain** (already done):
```
Type: A
Name: @
Value: 76.76.19.19 (Vercel)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For dev subdomain** (new):
```
Type: CNAME
Name: dev
Value: cname.vercel-dns.com
```

## Part 4: Git Workflow

### Creating Development Branch

```bash
# Create and switch to development branch
git checkout -b development

# Push to GitHub
git push -u origin development
```

### Daily Workflow

**For development work**:
```bash
# Switch to development branch
git checkout development

# Make changes and commit
git add .
git commit -m "Add new feature"
git push origin development

# This deploys to dev.behorsesavvy.online (private)
```

**When ready to go live**:
```bash
# Switch to main branch
git checkout main

# Merge development changes
git merge development

# Push to production
git push origin main

# This deploys to behorsesavvy.online (public)
```

## Part 5: Using the Coming Soon Page

### To Show Coming Soon Page

**Method 1: Environment Variable**
```bash
# In your .env file
VITE_COMING_SOON=true
```

**Method 2: Vercel Environment Variables**
1. Go to Project Settings → Environment Variables
2. Set `VITE_COMING_SOON` to `true`
3. Redeploy

### To Show Normal Site

```bash
# In your .env file
VITE_COMING_SOON=false
```

## Part 6: Testing Setup

### Local Testing

```bash
# Test with coming soon page
echo "VITE_COMING_SOON=true" > .env.local
npm run dev

# Test normal site
echo "VITE_COMING_SOON=false" > .env.local
npm run dev
```

### Production Testing

1. **Development Site**: https://dev.behorsesavvy.online
   - Password protected
   - For collaboration
   - Test changes here first

2. **Production Site**: https://behorsesavvy.online
   - Public for SEO
   - Only deploy when ready

## Part 7: Collaboration Workflow

### Share with Collaborators

**Send them**:
- **URL**: https://dev.behorsesavvy.online
- **Password**: [your chosen password]
- **GitHub Access**: Add them to your repo

**They can**:
- View development site privately
- Make code changes via GitHub
- Test changes on dev domain
- Approve changes before production

### Review Process

1. **Make changes** on `development` branch
2. **Deploy to dev site** automatically
3. **Review together** on private dev site
4. **Merge to main** when approved
5. **Deploy to production** automatically

## Part 8: Benefits of This Setup

### ✅ **SEO Benefits**
- **Main site stays public** - no SEO damage
- **Google keeps indexing** - continuous visibility
- **No ranking loss** - production site unaffected

### ✅ **Privacy Benefits**
- **Development site is private** - password protected
- **Safe collaboration** - test without affecting SEO
- **No public broken changes** - development isolated

### ✅ **Workflow Benefits**
- **Easy switching** - environment variables
- **Automatic deployment** - push to deploy
- **Version control** - full git history
- **Rollback capability** - revert anytime

## Part 9: Advanced Configuration

### Custom Environment Variables

You can add more environment variables:

```bash
# .env.staging
VITE_COMING_SOON=false
VITE_ENVIRONMENT=staging
VITE_API_URL=https://staging-api.behorsesavvy.online
VITE_ANALYTICS_ID=GA-STAGING-ID
```

### Multiple Staging Environments

Create multiple development projects:
- `dev.behorsesavvy.online` - Main development
- `staging.behorsesavvy.online` - Client review
- `test.behorsesavvy.online` - QA testing

## Part 10: Troubleshooting

### Common Issues

**1. Environment Variables Not Working**
```bash
# Check your .env file exists
ls -la .env*

# Restart development server
npm run dev
```

**2. DNS Not Pointing to Vercel**
```bash
# Check DNS propagation
dig dev.behorsesavvy.online

# Should show Vercel IP: 76.76.19.19
```

**3. Password Protection Not Working**
- Check Vercel project settings
- Ensure password protection is enabled
- Try incognito/private browsing

**4. Coming Soon Page Not Showing**
```bash
# Check environment variable
echo $VITE_COMING_SOON

# Should be "true" to show coming soon
```

## Summary

**You now have**:
- ✅ **Public production site** for SEO
- ✅ **Private development site** for collaboration
- ✅ **Environment variable control** for coming soon page
- ✅ **Professional git workflow** with branches
- ✅ **No SEO damage** to main site

**URLs**:
- **Production**: https://behorsesavvy.online (public)
- **Development**: https://dev.behorsesavvy.online (private)

**Next Steps**:
1. Set up the development domain in Vercel
2. Configure DNS records
3. Create development branch
4. Share dev URL + password with collaborators
5. Start collaborating safely!

---

*This setup gives you the best of both worlds: perfect SEO on your main site and private collaboration on your development site.* 