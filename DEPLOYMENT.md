# Deployment Guide

## Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Next.js" as framework preset

2. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Custom domain can be added in project settings

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Environment Variables Required

### Required for Production
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Your deployed application URL

### Optional Integrations
- `GHL_API_KEY` - Go High Level API key
- `STRIPE_SECRET_KEY` - Stripe for payments
- `GOOGLE_MAPS_API_KEY` - Google Maps integration
- `TWILIO_ACCOUNT_SID` - Twilio for SMS
- `TWILIO_AUTH_TOKEN` - Twilio auth token

## Supabase Setup

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note project URL and anon key

2. **Run Database Schema**
   ```sql
   -- Copy contents of supabase-schema.sql
   -- Run in Supabase SQL Editor
   ```

3. **Enable Row Level Security**
   - RLS is enabled in the schema
   - Policies are created for user data access

4. **Authentication Setup**
   - Enable email auth in Supabase Auth settings
   - Configure redirect URLs:
     - Site URL: `https://your-domain.vercel.app`
     - Redirect URLs: `https://your-domain.vercel.app/auth/callback`

## Database Setup Instructions

### 1. Execute Schema
Copy the entire content of `supabase-schema.sql` and paste into:
- Supabase Dashboard → SQL Editor → New Query → Run

### 2. Create Storage Buckets
```sql
-- Create storage for property photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-photos', 'property-photos', true);

-- Create storage for user avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);
```

### 3. Set Up Storage Policies
```sql
-- Public access to property photos
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'property-photos');

-- User can upload own avatar
CREATE POLICY "Users can upload own avatar" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Production Checklist

### Security
- [ ] Environment variables configured
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Database RLS policies active
- [ ] CORS settings configured in Supabase
- [ ] Rate limiting considered for API endpoints

### Performance
- [ ] Database indexes created
- [ ] Image optimization configured
- [ ] Caching strategies implemented
- [ ] CDN configuration (automatic on Vercel)

### Monitoring
- [ ] Error tracking set up (Vercel Analytics)
- [ ] Performance monitoring
- [ ] User analytics configured
- [ ] Database monitoring enabled

## Post-Deployment

1. **Verify Installation**
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```

2. **Test Authentication**
   - Try sign up/in flow
   - Verify email authentication works
   - Check dashboard access

3. **Test AI Features**
   - Test lead response suggestions
   - Verify OpenAI integration
   - Check AI scoring functionality

4. **Test Integrations**
   - Test Supabase data operations
   - Verify email sending works
   - Check webhook functionality

## Troubleshooting

### Common Issues

**Build Errors**
- Check environment variables in Vercel
- Verify all dependencies installed
- Check TypeScript configurations

**Database Connection**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure database schema applied

**Authentication Issues**
- Verify NEXTAUTH_SECRET is set
- Check redirect URL configuration
- Ensure CORS settings correct

**AI Features Not Working**
- Verify OpenAI API key
- Check API quotas and limits
- Review error logs in Vercel

### Logs and Debugging

**Vercel Logs**
- Dashboard → Functions tab
- Check real-time logs
- Filter by function path

**Supabase Logs**
- Dashboard → Logs tab
- Check authentication events
- Monitor database queries

**Local Development**
```bash
# Set up local environment
cp .env.example .env.local

# Start development
npm run dev

# Test with local environment
npm run build
```

## Scaling Considerations

### Database
- Monitor connection pool usage
- Consider read replicas for high traffic
- Implement caching strategies

### File Storage
- Use CDN for static assets
- Implement image optimization
- Consider backup strategies

### API Rate Limits
- Implement rate limiting
- Use API caching where possible
- Monitor third-party API usage

## Security Best Practices

1. **Regular Security Reviews**
   - Update dependencies regularly
   - Monitor for security vulnerabilities
   - Review access logs

2. **Data Protection**
   - Encrypt sensitive data
   - Use secure headers
   - Implement backup strategies

3. **API Security**
   - Validate all inputs
   - Use HTTPS everywhere
   - Implement proper error handling

## Support

For deployment issues:
1. Check [Vercel documentation](https://vercel.com/docs)
2. Review [Supabase troubleshooting](https://supabase.com/docs/guides/troubleshooting)
3. Check this repository's Issues page
4. Join our Discord community for support