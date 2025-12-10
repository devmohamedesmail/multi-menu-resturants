# Deployment Guide for Render

## Prerequisites
- Render account (https://render.com)
- GitHub repository connected to Render
- Cloudinary account for image uploads

## Quick Start

### 1. Database Setup
The `render.yaml` will automatically create a PostgreSQL database. Alternatively, you can create it manually:
- Go to Render Dashboard
- Click "New +" → "PostgreSQL"
- Name: `multi-menu-db`
- Plan: Starter (or your preferred plan)
- Save connection details

### 2. Web Service Setup

#### Option A: Using Blueprint (Recommended)
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create all services automatically
5. Review and create services

#### Option B: Manual Setup
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: multi-menu-restaurant
   - **Runtime**: Docker
   - **Region**: Oregon (or nearest to you)
   - **Branch**: main
   - **Dockerfile Path**: ./dockerfile
   - **Docker Context**: .

### 3. Environment Variables

Set these in Render Dashboard (Web Service → Environment):

#### Required Laravel Variables
```env
APP_NAME="Multi Menu Restaurant"
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:YOUR_KEY_HERE
APP_URL=https://your-app.onrender.com

LOG_CHANNEL=stderr
LOG_LEVEL=info
```

#### Database (Auto-filled if using Render PostgreSQL)
```env
DB_CONNECTION=pgsql
DB_HOST=${DATABASE_HOST}
DB_PORT=${DATABASE_PORT}
DB_DATABASE=${DATABASE_NAME}
DB_USERNAME=${DATABASE_USER}
DB_PASSWORD=${DATABASE_PASSWORD}
```

#### Session & Cache
```env
CACHE_DRIVER=file
SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
```

#### Cloudinary (Required for image uploads)
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### 4. Generate APP_KEY
Run this locally and copy the key:
```bash
php artisan key:generate --show
```
Or use Render's environment variable generator.

### 5. Deploy
- Push to your main branch
- Render will automatically detect changes and deploy
- First deployment takes 5-10 minutes

## Docker Build Process

The Dockerfile uses multi-stage builds:

1. **Stage 1 (frontend-builder)**: Builds React/Vite assets
   - Installs Node dependencies
   - Runs `npm run build`
   - Outputs to `public/build`

2. **Stage 2 (backend-builder)**: Prepares Laravel
   - Installs PHP extensions
   - Installs Composer dependencies (production)
   - Copies built frontend assets
   - Optimizes autoloader

3. **Stage 3 (production)**: Final runtime image
   - Minimal Alpine Linux base
   - Nginx + PHP-FPM + Supervisor
   - Copies only production code
   - Sets up permissions

## Architecture

```
┌─────────────────────────────────────┐
│         Nginx (Port 10000)          │
│  - Serves static files              │
│  - Proxies PHP requests to PHP-FPM  │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│        PHP-FPM (Port 9000)          │
│  - Executes Laravel application     │
│  - Handles Inertia.js routes        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Laravel Queue Worker           │
│  - Processes background jobs        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│     PostgreSQL Database (Render)    │
└─────────────────────────────────────┘
```

## Troubleshooting

### Build Fails
1. Check build logs in Render dashboard
2. Verify `package.json` and `composer.json` are valid
3. Ensure all required PHP extensions are installed

### Application Won't Start
1. Check `APP_KEY` is set correctly
2. Verify database connection variables
3. Check logs: Render Dashboard → Logs

### Database Connection Issues
1. Verify database is created and running
2. Check database connection variables match
3. Ensure database is in same region as web service

### 502 Bad Gateway
1. Check PHP-FPM is running: `supervisorctl status`
2. Verify nginx configuration
3. Check application logs for errors

### Static Assets Not Loading
1. Verify `npm run build` completed successfully
2. Check `public/build` directory exists
3. Ensure nginx is serving static files

## Monitoring

### Health Check
The application includes a health check endpoint:
```
GET https://your-app.onrender.com/api/health
```

### Logs
Access logs through Render Dashboard:
- Nginx access/error logs
- PHP-FPM logs
- Laravel application logs
- Queue worker logs

### Metrics
Monitor in Render Dashboard:
- CPU usage
- Memory usage
- Response times
- Request rates

## Scaling

### Horizontal Scaling
1. Go to Web Service settings
2. Increase instance count
3. Consider Redis for session/cache storage

### Vertical Scaling
1. Go to Web Service settings
2. Upgrade plan (Starter → Standard → Pro)

## Database Backups

Render automatically backs up PostgreSQL databases:
- Daily backups (retained for 7 days)
- Manual backups available
- Point-in-time recovery on paid plans

## CI/CD

The deployment is automatic:
1. Push to main branch
2. Render detects changes
3. Builds Docker image
4. Runs migrations
5. Deploys new version
6. Health check passes
7. Routes traffic to new deployment

## Security Checklist

- ✅ `APP_DEBUG=false` in production
- ✅ `APP_ENV=production`
- ✅ Strong `APP_KEY`
- ✅ Database credentials from environment
- ✅ HTTPS enforced by Render
- ✅ Security headers configured in nginx
- ✅ File upload restrictions in place
- ✅ Rate limiting enabled

## Cost Optimization

1. Use Render's Starter plan ($7/month)
2. Share database between environments
3. Use Cloudinary's free tier (25GB/month)
4. Enable caching to reduce database queries
5. Optimize images before upload

## Support

- Render Documentation: https://render.com/docs
- Laravel Documentation: https://laravel.com/docs
- Project Issues: GitHub Issues

## Post-Deployment

After successful deployment:

1. **Test the application**
   - Visit your app URL
   - Create a test restaurant
   - Upload images
   - Test cart functionality

2. **Configure Cloudinary**
   - Verify image uploads work
   - Check transformations

3. **Set up monitoring**
   - Enable Render metrics
   - Configure error notifications

4. **Create admin user**
   ```bash
   # Use Render shell
   php artisan tinker
   ```

5. **Seed initial data**
   ```bash
   php artisan db:seed
   ```

## Rollback

If deployment fails:
1. Go to Render Dashboard
2. Select your web service
3. Click "Rollback" to previous version
4. Select deployment to rollback to

## Environment-Specific Configurations

### Production (.env)
- Debug: OFF
- Error reporting: Minimal
- Cache: Enabled
- Queue: Database/Redis

### Staging (if needed)
- Create separate Render service
- Use different branch (staging)
- Separate database
- Debug: ON (for testing)
