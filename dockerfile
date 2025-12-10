# Multi-stage Dockerfile for Laravel + React (Vite) on Render
# Optimized for production deployment

# ============================================
# Stage 1: Build Frontend Assets with Node
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build frontend assets with Vite
RUN npm run build

# ============================================
# Stage 2: Setup PHP and Laravel
# ============================================
FROM php:8.3-fpm-alpine AS backend-builder

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libzip-dev \
    postgresql-dev \
    oniguruma-dev \
    icu-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy composer files
COPY composer*.json ./

# Install PHP dependencies (production only)
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --optimize-autoloader

# Copy application code
COPY . .

# Copy built frontend assets from frontend-builder
COPY --from=frontend-builder /app/public/build ./public/build
COPY --from=frontend-builder /app/public/hot ./public/hot

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

# ============================================
# Stage 3: Production Runtime
# ============================================
FROM php:8.3-fpm-alpine

# Install runtime dependencies only
RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-client \
    libpng \
    libzip \
    oniguruma \
    icu \
    freetype \
    libjpeg-turbo \
    libwebp \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl

WORKDIR /var/www

# Copy application from builder
COPY --from=backend-builder --chown=www-data:www-data /var/www /var/www

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/http.d/default.conf

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create necessary directories
RUN mkdir -p \
    /var/www/storage/logs \
    /var/www/storage/framework/sessions \
    /var/www/storage/framework/views \
    /var/www/storage/framework/cache \
    /run/nginx \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Expose port (Render uses PORT env variable, default to 10000)
ENV PORT=10000
EXPOSE $PORT

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:$PORT/api/health || exit 1

# Copy startup script
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Start application
CMD ["/usr/local/bin/start.sh"]
